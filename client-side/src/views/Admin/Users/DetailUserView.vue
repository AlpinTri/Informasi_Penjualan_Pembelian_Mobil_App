<template>
  <section>
    <div class="container">
      <div class="container-top">
        <span class="domain">User</span>
        <span class="slash">/</span>
        <span class="codomain">Detail</span>
      </div>
      <div class="container-bottom">
        <form class="form" action="#">
          <div class="main-container-form">
            <div class="input-group">
              <label for="" class="label">Kode User</label>
              <input type="text" readonly v-model="data.kode_user">
            </div>
            <div class="container-form-top">
              <div class="input-group">
                <label for="" class="label">Nama</label>
                <input type="text" readonly v-model="data.nama">
              </div>
              <div class="input-group">
                <label for="" class="label">Jenis Kelamin</label>
                <select name="" id="">
                  <option value="" selected>{{ data.jenis_kelamin }}</option>
                </select>
              </div>
            </div>
            <div class="container-form-bottom">
              <div class="input-group">
                <label for="" class="label">No Telp</label>
                <input type="text" readonly v-model="data.no_telp">
              </div>
              <div class="input-group">
                <label for="" class="label">Status</label>
                <select name="" id="">
                  <option value="" selected>{{ data.status }}</option>
                </select>
              </div>
            </div>
            <div class="input-group">
              <label for="" class="label">Password</label>
              <input type="text" readonly v-model="data.password">
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
  <!-- <section>
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
      </div>
    </form>
  </section> -->
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
  gap: 1rem;
}

/* Main Content */
.main-container-form{
  display: flex;
  flex-direction: column;
  gap: 20px;
}
/* Top */
.container-top{
  display: flex;
  align-items: center;
  gap: .5rem;
  padding-inline: 1rem;
}
.domain, .slash{
  font-weight: 600;
  font-size: 20px;
}
.codomain{
  font-size: 17px;
  font-weight: 600;
  color: #2753d8;
}

/* Right */
.container-form-top, .container-form-bottom{
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
.container-form-top > .input-group, .container-form-bottom > .input-group{
  width: calc(100%/2);
}
.form{
  background-color: #f3f7fa;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.input-group{
  display: flex;
  position: relative;
  flex-grow: 1;
}
.label{
  position: absolute;
  left: 0;
  top: 0;
  font-size: 13px;
  transform: translate(15px, -50%);
  z-index: 0;
  background-color: #f3f7fa;
  transition: 1s ease;
  color: rgba(0, 0, 0, 0.8);
  padding-inline: 2px;
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
.rp{
  padding-inline-end: 10px;
  padding-inline-start: 1rem;
  border-inline-end: 1px solid #000;
  position: absolute;
  
}
.money{
  position: relative;
  display: flex;
  align-items: center;
}
.money > input{
  padding-left: 55px;
}
.submit-button{
  padding: 10px;
  font-family: Roboto;
  font-size: 1rem;
  border-radius: 8px;
  border: transparent;
  background-color: #2753d8;
  color: #fff;
}
.submit-button:hover{
  background-color: #2b5ae5;
}

/* section{
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
} */
</style>

