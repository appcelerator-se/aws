
describe("AWS Tests go here!", {

  before_all: function() {
    AWS = require('ti.aws');
    AWS.authorize(Titanium.App.Properties.getString('aws-access-key-id'),Titanium.App.Properties.getString('aws-secret-access-key'));
  }
});