var OrgJS = window.OrgJS;
var util = require('util');
var assert = require('chai').assert;

/*global describe, it*/
describe('readme file', function () {
    it('xyz', function () {
        var contents = require('./readme-file.data');
        console.log('contents.....', contents);
        var org      = OrgJS.parse(contents);
        console.log(util.inspect(org, false, null));
    });
});