import useApiFetch from '@/utils/useApiFetcher'
import { defineStore } from 'pinia'

type User = {
  name: string
}

export const useUserStore = defineStore('counter', () => {  
  const GetUserApiCall = useApiFetch("/users").json<User[]>()
  const userById = (id: number) => useApiFetch(`/users/${id}`).json<User>()
  const userByAge =  (age: number) => useApiFetch(`/test?age=${age}`).json()

  return {  GetUserApiCall,userByAge, userById}
})
