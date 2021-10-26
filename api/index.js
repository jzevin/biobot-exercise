import cluster from 'cluster';
import { cpus } from 'os';
import process from 'process';
// ESM
import Fastify from 'fastify'
import fastifyCors from 'fastify-cors'
import { routes } from './routes.js'
const fastify = Fastify({
  logger: false
}),
  numCPUs = cpus().length;

fastify.register(fastifyCors);
fastify.register(routes);

//loading kit shipping dat in an in mem global for simplicity and speed
import kitShippingData from "./kit-shipping-data.js";
global.kitShippingData = kitShippingData;

// clusting completely overkill but I recently leanred how to do this and it so quick and easy so why not :)
if (cluster.isMaster) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  fastify.listen(3001, function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log(`Server is now listening on ${address}`);
  })

  console.log(`Worker ${process.pid} started`);
}