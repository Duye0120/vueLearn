<template>
  <a-switch :checked="isDarkMode" checked-children="🌙" un-checked-children="☀️" @change="toggleTheme" />
</template>

<script setup>
import { inject } from 'vue';
import { Switch as ASwitch } from 'ant-design-vue';

const isDarkMode = inject('isDarkMode');
const toggleTheme = inject('toggleTheme');
</script>
