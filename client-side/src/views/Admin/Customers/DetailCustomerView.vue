<template>
  <section>
    <div class="container">
      <div class="container-top">
        <div class="container-title-page">
          <span class="domain">Customer</span>
          <span class="slash">/</span>
          <span class="codomain">Detail</span>
        </div>
        <RouterLink :to="{ name: 'edit customer', params: { nik: route.params.kodeCustomer } }" class="edit-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
          <span class="header-button">Edit</span>
        </RouterLink>
      </div>
      <div class="container-bottom">
        <form class="form" action="#">
          <div class="main-container-form">
            <div class="container-form-top">
              <div class="container-form-left">
                <div class="input-group input-image">
                  <label for="image-input" class="image-label">
                    <svg class="image-icon" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="arcs"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M20.4 14.5L16 10 4 20"/></svg>
                    <span>Upload customer image</span>
                  </label>
                  <input ref="inputImage" type="file" name="image-input" id="" accept=".png, .jpg, .jpeg">
                  <img ref="previewImage" :src="`http://localhost:5000/api/assets/images/customers/${customer.foto}`" class="preview-image" alt="">
                </div>
              </div>
              <div class="container-form-right">
                <div class="input-group">
                  <label for="" class="label">NIK</label>
                  <input type="text" readonly v-model="customer.nik">
                </div>
                <div class="input-group">
                  <label for="" class="label">Nama</label>
                  <input type="text" readonly v-model="customer.nama">
                </div>
                <div class="input-group">
                  <label for="" class="label">No Telepon</label>
                  <input type="text" readonly v-model="customer.no_telp">
                </div>
                <div class="input-group">
                  <label for="" class="label">Jenis Kelamin</label>
                  <select name="" id="">
                    <option value="" selected>{{ customer.jenis_kelamin }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="input-group">
              <label for="" class="label">Alamat</label>
              <textarea readonly class="text-area" name="" id="" cols="30" rows="5" v-model="customer.alamat"></textarea>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import userAuthStore from '@/stores/auth';

const route = useRoute();
const router = useRouter();
const store = userAuthStore();
const token = store.getToken();

const customer = reactive({

});

onMounted(async () => {
  try {
    const response = await axios({
      baseURL: 'http://localhost:5000/api',
      method: 'GET',
      url: `/customers/${route.params.nik}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(response)
    Object.keys(response.data.data[0]).forEach(key => customer[key] = response.data.data[0][key]);
    console.log(customer.foto)
  } catch (err) {
    console.log(err)
  }
});
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
  justify-content: space-between;
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
.container-title-page{
  display: flex;
  align-items: center;
  gap: .5rem;
  padding-inline: 1rem;
}
.edit-button{
  display: flex;
  align-items: center;
  padding: 7px 10px;
  gap: 6px;
  background-color: #2753d8;
  outline: none;
  border: none;
  border-radius: 8px;
  margin-inline-end: 1rem;
}
.header-button{
  font-family: 'Roboto';
  font-size: 15px;
  color: #fff;
}

/* Top */
.container-form-top{
  display: flex;
  gap: 20px;
}
/* Right */
.container-form-right{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
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
}
.image-label{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .3rem;
}
.input-image{
  width: 250px;
  height: 250px;
  border: 1px dashed rgba(0, 0, 0, .1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.input-image:hover{
  border: 1px dashed rgba(39, 83, 216, 1);
  cursor: pointer;
}
.input-image:hover .image-icon{
  stroke: #2753d8;
}
.input-image:hover span{
  color: #2753d8;
}
input[type="file"]{
  display: none;
}
.preview-image{
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 8px;
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
input[type="text"], select, textarea{
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

.d-flex{
  display: flex;
}


</style>