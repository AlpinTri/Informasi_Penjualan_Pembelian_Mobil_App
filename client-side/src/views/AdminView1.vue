<template>
  <main>
    <Navigation />
    <section class="content">
      <nav class="nav-top">
      </nav>
      <div class="container">
        <RouterView />
      </div>
    </section>
  </main>
</template>

<script setup>
import Navigation from '@/components/Navigation.vue'
import { RouterView } from 'vue-router';
</script>

<style scoped>
main{
  display: flex;
  background-color: #fff;
}
.nav-top{
  height: 64px;
  width: 100%;
  background-color: #f8f9fa;
}
.content{
  width: calc(100% - 250px);
}
.container{
  width: 100%;
}
</style>