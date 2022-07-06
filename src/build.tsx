import * as React from 'react';
import { resolve } from 'path';
import { renderToStaticMarkup } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { writeAssets, addAsset, addAssets } from './load-assets';
import { scripts, replaceAll } from './scripts';
import Page from './Page';
import Template from './Template';

const root = resolve(__dirname, '..');
const dist = resolve(root, 'dist');
const sheet = new ServerStyleSheet();
const content = renderToStaticMarkup(sheet.collectStyles(<Page />));
const ia = '<script src="//unpkg.com/alpinejs" defer></script>';
const style = sheet.getStyleElement();

sheet.seal();

if (process.env.NODE_ENV === 'debug') {
  scripts.push(
    `document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')`,
  );
}

const body = `${replaceAll(content)}<script>${scripts.join(';')}</script>${ia}`;
const html = renderToStaticMarkup(
  <Template title="React Alpine Demo" description="A simple React Alpine demo page." style={style} body={body} />,
);

addAssets(resolve(__dirname, 'static'));

addAsset(Buffer.from(`<!DOCTYPE html>${html}`, 'utf-8'), 'index.html');

writeAssets(dist);
