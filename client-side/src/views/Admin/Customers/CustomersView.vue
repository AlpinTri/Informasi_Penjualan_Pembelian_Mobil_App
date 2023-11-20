<template>
  <section>
    <div class="container-action">
      <div class="wrapper">
        <div class="label-page">Customer</div>
        <RouterLink :to="{name: 'create customer'}"><img class="add-icon" src="../../../../public/icons/add.png" alt=""></RouterLink>
      </div>
      <div class="input-group">
        <img class="search-icon" src="../../../../public/icons/search.png" alt="">
        <input type="text" placeholder="Ketik kata kunci untuk mencari">
      </div>
    </div>
    <ul>
      <li v-for="customer in customers" :key="customer.nik">
        <div class="container-detail">
          <div>
            <div class="label">NIK</div>
            <h4>{{ customer.nik }}</h4>
          </div>
          <div>
            <div class="label">Nama Customer</div>
            <h4>{{ customer.nama }}</h4>
          </div>
          <div>
            <div class="label">Jenis Kelamin</div>
            <h4>{{ customer.jenis_kelamin }}</h4>
          </div>
          <div>
            <div class="label">Nomor Telepon</div>
            <h4>{{ customer.no_telp }}</h4>
          </div>
        </div>
        <RouterLink :to="{name: 'detail customer', params: {nik: customer.nik}}">
          <img class="detail-chevron" src="../../../../public/icons/right-chevron.png" alt="detail">
        </RouterLink>
        <img @click="removeCustomer(customer.nik)" class="delete-icon" src="../../../../public/icons/close.png" alt="">
      </li>
    </ul>
  </section>
</template>

<script setup>
import axios, { AxiosError } from "axios";
import { onMounted, reactive } from "vue";
import userAuthStore from '@/stores/auth';


const store = userAuthStore();
const customers = reactive([]);


async function removeCustomer(nik) {
  try {
    const response = await axios({
      method: 'DELETE',
      url: `http://localhost:5000/api/customers/${nik}`,
      headers: {
        authorization: `Bearer ${store.getAccessToken}`
      }
    });

    customers.map((customer, index) => customer.nik === nik ? customers.splice(index, 1) : null);
    console.log(response)
    console.log(customers)
  } catch(err) {
    console.log(err)
  }
}

onMounted(async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: `http://localhost:5000/api/customers`,
      headers: {
        authorization: `Bearer ${store.getAccessToken}`
      }
    });

    const data = response.data.data;

    data.forEach(customer => customers.push(customer));

  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err)
    } else {
      console.log(err)
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
  width: 25%;
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