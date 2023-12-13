<template>
  <section>
    <div class="container" v-show="!error">
      <div class="container-top">
        <span class="domain">Paket Kredit</span>
        <span class="slash">/</span>
        <span class="codomain">Edit</span>
      </div>
      <div class="container-bottom">
        <form class="form" action="#" @submit.prevent="updateCreditPackage">
          <div class="main-container-form">
            <div class="container-form-top">
              <div class="input-group">
                <label for="" class="label">Uang Muka (%)</label>
                <input type="text" v-model="data.uang_muka" readonly>
              </div>
               <div class="input-group">
                <label for="" class="label">Status Keaktifan</label>
                <select name="" id="" v-model="status" @change="changeStatus">
                  <option value="" selected disabled>Pilih status keaktifan paket</option>
                  <option value="Aktif">Aktif</option>
                  <option value="Tidak aktif">Tidak aktif</option>
                </select>
              </div>
            </div>
            <div class="container-form-bottom">
              <div class="input-group">
                <label for="" class="label">Suku Bunga per Tahun (%)</label>
                <input type="text" v-model="data.bunga" readonly>
              </div>
              <div class="input-group">
                <label for="" class="label">Tenor (bulan)</label>
                <input type="text" v-model="data.tenor" readonly>
              </div>
            </div>
          </div>
          <button class="submit-button" type="submit">Simpan</button>
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
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import userAuthStore from '@/stores/auth'
import { toast } from "vue3-toastify";
import 'vue3-toastify/dist/index.css';

const route = useRoute();
const store = userAuthStore();
const token = store.getToken();

const router = useRouter();
const error = ref(false);

const emit = defineEmits(['successUpdate', 'failedUpdate']);

const data = reactive({});

const status = ref('');

function changeStatus() {
  data.status_keaktifan = !data.status_keaktifan;
  data.status_keaktifan ? status.value = 'Aktif' : status.value = 'Tidak aktif';
}

async function updateCreditPackage() {
  try {
    const response = await axios({
      baseURL: 'http://localhost:5000/api',
      method: 'PUT',
      url: `/credit-packages/${route.params.kodePaketKredit}`,
      data: {
        uangMuka: data.uang_muka,
        bunga: data.bunga,
        tenor: data.tenor,
        status: data.status_keaktifan ? 1 : 0
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const responseStatus = response.data.status;
    if (responseStatus >= 200 && responseStatus < 300) {
      emit('successUpdate');
      router.push({
        name: 'credit packages'
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

      } else if (err.response.data.error === "FAILED_TO_UPDATE_DATA") {
        emit('failedUpdate');

      } else if (err.response.data.error === "MISSING_PARAMS 'kodePaket'") {
        toast.error('Terjadi kesalahan, mohon untuk merefresh ulang halaman');

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
      url: `/credit-packages/${route.params.kodePaketKredit}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    Object.keys(response.data.data[0]).map(key => data[key] = response.data.data[0][key]);
    data.status_keaktifan ? status.value = 'Aktif' : status.value = 'Tidak aktif';

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

      } else if (err.response.data.error === "MISSING_PARAMS 'kodePaket'") {
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
