const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'Customer Data handle',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

