<template>
  <section>
    <div class="container">
      <ul class="container-list-box">
        <li class="box" @click="redirect('cash')">
          <div class="header-box">
            <span>Pembelian Cash</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2753d8" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="M5 12h13M12 5l7 7-7 7"/></svg>
          </div>
          <h3>{{ totalData.cash ? totalData.cash[0].jumlah : 0 }}</h3>
        </li>
        <li class="box" @click="redirect('kredit')">
          <div class="header-box">
            <span>Pembelian Kredit</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2753d8" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="M5 12h13M12 5l7 7-7 7"/></svg>
          </div>
          <h3>{{ totalData.kredit ? totalData.kredit[0].jumlah : 0 }}</h3>
        </li>
        <li class="box" @click="redirect('customer')">
          <div class="header-box">
            <span>Customer</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2753d8" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="M5 12h13M12 5l7 7-7 7"/></svg>
          </div>
          <h3>{{ totalData.customer ? totalData.customer[0].jumlah : 0 }}</h3>
        </li>
        <li class="box" @click="redirect('mobil')">
          <div class="header-box">
            <span>Mobil</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2753d8" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="M5 12h13M12 5l7 7-7 7"/></svg>
          </div>
          <h3>{{ totalData.mobil ? totalData.mobil[0].jumlah : 0 }}</h3>
        </li>
      </ul>
      <div class="container-mid">
        <div class="box-2">
          <div class="input-group">
            <label for="" class="label">Setting Tahun Grafik Penjualan</label>
            <input type="text" @keypress="keyPressNumber" v-model="yearSetting">
          </div>
          <button class="save-btn" @click="updateChart">Simpan</button>
        </div>
        <div class="box-2" @click="redirect('print')">
          <div class="head">Print Data Penjualan</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2753d8" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="M9 18l6-6-6-6"/></svg>
        </div>
      </div>
      <div class="chart-container">
        <canvas ref="myChart"></canvas>
      </div>
    </div>
  </section>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive, ref, shallowRef, watch } from "vue";
import Chart from 'chart.js/auto';
import userAuthStore from "../../stores/auth";
import { useRouter } from "vue-router";

const store = userAuthStore();
const token = store.getToken();

const router = useRouter()

const myChart = ref(null);
const chart = shallowRef(null);

const totalData = reactive({})

const expression = /[0-9]/;
const yearSetting = ref(new Date().getFullYear());

const config = {
  type: 'line',
  data: {
    labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
    datasets: [
      {
        label: 'Penjualan Cash',
        data: [],
        borderColor: '#82d114',
        backgroundColor: '#a7ed44',
        borderWidth: 1
      },
      {
        label: 'Penjualan Kredit',
        data: [],
        borderColor: '#2753d8',
        backgroundColor: '#6887e4',
        borderWidth: 1
      }
    ]
  },
  options: {
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 15,
            family: 'Roboto'
          },
        },
        title: {
          text: `Grafik Penjualan ${yearSetting.value}`,
          display: true,
          color: '#2753d8',
          font: {
            size: 20,
            family: 'Roboto',
          }
        }
      }
    }
  }
}

function keyPressNumber(event) {
  return expression.test(event.key) ? event.key : event.preventDefault();
}

function redirect(to) {
  let _destination;

  if (to === 'kredit') _destination = { name: 'credit transactions' }
  if (to === 'cash') _destination = { name: 'cash transactions' }
  if (to === 'customer') _destination = { name: 'customers' }
  if (to === 'mobil') _destination = { name: 'cars' }
  if (to === 'print') _destination = { name: 'print file' }

  router.push(_destination);
}

async function fetchData(typeData) {
  try {
    let url;

    if (typeData === 'Transactions') url = `/counts/transactions?year=${yearSetting.value}`

    if (typeData === 'Master') url = `/counts/master`

    if (!typeData) return false;

    const response = await axios({
      baseURL: 'http://localhost:5000/api/',
      method: 'GET',
      url: url,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data.data
  } catch (err) {
    console.log(err)
  }
}

async function updateChart() {
  try {
    if (expression.test(yearSetting.value) && yearSetting.value.length === 4) {
      const data = await fetchData('Transactions');

      chart.value.config.data.datasets[0].data.splice(0, 12);
      chart.value.config.data.datasets[1].data.splice(0, 12);

      data.cash.forEach(item => chart.value.config.data.datasets[0].data.push(item));
      data.kredit.forEach(item => chart.value.config.data.datasets[1].data.push(item));

      chart.value.config.options.plugins.legend.title.text = `Grafik Penjualan ${yearSetting.value}`;
      chart.value.update();

    }
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  try {
    const data = await fetchData('Transactions');

    chart.value = new Chart(myChart.value.getContext('2d'), config);

    data.cash.forEach(item => chart.value.config.data.datasets[0].data.push(item));
    data.kredit.forEach(item => chart.value.config.data.datasets[1].data.push(item));

    chart.value.config.options.scales = {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        suggestedMax: Math.max(...chart.value.config.data.datasets[1].data, ...chart.value.config.data.datasets[0].data) + 2
      }
    }

    chart.value.update();


    const countData = await fetchData('Master');

    Object.keys(countData).forEach(key => totalData[key] = countData[key]);


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
}
.container{
  width: 95%;
  margin-inline: auto;
  margin-block: calc(5%/2);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Dashboard */
.container-list-box{
  display: flex;
  gap: 1rem;
}
.box{
  background-color: #f3f7fa;
  border-radius: 5px;
  padding: 15px;
  width: calc(100%/4);
  height: 100px;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  color: #2753d8;
  transition: .25s ease;
  cursor: pointer;
}
.header-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
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
input[type="number"], input[type="text"], select{
  padding: 10px;
  padding-inline: 15px;
  font-size: 15px;
  width: 100%;
  outline: none;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-family: Roboto;
}

.container-mid{
  display: flex;
  gap: 1rem;
}
.box-2{
  width: calc(100%/2);
  background-color: #f3f7fa;
  padding: 1rem;
  display: flex;
  gap: .5rem;
  border-radius: 5px;
  align-items: center;
  justify-content: space-between;
}
.box-2:last-child{
  cursor: pointer;
}
.head{
  font-size: 18px;
  color: #2753d8;
}

.save-btn{
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  background-color: #2753d8;
  color: #fff;
}

.chart-container{
  padding: 1rem;
  background-color: #f3f7fa;
  border-radius: 5px;
}
</style>