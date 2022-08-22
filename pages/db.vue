<script setup>
useHead({ title: "База данных" })
let {data} = useApi("/Library/ebeba.txt",{server:false})
</script>

<template>
  <div>
    db.vue
  </div>
</template>