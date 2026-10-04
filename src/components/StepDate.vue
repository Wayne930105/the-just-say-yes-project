<script setup>
import { ref } from 'vue'

const emit = defineEmits(['select'])

// 以本地時間產生 YYYY-MM-DD（避免 toISOString 的 UTC 時差問題）
function todayString() {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

const minDate = todayString()
const date = ref('')

function submit() {
  if (!date.value || date.value < minDate) return
  emit('select', date.value)
}
</script>

<template>
  <section class="card">
    <div class="icon" aria-hidden="true">📅</div>
    <h1 class="title">什麼時候有空？</h1>
    <p class="subtitle">挑一天給我吧～</p>

    <label class="date-field">
      <span class="sr-only">選擇日期</span>
      <input v-model="date" type="date" :min="minDate" />
    </label>

    <button class="btn btn-primary" :disabled="!date" @click="submit">下一步 →</button>
  </section>
</template>

<style scoped>
.icon {
  font-size: 3.5rem;
  margin-bottom: 8px;
}

.date-field {
  display: block;
  margin-bottom: 28px;
}

.date-field input {
  width: 100%;
  max-width: 280px;
  padding: 14px 18px;
  font: inherit;
  font-size: 1.1rem;
  color: var(--text);
  background: var(--pink-50);
  border: 2px solid var(--pink-200);
  border-radius: 16px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.date-field input:focus {
  border-color: var(--pink-400);
  box-shadow: 0 0 0 4px rgba(255, 143, 177, 0.25);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
</style>
