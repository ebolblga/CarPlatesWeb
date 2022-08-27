<script setup lang="ts">
import Navbar from "~/components/navbar.vue";
const {public:{base}} = useRuntimeConfig()
useHead({
  link:[{
    rel:"icon",
    href:`${base}favicon.ico`,
    type:"image/x-icon"
  }]
})
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
@font-face {
  font-family: 'RoadNumbers'; /*a name to be used later*/
  src: url('/RoadNumbers2.0.ttf'); /*URL to font*/
}
</style>