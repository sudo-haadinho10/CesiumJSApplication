// import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

// import * as Cesium from 'cesium';
// import 'cesium/Build/Cesium/Widgets/widgets.css';

// const viewer = new Cesium.Viewer("cesiumContainer", {
//   baseLayer: Cesium.ImageryLayer.fromProviderAsync(
//     Cesium.TileMapServiceImageryProvider.fromUrl(
//       Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII"),
//     ),
//   ),
//   baseLayerPicker: false,
//   geocoder: false,
// });

// import * as Cesium from 'cesium';
// import 'cesium/Build/Cesium/Widgets/widgets.css';

// const viewer = new Cesium.Viewer('cesiumContainer', {
//   baseLayer: Cesium.ImageryLayer.fromProviderAsync(
//     Cesium.TileMapServiceImageryProvider.fromUrl('/tiles/GDALOUTPUT', { // Updated URL
//       fileExtension: 'png',
//       minimumLevel: 17,
//       maximumLevel: 21,
//       tileWidth: 256,
//       tileHeight: 256,
//     }),
//   ),
//   baseLayerPicker: false,
//   geocoder: false,
// });

// viewer.camera.flyTo({
//   destination: Cesium.Cartesian3.fromDegrees(-0.1406, 50.8198, 1000),
//   orientation: {
//     heading: Cesium.Math.toRadians(0),
//     pitch: Cesium.Math.toRadians(-45),
//   },
// });

//best-------------------------------
// import * as Cesium from 'cesium';
// import 'cesium/Build/Cesium/Widgets/widgets.css';

// const viewer = new Cesium.Viewer('cesiumContainer', {
//   baseLayer: Cesium.ImageryLayer.fromProviderAsync(
//     Cesium.TileMapServiceImageryProvider.fromUrl('/tiles/GDALOUTPUT', {
//       fileExtension: 'png',
//       minimumLevel: 17,
//       maximumLevel: 21,
//       tileWidth: 256,
//       tileHeight: 256,
//       rectangle: Cesium.Rectangle.fromDegrees(
//         -91.99475950912644,  // west
//         46.84210873347359,   // south
//         -91.99309184443318,  // east
//         46.84317487441343    // north
//       ),
//       tilingScheme: new Cesium.WebMercatorTilingScheme(),
//     }),
//   ),
//   baseLayerPicker: false,
//   geocoder: false,
// });

// // Center the camera on the tile area and zoom in
// viewer.camera.flyTo({
//   destination: Cesium.Cartesian3.fromDegrees(-91.99392567677981, 46.84264180394351, 100),
//   orientation: {
//     heading: Cesium.Math.toRadians(0),
//     pitch: Cesium.Math.toRadians(-45),
//   },
// });

// // Prevent zooming out too far
// viewer.scene.screenSpaceCameraController.minimumZoomDistance = 50;

//best-------------------------------

import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

const viewer = new Cesium.Viewer('cesiumContainer', {
  baseLayer: Cesium.ImageryLayer.fromProviderAsync(
    Cesium.TileMapServiceImageryProvider.fromUrl('http://localhost:8003', {
      fileExtension: 'png',
      minimumLevel: 17,
      maximumLevel: 21,
      tileWidth: 256,
      tileHeight: 256,
      rectangle: Cesium.Rectangle.fromDegrees(
        -91.99475950912644,  // west
        46.84210873347359,   // south
        -91.99309184443318,  // east
        46.84317487441343    // north
      ),
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
    }),
  ),
  baseLayerPicker: false,
  geocoder: false,
  terrainProvider: new Cesium.EllipsoidTerrainProvider(),
});

viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(-91.99392567677981, 46.84264180394351, 100),
  orientation: {
    heading: Cesium.Math.toRadians(0),
    pitch: Cesium.Math.toRadians(-45),
  },
});

viewer.scene.screenSpaceCameraController.minimumZoomDistance = 50;

// import * as Cesium from 'cesium';
// import 'cesium/Build/Cesium/Widgets/widgets.css';

// // configure our tile server
// const offlineImagery = new Cesium.UrlTemplateImageryProvider({
//   url : 'http://localhost:8003/{z}/{x}/{y}.png',

//   minimumLevel :17,

//   maximumLevel :21
// });

// // Initialize the CesiumJS viewer with offline tiles
// new Cesium.Viewer('cesiumContainer', {
//   baseLayer: new Cesium.ImageryLayer(offlineImagery),
//   baseLayerPicker: false,
//   geocoder: false,
// });


// import * as Cesium from 'cesium';
// import 'cesium/Build/Cesium/Widgets/widgets.css';

// const viewer = new Cesium.Viewer('cesiumContainer', {
//   baseLayer: false, // No imagery, just globe
//   baseLayerPicker: false,
//   geocoder: false
// });

// console.log('Globe loaded');

