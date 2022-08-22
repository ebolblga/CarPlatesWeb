<script setup>
useHead({ title: "Генератор" });

function Search() {
  let { data, loading, error } = useGenOutput("ebeba.txt", "6");
}
</script>

<template>
  <div class="content-center text-center pt-[10%]">
    <DropdownRadio />
    <button
      type="button"
      @click="Search"
      class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none rounded-lg border focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
    >
      Поиск
    </button>
    {{ loading }} {{ error }} {{ data }}
  </div>
</template>