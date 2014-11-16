/*global WorkerGlobalScope*/

self = (typeof window !== 'undefined') ? window // if in browser
    : (
        (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) ? self // if in worker
        : {} // if in node js
    );


var OrgJS = (function() {
    var _ = self.OrgJS = {


        orgRegex: function() {
            // e.g: #+TITLE: Example title
            var inbufferOptionsRegex = /[ \t]*#\+(\w+): (.*)/;

            // e.g: * TODO [#A] Headline content :not:a:tag: more content  :this:is:a:tag:
            var headlineRegex = '';
            headlineRegex += '^(\\*+)'; // any number of stars at the beginning
            headlineRegex += '(?: +(CANCELED|DONE|TODO))?'; // match the TODO state (TODO: expanded after the first pass)
            headlineRegex += '(?: +(\\[#.\\]))?'; // match the priority
            headlineRegex += '(?: +(.*?))?'; // headline content
            headlineRegex += '(?:(:[a-zA-Z0-9_@#%:]+:))??'; // match the tags
            headlineRegex += '[ \\t]*$'; // followed by whitespace

            var orgRegex = {
                "inbufferOption": inbufferOptionsRegex,
                "headline": new RegExp(headlineRegex)
            };

            return orgRegex;
        }(),

        parseInBufferOption: function(line) {
            var m = line.match(_.orgRegex['inbufferOption']);
            if (m !== null) {
                return {
                    type: 'inbufferOption',
                    rawContent: m[0] || "",
                    name: m[1] || "",
                    value: m[2]
                };
            } else {
                return null;
            }
        },

        parseHeadline: function(line) {
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
            } else {
                return null;
            }
        },


        // TODO: Better name?
        // changes the context of current node to the next one
        intoElement: function(next, current) {
            // debugging lines
            if (current == null || next == null) {
                console.error("ERROR: during parsing!!!")
                return current;
            }

            current.elements.push(next);
            next.parent = current;
            return next;
        },

        fromElementIntoHeadline: function(current, nextHeadline) {
            // need to find the correct parent of the next headline before attaching
            if (nextHeadline.level <= current.parent.level) {
                var walkingNode = current;
                while (walkingNode.parent.level >= nextHeadline.level) {
                    walkingNode = walkingNode.parent;
                }
                return _.intoElement(nextHeadline, walkingNode.parent);
            } else {
                return _.intoElement(nextHeadline, current.parent);
            }
        },


        // Scan the line for Org mode objects
        //
        // @param line         : the current raw line
        // @param org          : the current org node used for context
        // @returns orgElement : the current org mode element
        //
        scan: function(line, org) {

            switch (org.type) {
                case 'root':
                    // Greater element: it can contain more Org objects (sort of like an implicit headline)
                    // Match for elements in this order
                    // skip empty lines

                    var orgElement = _.parseInBufferOption(line) || _.parseHeadline(line);
                    if (orgElement !== null) return orgElement;

                    // empty line, should be accumulated
                    if (line.length == 0) return {
                        type: "emptyLine",
                        rawContent: "\n"
                    };

                    // at this point, most likely we are dealing with a paragraph
                    return {
                        type: 'paragraph',
                        rawContent: line
                    };
                    break;

                    // here we can return a headline, which will become the next node
                    //
                case 'headline':
                    var orgElement = _.parseHeadline(line);
                    if (orgElement !== null) {
                        return orgElement;
                        break;
                    };

                    return {
                        type: 'paragraph',
                        rawContent: line
                    };
                    break;

                case 'paragraph':
                    // anything that is not a paragraph, would break the accumulation
                    var orgElement = _.parseInBufferOption(line) || _.parseHeadline(line);
                    if (orgElement !== null) {
                        return orgElement
                    }

                    // empty line, should be accumulated
                    if (line.length == 0) return {
                        type: "emptyLine",
                        rawContent: "\n"
                    };

                    return {
                        type: 'paragraph',
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


        parse: function(content, orgTree) {

            // First element is always a "root" section
            var currentOrgNode = orgTree = (typeof orgTree !== 'undefined') ? orgTree : {
                type: "root",
                settings: {},
                elements: [],
                level: 0, // for headlines, TODO: includes would work different
                rawContent: '' // any paragraphs that could exist before the first headline
            };

            var lines = content.split("\n"); // TODO: Optimize

            lines.forEach(function(line, index) {

                var nextOrgElement = _.scan(line, currentOrgNode);
                // Skip elements that were not parsed correctly
                if (nextOrgElement == undefined) {
                    return;
                }

                switch (nextOrgElement.type) {
                    case 'inbufferOption':
                        var key = nextOrgElement.name.toUpperCase();
                        var value = nextOrgElement.value.trim();

                        // inbuffer options always go at the root
                        orgTree.settings[key] = value;
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
                                } else {
                                    // In case the headline level is deeper in the tree,
                                    // add it as part of the elements from the tree.
                                    currentOrgNode = _.intoElement(nextOrgElement, currentOrgNode);
                                }
                                break;
                            case 'paragraph':
                                currentOrgNode = _.fromElementIntoHeadline(currentOrgNode, nextOrgElement);
                                break;
                            default:
                                currentOrgNode = _.intoElement(nextOrgElement, currentOrgNode);
                                break;
                        }
                        break;
                        // next type break

                        // Empty lines are a common termination symbol for a token
                        // here we need to check on which accumulation mode are we
                    case 'emptyLine':
                        if (nextOrgElement.type !== 'emptyLine')

                        // consider the line but do not add into the tree
                            switch (currentOrgNode) {
                            case 'paragraph': // just add an empty line
                                currentOrgNode.rawContent += "\n";
                                break;
                            default:

                                break;
                        }
                        break;
                        // next type break

                    case 'paragraph':

                        switch (nextOrgElement.type) {
                            case 'paragraph':

                                // in case currently it is a paragraph: append the contents
                                if (currentOrgNode.type == 'paragraph') {
                                    currentOrgNode.rawContent += nextOrgElement.rawContent + "\n";
                                } else {
                                    currentOrgNode = _.intoElement(nextOrgElement, currentOrgNode);
                                }
                                break;

                            default:
                                break
                        }
                        break;
                        // next type break

                    case 'unknown':
                        // TODO
                        break;
                };
            });

            return orgTree;
        },


    };

    return self.OrgJS;
})();


if (typeof module !== 'undefined' && module.exports) {
    module.exports = OrgJS;
} else if (typeof window !== 'undefined') {
    window.OrgJS = OrgJS;
}