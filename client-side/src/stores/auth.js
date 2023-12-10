import { defineStore } from "pinia";
import { ref, reactive } from 'vue';
import { jwtDecode } from "jwt-decode";


const userAuthStore = defineStore('auth', () => {
  // States
  const user = reactive({
    kode: '',
    name: '',
    status: ''
  });

  // Getters
  function getUserInfo() {
    const token = getToken();

    if (token) {
      const payload = jwtDecode(token);
  
      if (payload) {
       user.kode = payload.kode;
       user.name = payload.name;
       user.status = payload.status;
  
        return user;
      }

      return null;
    }

    return null;
  }

  function getToken() {
    const token = JSON.parse(localStorage.getItem("access-token"));
    
    if (token) {
      return token;
    }

    return null;
  }

  // Actions
  function login(token) {
    if (token) {
      localStorage.setItem('access-token', JSON.stringify(token));

      if (getToken()) {
        return true;
      }

      return false;
    }

    return false;
  }

  function logout() {
    localStorage.clear();

    if (!getToken() && !getUserInfo()) {
      return true;
    }

    return false;
  }

  function isAuthenticated() {
    const token = getToken();

    if (token) {
      return true;
    }

    return false;
  }

  return {
    getUserInfo,
    getToken,
    login,
    logout,
    isAuthenticated
  }
});

export default userAuthStore;