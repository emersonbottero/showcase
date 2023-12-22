import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import{ useFetch} from "@vueuse/core"
import type { User } from '@/server'

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
  const mockCall = useFetch("/api/users", {immediate: false}).json<User[]>()
  const userId = ref(1)
  const charId = ref(1)
  const character = useFetch(computed(() => `https://rickandmortyapi.com/api/character/${charId.value}`),  { refetch: true}).json<Character>()
  const userIdURL = computed(() => `/api/users/${userId.value}`)
  const user = useFetch( computed(() => `/api/users/${userId.value}`),  { refetch: true  }).json<User>()

  return { character, apiCall, charId, mockCall,userId, user, userIdURL }
})
