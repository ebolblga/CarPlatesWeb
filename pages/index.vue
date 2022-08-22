<script setup>
useHead({ title: "Генератор" });
const files = {
  "russianUTF-8.txt": "все русские слова",
  "ebeba.txt": "смешные слова",
  "swear.txt": "бранные слова",
  "": "свой файл"
}
const file = ref("russianUTF-8.txt")
const types = {
  "": "все буквы",
  "3": "3 буквенные",
  "6": "6 буквенные"
}
const type = ref("")
const request = ref({
  data: [],
  loading: false,
  error: false
})
function Search() {
  if (file.value == "") {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".txt"
    input.click()
    input.onchange = e => {
      const file = input.files[0]
      request.value = useGenOutputFile(file, type.value)
    }
  } else {
    request.value = useGenOutput(file.value, type.value);
  }

}
</script>

<template>
  <div class="content-center text-center pt-[10%]">
    <!-- <DropdownRadio /> -->
    <select v-model="file">
      <option v-for="file, i in files" :value="i">{{ file }}</option>
    </select><br />
    <select v-model="type">
      <option v-for="type, i in types" :value="i">{{ type }}</option>
    </select>
    <br />
    <button type="button" @click="Search"
      class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none rounded-lg border focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700">
      Поиск
    </button><br />
    <span v-if="request.loading">
      загрузка...
    </span>
    <span v-else>
      {{ request.error }} {{ request.data }}
    </span>
  </div>
</template>