var OrgJS = require('../org-mode.js');

var rawOrg = ""
rawOrg += "#+TITLE:   Hello World!"
rawOrg += "\n\n"
rawOrg += "#+runmode: sequential"
rawOrg += "\n\n"
rawOrg += "#+OPTIONS: todo:t ^:nil"
rawOrg += "\n\n"
rawOrg += "Some text"
rawOrg += "\n\n"
rawOrg += "* TODO [#A] First level headline #1      :not:a:tag:"
rawOrg += "\n\n"
rawOrg += "** Second level headline"
rawOrg += "\n\n"
rawOrg += "*** Third level headline"
rawOrg += "\n\n"
rawOrg += "Text from the second level headline"
rawOrg += "\n\n"

var org = OrgJS.parse(rawOrg);

var util = require('util');
console.log(util.inspect(org, false, null));
