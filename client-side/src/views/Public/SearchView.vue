<template>
  <section class="d-flex-row">
    <form class="filter-container" ref="form">
      <div class="wrapper-filter d-flex-row align-items-center justify-content-between p-block-0-5">
        <h3>Filter</h3>
        <div class="btn d-flex-row gap-0-5 bg-white border-blue color-blue" @click="resetFilter">
          <span>Reset</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2753d8" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/></svg>
        </div>
      </div>
      <div class="wrapper-filter-link">
        <div class="header-filter">
          <div>Warna</div>
        </div>
        <ul class="list-filter">
          <li class="filter-link">
            <input type="checkbox" name="warna" id="" value="Hitam" v-model="warna">
            <span>Hitam</span>
          </li>
          <li class="filter-link">
            <input type="checkbox" name="warna" id="" value="Putih" v-model="warna">
            <span>Putih</span>
          </li>
          <li class="filter-link">
            <input type="checkbox" name="warna" id="" value="Lainnya" v-model="warna">
            <span>Lainnya</span>
          </li>
        </ul>
      </div>
      <div class="wrapper-filter-link">
        <div class="header-filter">
          <div>Transmisi</div>
        </div>
        <ul class="list-filter">
          <li class="filter-link">
            <input type="checkbox" name="transmisi" id="" value="Manual" v-model="transmisi">
            <span>Manual</span>
          </li>
          <li class="filter-link">
            <input type="checkbox" name="transmisi" id="" value="Otomatis" v-model="transmisi">
            <span>Otomatis</span>
          </li>
        </ul>
      </div>
      <div class="wrapper-filter-link">
        <div class="header-filter">
          <div>Tempat Duduk</div>
        </div>
        <ul class="list-filter">
          <li class="filter-link">
            <input type="checkbox" name="seat" id="" value="2-4" v-model="seat">
            <span>2 - 4 seat</span>
          </li>
          <li class="filter-link">
            <input type="checkbox" name="seat" id="" value="5-7" v-model="seat">
            <span>5 - 7 seat</span>
          </li>
          <li class="filter-link">
            <input type="checkbox" name="seat" id="" value="8-20" v-model="seat">
            <span>Lebih dari 8 seat</span>
          </li>
        </ul>
      </div>
      <div class="wrapper-filter-link">
        <div class="header-filter">
          <div>Kapasitas Mesin</div>
        </div>
        <ul class="list-filter">
          <li class="filter-link">
            <input type="checkbox" name="kapasitas" id="" value="0-1000" v-model="kapasitas">
            <span>Kurang dari 1000 cc</span>
          </li>
          <li class="filter-link">
            <input type="checkbox" name="kapasitas" id="" value="1001-2000" v-model="kapasitas">
            <span>1001 - 2000 cc</span>
          </li>
          <li class="filter-link">
            <input type="checkbox" name="kapasitas" id="" value="2001-3000" v-model="kapasitas">
            <span>2001 - 3000 cc</span>
          </li>
          <li class="filter-link">
            <input type="checkbox" name="kapasitas" id="" value="3001-10000" v-model="kapasitas">
            <span>Lebih dari 3000 cc</span>
          </li>
        </ul>
      </div>
    </form>
    <div class="content-container p-1">
      <form class="input-group">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#dfe3e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input name="type" class="input" type="text" placeholder="Cari berdasarkan tipe mobil" v-model="type">
        <button class="search-btn" type="submit">Cari</button>
      </form>
      <div class="result-head">{{ data.length ? 'Semua Mobil' : 'No result found' }}</div>
      <ul class="d-flex-column gap-1 container-car" v-if="data.length">
        <li class="card-row" v-for="item in data" :key="item.kode_mobil">
          <img class="product-image" :src="`http://localhost:5000/api/v1/assets/${item.gambar}`" alt="">
          <div class="container-specification">
            <div class="specification justify-content-between align-items-center">
              <h3>{{ item.type }}</h3>
              <div class="price">{{ rupiah.format(item.harga) }}</div>
            </div>
            <div class="specification-wrapper">
              <div class="d-flex-row gap-4">
                <div class="specification-group">
                  <div class="specification-1">
                    <div class="detail-head">Jumlah Seat:</div>
                    <div class="detail-value">{{ item.jumlah_seat }}</div>
                  </div>
                  <div class="specification-1">
                    <div class="detail-head">Warna:</div>
                    <div class="detail-value">{{ item.warna }}</div>
                  </div>
                </div>
                <div class="specification-group">
                  <div class="specification-1">
                    <div class="detail-head">Transmisi:</div>
                    <div class="detail-value">{{ item.jenis_transmisi }}</div>
                  </div>
                  <div class="specification-1">
                    <div class="detail-head">Kapasitas Mesin:</div>
                    <div class="detail-value">{{ `${item.kapasitas_mesin} ${item.bahan_bakar == 'Listrik' ? 'kWh' : 'cc'}` }}</div>
                  </div>
                </div>
              </div>
              <div class="button-group">
                <div class="btn bg-white color-blue border-blue" @click="detailCar(item.kode_mobil)">Lihat Spesifikasi</div>
                <a target="_blank" href="https://api.whatsapp.com/send/?phone=6289678320480&text=Halo%2C+saya+butuh+bantuan+dan+ingin+melakukan+konsultasi+pembelian+mobil" class="color-white bg-blue btn gap-0-5">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#fff" height="20px" width="20px" version="1.1" id="Layer_1" viewBox="0 0 308 308" xml:space="preserve" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"><g id="XMLID_468_"> <path id="XMLID_469_" d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156 c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687 c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887 c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153 c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348 c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802 c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922 c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0 c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458 C233.168,179.508,230.845,178.393,227.904,176.981z"/> <path id="XMLID_470_" d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716 c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396 c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188 l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677 c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867 C276.546,215.678,222.799,268.994,156.734,268.994z"/></g></g></svg>
                  <span>Konsultasi Pembelian</span>
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const form = ref(null);

const data = reactive([]);

const warna = ref([]);
const transmisi = ref([]);
const seat = ref([]);
const kapasitas = ref([]);

watch(warna, async (newVal, oldVal) => {

  if (warna.value.length) {
    if (warna.value.length > 1) {
      warna.value.shift();
      await router.replace({ query: null });
    }
  } else {
    warna.value.shift();
    await router.replace({ query: null })
  }

  form.value.submit()

});

watch(transmisi, async (newVal, oldVal) => {

  if (transmisi.value.length) {
    if (transmisi.value.length > 1) {
      transmisi.value.shift();
      await router.replace({ query: null })
    }
  } else {
    transmisi.value.shift();
    await router.replace({ query: null })
  }

  form.value.submit()

});

watch(seat, async (newVal, oldVal) => {

  if (seat.value.length) {
    if (seat.value.length > 1) {
      seat.value.shift();
      await router.replace({ query: null })
    }
  } else {
    seat.value.shift();
    await router.replace({ query: null })
  }

  form.value.submit()

});

watch(kapasitas, async (newVal, oldVal) => {

  if (kapasitas.value.length) {
    if (kapasitas.value.length > 1) {
      kapasitas.value.shift();
      await router.replace({ query: null })
    }
    
  } else {
    kapasitas.value.shift();
    await router.replace({ query: null })
  }

  form.value.submit()

});


async function resetFilter() {
  const checkbox = [warna, transmisi, seat, kapasitas]

  await checkbox.forEach(item => item.value.splice(0, item.value.length));
  form.value.submit();
}

function detailCar(id) {
  router.push({
    name: 'publicCarDetail',
    params: {
      kodeMobil: id
    }
  });
}

// Format IDR
const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR'
});

const type = ref('')

onMounted(async () => {
  try {

    const queryParams = route.query;
    const keyParams = Object.keys(queryParams);
    const matched = keyParams.map(item => queryParams[item] ? true : false)


    if (!keyParams.length) {
      const response = await axios({
        baseURL: 'http://localhost:5000/api/v1',
        method: 'GET',
        url: `cars`
      });
      console.log('params null')

      const responseData = response.data.data;
      responseData.forEach(item => data.push(item));
      return;
    }


    if (keyParams.includes('type')) type.value = queryParams.type;
    if (keyParams.includes('warna')) warna.value.push(queryParams.warna);
    if (keyParams.includes('transmisi')) transmisi.value.push(queryParams.transmisi);
    if (keyParams.includes('seat')) seat.value.push(queryParams.seat);
    if (keyParams.includes('kapasitas')) kapasitas.value.push(queryParams.kapasitas);

    const response = await axios({
      baseURL: 'http://localhost:5000/api/v1',
      method: 'GET',
      url: `/cars/search`,
      params: queryParams
    });

    console.log(response)
    const responseData = response.data.data;
    responseData.forEach(item => data.push(item));
    
  } catch (err) {
    console.log(err)
  }
})
</script>

<style scoped>

.input-group{
  background-color: #fff;
  padding: 5px 5px 5px 10px;
  display: flex;
  align-items: center;
  border-radius: 3px;
  width: 100%;
  position: relative;
  box-shadow: 0 0 2px rgba(0, 0, 0, .5);
}
.input{
  padding: 10px 15px;
  font-size: 15px;
  width: 100%;
  border: none;
  outline: none;
}
.search-btn{
  height: 39px;
  width: 50px;
  border-radius: 3px;
  border: none;
  background-color: #2753d8;
  color: #fff;
}


.color-blue{
  color: #2753d8;
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
.gap-4{
  gap: 4rem;
}
.p-1{
  padding: 1rem;
}
.p-block-0-5{
  padding-block: .5rem;
}
.filter-container{
  display: flex;
  flex-direction: column;
  width: 250px;
  background-color: #fff;
  height: fit-content;
  height: calc(100vh - 70px); 
  top: 70px;
  position: fixed;
  padding: 0 1rem 1.5rem 1rem;
  gap: 1rem;
  transition: 1s ease;
  box-shadow: 0 0 2px rgba(0, 0, 0, .5);
  overflow-y: auto;
}

.wrapper-filter{
  border-bottom: 1px solid rgba(0, 0, 0, .25);
}

.wrapper-filter-link{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* height: 40px;
  overflow: hidden; */
  transition: .4s ease;
}
.list-filter{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-inline-start: 10px;
  /* height: 0;
  overflow: hidden; */
}
.header-filter{
  padding: 10px;
  /* background-color: #2753d8; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  font-weight: bold;
}
.header-filter:hover{
  background-color: #f3f7fa;
}
.filter-link{
  display: flex;
  gap: .5rem;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}

.checkbox{
  height: 20px;
  width: 20px;
  /* background-color: #82d114; */
  border-radius: 3px;
  border: 2px solid rgba(0, 0, 0, .3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox:hover{
  border: transparent;
  background-color: #2753d8;
}

.content-container{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-self: flex-start;
  /* background-color: #82d114; */
  height: 100%;
  width: 100%;
  margin-left: 250px;
  /* background-color: #82d114; */
}

.result-head{
  font-size: 1.2rem;
  padding: 5px;
}
.card-row{
  display: flex;
  background-color: #fff;
  align-items: center;
  padding: 5px;
  border-radius: 8px;
  gap: 1.5rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, .25);
  transition: .5s ease;
}
.card-row:hover{
   box-shadow: 0 0 10px rgba(0, 0, 0, .25);
   cursor: pointer;
}
.product-image{
  min-height: 140px;
  min-width: 210px;
  max-height: 140px;
  max-width: 210px;
}
.container-specification{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1;
  padding: 1rem;
}
.specification-wrapper{
  display: flex;
  justify-content: space-between;
}
.specification-group{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.specification{
  display: flex;
  width: 100%;
}
.specification-1{
  display: flex;
  flex-direction: column;
}
.button-group{
  display: flex;
  flex-direction: column;
  gap: .5rem;
  align-self: flex-end;
  /* background-color: #82d114; */
}

.color-white{
  color: #fff;
}
.bg-white{
  background-color: #fff;
}
.bg-blue{
  background-color: #2753d8;
}

.btn{
  border: none;
  box-sizing: content-box;
  padding: 7px 10px 7px 10px;
  font-size: 15px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn:hover{
  cursor: pointer;
}
.border-blue{
  border: 1px solid #2753d8;
}

.detail-head{
  font-size: 15px;
  font-weight: bold;
}
.detail-value{
  font-size: 14px;
}

.price{
  font-size: 1.2rem;
  font-weight: bold;
}

.open-three{
  height: 148px;
  overflow: unset;
}
.open-two{
  height: 112px;
  overflow: unset;
}
.open-four{
  height: 184px;
  overflow: visible;
}

input[type="checkbox"]{
  height: 20px;
  width: 20px;
}

</style>