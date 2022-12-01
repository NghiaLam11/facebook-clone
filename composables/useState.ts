import Story from "./type/Story";
import User from "./type/User";
export const useFirebaseUser = () => useState<any>("firebaseUser", () => []);
// export const useFirebaseStore = () => useState<any>("firebaseStore", () => []);
export const user = () => useState<any | User>("user", () => {});
export const auths = () => useState<any>("auth", () => []);
export const load = () => useState<boolean>("load", () => true);
export const idUser = () => useState<string>("id-user", () => "");

export const stories = () => useState<Story[]>("stories", () => []);
export const idStory = () => useState<string>("id-story", () => "");
export const statusStore = () => useState<any>("status", () => []);

