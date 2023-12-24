<template>
  <div class="about">
    <input
      type="number"
      @change="
        (e) => {
          userCall = counterStore.userById(Number.parseInt((e.target as HTMLInputElement).value))
        }
      "
    />
    {{ userCall?.data }}
    <br />
    <div v-if="counterStore.mockCall.isFetching">Loading...</div>
    <div v-else class="container">
      {{ counterStore.mockCall.data }}
    </div>
    !! Uncomment server in main.ts
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useCounterStore } from '../stores/mock'
const counterStore = useCounterStore()
const userCall = ref()
</script>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    align-items: center;
  }
}

.container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.container img {
  width: 200px;
}
</style>
../stores/mock
