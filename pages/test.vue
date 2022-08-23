<script setup lang="ts">
useHead({ title: "Тестирование" });
let isShown = ref(false);

// let img = new Image();
// function drawImg(){
//     img.src = '/TemplateRU.png';
//     img.font = "12px";
//     img.fillText("B639YH", 2, 2);
// }
</script>

<template>
  <div class="content-center text-center pt-[5vh]">
    <my-button @click="isShown = !isShown">Сгенерировать</my-button>
    <nuxt-img src="/TemplateRU.png" class="w-[156px] mx-auto pt-5" :class="{hidden: !isShown}" alt="Plate" />
  </div>
</template>