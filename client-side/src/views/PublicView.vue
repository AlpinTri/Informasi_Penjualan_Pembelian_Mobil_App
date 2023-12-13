<template>
  <div>
    <NavigationView></NavigationView>
    <main>
      <RouterView></RouterView>
    </main>
    <FooterView v-show="route.name !== 'search' && route.name !== 'not found'"></FooterView>
  </div>
</template>

<script setup>
import NavigationView from '@/components/NavigationView.vue';
import FooterView from '@/components/FooterView.vue';

import { useRoute, useRouter } from 'vue-router';
import userAuthStore from '../stores/auth';

const route = useRoute();
const router = useRouter();

// console.log(route.matched);
// console.log(router);
const store = userAuthStore();

// console.log(store.getLoginUser)
</script>

<style scoped>
/* main{
  width: 100%;
  min-height: 100vh;
  position: relative;
}
nav{
  width: 100%;
  height: 70px;
  /* background-color: #82d114; 
  background-color: #fff;
  /* position: absolute; 
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
}
.nav-wrapper{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
}
.logo-brand{
  height: 30px;
}
.login-button{
  width: 120px;
  height: 35px;
  background-color: #2753d8;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-family: Roboto;
  font-size: 1rem;
} */

</style>