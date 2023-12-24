import { defineStore } from 'pinia'
import{ useFetch} from "@vueuse/core"
import type { User } from '@/server'

export const useCounterStore = defineStore('counter', () => {  
  
 const mockCall = useFetch("/api/users").json<User[]>()
 const userById = (id: number | undefined) =>  useFetch(`/api/users/${id}`).json<User>()

  return { mockCall, userById}
})
