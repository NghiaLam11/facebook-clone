import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  getDownloadURL,
  uploadBytes,
  ref as storageReference,
  deleteObject,
} from "firebase/storage";
import User from "./type/User";
export { getAuth };
export const createUser = async (user: User) => {
  const auth = getAuth();
  const db = getFirestore();
  const colRef = collection(db, "user");
  const credentials = await createUserWithEmailAndPassword(
    auth,
    user.email,
    user.password
  );
  const addUser = await addDoc(colRef, user);
  console.log(user);
  navigateTo("/");
  fetchFirestore();
  return credentials;
};
export const signInUser = async (email: string, password: string) => {
  const auth = getAuth();
  const credentials = await signInWithEmailAndPassword(
    auth,
    email,
    password
  ).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  navigateTo("/");
  fetchFirestore();
  return credentials;
};
export const initUser = async () => {
  const auth = getAuth();
  const useFirebaseUsers = useFirebaseUser();
  useFirebaseUsers.value = auth.currentUser;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      useFirebaseUsers.value = user;
      // console.log(user.uid);
    } else {
      console.log(user, "nullllllll");
      useFirebaseUsers.value = null;
    }
  });
};

export const signOutUser = async () => {
  const auth = getAuth();
  console.log("outttt");
  const result = await auth.signOut();
  navigateTo("/router-auth/signup");
  return result;
};

export const fetchFirestore1 = async () => {
  const db = getFirestore();
  const colRef = collection(db, "user");
  console.log(111);
  return getDocs(colRef);
};

export const fetchFirestore = async () => {
  const db = getFirestore();
  const colRef = collection(db, "user");
  // console.log("firestore user");
  getDocs(colRef)
    .then((res) => {
      var userStores = auths();
      const users: User[] = [];
      res.docs.forEach((user: any) => {
        // console.log(user.data(), 2222);
        users.push({
          ...user.data(),
          id: user.id,
        });
      });
      userStores.value = users;
      return users;
    })
    .then((users) => {
      var auth = user();
      var idAuth = idUser();
      // console.log(users);
      const firebaseUser = useFirebaseUser();
      if (firebaseUser.value !== null) {
        users.forEach((item) => {
          item.email === firebaseUser.value.email
            ? ((auth.value = item), (idAuth.value = item.id))
            : "";
        });
      }
      var isLoad = load();
      isLoad.value = false;
    });
};
export const fetchStories = async () => {
  var isLoad = load();
  isLoad.value = true;
  const db = getFirestore();
  const storiesArr = stories();
  const colRef = collection(db, "stories");
  getDocs(colRef).then((res) => {
    const stories: any = [];
    res.docs.forEach((story: any) => {
      // console.log(story.data(), "story data");
      if (new Date().getTime() - story.data().countDownTime > 86400000) {
        console.log("Hon roi", story.data());
        deleteStory(story.data().fileName, story.id);
      }
      stories.push({
        ...story.data(),
        id: story.id,
      });
    });
    storiesArr.value = stories;
    // console.log(stories);
    isLoad.value = false;
  });
};
export const addStory = async (story: any, fileArr: any) => {
  const storage = getStorage();
  const db = getFirestore();
  const colRef = collection(db, "stories");
  const imagesRef = storageReference(storage, fileArr.fileName);
  const storageRef: any = storageReference(
    storage,
    `public/${fileArr.fileName}`
  );
  const addImg = await uploadBytes(storageRef, fileArr.file);
  const getImg = await getDownloadURL(storageRef);
  console.log(getImg);
  const data = await addDoc(colRef, { ...story, video: getImg });
  return data;
};
export const updateStory = async (updateStory: any, id: string) => {
  const db = getFirestore();
  const docRef = doc(db, "stories", id);
  const data = await updateDoc(docRef, updateStory);
};
export const deleteStory = async (fileName: string, id: string) => {
  const db = getFirestore();
  const storage = getStorage();
  const docRef = doc(db, "stories", id);
  const desertRef = storageReference(storage, `public/${fileName}`);
  const store = await deleteObject(desertRef);
  const data = await deleteDoc(docRef);
  fetchStories();
  return data;
};
export const fetchStatus = async () => {
  var isLoad = load();
  isLoad.value = true;
  const db = getFirestore();
  const statusArr = statusStore();
  const colRef = collection(db, "status");
  getDocs(colRef).then((res) => {
    const status: any = [];
    res.docs.forEach((story: any) => {
      status.push({
        ...story.data(),
        id: story.id,
      });
    });
    statusArr.value = status.sort(function (a: any, b: any) {
      return Number(new Date(b.uploadTime)) - Number(new Date(a.uploadTime));
    });
    isLoad.value = false;
  });
};
export const addStatus = async (status: any, fileArr: any) => {
  const storage = getStorage();
  const db = getFirestore();
  const colRef = collection(db, "status");
  let hashMap = new Map();
  statusStore().value.forEach((status: any) => {
    hashMap.set(status.fileName, status);
  });
  //if found the same file name img in store when u add status. It will change your time upload img
  if (fileArr.fileName !== "" && hashMap.get(fileArr.fileName)) {
    const updateValue = {
      uploadTime:
        new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
    };
    const data = await updateStatus(
      updateValue,
      hashMap.get(fileArr.fileName).id
    );
  } else if (fileArr.fileName !== "") {
    const imagesRef = storageReference(storage, fileArr.fileName);
    const storageRef: any = storageReference(
      storage,
      `status/${fileArr.fileName}`
    );
    const addImg = await uploadBytes(storageRef, fileArr.file);
    const getImg = await getDownloadURL(storageRef);
    console.log(getImg);
    const data = await addDoc(colRef, { ...status, attach: getImg });
    fetchStatus();
    return data;
  } else if (fileArr.fileName === "") {
    const data = await addDoc(colRef, { ...status, attach: "" });
    fetchStatus();
    return data;
  }
};
export const updateStatus = async (updateStatus: any, id: string) => {
  const db = getFirestore();
  const docRef = doc(db, "status", id);
  const data = await updateDoc(docRef, updateStatus);
};
export const deleteStatus = async (fileName: string, id: string) => {
  const db = getFirestore();
  const storage = getStorage();
  const docRef = doc(db, "status", id);
  const desertRef = storageReference(storage, `status/${fileName}`);
  const store = await deleteObject(desertRef);
  const data = await deleteDoc(docRef);
  fetchStatus();
  return data;
};
export const saveFile = async () => {
  const storage = getStorage();
  const imagesRef = storageReference(
    storage,
    "Untitled video - Made with Clipchamp.mp4"
  );
  return getDownloadURL(imagesRef);
};
