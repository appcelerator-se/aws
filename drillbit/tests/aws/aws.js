
describe("AWS Tests go here!", {

  before_all: function() {
  },
  testAdd: function() {
    AWS = require('ti.aws');
    AWS.authorize(Titanium.App.Properties.getString('aws-access-key-id'),Titanium.App.Properties.getString('aws-secret-access-key'));

    valueOf(1+1).shouldBe(2);
  },
 
  testSubtract: function() {
    valueOf(2-1).shouldBe(1);
  }
});