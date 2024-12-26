<template>
  <h1>Hello App!</h1>
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
  </nav>
  <main class="w-full h-full">
    <Layout />
  </main>
</template>

<script lang="ts" setup>
import Layout from './layout/index.vue'
</script>
