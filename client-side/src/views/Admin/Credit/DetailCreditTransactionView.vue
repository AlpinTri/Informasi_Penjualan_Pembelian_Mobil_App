<template>
  <section>
    <div class="card-wrapper" ref="modal">
      <form class="card" @submit.prevent="addCicilan">
        <span class="card-header">Masukkan Kode Kredit</span>
        <div class="input-group">
          <label for="" class="label">Kode Kredit</label>
          <input type="text" v-model="kodeKredit">
        </div>
        <div class="button-group">
          <span class="button cancel-button" @click="showModal">Cancel</span>
          <button type="submit" class="button ok-button">Ok</button>
        </div>
      </form>
    </div>
    <div class="container">
      <div class="container-title-page">
        <div class="wrapper-title">
          <span class="domain">Detail Transaksi Kredit</span>
          <span class="slash">/</span>
          <span class="codomain">{{ route.params.kodeTransaksi }}</span>
        </div>
        <button class="edit-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
          <span class="header-button">Edit</span>
        </button>
      </div>
      <div class="container-content">
        <div class="container-data">
          <h3 class="header-data">Data Customer</h3>
          <div class="container-data-column" ref="detailCustomer">
            <div class="wrapper-data-column">
              <div class="wrapper-data">
                <div class="header-detail-data">Nama</div>
                <div class="data">{{ dataDetailKredit.nama }}</div>
              </div>
              <div class="wrapper-data">
                <div class="header-detail-data">No KTP</div>
                <div class="data">{{ dataDetailKredit.nik }}</div>
              </div>
              <div class="wrapper-data">
                <div class="header-detail-data">Gender</div>
                <div class="data">{{ dataDetailKredit.jenis_kelamin }}</div>
              </div>
              <div class="wrapper-data">
                <div class="header-detail-data">No Telepon</div>
                <div class="data">{{ dataDetailKredit.no_telp }}</div>
              </div>
              <div class="wrapper-data">
                <div class="header-detail-data">Alamat</div>
                <div class="data">{{ dataDetailKredit.alamat }}</div>
              </div>
              <div class="container-data-image">
                <div class="wrapper-data">
                  <div class="header-detail-data">Foto Copy KTP</div>
                  <img :src="`http://localhost:5000/api/assets/images/credits/${dataDetailKredit.fotocopy_ktp}`" class="image-data" />
                </div>
                <div class="wrapper-data">
                  <div class="header-detail-data">Foto Copy KK</div>
                  <img :src="`http://localhost:5000/api/assets/images/credits/${dataDetailKredit.fotocopy_kk}`" class="image-data" />
                </div>
                <div class="wrapper-data">
                  <div class="header-detail-data">Foto Slip Gaji</div>
                  <img :src="`http://localhost:5000/api/assets/images/credits/${dataDetailKredit.foto_slip_gaji}`" class="image-data" />
                </div>
              </div>
            </div>
            <svg ref="detailCustomerIcon" @click="collapse('customer')" class="dropdown-data-icon"  xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="M18 15l-6-6-6 6"/></svg>
          </div>
        </div>
        <div class="container-data">
          <h3 class="header-data">Detail Kredit</h3>
          <div class="container-data-column" ref="detailKredit">
            <div class="wrapper-data-header">
              <div class="wrapper-data">
                <div class="header-detail-data">Kode Kredit</div>
                <div class="data">{{ dataDetailKredit.kode_kredit }}</div>
              </div>
              <div class="wrapper-data">
                <div class="header-detail-data">Tanggal Pengajuan Kredit</div>
                <div class="data">{{ new Date(dataDetailKredit.tanggal).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', }) }}</div>
              </div>
            </div>
            <div class="wrapper-data-row car-detail">
              <img class="image" alt="" :src="`http://localhost:5000/api/assets/images/cars/${dataDetailKredit.gambar}`">
              <div class="wrapper-data">
                <div class="header-detail-data">Type</div>
                <div class="data">{{ dataDetailKredit.type }}</div>
              </div>
              <div class="wrapper-data">
                <div class="header-detail-data">Merk</div>
                <div class="data">{{ dataDetailKredit.merk }}</div>
              </div>
              <div class="wrapper-data">
                <div class="header-detail-data">Warna</div>
                <div class="data">{{ dataDetailKredit.warna }}</div>
              </div>
              <div class="wrapper-data">
                <div class="header-detail-data">Harga</div>
                <div class="data">{{ rupiah.format(dataDetailKredit.harga)  }}</div>
              </div>
            </div>
            <div class="wrapper-data-row kredit-detail">
              <div class="wrapper-data">
                <div class="header-detail-data">Harga Kredit</div>
                <div class="data">{{ rupiah.format(dataDetailKredit.harga) }}</div>
              </div>
              <div class="wrapper-data">
                <div class="header-detail-data">Uang Muka</div>
                <div class="data">{{ rupiah.format(uangMuka) }}</div>
              </div>
              <div class="wrapper-data">
                <div class="header-detail-data">Jumlah Cicilan</div>
                <div class="data">{{ `${dataDetailKredit.tenor} Bulan` }}</div>
              </div>
              <div class="wrapper-data">
                <div class="header-detail-data">Bunga</div>
                <div class="data">{{ `${dataDetailKredit.bunga}%`  }}</div>
              </div>
              <div class="wrapper-data">
                <div class="header-detail-data">Cicilan Per Bulan</div>
                <div class="data cicilan">{{ rupiah.format(cicilanPerBulan) }}</div>
              </div>
            </div>
            <svg ref="detailKreditIcon" class="dropdown-data-icon" @click="collapse('kredit')" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="M18 15l-6-6-6 6"/></svg>
          </div>
        </div>
        <div v-show="userInfo.status === 'Super Admin' || userInfo.status === 'Finance'" class="container-data container-cicilan">
          <div class="container-tools">
            <div class="tools">
              <h3 class="header-data-cicilan">Detail Pembayaran</h3>
              <svg @click="showModal" class="add-icon" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              <span class="tambah-cicilan">Tambah cicilan</span>
            </div>
            <div class="input-group filter">
              <label for="" class="label">Urutkan</label>
              <select name="" id="" v-model="filter" @change="changeFilter">
                <option value="Terlama">Terlama</option>
                <option value="Terbaru">Terbaru</option>
              </select>
            </div>
          </div>
          <ul class="container-list">
            <li class="container-data-row list-data-cicilan" v-for="item in dataCicilan" :key="item.kode_cicilan">
              <div class="wrapper-data">
                <div class="header-detail-data">Cicilan Ke</div>
                <div class="data">{{ item.cicilan_ke }}</div>
              </div>
              <div class="wrapper-data">
                <div class="header-detail-data">Jumlah Dibayar</div>
                <div class="data">{{ rupiah.format(item.jumlah_cicilan) }}</div>
              </div>
              <div class="wrapper-data">
                <div class="header-detail-data">Sisa Cicilan</div>
                <div class="data">{{ item.sisa_cicilan }}</div>
              </div>
              <div class="wrapper-data">
                <div class="header-detail-data">Total Sisa</div>
                <div class="data">{{ rupiah.format(item.total_sisa) }}</div>
              </div>
              <div class="wrapper-data">
                <div class="header-detail-data">Tanggal Dibayar</div>
                <div class="data">{{ new Date(item.tanggal).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', }) }}</div>
              </div>
              <RouterLink class="detail-icon" :to="{name: 'detail credit transaction', params: {kodeTransaksi: 123}}">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="M9 18l6-6-6-6"/></svg>
              </RouterLink>
              <svg @click="removeCicilan(item.kode_cicilan, item.cicilan_ke)" class="delete-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#495057" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import axios from "axios";
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import userAuthStore from '@/stores/auth';

const store = userAuthStore();
const token = store.getToken();
const userInfo = store.getUserInfo();

const route = useRoute();
const router = useRouter();

// Data

// Manupulation Elements
const detailCustomerIcon = ref(null);
const detailCustomer = ref(null);
const detailKreditIcon = ref(null);
const detailKredit = ref(null);

function collapse(keyword) {
  if (keyword == 'customer') {
    detailCustomerIcon.value.classList.toggle('rotate-180');
    detailCustomer.value.classList.toggle('height-76');
    return;
  }
  detailKreditIcon.value.classList.toggle('rotate-180');
  detailKredit.value.classList.toggle('height-76');
}



const modal = ref(null);
const kodeKredit = ref('')
const filter = ref('Terlama');

function showModal() {
  modal.value.classList.toggle('d-flex');
}

async function removeCicilan(kodeCicilan, cicilanKe) {
  try {
    if (filter.value === 'Terlama') {
      if (dataCicilan[dataCicilan.length - 1].cicilan_ke != cicilanKe) {
        return console.log('cannot delete');
      }

      console.log('ok')
    } else {
      if (dataCicilan[0].cicilan_ke != cicilanKe) {
        return console.log('cannot delete 2');
      }
      console.log('ok 2');
    }

    const response = await axios({
      baseURL: 'http://localhost:5000/api',
      method: 'DELETE',
      url: `/installment-payments/${kodeCicilan}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const index = dataCicilan.findIndex(item => item.kode_cicilan == kodeCicilan);
    dataCicilan.splice(index, 1)
  } catch (err) {
    console.log(err)
  }
}

async function addCicilan() {
  try {
    if (kodeKredit.value == route.params.kodeTransaksi) {
      const response = await axios({
        baseURL: `http://localhost:5000/api`,
        method: 'POST',
        url: '/installment-payments',
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          kodeKredit: kodeKredit.value
        }
      });
  
      if (response.status == 201) {
        await changeFilter();
        showModal();
        kodeKredit.value = '';
      }
    }
  } catch (err) {
    console.log(err)
  }
}

async function changeFilter() {
  try {
    const sort = filter.value === 'Terlama' ? 1 : 2;
    const response = await axios({
      baseURL: 'http://localhost:5000/api',
      method: 'GET',
      url: `/installment-payments?kode_kredit=${route.params.kodeTransaksi}&sort=${sort}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dataCicilan.splice(0, dataCicilan.length);
    const data = response.data.data;
    data.forEach(item => dataCicilan.push(item));
  } catch (err) {
    console.log(err)
  }
}

const dataDetailKredit = reactive({});
const dataCicilan = reactive([]);

// Format IDR
const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR'
});


const uangMuka = computed(() => {
  return dataDetailKredit.harga * dataDetailKredit.uang_muka / 100;
});

const cicilanPerBulan = computed(() => {
  const hargaPokok = dataDetailKredit.harga - (dataDetailKredit.harga * dataDetailKredit.uang_muka / 100);
  const bunga = (hargaPokok * dataDetailKredit.bunga / 100) / 12 * dataDetailKredit.tenor;
  const totalKredit = hargaPokok + bunga;

  return totalKredit / dataDetailKredit.tenor;
});


onMounted(async () => {
  try {
    const response = await axios({
      baseURL: 'http://localhost:5000/api',
      method: `GET`,
      url: `/credits/transactions/${route.params.kodeTransaksi}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const { detailKredit, cicilan } = response.data.data;
    Object.keys(detailKredit[0]).forEach(key => dataDetailKredit[key] = detailKredit[0][key]);
    cicilan.forEach(item => dataCicilan.push(item));
  } catch (err) {
    console.log(err)
  }
});



</script>

<style scoped>
section{
  width: calc(100% - 250px);
  margin-left: 250px;
  overflow-x: hidden;
  position: relative;
}
.container{
  width: 95%;
  margin-inline: auto;
  margin-block: calc(5%/2);
  display: flex;
  flex-direction: column;
}

/* Title Page */
.container-title-page{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 2px solid #f3f7fa;
}
.wrapper-title{
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

/* Main Content Style */
.container-content{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.container-data{
  display: flex;
  flex-direction: column;
}
.header-data{
  padding: 1rem;
}
.container-data-column{
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f3f7fa;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}
.container-data-row{
  display: flex;
  padding: 20px;
  background-color: #f3f7fa;
  border-radius: 8px;
  position: relative;
}
.wrapper-data-column{
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.wrapper-data{
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.header-detail-data{
  font-size: 13px;
  color: #adb5bd;
}
.data{
  font-weight: 600;
}
.container-data-image{
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.image-data{
  width: 414px;
  height: 276px;
}
.dropdown-data-icon{
  position: absolute;
  right: 20px;
  top: 25.5px;
}

/* Detail Kredit */
.wrapper-data-row{
  display: flex;
}
.wrapper-data-header{
  padding-block-end: 20px;
  border-bottom: 1px solid  #dbdfe2;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.wrapper-data-header > .wrapper-data{
  width: calc(100%/2);
}
.car-detail{
  display: flex;
  padding-block: 20px;
  gap: 40px;
  border-bottom: 1px solid  #dbdfe2;
}
.car-detail > *{
  width: calc(100%/5);
}
.image{
  width: 110.4px;
  height: 73.6px;
}

.kredit-detail{
  display: flex;
  padding-block: 20px;
  gap: 20px;
}
.kredit-detail > * {
  width: calc(100%/5);
}

.container-list{
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.cicilan{
  background-color: #82d114;
  width: fit-content;
  padding: 2px;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
}
.list-data-cicilan{
  gap: 20px;
}
.list-data-cicilan > .wrapper-data{
  width: calc(100%/5);
}

.detail-icon{
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
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
}

.container-tools{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-block: 1rem;
}

.input-group{
  display: flex;
  position: relative;
}
.filter{
  width: 200px;
}
.label{
  position: absolute;
  left: 0;
  top: 0;
  font-size: 13px;
  transform: translate(15px, -50%);
  z-index: 0;
  background-color: #fff;
  transition: 1s ease;
  color: rgba(0, 0, 0, 0.8);
  padding-inline: 2px;
}
select, input[type="text"]{
  padding: 10px;
  padding-inline: 15px;
  font-size: 15px;
  width: 100%;
  outline: none;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-family: Roboto;
}
.add-icon{
  box-sizing: content-box;
  padding: 3px;
  background-color: #2753d8;
  border-radius: 8px;
  margin-inline-end: .5rem;
}
.tools{
  display: flex;
  align-items: center;
}
.header-data-cicilan{
  padding-inline: 1rem;
}
.tambah-cicilan{
  font-size: .9rem;
  color: #2753d8;
}

.card-wrapper{
  display: none;
  position: fixed;
  align-items: center;
  justify-content: center;
  z-index: 2;
  width: calc(100% - 250px);
  height: calc(100% - 70px);
  background-color: rgba(243, 247, 250, .5);
}
.card > .input-group{
  width: 100%;
}
.card{
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  max-width: 400px;
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.card-header{
  font-weight: 600;
  font-size: 1.2rem;
}
.button-group{
  display: flex;
  gap: 1rem;
  align-self: flex-end;
}
.button{
  box-sizing: content-box;
  width: 50px;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  color: #fff;
}
.cancel-button{
  background-color: #d00000;
}
.ok-button{
  background-color: #2753d8;
}
.d-flex{
  display: flex;
}

.rotate-180{
  transform: rotate(-180deg);
}
.height-76{
  height: 76px;
}
</style>
