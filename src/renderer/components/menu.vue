<template>
  <ul class="menu-list">
    <li class="menu-item" @click="handleToPage('/home')">首页</li>
    <li class="menu-item" @click="handleToPage('/tv')">电视剧</li>
    <li class="menu-item" @click="handleToPage('/movie')">电影</li>
  </ul>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleToPage = (page: string) => {
  router.push(page)
}
</script>

<style lang="less" scoped>
.menu-list {
  margin-top: -20px;

  .menu-item {
    color: #fff;
    margin-top: 10px;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    font-size: 16px;
    padding: 0 20px;

    &:hover {
      color: #fff;
    }
  }
}
</style>
