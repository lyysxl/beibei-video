<template>
  <div class="logo">
    <div class="tv_big_round">
      <div class="tv_small_round">
        <img class="img" src="~@/assets/logo.png" alt="logo" />
      </div>
    </div>
    <span class="logo_text">贝贝视频</span>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}
.tv_big_round {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #be123c;
}
.tv_small_round {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e11d48;
  border-radius: 50%;
  width: 25px;
  height: 25px;
}

.img {
  width: 20px;
  height: 20px;
}

.logo_text {
  color: #fff;
  font-size: 20px;
}
</style>
