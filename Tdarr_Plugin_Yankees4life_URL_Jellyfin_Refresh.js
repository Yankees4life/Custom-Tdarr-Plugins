/* eslint-disable linebreak-style */
module.exports.dependencies = [
  'request',
];

/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
const details = () => ({
  id: 'Tdarr_Plugin_Yankees4life_URL_Jellyfin_Refresh',
  Stage: 'Post-processing',
  Name: 'Trigger Jellyfin.',
  Type: 'Video',
  Operation: 'Transcode',
  Description: `Connects to jellyfin and triggers a library refresh.\n\n`,
  Version: '1.0',
  Tags: '3rd party,post-processing,configurable',

  Inputs: [{
    name: 'jellyfin_address',
    type: 'string',
    defaultValue: 'http://192.168.0.10',
    inputUI: {
      type: 'text',
    },
    tooltip: `
               Enter the IP address/URL for jellyfin. Must include http(s)://

               \\nExample:\\n
               http://192.168.0.10

               \\nExample:\\n
               https://subdomain.domain.tld`,
  },
  {
    name: 'jellyfin_port',
    type: 'string',
    defaultValue: '3486',
    inputUI: {
      type: 'text',
    },
    tooltip: `
               Enter the port Jellyfin is using, default is 3468

               \\nExample:\\n
               3468`,
  },
  {
    name: 'jellyfin_api',
    type: 'string',
    defaultValue: 'none',
    inputUI: {
      type: 'text',
    },
    tooltip: `
               Enter the api Jellyfin is using, default is none

               \\nExample:\\n
               none`,
  },
  ],
});

// eslint-disable-next-line no-unused-vars
const plugin = (file, librarySettings, inputs, otherArguments) => {
  const lib = require('../methods/lib')();
  // eslint-disable-next-line no-unused-vars,no-param-reassign
  inputs = lib.loadDefaultValues(inputs, details);
  // eslint-disable-next-line import/no-unresolved,import/no-extraneous-dependencies
  const request = require('request');
  // Set up required variables.
  const ADDRESS = inputs.jellyfin_address;
  const PORT = inputs.jellyfin_port;
  const API = inputs.jellyfin_api;
  
  // Check if all inputs have been configured. If they haven't then exit plugin.
  if (
    inputs
    && inputs.jellyfin_address === ''
    && inputs.jellyfin_port === ''
    && inputs.jellyfin_api === ''
  ) {
    response.infoLog += '☒Plugin options have not been configured, please configure options. Skipping this plugin.  \n';
    response.processFile = false;
    return response;
  }

  // Set content of request/post.
  request.post({
    url: `${ADDRESS}:${PORT}/Library/Refresh?api_key=${API}`,
  },
  // eslint-disable-next-line no-unused-vars
  (error, res, body) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });
  return undefined;
};

module.exports.details = details;
module.exports.plugin = plugin;
