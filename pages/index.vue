<script setup lang="ts">
import { Type } from '~~/composables/useGenOutput';
import { onMounted } from '#imports'

useHead({ title: "Генератор" });
const files = {
  "russianUTF-8.txt": "Все русские слова",
  "swears.txt": "Бранные слова",
  "ebeba.txt": "Смешные слова",
  "": "Свой файл"
};
const file = ref("russianUTF-8.txt");
const types = {
  "6": "Серия + номер (6 букв)",
  "3": "Только серия (3 буквы)",
  "": "С пробелами"
};
let canvas,ctx,img;
const {public:{base}} = useRuntimeConfig()

onMounted(async ()=>{
  const myFont = new FontFace('RoadNumbers', `url(${base}RoadNumbers2.0.ttf)`);
  const font = await myFont.load()
  document.fonts.add(font)
  canvas = document.createElement("canvas")
  Object.assign(canvas,{width:156,height:36})
  ctx = canvas.getContext("2d");
  //console.log(1,ctx)
  img = new Image()
  img.src = `${base}TemplateRU.png`;
})
function drawPlate(text="A000AA",region=177) {
  //console.log(2,ctx)
  ctx.drawImage(img,0,0)
  ctx.font = "38px RoadNumbers";
  ctx.fillText(text, 11, 30);
  ctx.font = "25px RoadNumbers";
  ctx.fillText(region, 120, 21);
  return canvas.toDataURL();
}

const type = ref<Type>("6");
const request = ref({
  data: [],
  loading: false,
  error: false,
});
const toPlate = (word: string) => {
  const Map = {
    а: "A",
    в: "B",
    е: "E",
    к: "K",
    м: "M",
    н: "H",
    о: "O",
    р: "P",
    с: "C",
    т: "T",
    х: "X",
    у: "Y",
  }
  const digitMap = {
    о: 0,
    з: 3,
    ч: 4,
    б: 6,
    д: 9
  }
  const toEng = word =>word.replace(/[авекмнорстух]/ig, letter => Map[letter])
  const toDigit = word => word.replace(/[озчбд]/ig, letter => digitMap[letter])
  const [_,a,b,c]= /(.)(...)(..)/.exec(word.toLowerCase())
  return toEng(a) + toDigit(b) + toEng(c)
}
const plates = computed(() => {
  return request.value.data.map(plate => {
    if (plate.length == 3) {
      const [_, a, b] = /(.)(..)/.exec(plate)
      plate = `${a}***${b}`
    }
    return toPlate(plate)
  });
})
const platesUrls = computed(()=>plates.value.map(plate=>drawPlate(plate)))
function Search() {
  if (file.value == "") {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".txt";
    input.click();
    input.onchange = (e) => {
      const file = input.files[0];
      request.value = useGenOutputFile(file, type.value);
    };
  } else {
    request.value = useGenOutput(file.value, type.value);
  }
}
let popupShown = ref(false);
</script>

<template>
  <div class="content-center text-center pt-[5vh]">
    <select v-model="file"
      class="min-w-[220px] h-[40px] mb-5 text-center focus:outline-none rounded-lg border focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700">
      <option value="" disabled>Выберете базу данных</option>
      <option v-for="(file, i) in files" :value="i">{{ file }}</option>
    </select><br />
    <select :value="type" v-model="type"
      class="min-w-[220px] h-[40px] mb-5 text-center focus:outline-none rounded-lg border focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700">
      <option value="" disabled>Выберете метод совпадения</option>
      <option v-for="(type, i) in types" :value="i" >{{ type }}</option>
    </select>
    <br />
    <my-button @click="Search" :class="{ 'border-red-500 focus:ring-red-400 shake': request.error }">Поиск</my-button>
    
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100" rel="stylesheet" />
    <span class="material-symbols-outlined icon w-0 cursor-help select-none" @click="popupShown=!popupShown">help</span>
    
    <div class="inline-block absolute z-10 w-64 ml-8 mt-[-40px] text-sm font-light rounded-lg border shadow-sm text-gray-400 border-gray-600 bg-gray-800" :class="{'hidden': !popupShown}">
    <div class="py-2 px-3 rounded-t-lg border-b border-gray-600 bg-gray-700">
        <h3 class="font-semibold text-white">Поиск слов на номерах машин</h3>
    </div>
    <div class="py-2 px-3">
        <p>1. Выберете базу данных для поиска</p>
        <p>2. Выберете метод совпадения</p>
        <p>3. Нажмите кнопку "Поиск"</p>
    </div>
     <div data-popper-arrow></div>
    </div>
    <br />
    <span v-if="request.loading" class="text-green-300 pt-5">
      Загрузка...
    </span>
    <span v-else>
      <span class="text-gray-600 text-xl">Всего найдено: {{ request.data.length }}</span>
      <br />
      <br />
      <div v-if="request.data.length > 0"
        class="mx-[10vw] sm:mx-[25vw] overflow-x-hidden relative rounded-lg">
        <table class="w-[86vw] sm:w-[50vw] text-gray-400">
          <thead class="text-xm bg-gray-700 text-gray-400">
            <tr>
              <th class="py-3 px-auto">№</th>
              <th class="py-3 px-auto">Слово</th>
              <th class="py-3 px-auto">Номер</th>
              <th class="py-3 px-auto">Изображение</th>
            </tr>
          </thead>
          <tbody v-for="(word, i) in request.data">
            <tr class="border-b border-gray-700" :class="{ 'bg-gray-800': i % 2, 'bg-gray-900': (i + 1) % 2 }">
              <td class="py-4 px-auto">{{ i + 1 }}</td>
              <td class="py-4 px-auto">{{ word }}</td>
              <td class="py-4 px-auto">{{ plates[i] }}</td>
              <td class="py-4 px-auto"><a class="flex justify-center" href="https://youtu.be/dQw4w9WgXcQ" target="_blank"><img :src="platesUrls[i]" :alt="plates[i]"/></a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </span>
  </div>
</template>

<style>
.entry {
  flex: 1 0 25%;
}

.icon {
  color: rgb(156 163 175);
}

br {
    -webkit-user-select: none;      
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>