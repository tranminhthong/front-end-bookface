import {User} from "../../user/user";

export interface CommentModel {
  id?: number;
  text?: string;
  postId?: number;
  userId?: number;
  username?: string;
  duration?: string;
  userAvatar?: string;
  likeCount? : number ;
  heartCount? : number;
  liked?: boolean;
  hearted?: boolean;
}
