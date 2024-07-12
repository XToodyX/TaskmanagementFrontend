import {LadenEnum} from './LadenEnum';
import {StatusEnum} from './StatusEnum';

export interface Task {
  taskId: number,
  subject: string;
  description: string;
  creator: string;
  location: LadenEnum;
  creationDate?: string;
  assignee: string;
  status?: StatusEnum;
  images: string[];
  forwardedTo: string | undefined;
  important: boolean;
}
