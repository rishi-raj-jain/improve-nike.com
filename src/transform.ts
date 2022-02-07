import cheerio from 'cheerio'
import Request from '@layer0/core/router/Request'
import Response from '@layer0/core/router/Response'
import { injectBrowserScript } from '@layer0/starter'

export default async function transformResponse(response: Response, request: Request) {
  // inject browser.ts into the document returned from the origin
  injectBrowserScript(response)

  if (response.body) {
    let $ = cheerio.load(response.body)

    // cheerio.load(response.body)
    console.log(`Transform script running on ${request.url}`)

    // For production this script should be included in original website base code.
    // <script defer src="/__layer0__/devtools/install.js"></script>

    $('head').append(`
      <script defer src="/__layer0__/cache-manifest.js"></script>
    `)

    // Load every other image lazily to avoid unnecessary initial loads on the page
    $('img').each((i, el) => {
      $(el).attr('loading', 'lazy')
    })

    // First image on PLP to load as soon as possible, preload for faster first load
    if (request.path.includes('/w/')) {
      $('.product-card__body noscript').each((i, el) => {
        if (i < 1) {
          let ele = $(el)
          let hml = $(el).html()
          if (ele && hml) {
            let img = cheerio.load(hml)
            $('.product-card__body img').first().removeAttr('loading')
            $('.product-card__body img').first().attr('src', img('img').attr('src'))
            $('head').prepend(`<link l0="true" rel="preload" as="image" href="${img('img').attr('src')}" />`)
          }
        }
      })
    }

    // First image on PDP to load as soon as possible, preload for faster first load
    if (request.path.includes('/t/')) {
      let img = ''
      $('img.u-full-height').each((i, el) => {
        if (i == 1) {
          img = $(el).attr('src') || ''
          $('head').prepend(`<link l0="true" rel="preload" as="image" href="${img}" />`)
        }
      })
      $('img.u-full-height').each((i, el) => {
        if (i == 0) {
          $(el).removeAttr('loading')
          $(el).removeAttr('data-fade-in')
          $(el).attr('src', img)
        }
      })
    }

    // Relativize urls on the page to go through L0
    response.body = $.html()
      .replace(/\{ display\: none\; \}/g, '{}')
      .replace(/\opacity\: 0\;/g, '')
      .replace(/\=\"\/\//g, '="https://')
      .replace(/https:\/\/www\.nike\.com\//g, '/')
      .replace(/https:\/\/static\.nike\.com\//g, '/l0-prodstatic/')
      .replace(/\?layer0\_dt\_pf\=1/g, '')
  }
}
