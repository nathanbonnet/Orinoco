const path = require('path');

// module.exports = {
//   entry: {
//     home: './src/index.js',
//     pannier: './src/pannier.js'
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
//   module: {
//         rules: [
//             {
//                 test: /\.s[ac]ss$/i,
//                 use: [
//                 'style-loader',
//                 'css-loader',
//                 'sass-loader',
//                 ],
//             },
//         ],
//     },
// };

var config = {
  module: {
      rules: [
          {
              test: /\.s[ac]ss$/i,
              use: [
              'style-loader',
              'css-loader',
              'sass-loader',
              ],
          },
      ],
  },
};

var indexConfig = Object.assign({}, config, {
  name: "index",
  entry: "./src/index/index.js",
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: "index.bundle.js"
  },
});
var produitConfig = Object.assign({}, config,{
  name: "produit",
  entry: "./src/produit/produit.js",
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: "produit.bundle.js"
  },
});
var panierConfig = Object.assign({}, config,{
  name: "panier",
  entry: "./src/panier/panier.js",
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: "panier.bundle.js"
  },
});
var confirmationConfig = Object.assign({}, config,{
  name: "confirmation",
  entry: "./src/confirmation/confirmation.js",
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: "confirmation.bundle.js"
  },
});


// Return Array of Configurations
module.exports = [
  indexConfig, produitConfig, panierConfig, confirmationConfig      
];