const path = require("path");
const { defineConfig } = require("vite");
import vue from "@vitejs/plugin-vue";

module.exports = defineConfig(() => {
  const rootPath = path.resolve(process.cwd());
  const srcPath = `${rootPath}/src`;
  return {
    resolve: {
      alias: {
        "~": rootPath,
        "@": srcPath,
      },
    },
    plugins: [vue()], // to process SFC
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        name: "VueCheckPassword",
      },
      rollupOptions: {
        external: ["vue"],
        output: {
          exports: "named",
          globals: {
            vue: "Vue",
          },
        },
      },
      emptyOutDir: false,
    },
  };
});
