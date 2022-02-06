import { skipWaiting, clientsClaim } from 'workbox-core'
import { Prefetcher, prefetch } from '@layer0/prefetch/sw'
import DeepFetchPlugin, { DeepFetchCallbackParam } from '@layer0/prefetch/sw/DeepFetchPlugin'

skipWaiting()
clientsClaim()

new Prefetcher({
  plugins: [
    new DeepFetchPlugin([
      {
        selector: 'script',
        maxMatches: 10,
        attribute: 'src',
        as: 'script',
        callback: deepFetchJS,
      },
      {
        selector: '[rel="stylesheet"]',
        maxMatches: 10,
        attribute: 'href',
        as: 'style',
        callback: deepFetchAssets,
      },
      {
        selector: '[rel="preload"]',
        maxMatches: 10,
        attribute: 'href',
        as: 'style',
        callback: deepFetchAssets,
      },
      {
        selector: '[l0="true"]',
        maxMatches: 3,
        attribute: 'href',
        as: 'image',
        callback: deepFetchImage,
      },
      {
        selector: 'img.u-full-height',
        maxMatches: 3,
        attribute: 'style',
        as: 'image',
        callback: deepFetchImage,
      },
      {
        selector: '.snap-start img',
        maxMatches: 1,
        attribute: 'style',
        as: 'image',
        callback: deepFetchImage,
      },
    ]),
  ],
})
  .route()
  .cache(/^https:\/\/static\.nike\.com\/.*/)

function deepFetchImage({ $el, el, $ }: DeepFetchCallbackParam) {
  let urlTemplate = $(el).attr('src')
  console.log($(el), urlTemplate)
  if (urlTemplate) {
    console.log(`\n[][][][]\nPrefetching PDP: ${urlTemplate}\n[][][][]\n`)
    prefetch(urlTemplate, 'image')
  }
  urlTemplate = $(el).attr('href')
  console.log($(el), urlTemplate)
  if (urlTemplate) {
    console.log(`\n[][][][]\nPrefetching PDP: ${urlTemplate}\n[][][][]\n`)
    prefetch(urlTemplate, 'image')
  }
  urlTemplate = $(el).attr('srcset')
  console.log($(el), urlTemplate)
  if (urlTemplate) {
    console.log(`\n[][][][]\nPrefetching PDP: ${urlTemplate}\n[][][][]\n`)
    prefetch(urlTemplate, 'image')
  }
  urlTemplate = $(el).attr('style')
  console.log($(el), urlTemplate)
  if (urlTemplate) {
    urlTemplate = urlTemplate.substring('background-image:url('.length, urlTemplate.length - 2)
    console.log(`\n[][][][]\nPrefetching PDP: ${urlTemplate}\n[][][][]\n`)
    prefetch(urlTemplate, 'image')
  }
  urlTemplate = $(el).attr('style')
  console.log($(el), urlTemplate)
  if (urlTemplate) {
    urlTemplate = urlTemplate.substring('background-image: url('.length, urlTemplate.length - 2)
    console.log(`\n[][][][]\nPrefetching PDP: ${urlTemplate}\n[][][][]\n`)
    prefetch(urlTemplate, 'image')
  }
}

function deepFetchAssets({ $el, el, $ }: DeepFetchCallbackParam) {
  var urlTemplate = $(el).attr('href')
  console.log($(el), urlTemplate)
  if (urlTemplate) {
    console.log(`\n[][][][]\nPrefetching Asset: ${urlTemplate}\n[][][][]\n`)
    prefetch(urlTemplate, 'script')
  }
}

function deepFetchJS({ $el, el, $ }: DeepFetchCallbackParam) {
  var urlTemplate = $(el).attr('src')
  console.log($(el), urlTemplate)
  if (urlTemplate) {
    console.log(`\n[][][][]\nPrefetching JS: ${urlTemplate}\n[][][][]\n`)
    prefetch(urlTemplate, 'script')
  }
}
