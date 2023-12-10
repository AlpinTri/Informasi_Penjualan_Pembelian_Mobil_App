<template>
  <section>
    <div class="tagline">
      <p class="caption">Temukan mobil impian kamu bersama</p>
      <div class="brand">Mobilesia</div>
    </div>
    <div class="d-flex-column align-items-center">
      <form class="input-group top-input">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#dfe3e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input name="q" class="input" type="text" placeholder="Mulai cari mobil">
        <button class="search-btn" type="submit">Cari</button>
      </form>
    </div>
    <div class="d-flex-column mt-1">
      <div class="p-block-1-5 p-inline-2-5">
        <h2>Pilihan Mobil Untuk Kamu</h2>
        <div>Telusuri sesuai dengan kebutuhan kamu</div>
      </div>
      <div class="card-wrapper">
        <div class="card" v-for="item in data" :key="item.kode_mobil">
          <img class="car-image" :src="`http://localhost:5000/api/v1/assets/${item.gambar}`" alt="">
          <div class="d-flex-column gap-1">
            <h3>{{ item.type }}</h3>
            <h4 class="price">{{ rupiah.format(item.harga) }}</h4>
            <div class="d-flex-row gap-0-5">
              <div class="list-detail">{{ item.jenis_transmisi }}</div>
              <div class="list-detail">{{ item.bahan_bakar }}</div>
              <div class="list-detail">{{ `${item.kapasitas_mesin} ${item.bahan_bakar == 'Listrik' ? 'kWh' : 'cc'}` }}</div>
            </div>
          </div>
        </div>
        <!-- <div class="card">
          <img class="car-image" src="./10cef220-8c0f-11ee-8abd-f1b09e14f049.png" alt="">
          <div class="d-flex-column gap-1">
            <h3>BR-V</h3>
            <h4 class="price">Rp 150.000.000</h4>
            <div class="d-flex-row gap-0-5">
              <div class="list-detail">Manual</div>
              <div class="list-detail">Bensin</div>
              <div class="list-detail">1479 cc</div>
            </div>
          </div>
        </div>
        <div class="card">
          <img class="car-image" src="./10cef220-8c0f-11ee-8abd-f1b09e14f049.png" alt="">
          <div class="d-flex-column gap-1">
            <h3>BR-V</h3>
            <h4 class="price">Rp 150.000.000</h4>
            <div class="d-flex-row gap-0-5">
              <div class="list-detail">Manual</div>
              <div class="list-detail">Bensin</div>
              <div class="list-detail">1479 cc</div>
            </div>
          </div>
        </div>
        <div class="card">
          <img class="car-image" src="./10cef220-8c0f-11ee-8abd-f1b09e14f049.png" alt="">
          <div class="d-flex-column gap-1">
            <h3>BR-V</h3>
            <h4 class="price">Rp 150.000.000</h4>
            <div class="d-flex-row gap-0-5">
              <div class="list-detail">Manual</div>
              <div class="list-detail">Bensin</div>
              <div class="list-detail">1479 cc</div>
            </div>
          </div>
        </div> -->
        <div class="card more-navigation" @click="router.push({name: 'search'})">
          <h2>Tampilkan lebih banyak</h2>
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#82d114" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="M5 12h13M12 5l7 7-7 7"/></svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import axios, { AxiosError } from "axios";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const data = reactive([]);

// Format IDR
const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR'
});

onMounted(async () => {
  try {
    const response = await axios({
      baseURL: 'http://localhost:5000/api/v1',
      method: 'GET',
      url: `cars`,
    });

    const responseData = response.data.data

    for (let i = 0; i < 4; i++) {
      data.push(responseData[i]);
    }

    console.log(data)
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err)
    }
    console.log(err)
  }
});
</script>

<style scoped>

.tagline{
  color: #fff;
  background-color: #2753d8;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 1rem;
}
.brand{
  font-size: 2rem;
  font-weight: 900;
}
.top-input{
  top: calc(-49px/2);
}

.input-group{

  background-color: #fff;
  padding: 5px 5px 5px 10px;
  display: flex;
  align-items: center;
  border-radius: 3px;
  width: 45%;
  position: relative;
  box-shadow: 0 0 5px rgba(0, 0, 0, .25);
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


.car-image{
  height: 140px;
  width: 210px;
  border-radius: 8px;
}
.card{
  padding: 10px 10px 20px 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: fit-content;
  border-radius: 8px;
  gap: .5rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, .25);
}
.card:hover{
   box-shadow: 0 0 10px rgba(0, 0, 0, .25);
   cursor: pointer;
}
.list-detail{
  padding: 2px 5px;
  background-color: #82d114;
  text-align: center;
  color: #fff;
  border-radius: 5px;
}
.card-wrapper{
  display: flex;
  gap: 8.25px;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 20px;
}


.more-navigation{
  width: 230px;
  height: 275px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
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

/* Gap */
.gap-0-5{
  gap: .5rem;
}
.gap-1{
  gap: 1rem;
}
/* Margin */
.mt-1{
  margin-top: 1rem;
}

.p-block-1-5{
  padding-block: 1.5rem;
}

.p-inline-2-5{
  padding-inline: 2.5rem;
}
</style>