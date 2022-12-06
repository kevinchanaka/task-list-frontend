/* eslint @typescript-eslint/explicit-module-boundary-types: off */
import {handler} from '.';

export interface Label {
  id: string,
  name: string,
  colour: string
}

export interface Task {
  id: string,
  name: string,
  description: string,
  completed: boolean,
  createdAt: string,
  updatedAt: string,
  labels: Label[]
}

export interface TaskParams {
  id: string
}

export interface TaskHistory {
  name: string,
  description: string,
  completed: boolean,
  labels: Label[]
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
  getTasks: async () =>
    await handler<GetTasksRes>({method: 'get', url: '/tasks'}),
  getTask: async (id: string) =>
    await handler<GetTaskRes>({method: 'get', url: `/tasks/${id}`}),
  createTask: async (task: CreateTaskReq) =>
    await handler<CreateTaskRes>({method: 'post', url: '/tasks', data: task}),
  modifyTask: async ({id, ...task}: ModifyTaskReq) =>
    await handler<ModifyTaskRes>({
      method: 'put',
      url: `/tasks/${id}`,
      data: task,
    }),
  removeTask: async (id: string) =>
    await handler<RemoveTaskRes>({method: 'delete', url: `/tasks/${id}`}),
  addLabels: async (id: string, labels: string[]) =>
    await handler<RemoveTaskRes>(
      {method: 'post', url: `/tasks/${id}/attach`, data: {labels: labels}}),
  removeLabels: async (id: string, labels: string[]) =>
    await handler<RemoveTaskRes>(
      {method: 'post', url: `/tasks/${id}/detach`, data: {labels: labels}}),
};
