import useApiFetch from '@/utils/useApiFetcher'
import { defineStore } from 'pinia'

type User = {
  name: string
}

export const useCounterStore = defineStore('counter', () => {  
  const mockCall = useApiFetch("/users").json<User[]>()
  const userById = (id: number) =>  useApiFetch("/users/:id".toURL({id})).json<User>()

  return { mockCall, userById}
})
