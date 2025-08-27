<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { typeListApi, submitApi } from '@/api/business'
import { ElMessage } from 'element-plus'
import Editor from '@tinymce/tinymce-vue'

interface ListType {
  type: string[],
  important: string[],
  publish: string[]
}

interface selectType {
  name: string,
  type: number
}

const typeList = ref<ListType>({type:[], important:[], publish:[]})

onMounted( async ()=>{
  try {
    const { data } = await typeListApi()
    typeList.value = data
  }catch (error: any) {
    ElMessage.error(error?.message)
    console.log(error)
  }
})

const currentIndex = ref<number[]>([-1, -1, -1])
const selectArry = ref<selectType[]>([])

const handleSelect = (index: number, num: number, name?: string) => {
  currentIndex.value[num] = index
  const ind = selectArry.value.findIndex((item: selectType) => item.type === num)
  
  if (index === -1) {
    selectArry.value = selectArry.value.filter((item: selectType) => item.type !== num)
  }else {
    if (ind === -1) {
      selectArry.value.push({name: name!, type: num})
    }else {
      selectArry.value[ind].name = name!
    }
  }
}

const handleClose = (type: number) => {
  selectArry.value = selectArry.value.filter((item: selectType) => item.type !== type)
  currentIndex.value[type] = -1
}

// 富文本编辑器

const isLoading = ref(true)

const editorContent = ref('')
const exportHTML = () => {
  const blob = new Blob([editorContent.value], {type: 'text/html'})
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `document_${selectArry.value.map((item: selectType) => item.name).join('--')}.html`
  link.click()
  URL.revokeObjectURL(link.href)
}

const submitForm = ref<any>({
  type: [],
  context: ''
})

const handleSubmit = async() => {
  submitForm.value.type = selectArry.value.map((item: selectType) => item.name)
  submitForm.value.context = editorContent.value
  try {
    const { data } = await submitApi(submitForm.value)
    ElMessage.success(data)
  }catch (error: any) {
    ElMessage.error(error?.message)
    console.log(error)
  }
}

</script>

<template>
  <div>
    <el-card>
      <div>
        <span class="title">文章类型：</span>
        <el-tag :type="currentIndex[0] === -1 ? 'primary' : 'info'" @click="handleSelect(-1, 0)">全部</el-tag>
        <el-tag :type="currentIndex[0] === index ? 'primary' : 'info'" class="ml" :key="index" v-for="(item, index) in typeList.type" @click="handleSelect(index, 0, item)">{{item}}</el-tag>
      </div>
      <div style="margin-top: 10px; margin-bottom: 10px;">
        <span class="title">重要程度：</span>
        <el-tag :type="currentIndex[1] === -1 ? 'primary' : 'info'" @click="handleSelect(-1, 1)">全部</el-tag>
        <el-tag :type="currentIndex[1] === index ? 'primary' : 'info'" class="ml" :key="index" v-for="(item, index) in typeList.important" @click="handleSelect(index, 1, item)">{{item}}</el-tag>

      </div>
      <div>
        <span class="title">发布渠道：</span>
        <el-tag :type="currentIndex[2] === -1 ? 'primary' : 'info'" @click="handleSelect(-1, 2)">全部</el-tag>
        <el-tag :type="currentIndex[2] === index ? 'primary' : 'info'" class="ml" :key="index" v-for="(item, index) in typeList.publish" @click="handleSelect(index, 2, item)">{{item}}</el-tag>

      </div>
      <el-divider />
      <div>
        <span class="title">已选：</span>
        <el-tag 
          type="success" 
          closable
          v-for="item in selectArry"
          :key="item.type"
          class="mr"
          @close="handleClose(item.type)"  
        >{{item.name}}</el-tag>
      </div>
    </el-card>
    <el-card class="mt">
      <el-button type="primary" @click="exportHTML" class="mr">导出编辑器内容到HTML文件</el-button>
      <el-button type="primary" @click="handleSubmit">提交文章至后台</el-button>
    </el-card>
    <el-card class="mt">
      <div 
        v-loading="isLoading" 
        element-loading-text="loading..." 
        style="min-height: 500px;"
        element-loading-background="rgba(255, 255, 255, 1)"  
      >
        <Editor 
          v-model="editorContent"
          api-key="z2n62rn9h73tkweu8efkjxeq10nve7kooqysub4khgklh0ex"
          :init="{
            language: 'zh-CN',
            plugins: 'lists link image table code help wordcount',
            height: 500,
          }"
          @init="isLoading = false" 
        />
      </div>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.title {
  display: inline-block;
  width: auto;
  font-size: 14px;
  color: #333;
  margin-right: 5px;
}

.el-tag:hover {
  cursor: pointer;
}

::v-deep .tox-promotion, ::v-deep .tox-statusbar__branding {
  display: none !important;
  visibility: hidden !important;
}

</style>