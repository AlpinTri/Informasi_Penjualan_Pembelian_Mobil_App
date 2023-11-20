<template>
  <section>
    <div class="page">
      <div>Data User</div>
      <div>/</div>
      <div>Create</div>
    </div>
    <form action="" @submit.prevent="createCreditPackage">
      <div class="container-input">
        <div class="container-input-group">
          <div class="input-group">
            <label for="" class="label">Uang Muka</label>
            <input type="text" v-model="data.uangMuka">
            <span>%</span>
          </div>
          <div class="input-group">
            <label for="" class="label">Bunga</label>
            <input type="text" v-model="data.bunga">
            <span>%</span>
          </div>
          <div class="input-group">
            <label for="" class="label">Tenor/Jangka Waktu</label>
            <input type="text" v-model="data.tenor">
            <span>Month</span>
          </div>
        </div>
      </div>
      <button type="submit">Simpan</button>
    </form>
  </section>
</template>

<script setup>
import axios from "axios";
import userAuthStore from '@/stores/auth';
import { reactive } from "vue";

const store = userAuthStore();
const data = reactive({
  uangMuka: '',
  bunga: '',
  tenor: ''
});


async function createCreditPackage() {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:5000/api/credit-packages',
      data: {
        uangMuka: data.uangMuka,
        bunga: data.bunga,
        tenor: data.tenor
      },
      headers: {
        authorization: `Bearer ${store.getAccessToken}`
      }
    });
  } catch (err) {
    console.log(err)
  }
}
</script>

<style scoped>
section{
  width: 96%;
  margin: auto;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.page{
  display: flex;
  gap: .5rem;
  align-items: center;
}
.page > div{
  font-size: 1.3rem;
  font-weight: bold;
}
.page > div:last-child{
  font-size: 1.2rem;
  color: #2753d8;
}
form{
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  gap: 20px;
  flex-direction: column;
}
.input-group{
  display: flex;
  position: relative;
  gap: .5rem;
  align-items: center;
}
.container-input{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
}
.container-input-group{
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}
.container-input-group > div.input-group{
  width: 100%;
}
.label{
  position: absolute;
  left: 0;
  top: 0;
  font-size: 13px;
  transform: translate(15px, -50%);
  z-index: 0;
  background-color: #f8f9fa;
  transition: 1s ease;
  color: rgba(0, 0, 0, 0.8);
  padding-inline: 2px;
  font-family: Roboto;
}
input[type="text"], select{
  padding: 10px;
  padding-inline: 15px;
  font-size: 15px;
  width: 100%;
  outline: none;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-family: Roboto;
}
button{
  padding: 10px;
  font-family: Roboto;
  font-size: 1rem;
  border-radius: 8px;
  border: transparent;
  background-color: #2753d8;
  color: #fff;
}
button:hover{
  background-color: #2e60f4;
}

/* input{
  padding: 10px;
  padding-inline: 15px;
  font-size: 15px;
  width: 100%;
  outline: none;
  border-radius: 8px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  font-family: Roboto;
} */

.d-flex{
  display: flex;
}
</style>