<template>
  <section>
    <div class="container">
      <div class="container-top">
        <span class="header">Pembelian Kredit</span>
        <RouterLink class="add-icon-wrapper" :to="{name: 'create credit transaction'}">
          <svg class="add-icon" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </RouterLink>
        <form class="input-group">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#dadee0" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input name="q" class="input" type="text" placeholder="Ketik kata kunci untuk mencari" v-model="keyword">
        </form>
      </div>
      <ul class="list-item-container">
        <li class="list-item" v-for="credit in creditTransactions" :key="credit.kode_kredit">
          <div class="container-detail-data">
            <div class="detail-data">
              <div class="header-data">Nama Customer</div>
              <div class="data">{{ credit.nama }}</div>
            </div>
            <div class="detail-data">
              <div class="header-data">Nomor Telepon</div>
              <div class="data">{{ credit.no_telp }}</div>
            </div>
            <div class="detail-data">
              <div class="header-data">Type Mobil</div>
              <div class="data">{{ credit.type }}</div>
            </div>
            <div class="detail-data">
              <div class="header-data">Kode Paket Kredit</div>
              <div class="data">{{ credit.kode_paket_kredit }}</div>
            </div>
            <div class="detail-data">
              <div class="header-data">Tanggal dibayar</div>
              <div class="data">{{ new Date(credit.tanggal).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', }) }}</div>
            </div>
          </div>
          <RouterLink class="detail-icon" :to="{name: 'detail credit transaction', params: {kodeTransaksi: credit.kode_kredit}}">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="M9 18l6-6-6-6"/></svg>
          </RouterLink>
          <svg v-show="userInfo.status === 'Super Admin'" @click="removeTransaction(credit.kode_kredit)" class="delete-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#495057" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import userAuthStore from '@/stores/auth';

const store = userAuthStore();
const token = store.getToken();
const userInfo = store.getUserInfo();

const route = useRoute();
const router = useRouter();

const keyword = ref(null);
const creditTransactions = reactive([]);

onMounted(async () => {
  try {
    const { q } = route.query;

    if (!q || !q.trim()) {
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:5000/api/credits/transactions',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = response.data.data
      data.forEach(item => creditTransactions.push(item));

      return;

    }

    const response = await axios({
      baseURL: 'http://localhost:5000/api',
      method: 'GET',
      url: `/credits?q=${q}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = response.data.data
    data.forEach(item => creditTransactions.push(item));

    keyword.value = q;

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