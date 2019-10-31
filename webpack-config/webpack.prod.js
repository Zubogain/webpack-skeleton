const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const jsObfuscator = require("webpack-obfuscator");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new jsObfuscator(
      {
        compact: true,
        controlFlowFlattening: false,
        controlFlowFlatteningThreshold: 0.75,
        deadCodeInjection: false,
        deadCodeInjectionThreshold: 0.4,
        debugProtection: false,
        debugProtectionInterval: false,
        disableConsoleOutput: false,
        domainLock: [],
        identifierNamesGenerator: "hexadecimal",
        identifiersPrefix: "",
        inputFileName: "",
        log: false,
        renameGlobals: false,
        reservedNames: [],
        reservedStrings: [],
        rotateStringArray: true,
        seed: 2048,
        selfDefending: false,
        sourceMap: false,
        sourceMapBaseUrl: "",
        sourceMapFileName: "",
        sourceMapMode: "separate",
        stringArray: true,
        stringArrayEncoding: false,
        stringArrayThreshold: 0.75,
        target: "browser",
        transformObjectKeys: false,
        unicodeEscapeSequence: false
      },
      "js/vendors~app.js"
    )
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          ecma: 5
        }
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  }
});
