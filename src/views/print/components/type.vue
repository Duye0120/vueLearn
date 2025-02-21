<script setup>
import { defineEmits, defineProps, onMounted, ref, watch } from 'vue'

const props = defineProps({
  // 要显示的文本
  text: {
    type: String,
    required: true,
  },
  // 打字速度(毫秒)
  speed: {
    type: Number,
    default: 50,
  },
  // 自动开始
  autoStart: {
    type: Boolean,
    default: true,
  },
  // 文本样式类
  textClass: {
    type: String,
    default: 'font-mono text-gray-800',
  },
})

const emit = defineEmits(['typingDone'])

const displayText = ref('')
const isTyping = ref(false)
const previousText = ref('')

// 查找两个字符串的最长公共前缀
function findCommonPrefix(str1, str2) {
  let i = 0
  const minLen = Math.min(str1.length, str2.length)
  while (i < minLen && str1[i] === str2[i]) {
    i++
  }
  return str1.substring(0, i)
}

// 开始打字效果
function startTyping(startIndex = 0, initialText = '') {
  isTyping.value = true
  displayText.value = initialText
  typeNextChar(startIndex)
}

// 逐字打印
function typeNextChar(index) {
  if (index >= props.text.length) {
    isTyping.value = false
    emit('typingDone')
    return
  }

  displayText.value += props.text.charAt(index)

  setTimeout(() => {
    typeNextChar(index + 1)
  }, props.speed)
}

// 智能更新文本
function smartUpdateText(newText) {
  // 如果新文本比当前显示的文本短，直接更新
  if (newText.length < displayText.value.length) {
    displayText.value = newText
    previousText.value = newText
    return
  }

  // 找到共同前缀
  const commonPrefix = findCommonPrefix(newText, displayText.value)

  // 如果有新增的文本，从共同前缀后开始打字效果
  if (commonPrefix.length < newText.length) {
    isTyping.value = true
    startTyping(commonPrefix.length, commonPrefix)
  }

  previousText.value = newText
}

// 监听文本变化
watch(() => props.text, (newVal) => {
  if (!previousText.value) {
    // 首次加载
    if (props.autoStart) {
      startTyping()
    }
  }
  else {
    // 文本更新时
    smartUpdateText(newVal)
  }
})

onMounted(() => {
  previousText.value = props.text
  if (props.autoStart) {
    startTyping()
  }
})

// 暴露方法给父组件
defineExpose({
  startTyping,
})
</script>

<template>
  <div class="typewriter-container">
    <p :class="textClass">
      {{ displayText }}<span v-if="isTyping" class="typing-cursor" />
    </p>
  </div>
</template>

<style scoped>
  .typing-cursor {
    @apply inline-block w-2 h-4 bg-black ml-0.5;
    animation: blink 0.7s infinite;
  }

  @keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
  }
</style>
