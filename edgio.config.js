module.exports = {
  routes: './src/routes.ts',
  connector: '@edgio/starter',
  backends: {
    origin: {
      domainOrIp: 'www.nike.com',
      hostHeader: 'www.nike.com',
      disableCheckCert: true,
    },
    prod: {
      domainOrIp: 'static.nike.com',
      hostHeader: 'static.nike.com',
      disableCheckCert: true,
    },
  },
}
