<template>
  <section>
    <div class="container">
      <div class="container-top">
        <span class="domain">Penjualan</span>
        <span class="slash">/</span>
        <span class="codomain">Create</span>
      </div>
      <div class="container-bottom">
        <form class="form" action="#" @submit.prevent="createCar">
          <div class="main-container-form">
            <div class="container-form-left">
              <div class="input-group input-image" @click="() => inputImage.click()">
                <label for="image-input" class="image-label">
                  <svg class="image-icon" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="arcs"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M20.4 14.5L16 10 4 20"/></svg>
                  <span>Upload car image</span>
                </label>
                <input @change="addFile" ref="inputImage" type="file" name="image-input" id="" accept=".png, .jpg, .jpeg">
                <img ref="previewImage" src="" class="preview-image" alt="">
              </div>
            </div>
            <div class="container-form-right">
              <div class="input-group-wrapper">
                <div class="input-group">
                  <label for="" class="label">Merk</label>
                  <input type="text" v-model="data.merk">
                </div>
                <div class="input-group">
                  <label for="" class="label">Jumlah Seat</label>
                  <input type="number" v-model="data.seat">
                </div>
              </div>             
              <div class="input-group-wrapper">
                <div class="input-group">
                  <label for="" class="label">Type</label>
                  <input type="text" v-model="data.type">
                </div>
                <div class="input-group">
                  <label for="" class="label">Warna</label>
                  <input type="text" v-model="data.warna">
                </div>
              </div>
              <div class="input-group-wrapper">
                <div class="input-group">
                  <label for="" class="label">Bahan Bakar</label>
                  <input type="text" v-model="data.bahanBakar">
                </div>
                <div class="input-group">
                  <label for="" class="label">Kapasitas Mesin (cc/kWh)</label>
                  <input type="number" v-model="data.kapasitasMesin">
                </div>
              </div>
              <div class="input-group-wrapper">
                <div class="input-group">
                  <label for="" class="label">Jenis Transmisi</label>
                  <select name="" id="" v-model="data.jenisTransmisi">
                    <option value="" selected disabled>Pilih jenis transmisi</option>
                    <option value="Otomatis">Otomatis</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
                <div class="toggle-btn-container">
                  <input class="left-toggle btn-toggle" :class="[ toggle[0].status ? 'active-toggle' : '' ]" @click="changeStatus(0, 1)" type="button" v-model="toggle[0].text">
                  <input class="right-toggle btn-toggle" :class="[ toggle[1].status ? 'active-toggle' : '' ]" @click="changeStatus(1, 0)" type="button" v-model="toggle[1].text">
                </div>
              </div>
              <div class="input-group money">
                <label for="" class="label">Harga</label>
                <div class="rp">Rp</div>
                <input type="number" v-model="data.harga">
              </div>
            </div>
          </div>
          <button class="submit-button" type="submit" :disabled="failedInsert">Simpan</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import axios, {AxiosError} from 'axios';
import userAuthStore from '@/stores/auth';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useRouter } from "vue-router";

const router = useRouter();
const emit = defineEmits(['successCreate']);

const failedInsert = ref(false);

const inputImage = ref(null);
const previewImage = ref(null);

function addFile(event) {
  previewImage.value.src = URL.createObjectURL(event.target.files[0]);
  previewImage.value.classList.add('d-flex');
  console.log(event.target.files)
  form.append('gambar', event.target.files[0]);
}

function changeStatus(activeIndex, inactiveIndex) {
  toggle[activeIndex].status = true;
  toggle[inactiveIndex].status = false;
}


const toggle = reactive([
  { text: 'Dijual', status: true },
  { text: 'Tidak dijual', status: false }
]);

const data = reactive({
  merk: '',
  type: '',
  warna: '',
  bahanBakar: '',
  kapasitasMesin: '',
  jenisTransmisi: '',
  harga: '',
  seat: '',
  statusPenjualan: 1,
});
const store = userAuthStore();
const token = store.getToken();
const form = new FormData();

watch(
  () => data.seat,
  () => {
    if (data.seat < 2 && data.seat) {
      toast.warn('Jumlah seat tidak boleh kurang dari 2');
    }
  }
)

async function createCar() {
  try {

    if (toggle[0].status) data.statusPenjualan = 1;
    if (toggle[1].status) data.statusPenjualan = 0;

    Object.keys(data).forEach(key => form.append(`${key}`, data[key]));

    const response = await axios({
      baseURL: 'http://localhost:5000/api',
      method: 'POST',
      url: '/cars',
      data: form,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const responseStatus = response.data.status;
    if (responseStatus >= 200 && responseStatus < 300) {
      emit('successCreate')
      router.push({
        name: 'cars'
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

      } else if (err.response.data.error === 'MISSING_CAR_IMAGE_FILE') {
        toast.error('Gambar tidak boleh kosong');
      } else {
        toast.error('Network error');

      }
    } else {
      toast.error('Terjadi kesalahan pada server');

    }
    console.log(err)
  }
}

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
input[type="text"], input[type="number"], select{
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

.input-group-wrapper{
  display: flex;
  gap: 20px;
}
.input-group-wrapper > div{
  width: calc(100%/2);
}


.toggle-btn-container{
  display: flex;
}
.btn-toggle{
  border: none;
  box-sizing: content-box;
  padding: 7px 10px 7px 10px;
  font-size: 15px;
  width: calc(100%/2);
  border: 1px solid rgba(0, 0, 0, 0.10);
  cursor: pointer;
  background-color: #fff;
  color: #2753d8;
  /* transition: .75s ease; */
}
.right-toggle{
  border-radius: 0 8px 8px 0;
}
.left-toggle{
  border-radius: 8px 0 0 8px;
}

.active-toggle{
  background-color: #2753d8;
  color: #fff;
  border-color: #2753d8;
}
</style>