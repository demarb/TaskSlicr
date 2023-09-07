import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'


//STORE - userStore
let userStore = (set) => ({
    user: {
        loggedIn: false,
        email: "",
        profileUrl: "",
    },
    userSetting: {
        task_algorithm: ""
    },
    // addPerson: (person) => set((state) => ({ people: [...state.people, person] }))
})
userStore = devtools(userStore)
userStore = persist(userStore, { name: 'user_store' })

const useUserStore = create(userStore)
export default useUserStore;