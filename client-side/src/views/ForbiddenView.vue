<template>
  <section>
    <div class="container-error">
      <div class="not-found">403</div>
      <div class="server-error">Forbidden</div>
      <div class="page-not-found">You are not allowed to access this page</div>
    </div>
  </section>
</template>

<script setup>

</script>

<style scoped>
section{
  height: calc(100vh - 70px);
  display: flex;
}
.container-error{
  background-color: #f3f7fa;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.not-found{
  font-size: 50px;
  color: #2753d8;
  font-weight: bold;
}
.server-error{
  font-size: 30px;
  color: #2753d8;
  font-weight: 600;
}

.page-not-found{
  font-size: 18px;
  color: #2753d8;
}
</style>
