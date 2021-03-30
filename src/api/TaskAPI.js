export function makeTaskAPI({request}) {
  return Object.freeze({
    getTasks,
    getTask,
    createTask,
    modifyTask,
    removeTask,
  });
  async function getTasks() {
    const response = await request.get('/tasks');
    return response.data;
  }

  async function getTask({id}) {
    const response = await request.get(`/tasks/${id}`);
    return response.data;
  }

  async function createTask({name, description}) {
    const response = await request.post('/tasks', {
      name: name,
      description: description,
    });
    return response.data;
  }

  async function modifyTask({id, name, description}) {
    const response = await request.put(`/tasks/${id}`, {
      name: name,
      description: description,
    });
    return response;
  }

  async function removeTask({id}) {
    const response = await request.delete(`/tasks/${id}`);
    return response;
  }
}
