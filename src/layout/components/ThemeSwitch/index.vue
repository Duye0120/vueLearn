<script setup>
import { Switch as ASwitch } from 'ant-design-vue'
import { inject } from 'vue'

const isDarkMode = inject('isDarkMode')
const toggleTheme = inject('toggleTheme')
</script>

<template>
  <ASwitch :checked="isDarkMode" checked-children="🌙" un-checked-children="☀️" @change="toggleTheme" />
</template>
