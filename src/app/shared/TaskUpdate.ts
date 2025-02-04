import {StatusEnum} from './StatusEnum';

export interface TaskUpdate {
  taskId: number,
  subject: string,
  description: string,
  creator: string,
  assignee: string,
  status: StatusEnum
  forwardedTo: string,
  images: string[];
}
