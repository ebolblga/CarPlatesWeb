<script setup lang="ts">
useHead({ title: "База данных" });
const files = {
  "russianUTF-8.txt": "Все русские слова",
  "swears.txt": "Бранные слова",
  "ebeba.txt": "Смешные слова",
};
const file = ref("russianUTF-8.txt");

let words = ref([]);
async function Load() {
  const data: string = await $fetch("/Library/" + file.value);
  words.value = data
    .split("\n")
    .map((word) => (word.at(-1) == "\r" ? word.slice(0, -1) : word));
}
</script>

<template>
  <div class="content-center text-center pt-[5vh]">
    <select
      v-model="file"
      class="min-w-[220px] h-[40px] mb-5 text-center focus:outline-none rounded-lg border focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
    >
      <option v-for="(file, i) in files" :value="i">{{ file }}</option>
    </select>
    <br />
    <my-button @click="Load">Загрузить</my-button>
    <br />
    <span v-if="!words.length" class="text-green-300 pt-5"> Не загружено </span>
    <span v-else class="text-gray-600 text-xl">
      Всего записей: {{ words.length }}
    </span>
  </div>
</template>
