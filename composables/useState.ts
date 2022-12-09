import Story from "./type/Story";
import User from "./type/User";
export const useFirebaseUser = () => useState<any>("firebaseUser", () => []);
//USER'S ACCOUNT
export const user = () => useState<any | User>("user", () => {});
// ALL USER FROM STORE
export const auths = () => useState<any>("auth", () => []);
export const load = () => useState<boolean>("load", () => true);
export const idUser = () => useState<string>("id-user", () => "");
export const stories = () => useState<Story[]>("stories", () => []);
export const idStory = () => useState<string>("id-story", () => "");
export const statusStore = () => useState<any>("status", () => []);

