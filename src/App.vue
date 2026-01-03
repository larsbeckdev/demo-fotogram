<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppMain from '@/components/layout/AppMain.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <AppHeader class="app-header" />
  <AppMain class="app-main" />
  <AppFooter class="app-footer" />
</template>

<style scoped>
.app-header {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 50;
  height: 80px;
}

.app-main {
  min-height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.app-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  height: 200px;
}
</style>
