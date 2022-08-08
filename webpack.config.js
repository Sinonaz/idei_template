const isProduction = true;

module.exports = {
  mode: isProduction ? "production" : "development",
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          query: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    node: "current",
                  },
                },
              ],
            ],
          },
        },
      },
    ],
  },
  output: {
    filename: "script.min.js",
  },
  devtool: "source-map",
};
