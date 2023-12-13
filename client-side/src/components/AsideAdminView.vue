<template>
  <aside>
    <div class="container-aside">
      <div class="user-login-wrapper">
        <div>{{ user.name }}</div>
        <span>{{ user.status }}</span>
      </div>
      <ul class="aside-link-wrapper">
        <li class="aside-link-item">
          <RouterLink :to="{name: 'dashboard'}" :class="isDashboard" class="aside-link">
            <span :class="mark('dashboard')" class="mark"></span>
            <div class="aside-button-wrapper">
              <div class="aside-button">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" :stroke="changeStroke('dashboard')" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                <span>Dashboard</span>
              </div>
            </div>
          </RouterLink>
        </li>
        <li class="aside-link-item">
          <div @click="collapse('transaksi')" :class="isTransaction" class="aside-link">
            <span :class="mark('transactions')" class="mark"></span>
            <div class="aside-button-wrapper">
              <div class="aside-button">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" :stroke="changeStroke('transactions')" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                <span>Transaksi</span>
              </div>
              <svg ref="moreNavTransactionsIcon" class="more-nav-icon icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" :stroke="changeStroke('transactions')" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="arcs"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </div>
          <ul class="nav-dropdown-wrapper" ref="transactionsCollapse">
            <RouterLink v-show="user.status === 'Super Admin' || user.status === 'Sales' || user.status === 'Finance'" :to="{name: 'cash transactions'}" :class="isActive('cash')" class="dropdown-item">Cash</RouterLink>
            <RouterLink v-show="user.status === 'Super Admin' || user.status === 'Sales' || user.status === 'Finance'" :to="{name: 'credit transactions'}" :class="isActive('credit')" class="dropdown-item">Kredit</RouterLink>
            <RouterLink v-show="user.status === 'Super Admin' || user.status === 'Finance'" :to="{name: 'print file'}" :class="isActive()" class="dropdown-item">Print Report</RouterLink>
          </ul>
        </li>
        <li class="aside-link-item">
          <div @click="collapse('master')" :class="isMaster" class="aside-link">
            <span :class="mark('master')" class="mark"></span>
            <div class="aside-button-wrapper">
              <div class="aside-button">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" :stroke="changeStroke('master')" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
                <span>Master Data</span>
              </div>
              <svg ref="moreNavMasterIcon" class="more-nav-icon icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" :stroke="changeStroke('master')" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="arcs"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </div>
          <ul class="nav-dropdown-wrapper" ref="masterCollapse">
            <RouterLink  v-show="user.status === 'Super Admin' || user.status === 'Sales' || user.status === 'Finance'" :to="{name: 'cars'}" :class="isActive('cars')" class="dropdown-item">Mobil</RouterLink>
            <RouterLink v-show="user.status === 'Super Admin' || user.status === 'Sales'" :to="{name: 'customers'}" :class="isActive('customers')" class="dropdown-item">Customer</RouterLink>
            <RouterLink v-show="user.status === 'Super Admin' || user.status === 'Finance'" :to="{name: 'credit packages'}" :class="isActive('credit-packages')" class="dropdown-item">Paket Kredit</RouterLink>
            <RouterLink v-show="user.status === 'Super Admin'" :to="{name: 'users'}" :class="isActive('users')" class="dropdown-item">User</RouterLink>
          </ul>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, RouterLink } from "vue-router";
import userAuthStore from "../stores/auth";

const store = userAuthStore();
const user = store.getUserInfo();
// console.log(store.getLoginUser)
const route = useRoute();

// ref Elements
const masterCollapse = ref(null);
const transactionsCollapse = ref(null);
const moreNavMasterIcon = ref(null);
const moreNavTransactionsIcon = ref(null);

// Manipulation Elements
const isDashboard = computed(() => route.path.split('/').includes('dashboard') ? 'active' : 'color-black');
const isTransaction = computed(() => route.path.split('/').includes('transactions') ? 'active' : null);
const isMaster = computed(() => route.path.split('/').includes('master') ? 'active' : null);
const changeStroke = (name) => route.path.split('/').includes(name) ? '#2753d8' : '#000';
const mark = (name) => route.path.split('/').includes(name) ? 'bg-blue' : 'bg-dark';
const isActive = (name) => route.path.split('/').includes(name) ? 'color-green' : 'color-black';
const collapse = (name) => {
  if (name === 'transaksi') {
    transactionsCollapse.value.classList.toggle('transaction-collapse');
    moreNavTransactionsIcon.value.classList.toggle('rotate-180');
  } else {
    masterCollapse.value.classList.toggle('master-collapse');
    moreNavMasterIcon.value.classList.toggle('rotate-180');
  }
}

</script>

<style scoped>
aside{
  width: 250px;
  min-height: calc(100vh - 70px);
  height: auto;
  background-color: #f3f7fa;
  position: fixed;
}
.container-aside{
  width: 90%;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.container-aside *{
  font-weight: 600;
}
.aside-button-wrapper{
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 30px;
  justify-content: space-between;
  flex-grow: 1;
}
.aside-button{
  display: flex;
  align-items: center;
  gap: .5rem;
}
.aside-link-wrapper{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.aside-link{
  display: flex;
  align-items: center;
  width: 100%;
}
.mark{
  width: 5px;
  height: 45px;
  background-color: #fff;
}
.aside-link:hover{
  background-color: #fff;
  border-radius: 0 8px 8px 0;
}
.aside-link:hover > .mark{
  background-color: #2753d8;
}
.aside-link:hover .icon{
  stroke: #2753d8;
}
.aside-link:hover > .aside-button-wrapper span{
  color: #2753d8;
}
.aside-link-item{
  display: flex;
  flex-direction: column;
}

.user-login-wrapper{
  padding-left: 35px;
}
.user-login-wrapper > div{
  font-size: 20px;
}
.user-login-wrapper > span{
  font-size: 13px;
  font-weight: 400;
}




/* Dropdown */
.nav-dropdown-wrapper{
  display: flex;
  flex-direction: column;
  gap: .5rem;
  height: 0;
  overflow: hidden;
  transition: .4s ease;
}
.dropdown-item{
  padding: 12.5px 10px 12.5px 70px;
  font-size: 15px;
}
.more-nav-icon{
  transition: transform .4s ease;
}


/* Manipulation Class */
.active{
  background-color: #fff;
  color: #2753d8;
  border-radius: 0 8px 8px 0;
}
.bg-blue{
  background-color: #2753d8;
}
.color-green{
  color: #82d114;
}
.color-black{
  color: #000;
}
.transaction-collapse{
  /* height: 145px; */
  height: auto;
}
.master-collapse{
  /* height: 196px; */
  height: auto;
}
.rotate-180{
  transform: rotate(-180deg);
}
</style>