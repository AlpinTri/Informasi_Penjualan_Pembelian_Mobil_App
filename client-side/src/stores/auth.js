import { defineStore } from "pinia";
import { ref, reactive, computed } from 'vue'


const userAuthStore = defineStore('auth', () => {
  const userLogin = reactive({
    kode: '',
    name: ''
  });
  const accessToken = ref('');

  const getLoginUser = computed(() => ({
    kode: userLogin.kode,
    name: userLogin.name
  }));

  const getAccessToken = computed(() => {
    accessToken.value = JSON.parse(localStorage.getItem('access-token'));
    return accessToken.value;
  });

  // 
  function setToken(token) {
    accessToken.value = token;
    localStorage.setItem('access-token', JSON.stringify(accessToken.value));
  }

  function setLoginUser({kode, name}) {
    userLogin.kode = kode
    userLogin.name = name
    localStorage.setItem('user-login', JSON.stringify(userLogin));
  }
  
  function logout() {
    
  }

  return {
    userLogin,
    accessToken,
    getLoginUser,
    getAccessToken,
    setToken,
    setLoginUser
  }
})

export default userAuthStore;