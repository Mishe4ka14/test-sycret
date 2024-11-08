const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // Используем режим разработки для удобства
  entry: "./src/index.tsx", // Главный файл проекта
  output: {
    filename: "bundle.js", // Один файл для всех ресурсов
    path: path.resolve(__dirname, "dist"), // Путь к итоговой директории
    clean: true, // Очищает папку dist перед сборкой
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"], // Разрешаем нужные расширения
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Обрабатываем TypeScript файлы
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.module\.css$/, // Обрабатываем CSS модули
        use: [
          "style-loader", // Вставка стилей в DOM
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]", // Имена классов для модулей
              },
              importLoaders: 1, // Обрабатываем импорты
            },
          },
        ],
      },
      {
        test: /\.css$/, // Обрабатываем обычные CSS файлы
        use: ["style-loader", "css-loader"],
        exclude: /\.module\.css$/, // Исключаем модули CSS
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Шаблон HTML для сборки
    }),
  ],
  devServer: {
    static: "./dist",
    port: 3000,
    open: true,
    historyApiFallback: true,
    proxy: [
      {
        context: ["/service/api/api"], // указываем пути, которые проксируем
        target: "https://sycret.ru", // целевой сервер
        changeOrigin: true, // Изменяет origin на целевой
        secure: false, // если используется самоподписанный сертификат
        pathRewrite: {
          "^/service/api/api": "/service/api/api", // Перенаправляем запросы
        },
      },
    ],
  },
};
