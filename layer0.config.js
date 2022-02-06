module.exports = {
  routes: './src/routes.ts',
  connector: '@layer0/starter',
  backends: {
    origin: {
      domainOrIp: 'www.nike.com',
      hostHeader: 'www.nike.com',
      disableCheckCert: process.env.DISABLE_CHECK_CERT || true,
    },
    prod: {
      domainOrIp: 'static.nike.com',
      hostHeader: 'static.nike.com',
      disableCheckCert: process.env.DISABLE_CHECK_CERT || true,
    },
  },
}
