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
  const apiCall = useFetch("https://rickandmortyapi.com/api/character", {immediate: false}).json<Data>()
  const charId = ref(1)
  const character = useFetch(computed(() => `https://rickandmortyapi.com/api/character/${charId.value}`),  { refetch: true }).json<Character>()


  return { character, apiCall, charId }
})
