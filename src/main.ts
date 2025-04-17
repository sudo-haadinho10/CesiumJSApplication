
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
}
