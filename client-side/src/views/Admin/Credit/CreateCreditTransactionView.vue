<template>
  <section>
    <div class="container">
      <div class="container-top">
        <span class="domain">Pembelian Cash</span>
        <span class="slash">/</span>
        <span class="codomain">Create</span>
      </div>
      <div class="container-bottom">
        <form class="form" action="#" @submit.prevent="submit">
          <div class="main-container-form">
            <div class="container-form-top">
              <div class="input-group input-image" @click="() => inputKTPImage.click()">
                <label for="image-input" class="image-label">
                  <svg class="image-icon" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="arcs"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M20.4 14.5L16 10 4 20"/></svg>
                  <span>Upload KTP</span>
                </label>
                <input @change="addFile($event, 'KTP')" ref="inputKTPImage" type="file" name="image-input" id="" accept=".png, .jpg, .jpeg">
                <img ref="previewKTPImage" src="" class="preview-image" alt="">
              </div>
              <div class="input-group input-image" @click="() => inputKKImage.click()">
                <label for="image-input" class="image-label">
                  <svg class="image-icon" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="arcs"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M20.4 14.5L16 10 4 20"/></svg>
                  <span>Upload KK</span>
                </label>
                <input @change="addFile($event, 'KK')" ref="inputKKImage" type="file" name="image-input" id="" accept=".png, .jpg, .jpeg">
                <img ref="previewKKImage" src="" class="preview-image" alt="">
              </div>
              <div class="input-group input-image" @click="() => inputSlipGajiImage.click()">
                <label for="image-input" class="image-label">
                  <svg class="image-icon" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="arcs"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M20.4 14.5L16 10 4 20"/></svg>
                  <span>Upload Slip Gaji</span>
                </label>
                <input @change="addFile($event, 'Slip Gaji')" ref="inputSlipGajiImage" type="file" name="image-input" id="" accept=".png, .jpg, .jpeg">
                <img ref="previewSlipGajiImage" src="" class="preview-image" alt="">
              </div>
            </div>
            <div class="container-form-middle">
              <div class="input-group">
                <label for="" class="label">NIK</label>
                <input type="text" v-model="creditData.nik">
              </div>
              <div class="wrapper-input-form">
                <div class="input-group">
                  <label for="" class="label">Type Mobil</label>
                  <select name="" id="" v-model="creditData.tipeMobil" @change="changeTypeMobil">
                    <option value="" selected disabled>Pilih tipe mobil</option>
                    <option :value="tipe" v-for="tipe in carTypes" :key="tipe">{{ tipe }}</option>
                  </select>
                </div>
                <div class="input-group">
                  <label for="" class="label">Warna</label>
                  <select name="" id="" ref="selectColor" v-model="creditData.warnaMobil" @change="changeWarnaMobil">
                    <option value="" selected disabled>Pilih warna mobil</option>
                    <option :value="warna" v-for="warna in carColors" :key="warna">{{ warna }}</option>
                  </select>
                </div>
              </div>
              <div class="input-group">
                <label for="" class="label">Harga Pokok Mobil</label>
                <input type="text" readonly :value="rupiah.format(creditData.hargaMobil)">
              </div>
              <div class="wrapper-input-form">
                <div class="input-group">
                  <label for="" class="label">Uang Muka</label>
                  <select name="" id="" v-model="creditData.totalUangMuka" @change="changeUangMuka">
                    <option value="" selected disabled>Pilih jumlah uang muka yang tersedia</option>
                    <option :value="dp" v-for="dp in uangMuka" :key="dp">{{ dp }}</option>
                  </select>
                </div>
                <div class="input-group">
                  <label for="" class="label">Tenor</label>
                  <select name="" id="" v-model="creditData.tenor" @change="changeTenor">
                    <option value="" selected disabled>Pilih tenor / jangka waktu yang tersedia</option>
                    <option :value="item" v-for="item in tenor" :key="item">{{ item }}</option>
                  </select>
                </div>
                <!-- <div class="input-group">
                  <label for="" class="label">Bunga (%)</label>
                  <select name="" id="" v-model="creditData.bunga" @change="changeBunga">
                    <option value="" selected disabled>Pilih bunga yang tersedia</option>
                    <option :value="item" v-for="item in bunga" :key="item">{{ item }}</option>
                  </select>
                </div> -->
              </div>
              <div class="wrapper-input-form">
                <div class="input-group">
                  <label for="" class="label">Bunga (%)</label>
                  <select name="" id="" v-model="creditData.bunga" @change="changeBunga">
                    <option value="" selected disabled>Pilih bunga yang tersedia</option>
                    <option :value="item" v-for="item in bunga" :key="item">{{ item }}</option>
                  </select>
                </div>
                <!-- <div class="input-group">
                  <label for="" class="label">Tenor</label>
                  <select name="" id="" v-model="creditData.tenor" @change="changeTenor">
                    <option value="" selected disabled>Pilih tenor / jangka waktu yang tersedia</option>
                    <option :value="item" v-for="item in tenor" :key="item">{{ item }}</option>
                  </select>
                </div> -->
                <div class="input-group">
                  <label for="" class="label">Total Cicilan Per Bulan</label>
                  <input type="text" readonly :value="rupiah.format(creditData.cicilanPerBulan)">
                </div>
              </div>
            </div>
            <!-- <div class="container-form-right">
              <div class="input-group">
                <label for="" class="label">NIK</label>
                <input type="text" >
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
                <input type="text" readonly>
              </div>
            </div> -->
          </div>
          <button class="submit-button" type="submit">Buat Transaksi</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import axios, { AxiosError } from "axios";
import { onMounted, reactive, ref } from "vue";
import userAuthStore from '@/stores/auth';
import { toast } from "vue3-toastify";
import 'vue3-toastify/dist/index.css';
import { useRouter } from "vue-router";

const emit = defineEmits(['successCreate']);

const router = useRouter();

const store = userAuthStore();
const token = store.getToken();
const form = new FormData();

const inputKTPImage = ref(null);
const inputKKImage = ref(null);
const inputSlipGajiImage = ref(null);
const previewKTPImage = ref(null);
const previewKKImage = ref(null);
const previewSlipGajiImage = ref(null);

// Credit Data
const creditData = reactive({
  nik: '',
  tipeMobil: '',
  warnaMobil: '',
  uangMuka: '',
  totalUangMuka: '',
  bunga: '',
  tenor: '',
  hargaMobil: '',
  cicilanPerBulan: ''
});

// Car Data
const cars = reactive([]);
const carTypes = reactive(new Set());
const carColors = reactive([]);

// Credit Package Data
const paketKredit = reactive([]);
const uangMuka = reactive(new Set());
const tenor = reactive(new Set());
const bunga = reactive([]);

// Format IDR
const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR'
});

// Change Events
function addFile(event, keyword) {
  if (keyword === 'KTP') {
    previewKTPImage.value.src = URL.createObjectURL(event.target.files[0]);
    previewKTPImage.value.classList.add('d-flex');
    form.append('KTP', event.target.files[0]);
  } else if (keyword === 'KK') {
    previewKKImage.value.src = URL.createObjectURL(event.target.files[0]);
    previewKKImage.value.classList.add('d-flex');
    form.append('KK', event.target.files[0]);
  } else {
    previewSlipGajiImage.value.src = URL.createObjectURL(event.target.files[0]);
    previewSlipGajiImage.value.classList.add('d-flex');
    form.append('slipGaji', event.target.files[0]);
  }
}

function changeTypeMobil() {
  carColors.splice(0, carColors.length);
  cars.forEach(item => item.type === creditData.tipeMobil ? carColors.push(item.warna) : ''); 

  // Clear Data While Type Car Change
  creditData.warnaMobil = '';
  creditData.hargaMobil = '';
  uangMuka.clear();
  tenor.clear();
  bunga.splice(0, tenor.length);
  creditData.cicilanPerBulan = '';
}

function changeWarnaMobil() {
  const filterData = cars.filter(item => item.type === creditData.tipeMobil && item.warna === creditData.warnaMobil);
  form.append('kodeMobil', filterData[0].kode_mobil);

  creditData.hargaMobil = filterData[0].harga;

  // Clear Data While Color Car Change
  uangMuka.clear();
  tenor.clear();
  bunga.splice(0, tenor.length);
  creditData.cicilanPerBulan = '';


  paketKredit.forEach(item => uangMuka.add(rupiah.format(creditData.hargaMobil * item.uang_muka / 100)));
}

function changeUangMuka() {
  tenor.clear();
  bunga.splice(0, tenor.length);
  creditData.cicilanPerBulan = '';

  const percentUangMuka = parseFloat(creditData.totalUangMuka.replace(/[^\d,]/g, '').replace(',', '.')) / creditData.hargaMobil * 100
  creditData.uangMuka = percentUangMuka;
  paketKredit.forEach(item => item.uang_muka === creditData.uangMuka ? tenor.add(item.tenor) : '');

  // Add Bunga To Select Element
  // paketKredit.forEach(item => item.uang_muka === creditData.uangMuka ? bunga.add(item.bunga) : '');
}

function changeTenor() {
  creditData.cicilanPerBulan = '';
  // tenor.splice(0, tenor.length);
  bunga.splice(0, tenor.length);
  
  // paketKredit.forEach(item => item.bunga === creditData.bunga && item.uang_muka === creditData.uangMuka ? tenor.push(item.tenor) : '');
  paketKredit.forEach(item => item.tenor === creditData.tenor && item.uang_muka === creditData.uangMuka ? bunga.push(item.bunga) : '');
}

function changeBunga() {
  const hargaPokok = creditData.hargaMobil - parseFloat(creditData.totalUangMuka.replace(/[^\d,]/g, '').replace(',', '.'));
  const totalBunga = (hargaPokok * creditData.bunga / 100) / 12 * creditData.tenor;
  const hargaKredit = hargaPokok + totalBunga;

  creditData.cicilanPerBulan = hargaKredit / creditData.tenor;
}



async function submit() {
  try {
    const idPaketKredit = paketKredit.filter(item => creditData.uangMuka === item.uang_muka && creditData.bunga === item.bunga && creditData.tenor === item.tenor);
    form.append('kodePaket', idPaketKredit[0].kode_paket);
    form.append('nik', creditData.nik);

    await createCredit(form)
  } catch (err) {
    console.log(err)
  }
}


async function createCredit(data) {
  try {
    const response = await axios({
      method: 'POST',
      url: `http://localhost:5000/api/credits`,
      data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const responseStatus = response.data.status;
    if (responseStatus >= 200 && responseStatus < 300) {
      emit('successCreate');
      router.push({
        name: 'credit transactions'
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

      } else if (err.response.data.error === 'MISSING_IMAGE_FILE') {
        toast.error('Gambar tidak boleh kosong');
      } else {
        toast.error('Network error, coba beberapa saat lagi');

      }
    } else {
      toast.error('Terjadi kesalahan pada server, coba beberapa saat lagi');

    }
    console.log(err)
  }
}

onMounted(async () => {
  try {
    const responseCars = await axios({
      method: 'GET',
      url: `http://localhost:5000/api/v1/cars`,
    });

    const carData = responseCars.data.data;

    carData.forEach(item => {
      cars.push(item);
      carTypes.add(item.type);
    });

    const responsePaketKredit = await axios({
      method: 'GET',
      url: `http://localhost:5000/api/v1/credit-packages`,
    })

    const paketKreditData = responsePaketKredit.data.data;

    paketKreditData.forEach(item => {
      paketKredit.push(item);
    });

  } catch (err) {
    console.log(err)
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
        toast.error('Network error, coba beberapa saat lagi');

      }
    } else {
      toast.error('Terjadi kesalahan pada server, coba beberapa saat lagi');

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
.wrapper-input-form{
  display: flex;
  gap: 20px;
}
.wrapper-input-form > .input-group{
  width: calc(100%/2);
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
.container-form-middle{
  display: flex;
  flex-direction: column;
  gap: 20px;
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




.container-bottom{
  margin-block-end: 40px;
}


.container-form-top{
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  gap: 20px;
}
</style>
