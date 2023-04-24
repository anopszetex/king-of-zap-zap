# king-of-zap-zap

## Install dependencies

```bash
npm install
```

## To start the API server

```bash
# start the server
npm start

# to simulate a queue list
curl localhost:{PORT}/process-queue

# in another terminal
npm run autocannon

# if you want to authenticate and test whatsapp API
curl localhost:{PORT}/authenticating
```

## To start monitoring the memory usage

```sh
# WARNING: in .env file, set NODE_ENV to production before running this command, 
# otherwise it will not work because pino-pretty 
# "the transport crash because of a bug  
# However the error is not reported 
# correctly on the main thread due to a race condition."

# start the server with the following command
npm run climem:server

# start the monitoring with the following command
npm run climem

# to initialize autocannon, run the following command
npm run :autocannon

# to stop the monitoring, press Ctrl + C
```
