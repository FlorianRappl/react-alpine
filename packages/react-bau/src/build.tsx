import * as React from 'react';
import { resolve } from 'path';
import { renderToStaticMarkup } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { scripts, replaceAll } from 'react-alpine';
import { writeAssets, addAsset, addAssets } from './load-assets';

const root = process.cwd();
const src = resolve(root, 'src');
const dist = resolve(root, 'dist');
const Page = require(`${src}/Page`).default;
const Template = require(`${src}/Template`).default;
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
const html = renderToStaticMarkup(<Template style={style} body={body} />);

addAssets(resolve(src, 'static'));

addAsset(Buffer.from(`<!DOCTYPE html>${html}`, 'utf-8'), 'index.html');

writeAssets(dist);
