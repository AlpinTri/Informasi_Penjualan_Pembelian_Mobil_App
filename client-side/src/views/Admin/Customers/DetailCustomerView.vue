<template>
  <section>
    <div class="page">
      <div>Data Mobil</div>
      <div>/</div>
      <div>Detail</div>
    </div>
    <form action="#">
      <div id="container-form">
        <div class="top-container">
          <div class="input-group input-image">
            <label for="image-input" class="image-label">
              <img class="image-input" src="../../../../public/icons/photo.png" alt="">
              <span>Upload Image</span>
            </label>
            <input ref="inputImage" type="file" name="image-input" id="" accept=".png, .jpg, .jpeg">
            <img ref="previewImage" :src="`http://localhost:5000/api/assets/images/customers/${customer.foto}`" class="preview-image" alt="" >
          </div>
          <div class="container-input">
            <div class="input-group">
              <label for="" class="label">NIK</label>
              <input type="text" disabled v-model="customer.nik">
            </div>
            <div class="input-group">
              <label for="" class="label">Nama Customer</label>
              <input type="text" disabled v-model="customer.nama">
            </div>
            <div class="container-input-group">
              <div class="input-group">
                <label for="" class="label">Jenis Kelamin</label>
                <select name="" id="">
                  <option value="" selected>{{ customer.jenis_kelamin }}</option>
                </select>
              </div>
              <div class="input-group">
                <label for="" class="label">Nomor Telepon</label>
                <input type="text" disabled v-model="customer.no_telp">
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-container">
          <div class="input-group">
            <label for="" class="label">Alamat</label>
            <textarea name="" id="" cols="30" rows="5" disabled v-model="customer.alamat"></textarea>
          </div>
        </div>
      </div>
    </form>
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
const customer = reactive({

})

console.log(route)
console.log(router)

onMounted(async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: `http://localhost:5000/api/customers/${route.params.nik}`,
      headers: {
        authorization: `Bearer ${store.getAccessToken}`
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
#container-form{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}
.top-container, .bottom-container{
  display: flex;
  gap: 10px;
}
.bottom-container > .input-group{
  flex-grow: 1;
}
.container-input-group{
  display: flex;
  gap: 2rem;
}
.container-input-group > .input-group{
  width: 100%;
}
.input-group{
  display: flex;
  position: relative;
}
.image-input{
  width: 32px;
}
.image-label{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .3rem;
}
.input-image{
  width: 200px;
  height: 200px;
  border: 1px dashed rgba(0, 0, 0, .1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.input-image:hover > label > span{
  color: #2753d8;
}
.input-image:hover{
  cursor: pointer;
}
input[type="file"]{
  display: none;
}
.container-input{
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 2rem;
  flex-grow: 1;
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

.preview-image{
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  display: flex;
}
input[type="tel"]{
  font-size: 15px;
  border: none;
  outline: none;
  width: 100%;
}
.rp{
  padding-inline-end: 10px;
  border-inline-end: 1px solid #000;
}
.money{
  background-color: #fff;
  align-items: center;
  padding: 10px;
  padding-inline: 15px;
  font-size: 15px;
  border-radius: 8px;
  gap: 10px;
}

.d-flex{
  display: flex;
}
</style>