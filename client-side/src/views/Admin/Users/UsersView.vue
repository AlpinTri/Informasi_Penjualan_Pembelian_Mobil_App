<template>
  <section>
    <div class="container-action">
      <div class="wrapper">
        <div class="label-page">User</div>
        <RouterLink :to="{name: 'create user'}"><img class="add-icon" src="../../../../public/icons/add.png" alt=""></RouterLink>
      </div>
      <div class="input-group">
        <img class="search-icon" src="../../../../public/icons/search.png" alt="">
        <input type="text" placeholder="Ketik kata kunci untuk mencari">
      </div>
    </div>
    <ul>
      <li v-for="user in users" :key="user.kode_user">
        <div class="container-detail">
          <div>
            <div class="label">Nama User</div>
            <h4>{{ user.nama }}</h4>
          </div>
          <div>
            <div class="label">Jenis Kelamin</div>
            <h4>{{ user.jenis_kelamin }}</h4>
          </div>
          <div>
            <div class="label">No Telp</div>
            <h4>{{ user.no_telp }}</h4>
          </div>
          <div>
            <div class="label">Status</div>
            <h4>{{ user.status }}</h4>
          </div>
        </div>
        <RouterLink :to="{name: 'detail user', params: {kodeUser: user.kode_user}}">
          <img class="detail-chevron" src="../../../../public/icons/right-chevron.png" alt="detail">
        </RouterLink>
        <img @click="removeUser(user.kode_user)" class="delete-icon" src="../../../../public/icons/close.png" alt="">
      </li>
    </ul>
  </section>
</template>

<script setup>
import axios, { AxiosError } from "axios";
import { onMounted, reactive } from "vue";
import userAuthStore from '@/stores/auth';

const store = userAuthStore();


const users = reactive([])



async function removeUser(kode) {
  try {
    const response = await axios({
      method: 'DELETE',
      url: `http://localhost:5000/api/users/${kode}`,
      headers: {
        authorization: `Bearer ${store.getAccessToken}`,
      }
    })

    users.map((user, index) => user.kode_user === kode ? users.splice(index, 1) : null);
    console.log(response);
    console.log(users)
  } catch (err) {
    console.log(err);
  }
}

onMounted(async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:5000/api/users',
      headers: {
        authorization: `bearer ${store.getAccessToken}`,
      }
    });

    const data = response.data.data;

    if (data.length) {
      data.forEach(user => users.push(user));
      console.log(users)
    }
    
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err)
    } else {
      console.log(err.message)
    }
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