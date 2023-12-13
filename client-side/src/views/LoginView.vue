<template>
  <div class="main-container">
    <div class="login-left-side">
      <img src="../../public/mobilesia_logo.png" alt="" class="brand-image">
      <div class="wrapper">
        <div class="wrapper-tagline">
          <span class="welcome">Welcome back to</span>
          <span class="brand-name">Mobilesia</span>
        </div>
        <img src="../../public/8357614.jpg" alt="" class="flat-image">
      </div>
    </div>
    <div class="login-right-side">
      <div class="login-form-wrapper">
        <span class="header-3">User Login</span>
        <form action="" id="login-form" @submit.prevent="login">
          <div class="input-group">
            <input type="text" name="Id" v-model="payload.kode" class="input">
            <label for="Id">Your Id</label>
          </div>
          <div class="input-group">
            <input type="password" name="Password" v-model="payload.password" class="input">
            <label for="Password">Password</label>
          </div>
          <button type="submit" class="submit-login">
            <svg v-if="loading" class="spinner" viewBox="0 0 50 50">
              <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>
            <span v-else>Login</span>
          </button>
          <RouterLink :to="{name: 'home'}" class="cancel">Batal</RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios, { AxiosError } from 'axios';
import { onMounted, reactive, ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router';
import userAuthStore from '@/stores/auth';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const router = useRouter();

const uncomplite = () => {
  toast.warning('Please enter your id and password', {
    autoClose: 3000
  });
}
const wrongIdPw = () => {
  toast.info('Your id or password is incorect', {
    autoClose: 3000
  });
}

const store = userAuthStore();

const loading = ref(false)

const payload = reactive({
  kode: '',
  password: ''
});

async function login() {
  try {
    if (!payload.kode.trim() || !payload.password.trim()) {
      uncomplite()
    } else {
      loading.value = true;

      const response = await axios({
        baseURL: 'http://localhost:5000/api',
        method: 'POST',
        url: '/auth/login',
        data: {
          kode: payload.kode,
          password: payload.password
        }
      });
  
      const match = store.login(response.data['x-access-token']);

      if (match) {
        router.push({
          name: 'admin'
        });
      }

      loading.value = false;
    }

  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response.data.error === 'INVALID_CREDENTIALS') {
        toast.info('Mohon masukkan id dan password dengan benar', {
          autoClose: 3000
        });
        loading.value = false;
      } else if(err.response.data.error === 'DATABASE_CONNECTION_ERROR') {
        toast.error('Database server error', {
          autoClose: false
        });
        loading.value = false;
      } else if (err.response.data.error === 'INTERNAL_SERVER_ERROR') {
        toast.error('Internal server error', {
          autoClose: false
        });
        loading.value = false;
      } else if (err.response.data.error === 'PAYLOAD_ERROR') {
        toast.info('Mohon untuk melengkapi id dan password', {
          autoClose: 3000
        });
        loading.value = false;
      } else {
        toast.error('Network error', {
          autoClose: false
        });
        loading.value = false;
      }
    } else {
      toast.error('Terjadi kesalahan pada server');
      loading.value = false;
    }
  }
}


</script>

<style scoped>
.main-container{
  width: 100%;
  height: 100vh;
  display: flex;
}
.login-left-side{
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.login-right-side{
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f7fa;
  /* background-color: ; */
}
.login-form-wrapper{
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;
}
#login-form{
  display: flex;
  gap: 1rem;
  flex-direction: column;
  width: 75%;
}
.input-group{
  display: flex;
  position: relative;
}
label{
  position: absolute;
  left: 0;
  top: 0;
  font-size: 13px;
  transform: translate(15px, -50%);
  z-index: 0;
  background-color: #fff;
  transition: 1s ease;
  color: rgba(0, 0, 0, 0.8);
  padding-inline: 2px;
  font-family: Roboto;
}
.input{
  padding: 10px;
  padding-inline: 15px;
  font-size: 15px;
  width: 100%;
  outline: none;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-family: Roboto;
}
.submit-login{
  margin-top: 1rem;
  background-color: #2753d8;
  width: 100%;
  align-self: center;
  height: 40px;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  color: white;
  font-family: Roboto;
  transition: .2s ease;
}
.header-3{
  font-size: 1.5rem;
  font-weight: 500;
  color: #2753d8;
}
.wrapper{
  display: flex;
  flex-direction: column;
  width: 90%;
  /* background-color: red; */
  align-self: center;
  align-items: center;
  height: 100%;
  gap: 1rem;
  padding: 20px;
}
.brand-image{
  width: 200px;
  padding: 20px;
}
.flat-image{
  width: 65%;
}
.wrapper-tagline{
  display: flex;
  flex-direction: column;
  align-self: flex-start;
}
.welcome{
  /* font-weight: 600; */
  font-size: 1rem;
  color: #2753d8;
  line-height: 1rem;
}
.brand-name{
  font-weight: 700;
  font-size: 3rem;
  color: #2753d8;
  line-height: 3rem;
}

.submit-login:hover{
  cursor: pointer;
}

.cancel{
  align-self: center;
  color: #2753d8;
  text-decoration: underline;
  cursor: pointer;
}

.spinner {
  animation: rotate 2s linear infinite;
  width: 30px;
  height: 30px;
}
.path {
  stroke: #fff;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

</style>