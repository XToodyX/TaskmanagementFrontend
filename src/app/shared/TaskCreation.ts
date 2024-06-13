import {LadenEnum} from './LadenEnum';

export interface TaskCreation {
  subject: string;
  description: string;
  location: LadenEnum | string;
  creator: string;
  assigneeUsername: string;
  images: string[];
}
