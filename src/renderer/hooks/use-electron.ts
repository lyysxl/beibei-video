import { ref } from 'vue'

export const useElectron = () => {
  const isElectron = ref(!!process.env.IS_ELECTRON!)
  return { isElectron }
}
