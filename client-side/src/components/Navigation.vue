<template>
  <nav class="aside">
    <ul class="nav-wrapper">
      <li class="nav-list">
        <img class="brand-image" src="../../public/mobilesia_logo.png" alt="">
      </li>
      <li class="nav-list">
        <div class="user-login">
          <div>Alpin Tri</div>
          <div>Super Admin</div>
        </div>
      </li>
      <li class="nav-list">
        <div class="nav-item">
          <RouterLink :to="{name: 'dashboard'}" class="nav-button" :style="[route.path.split('/').includes('dashboard') ? 'color: #2753d8; background-color: #fff;' : '']">
            <div class="mark" :style="[route.path.split('/').includes('dashboard') ? 'background-color: #2753d8;' : '']"></div>
            <div class="nav-detail">
              <img src="../../public/icons/dashboard.png" alt="">
              <span>Dashboard</span>
            </div>
          </RouterLink>
        </div>
        <div class="nav-item">
          <div class="nav-button" @click="openNav(1)" :style="[route.path.split('/').includes('transaksi')  ? 'color: #2753d8; background-color: #fff;' : '']">
            <div class="mark" :style="[route.path.split('/').includes('transaksi') ? 'background-color: #2753d8;' : '']"></div>
            <div class="nav-detail">
              <img src="../../public/icons/to-do-list.png" alt="">
              <span>Master Data</span>
            </div>
            <img class="icon" src="../../public/icons/down-chevron.png" alt="" ref="chevron">
          </div>
          <ul class="nav-tree" ref="navTree">
            <li class="link">Cash</li>
            <li class="link">Kredit</li>
          </ul>
        </div>
        <div class="nav-item">
          <div class="nav-button" @click="openNav(2)" :style="[route.path.split('/').includes('master') ? 'color: #2753d8; background-color: #fff;' : '']">
            <div class="mark" :style="[route.path.split('/').includes('master') ? 'background-color: #2753d8;' : '']"></div>
            <div class="nav-detail">
              <img src="../../public/icons/server.png" alt="">
              <span>Master Data</span>
            </div>
            <img class="icon" ref="chevron2" src="../../public/icons/down-chevron.png" alt="">
          </div>
          <ul class="nav-tree" ref="navTree2">
            <RouterLink class="link" :to="{name: 'cars'}" :style="[route.path.split('/').includes('cars') ? 'color: #82d114' : '']">Mobil</RouterLink>
            <RouterLink class="link" :to="{name: 'credit packages'}" :style="[route.path.split('/').includes('credit-packages') ? 'color: #82d114' : '']">Paket Kredit</RouterLink>
            <RouterLink class="link" :to="{name: 'customers'}" :style="[route.path.split('/').includes('customers') ? 'color: #82d114' : '']">Customer</RouterLink>
            <RouterLink class="link" :to="{name: 'users'}" :style="[route.path.split('/').includes('users') ? 'color: #82d114' : '']">User</RouterLink>
          </ul>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute, RouterLink } from "vue-router";


const route = useRoute();
const navTree = ref(null);
const navTree2 = ref(null);
const chevron = ref(null);
const chevron2 = ref(null);

function openNav(number) {
  if (number == 1) {
    navTree.value.classList.toggle('openTransaksi');
    chevron.value.classList.toggle('rotate');
    return
  }
  navTree2.value.classList.toggle('openMaster')
  chevron2.value.classList.toggle('rotate');
}

</script>

<style scoped>
.aside{
  width: 250px;
  min-height: 100vh;
  background-color: #f8f9fa;
}
.nav-wrapper{
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 90%;
  align-items: center;
  margin-top: 1rem;
}
.nav-list{
  display: flex;
  flex-direction: column;
  width: 100%;
}
.nav-list:last-child{
  gap: 1rem;
}
.nav-item{
  display: flex;
  flex-direction: column;
}
.nav-detail{
  display: flex;
  align-items: center;
  gap: .5rem;
  margin-left: 20px;
}

.nav-button{
  display: flex;
  align-items: center;
  /* gap: .5rem; */
  height: 45px;
  border-radius: 0 5px 5px 0;
  color: #000;
}
.icon{
  margin-left: 30px;
}
.mark{
  height: 100%;
  width: 5px;
}
.nav-button:hover{
  background-color: #fff;
}
.nav-button:hover span{
  color: #2753d8;
}
.nav-button:hover div.mark{
  background-color: #2753d8;
}
.nav-tree{
  height: 0;
  overflow: hidden;
  padding-left: 61px;
  display: flex;
  flex-direction: column;
  transition: height ease .5s;
}
.user-login{
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  gap: .2rem;
}
.user-login > div:nth-child(2), .link{
  font-size: 15px;
}
.brand-image{
  width: 200px;
}
.nav-list:first-child{
  display: flex;
  align-items: center;
  justify-content: center;
}
.link{
  padding-block: 10px;
  margin-block: 5px;
  color: #000;
}
.link:hover{
  color: #82d114;
}
.openTransaksi{
  height: 96px;
}
.openMaster{
  height: 192px;
}
.rotate{
  transform: rotate(180deg);
}

/* section */
</style>