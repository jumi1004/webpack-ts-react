const path = require("path"); // 절대 경로 참조
const sass = require("sass");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 웹팩에서 html을 다루기 위한 플러그인
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const port = process.env.PORT || 3000;

module.exports = {
  entry: "./src/index.tsx", // 애플리케이션 시작 경로(진입 지점)
  output: {
    path: path.resolve(__dirname, "build/"), // 번들 파일은 ./build/ 폴더에 생성
    publicPath: "/", // html 등 다른 파일에서 생성된 번들을 참조할 때, /을 기준으로 참조
    filename: "bundle.[hash].js",
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"], // 확장자 입력 안해도 import 할 수 있도록. 같은 이름일 경우 js -> ts -> tsx 순서대로 가져옴
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // babel로
        exclude: /node_modules/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.html$/, // html은 html-loader로
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.scss?$/,
        exclude: /node_module/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: sass, //dart-sass 적용
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // .src/index.html 파일을 build경로에 index.html로 파일을 생성
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({ filename: `[name].css` }), //결과물에서 스타일 코드만 뽑아서 별도 css 파일로 만들어 역할에 따라서 파일을 분리하는 것이 좋을 때 사용, 브라우저에서 큰 파일 하나를 받는 것보다 여러 개의 작은 파일을 동시에 처리하는게 빠르기 때문.
    new CleanWebpackPlugin(), // 빌드 이전의 결과물을 제거
    new ForkTsCheckerWebpackPlugin(), // Typescript(타입스크립트)를 빌드할 때 성능을 향상시키기 위한 플러그인
  ],
  devServer: {
    host: "localhost",
    port: port,
    open: true,
  },
};
