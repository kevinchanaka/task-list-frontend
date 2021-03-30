import {request} from './request';
import {makeTaskAPI} from './TaskAPI';

export const TaskAPI = makeTaskAPI({request});

