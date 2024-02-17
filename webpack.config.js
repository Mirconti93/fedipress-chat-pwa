const path = require('path');

const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  webpack: {
    plugins: {
      add: [
        [
          new InjectManifest({
            swSrc: 'public/service-worker.ts'
          }),
          'append',
        ],
      ],
    },
  },
};