<template>
  <div class="modal-container">
    <div class="modal">
      <div class="modal-header"></div>
      <svg @click="closeModal" class="close-icon" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1" stroke-linecap="round" stroke-linejoin="arcs"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      <div class="modal-content">
        <div class="title">Masukkan kode kredit sebagai validasi</div>
        <div class="input-group">
          <label for="" class="label">Kode Kredit</label>
          <input type="text" v-model="kodeKredit">
        </div>
      </div>
      <div class="btn-group modal-footer">
        <button class="btn-modal modal-cancel" @click="closeModal">Batal</button>
        <button class="btn-modal modal-ok" @click="addCicilan">Tambah</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const kodeKredit = ref('');
const emit = defineEmits(['add', 'close']);

function addCicilan() {
  route.params.kodeTransaksi === kodeKredit.value ? emit('add', true, kodeKredit.value) : emit('add', false);
}

function closeModal() {
  emit('close');
}
</script>

<style scoped>
.modal-container{
  height: calc(100vh - 70px);
  width: calc(100% - 250px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  position: fixed;
}

.modal{
  width: 400px;
  height: 225px;
  box-shadow: 0 0 10px #e1e6e9;
  border-radius: 5px;
  padding: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-end;
  gap: 2rem;
  position: relative;
  background-color: #fff;
}
.title{
  font-size: 18px;
  font-weight: 600;
  color: #2753d8;
}

.btn-group{
  display: flex;
  gap: 1rem;
}

.btn-modal{
  padding-block: 8px;
  width: 115px;
  font-size: 15px;
  border: 1px solid #2753d8;
  border-radius: 5px;
}

.close-icon{
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 3px;
  border-radius: 5px;
  box-sizing: content-box;
}

.close-icon:hover{
  background-color: #f3f7fa;
}

.modal-ok{
  background-color: #2753d8;
  color: #fff;
}

.modal-cancel{
  color: #2753d8;
  background-color: rgba(39, 83, 216, .05)
}

.modal-content{
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

.input-group{
  display: flex;
  position: relative;
  width: 100%;
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
</style>