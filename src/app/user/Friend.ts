import {User} from './user';

export class Friend {
  id?: number;
  sender?: User;
  receiver?: User;
  status?: boolean;

  constructor() {
  }
}
