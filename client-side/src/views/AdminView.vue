<template>
  <div>
    <NavigationAdminView />
    <main>
      <AsideAdminViewVue />
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import AsideAdminViewVue from '@/components/AsideAdminView.vue';
import NavigationAdminView from '@/components/NavigationAdminView.vue';
import { RouterView } from 'vue-router';
</script>

<style scoped>
main{
  display: flex;
}
</style>
