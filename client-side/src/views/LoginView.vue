<template>
  <div class="main-container">
    <div class="login-left-side">
      
    </div>
    <div class="login-right-side">
      <div class="login-form-wrapper">
        <h4 class="header-3">Selamat Datang</h4>
        <form action="" id="login-form" @submit.prevent="login">
          <div class="input-group">
            <input type="text" name="Id" id="" v-model="payload.kode" class="input">
            <label for="">Your Id</label>
          </div>
          <div class="input-group">
            <input type="text" name="Password" id="" v-model="payload.password" class="input">
            <label for="">Password</label>
          </div>
          <button type="submit" class="submit-login">
            <span>Login</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios, { AxiosError } from 'axios';
import { reactive } from 'vue'
import { useRouter } from 'vue-router';
import userAuthStore from '@/stores/auth'

const store = userAuthStore()
const router = useRouter()

const payload = reactive({
  kode: '',
  password: ''
});

async function login() {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:5000/api/auth/login',
      data: {
        kode: payload.kode,
        password: payload.password
      }
    });

    if (response.data.data) {
      store.setToken(response.data['x-access-token']);
      router.push({ name: 'home' });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err)
    } else {
      console.log('somthing error')
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
  background-color: #f5f5f5;
}
.login-right-side{
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-form-wrapper{
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 3rem;
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
  border: 2px solid rgba(0, 0, 0, 0.1);
  font-family: Roboto;
}
.submit-login{
  background-color: #00b4d8;
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
  font-size: 2rem;
  color: #00b4d8;
}


.submit-login:hover{
  transform: translateY(-2px);
  background-color: #0ac7ed;
  cursor: pointer;
}
/* .input-group{
  height: 40px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

input{
  font-size: 1rem;
  border: none;
  outline: none;
  width: 90%;
  background-color: transparent;
}


 */

</style>