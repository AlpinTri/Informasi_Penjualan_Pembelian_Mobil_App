<template>
  <section>
    <div class="wrapper">
      <div class="header">Preview Report Data</div>
      <button class="btn" @click="cancel">
        <span>Batal</span>
      </button>
    </div>
    <div class="wrapper-collapse">
      <div class="input-group filter">
        <label for="" class="label">Data</label>
        <select name="" v-model="filter.category">
          <option selected disabled>Pilih Kategori Data</option>
          <option value="Cash">Penjualan Cash</option>
          <option value="Kredit">Penjualan Kredit</option>
        </select>
      </div>
      <div class="input-group" @click="() => from.showPicker()">
        <label for="" class="label">Dari</label>
        <input type="text" v-model="filter.from" readonly>
        <input type="date" name="" id="" ref="from" @change="changeDate('from')" v-model="datePicked.from" :max="new Date().toLocaleDateString('en-GB').split('/').reverse().join('-')">
        <svg class="calendar-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="arcs"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
      </div>
      <div class="input-group" @click="() => to.showPicker()">
        <label for="" class="label">Sampai</label>
        <input type="text" v-model="filter.to" readonly>
        <input type="date" name="" id="" ref="to" @change="changeDate('to')"  v-model="datePicked.to" :max="new Date().toLocaleDateString('en-GB').split('/').reverse().join('-')">
        <svg class="calendar-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="arcs"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
      </div>
      <button class="btn-colored" @click="previewData">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        <span>Preview</span>
      </button>
      <button class="btn-colored d-none" @click="print" ref="printButton">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="arcs"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5"/></svg>
        <span>Unduh Sekarang</span>
      </button>
    </div>
    <div class="grid container-table rds-4 p-12">
        <table class="col-12 customers">
          <thead>
            <tr>
                <th v-for="header in headers" :key="header">{{ header.split('_').map(w => w[0].toUpperCase() + w.split('').splice(1, w.length).join('').toLowerCase()).join(' ') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in printData" :key="data[data.kode_kredit || data.kode_cash]">
              <td>{{ data[headers[0]] }}</td>
              <td>{{ data[headers[1]] }}</td>
              <td>{{ data[headers[2]] }}</td>
              <td>{{ data[headers[3]].includes('.') ? rupiah.format(data[headers[3]]) : data[headers[3]] }}</td>
              <td>{{ new Date(data[headers[4]]).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', }) }}</td>
            </tr>
          </tbody>
        </table>
    </div>
  </section>
</template>

<script setup>
import axios, { AxiosError } from "axios";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import userAuthStore from "../../stores/auth";

const router = useRouter();

const store = userAuthStore();
const token = store.getToken();

const printData = reactive([]);
const headers = reactive([]);

const to = ref(null);
const from = ref(null);
const printButton = ref(null);
let date;

const datePicked = reactive({
  from: '',
  to: ''
})

const filter = reactive({
  category: '',
  from: '',
  to: ''
});

// Format IDR
const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR'
});

function cancel() {
  router.push({
    name: 'admin'
  })
}

function changeDate(type) {

  if (type === 'to') {
    date = new Date(datePicked.to);
    filter.to = date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', });
  } else {
    date = new Date(datePicked.from);
    filter.from = date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', });
  }

}

function validation() {
  const now = new Date().toLocaleDateString('en-GB').split('/').reverse().join('-');
  const formatNow = new Date(now);
  const dateFrom = new Date(datePicked.from);
  const dateTo = new Date(datePicked.to);

  if (dateFrom > formatNow || dateTo > formatNow) {
    toast.info('Tanggal tidak boleh melebihi hari ini', {
      autoClose: 5000
    });
    return null;

  } else if (dateFrom > dateTo) {

    toast.info('Tanggal awal tidak boleh lebih dari tanggal akhir', {
      autoClose: 5000
    });
    return null;
  } else if (!filter.category) {

    toast.info('Mohon pilih kategori data', {
      autoClose: 3000
    });
    return null;
  }

  return true;
}

function print() {
  if (printData.length) {
    window.print();
    return;
  }

  toast.error('There is an error', {
    autoClose: 5000
  })
}

async function previewData() {
  try {
    const match = validation();

    if (!match) {
      return false
    }

    let url;

    if (filter.category === 'Cash') {
      url = `/cashes/transactions?from=${datePicked.from}&to=${datePicked.to}`
    } else {
      url = `/credits/transactions?from=${datePicked.from}&to=${datePicked.to}`
    }

    const response = await axios({
      baseURL: 'http://localhost:5000/api',
      method: 'GET',
      url: url,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    headers.splice(0, headers.length);
    printData.splice(0, printData.length);
    const data = response.data.data;
    data.forEach(item => printData.push(item));

    if (printData.length) {
      printButton.value.classList.remove('d-none');
      Object.keys(printData[0]).forEach(item => headers.push(item));
      console.log(data)
    }

  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response.data.message === 'Token expired') {
        const match = store.logout();

        if (match) {
          router.push({
            name: 'login'
          });

          return;
        }
      } else if (err.response.status === 404) {
        toast.info('Sorry, No Result Found');
        
      } else {
        toast.error(err.message);
      }
    } else {
      toast.error(err.message)
    }
  }
}

onMounted(() => {
  if (!filter.to && !filter.from) {
    date = new Date(Date.now())
    datePicked.to = date.toLocaleDateString('en-GB').split('/').reverse().join('-');;
    datePicked.from = date.toLocaleDateString('en-GB').split('/').reverse().join('-');;

    filter.to = date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', });
    filter.from = date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', });
  }
})
</script>

<style scoped>
section{
  margin: 20px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 2px;
    counter-reset: div;
}
.rds-4 {
    border-radius: 4px;
}
/* .p-12 {
    padding: 12px;
} */
.col-12 {
    grid-column: auto/span 12;
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

.customers tr:hover {
  background-color: #dde5f5;
}

.customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
}




/* Other */
.wrapper{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header{
  font-weight: 600;
  font-size: 20px;
}
.btn{
  box-sizing: content-box;
  display: flex;
  align-items: center;
  color: #2753d8;
  background-color: #fff;
  border: 1px solid rgba(39, 83, 216, .5);
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  padding: 10px 15px;
  gap: .5rem;
}
.btn:hover{
  color: #fff;
  background-color: #2753d8;
  cursor: pointer;
}

.wrapper-collapse{
  display: flex;
  gap: 1rem;
  padding: 1rem;
  /* border: 1px solid rgba(0, 0, 0, 0.1); */
  border-radius: 4px;
  background-color: #f3f7fa;
}

.btn-colored{
  box-sizing: content-box;
  display: flex;
  align-items: center;
  color: #fff;
  background-color: #2753d8;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  padding: 10px 12px;
  gap: .5rem;
}
.btn-colored:hover{
  cursor: pointer;
}

/* Input Styling */
.input-group{
  display: flex;
  position: relative;
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
input[type="date"]{
  position: absolute;
  bottom: 0;
  left: 0;
  /* transform: translate(-50%, 0); */
  /* display: none; */
  visibility: hidden;
}
/* input[type="date"]{
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  line-height: normal !important;
} */
/* input[type="date"]::-webkit-calendar-picker-indicator {
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    height: auto;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: auto;
} */
.filter{
  width: 200px;
}


.calendar-icon{
  position: absolute;
  right: 10px;
  top: 50%;
  bottom: 50%;
  transform: translate(0, -50%);
}

.d-none{
  display: none;
}

@media print{
  .wrapper, .wrapper-collapse{
    display: none;
  }
}
</style>