run-with-node-env
==========

[![CI](https://github.com/magiclen/run-with-node-env/actions/workflows/ci.yml/badge.svg)](https://github.com/magiclen/run-with-node-env/actions/workflows/ci.yml)

Set the `NODE_ENV` variable on all platforms. Without `cross-spawn`, very slim.

## Usage

```bash
run-with-node-env production npm start          # NODE_ENV=production  npm start
run-with-node-env development npm run start:dev # NODE_ENV=development npm run start:dev
```

## License

[MIT](LICENSE)