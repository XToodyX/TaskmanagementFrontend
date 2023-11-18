import {LadenEnum} from './LadenEnum';

export interface Task {
  taskId: number,
  subject: string;
  description: string;
  creator: string;
  location: LadenEnum;
  creationDate?: string;
  assignee: string;
  status?: string;
}
