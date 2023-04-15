# king-of-zap-zap

## Install dependencies

```bash
npm install
```

## To start the API server

```bash
npm start
```

## To start monitoring the memory usage

```sh
# WARNING: in .env file, set NODE_ENV to production before running this command, 
# otherwise it will not work because pino-pretty 
# "the transport crash because of a bug  However the error is not reported correctly on the main thread due to a race condition."
npm run climem:server
```
