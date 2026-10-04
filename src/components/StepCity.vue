<script setup>
import { ref } from 'vue'
import { cities } from '../data/itineraries.js'

const emit = defineEmits(['select'])

const selected = ref('')

function confirm() {
  if (selected.value) emit('select', selected.value)
}
</script>

<template>
  <section class="card">
    <h1 class="title">想去哪裡玩？</h1>
    <p class="subtitle">選一個縣市，剩下交給我 ✈️</p>

    <div class="option-grid">
      <button
        v-for="item in cities"
        :key="item.name"
        class="option"
        :class="{ active: selected === item.name }"
        :aria-pressed="selected === item.name"
        @click="selected = item.name"
      >
        <span class="option-emoji">{{ item.emoji }}</span>
        <span class="option-name">{{ item.name }}</span>
      </button>
    </div>

    <button class="btn btn-primary" :disabled="!selected" @click="confirm">下一步 →</button>
  </section>
</template>
