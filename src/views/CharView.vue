<template>
  <div class="about">
    <div v-if="apiCall.isFetching">Loading...</div>
    <div v-else>
      <div>
        <input
          type="number"
          @change="
            (e) =>
              (charCall = characterCallById(Number.parseInt((e.target as HTMLInputElement).value)))
          "
        />
        <br />
        <img v-if="charCall?.isFinished && charCall?.data" :src="charCall.data!.image" />
        <div v-else>Loading Id ...</div>
      </div>
      ----------------
      <div class="container">
        <div v-for="character in apiCall.data?.results" :key="character.image">
          <img :src="character.image" /> <br />
          <span>{{ character.name }}</span> - {{ character.gender }} <br />
          <span> {{ character.species }}</span> - {{ character.status }} <br />
        </div>
      </div>
      !! Comment server in main.ts
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useCharsStore } from '../stores/character'
const charCall = ref()
const { apiCall, characterCallById } = useCharsStore()
</script>

<style scoped>
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
