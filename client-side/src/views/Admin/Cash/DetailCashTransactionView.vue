<template>
  <section>
    <div class="container" v-show="!error">
      <div class="container-top">
        <div class="container-top-left">
          <span class="domain">Detail Transaksi Cash</span>
          <span class="slash">/</span>
          <span class="codomain">{{ route.params.kodeTransaksi }}</span>
        </div>
        <!-- <button class="edit-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
          <span class="header-button">Edit</span>
        </button> -->
      </div>
      <div class="container-middle">
        <h2 class="header-middle">Data Customer</h2>
        <div class="main-middle" ref="mainMiddle">
          <div class="container-data-customer" ref="dataCustomer">
            <div class="customer-data">
              <div class="header-data">Nama</div>
              <div class="data">{{ detailCash.nama }}</div>
            </div>
            <div class="customer-data">
              <div class="header-data">No KTP</div>
              <div class="data">{{ detailCash.nik }}</div>
            </div>
            <div class="customer-data">
              <div class="header-data">Gender</div>
              <div class="data">{{ detailCash.jenis_kelamin }}</div>
            </div>
            <div class="customer-data">
              <div class="header-data">No Telepon</div>
              <div class="data">{{ detailCash.no_telp }}</div>
            </div>
            <div class="customer-data">
              <div class="header-data">Alamat</div>
              <div class="data">{{ detailCash.alamat }}</div>
            </div>
            <div class="customer-data">
              <div class="header-data">Foto Copy KTP</div>
              <img :src="`http://localhost:5000/api/assets/images/cashes/${detailCash.fotocopy_ktp}`" class="image-data" />
            </div>
          </div>
          <svg ref="detailCustomerIcon" @click="collapseCustomer" class="dropdown-data-icon"  xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="M18 15l-6-6-6 6"/></svg>
        </div>
      </div>
      <div class="container-bottom">
        <div class="header-middle">Detail Pembayaran</div>
        <div class="main-bottom">
          <div class="container-bottom-top">
            <div class="customer-data">
              <div class="header-data">Kode Cash</div>
              <div class="data">{{ detailCash.kode_cash }}</div>
            </div>
            <div class="customer-data">
              <div class="header-data">Nominal Bayar</div>
              <div class="data">{{ rupiah.format(detailCash.cash_bayar) }}</div>
            </div>
            <div class="customer-data">
              <div class="header-data">Tanggal Bayar</div>
              <div class="data">{{ new Date(detailCash.tanggal).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', }) }}</div>
            </div>
          </div>
          <div class="container-bottom-bottom">
            <img class="image" alt="" :src="`http://localhost:5000/api/assets/images/cars/${detailCash.gambar}`">
            <div class="container-detail-data">
              <div class="detail-data">
                <div class="header-data">Type</div>
                <div class="data">{{ detailCash.type }}</div>
              </div>
              <div class="detail-data">
                <div class="header-data">Merk</div>
                <div class="data">{{ detailCash.merk }}</div>
              </div>
              <div class="detail-data">
                <div class="header-data">Warna</div>
                <div class="data">{{ detailCash.warna }}</div>
              </div>
              <div class="detail-data">
                <div class="header-data">Harga</div>
                <div class="data">{{ rupiah.format(detailCash.harga) }}</div>
              </div>
            </div>
            <RouterLink :to="{name: 'detail car', params: {kodeMobil: `${detailCash.kode_mobil}` }}" class="detail-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="M9 18l6-6-6-6"/></svg>
            </RouterLink>
          </div>
        </div>
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
import userAuthStore from '@/stores/auth';
import { RouterLink, useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import 'vue3-toastify/dist/index.css';

const store = userAuthStore();
const token = store.getToken();

const error = ref(false);

const router = useRouter();
const route = useRoute();
const detailCash = reactive({

});
const dataCustomer = ref(null);
const mainMiddle = ref(null);
const detailCustomerIcon = ref(null)
// Format IDR
const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR'
});

function collapseCustomer(event) {
  mainMiddle.value.classList.toggle('height-min');
  detailCustomerIcon.value.classList.toggle('rotate');
}

onMounted(async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: `http://localhost:5000/api/cashes/transactions/${route.params.kodeTransaksi}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });


    const data = response.data.data;
    Object.keys(data[0]).forEach(key => detailCash[key] = data[0][key]);

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
}

/* Main Content */
/* Top */
.container-top{
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 2px solid #f3f7fa;
  justify-content: space-between;
}
.container-top-left{
  display: flex;
  gap: .5rem;
  align-items: center;
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
.edit-button{
  display: flex;
  align-items: center;
  padding: 7px 10px;
  gap: 6px;
  background-color: #2753d8;
  outline: none;
  border: none;
  border-radius: 8px;
}
.header-button{
  font-family: 'Roboto';
  font-size: 15px;
  color: #fff;
}

.header-middle{
  padding: 1rem;
  font-weight: 600;
  font-size: 20px;
}
.main-middle{
  padding: 20px;
  background-color: #f3f7fa;
  border-radius: 8px;
  position: relative;
  transition: height 1s ease;
  height: auto;
  overflow: hidden;
}
.container-data-customer{
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.customer-data{
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.header-data{
  font-size: 13px;
  color: #adb5bd;
}
.data{
  font-weight: 600;
}
.image-data{
  max-width: 441.6px;
  max-height: 294.4px;
  width:100%;
  height: 100%;
  border-radius: 8px;
}

.dropdown-data-icon{
  position: absolute;
  right: 20px;
  top: 25.5px;
}
.container-bottom{
  margin-bottom: 40px;
  margin-top: 20px;
}
.main-bottom{
  padding: 20px;
  background-color: #f3f7fa;
  border-radius: 8px;
}

/* Detail */
.container-bottom-top{
  padding-block-end: 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dbdfe2;
}
.container-detail-data{
  display: flex;
  flex-grow: 1;
  gap: 1rem;
}
.detail-data{
  width: calc(100%/4);
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.container-bottom-bottom{
  display: flex;
  gap: 1.5rem;
  margin-block-start: 20px;
}
.image{
  width: 110.4px;
  height: 73.6px;
}
.detail-icon{
  align-self: center;
}


.height-min{
  height: 76px;
}
.rotate{
  transform: rotate(-180deg);
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