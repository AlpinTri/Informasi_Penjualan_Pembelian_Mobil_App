<template>
  <section>
    <div class="container-action">
      <div class="wrapper">
        <div class="label-page">Mobil</div>
        <RouterLink :to="{name: 'create car'}"><img class="add-icon" src="../../../../public/icons/add.png" alt=""></RouterLink>
      </div>
      <div class="input-group">
        <img class="search-icon" src="../../../../public/icons/search.png" alt="">
        <input type="text" placeholder="Ketik kata kunci untuk mencari">
      </div>
    </div>
    <ul >
      <li v-for="car in cars" :key="car.kode_mobil">
        <img class="image" :src="`http://localhost:5000/api/assets/images/cars/${car.gambar}`" alt="">
        <div class="container-detail">
          <div>
            <div class="label">Merk</div>
            <h4>{{ car.merk }}</h4>
          </div>
          <div>
            <div class="label">Type</div>
            <h4>{{ car.type }}</h4>
          </div>
          <div>
            <div class="label">Warna</div>
            <h4>{{ car.warna }}</h4>
          </div>
          <div>
            <div class="label">Harga</div>
            <h4>Rp {{ car.harga }}</h4>
          </div>
        </div>
        <RouterLink :to="{name: 'detail car', params: {kodeMobil: car.kode_mobil}}">
          <img class="detail-chevron" src="../../../../public/icons/right-chevron.png" alt="detail">
        </RouterLink>
        <img @click="remove(car.kode_mobil)" class="delete-icon" src="../../../../public/icons/close.png" alt="">
      </li>
    </ul>
  </section>
</template>

<script setup>
import axios, { AxiosError } from "axios";
import userAuthStore from '@/stores/auth';
import { onMounted, reactive, onUpdated } from "vue";
import { RouterLink } from "vue-router";

const store = userAuthStore()

const cars = reactive([])

async function remove(kode) {
  try {
    const response = await axios({
      method: 'DELETE',
      url: `http://localhost:5000/api/cars/${kode}`,
      headers: {
        authorization: `Bearer ${store.getAccessToken}`
      }
    });

    cars.map((car, index) => {
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

onMounted(async () => { 
  try {
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:5000/api/cars',
    });

    if (response.status == 200) {
      response.data.data.forEach(car => cars.push(car));
    }
    
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
}
</style>