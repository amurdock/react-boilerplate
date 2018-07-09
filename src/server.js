import App, {Document} from './App';
import {StaticRouter} from 'react-router-dom';
import React from 'react';
import {renderToString} from 'react-dom/server';
import Koa from 'koa';
import serve from 'koa-static';
import helmet from 'koa-helmet';
import Router from 'koa-router';
import {ServerStyleSheet} from 'styled-components';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const router = new Router()
  .get('/*',
    (ctx, next) => {
      const context = {};
      const sheet = new ServerStyleSheet();

      ctx.state.html = renderToString(
        sheet.collectStyles(
          <StaticRouter context={context} location={ctx.url}>
            <App/>
          </StaticRouter>
        )
      );

      const js = process.env.NODE_ENV === 'production' ?
        <script src={assets.client.js} defer></script> :
        <script src={assets.client.js} defer crossOrigin="true"></script>

      const css = sheet.getStyleElement();

      ctx.state.tags = { css, js };

      return context.url ? ctx.redirect(context.url) : next();
    },
    ctx => {
      ctx.status = 200;
      ctx.body = renderToString(<Document {...ctx.state} />);
    }
  );

// Intialize and configure Koa application
export default new Koa()
  .use(helmet())
  .use(serve(process.env.RAZZLE_PUBLIC_DIR))
  .use(router.routes())
  .use(router.allowedMethods());
