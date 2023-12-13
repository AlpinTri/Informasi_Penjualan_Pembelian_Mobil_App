<template>
  <div class="modal-container">
    <div class="modal">
      <div class="modal-header"></div>
      <svg class="close-icon" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1" stroke-linecap="round" stroke-linejoin="arcs"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      <div class="modal-content">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#2753d8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18v18H3zM15 9l-6 6m0-6l6 6"/></svg>
        <span class="modal-content-text">Hapus data?</span>
      </div>
      <div class="btn-group modal-footer">
        <button class="btn-modal modal-cancel">Batal</button>
        <button class="btn-modal modal-ok" @click="deleteData">Hapus</button>
      </div>
    </div>
  </div>
</template>

<script setup>

const emit = defineEmits(['delete']);

function deleteData() {
  emit('delete');
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
  width: 375px;
  height: 200px;
  box-shadow: 0 0 10px #e1e6e9;
  border-radius: 5px;
  padding: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-end;
  gap: 3rem;
  position: relative;
  background-color: #fff;
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
  display: flex;
  gap: .5rem;
  align-items: center;
  justify-content: center;
}

.modal-content-text{
  font-size: 20px;
  font-weight: 600;
  color: #2753d8;
}
</style>