<template>
  <section>
    <div class="container">
      <div class="container-top">
        <span class="header">Mobil</span>
        <RouterLink v-show="userInfo.status === 'Super Admin'" class="add-icon-wrapper" :to="{name: 'create car'}">
          <svg class="add-icon" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </RouterLink>
        <form class="input-group">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#dadee0" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input name="q" class="input" type="text" placeholder="Ketik kata kunci untuk mencari" v-model="keyword">
        </form>
      </div>
      <ul class="list-item-container">
        <li class="list-item" v-for="car in cars" :key="car.kode_mobil">
          <img class="image" alt="" :src="`http://localhost:5000/api/assets/images/cars/${car.gambar}`">
          <div class="container-detail-data">
            <div class="detail-data">
              <div class="header-data">Type</div>
              <div class="data">{{ car.type }}</div>
            </div>
            <div class="detail-data">
              <div class="header-data">Merk</div>
              <div class="data">{{ car.merk }}</div>
            </div>
            <div class="detail-data">
              <div class="header-data">Warna</div>
              <div class="data">{{ car.warna }}</div>
            </div>
            <div class="detail-data">
              <div class="header-data">Harga</div>
              <div class="data">{{ rupiah.format(car.harga) }}</div>
            </div>
          </div>
          <RouterLink class="detail-icon" :to="{name: 'detail car', params: {kodeMobil: car.kode_mobil}}">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="M9 18l6-6-6-6"/></svg>
          </RouterLink>
          <svg v-show="userInfo.status === 'Super Admin'" @click="remove(car.kode_mobil)" class="delete-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#495057" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import axios, { AxiosError } from "axios";
import userAuthStore from '@/stores/auth';
import { onMounted, reactive, ref} from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";

const keyword = ref(null);

const route = useRoute();

// User Store
const store = userAuthStore();
const token = store.getToken();
const userInfo = store.getUserInfo();

// Cars Data
const cars = reactive([]);

// Format IDR
const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR'
});

// Delete Car Function
async function remove(kode) {
  try {
    const response = await axios({
      method: 'DELETE',
      url: `http://localhost:5000/api/cars/${kode}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    cars.forEach((car, index) => {
      car.kode_mobil == kode ? cars.splice(index, 1) : null;
    });

  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err)
    } else {
      console.log('somthing error')
    }
  }
}

// Mounted Events
onMounted(async () => { 
  try {
    const { q } = route.query;

    if (!q || !q.trim()) {
      const response = await axios({
        baseURL: 'http://localhost:5000/api',
        method: 'GET',
        url: '/cars',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      response.data.data.forEach(car => cars.push(car));
      return;
    }


    const response = await axios({
      baseURL: 'http://localhost:5000/api',
      method: 'GET',
      url: `/cars?q=${q}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    response.data.data.forEach(car => cars.push(car));
    keyword.value = q;

  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err)
    } else {
      console.log('somthing error')
    }
  }
})
</script>

<style scoped>
section{
  width: calc(100% - 250px);
  margin-left: 250px;
  overflow-x: hidden;
}
.container{
  width: 95%;
  margin-inline: auto;
  margin-top: calc(5%/2);
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Main Content */
.container-top{
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding-inline: 1rem;
}
.add-icon{
  box-sizing: content-box;
  padding: 3px;
  background-color: #2753d8;
  border-radius: 8px;
}
.header{
  font-weight: 600;
  font-size: 20px;
}
.input{
  padding: 10px;
  flex-grow: 1;
  border: none;
  outline: none;
  width: 300px;
}
.input-group{
  padding-inline: 5px;
  border-radius: 8px;
  border: 2px solid #f3f7fa;
  display: flex;
  align-items: center;
}

/* List Item */
.list-item-container{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.list-item{
  width: 100%;
  padding: 7px;
  background-color: #f3f7fa;
  border-radius: 8px;
  position: relative;
  display: flex;
  gap: 1.5rem;
}
.container-detail-data{
  display: flex;
  flex-grow: 1;
  gap: 1rem;
}
.detail-data{
  width: calc(100%/4);
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.header-data{
  font-size: 13px;
  color: #adb5bd;
}
.data{
  font-weight: 600;
}
.image{
  width: 110.4px;
  height: 73.6px;
}
.detail-icon{
  align-self: center;
}
.delete-icon{
  position: absolute;
  box-sizing: content-box;
  background-color: #f3f7fa;
  border-radius: 999px;
  border: 1px solid #6c757d;
  padding: 2px;
  right: 0;
  top: 0;
  transform: translate(50%, -50%);
}
.add-icon-wrapper{
  display: flex;
  align-items: center;
}

/* section{
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 95%;
  margin-inline: auto;
}
.add-icon{
  padding: 5px;
  border-radius: 5px;
  background-color: #2753d8;
}
.wrapper{
  display: flex;
  gap: 1rem;
  align-items: center;
}
.label-page{
  font-size: 1.3rem;
  font-weight: bold;
}
.container-action{
  display: flex;
  gap: 1.5rem;
}
.input-group{
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, .1);
  padding: 5px;
  padding-inline: 10px;
  display: flex;
  gap: .5rem;
  align-items: center;
}
.input-group > input{
  padding: 5px;
  width: 400px;
  border: none;
  outline: none;
  font-family: Roboto;
  font-size: 1rem;
}

ul{
  width: 98%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
ul > li{
  display: flex;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 8px;
  position: relative;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
}
ul > li:hover{
  background-color: #fff;
  box-shadow: 0 0 10px #cfdae4;
}
.image{
  width: 100px;
  height: 70px;
}
.delete-icon{
  padding: 5px;
  border-radius: 100%;
  border: 1px solid rgba(0, 0, 0, .1);
  background-color: #f8f9fa;
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(50%, -50%);
}
.detail-chevron{
  padding: 5px;
  border-radius: 100%;
  background-color: #f8f9fa;
}
.container-detail{
  display: flex;
  width: 100%;
}
.container-detail > div{
  width: 25%;
  height: 60px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: .2rem;
}
.label{
  font-size: 14px;
} */
</style>