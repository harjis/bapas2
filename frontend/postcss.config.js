const path = require('path');
const root = path.join(__dirname, './src');

module.exports = {
  sourceMap: true,
  plugins: {
    'postcss-import': { path: root },
    'postcss-cssnext': {}
  }
};
