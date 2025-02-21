<script setup>
import { debounce } from 'lodash'
import { onUnmounted, ref, watch } from 'vue'
import Typewriter from './components/type.vue'

const message = ref('这是使用Composition API (setup)编写的打字机组件示例。')
const inputValue = ref(message.value)
const typewriter = ref(null)

function restartTyping() {
  typewriter.value.startTyping(0, '') // 从头开始，不保留任何文本
}

function onTypingDone() {
  console.log('打字效果完成！')
}

const debouncedUpdateMessage = debounce((newVal) => {
  console.log('🚀 ~ debouncedUpdateMessage ~ value:', newVal)
  message.value = newVal
}, 300)

// 监听输入值变化
watch(inputValue, (newVal) => {
  debouncedUpdateMessage(newVal)
})

// 组件卸载时取消防抖
onUnmounted(() => {
  debouncedUpdateMessage.cancel()
})
</script>

<template>
  <div class="p-4">
    <Typewriter
      ref="typewriter" :text="message" :speed="40" text-class="text-lg text-blue-600"
      @typing-done="onTypingDone"
    />
    <a-input
      v-model:value="inputValue"
      placeholder="请输入文字..."
    />
    <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" @click="restartTyping">
      重新开始
    </button>
  </div>
</template>
