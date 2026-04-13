<script setup lang="ts">
import type { MenuItemProps } from '@/types/user'
import { useTabsStore } from '@/store/tabs'

defineOptions({ name: 'MenuItem' })

const props = withDefaults(defineProps<MenuItemProps>(), {})

const tabsStore = useTabsStore()
const { addTab, setCurrentTab } = tabsStore

const add = (name: string, url: string, icon: string) => {
  addTab(name, url, icon)
  setCurrentTab(name, url)
}
</script>

<template>
  <el-sub-menu v-if="props.item.children && props.item.children.length > 0" :index="props.item.url">
    <template #title>
      <el-icon>
        <component :is="props.item.icon" />
      </el-icon>
      <span>{{ props.item.name }}</span>
    </template>
    <menu-item v-for="child in props.item.children" :item="child" :key="child.url"></menu-item>
  </el-sub-menu>
  <el-menu-item v-else :index="props.item.url" @click="add(props.item.name, props.item.url, props.item.icon)"
    v-show="!(props.item.name === '订单详情')">
    <el-icon>
      <component :is="props.item.icon" />
    </el-icon>
    <span>{{ props.item.name }}</span>
  </el-menu-item>
</template>

<style lang="less" scoped>
.is-active {
  background-color: rgb(43, 137, 211);
  color: #fff !important;

  div {
    span {
      color: #fff;
    }

    .el-icon {
      color: #fff !important;
    }
  }
}

::v-deep .el-sub-menu__title:hover {
  background-color: rgb(43, 137, 211) !important;
  color: #fff !important;
}

.el-menu-item:hover {
  background-color: rgb(43, 137, 211) !important;
  color: #fff !important;
}
</style>