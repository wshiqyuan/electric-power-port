import { useUserStore } from "@/store/auth"
export default{
  beforeMount(el:any, binding:any) {
    const userStore = useUserStore()
    const { roles } = userStore
    const requiredRoles = binding.value
    if (!roles[0].includes(requiredRoles)) {
      el.style.display = 'none'  
    }
  }
}