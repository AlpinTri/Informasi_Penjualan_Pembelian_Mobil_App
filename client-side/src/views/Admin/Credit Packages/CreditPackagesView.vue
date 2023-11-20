<template>
    <section>
    <div class="container-action">
      <div class="wrapper">
        <div class="label-page">User</div>
        <RouterLink :to="{name: 'create credit package'}"><img class="add-icon" src="../../../../public/icons/add.png" alt=""></RouterLink>
      </div>
      <div class="input-group">
        <img class="search-icon" src="../../../../public/icons/search.png" alt="">
        <input type="text" placeholder="Ketik kata kunci untuk mencari">
      </div>
    </div>
    <ul>
      <li v-for="creditPackage in creditPackages" :key="creditPackage.kode_paket">
        <div class="container-detail">
          <div>
            <div class="label">Uang Muka (%)</div>
            <h4>{{ creditPackage.uang_muka }}</h4>
          </div>
          <div>
            <div class="label">Bunga (%)</div>
            <h4>{{ creditPackage.bunga }}</h4>
          </div>
          <div>
            <div class="label">Tenor/Jangka Waktu (Bulan)</div>
            <h4>{{ creditPackage.tenor }}</h4>
          </div>
        </div>
        <RouterLink :to="{name: 'detail credit package', params: {kodePaketKredit: creditPackage.kode_paket}}">
          <img class="detail-chevron" src="../../../../public/icons/right-chevron.png" alt="detail">
        </RouterLink>
        <img @click="removeCreditPackage(creditPackage.kode_paket)" class="delete-icon" src="../../../../public/icons/close.png" alt="">
      </li>
    </ul>
  </section>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive } from "vue";
import userAuthStore from "@/stores/auth";

const store = userAuthStore();
const creditPackages = reactive([]);

onMounted(async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:5000/api/credit-packages',
      headers: {
        authorization: `Bearer ${store.getAccessToken}`
      }
    });

    console.log(response);

    const data = response.data.data;
    data.forEach(item => creditPackages.push(item));
    console.log(creditPackages);

  } catch (err) {
    console.log(err);
  }
});
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
  height: 50px;
}
.container-detail > div{
  width: 30%;
  height: 60px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: .2rem;
}
.label{
  font-size: 14px;
  color: rgba(0, 0, 0, .5)
}
</style>