/*global WorkerGlobalScope*/

self = (typeof window !== 'undefined')
    ? window   // if in browser
    : (
    (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
        ? self // if in worker
        : {}   // if in node js
);

var OrgJS = (function () {
    var _ = self.OrgJS = {
 
        orgRegex: function () {
            // e.g: #+TITLE: Example title
            var inbufferOptionsRegex = /[ \t]*#\+(\w+): (.*)/;

            // e.g: * TODO [#A] Headline content :not:a:tag: more content  :this:is:a:tag:
            var headlineRegex = '';
            headlineRegex += '^(\\*+)';                       // any number of stars at the beginning
            headlineRegex += '(?: +(CANCELED|DONE|TODO))?';   // match the TODO state (TODO: expanded after the first pass)
            headlineRegex += '(?: +(\\[#.\\]))?';             // match the priority
            headlineRegex += '(?: +(.*?))?';                  // headline content
            headlineRegex += '(?:(:[a-zA-Z0-9_@#%:]+:))??';   // match the tags
            headlineRegex += '[ \\t]*$';                      // followed by whitespace

            return {
                "inbufferOption": inbufferOptionsRegex,
                "headline": new RegExp(headlineRegex)
            };
        }(),

        parseInBufferOption: function (line) {
            var m = line.match(_.orgRegex['inbufferOption']);
            if (m !== null) {
                return {
                    type: 'inbufferOption',
                    rawContent: m[0] || "",
                    name: m[1] || "",
                    value: m[2]
                };
            } else { return null; }
        },

        parseHeadline: function (line) {
            var m = line.match(_.orgRegex['headline']);
            if (m !== null) {
                return {
                    type: 'headline',
                    rawContent: m[0],
                    level: m[1].length,
                    state: m[2] || "",
                    priority: m[3] || "",
                    title: m[4].trim() || "",
                    tags: m[5] || "",
                    elements: []
                };
            } else { return null; }
        },

        // TODO: Better name?
        // changes the context of current node to the next one
        intoElement: function (next, current) {
            current.elements.push(next);
            next.parent = current;
            current = next;

            return current;
        },


        // Scan the line for Org mode objects
        //
        // @param line         : the current raw line
        // @param org          : the current org node used for context
        // @returns orgElement : the current org mode element
        //
        scan: function (line, org) {

            if (line.length == 0) {
                // empty line
                // this should go to the section of the line or the top section
                return {
                    type: "emptyLine"
                }
            }

            var orgElement;

            switch (org.type) {
                case 'root':
                    // Greater element: it can contain more Org objects (sort of like an implicit headline)
                    // Match for elements in this order
                    // skip empty lines

                    orgElement = _.parseInBufferOption(line) || _.parseHeadline(line);
                    if (orgElement !== null) { return orgElement; }

                    // no matches so we continue accumulating..
                    //
                    return {
                        type: 'unknown',
                        rawContent: line
                    };
                    break;

                // here we can return a headline, which will become the next node
                //
                case 'headline':
                    orgElement = _.parseHeadline(line);
                    if (orgElement !== null) {
                        return orgElement;
                    }

                    return {
                        type: 'unknown',
                        rawContent: line
                    };
                    break;

                default:
                    return {
                        type: "unknown",
                        rawContent: line
                    };
            }
        },


        parse: function (content, orgTree) {

            // First element is always a "root" section
            var currentOrgNode = orgTree = (typeof orgTree !== 'undefined')
                ? orgTree
                : {
                type: "root",
                settings: {},
                elements: [],
                level: 0      // for headlines, TODO: includes would work different
            };

            var lines = content.split("\n");
            lines.forEach(function (line, index) {

                var nextOrgElement = _.scan(line, currentOrgNode);

                if (nextOrgElement !== undefined) {
                    switch (nextOrgElement.type) {
                        case 'inbufferOption':
                            var key = nextOrgElement.name.toUpperCase();
                            var value = nextOrgElement.value.trim();
                            currentOrgNode.settings[key] = value;
                            break;

                        case 'headline':
                            // Greater element: it can contain more Org objects
                            // This will have more headlines and Org mode objects
                            // Can only contain headlines with a higher level than current node
                            // otherwise it will go back to the parent nodes.

                            switch (currentOrgNode.type) {
                                case 'headline':
                                    //  In case it is a level upper in the tree,
                                    //  backtrack to the root with the headline level
                                    if (nextOrgElement.level <= currentOrgNode.level) {

                                        var walkingNode = currentOrgNode;
                                        while (walkingNode.parent.level >= nextOrgElement.level) {
                                            walkingNode = walkingNode.parent;
                                        }

                                        currentOrgNode = walkingNode.parent;
                                        currentOrgNode = _.intoElement(nextOrgElement, currentOrgNode);
                                        break;
                                    } else {
                                        // In case the headline level is deeper in the tree,
                                        // add it as part of the elements from the tree.
                                        currentOrgNode = _.intoElement(nextOrgElement, currentOrgNode);

                                        break;
                                    }
                                default:
                                    currentOrgNode = _.intoElement(nextOrgElement, currentOrgNode);
                                    break;
                            }
                            break;

                        case 'paragraph':
                            // // TODO
                            break;

                        case 'unknown':
                            // // TODO
                            break;

                    }

                } else {
                    console.log("Could not parse: " + line);
                }
            });

            return orgTree;
        }

    };

    return self.OrgJS;
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = OrgJS;
}

