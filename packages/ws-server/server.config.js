module.exports = {
  apps: [
    {
      // 指定解释器
      name: "ws-server",
      watch: true,
      watch_delay: 1000,
      ignore_watch: [
        "node_modules",
        "src",
        "package.json",
        "package-lock.json",
        "server.config.js",
        "tsconfig.json",
        "listen",
      ],
      script: "./build/index.js",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
