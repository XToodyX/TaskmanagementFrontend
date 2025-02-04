import {StoreEnum} from './LadenEnum';
import {StatusEnum} from './StatusEnum';

export interface Task {
  taskId: number,
  subject: string;
  description: string;
  creator: string;
  location: StoreEnum;
  creationDate?: string;
  assignee: string;
  status?: StatusEnum;
  images: string[];
  forwardedTo: string | undefined;
  important: boolean;
}
