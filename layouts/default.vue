<script setup lang="ts">
import Navbar from "~/components/navbar.vue";
</script>

<template>
  <div class="h-screen">
    <Navbar />
    <slot />
  </div>
</template>

<style>
body {
  background: linear-gradient(90deg, #111827, #080b12, #111827);;
  color: #d6d6d6;
}
</style>