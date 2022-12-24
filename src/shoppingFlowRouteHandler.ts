import { CACHE_PAGES } from './cache'
import transformResponse from './transform'
import { RouteHandler } from '@edgio/core/router/Router'

const handler: RouteHandler = async ({ cache, removeUpstreamResponseHeader, updateResponseHeader, setResponseHeader, proxy }) => {
  cache(CACHE_PAGES)
  removeUpstreamResponseHeader('set-cookie')
  removeUpstreamResponseHeader('cache-control')
  removeUpstreamResponseHeader('content-security-policy-report-only')
  removeUpstreamResponseHeader('content-security-policy')
  setResponseHeader('cache-control', 'public, max-age=86400')
  updateResponseHeader('location', /https:\/\/www\.nike\.com\//gi, '/')
  proxy('origin', { transformResponse })
}

export default handler
