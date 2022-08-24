<script setup lang="ts">
useHead({ title: "Тестирование" });
let isShown = ref(false);
const src = ref("")
async function draw() {
  var myFont = new FontFace('RoadNumbers', 'url(/RoadNumbers2.0.ttf)');
  const font = await myFont.load()
  document.fonts.add(font)
  //const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const canvas = document.createElement("canvas")
  canvas.width = 156
  canvas.height = 36
  const ctx = canvas.getContext("2d");
  const img = new Image()
  img.src = "/TemplateRU.png";
  await new Promise(resolve=>{
    img.onload = ()=> resolve(1)
  })
  ctx.drawImage(img,0,0)
  ctx.font = "32px RoadNumbers";
  ctx.fillText("B639YH", 2, 16);
  src.value = canvas.toDataURL()
}

</script>

<template>
  <div class="content-center text-center pt-[5vh]">
    <my-button @click="draw">Сгенерировать</my-button>
    <img
      :src="src"
      class="w-[156px] mx-auto pt-5"
      alt="Plate"
    />
    <canvas height="36" width="156" id="canvas">Обновите браузер</canvas>
  </div>
</template>