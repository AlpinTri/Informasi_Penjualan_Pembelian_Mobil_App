<template>
  <section>
    <div class="container" v-show="!error">
      <div class="container-top">
        <div class="container-title-page">
          <span class="domain">User</span>
          <span class="slash">/</span>
          <span class="codomain">Detail</span>
        </div>
        <RouterLink :to="{ name: 'edit user', params: { nik: route.params.kodeUser } }" class="edit-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
          <span class="header-button">Edit</span>
        </RouterLink>
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
import userAuthStore from '@/stores/auth';
import { toast } from "vue3-toastify";
import 'vue3-toastify/dist/index.css';

const route = useRoute();
const store = userAuthStore();
const token = store.getToken();

const router = useRouter();

const error = ref(false);

const data = reactive({

});

onMounted(async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: `http://localhost:5000/api/users/${route.params.kodeUser}`,
      headers: {
        Authorization: `Bearer ${token}`,
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

      } else if (err.response.data.error === "MISSING_PARAMS 'kodeUser'") {
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

