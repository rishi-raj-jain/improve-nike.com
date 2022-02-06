import { install } from '@layer0/prefetch/window'

document.addEventListener('DOMContentLoaded', function () {
  // @ts-ignore
  install({
    includeCacheMisses: true,
  })
})
