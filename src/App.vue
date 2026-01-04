<script setup lang="ts">
import { ViTable } from 'vi-element-plus'

const columns = [
  {  label: 'ID', prop: 'id'},
  {  label: '姓名', prop: 'name'},
  {  label: '年龄', prop: 'age'},
]
const list = [
  { id: 1, name: '张三', age: 18 },
  { id: 2, name: '李四', age: 20 },
  { id: 3, name: '王五', age: 22 },
]
</script>

<template>
  <div>
    <ViTable :data="list" :columns="columns"></ViTable>
  </div>
</template>

<style scoped>

</style>
