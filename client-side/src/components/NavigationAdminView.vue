<template>
  <nav>
    <div class="nav-brand">
      <img src="../../public/mobilesia_logo.png" alt="">
    </div>
    <div class="nav-logout">
      <button>Log Out</button>
    </div>
  </nav>
</template>

<script setup>

</script>

<style scoped>
nav{
  height: 70px;
  background-color: #f3f7fa;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
}
.nav-brand{
  width: 250px;
  display: flex;
  justify-content: center;
}
.nav-brand > img{
  width: 200px;
}
.nav-logout{
  margin-right: 25px;
}
.nav-logout > button{
  padding: 10px 30px 10px 30px;
  background-color: #2753d8;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
}
</style>