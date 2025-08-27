<script lang="ts" setup>
import AMapLoader from '@amap/amap-jsapi-loader'
import { onMounted, ref, onUnmounted } from 'vue'
import { getMapListApi } from '@/api/map'
import { ElMessage } from 'element-plus'
import stationIcon from '@/assets/flashIcon.png'
import stationImg from '@/assets/station.jpg'

const markerList = ref<any>([])
let map: any = null
const isLoading = ref(true)

onMounted(() => {

  AMapLoader.load({
    key: '42c9576f2de73ce6f54b561db7451ffb',
    version: '1.4.15',
    plugins: ['AMap.Scale'],
  }) .then((AMap) => {
    map = new AMap.Map("container", {
      viewMode: "3D",
      zoom: 5, 
      center: [120.155104, 30.287458], 
    })

    getMapListApi().then(({ data }) => {
      markerList.value = data
      // 创建信息窗体
      const infoWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(16, -45),
      })
      // 添加自定义标记
      markerList.value.forEach((markerData: any) => {
        const marker = new AMap.Marker({
          position: markerData.position,
          title: markerData.title,
          icon: stationIcon
        })
        marker.on('click', () => {
          infoWindow.setContent(`
            <div style="display: flex; padding: 10px; align-items: center;">
              <div>
                <img src="${stationImg}" style="width: 150px;">
              </div>
              <div style="width: 150px; line-height: 30px; margin-left: 20px;">
                <h3>${markerData.title}</h3>
                <p>充电桩数量：${markerData.count}</p>
                <p>充电站状态：<span style="color: ${markerData.status === 1 ? '#3DBB92' : '#ECB766'};">${markerData.status === 1 ? '使用中' : '维护中'}</span></p>
              </div>
            </div>
          `)
          infoWindow.open(map, marker.getPosition())
        })
        map.add(marker)
      })
      isLoading.value = false
    }).catch((err: any) => {
      ElMessage.error(err.message)
      isLoading.value = false
    })
  })
})

onUnmounted(() => {
  map?.destroy()
})
</script>

<template>
  <div id="container" v-loading="isLoading" element-loading-text="loading..." element-loading-background="rgba(255, 255, 255, 1)" ></div>
</template>

<style lang="less" scoped>
#container{
  width: 100%;
  height: 80vh;

}

</style>