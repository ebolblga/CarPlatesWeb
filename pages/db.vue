<script setup>
useHead({ title: "База данных" })
const {data,loading,error} = useGenOutput("ebeba.txt","6")


</script>

<template>
  {{loading}} {{error}} {{data}} 
  <div>
    db.vue
  </div>
</template>