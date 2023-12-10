<template>
  <section>
    <div class="container">
      <div class="container-top">
        <div class="container-top-left">
          <span class="domain">Detail Transaksi Cash</span>
          <span class="slash">/</span>
          <span class="codomain">{{ route.params.kodeTransaksi }}</span>
        </div>
        <button class="edit-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
          <span class="header-button">Edit</span>
        </button>
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
  </section>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import userAuthStore from '@/stores/auth';
import { RouterLink, useRoute } from "vue-router";

const store = userAuthStore();
const token = store.getToken();

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

    console.log(response)
    const data = response.data.data;
    Object.keys(data[0]).forEach(key => detailCash[key] = data[0][key]);
    console.log(detailCash)
  } catch (err) {
    console.log(err)
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

/* Right */
/* section{
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
  gap: 2rem;
}

/* Main Content
.container-top{
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding-inline: 1rem;
}
.add-icon{
  box-sizing: content-box;
  padding: 3px;
  background-color: #2753d8;
  border-radius: 8px;
}
.add-icon-wrapper{
  display: flex;
  align-items: center;
}
.header{
  font-weight: 600;
  font-size: 20px;
}
.input{
  padding: 10px;
  flex-grow: 1;
  border: none;
  outline: none;
  width: 300px;
}
.input-group{
  padding-inline: 5px;
  border-radius: 8px;
  border: 2px solid #f3f7fa;
  display: flex;
  align-items: center;
}

/* List Item 
.list-item-container{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.list-item{
  width: 100%;
  padding: 7px;
  background-color: #f3f7fa;
  border-radius: 8px;
  position: relative;
  display: flex;
  gap: 1.5rem;
}
.container-detail-data{
  display: flex;
  flex-grow: 1;
  gap: 1rem;
  padding-inline: 10px;
}
.detail-data{
  width: calc(100%/4);
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 55px;
}
.header-data{
  font-size: 13px;
  color: #adb5bd;
}
.data{
  font-weight: 600;
}
.image{
  width: 110.4px;
  height: 73.6px;
}
.detail-icon{
  align-self: center;
}
.delete-icon{
  position: absolute;
  box-sizing: content-box;
  background-color: #f3f7fa;
  border-radius: 999px;
  border: 1px solid #6c757d;
  padding: 2px;
  right: 0;
  top: 0;
  transform: translate(50%, -50%);
} */
/* section{
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
  padding: 15px;
  border-bottom: 2px solid #f8f9fa;
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
.input-group{
  display: flex;
  position: relative;
  gap: .5rem;
  align-items: center;
}
.container-input{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
}
.container-input-group{
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}
.container-input-group > div.input-group{
  width: 100%;
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
} 

.d-flex{
  display: flex;
} */
</style>