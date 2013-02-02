var grunt = require('grunt'),
    util = require('util');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports["modules"] = {
  'helper': function(test) {
    test.expect(1);
    
    var f = {
      templates: [
        "test/testFiles/templates.js"
      ],
      views: [
        "test/testFiles/view.js"
      ],
      collections: [
        "test/testFiles/collection.js"
      ],
      models: [
        "test/testFiles/model.js"
      ],
      routers: [
        "test/testFiles/router.js"
      ]
    },
    name = "Test",
    contents = grunt.helper('modules', f, name),
    expected = grunt.file.read("test/output.js");

    test.equal(contents, expected, 'Should return a module file');
    test.done();
  }
};
