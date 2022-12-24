import { install } from '@edgio/prefetch/window'

document.addEventListener('DOMContentLoaded', function () {
  // @ts-ignore
  install({
    includeCacheMisses: true,
  })
})
