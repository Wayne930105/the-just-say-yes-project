<script setup>
import { ref } from 'vue'
import { foods } from '../data/itineraries.js'

const emit = defineEmits(['select'])

const selected = ref('')

function confirm() {
  if (selected.value) emit('select', selected.value)
}
</script>

<template>
  <section class="card">
    <h1 class="title">想吃點什麼？</h1>
    <p class="subtitle">選一個你最想吃的 😋</p>

    <div class="option-grid">
      <button
        v-for="item in foods"
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

    <button class="btn btn-primary" :disabled="!selected" @click="confirm">就決定是你了！</button>
  </section>
</template>
