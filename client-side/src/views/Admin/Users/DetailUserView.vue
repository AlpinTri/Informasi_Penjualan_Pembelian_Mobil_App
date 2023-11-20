<template>
  <section>
    <div class="page">
      <div>Data User</div>
      <div>/</div>
      <div>Create</div>
    </div>
    <form action="#">
      <div class="container-input">
        <div class="container-input-group">
          <div class="input-group">
            <label for="" class="label">Nama</label>
            <input type="text" v-model="data.nama" disabled>
          </div>
          <div class="input-group">
            <label for="" class="label">Jenis Kelamin</label>
            <select name="" id="" >
              <option value="" selected>{{ data.jenis_kelamin }}</option>
            </select>
          </div>
        </div>
        <div class="container-input-group">
          <div class="input-group">
            <label for="" class="label">Nomor Telepon</label>
            <input type="text" v-model="data.no_telp" disabled>
          </div>
          <div class="input-group">
            <label for="" class="label">Status</label>
            <select name="" id="">
              <option value="" selected>{{ data.status }}</option>
            </select>
          </div>
        </div>
        <!-- <div class="input-group">
          <label for="" class="label">Password</label>
          <input type="text" v-model="data.password" disabled>
        </div> -->
      </div>
    </form>
  </section>
</template>

<script setup>
import axios, { AxiosError } from "axios";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import userAuthStore from '@/stores/auth';

const route = useRoute();
const store = userAuthStore()
const data = reactive({

});

onMounted(async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: `http://localhost:5000/api/users/${route.params.kodeUser}`,
      headers: {
        authorization: `Bearer ${store.getAccessToken}`,
      }
    });

    Object.keys(response.data.data[0]).forEach(key => data[key] = response.data.data[0][key]);
    console.log(response)
    console.log(data)
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err);
    } else {
      console.log(err)
    }
  }
})
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
.d-flex{
  display: flex;
}
</style>

