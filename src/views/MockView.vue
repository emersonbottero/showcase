<template>
  <div class="about">
    <input
      type="number"
      @change="
        (e) => {
          userCall = userStore.userById(Number.parseInt((e.target as HTMLInputElement).value))
        }
      "
    />
    {{ userCall?.data || 'Select an Id.. ' }}
    <br />
    <div v-if="userStore.GetUserApiCall.isFetching">Loading...</div>
    <div v-else class="container">
      {{ userStore.GetUserApiCall.data }}
    </div>
    !! Uncomment server in main.ts

    <h3>Testing query params..</h3>
    <input
      type="number"
      @change="
        (e) => {
          ageCall = userStore.userByAge(Number.parseInt((e.target as HTMLInputElement).value))
        }
      "
    />
    {{ ageCall?.data }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/mock'
const userStore = useUserStore()
const userCall = ref()
const ageCall = ref()
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
