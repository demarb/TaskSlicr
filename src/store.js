import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'


//STORE - userStore
let userStore = (set) => ({
    user: {
        loggedIn: false,
        email: "",
        photoUrl: "",
    },
    task_algorithm: "FCFS",
    setUser: (user) => set((state) => ({ ...state, user })),
    clearUser: () =>
        set((state) => ({
            ...state,
            user: {
                loggedIn: false,
                email: "",
                photoUrl: "",
            },
        })),
    setTaskAlgorithm: (task_algorithm) => set((state) => ({ ...state, task_algorithm })),
})


userStore = devtools(userStore)
userStore = persist(userStore, { name: 'user_store' })
const useUserStore = create(userStore)


//STORE - taskStore
let taskStore = (set) => ({
    taskList: [],
    setTaskList: (taskList) => set((state) => ({ ...state, taskList }))
})

taskStore = devtools(taskStore)
taskStore = persist(taskStore, { name: 'task_store' })
const useTaskStore = create(taskStore)




export { useUserStore, useTaskStore };