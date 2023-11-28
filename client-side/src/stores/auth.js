import { defineStore } from "pinia";
import { ref, reactive, computed } from 'vue'


const userAuthStore = defineStore('auth', () => {
  // States
  const userLogin = reactive({
    kode: '',
    name: '',
    status: ''
  });

  // Getters
  const getLoginUser = computed(() => ({
    kode: userLogin.kode,
    name: userLogin.name,
    status: userLogin.status
  }));

  const getAccessToken = computed(() => {
    const accessToken = JSON.parse(localStorage.getItem('access-token')) || null;
    return accessToken;
  });

  // Actions
  function setToken(token) {
    localStorage.setItem('access-token', JSON.stringify(token));
  }

  function setLoginUser({kode, name, status}) {
    userLogin.kode = kode;
    userLogin.name = name;
    userLogin.status = status;
  }
  
  function logout() {
    localStorage.removeItem('access-token');
    userLogin.kode = null;
    userLogin.name = null;
    userLogin.status = null;

    if (!getAccessToken()) {
      return false;
    }

    return true;
  }

  return {
    userLogin,
    getLoginUser,
    getAccessToken,
    setToken,
    setLoginUser,
    logout,
  }
})

export default userAuthStore;