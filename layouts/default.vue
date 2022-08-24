<script setup lang="ts">
import Navbar from "~/components/navbar.vue";
</script>

<template>
  <head>
    <link rel="icon" href="https://ebolblga.github.io/CarPlatesWeb/favicon.ico"/>
  </head>
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
@font-face {
  font-family: 'RoadNumbers'; /*a name to be used later*/
  src: url('/RoadNumbers2.0.ttf'); /*URL to font*/
}
</style>