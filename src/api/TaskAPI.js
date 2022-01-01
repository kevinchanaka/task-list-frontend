import {requestHandler} from '.';

function makeTaskAPI() {
  return Object.freeze({
    getTasks,
    getTask,
    createTask,
    modifyTask,
    removeTask,
  });

  async function getTasks() {
    return await requestHandler({
      method: 'get',
      url: '/tasks',
    });
  }

  async function getTask({id}) {
    return await requestHandler({
      method: 'get',
      url: `/tasks/${id}`,
    });
  }

  async function createTask(task) {
    return await requestHandler({
      method: 'post',
      url: '/tasks',
      data: task,
    });
  }

  async function modifyTask({id, ...task}) {
    return await requestHandler({
      method: 'put',
      url: `/tasks/${id}`,
      data: task,
    });
  }

  async function removeTask({id}) {
    return await requestHandler({
      method: 'delete',
      url: `/tasks/${id}`,
    });
  }
}

export const TaskAPI = makeTaskAPI();
