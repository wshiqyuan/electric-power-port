<script lang="ts" setup>
import { ref, defineEmits } from 'vue'

const currentStep = ref<number>(0)
const props = defineProps(["submitLoading","steps","FormRef1","FormRef2","FormRef3"])

const emit = defineEmits(['submit'])

const nextStep =  () => {
  const forms = [props.FormRef1, props.FormRef2, props.FormRef3]
  const currentForm = forms[currentStep.value]
  currentForm.validate((valid: boolean) => {
    if (valid) {
      if (currentStep.value < props.steps.length - 1) {
        currentStep.value++
      }else{
        emit('submit')
        currentStep.value = 0
      }
    }
  })
}



</script>

<template>
  <div style="max-width: 650px;">
    <div>
      <el-steps :active="currentStep" finish-status="success" align-center>
        <el-step v-for="(step,index) in steps" :key="index" :title="step.title" />
      </el-steps>
    </div>
    <div v-if="currentStep === 0" class="mt">
      <slot name="step-1"></slot>
    </div>
    <div v-if="currentStep === 1" class="mt">
      <slot name="step-2"></slot>
    </div>
    <div v-if="currentStep === 2" class="mt">
      <slot name="step-3"></slot>
    </div>
    <div class="step-buttons mt">
      <el-button v-if="currentStep > 0" @click="currentStep--">上一步</el-button>
      <el-button :loading="submitLoading" @click="nextStep" type="primary">
        {{ currentStep === steps.length - 1 ? '提交' : '下一步' }}
      </el-button>
    </div>
  </div>
</template>

<style lang="less" scoped>


</style>