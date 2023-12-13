<template>
  <section>
    <div class="container" v-show="!error">
      <div class="container-top">
        <div class="container-title-page">
          <span class="domain">Mobil</span>
          <span class="slash">/</span>
          <span class="codomain">Detail</span>
        </div>
        <RouterLink v-show="userInfo.status === 'Super Admin'" :to="{name: 'edit car', params: {kodeMobil: route.params.kodeMobil}}" class="edit-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
          <span class="header-button">Edit</span>
        </RouterLink>
      </div>
      <div class="container-bottom">
        <form class="form" action="#" @submit.prevent="createCar">
          <div class="main-container-form">
            <div class="container-form-left">
              <div class="input-group input-image">
                <label for="image-input" class="image-label">
                  <svg class="image-icon" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="arcs"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M20.4 14.5L16 10 4 20"/></svg>
                  <span>Upload car image</span>
                </label>
                <input ref="inputImage" type="file" name="image-input" id="" accept=".png, .jpg, .jpeg">
                <img ref="previewImage" :src="`http://localhost:5000/api/assets/images/cars/${data.gambar}`" class="preview-image" alt="">
              </div>
            </div>
            <div class="container-form-right">
              <div class="input-group-wrapper">
                <div class="input-group">
                  <label for="" class="label">Merk</label>
                  <input type="text" v-model="data.merk" readonly>
                </div>
                <div class="input-group">
                  <label for="" class="label">Jumlah Seat</label>
                  <input type="number" v-model="data.jumlah_seat" readonly>
                </div>
              </div>
              <div class="input-group-wrapper">
                <div class="input-group">
                  <label for="" class="label">Type</label>
                  <input type="text" v-model="data.type" readonly>
                </div>
                <div class="input-group">
                  <label for="" class="label">Warna</label>
                  <input type="text" v-model="data.warna" readonly>
                </div>
              </div>
              <div class="input-group-wrapper">
                <div class="input-group">
                  <label for="" class="label">Bahan Bakar</label>
                  <input type="text" v-model="data.bahan_bakar" readonly>
                </div>
                <div class="input-group">
                  <label for="" class="label">Kapasitas Mesin (CC)</label>
                  <input type="text" v-model="data.kapasitas_mesin" readonly>
                </div>
              </div>
              <div class="input-group-wrapper">
                <div class="input-group">
                  <label for="" class="label">Jenis Transmisi</label>
                  <select name="" id="" v-model="data.jenis_transmisi">
                    <option :value="data.jenis_transmisi">{{ data.jenis_transmisi }}</option>
                  </select>
                </div>
                <div class="toggle-btn-container">
                  <input class="left-toggle btn-toggle" :class="[ data.status_penjualan ? 'active-toggle' : '' ]" type="button" value="Dijual">
                  <input class="right-toggle btn-toggle" :class="[ !data.status_penjualan ? 'active-toggle' : '' ]" type="button" value="Tidak dijual">
                </div>
              </div>
              <div class="input-group">
                <label for="" class="label">Harga</label>
                <input type="text" v-model="harga">
              </div>
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
import { onMounted, reactive, ref } from "vue";
import { useRoute, RouterLink, useRouter } from "vue-router";
import axios, { AxiosError } from 'axios';
import userAuthStore from '@/stores/auth';
import { toast } from "vue3-toastify";
import 'vue3-toastify/dist/index.css';

const store = userAuthStore();
const token = store.getToken();
const userInfo = store.getUserInfo();
const route = useRoute();
const router = useRouter();
const error = ref(false);

const harga = ref('')
const data = reactive({});

const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR'
});

onMounted(async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: `http://localhost:5000/api/cars/${route.params.kodeMobil}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    Object.keys(response.data.data[0]).forEach(key => data[key] = response.data.data[0][key]);
    harga.value = rupiah.format(data.harga)

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

      } else if (err.response.data.error === "MISSING_PARAMS 'kodeMobil'") {
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