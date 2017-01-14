let AuthPlugin = {
    setToken(token, expiration) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('authTokenExpiration', expiration)
    },

    destroyToken() {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authTokenExpiration');
    },

    getToken() {
      let token = localStorage.getItem('authToken');
      let expiration = localStorage.getItem('authTokenExpiration');

      if (! token || ! expiration)
      return null;

      if (Date.now() > parseInt(expiration)) {
        this.destroyToken();
        return null;
      } else {
        return token;
      }
    },

    loggedIn() {
      if (this.getToken())
      return true;
      else {
        return false;
      }
    }
  };

  export default (Vue) => {
    Vue.auth = AuthPlugin;

    Object.defineProperties(Vue.prototype, {
      $auth: {
        get(){
          return Vue.auth;
        }
      }
    })
  }
