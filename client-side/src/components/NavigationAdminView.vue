<template>
  <nav>
    <div class="nav-brand">
      <img src="../../public/mobilesia_logo.png" alt="">
    </div>
    <div class="nav-logout" @click="logout">
      <button>Log Out</button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';
import userAuthStore from '../stores/auth';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const store = userAuthStore();
const router = useRouter();

const failedLogout = () => {
  toast.error('Something error, cannot logout', {
    autoClose: 3000
  })
}

function logout() {

  const match = store.logout();

  if (match) {

    router.push({
      name: 'login'
    });

    return;
  } 

  failedLogout();
}

// onBeforeRouteLeave((to, from, next) => {
//   console.log(store.getAccessToken, 'Before route leave');
//   next()
// });

// onBeforeRouteUpdate((to, from, next) => {
//   console.log(store.getAccessToken, 'Before route Update');
//   next()
// });

</script>

<style scoped>
nav{
  height: 70px;
  background-color: #f3f7fa;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
}
.nav-brand{
  width: 250px;
  display: flex;
  justify-content: center;
}
.nav-brand > img{
  width: 200px;
}
.nav-logout{
  margin-right: 25px;
}
.nav-logout:hover > *{
  cursor: pointer;
}
.nav-logout > button{
  padding: 10px 30px 10px 30px;
  background-color: #2753d8;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
}
</style>