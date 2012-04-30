
describe("AWS Tests go here!", {

  before_all: function() {
    AWS = require('ti.aws');
    AWS.authorize(Titanium.App.Properties.getString('aws-access-key-id'),Titanium.App.Properties.getString('aws-secret-access-key'));
  },
  timeout:5000,  
  listDomains_as_async: function (callback){
    AWS.SimpleDB.listDomains({},function(data){
        callback.passed();
    }, function (error){
        callback.failed('Some error occured')
    });
  }
});