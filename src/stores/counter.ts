import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import{ useFetch} from "@vueuse/core"

interface Data {
  info: Object,
  results: Character[]
}

interface Character {
  name: string
  status: string
  species: string
  gender: string
  image: string
}

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const apiCall = useFetch("https://rickandmortyapi.com/api/character", {immediate: false}).json<Data>()
  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  return { count, doubleCount, increment, apiCall }
})
