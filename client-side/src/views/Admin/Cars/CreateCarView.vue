<template>
  <section>
    <div class="page">
      <div>Data Mobil</div>
      <div>/</div>
      <div>Create</div>
    </div>
    <form action="#" @submit.prevent="createCar">
      <div id="container-form">
        <div class="input-group input-image" @click="() => inputImage.click()">
          <label for="image-input" class="image-label">
            <img class="image-input" src="../../../../public/icons/photo.png" alt="">
            <span>Upload Image</span>
          </label>
          <input v-on:change="addFile" ref="inputImage" type="file" name="image-input" id="" accept=".png, .jpg, .jpeg">
          <img ref="previewImage" src="" class="preview-image" alt="" >
        </div>
        <div class="container-input">
            <div class="input-group">
              <label for="" class="label">Merk</label>
              <input type="text" v-model="data.merk">
            </div>
            <div class="input-group">
              <label for="" class="label">Type</label>
              <input type="text" v-model="data.type">
            </div>
            <div class="input-group">
              <label for="" class="label">Warna</label>
              <input type="text" v-model="data.warna">
            </div>
            <div class="input-group">
              <label for="" class="label">Bahan Bakar</label>
              <input type="text" v-model="data.bahanBakar">
            </div>
            <div class="input-group">
              <label for="" class="label">Jenis Transmisi</label>
              <select name="" id="" v-model="data.jenisTransmisi">
                <option value="" selected disabled>Pilih jenis transmisi</option>
                <option value="Otomatis">Otomatis</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
          <div class="input-group money">
            <label for="" class="label">Harga</label>
            <div class="rp">Rp</div>
            <input type="tel" v-model="data.harga">
          </div>
        </div>
      </div>
      <button type="submit">Simpan</button>
    </form>
  </section>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import axios, {AxiosError} from 'axios';
import userAuthStore from '@/stores/auth';

const inputImage = ref(null);
const previewImage = ref(null);
const data = reactive({
  merk: '',
  type: '',
  warna: '',
  bahanBakar: '',
  jenisTransmisi: '',
  harga: ''
});
const store = userAuthStore()
const form = new FormData();

function addFile(event) {
  previewImage.value.src = URL.createObjectURL(event.target.files[0]);
  previewImage.value.classList.add('d-flex');
  form.append('gambar', event.target.files[0]);
}



async function createCar() {
  try {
    Object.keys(data).forEach(key => form.append(`${key}`, data[key]));
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:5000/api/cars',
      data: form,
      headers: {
        authorization: `Bearer ${store.getAccessToken}`
      }
    });
    console.log(response)
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err)
    } else {
      console.log('somthing error')
    }
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
#container-form{
  display: flex;
  gap: 10px;
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
  width: 400px;
  height: 350px;
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
  justify-content: space-between;
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

.preview-image{
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  display: none;
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