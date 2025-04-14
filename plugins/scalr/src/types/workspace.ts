import { Run } from '.';

export interface Workspace {
  name?: string;
  id: string;
  type?: string;
  last_execution_state?: string;
  last_execution_time?: string;
  last_execution_user?: string;
  url?: string;
  runs?: Run[];
}
