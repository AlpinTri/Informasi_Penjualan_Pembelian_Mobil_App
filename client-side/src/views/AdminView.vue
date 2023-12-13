<template>
  <div>
    <NavigationAdminView />
    <main>
      <AsideAdminViewVue />
      <RouterView 
      @successCreate="() => stateSucces = true" 
      @failedUpdate="() => stateFailed = true"
      @successUpdate="() => stateSuccesUpdate = true"
      />
    </main>
  </div>
</template>

<script setup>
import AsideAdminViewVue from '@/components/AsideAdminView.vue';
import NavigationAdminView from '@/components/NavigationAdminView.vue';
import { RouterView } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const stateSucces = ref(false);
const stateFailed = ref(false);
const stateSuccesUpdate = ref(false);

watch(stateSucces, () => {
  setTimeout(() => {
    if (stateSucces.value) {
      toast.success('Berhasil membuat data', {
        autoClose: 2000
      });
      stateSucces.value = false;
    }
  }, 0);
}); 

watch(stateSuccesUpdate, () => {
  setTimeout(() => {
    if (stateSuccesUpdate.value) {
      toast.success('Berhasil mengupdate data', {
        autoClose: 2000
      });
      stateSuccesUpdate.value = false;
    }
  }, 0);
}); 

watch(stateFailed, () => {
  setTimeout(() => {
    if (stateFailed.value) {
      toast.error('Gagal mengupdate data', {
        autoClose: 2000
      });
      stateFailed.value = false;
    }
  }, 0);
});

</script>

<style scoped>
main{
  display: flex;
}
div{
  display: flex;
  flex-direction: column;
  /* position: relative; */
}
</style>
