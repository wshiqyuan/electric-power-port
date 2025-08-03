import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state: () => ({
      token:null,
      roles:[],
      username:"",
      menu:[]
    }),
    actions:{
      
    }

})

export default useUserStore