
describe("tests simple DB, although simpleMath for now", {
  testAdd: function() {
    valueOf(1+1).shouldBe(2);
  },
 
  testSubtract: function() {
    valueOf(2-1).shouldBe(1);
  }
});