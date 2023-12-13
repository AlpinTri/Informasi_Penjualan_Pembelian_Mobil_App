<template>
  <section>
    <div class="container">
      <div class="container-top">
        <span class="domain">Paket Kredit</span>
        <span class="slash">/</span>
        <span class="codomain">Create</span>
      </div>
      <div class="container-bottom">
        <form class="form" action="#" @submit.prevent="createCreditPackage">
          <div class="main-container-form">
            <div class="container-form-top">
              <div class="input-group">
                <label for="" class="label">Uang Muka (%)</label>
                <input type="text" v-model="data.uangMuka">
              </div>
              <div class="input-group">
                <label for="" class="label">Status Keaktifan</label>
                <select name="" id="" v-model="data.status">
                  <option value="" selected disabled>Pilih status keaktifan paket</option>
                  <option value="Aktif">Aktif</option>
                  <option value="Tidak aktif">Tidak aktif</option>
                </select>
              </div>
            </div>
            <div class="container-form-bottom">
              <div class="input-group">
                <label for="" class="label">Suku Bunga per Tahun (%)</label>
                <input type="text" v-model="data.bunga">
              </div>
              <div class="input-group">
                <label for="" class="label">Tenor (bulan)</label>
                <input type="text" v-model="data.tenor">
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
import axios, { AxiosError } from "axios";
import userAuthStore from '@/stores/auth';
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import 'vue3-toastify/dist/index.css';

const store = userAuthStore();
const token = store.getToken();

const router = useRouter();
const emit = defineEmits(['successCreate']);

const failedInsert = ref(false)

const data = reactive({
  uangMuka: '',
  bunga: '',
  tenor: '',
  status: ''
});


async function createCreditPackage() {
  try {
    const response = await axios({
      baseURL: 'http://localhost:5000/api',
      method: 'POST',
      url: '/credit-packages',
      data: {
        uangMuka: data.uangMuka,
        bunga: data.bunga,
        tenor: data.tenor,
        status: data.status === 'Aktif' ? 1 : 0
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const responseStatus = response.data.status;
    if (responseStatus >= 200 && responseStatus < 300) {
      emit('successCreate');
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

      } else if (err.response.data.error === "FAILED_TO_INSERT_DATA") {
        toast.error('Terjadi kesalahan, mohon untuk merefresh ulang halaman');
        failedInsert.value = true

      } else {
        toast.error('Network error');

      }
    } else {
      toast.error('Terjadi kesalahan pada server');

    }
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

</style>