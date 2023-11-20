<template>
  <section>
    <div class="page">
      <div>Data Mobil</div>
      <div>/</div>
      <div>Detail</div>
    </div>
    <form action="">
      <div id="container-form">
        <div class="input-group input-image">
          <label for="image-input" class="image-label">
            <img class="image-input" src="../../../../public/icons/photo.png" alt="">
            <span>Upload Image</span>
          </label>
          <input ref="inputImage" type="file" name="image-input" id="" accept=".png, .jpg, .jpeg">
          <img ref="previewImage" :src="`http://localhost:5000/api/assets/images/cars/${data.gambar}`" class="preview-image" alt="" >
        </div>
        <div class="container-input">
            <div class="input-group">
              <label for="" class="label">Merk</label>
              <input type="text" disabled v-model="data.merk">
            </div>
            <div class="input-group">
              <label for="" class="label">Type</label>
              <input type="text" disabled v-model="data.type">
            </div>
            <div class="input-group">
              <label for="" class="label">Warna</label>
              <input type="text" disabled v-model="data.warna">
            </div>
            <div class="input-group">
              <label for="" class="label">Bahan Bakar</label>
              <input type="text" disabled v-model="data.bahan_bakar">
            </div>
            <div class="input-group">
              <label for="" class="label">Jenis Transmisi</label>
              <select name="" id="" style="background-color: #f8f9fa;">
                <option value="" selected>{{ data.jenis_transmisi }}</option>
              </select>
            </div>
          <div class="input-group money">
            <label for="" class="label">Harga</label>
            <div class="rp">Rp</div>
            <input type="text" disabled v-model="data.harga">
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import axios, { AxiosError } from 'axios';
import userAuthStore from '@/stores/auth';

const store = userAuthStore();
const route = useRoute();

const data = reactive({

});

onMounted(async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: `http://localhost:5000/api/cars/${route.params.kodeMobil}`,
      headers: {
        authorization: `Bearer ${store.getAccessToken}`
      }
    });

    Object.keys(response.data.data[0]).forEach(key => data[key] = response.data.data[0][key]);

    console.log(data)
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err)
    } else {
      console.log(err.message, 'fail')
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
/* button{
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
} */

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
  display: flex;
}
/* input[type="tel"]{
  font-size: 15px;
  border: none;
  outline: none;
  width: 100%;
} */
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
/* .money{
  background-color: #f8f9fa;
  align-items: center;
  padding: 10px;
  padding-inline: 15px;
  font-size: 15px;
  border-radius: 8px;
  gap: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
} */
</style>