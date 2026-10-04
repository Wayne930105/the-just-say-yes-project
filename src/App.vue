<script setup>
import { ref } from 'vue'
import StepInvite from './components/StepInvite.vue'
import StepDate from './components/StepDate.vue'
import StepCity from './components/StepCity.vue'
import StepFood from './components/StepFood.vue'
import StepLetter from './components/StepLetter.vue'

// 全域狀態
const currentStep = ref(1)
const selectedDate = ref('')
const selectedCity = ref('')
const selectedFood = ref('')

function nextStep() {
  currentStep.value++
}

function onDateSelected(date) {
  selectedDate.value = date
  nextStep()
}

function onCitySelected(city) {
  selectedCity.value = city
  nextStep()
}

function onFoodSelected(food) {
  selectedFood.value = food
  nextStep()
}

function reset() {
  selectedDate.value = ''
  selectedCity.value = ''
  selectedFood.value = ''
  currentStep.value = 1
}
</script>

<template>
  <main class="app">
    <Transition name="fade-slide" mode="out-in">
      <StepInvite v-if="currentStep === 1" key="invite" @accept="nextStep" />
      <StepDate v-else-if="currentStep === 2" key="date" @select="onDateSelected" />
      <StepCity v-else-if="currentStep === 3" key="city" @select="onCitySelected" />
      <StepFood v-else-if="currentStep === 4" key="food" @select="onFoodSelected" />
      <StepLetter
        v-else
        key="letter"
        :date="selectedDate"
        :city="selectedCity"
        :food="selectedFood"
        @restart="reset"
      />
    </Transition>
  </main>
</template>

<style>
.app {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(40px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}
</style>
