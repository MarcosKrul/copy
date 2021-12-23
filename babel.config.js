module.exports = {
  presets: [
    "@babel/preset-typescript",
    ["@babel/preset-env", { targets: { node: "current" }, loose: false }],
  ],
  plugins: [
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: false }],
    [
      "module-resolver", { alias: { 
        "@routes": "./src/routes",
        "@controllers": "./src/controllers",
        "@middlewares": "./src/middlewares",
        "@errors": "./src/errors",
        "@services": "./src/services",
        "@models": "./src/models",
      }}
    ],
  ],
  ignore: ["**/*.spec.ts"],
};