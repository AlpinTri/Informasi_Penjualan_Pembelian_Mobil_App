<template>
  <section>
    <div class="container">
      <div class="container-top">
        <span class="domain">Pembelian Cash</span>
        <span class="slash">/</span>
        <span class="codomain">Create</span>
      </div>
      <div class="container-bottom">
        <form class="form" action="#" @submit.prevent="createCashTransaction">
          <div class="main-container-form">
            <div class="container-form-left">
              <div class="input-group input-image" @click="() => inputImage.click()">
                <label for="image-input" class="image-label">
                  <svg class="image-icon" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="arcs"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M20.4 14.5L16 10 4 20"/></svg>
                  <span>Upload customer image</span>
                </label>
                <input @change="addFile" ref="inputImage" type="file" name="image-input" id="" accept=".png, .jpg, .jpeg">
                <img ref="previewImage" src="" class="preview-image" alt="">
              </div>
            </div>
            <div class="container-form-right">
              <div class="input-group">
                <label for="" class="label">NIK</label>
                <input type="text" v-model="temporaryCash.nik">
              </div>
              <div class="input-group">
                <label for="" class="label">Type Mobil</label>
                <select name="" id="" @change="selectedType" v-model="temporaryCash.type">
                  <option value="" selected disabled>Pilih tipe mobil</option>
                  <option :value="type" v-for="(type, index) in carTypes" :key="index">{{ type }}</option>
                </select>
              </div>
              <div class="input-group">
                <label for="" class="label">Warna</label>
                <select name="" id="" ref="selectColor" @change="selectedColor" v-model="temporaryCash.color">
                  <option value="" selected disabled>Pilih warna mobil</option>
                  <option :value="color" v-for="(color, index) in carColors" :key="index">{{ color }}</option>
                </select>
              </div>
              <div class="input-group">
                <label for="" class="label">Harga</label>
                <input type="text" readonly v-model="temporaryCash.cash">
              </div>
            </div>
          </div>
          <button class="submit-button" type="submit" :disabled="failedInsert">Buat Transaksi</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import axios, { AxiosError } from "axios";
import { onMounted, reactive, ref } from "vue";
import userAuthStore from '@/stores/auth';
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import 'vue3-toastify/dist/index.css';

const router = useRouter();

const emit = defineEmits(['successCreate']);

const store = userAuthStore();
const token = store.getToken();

const failedInsert = ref(false);

const inputImage = ref(null);
const previewImage = ref(null);
const selectColor = ref(null);
const cars = reactive([]);
const carTypes = reactive(new Set());
const carColors = reactive([]);
const temporaryCash = reactive({
  nik: '',
  type: '',
  color: '',
  cash: '',
  carCode: ''
});
const form = new FormData();

// Format IDR
const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR'
});



function selectedType() {
  carColors.splice(0, carColors.length);
  cars.forEach(item => item.type === temporaryCash.type ? carColors.push(item.warna) : '');
  if (temporaryCash.color) {
    selectedColor()
  }
}

function selectedColor() {
  const total = cars.filter(item => item.type === temporaryCash.type && item.warna === temporaryCash.color);

  if (total.length) {
    temporaryCash.cash = total[0].harga;
    temporaryCash.carCode = total[0].kode_mobil;    
  }
}

function addFile(event) {
  previewImage.value.src = URL.createObjectURL(event.target.files[0]);
  previewImage.value.classList.add('d-flex');
  form.append('KTP', event.target.files[0]);
}

async function createCashTransaction() {
  try {
    form.append('nik', temporaryCash.nik);
    form.append('kodeMobil', temporaryCash.carCode)
    form.append('cashBayar', temporaryCash.cash);
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:5000/api/cashes',
      data: form,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const responseStatus = response.data.status;
    if (responseStatus >= 200 && responseStatus < 300) {
      emit('successCreate');
      router.push({
        name: 'cash transactions'
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response.data.error === 'TOKEN_EXPIRED') {
        toast.info('Sesi Anda telah habis, harap login kembali', {
          autoClose: 1900
        });

        store.logout();

        setTimeout(() => {
          router.push({
            name: 'login'
          });
        }, 2000);

      } else if (err.response.data.error === 'DATABASE_CONNECTION_ERROR') {
        toast.error('Database server error');

      } else if (err.response.data.error === 'INTERNAL_SERVER_ERROR') {
        toast.error('Internal server error');

      } else if (err.response.data.error === 'MISSING_AUTHENTICATION_CREDENTIALS') {
        toast.error('Harap login kembali', {
          autoClose: 1900
        });

        store.logout();

        setTimeout(() => {
          router.push({
            name: 'login'
          });
        }, 2000);

      } else if (err.response.data.error === "FAILED_TO_INSERT_DATA") {
        toast.error('Terjadi kesalahan, mohon untuk merefresh ulang halaman');
        failedInsert.value = true

      } else if (err.response.data.error === 'MISSING_CUSTOMER_IMAGE_FILE') {
        toast.error('Gambar tidak boleh kosong');
      } else {
        toast.error('Network error');

      }
    } else {
      toast.error('Terjadi kesalahan pada server');

    }
  }
}

onMounted(async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: `http://localhost:5000/api/v1/cars`,
    });

    const data = response.data.data;

    data.forEach(item => {
      cars.push(item);
      carTypes.add(item.type);
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response.data.error === 'TOKEN_EXPIRED') {
        toast.info('Sesi Anda telah habis, harap login kembali', {
          autoClose: 1900
        });

        store.logout();

        setTimeout(() => {
          router.push({
            name: 'login'
          });
        }, 2000);

      } else if (err.response.data.error === 'DATABASE_CONNECTION_ERROR') {
        toast.error('Database server error');

      } else if (err.response.data.error === 'INTERNAL_SERVER_ERROR') {
        toast.error('Internal server error');

      } else if (err.response.data.error === 'MISSING_AUTHENTICATION_CREDENTIALS') {
        toast.error('Harap login kembali', {
          autoClose: 1900
        });

        store.logout();

        setTimeout(() => {
          router.push({
            name: 'login'
          });
        }, 2000);

      } else {
        toast.error('Network error');

      }
    } else {
      toast.error('Terjadi kesalahan pada server');

    }
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
  width: 414px;
  height: 276px;
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
  display: none;
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
  transform: translateY(-1px);
}

.d-flex{
  display: flex;
}
</style>
