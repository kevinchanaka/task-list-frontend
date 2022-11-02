import {handler} from '.';

export interface Task {
  id: string,
  name: string,
  description: string,
  completed: boolean,
  createdAt: string,
  updatedAt: string,
}

export interface Id { // rename to TaskParams
  id: string
}

export interface TaskParams {
  id: string
}

export interface TaskWithoutId { // rename to TaskHistory
  name: string,
  description: string,
  completed: boolean,
  createdAt: string,
  updatedAt: string,
}

export interface TaskHistory {
  name: string,
  description: string,
  completed: boolean
}

export interface TaskEditFormFields {
  name: string
  description: string,
  completed: boolean
}

interface GetTasksRes {
  tasks: Task[]
}

interface GetTaskRes {
  task: Task
}

export interface CreateTaskReq {
  name: string,
  description: string
}

interface CreateTaskRes {
  task: Task
  message: string
}

interface ModifyTaskReq {
  id: string,
  name: string,
  description: string,
  completed: boolean
}

interface ModifyTaskRes {
  task: Task
  message: string
}

interface RemoveTaskRes {
  message: string
}

export const TaskAPI = {
  getTasks: async (): Promise<{error: string;} | GetTasksRes> =>
    await handler<GetTasksRes>({method: 'get', url: '/tasks'}),
  getTask: async (id: string): Promise<{error: string;} | GetTaskRes> =>
    await handler<GetTaskRes>({method: 'get', url: `/tasks/${id}`}),
  createTask: async (task: CreateTaskReq): Promise<{error: string;} | CreateTaskRes> =>
    await handler<CreateTaskRes>({method: 'post', url: '/tasks', data: task}),
  modifyTask: async ({id, ...task}: ModifyTaskReq):
    Promise<{error: string;} | ModifyTaskRes> =>
    await handler<ModifyTaskRes>({
      method: 'put',
      url: `/tasks/${id}`,
      data: task,
    }),
  removeTask: async (id: string): Promise<{error: string;} | RemoveTaskRes> =>
    await handler<RemoveTaskRes>({method: 'delete', url: `/tasks/${id}`}),
};
