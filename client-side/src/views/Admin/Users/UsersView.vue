<template>
  <section>
    <div class="container">
      <div class="container-top">
        <span class="header">User</span>
        <RouterLink class="add-icon-wrapper" :to="{name: 'create user'}">
          <svg class="add-icon" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </RouterLink>
        <form class="input-group">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#dadee0" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input name="q" class="input" type="text" placeholder="Ketik kata kunci untuk mencari" v-model="keyword">
        </form>
      </div>
      <ul class="list-item-container">
        <li class="list-item" v-for="user in users" :key="user.kode_user">
          <div class="container-detail-data">
            <div class="detail-data">
              <div class="header-data">Nama User</div>
              <div class="data">{{ user.nama }}</div>
            </div>
            <div class="detail-data">
              <div class="header-data">Nomor Telepon</div>
              <div class="data">{{ user.no_telp }}</div>
            </div>
            <div class="detail-data">
              <div class="header-data">Jenis Kelamin</div>
              <div class="data">{{ user.jenis_kelamin }}</div>
            </div>
            <div class="detail-data">
              <div class="header-data">Status User</div>
              <div class="data">{{ user.status }}</div>
            </div>
          </div>
          <RouterLink class="detail-icon" :to="{name: 'detail user', params: {kodeUser: user.kode_user}}">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="M9 18l6-6-6-6"/></svg>
          </RouterLink>
          <svg @click="openDeleteModal(user.kode_user)" class="delete-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#495057" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </li>
      </ul>
    </div>
    <Transition name="fade">
      <DeleteModalView 
        v-if="isOpenDeleteModal" 
        @click="openDeleteModal" 
        @delete="removeUser(deleteId)"
      ></DeleteModalView>
    </Transition>
  </section>
</template>

<script setup>
import DeleteModalView from '../../../components/DeleteModalView.vue';

import axios, { AxiosError } from "axios";
import { onMounted, reactive, ref } from "vue";
import userAuthStore from '@/stores/auth';
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import 'vue3-toastify/dist/index.css';

const store = userAuthStore();
const token = store.getToken();

const route = useRoute();
const router = useRouter();

const keyword = ref(null);
const users = reactive([]);

// Delete Algorithm
const deleteId = ref('')

const isOpenDeleteModal = ref(false);

function openDeleteModal(id) {
  isOpenDeleteModal.value = !isOpenDeleteModal.value;
  if (isOpenDeleteModal.value) {
    deleteId.value = id
  }
}

async function removeUser(kode) {
  try {
    const user = store.getUserInfo();

    if (kode === user.kode) {
      toast.warning('Cannot delete user log in');
      return;
    }
    
    const response = await axios({
      method: 'DELETE',
      url: `http://localhost:5000/api/users/${kode}`,
      headers: {
        authorization: `Bearer ${token}`,
      }
    })

    users.map((user, index) => user.kode_user === kode ? users.splice(index, 1) : null);
    toast.success('Berhasil menghapus data')
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

      } else if (err.response.data.error === "MISSING_PARAMS 'kodeUser'" || err.response.data.error === 'FAILED_TO_DELETE_DATA' || err.response.data.error === 'DATA_NOT_FOUND') {
        toast.error('Terjadi kesalahan, mohon untuk merefresh ulang halaman');

      } else if (err.response.data.error === 'CANNOT_DELETE_DATA, FOREIGN_KEY_CONSTRAINT') { 
        toast.warning('Data mengandung FOREIGN KEY, tidak dapat menghapus data')

      } else {
        toast.error('Network error');

      }
    } else {
      toast.error('Terjadi kesalahan pada server');

    }
  }
}
// End Delete Algorithm

onMounted(async () => {
  try {
    const { q } = route.query;

    if (!q || !q.trim()) {
      const response = await axios({
        baseURL: 'http://localhost:5000/api',
        method: 'GET',
        url: '/users',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
  
      const data = response.data.data;
      data.forEach(user => users.push(user));

      return;

    }

    const response = await axios({
      baseURL: 'http://localhost:5000/api',
      method: 'GET',
      url: `/users?q=${q}`,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  
    const data = response.data.data;
    data.forEach(user => users.push(user));

    keyword.value = q;
    if (!data.length) {
      setTimeout(() => {
        toast.error('Data tidak ditemukan');
      }, 0)
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

      } else if(err.response.data.error === 'DATABASE_CONNECTION_ERROR') {
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
        toast.error('Network error');

      }
    } else {
      toast.error('Terjadi kesalahan pada server');

    }
  }
});
</script>

<style scoped>
section{
  width: calc(100% - 250px);
  margin-left: 250px;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
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
}

</style>