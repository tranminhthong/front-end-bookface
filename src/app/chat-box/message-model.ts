import {User} from '../user/user';

export class Message{
  id?: number;
  sender?: User;
  receiver?: User;
  content?: string;
  createdTime?: string;
}
