#!/usr/bin/env node

const nodemon = require('nodemon');
const server = require('http-server');
const livereload = require('livereload');
const { resolve } = require('path');

const root = process.cwd();
const dist = resolve(root, 'dist');
const command = process.argv.pop();

function start() {
  const lrp = 35729;
  const lrs = livereload.createServer({
    port: lrp,
    noListen: true,
  });

  lrs.watch(dist);

  lrs.listen(() => {
    console.log(`[live] Reload at http://localhost:${lrp}`);
  });

  const htp = 8080;
  const hts = server.createServer({
    root: dist,
  });

  hts.listen(htp, '0.0.0.0', () => {
    console.log(`[http] Server at http://localhost:${htp}`);
  });

  const ndm = nodemon({
    cwd: root,
    watch: ['src'],
    ext: 'ts,tsx,json,png,jpg',
    ignore: ['src/**/*.test.tsx?'],
    exec: `NODE_ENV=debug ts-node ${__dirname}/build.tsx`,
  });

  process.on('exit', () => {
    lrs.close();
    hts.close();
    ndm.reset();
  });
}

function build() {
  require('ts-node').register();
  require('./build.tsx');
}

switch (command) {
  case 'start':
    start();
    break;
  case 'build':
    build();
    break;
  default:
    console.error('Command not known. Use either "start" or "build".');
    process.exit(1);
}
