import {requestHandler} from '.';

export interface Task {
  name: string,
  description: string,
}

export interface TaskWithId {
  name: string,
  description: string,
  id: string,
}

export interface Id {
  id: string
}

interface GetTasksResponse {
  tasks: TaskWithId[]
}

interface GetTaskResponse {
  task: TaskWithId
}

interface CreateTaskResponse {
  task: TaskWithId
  message: string
}

interface ModifyTaskResponse {
  task: TaskWithId
  message: string
}

interface RemoveTaskResponse {
  message: string
}

function makeTaskAPI() {
  return Object.freeze({
    getTasks,
    getTask,
    createTask,
    modifyTask,
    removeTask,
  });

  async function getTasks() {
    return await requestHandler<GetTasksResponse>({
      method: 'get',
      url: '/tasks',
    });
  }

  async function getTask({id}: Id) {
    return await requestHandler<GetTaskResponse>({
      method: 'get',
      url: `/tasks/${id}`,
    });
  }

  async function createTask(task: Task) {
    return await requestHandler<CreateTaskResponse>({
      method: 'post',
      url: '/tasks',
      data: task,
    });
  }

  async function modifyTask({id, ...task}: TaskWithId) {
    return await requestHandler<ModifyTaskResponse>({
      method: 'put',
      url: `/tasks/${id}`,
      data: task,
    });
  }

  async function removeTask({id}: Id) {
    return await requestHandler<RemoveTaskResponse>({
      method: 'delete',
      url: `/tasks/${id}`,
    });
  }
}

export const TaskAPI = makeTaskAPI();
