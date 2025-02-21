<script setup lang="ts">
import * as Cesium from 'cesium'
import { onMounted, ref } from 'vue'

const viewerContainer = ref<HTMLElement>()
let viewer: Cesium.Viewer | null = null

// 高德地图API密钥
const AMAP_KEY = '52a331141a82762e8fb87baa39f85ad8'

// 高德地图瓦片URL模板
const AMAP_SATELLITE_URL = 'https://webst{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
const AMAP_ROAD_URL = 'https://webrd{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'

// 存储路线实体
let routeEntity: Cesium.Entity | null = null

// 获取高德路线规划数据
async function getAmapRoute(start: [number, number], end: [number, number]) {
  const startStr = `${start[0]},${start[1]}`
  const endStr = `${end[0]},${end[1]}`
  const url = `https://restapi.amap.com/v3/direction/driving?origin=${startStr}&destination=${endStr}&output=json&key=${AMAP_KEY}`

  try {
    const response = await fetch(url)
    const data = await response.json()
    if (data.status === '1' && data.route && data.route.paths) {
      return data.route.paths[0].steps
    }
    throw new Error('Failed to get route data')
  }
  catch (error) {
    console.error('Error fetching route:', error)
    return null
  }
}

// 绘制路线
function drawRoute(steps: any[]) {
  if (!viewer)
    return

  // 删除已有的路线
  if (routeEntity) {
    viewer.entities.remove(routeEntity)
  }

  // 收集所有路线点
  const positions: Cesium.Cartesian3[] = []
  steps.forEach((step) => {
    const polyline = step.polyline.split(';')
    polyline.forEach((point: string) => {
      const [lng, lat] = point.split(',').map(Number)
      positions.push(Cesium.Cartesian3.fromDegrees(lng, lat))
    })
  })

  // 创建路线实体
  routeEntity = viewer.entities.add({
    polyline: {
      positions,
      width: 5,
      material: new Cesium.PolylineGlowMaterialProperty({
        glowPower: 0.2,
        color: Cesium.Color.BLUE,
      }),
      clampToGround: true,
    },
  })

  // 调整视角以显示整个路线
  viewer.zoomTo(routeEntity)
}

// 规划并显示路线
async function planRoute(start: [number, number], end: [number, number]) {
  const steps = await getAmapRoute(start, end)
  if (steps) {
    drawRoute(steps)
  }
}

// 创建高德地图瓦片提供者
function createAmapImageryProvider(url: string) {
  return new Cesium.UrlTemplateImageryProvider({
    url,
    subdomains: ['01', '02', '03', '04'],
    minimumLevel: 1,
    maximumLevel: 18,
    customTags: {
      // 高德地图使用的是TMS瓦片系统，需要转换y坐标
      '{y}': (imageryProvider: any, x: number, y: number, level: number) => {
        return String(2 ** level - 1 - y)
      },
    },
  })
}

// 锁定垂直视角
function lockVerticalView() {
  if (!viewer)
    return

  // 禁用倾斜
  viewer.scene.screenSpaceCameraController.enableTilt = false

  // 设置为垂直视角
  viewer.camera.setView({
    destination: viewer.camera.position,
    orientation: {
      heading: viewer.camera.heading,
      pitch: Cesium.Math.toRadians(-90.0),
      roll: 0.0,
    },
  })
}

onMounted(async () => {
  if (!viewerContainer.value)
    return

  // 初始化地形
  const terrainProvider = await Cesium.createWorldTerrainAsync()

  // 创建一个不可见的 div 来放置 credits
  const creditContainer = document.createElement('div')
  creditContainer.style.display = 'none'

  // 初始化 Cesium Viewer，使用高德卫星底图
  viewer = new Cesium.Viewer(viewerContainer.value, {
    terrainProvider,
    animation: false,
    baseLayerPicker: false,
    imageryProvider: createAmapImageryProvider(AMAP_SATELLITE_URL),
    fullscreenButton: false,
    vrButton: false,
    geocoder: false,
    homeButton: false,
    infoBox: false,
    sceneModePicker: false,
    selectionIndicator: false,
    timeline: false,
    navigationHelpButton: false,
    scene3DOnly: false, // 必须设为false才能切换2D模式
    sceneMode: Cesium.SceneMode.SCENE2D, // 设置为2D模式
    creditContainer,
  })

  // 强制使用2D模式
  viewer.scene.morphTo2D(0) // 0表示立即切换，不使用过渡动画

  // 添加高德路网图层
  viewer.imageryLayers.addImageryProvider(
    createAmapImageryProvider(AMAP_ROAD_URL),
  )

  //   // 添加南京市边界
  //   viewer.entities.add({
  //     name: '南京市',
  //     polygon: {
  //       hierarchy: new Cesium.PolygonHierarchy(
  //         nanjingCoordinates.map(([lng, lat]) =>
  //           Cesium.Cartesian3.fromDegrees(lng, lat),
  //         ),
  //       ),
  //       material: Cesium.Color.RED.withAlpha(0.3), // 半透明红色
  //       outline: true,
  //       outlineWidth: 2,
  //       height: 0,
  //       extrudedHeight: 10000, // 添加高度，使多边形变成立体的
  //       outlineColor: Cesium.Color.WHITE, // 修改轮廓线颜色
  //     },
  //   })

  // 设置视角到南京
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(118.8, 32.0, 200000), // 南京中心点位置
    orientation: {
      heading: Cesium.Math.toRadians(0.0),
      pitch: Cesium.Math.toRadians(90.0),
      roll: 0.0,
    },
  })

  // 开启深度测试，确保多边形正确显示
  viewer.scene.globe.depthTestAgainstTerrain = true

  // 在初始化完成后，可以测试路线规划
  // 例如：规划从南京站到南京大学的路线
  //   const nanjingStation: [number, number] = [118.803153, 32.087111]
  //   const nanjingUniversity: [number, number] = [118.962611, 32.119823]
  //   await planRoute(nanjingStation, nanjingUniversity)

  // 在初始化完成后锁定垂直视角
  lockVerticalView()
})
</script>

<template>
  <div class="cesium-container">
    <div ref="viewerContainer" class="viewer-container" />
  </div>
</template>

<style scoped>
.cesium-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.viewer-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
