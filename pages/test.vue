<script setup>
useHead({ title: "Тестирование" });
let isShown = ref(false);

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.src = "/TemplateRU.png";
ctx.font = "12px Arial";
ctx.fillText("B639YH", 2, 2);
</script>

<template>
  <div class="content-center text-center pt-[5vh]">
    <my-button @click="isShown = !isShown">Сгенерировать</my-button>
    <nuxt-img
      src="/TemplateRU.png"
      class="w-[156px] mx-auto pt-5"
      :class="{ hidden: !isShown }"
      alt="Plate"
    />
    <canvas height="36" width="156" id="canvas">Обновите браузер</canvas>
  </div>
</template>