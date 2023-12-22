<template>
  <div class="about">
    <div v-if="counterStore.apiCall.isFetching">Loading...</div>
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useCounterStore } from '../stores/counter'

const counterStore = useCounterStore()

onMounted(() => {
  counterStore.apiCall.execute()
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
