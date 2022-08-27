<script setup lang="ts">
useHead({ title: "База данных" });
const files = {
  "russianUTF-8.txt": "Все русские слова",
  "swears.txt": "Бранные слова",
  "ebeba.txt": "Смешные слова",
};
const file = ref("russianUTF-8.txt");

let words = ref([]);
const wordsLength = computed(() => words.value.length)
const pageSize = ref(15)
const {
  currentPage,
  currentPageSize,
  pageCount,
  isFirstPage,
  isLastPage,
  prev,
  next,
} = useOffsetPagination({
  total: wordsLength,
  page: 1,
  pageSize
})
async function Load() {
  const data: string = await $fetch("/Library/" + file.value);
  words.value = data
    .split("\n")
    .map((word) => (word.at(-1) == "\r" ? word.slice(0, -1) : word));
}

async function Download() {
  const a = document.createElement("a");
  a.download = file.value;
  a.href = "/Library/" + file.value;
  a.click();
}
</script>

<template>
  <div class="content-center text-center pt-[5vh]">
    <select v-model="file"
      class="min-w-[220px] h-[40px] mb-5 text-center focus:outline-none rounded-lg border focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700">
      <option v-for="(file, i) in files" :value="i">{{ file }}</option>
    </select>
    <br />
    <my-button @click="Load">Загрузить</my-button>
    <my-button @click="Download">Скачать</my-button>
    <br />
    <span v-if="!words.length" class="text-green-300 pt-5"> Не загружено </span>
    <span v-else class="text-gray-600 text-xl">
      Всего записей: {{ words.length }} ({{currentPage}}/{{pageCount}})
      <div v-for="i in currentPageSize">{{ words[currentPage * pageSize + i] }}</div>
      <div class="flex justify-center" >
        <div :class="{
          flex: 1,
          'justify-between': isFirstPage && isLastPage,
          'w-[300px]': 1,
          'justify-center': !(isFirstPage && isLastPage)
        }">
          <my-button @click="prev" v-if="!isFirstPage">предыдущая</my-button>
          <my-button @click="next" v-if="!isLastPage">следующая</my-button>
        </div>
      </div>
    </span>


  </div>
</template>