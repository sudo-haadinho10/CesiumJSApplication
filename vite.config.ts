
// import { defineConfig } from 'vite';
// import { viteStaticCopy } from 'vite-plugin-static-copy';

// const cesiumSource = 'node_modules/cesium/Build/Cesium';
// const cesiumBaseUrl = 'cesiumStatic';

// export default defineConfig({
//   define: {
//     CESIUM_BASE_URL: JSON.stringify(`/${cesiumBaseUrl}`),
//   },
//   plugins: [
//     viteStaticCopy({
//       targets: [
//         {
//           src: `${cesiumSource}/*`,
//           dest: cesiumBaseUrl,
//         },
//         {
//           src: 'GDALOUTPUT', // Copy the entire GDALOUTPUT folder, including subdirectories
//           dest: 'tiles',
//         },
//       ],
//     }),
//   ],
//   server: {
//     port: 5173,
//     cors: true,
//   },
// });

//abv is best

import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const cesiumSource = 'node_modules/cesium/Build/Cesium';
const cesiumBaseUrl = 'cesiumStatic';

export default defineConfig({
  define: {
    CESIUM_BASE_URL: JSON.stringify(`/${cesiumBaseUrl}`),
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: `${cesiumSource}/*`,
          dest: cesiumBaseUrl,
        },
        // Removed the GDALOUTPUT copying since tiles are served from WSL
      ],
    }),
  ],
  server: {
    port: 5173,
    cors: true,
  },
});