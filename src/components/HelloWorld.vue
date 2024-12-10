<!-- <script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style> -->



<template>
  <div class="bg-[#034078] p-8 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-4 text-white">Bienvenue sur Digital Car</h2>
    <p class="text-lg text-white mb-4">
      Découvrez notre plateforme innovante pour améliorer la performance de votre équipe.
    </p>
    <button class="bg-[#1282A2] text-white px-4 py-2 rounded-md hover:bg-[#0A7F96]">
      Commencez maintenant
    </button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>
