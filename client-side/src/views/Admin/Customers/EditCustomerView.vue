<template>
  <section>
    <div class="container" v-show="!error">
      <div class="container-top">
        <span class="domain">Customer</span>
        <span class="slash">/</span>
        <span class="codomain">Edit</span>
      </div>
      <div class="container-bottom">
        <form class="form" action="#" @submit.prevent="updateCustomer">
          <div class="main-container-form">
            <div class="container-form-top">
              <div class="container-form-left">
                <div class="input-group input-image">
                  <label for="image-input" class="image-label">
                    <svg class="image-icon" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="arcs"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M20.4 14.5L16 10 4 20"/></svg>
                    <span>Upload customer image</span>
                  </label>
                  <input @change="addFile" ref="inputImage" type="file" name="image-input" id="" accept=".png, .jpg, .jpeg">
                  <img ref="previewImage" :src="`http://localhost:5000/api/assets/images/customers/${data.foto}`" class="preview-image" alt="">
                </div>
                <div class="button" @click="() => inputImage.click()">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 4.2v10.3"/></svg>
                  <span>Upload New Image</span>
                </div>
              </div>
              <div class="container-form-right">
                <div class="input-group">
                  <label for="" class="label">NIK</label>
                  <input type="text" v-model="data.nik" readonly>
                </div>
                <div class="input-group">
                  <label for="" class="label">Nama</label>
                  <input type="text" v-model="data.nama">
                </div>
                <div class="input-group">
                  <label for="" class="label">No Telepon</label>
                  <input type="tel" v-model="data.no_telp">
                </div>
                <div class="input-group">
                  <label for="" class="label">Jenis Kelamin</label>
                  <select name="" id="" v-model="data.jenis_kelamin">
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div class="input-group">
                  <label for="" class="label">Alamat</label>
                  <textarea class="text-area" name="" id="" cols="30" rows="3" v-model="data.alamat"></textarea>
                </div>
              </div>
            </div>
          </div>
          <button class="submit-button" type="submit">Simpan Perubahan</button>
        </form>
      </div>
    </div>
    <div class="container" v-show="error">
      <div class="container-error">
        <div class="not-found">404</div>
        <div class="opss">Oopss!</div>
        <div class="searching-something">Searching for something else?</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import axios, { AxiosError } from "axios";
import userAuthStore from '@/stores/auth';
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import 'vue3-toastify/dist/index.css';

const store = userAuthStore();
const token = store.getToken();

const router = useRouter();
const route = useRoute();

const error = ref(false);
const emit = defineEmits(['failedUpdate', 'successUpdate']);

const previewImage = ref(null);
const inputImage = ref(null);
const form = new FormData();

const data = reactive({});

function addFile(event) {
  previewImage.value.src = URL.createObjectURL(event.target.files[0]);
  form.append('foto', event.target.files[0]);
}

function addDataForm() {
  form.append('nik', data.nik);
  form.append('nama', data.nama);
  form.append('telp', data.no_telp);
  form.append('jenisKelamin', data.jenis_kelamin);
  form.append('alamat', data.alamat);
}

function clearDataForm() {
  form.delete('nik');
  form.delete('nama');
  form.delete('telp');
  form.delete('jenisKelamin');
  form.delete('alamat');
}

async function updateCustomer() {
  try {

    addDataForm();

    const response = await axios({
      baseURL: 'http://localhost:5000/api',
      method: 'PUT',
      url: `/customers/${route.params.nik}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: form
    });


    clearDataForm();

    const responseStatus = response.data.status;
    if (responseStatus >= 200 && responseStatus < 300) {
      emit('successUpdate');
      router.push({
        name: 'customers'
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

      } else if (err.response.data.error === "MISSING_PARAMS 'kodeCustomer'") {
        toast.error('Terjadi kesalahan, mohon untuk merefresh ulang halaman');

      } else if (err.response.data.error === "FAILED_TO_UPDATE_DATA") {
        emit('failedUpdate');

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
      baseURL: 'http://localhost:5000/api',
      method: 'GET',
      url: `/customers/${route.params.nik}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    Object.keys(response.data.data[0]).forEach(key => data[key] = response.data.data[0][key]);
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

      } else if (err.response.data.error === "MISSING_PARAMS 'kodeCustomer'") {
        toast.error('Terjadi kesalahan, mohon untuk merefresh ulang halaman');

      } else if (err.response.data.error === 'DATA_NOT_FOUND') { 
        error.value = true;

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
.container-form-left{
  display: flex;
  flex-direction: column;
  gap: 20px;
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
input[type="text"], input[type="tel"], select, textarea{
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

.button{
  display: flex;
  gap: .5rem;
  flex-grow: 1;
  background-color: #2753d8;
  color: #fff;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding-block: 10px;
}
.button:hover *, .button{
  cursor: pointer;
}


.d-flex{
  display: flex;
}

.container-error{
  background-color: #f3f7fa;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .25rem;
  flex-direction: column;
  border-radius: 8px;
}

.not-found{
  font-size: 50px;
  color: #2753d8;
}
.opss{
  font-size: 30px;
  color: #2753d8;
  font-weight: 600;
}

.searching-something{
  font-size: 18px;
  color: #2753d8;
}
</style>