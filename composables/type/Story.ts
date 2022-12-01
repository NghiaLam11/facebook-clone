export default interface Story {
  auth: {
    fname: string;
    lname: string;
    email: string;
    password: string;
    avatar: string;
    bio: string;
    id: string;
  };
  video: string;
  fileName: string;
  countLike: number;
  countLove: number;
  countHaha: number;
  countSad: number;
  countAngry: number;
  countSurprise: number;
  countDownTime: number;
  isPublic: boolean;
  id: string;
}
