export function makeTaskAPI({request}) {
  return Object.freeze({
    getTasks,
    getTask,
    createTask,
    modifyTask,
    removeTask,
  });

  function tryCatchHandler(args) {
    return (async () => {
      try {
        const response = await request(args);
        return response.data;
      } catch (error) {
        return {error: error.response.data};
      }
    })();
  }

  async function getTasks() {
    return await tryCatchHandler({
      method: 'get',
      url: '/tasks',
    });
  }

  async function getTask({id}) {
    return await tryCatchHandler({
      method: 'get',
      url: `/tasks/${id}`,
    });
  }

  async function createTask(task) {
    return await tryCatchHandler({
      method: 'post',
      url: '/tasks',
      data: task,
    });
  }

  async function modifyTask({id, ...task}) {
    return await tryCatchHandler({
      method: 'put',
      url: `/tasks/${id}`,
      data: {id: id, ...task},
    });
  }

  async function removeTask({id}) {
    return await tryCatchHandler({
      method: 'delete',
      url: `/tasks/${id}`,
    });
  }
}
