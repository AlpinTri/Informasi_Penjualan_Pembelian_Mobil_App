<template>
  <main>
    <nav>
      <div class="nav-wrapper">
        <div>
          <img src="../../public/mobilesia_logo.png" alt="" class="logo-brand">
        </div>
        <div>
          <button class="login-button">Login</button>
        </div>
      </div>
    </nav>
    <section>
      <div>
        <div>
          <div>Temukan mobil impianmu di</div>
          <div>Mobilesia</div>
        </div>
        <div class="container">
          <form action="">
            <div>
              <div>
                <input type="text">
              </div>
              <button type="submit"></button>
            </div>
          </form>
        </div>
      </div>
      <div>
        
      </div>
    </section>
  </main>
</template>

<script setup>

</script>

<style scoped>
main{
  width: 100%;
  min-height: 100vh;
  position: relative;
}
nav{
  width: 100%;
  height: 70px;
  /* background-color: #82d114; */
  background-color: #fff;
  /* position: absolute; */
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
}
.nav-wrapper{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
}
.logo-brand{
  height: 30px;
}
.login-button{
  width: 120px;
  height: 35px;
  background-color: #2753d8;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-family: Roboto;
  font-size: 1rem;
}

</style>