<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { getItinerary } from '../data/itineraries.js'

const props = defineProps({
  date: { type: String, required: true },
  city: { type: String, required: true },
  food: { type: String, required: true },
})

const emit = defineEmits(['restart'])

// 進場先顯示「行程生成中...」增加儀式感
const LOADING_MS = 1800
const loading = ref(true)
let timer = null

onMounted(() => {
  timer = setTimeout(() => {
    loading.value = false
  }, LOADING_MS)
})

onBeforeUnmount(() => clearTimeout(timer))

// 'YYYY-MM-DD' 轉成「10月4日 星期六」，以本地時間解析
const formattedDate = computed(() => {
  if (!props.date) return ''
  const [y, m, d] = props.date.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('zh-TW', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })
})

const itinerary = computed(() => getItinerary(props.city, props.food))
</script>

<template>
  <Transition name="reveal" mode="out-in">
    <section v-if="loading" key="loading" class="card loading">
      <div class="spinner" aria-hidden="true">💗</div>
      <p class="loading-text">為你生成專屬約會計畫中<span class="dots" /></p>
    </section>

    <div v-else key="result" class="result">
      <!-- 上半部：行程票卷 -->
      <article class="ticket">
        <header class="ticket-head">
          <span class="ticket-label">DATE PASS</span>
          <span class="ticket-no">No. 520</span>
        </header>

        <dl class="ticket-info">
          <div>
            <dt>Date</dt>
            <dd>{{ formattedDate }}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{{ city }}</dd>
          </div>
          <div>
            <dt>Main Event</dt>
            <dd>{{ food }}</dd>
          </div>
        </dl>

        <div class="ticket-divider" aria-hidden="true" />

        <div class="ticket-plan">
          <h2>今日行程</h2>
          <p>{{ itinerary.plan }}</p>
          <p v-if="itinerary.restaurant" class="restaurant">
            <span aria-hidden="true">📍</span> 推薦餐廳：{{ itinerary.restaurant }}
          </p>
        </div>
      </article>

      <!-- 下半部：情書 -->
      <section class="letter">
        <div class="seal" aria-hidden="true">💌</div>

        <p class="salutation">給親愛的小老虎老婆 🐯：</p>
        <p>很開心妳沒有說不要 🥹</p>
        <p>
          期待在 <strong>{{ formattedDate }}</strong>，跟妳一起去<strong>{{ city }}</strong>吃
          <strong>{{ food }}</strong>！
        </p>
        <p>我會準時出現，也會好好準備的。</p>
        <p class="sign">—— 愛妳的親愛的老公 💕</p>

        <div class="hearts" aria-hidden="true">
          <span>💗</span><span>💖</span><span>💗</span>
        </div>

        <button class="btn btn-ghost" @click="emit('restart')">再看一次 ↺</button>
      </section>
    </div>
  </Transition>
</template>

<style scoped>
/* ---------- 載入動畫 ---------- */
.loading {
  padding: 56px 28px;
}

.spinner {
  font-size: 3.5rem;
  line-height: 1;
  animation: heartbeat 0.9s ease-in-out infinite;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  30% { transform: scale(1.25); }
  60% { transform: scale(0.95); }
}

.loading-text {
  margin: 20px 0 0;
  color: var(--text-soft);
  font-weight: 600;
}

.dots::after {
  content: '';
  display: inline-block;
  width: 1.5em;
  text-align: left;
  animation: dots 1.2s steps(4, end) infinite;
}

@keyframes dots {
  0% { content: ''; }
  25% { content: '.'; }
  50% { content: '..'; }
  75% { content: '...'; }
}

.reveal-enter-active,
.reveal-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.reveal-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.97);
}

.reveal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.result {
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

/* ---------- 票卷 ---------- */
.ticket {
  position: relative;
  background: #fff;
  border-radius: 20px;
  box-shadow: var(--shadow);
  overflow: hidden;
}

.ticket-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 22px;
  background: linear-gradient(90deg, var(--pink-500), var(--pink-400));
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.12em;
  font-size: 0.85rem;
}

.ticket-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin: 0;
  padding: 20px 22px 18px;
}

.ticket-info dt {
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-soft);
}

.ticket-info dd {
  margin: 4px 0 0;
  font-weight: 700;
  font-size: 0.95rem;
}

/* 票卷撕線與兩側半圓缺口 */
.ticket-divider {
  position: relative;
  border-top: 2px dashed var(--pink-200);
  margin: 0 18px;
}

.ticket-divider::before,
.ticket-divider::after {
  content: '';
  position: absolute;
  top: -13px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--pink-100);
}

.ticket-divider::before {
  left: -32px;
}

.ticket-divider::after {
  right: -32px;
}

.ticket-plan {
  padding: 18px 22px 24px;
  text-align: left;
}

.ticket-plan h2 {
  margin: 0 0 8px;
  font-size: 1rem;
  color: var(--pink-600);
}

.ticket-plan p {
  margin: 0;
  line-height: 1.8;
}

.ticket-plan .restaurant {
  margin-top: 14px;
  padding: 8px 14px;
  background: var(--pink-50);
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--pink-600);
}

/* ---------- 情書 ---------- */
.letter {
  position: relative;
  padding: 48px 32px 32px;
  background:
    repeating-linear-gradient(transparent 0 31px, rgba(255, 143, 177, 0.18) 31px 32px),
    #fffdfb;
  border: 2px solid var(--pink-200);
  border-radius: 20px;
  box-shadow: var(--shadow);
  text-align: left;
  line-height: 32px;
}

.seal {
  position: absolute;
  top: -28px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 3rem;
  line-height: 1;
  animation: pulse 1.8s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: translateX(-50%) scale(1); }
  50% { transform: translateX(-50%) scale(1.12); }
}

.letter p {
  margin: 0 0 4px;
}

.salutation {
  font-weight: 700;
  font-size: 1.15rem;
}

strong {
  color: var(--pink-600);
}

.sign {
  margin-top: 16px !important;
  text-align: right;
  color: var(--text-soft);
}

.hearts {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
  font-size: 1.5rem;
}

.hearts span {
  animation: float 2.4s ease-in-out infinite;
}

.hearts span:nth-child(2) {
  animation-delay: 0.3s;
}

.hearts span:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.letter .btn {
  display: block;
  margin: 0 auto;
}
</style>
