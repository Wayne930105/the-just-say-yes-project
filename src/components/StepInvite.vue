<script setup>
import { ref, reactive } from 'vue'

const emit = defineEmits(['accept'])

const playground = ref(null)
const noButton = ref(null)

// 拒絕按鈕的座標（相對於 playground 容器）
const noPos = reactive({ top: 0, left: 0 })
const hasEscaped = ref(false)
const escapeCount = ref(0)

const noLabels = ['No', '確定？', '再想想嘛', '真的嗎 🥺', '抓不到 😝', '按好哦啦']
const noLabel = ref(noLabels[0])

// 計算新的隨機座標：限制在容器範圍內，並與目前位置保持足夠距離
function runAway() {
  const area = playground.value
  const btn = noButton.value
  if (!area || !btn) return

  const maxLeft = Math.max(area.clientWidth - btn.offsetWidth, 0)
  const maxTop = Math.max(area.clientHeight - btn.offsetHeight, 0)
  const minDistance = Math.max(btn.offsetWidth, btn.offsetHeight)

  const current = hasEscaped.value
    ? { top: noPos.top, left: noPos.left }
    : { top: btn.offsetTop, left: btn.offsetLeft }

  let top = 0
  let left = 0
  for (let i = 0; i < 10; i++) {
    top = Math.random() * maxTop
    left = Math.random() * maxLeft
    if (Math.hypot(top - current.top, left - current.left) > minDistance) break
  }

  noPos.top = top
  noPos.left = left
  hasEscaped.value = true
  escapeCount.value++
  noLabel.value = noLabels[escapeCount.value % noLabels.length]
}

// 行動裝置：阻止 touch 觸發 click，直接逃跑
function onTouch(e) {
  e.preventDefault()
  runAway()
}
</script>

<template>
  <section class="card invite">
    <p class="greeting">嗨～親愛的小老虎老婆 🐯</p>
    <div class="hero" aria-hidden="true">🥺</div>
    <h1 class="title">要不要跟我去約會？</h1>
    <p class="subtitle">認真問的喔！</p>

    <div ref="playground" class="playground">
      <button
        class="btn btn-primary yes"
        :style="{ transform: `translateX(-50%) scale(${1 + Math.min(escapeCount, 6) * 0.08})` }"
        @click="emit('accept')"
      >
        好哦 💕
      </button>

      <button
        ref="noButton"
        class="btn btn-ghost no"
        :class="{ escaped: hasEscaped }"
        :style="hasEscaped ? { top: `${noPos.top}px`, left: `${noPos.left}px` } : null"
        @mouseenter="runAway"
        @touchstart="onTouch"
        @click.prevent="runAway"
      >
        {{ noLabel }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.greeting {
  margin: 0;
  color: var(--text-soft);
  font-size: 1.1rem;
}

.hero {
  font-size: 5rem;
  line-height: 1;
  margin: 12px 0 16px;
  animation: bounce 1.6s ease-in-out infinite;
}

/* 想換成 GIF 的話：<img class="hero" src="/your.gif" alt="" /> */

@keyframes bounce {
  0%, 100% { transform: translateY(0) rotate(-4deg); }
  50% { transform: translateY(-10px) rotate(4deg); }
}

.playground {
  position: relative;
  height: 200px;
  margin-top: 8px;
}

.yes {
  position: absolute;
  top: 16px;
  left: 50%;
  transform-origin: center;
  z-index: 1;
}

.no {
  position: absolute;
  top: 84px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  z-index: 2;
  transition: top 0.3s ease, left 0.3s ease;
}

.no.escaped {
  transform: none;
}
</style>
