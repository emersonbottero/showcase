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

export const useCharsStore = defineStore('chars', () => {
  const apiCall = useFetch("https://rickandmortyapi.com/api/character").json<Data>()
  const characterCallById = (id: number) => useFetch(`https://rickandmortyapi.com/api/character/${id}`).json<Character>()

  return { characterCallById, apiCall }
})
