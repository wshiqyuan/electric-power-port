<script lang="ts">
  import { defineComponent } from 'vue'
  import type { MenuItem as MenuItemType } from '@/types/user'
  import type { PropType } from 'vue'
  import { useTabsStore } from '@/store/tabs'

  export default defineComponent({
    name: "MyMenu",
    props: {
      item: {
        type: Object as PropType<MenuItemType>,
        required: true
      }
    },
    setup() {
      const tabsStore = useTabsStore()
      const { addTab, setCurrentTab } = tabsStore
      const add = (name: string, url: string, icon:string) => {
        addTab(name, url, icon)
        setCurrentTab(name, url)
      }
      return{
        add
      }
    }
  })
</script>

<template>
  <el-sub-menu v-if="item.children" :index="item.url">
    <template #title>
      <el-icon>
        <component :is="item.icon" />
      </el-icon>
      <span>{{ item.name }}</span>
    </template>
    <my-menu
      v-for="child in item.children"
      :item="child"
      :key="child.url"
    ></my-menu>
  </el-sub-menu>
  <el-menu-item 
    v-else 
    :index="item.url" 
    @click="add(item.name, item.url, item.icon)" 
    v-show="!(item.name === '订单详情')"
  >
    <el-icon>
      <component :is="item.icon" />
    </el-icon>
    <span>{{ item.name }}</span>
  </el-menu-item>
</template>

<style lang="less" scoped>
.is-active{
  background-color: rgb(43,137,211);
  color: #fff !important;
  div{
    span{
      color: #fff;
    }
    .el-icon{
      color: #fff !important;
    }
  }
}

::v-deep .el-sub-menu__title:hover{
  background-color: rgb(43,137,211) !important;
  color: #fff !important;
}

.el-menu-item:hover{
  background-color: rgb(43,137,211) !important;
  color: #fff !important;
}
</style>