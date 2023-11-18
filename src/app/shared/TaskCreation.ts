import {LadenEnum} from './LadenEnum';

export interface TaskCreation {
  subject: string;
  description: string;
  creator: string;
  location: LadenEnum;
  assignee: string;
}
