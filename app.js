'use strict'

const port = process.env.PORT || 4000;
const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`;
const fastifyStatic = require('@fastify/static');

const fastify = require('fastify')({
  logger: true
})

fastify.register(fastifyStatic, {
  root: `${process.cwd()}/pdf-generator/build/`,
});

fastify.setNotFoundHandler((req, res) => {
  res.sendFile('index.html');
});

fastify.listen({host: host, port: port }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})

/*const path = require('path')
const AutoLoad = require('@fastify/autoload')
const fastifyStatic = require('@fastify/static');
const express = require('express')
const app = express()
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  fastify.register(fastifyStatic, {
    root: `${process.cwd()}/pdf-generator/build`,
  });

  fastify.setNotFoundHandler((req, res) => {
    res.sendFile('index.html');
  });

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  });
}*/