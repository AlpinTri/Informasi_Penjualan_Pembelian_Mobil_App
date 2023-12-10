<template>
  <section>
    <div class="container">
      <div class="container-top">
        <span class="header">Pembelian Cash</span>
        <RouterLink v-show="userInfo.status === 'Super Admin' || userInfo.status === 'Sales'" class="add-icon-wrapper" :to="{name: 'create cash transaction'}">
          <svg class="add-icon" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </RouterLink>
        <form class="input-group">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#dadee0" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input name="q" class="input" type="text" placeholder="Ketik kata kunci untuk mencari" v-model="keyword">
        </form>
      </div>
      <ul class="list-item-container">
        <li class="list-item" v-for="data in cash" :key="data.kode_cash">
          <div class="container-detail-data">
            <div class="detail-data">
              <div class="header-data">Nama Customer</div>
              <div class="data">{{ data.nama }}</div>
            </div>
            <div class="detail-data">
              <div class="header-data">Nomor Telepon</div>
              <div class="data">{{ data.no_telp }}</div>
            </div>
            <div class="detail-data">
              <div class="header-data">Type Mobil</div>
              <div class="data">{{ data.type }}</div>
            </div>
            <div class="detail-data">
              <div class="header-data">Cash</div>
              <div class="data">{{ rupiah.format(data.cash_bayar) }}</div>
            </div>
            <div class="detail-data">
              <div class="header-data">Tanggal dibayar</div>
              <div class="data">{{ new Date(data.tanggal).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', }) }}</div>
            </div>
          </div>
          <RouterLink class="detail-icon" :to="{name: 'detail cash transaction', params: {kodeTransaksi: data.kode_cash}}">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="M9 18l6-6-6-6"/></svg>
          </RouterLink>
          <svg v-show="userInfo.status === 'Super Admin'" @click="removeTransaction(data.kode_cash)" class="delete-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#495057" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </li>
      </ul>
    </div>
  </section>
  <!-- <section>
    <div class="container-action">
      <div class="wrapper">
        <div class="label-page">Pembelian Cash</div>
        <RouterLink :to="{name: 'create cash transaction'}"><img class="add-icon" src="../../../../public/icons/add.png" alt=""></RouterLink>
      </div>
      <div class="input-group">
        <img class="search-icon" src="../../../../public/icons/search.png" alt="">
        <input type="text" placeholder="Ketik kata kunci untuk mencari">
      </div>
    </div>
    <ul>
      <li v-for="transaction in cash" :key="transaction.kode_cash">
        <div class="container-detail">
          <div>
            <div class="label">Nama Customer</div>
            <h4>{{ transaction.nama }}</h4>
          </div>
          <div>
            <div class="label">Nomor Telepon</div>
            <h4>{{ transaction.no_telp }}</h4>
          </div>
          <div>
            <div class="label">Type Mobil</div>
            <h4>{{ transaction.type }}</h4>
          </div>
          <div>
            <div class="label">Tanggal Bayar</div>
            <h4>{{ transaction.tanggal }}</h4>
          </div>
        </div>
        <RouterLink :to="{name: 'detail cash transaction', params: {kodeTransaksi: transaction.kode_cash}}">
          <img class="detail-chevron" src="../../../../public/icons/right-chevron.png" alt="detail">
        </RouterLink>
        <img @click="removeCustomer(transaction.kode_cash)" class="delete-icon" src="../../../../public/icons/close.png" alt="">
      </li>
        <li v-for="transaction in cash" :key="transaction.kode_cash">
        <div class="container-detail">
          <div>
            <div class="label">Nama Customer</div>
            <h4>{{ transaction.nama }}</h4>
          </div>
          <div>
            <div class="label">Nomor Telepon</div>
            <h4>{{ transaction.no_telp }}</h4>
          </div>
          <div>
            <div class="label">Type Mobil</div>
            <h4>{{ transaction.type }}</h4>
          </div>
          <div>
            <div class="label">Harga</div>
            <h4>{{ transaction.harga }}</h4>
          </div>
          <div>
            <div class="label">Cash Bayar</div>
            <h4>{{ transaction.cash_bayar }}</h4>
          </div>
        </div>
        <RouterLink :to="{name: 'detail customer', params: {nik: customer.nik}}">
          <img class="detail-chevron" src="../../../../public/icons/right-chevron.png" alt="detail">
        </RouterLink>
        <img @click="removeCustomer(customer.nik)" class="delete-icon" src="../../../../public/icons/close.png" alt="">
      </li> 
    </ul>
  </section> -->
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import userAuthStore from '@/stores/auth';
import { useRoute, useRouter } from "vue-router";

const store = userAuthStore();
const token = store.getToken();
const userInfo = store.getUserInfo();
const route = useRoute();
const router = useRouter();

const keyword = ref(null);
const cash = reactive([]);

// Format IDR
const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR'
});

async function removeTransaction(kodeCash) {
  try {
    console.log(kodeCash)
    const response = await axios({
      method: 'DELETE',
      url: `http://localhost:5000/api/cashes/${kodeCash}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    cash.forEach((item, index) => {
      if (item.kode_cash === kodeCash) {
        cash.splice(index, 1);
      }
    })

    console.log(response)
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  try {
    const { q } = route.query;

    if (!q || !q.trim()) {
      const response = await axios({
        baseURL: 'http://localhost:5000/api',
        method: 'GET',
        url: '/cashes/transactions',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = response.data.data;

      data.forEach(item => cash.push(item));
      return;
    }

    const response = await axios({
      baseURL: 'http://localhost:5000/api',
      method: 'GET',
      url: `/cashes?q=${q}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = response.data.data;

    data.forEach(item => cash.push(item));

    keyword.value = q;

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
  gap: 2rem;
}

/* Main Content */
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

/* List Item */
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
  min-height: 55px;
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
}
</style>