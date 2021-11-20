export function makeUserAPI(request) {
  return Object.freeze({
    registerUser,
    loginUser,
    logoutUser,
    getAccessToken,
  });

  function tryCatchHandler(args) {
    return (async () => {
      try {
        const response = await request(args);
        return response.data;
      } catch (error) {
        return {error: error};
      }
    })();
  }

  async function registerUser(user) {
    return await tryCatchHandler({
      method: 'post',
      url: '/users/register',
      data: user,
    });
  }

  async function loginUser(credentials) {
    return await tryCatchHandler({
      method: 'post',
      url: '/users/login',
      data: credentials,
    });
  }

  async function logoutUser() {
    return await tryCatchHandler({
      method: 'post',
      url: '/users/logout',
    });
  }

  async function getAccessToken() {
    return await tryCatchHandler({
      method: 'post',
      url: '/users/token',
    });
  }
}

