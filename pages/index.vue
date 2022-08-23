<script setup>
useHead({ title: "Генератор" });
const files = {
  "russianUTF-8.txt": "Все русские слова",
  "swears.txt": "Бранные слова",
  "ebeba.txt": "Смешные слова",
  "": "Свой файл"
};
const file = ref("russianUTF-8.txt");
const types = {
  6: "Серия + номер (6 букв)",
  3: "Только серия (3 буквы)",
  "": "С пробелами"
};
const type = ref(6);
const request = ref({
  data: [],
  loading: false,
  error: false,
});
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
</script>

<template>
  <div class="content-center text-center pt-[5vh]">
    <select
      v-model="file"
      class="min-w-[220px] h-[40px] mb-5 text-center focus:outline-none rounded-lg border focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
    >
      <option v-for="(file, i) in files" :value="i">{{ file }}</option></select
    ><br />
    <select
      v-model="type"
      class="min-w-[220px] h-[40px] mb-5 text-center focus:outline-none rounded-lg border focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
    >
      <option v-for="(type, i) in types" :value="i">{{ type }}</option>
    </select>
    <br />
    <my-button @click="Search" :class="{'border-red-500 focus:ring-red-400' : request.error}">Поиск</my-button>
    <br />
    <span v-if="request.loading" class="text-green-300 pt-5">
      Загрузка...
    </span>
    <span v-else>
      <span v-if="request.data.length > 0" class="text-gray-600 text-xl">Всего найдено: {{request.data.length}}</span>
      <div v-if="request.data.length > 0" class="mx-[10vw] sm:mx-[25vw] overflow-x-hidden relative shadow-md rounded-lg">
        <table class="w-[80vw] sm:w-[50vw] text-gray-400">
          <thead class="text-xm bg-gray-700 text-gray-400">
            <tr>
              <th class="py-3 px-auto">№</th>
              <th class="py-3 px-auto">Слово</th>
              <th class="py-3 px-auto">Номер</th>
              <th class="py-3 px-auto">Изображение</th>
            </tr>
          </thead>
          <tbody v-for="(word, i) in request.data">
            <tr class="border-b border-gray-700" :class="{ 'bg-gray-800': i % 2, 'bg-gray-900': (i + 1) % 2}">
              <td class="py-4 px-auto">{{ i + 1 }}</td>
              <td class="py-4 px-auto">{{ word }}</td>
              <td class="py-4 px-auto"></td>
              <td class="py-4 px-auto"></td>
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
</style>