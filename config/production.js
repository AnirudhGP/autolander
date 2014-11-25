function ENV(key) {
  return process.env[key];
}

module.exports = {
  port: ENV('PORT') || 80,
  amqpConfig: {
    autoDelete: false,
    durable: true,
    exclusive: false
  },
  azureConfig: {
    accountUrl: 'http://' + ENV('AZURE_ACCOUNT_NAME') + '.table.core.windows.net/',
    accountName: ENV('AZURE_ACCOUNT_NAME'),
    accountKey: ENV('AZURE_ACCOUNT_KEY')
  },
  githubConfig: {
    token: ENV('GITHUB_TOKEN')
  },
  bugzillaConfig: {
    url: "https://bugzilla.mozilla.org/rest/",
    username: ENV('BUGZILLA_EMAIL'),
    password: ENV('BUGZILLA_PASSWORD')
  },
  // Comma seperated list of supported products.
  // Should be removed once bug 1094926 is fixed.
  bugzillaSupportedProducts: ENV('BUGZILLA_SUPPORTED_PRODUCTS') || 'Firefox OS',
  pulseConfig: {
    url: 'amqps://' + ENV('TC_PULSE_USER') + ':' + ENV('TC_PULSE_PASSWORD') + '@pulse.mozilla.org:5671',
    queueName: 'queue/' + ENV('TC_PULSE_USER') + '/gaia-autolander-prod',
    exchange: 'exchange/bugzilla/simple'
  },
  taskclusterConfig: {
    name: ENV('TC_CLIENT_NAME'),
    clientId: ENV('TC_CLIENT_ID'),
    accessToken: ENV('TC_CLIENT_TOKEN')
  },
  taskPulseConfig: {
    username: ENV('TC_PULSE_USER'),
    password: ENV('TC_PULSE_PASSWORD')
  },
  treeherderConfig: {
    name: 'gaia-try',
    baseUrl: ENV('TREEHERDER_URL') || 'https://treeherder.mozilla.org/',
    consumerKey: ENV('TREEHERDER_KEY'),
    consumerSecret: ENV('TREEHERDER_SECRET')
  }
}
