import { CACHE_ASSETS } from './cache'
import { Router } from '@layer0/core/router'
import shoppingFlowRouteHandler from './shoppingFlowRouteHandler'

export default new Router()
  // L0 Service Worker
  .match('/service-worker.js', ({ cache, removeUpstreamResponseHeader, serveStatic, setResponseHeader }) => {
    setResponseHeader('cache-control', 'public, max-age=86400')
    removeUpstreamResponseHeader('set-cookie')
    cache(CACHE_ASSETS)
    serveStatic('dist/service-worker.js')
  })
  // L0 Browser.js
  .match('/__layer0__/:browser/browser.js', ({ cache, removeUpstreamResponseHeader, serveStatic, setResponseHeader }) => {
    setResponseHeader('cache-control', 'public, max-age=86400')
    removeUpstreamResponseHeader('set-cookie')
    cache(CACHE_ASSETS)
    serveStatic('dist/browser.js')
  })
  // Homepage
  .match('/', shoppingFlowRouteHandler)
  .match('/:locale', shoppingFlowRouteHandler)
  // One PLP
  .match('/w/mens-shoes:path', shoppingFlowRouteHandler)
  .match('/:locale/w/mens-shoes:path', shoppingFlowRouteHandler)
  // One PDP
  .match('/t/air-zoom:path/:suffix*', shoppingFlowRouteHandler)
  .match('/:locale/air-zoom:path/:suffix*', shoppingFlowRouteHandler)
  // Assets
  .match('/static/:path*', ({ cache, removeUpstreamResponseHeader, proxy, setResponseHeader }) => {
    setResponseHeader('cache-control', 'public, max-age=86400')
    removeUpstreamResponseHeader('set-cookie')
    cache(CACHE_ASSETS)
    proxy('origin')
  })
  .match('/assets/:path*', ({ cache, removeUpstreamResponseHeader, proxy, setResponseHeader }) => {
    setResponseHeader('cache-control', 'public, max-age=86400')
    removeUpstreamResponseHeader('set-cookie')
    cache(CACHE_ASSETS)
    proxy('origin')
  })
  .match('/l0-prodstatic/:path*', ({ cache, removeUpstreamResponseHeader, proxy, setResponseHeader }) => {
    setResponseHeader('cache-control', 'public, max-age=86400')
    removeUpstreamResponseHeader('set-cookie')
    cache(CACHE_ASSETS)
    proxy('prod', { path: ':path*' })
  })
  // If not found at any of above, but is an asset, cache it.
  .match(
    '/:path*/:file.:ext(js|mjs|css|png|ico|svg|jpg|jpeg|gif|ttf|woff|otf)',
    ({ cache, removeUpstreamResponseHeader, proxy, setResponseHeader }) => {
      setResponseHeader('cache-control', 'public, max-age=86400')
      removeUpstreamResponseHeader('set-cookie')
      cache(CACHE_ASSETS)
      proxy('origin')
    }
  )
  .fallback(({ proxy }) => {
    proxy('origin')
  })
