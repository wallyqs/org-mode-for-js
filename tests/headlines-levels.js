  var fs    = require('fs');
  var OrgJS = require('../org-mode.js');

  var testfilepath = 'org/features/headlines/levels.org';
  var contents = fs.readFileSync(testfilepath, {encoding: 'utf-8'});
  var org      = OrgJS.parse(contents);

  var util = require('util');
  console.log(util.inspect(org, false, null));
