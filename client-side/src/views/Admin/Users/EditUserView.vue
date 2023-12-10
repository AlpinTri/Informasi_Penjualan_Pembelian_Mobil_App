<template>
  <section>
    <div class="container">
      <div class="container-top">
        <span class="domain"></span>
        <span class="slash">/</span>
        <span class="codomain">Edit</span>
      </div>
      <div class="container-bottom">
        <form class="form" action="#" @submit.prevent="createUser">
          <div class="main-container-form">
            <div class="container-form-top">
              <div class="input-group">
                <label for="" class="label">Nama</label>
                <input type="text" v-model="data.nama">
              </div>
              <div class="input-group">
                <label for="" class="label">Jenis Kelamin</label>
                <select name="" id="" v-model="data.jenisKelamin">
                  <option value="" selected disabled>Pilih jenis kelamin</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
            </div>
            <div class="container-form-bottom">
              <div class="input-group">
                <label for="" class="label">No Telp</label>
                <input type="text" v-model="data.telp">
              </div>
              <div class="input-group">
                <label for="" class="label">Status</label>
                <select name="" id="" v-model="data.status">
                  <option value="" selected disabled>Pilih status user</option>
                  <option value="Finance">Finance</option>
                  <option value="Sales">Sales</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>
            </div>
            <div class="input-group">
              <label for="" class="label">Password</label>
              <input type="text" v-model="data.password">
            </div>
          </div>
          <button class="submit-button" type="submit">Simpan</button>
        </form>
      </div>
    </div>
  </section>
</template>


<script setup>
import axios, { AxiosError } from "axios";
import userAuthStore from '@/stores/auth';
import { reactive } from "vue";

const store = userAuthStore();
const token = store.getToken();

const data = reactive({
  nama: '',
  jenisKelamin: '',
  telp: '',
  status: '',
  password: ''
});


async function createUser() {
  try {
    const response = await axios({
      method: 'POST',
      url: `http://localhost:5000/api/users`,
      data: {
        nama: data.nama,
        jenisKelamin: data.jenisKelamin,
        telp: data.telp,
        status: data.status,
        password: data.password
      },
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    console.log(response)
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err)
    } else {
      console.log(err)
    }
  }
}
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
.container-form-top, .container-form-bottom{
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
.container-form-top > .input-group, .container-form-bottom > .input-group{
  width: calc(100%/2);
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
.rp{
  padding-inline-end: 10px;
  padding-inline-start: 1rem;
  border-inline-end: 1px solid #000;
  position: absolute;
  
}
.money{
  position: relative;
  display: flex;
  align-items: center;
}
.money > input{
  padding-left: 55px;
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
}

</style>