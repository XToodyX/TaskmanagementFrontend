import {StoreEnum} from './LadenEnum';

export interface TaskCreation {
  subject: string;
  description: string;
  location: StoreEnum | string;
  creator: string;
  assigneeUsername: string;
  privateTask: boolean;
  important: boolean;
  images: string[];
}
