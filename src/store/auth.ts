import { defineStore } from "pinia";
import { loginApi } from "@/api/user";
import { ElNotification } from "element-plus";

interface LoginParams {
  username: string;
  password: string;
}

const useUserStore = defineStore("user", {
  state: () => ({
    token: sessionStorage.getItem("token") || "",
    roles: sessionStorage.getItem("roles")
      ? JSON.parse(sessionStorage.getItem("roles")!)
      : [],
    username: sessionStorage.getItem("username") || "",
    menu: sessionStorage.getItem("menu")
      ? JSON.parse(sessionStorage.getItem("menu")!)
      : [],
  }),
  actions: {
    async login(data: LoginParams) {
      try {
        const {
          code,
          data: {
            token,
            user: { username, roles },
            menulist,
          },
        } = await loginApi(data);
        if (code === 200) {
          this.token = token;
          this.roles = roles;
          this.menu = menulist;
          this.username = username;
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("roles", JSON.stringify(roles));
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("menu", JSON.stringify(menulist));
          ElNotification.success({
            title: "登录成功",
            message: "登录成功",
            duration: 1000,
            showClose: false,
          });
        } else {
          ElNotification.error({
            title: "登录失败",
          });
        }
      } catch (error) {
        ElNotification.error({
          title: "登录失败",
        });
      }
    },
    logout() {
      this.token = "";
      this.roles = [];
      this.menu = [];
      this.username = "";
      sessionStorage.clear();
    },
  },
});

export { useUserStore };
