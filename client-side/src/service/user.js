import axios from 'axios';
import userAuthStore from '@/stores/auth'
import { useRouter } from 'vue-router';
// const store = require('@/stores / auth');

const store = userAuthStore();
const router = useRouter()

function login(kode, password) {
  axios({
    method: 'POST',
    url:  'http://localhost:5000/api/auth/login',
    data: {
      kode,
      password
    }
  }).then(response => {
    if (response.status === 200) {
      store.setLoginUser(response.data.data)
      store.setToken(response.data['x-access-token'])
      router.push({ name: 'home' });
    }
  }).catch(err => console.log(err))
}

export {
  login
}