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
# "the transport crash because of a bug  
# However the error is not reported 
# correctly on the main thread due to a race condition."

# IMPORTANT: to run the monitoring, you must have comment this code
[link](https://github.com/anopszetex/king-of-zap-zap/blob/c23e73823a4326312e80f3f0d756386ad004a354/src/routes/index.js#L57-L63)

# start the server with the following command
npm run climem:server

# start the monitoring with the following command
npm run climem

# to initialize autocannon, run the following command
npm run :autocannon

# to stop the monitoring, press Ctrl + C
```
