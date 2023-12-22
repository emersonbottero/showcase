<template>
  <div class="about">
    all: {{ counterStore.mockCall?.data }}
    <br />
    <br />
    <br />
    <br />
    <input v-model="counterStore.userId" type="number" />
    user:
    {{ counterStore.user.data }} <br />
    <!-- comment  await makeServer() in main.ts to see below code working -->
    <!-- <div v-if="counterStore.apiCall.isFetching">Loading...</div>
    <div v-else class="container">
      <div>
        <input v-model="counterStore.charId" type="number" />
        {{ counterStore.charId }}
        <br />
        <img :src="counterStore.character.data?.image" />
      </div>
      <div v-for="character in counterStore.apiCall.data?.results" :key="character.image">
        <img :src="character.image" /> <br />
        <span>{{ character.name }}</span> - {{ character.gender }} <br />
        <span> {{ character.species }}</span> - {{ character.status }} <br />
      </div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useCounterStore } from '../stores/counter'

const counterStore = useCounterStore()

onMounted(() => {
  counterStore.apiCall.execute()
  counterStore.mockCall.execute()
})
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
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
