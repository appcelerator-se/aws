
describe("tests simple DB, although simpleMath for now", {

  before_all: function() {
        AWS = require('ti.aws');
  },
  testAdd: function() {
    valueOf(1+1).shouldBe(2);
  },
 
  testSubtract: function() {
    valueOf(2-1).shouldBe(1);
  }
});