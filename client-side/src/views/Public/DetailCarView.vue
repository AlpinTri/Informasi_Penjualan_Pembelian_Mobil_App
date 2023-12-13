<template>
  <div class="d-flex-column gap-1 p-1-5">
    <div class="d-flex-row gap-0-5 container-nav-page">
      <RouterLink :to="{name: 'home'}">Home</RouterLink>
      <span>/</span>
      <RouterLink :to="{name: 'search'}">Mobil</RouterLink>
      <span>/</span>
      <span>{{ data.type }}</span>
    </div>
    <div class="d-flex-row align-items-start container-detail p-block-end-1">
      <img class="product-image" :src="`http://localhost:5000/api/v1/assets/${data.gambar}`" alt="">
      <div class="d-flex-column gap-1-5 flex-grow-1 p-1">
        <div class="d-flex-row justify-content-between product-head">
          <div class="car-name">{{ data.type }}</div>
          <div class="car-price">{{ rupiah.format(data.harga) }}</div>
        </div>              
        <div class="d-flex-column gap-1">
          <div class="car-spesification">Spesifikasi</div>
          <div class="d-flex-row gap-5">
            <div class="d-flex-column gap-1-5">
              <div>
                <div class="specification-head">Merk:</div>
                <div class="specification-value">{{ data.merk }}</div>
              </div>
              <div>
                <div class="specification-head">Warna:</div>
                <div class="specification-value">{{ data.warna }}</div>
              </div>
              <div>
                <div class="specification-head">Bahan Bakar:</div>
                <div class="specification-value">{{ data.bahan_bakar }}</div>
              </div>
            </div>
            <div class="d-flex-column gap-1-5">
              <div>
                <div class="specification-head">Jumlah Seat:</div>
                <div class="specification-value">{{ data.jumlah_seat }}</div>
              </div>
              <div>
                <div class="specification-head">Transmisi:</div>
                <div class="specification-value">{{ data.jenis_transmisi }}</div>
              </div>
              <div>
                <div class="specification-head">Kapasitas Mesin:</div>
                <div class="specification-value">{{ data.kapasitas_mesin }}</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <a target="_blank" href="https://api.whatsapp.com/send/?phone=6289678320480&text=Halo%2C+saya+butuh+bantuan+dan+ingin+melakukan+konsultasi+pembelian+mobil" class="btn-consultation d-flex-row gap-0-5 align-items-center justify-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#fff" height="20px" width="20px" version="1.1" id="Layer_1" viewBox="0 0 308 308" xml:space="preserve" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"><g id="XMLID_468_"> <path id="XMLID_469_" d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156 c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687 c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887 c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153 c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348 c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802 c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922 c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0 c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458 C233.168,179.508,230.845,178.393,227.904,176.981z"/> <path id="XMLID_470_" d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716 c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396 c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188 l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677 c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867 C276.546,215.678,222.799,268.994,156.734,268.994z"/></g></g></svg>
            <span>Konsultasi Pembelian</span>
          </a>
        </div>
      </div>
    </div>
    <div class="d-flex-column gap-1">
      <h2 class="header-simulation">Simulasi Kredit</h2>
      <div class="p-2 bg-gray d-flex-row container-simulation">
        <div class="d-flex-column gap-2">
          <div class="d-flex-column gap-1">
            <div class="input-group d-flex-row align-items-center gap-0-5">
              <label for="" class="label">Uang Muka</label>
              <input type="text" @keypress="keyPressNumber" v-model="uangMuka">
              <span class="percent">%</span>
            </div>
            <input type="range" min="10" max="70" step="1" v-model="uangMuka">
            <div class="d-flex-row justify-content-between">
              <span>10%</span>
              <span>70%</span>
            </div>
          </div>
          <div class="d-flex-column gap-1">
            <div class="input-group d-flex-row align-items-center gap-0-5">
              <label for="" class="label">Suku Bunga Per Tahun</label>
              <input type="text" @keypress="keyPressNumber" v-model="sukuBunga">
              <span class="percent">%</span>
            </div>
            <input type="range" min="1" max="10" step="0.01" v-model="sukuBunga">
            <div class="d-flex-row justify-content-between">
              <span>1%</span>
              <span>10%</span>
            </div>
          </div>
          <div class="d-flex-column gap-1">
            <div class="input-group d-flex-row align-items-center gap-0-5">
              <label for="" class="label">Tenor</label>
              <input type="text" @keypress="keyPressNumber" v-model="tenor">
              <span>Tahun</span>
            </div>
            <input type="range" min="1" max="10" step="1" v-model="tenor">
            <div class="d-flex-row justify-content-between">
              <span>1</span>
              <span>10</span>
            </div>
          </div>
        </div>
        <div class="d-flex-column gap-2">
          <div class="input-group-full">
            <label for="" class="label">Harga Mobil</label>
            <input type="text" class="w-full" @keypress="keyPressNumber" v-model="harga">
          </div>
          <div class="p-1 bg-white d-flex-row align-items-center justify-content-between wrapper-calculation">
            <div class="d-flex-column gap-0-5 align-items-center">
              <div class="font-size-15px">Total Uang Muka:</div>
              <h3>{{ typeof totalCalculation.uangMuka == 'number' ? rupiah.format(totalCalculation.uangMuka) :  totalCalculation.uangMuka }}</h3>
            </div>
            <div class="d-flex-column gap-0-5 align-items-center">
              <div class="font-size-15px">Cicilan Per Bulan:</div>
              <h3>{{ typeof totalCalculation.cicilan == 'number' ? rupiah.format(totalCalculation.cicilan) : totalCalculation.cicilan }}</h3>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="container-table p-0-5">
        <table class="col-12 customers">
          <tr>
              <th>Uang Muka (DP)</th>
              <th>Tenor (Jangka Waktu)</th>
              <th>Cicilan Per Bulan</th>
              <th>Bunga Per Tahun<th>
          </tr>
          <tbody>
            <tr>
                <td rowspan="3">Alfreds Futterkiste</td>
                <td>Maria Anders</td>
                <td>Germany</td>
            </tr>
            <tr>
                <td>Christina Berglund</td>
                <td>Sweden</td>
            </tr>
            <tr>
                <td>Centro comercial Moctezuma</td>
                <td>Francisco Chang</td>
            </tr>
          </tbody>
        </table>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import axios, { AxiosError } from "axios";
import { onMounted, reactive, ref, watch } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const data = reactive({});

// Binding Data
const totalCalculation = reactive({
  uangMuka: 0,
  cicilan: 0
});

// Binding input
const uangMuka = ref(10);
const sukuBunga = ref(5);
const tenor = ref(3);
const harga = ref(100000000);

function calculation() {
  if (uangMuka.value && sukuBunga.value && tenor.value && harga.value) {

    const jangkaWaktu = tenor.value * 12;
    const dp = harga.value * uangMuka.value / 100
    const hargaPokok = harga.value - dp;
    const jumlahBunga = (hargaPokok * sukuBunga.value / 100) / 12 * jangkaWaktu;

    const totalKredit = hargaPokok + jumlahBunga;
    totalCalculation.uangMuka = dp;
    totalCalculation.cicilan = totalKredit / jangkaWaktu;
    
  } else {
    totalCalculation.uangMuka = '-';
    totalCalculation.cicilan = '-'
  }
}

// Watch Binding Input
watch(uangMuka, calculation);
watch(sukuBunga, calculation);
watch(tenor, calculation);
watch(harga, calculation);

// Format IDR
const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR'
});

function keyPressNumber(event) {
  const expression = /[0-9]/;
  return expression.test(event.key) ? event.key : event.preventDefault();
}

onMounted(async () => {
  try {
    const response = await axios({
      baseURL: 'http://localhost:5000/api/v1/cars',
      method: 'GET',
      url: `${route.params.kodeMobil}`
    });

    const responseData = response.data.data;
    Object.keys(responseData[0]).forEach(item => data[item] = responseData[0][item]);
    calculation()
  } catch (err) {
    console.log(err)
  }
});
</script>

<style scoped>

.flex-grow-1{
  flex-grow: 1;
}

/* Display */
.d-flex-row{
  display: flex;
  align-items: center;
}
.d-flex-column{
  display: flex;
  flex-direction: column;
}

/* Align Items */
.align-items-center{
  align-items: center;
}
.align-items-start{
  align-items: flex-start;
}

/* Justify Content */
.justify-content-center{
  justify-content: center;
}
.justify-content-between{
  justify-content: space-between;
}

/* Gap */
.gap-0-5{
  gap: .5rem;
}
.gap-1{
  gap: 1rem;
}
.gap-1-5{
  gap: 1.5rem;
}
.gap-5{
  gap: 5rem;
}

.m-block-1{
  margin-block: 1rem;
}
/* Padding */
.p-0-5{
  padding: .5rem;
}
.p-1{
  padding: 1rem;
}
.p-1-5{
  padding: 1.5rem;
}
.p-block-end-1{
  padding-block-end: 1rem;
}
.product-image{
  width: 552px;
  height: 368px;
}

.car-name{
  font-size: 1.2rem;
  font-weight: bold;
}
.car-price{
  font-size: 1.2rem;
  font-weight: bold;
}
.product-head{
  padding-block-end: .5rem;
  border-bottom: 1px solid #2753d8;
}
.car-spesification{
  font-size: 1rem;
  font-weight: bold;
}
.specification-head{
  font-weight: bold;
}
.specification-value{
  font-size: 14px;
}
.btn-consultation{
  margin-top: 1rem;
  padding: 8px 16px;
  background-color: #2753d8;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  width: fit-content;
}
.btn-simulation{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100px;
  font-size: 14px;
  background-color: #fff;
  border: 1px solid #2753d8;
  border-radius: 8px;
  color: #2753d8;
  transition: .2s ease;
  cursor: pointer;
}
.btn-simulation:hover{
  background-color: #2753d8;
  color: #fff;
}
.percent{
  font-size: 1.5rem;
}

.container-table {
  background-color: #F3F6F9;
}

.customers {
  border-collapse: collapse;
  width: 100%;
}

.customers td {
  font-size: 14px;
}

.customers td,
.customers th {
  border: 1px solid #ddd;
  padding: 10px;
}

.customers tbody tr:nth-child(even) {
  background-color: #eef1f7;
}

.customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
}
.container-table {
  background-color: #F3F6F9;
  border-radius: 5px;
}

.container-detail{
  border-bottom: 1px solid #2753d8;
}

.input-group{
  display: flex;
  position: relative;
  width: 250px;
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

.container-nav-page{
  font-weight: bold;
}
.container-nav-page > span:last-child{
  color: #2753d8;
}

input[type="range"]{
  -webkit-appearance: none;
  appearance: none; 
  height: 2px;
  width: calc(100%);
  border-radius: 999px;
  background-color: #2753d8;
  /* color: red; */
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none; 
  background-color: #2753d8;
  border-radius: 999px;
  height: 1rem;
  width: 1rem;
}

.container-nav-page{
  font-weight: bold;
}
.container-nav-page > span:last-child{
  color: #2753d8;
}

.container-simulation{
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  border-radius: 5px;
}
.container-simulation > div{
  width: calc(100%/2);
}
.bg-white{
  background-color: #fff;
}
.bg-gray{
  background-color: #f3f7fa;
}
.input-group-full{
  display: flex;
  position: relative;
  width: 100%;
}
.w-full{
  width: 100%;
}
.font-size-15px{
  font-size: 15px;
}
.wrapper-calculation > div{
  width: calc(100%/2);
}
.wrapper-calculation{
  gap: 1rem;
  border-radius: 8px;
}

.p-2{
  padding: 2rem;
}
.gap-2{
  gap: 2rem;
}
.header-simulation{
  color: #2753d8;
  align-self: center;
}
</style>