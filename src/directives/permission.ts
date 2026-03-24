import { useUserStore } from "@/store/auth";

function hasInersection(arr1: Array<any>, arr2: Array<any>) {
  return arr1.some((item) => arr2.includes(item));
}

export default {
  beforeMount(el: any, binding: any) {
    const userStore = useUserStore();
    const { roles } = userStore;
    const requiredRoles = binding.value;
    if (!hasInersection(roles, requiredRoles)) {
      el.style.display = "none";
    }
  },
};
