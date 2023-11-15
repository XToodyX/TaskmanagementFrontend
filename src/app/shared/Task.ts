import {LadenEnum} from './LadenEnum';

export interface Task {
  subject: string;
  description: string;
  creator: string;
  location: LadenEnum;
  creationDate: string;
  assignee: string;
  status: string;
}
