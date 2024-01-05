<template>
  <div class="layout-main">
    <div class="layout-header">
      <Logo />
    </div>
    <div class="layout-silder">
      <Menu />
      <div class="copying">&copy;版权归懒羊羊睡醒了</div>
    </div>
    <div class="layout-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Logo from '@/components/logo.vue'
import Menu from '@/components/menu.vue'
</script>

<style lang="less" scoped>
.layout-main {
  position: fixed;
  inset: 0;
  background-color: #141414;
}
.layout-header {
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #141414;
  -webkit-app-region: drag;
  padding: 0 16px;
  opacity: 0.8;
}
.layout-silder {
  position: absolute;
  top: 60px;
  left: 0;
  bottom: 0;
  background-color: #141414;
  width: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 0.8;
}
.layout-content {
  position: absolute;
  top: 60px;
  left: 160px;
  right: 0;
  bottom: 0;
  background-color: #141414;
  // overflow: auto;
}

.copying {
  color: #fff;
}
</style>
