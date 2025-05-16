
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import { Viewer, ImageryLayer, ScreenSpaceEventHandler, ScreenSpaceEventType, Cartesian3, Cartographic, Color } from 'cesium';

async function initializeCesium(): Promise<void> {
  console.log('Starting Cesium initialization...');
  try {
    // Initialize Cesium Viewer with NaturalEarthII as the base layer
    const viewer: Viewer = new Cesium.Viewer('cesiumContainer', {
      baseLayer: Cesium.ImageryLayer.fromProviderAsync(
        Cesium.TileMapServiceImageryProvider.fromUrl(Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII"))
      ),
      baseLayerPicker: false,
      geocoder: false,
      homeButton: false,
      sceneModePicker: true, // Enabled as per snippet
      navigationHelpButton: false,
      animation: false,
      timeline: false,
      fullscreenButton: true, // Enabled as per snippet
      infoBox: false,
      selectionIndicator: false,
    });

    viewer.scene.globe.baseColor = Cesium.Color.WHITE; // Updated to WHITE as per snippet
    console.log('Cesium Viewer initialized with NaturalEarthII base layer.');

    // Configure the base imagery layer (NaturalEarthII)
    const baseLayer: ImageryLayer = viewer.imageryLayers.get(0);
    baseLayer.brightness = 1.0;
    baseLayer.alpha = 1.0; // Keep NaturalEarthII fully opaque as per snippet
    console.log('Base imagery (NaturalEarthII) set with brightness 1.0, alpha 1.0.');

    // Load terrain provider
    console.log('Loading terrain provider from http://localhost:8081/...');
    const terrainProvider = await Cesium.CesiumTerrainProvider.fromUrl('http://localhost:8081/');
    viewer.terrainProvider = terrainProvider;
    viewer.scene.globe.maximumScreenSpaceError = 2;
    console.log('Terrain provider set.');

    // Add custom imagery from localhost:8003
    console.log('Loading custom imagery from http://localhost:8003...');
    Cesium.TileMapServiceImageryProvider.fromUrl('http://localhost:8003', {
      fileExtension: 'png',
      minimumLevel: 14,
      maximumLevel: 21,
      tileWidth: 256,
      tileHeight: 256,
      rectangle: Cesium.Rectangle.fromDegrees(
        -91.99475950912644, 46.84210873347359,
        -91.99309184443318, 46.84317487441343
      ),
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
    })
      .then((provider) => {
        const layer: ImageryLayer = viewer.imageryLayers.addImageryProvider(provider);
        layer.brightness = 1.0;
        layer.alpha = 0.8; // Slightly transparent to see terrain
        viewer.imageryLayers.raiseToTop(layer);
        console.log('Custom imagery layer added, alpha 0.8, raised to top.');
      })
      .catch((error) => {
        console.error('Error loading custom imagery provider (localhost:8003):', error);
      });

    // Enable depth testing and lighting
    viewer.scene.globe.depthTestAgainstTerrain = true;
    viewer.scene.globe.enableLighting = true;
    viewer.scene.globe.lightingFadeOutDistance = 0;
    viewer.clock.currentTime = Cesium.JulianDate.fromIso8601('2025-05-13T15:00:00Z');
    console.log('Enabled depth test and lighting.');

    // Fly to target
    viewer.scene.camera.flyTo({
      destination: Cartesian3.fromDegrees(-91.993925, 46.842641, 500),
      orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-45.0),
        roll: 0.0,
      },
      duration: 0,
    });
    console.log('FlyTo command issued.');

    // Add mouse position display with terrain height
    const coordinatesElement: HTMLDivElement = document.createElement('div');
    coordinatesElement.style.position = 'absolute';
    coordinatesElement.style.bottom = '10px';
    coordinatesElement.style.left = '10px';
    coordinatesElement.style.padding = '5px';
    coordinatesElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    coordinatesElement.style.color = 'white';
    coordinatesElement.style.fontSize = '12px';
    coordinatesElement.style.zIndex = '100';
    const containerElement: HTMLElement | null = document.getElementById('cesiumContainer');
    if (containerElement) {
      containerElement.appendChild(coordinatesElement);
    } else {
      console.error('Could not find cesiumContainer element.');
    }

    const handler: ScreenSpaceEventHandler = new ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((movement: { endPosition: Cesium.Cartesian2 }) => {
      const cartesian: Cartesian3 | undefined = viewer.camera.pickEllipsoid(
        movement.endPosition,
        viewer.scene.globe.ellipsoid
      );
      if (cartesian) {
        const cartographic: Cartographic = Cartographic.fromCartesian(cartesian);
        const longitudeString: string = Cesium.Math.toDegrees(cartographic.longitude).toFixed(5);
        const latitudeString: string = Cesium.Math.toDegrees(cartographic.latitude).toFixed(5);
        const heightString: string = viewer.scene.camera.positionCartographic.height.toFixed(2) + ' (cam)';
        const terrainHeight: number = cartographic.height;
        coordinatesElement.innerHTML = `Lon: ${longitudeString}° Lat: ${latitudeString}° Elev: ${heightString} Terrain Height: ${terrainHeight.toFixed(2)}m`;
      } else {
        coordinatesElement.innerHTML = 'Off globe';
      }
    }, ScreenSpaceEventType.MOUSE_MOVE);
    console.log('Added mouse coordinate and terrain height display.');

    console.log('Cesium initialization complete.');
  } catch (error: unknown) {
    console.error('ERROR during Cesium initialization:', error);
    const container: HTMLElement | null = document.getElementById('cesiumContainer');
    if (container) {
      container.innerHTML =
        `<div style="color: red; padding: 20px; font-family: monospace;">` +
        `<h2>Failed to initialize Cesium</h2>` +
        `<p>Ensure servers (localhost:8003, localhost:8081) are running & accessible.</p>` +
        `<h3>Error Details:</h3><pre>${error instanceof Error ? error.stack : String(error)}</pre>` +
        `</div>`;
    }
  }
}

initializeCesium();
