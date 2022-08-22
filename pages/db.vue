<script setup>
useHead({ title: "База данных" })
const files = {
  "russianUTF-8.txt": "Все русские слова",
  "ebeba.txt": "Смешные слова",
  "swears.txt": "Бранные слова",
};
const file = ref("russianUTF-8.txt");

function Load() {
    request.value = useGenOutput(file.value, type.value);
};
</script>

<template>
  <div class="content-center text-center pt-[5vh]">
    <select
      v-model="file"
      class="min-w-[220px] h-[40px] mb-5 text-center focus:outline-none rounded-lg border focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
    >
      <option v-for="(file, i) in files" :value="i">{{ file }}</option></select
    ><br />
        <button
      type="button"
      @click="Load"
      class="h-[40px] px-5 mr-2 mb-2 focus:outline-none rounded-lg border focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
    >
      Загрузить</button
    ><br />
  </div>
</template>