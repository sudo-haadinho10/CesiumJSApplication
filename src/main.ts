
// import * as Cesium from 'cesium';
// import 'cesium/Build/Cesium/Widgets/widgets.css';

// const viewer = new Cesium.Viewer('cesiumContainer', {
//   baseLayer: Cesium.ImageryLayer.fromProviderAsync(
//     Cesium.TileMapServiceImageryProvider.fromUrl('http://localhost:8003', {
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
//   terrainProvider: new Cesium.EllipsoidTerrainProvider(),
// });

// viewer.camera.flyTo({
//   destination: Cesium.Cartesian3.fromDegrees(-91.99392567677981, 46.84264180394351, 100),
//   orientation: {
//     heading: Cesium.Math.toRadians(0),
//     pitch: Cesium.Math.toRadians(-45),
//   },
// });

// viewer.scene.screenSpaceCameraController.minimumZoomDistance = 50;


import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

// Initialize Cesium Viewer
const viewer = new Cesium.Viewer('cesiumContainer', {
  terrain: Cesium.Terrain.fromWorldTerrain(), // 3D terrain
  baseLayerPicker: false,
  geocoder: false,
});

// Add custom imagery tiles
Cesium.TileMapServiceImageryProvider.fromUrl('http://localhost:8003', {
  fileExtension: 'png',
  minimumLevel: 17,
  maximumLevel: 21,
  tileWidth: 256,
  tileHeight: 256,
  rectangle: Cesium.Rectangle.fromDegrees(
    -91.99475950912644, 46.84210873347359, // west, south
    -91.99309184443318, 46.84317487441343  // east, north
  ),
  tilingScheme: new Cesium.WebMercatorTilingScheme(),
})
  .then(provider => {
    const layer = viewer.imageryLayers.addImageryProvider(provider);
    layer.alpha = 0.8;
  })
  .catch(error => {
    console.error('Error loading imagery provider:', error);
  });

// Add OpenStreetMap fallback
// viewer.imageryLayers.addImageryProvider(
//   new Cesium.OpenStreetMapImageryProvider({
//     url: 'https://a.tile.openstreetmap.org/',
//   })
// );

// Add OSM buildings (if available)
Cesium.createOsmBuildingsAsync()
  .then(tileset => {
    viewer.scene.primitives.add(tileset);
  })
  .catch(error => {
    console.warn('No OSM buildings available:', error);
  });

// Fly to target location
viewer.scene.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(-91.99392567677981, 46.84264180394351, 500),
  orientation: {
    heading: Cesium.Math.toRadians(20),
    pitch: Cesium.Math.toRadians(-30),
  },
  duration: 0,
});

// Set minimum zoom
viewer.scene.screenSpaceCameraController.minimumZoomDistance = 50;

// Reverse geocode
async function getCountry(lon: number, lat: number): Promise<string> {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
  );
  const data = await response.json();
  return data.address.country;
}

getCountry(-91.99392567677981, 46.84264180394351).then(country => {
  console.log('Country:', country); // Outputs "United States"
});
