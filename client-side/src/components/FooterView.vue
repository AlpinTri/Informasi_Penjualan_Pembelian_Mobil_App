<template>
  <footer class="mt-2-5">
    <div id="wrapper-footer-content" class="m-inline-2-5">
      <div class="d-flex-row gap-5 align-items-start justify-content-between p-block-1 border-top-bottom flex-wrap">
        <div class="d-flex-column gap-1">
          <div class="d-flex-column gap-0-5">
            <img class="brand-image" src="../../public/mobilesia_logo.png" alt="">
            <div>PT Mobilesia Indonesia</div>  
          </div>
          <div class="d-flex-column">
            <div>Telp:</div>
            <div>0898-XXXX-XXXX</div>           
          </div>
          <div class="d-flex-column">
            <div>Call Center:</div>
            <div>0898-XXXX-XXXX</div>           
          </div>
        </div>
        <div class="d-flex-column gap-1-5">
          <h3 class="color-blue">Menu</h3>
          <div class="d-flex-column gap-1-5">
            <div class="link">Home</div>
            <div class="link">Exploration</div>
            <div class="link">Search</div>
          </div>
        </div>
        <div class="d-flex-column gap-1-5">
          <h3 class="color-blue">Tools</h3>
          <div class="d-flex-column gap-1-5">
            <div class="link">Bantuan</div>
            <div class="link">Konsultasi Pembelian</div>
          </div>
        </div>
        <div class="d-flex-column gap-0-5 flex-wrap">
          <h1 class="head">FOLLOW US</h1>
          <div class="d-flex-row gap-0-5">
            <a href="" class="p-0-5 link-social">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="" class="p-0-5 link-social">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="" class="p-0-5 link-social">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
            </a>
            <a href="" class="p-0-5 link-social">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div class="p-block-1 d-flex-row justify-content-center">&copy; 2023 PT Mobilesia Indonesia - Alpin Tri Pranjadata</div>
    </div>
  </footer>
</template>

<script setup>

</script>

<style scoped>
.border-top-bottom{
  border-block: 2px solid rgba(243, 247, 250, 1);
}

.brand-image{
  height: 30px;
}

.link-social{
  background-color: #2753d8;
  border-radius: 999px;
  box-sizing: content-box;
  padding: 0;
  font-size: 0;
}
.link-social > svg{
  box-sizing: content-box;
}

.head{
  font-weight: 900;
  font-size: 20px;
  color: #2753d8;
}

.link{
  color: #2753d8;
}
.link:hover{
  color: #2753d8;
  font-weight: 600;
  cursor: pointer;
}


.color-blue{
  color: #2753d8;
}


/* Flex Wrap */
.flex-wrap{
  flex-wrap: wrap;
}

/* Display */
.d-flex-row{
  display: flex;
  align-items: center;
}
.d-flex-column{
  display: flex;
  flex-direction: column;
}

/* Align Items */
.align-items-start{
  align-items: flex-start;
}


/* Justify Content */
.justify-content-center{
  justify-content: center;
}
.justify-content-between{
  justify-content: space-between;
}

/* Gap */
.gap-0-5{
  gap: .5rem;
}
.gap-1{
  gap: 1rem;
}
.gap-1-5{
  gap: 1.5rem;
}
.gap-5{
  gap: 5rem;
}


.m-inline-2-5{
  margin-inline: 2.5rem;
}
/* Padding */
.p-0-5{
  padding: .5rem;
}

.p-block-1{
  padding-block: 1rem;
}
</style>