<script setup lang="ts">
  import logo from '@/assets/logo.png'
  import { reactive, ref } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus';
  import { useUserStore } from '@/store/auth.ts'
  import { useRouter } from 'vue-router';
  
  interface RuleForm{
    username: string;
    password: string;
  }

  const ruleForm: RuleForm = reactive({
    username: '',
    password: ''
  })

  const rules = reactive<FormRules<RuleForm>>({
    username: [
      { required: true, message: '用户名不能为空', trigger: 'blur' },
      { min: 4, max: 8, message: '用户名长度必须在4到8位之间' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 8, max: 16, message: '密码长度必须在8到16位之间' },
      { pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[#$_&^@]).{8,16}$/, message: '密码必须包含字母、数字和特殊符号(#$_&^@)' }
    ]
  })

  const userStore = useUserStore()
  const router = useRouter()
  const formRef = ref<FormInstance>()
  const handleLogin = async () => {
    formRef.value?.validate(async (valid: boolean) => {
      if(valid){
        await userStore.login(ruleForm)
        router.push("/")
      }
    })
  }

</script>

<template>
  <div class="bg">
    <div class="login">
      <div class="logo">
        <img :src="logo" alt="" width="70px" height="70px" >
        <h1 class="ml">动力港能源管理平台</h1>
      </div>
      <el-form ref="formRef" :rules="rules" :model="ruleForm">
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            placeholder="请输入用户名" 
            prefix-icon="User"
            @keyup.enter="handleLogin"
            />
        </el-form-item>
        <el-form-item prop="password">
          <el-input 
            v-model="ruleForm.password"
            placeholder="请输入密码" 
            prefix-icon="Lock"
            type="password"
            @keyup.enter="handleLogin"
            />
        </el-form-item>
        <el-form-item>
          <el-button 
            type="primary"
            style="width: 100%;"
            @click="handleLogin"
            >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .bg {
    background-image: url('../assets/bg.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    .login{
      width: 500px;
      height: 300px;
      padding: 36px;
      box-shadow: 0 0 10px 10px #f4f4f4;
      text-align: center;
      position: absolute;
      top: 50%;
      margin-top: -200px;
      left: 10%;
      .logo {
        img{
          width: 45px;
          height: 45px;
        }
        margin-bottom: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        h1 {
          color: rgb(14, 53, 148);
        }
      }
    }
  }
</style>