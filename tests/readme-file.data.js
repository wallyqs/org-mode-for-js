module.exports = "#+TITLE: Features that an Org mode implementation would cover\n" +
"\n" +
"*** headlines\n" +
"\n" +
"**** [0%] Simple examples\n" +
"\n" +
"  - [ ] levels\n" +
"    #+BEGIN_SRC org :tangle headlines/levels.org :mkdirp true\n" +
"    * First level headline\n" +
"\n" +
"    ** Second level headline\n" +
"\n" +
"    *** Third level headline\n" +
"\n" +
"    * Second first level headline\n" +
"\n" +
"    ** Second second level headline\n" +
"\n" +
"    ** Second second level headline again\n" +
"\n" +
"    *** Second third level headline\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] content\n" +
"    #+BEGIN_SRC org :tangle headlines/content.org\n" +
"\n" +
"    * 1.1\n" +
"\n" +
"    First paragraph.\n" +
"\n" +
"    ** 1.2\n" +
"\n" +
"    Second paragraph\n" +
"\n" +
"    * 2.1\n" +
"\n" +
"    First paragraph of second section.\n" +
"\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] commented\n" +
"    #+BEGIN_SRC org :tangle headlines/commented.org\n" +
"    * COMMENT Example\n" +
"\n" +
"    ** Not rendered\n" +
"\n" +
"    * This one is rendered\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] tags\n" +
"    #+BEGIN_SRC org :tangle headlines/tags.org\n" +
"    * Example :hello:\n" +
"    ** No tags\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] todo keyword\n" +
"    #+BEGIN_SRC org :tangle headlines/default-todo.org\n" +
"    * TODO Hello world\n" +
"    ** No todo\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] progress\n" +
"    * as a fraction\n" +
"    #+BEGIN_SRC org :tangle headlines/progress-fraction.org\n" +
"    * [0/1] Some goal\n" +
"    ** TODO Finish\n" +
"    #+END_SRC\n" +
"\n" +
"    * as a percentage\n" +
"    #+BEGIN_SRC org :tangle headlines/progress-percentage.org\n" +
"    * [%0] Some goal\n" +
"    ** TODO Finish\n" +
"    #+END_SRC\n" +
"\n" +
"**** [0%] Complex examples\n" +
"\n" +
"  - [ ] Commented headlines\n" +
"\n" +
"    #+BEGIN_SRC org :tangle headlines/commented-subtrees.org\n" +
"    #+TITLE: Commented headlines\n" +
"    #+startup: showeverything\n" +
"\n" +
"    * Headline 1\n" +
"\n" +
"    ** Headline 2\n" +
"\n" +
"    *** Headline 3\n" +
"\n" +
"    ** COMMENT Headline 4 not exported\n" +
"\n" +
"    *** Headline 5 not exported either\n" +
"\n" +
"    **** Headline 6 not exported either\n" +
"\n" +
"    ** Headline 7 is exported\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] Custom todo keywords\n" +
"\n" +
"    #+BEGIN_SRC org :tangle headlines/custom-todo.org\n" +
"    #+TODO: TODO | DONE CANCELED\n" +
"    #+OPTIONS: todo:t\n" +
"\n" +
"    * DONE Default keyword\n" +
"\n" +
"    * CANCELED Custom keyword\n" +
"\n" +
"    * TODO Default keyword\n" +
"    #+END_SRC\n" +
"\n" +
"*** basic markup\n" +
"\n" +
"**** [0%] Simple examples\n" +
"\n" +
"  - [ ] top level section\n" +
"    #+BEGIN_SRC org :tangle headlines/toplevel.org\n" +
"    #+TITLE: Toplevel section\n" +
"    \n" +
"    Example paragraph outside of a headline\n" +
"    \n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] italic\n" +
"    #+BEGIN_SRC org :tangle markup/italic.org\n" +
"    This is /italic/\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] bold\n" +
"    #+BEGIN_SRC org :tangle markup/bold.org\n" +
"    This is *bold*\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] inline code\n" +
"    #+BEGIN_SRC org :tangle markup/inline-code.org\n" +
"    This is =inline code=\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] verbatim\n" +
"    #+BEGIN_SRC org :tangle markup/hello.org\n" +
"    This is ~verbatim~\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] comments\n" +
"    #+BEGIN_SRC org :tangle markup/comments.org\n" +
"    # Like this should be kept in the tree\n" +
"    # not thrown away!\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] underline\n" +
"    #+BEGIN_SRC org :tangle markup/underline.org\n" +
"    This is _underline_\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] superscript\n" +
"    #+BEGIN_SRC org :tangle markup/superscript.org\n" +
"    Example^2\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] subscript\n" +
"    #+BEGIN_SRC org :tangle markup/subscript.org\n" +
"    Example_1\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] links\n" +
"    #+BEGIN_SRC org :tangle markup/links.org\n" +
"    [[http://www.google.com][www.google.com]]\n" +
"    <https://google.com>\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] footnotes\n" +
"\n" +
"  - [ ] code paragraph (not a block)\n" +
"    #+BEGIN_SRC org :tangle markup/code-paragraph.org\n" +
"    : example\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] horizontal rule\n" +
"    #+BEGIN_SRC org :tangle markup/horizontal-rule.org\n" +
"    hello\n" +
"    ----\n" +
"    world\n" +
"    #+END_SRC\n" +
"\n" +
"**** TODO Complex examples\n" +
"\n" +
"# Add the examples where everything is mixed\n" +
"\n" +
"*** blocks\n" +
"\n" +
"**** [0%] Simple examples\n" +
"\n" +
"  - [ ] src block\n" +
"    #+BEGIN_SRC org :tangle blocks/src-with-results.org\n" +
"    #+name: hello\n" +
"    #+header: :results output code\n" +
"    #+BEGIN_SRC sh\n" +
"    echo \"hello\"\n" +
"    #+END_SRC\n" +
"    \n" +
"    #+RESULTS: hello\n" +
"    #+BEGIN_SRC sh\n" +
"    hello\n" +
"    #+END_SRC\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] src block results\n" +
"    #+BEGIN_SRC org :tangle blocks/src-results-only.org\n" +
"    #+RESULTS: hello\n" +
"    #+BEGIN_SRC sh\n" +
"    hello\n" +
"    #+END_SRC\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] src syntax highlighting\n" +
"\n" +
"  - [ ] example block\n" +
"    #+BEGIN_SRC org :tangle blocks/example.org\n" +
"    #+BEGIN_EXAMPLE\n" +
"    echo \"hello world?\"\n" +
"    #+END_EXAMPLE\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] quote block\n" +
"    #+BEGIN_SRC org :tangle blocks/quote.org\n" +
"    #+BEGIN_QUOTE\n" +
"    Some quote\n" +
"    #+END_QUOTE\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] centered block\n" +
"\n" +
"  - [ ] html blocks\n" +
"\n" +
"**** [0%] Complex examples\n" +
"\n" +
"  - [ ] quote block with embedded src code block\n" +
"    #+BEGIN_SRC org :tangle blocks/quote-with-markup.org\n" +
"    #+BEGIN_QUOTE\n" +
"     \n" +
"     Quote begins, but then gets a headline:\n" +
"     \n" +
"     * Example\n" +
"     ** Subheadlines here\n" +
"     \n" +
"     : This is blockquote text.\n" +
"     \n" +
"     ** What happens with this?\n" +
"     \n" +
"     #+begin_src ruby :results output\n" +
"     puts \"Hello world\"\n" +
"     #+end_src\n" +
"     \n" +
"    #+END_QUOTE\n" +
"    #+END_SRC\n" +
"\n" +
"*** lists\n" +
"\n" +
"**** [0%] Simple examples\n" +
"  - [ ] hyphen sign as the first level character\n" +
"   #+BEGIN_SRC org :tangle lists/hyphen.org\n" +
"   - example\n" +
"   #+END_SRC\n" +
"\n" +
"  - [ ] plus sign as the first level character\n" +
"   #+BEGIN_SRC org :tangle lists/asterisk.org\n" +
"   + first level\n" +
"     + example\n" +
"   #+END_SRC\n" +
"\n" +
"  - [ ] subtrees with asterisk\n" +
"   #+BEGIN_SRC org :tangle lists/asterisk.org\n" +
"   - first level\n" +
"     * example\n" +
"   #+END_SRC\n" +
"\n" +
"  - [ ] progress\n" +
"    * with percentage\n" +
"      #+BEGIN_SRC org :tangle lists/progress-percentage.org\n" +
"      - [100%] Done?\n" +
"       + [X] Done!\n" +
"      #+END_SRC\n" +
"    * with fraction\n" +
"      #+BEGIN_SRC org :tangle lists/progress-fraction.org\n" +
"      - [1/1] Done?\n" +
"       + [X] Done!\n" +
"      #+END_SRC\n" +
"\n" +
"  - [ ] definition lists\n" +
"    #+BEGIN_SRC org :tangle lists/definition-list.org\n" +
"    - hello :: world\n" +
"    - hoge  :: hoge\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] numbered lists\n" +
"    * style 1\n" +
"      #+BEGIN_SRC org :tangle lists/numbered-list-style-1.org\n" +
"      1. one\n" +
"      2. two\n" +
"      #+END_SRC\n" +
"    * style 2\n" +
"      #+BEGIN_SRC org :tangle lists/numbered-list-style-2.org\n" +
"      1) one\n" +
"      2) two\n" +
"      #+END_SRC\n" +
"\n" +
"**** TODO Complex examples\n" +
"*** properties drawer\n" +
"\n" +
"**** [0%] Simple examples\n" +
"\n" +
"  - [ ] id\n" +
"    #+BEGIN_SRC org :tangle properties/id.org\n" +
"    * Example\n" +
"    :PROPERTIES:\n" +
"    :id: 1\n" +
"    :end:\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] clocks\n" +
"    #+BEGIN_SRC org :tangle properties/clocks.org\n" +
"    * A clock example\n" +
"    :PROPERTIES:\n" +
"    :ORDERED:  t\n" +
"    :END:\n" +
"    CLOCK: [2014-11-07 Fri 13:14]--[2014-11-07 Fri 14:12] =>  0:58\n" +
"    \n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] deadline\n" +
"\n" +
"*** special keywords\n" +
"\n" +
"**** [0%] in buffer settings\n" +
"\n" +
"  - [ ] title and author\n" +
"    #+BEGIN_SRC org :tangle options/title.org\n" +
"    #+title:  Document title!\n" +
"    #+author: Waldemar Quevedo\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] custom todo keywords\n" +
"    #+BEGIN_SRC org :tangle options/custom-todo.org\n" +
"    #+todo:  TODO | DONE CANCELED\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] setupfile\n" +
"    #+BEGIN_SRC org :tangle options/setupfile.org\n" +
"    #+setupfile: \"setup.org\"\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] startup\n" +
"    #+BEGIN_SRC org :tangle options/startup.org\n" +
"    #+startup: showeverything\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] option keyword set by user\n" +
"    #+BEGIN_SRC org :tangle options/user-keyword.org\n" +
"    #+category: posts\n" +
"    #+END_SRC\n" +
"\n" +
"**** [0%] macros\n" +
"\n" +
"  - [ ] simple\n" +
"    #+BEGIN_SRC org :tangle macros/basic.org\n" +
"    #+macro: \"hello\" world\n" +
"    #+END_SRC\n" +
"\n" +
"**** [0%] includes\n" +
"\n" +
"  - [ ] Just the file\n" +
"    #+BEGIN_SRC org :tangle includes/hello.org :mkdirp true\n" +
"    Hello world\n" +
"    #+END_SRC\n" +
"\n" +
"    #+BEGIN_SRC org :tangle includes/include-raw-file.org\n" +
"    #+include: \"org/hello.org\"\n" +
"    #+END_SRC\n" +
"\n" +
"*** options\n" +
"\n" +
"**** [0%] Simple examples\n" +
"\n" +
"  - [ ] show todo keywords\n" +
"    #+BEGIN_SRC org :tangel options/todo.org\n" +
"    #+options: todo:t\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] do not render superscript or subscript\n" +
"    #+BEGIN_SRC org :tangle options/superscript-and-subscript.org\n" +
"    #+options: ^:nil\n" +
"\n" +
"    Example_1\n" +
"    Example^2\n" +
"    #+END_SRC\n" +
"\n" +
"**** [0%] Complex examples\n" +
"\n" +
"- [ ] TODO\n" +
"\n" +
"*** tables\n" +
"\n" +
"**** [0%] Simple examples\n" +
"\n" +
"  - [ ] Basic table\n" +
"    #+BEGIN_SRC org :tangle tables/simple.org\n" +
"     | fruits | quantitity |\n" +
"     | apple  | 1          |\n" +
"     | orange | 3          |\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] Tables formulas\n" +
"    #+BEGIN_SRC org :tangle tables/formulas.org\n" +
"     | fruits |     quantity  |\n" +
"     | apple  |            1  |\n" +
"     | orange |            3  |\n" +
"     | TOTAL  | =vsum(@2..@3) |\n" +
"    #+END_SRC\n" +
"\n" +
"  - [ ] Evaluated table formula\n" +
"    #+BEGIN_SRC org :tangle tables/evaluated-formula.org\n" +
"     | fruits |      quantity |\n" +
"     | apple  |             1 |\n" +
"     | orange |             3 |\n" +
"     | TOTAL  |             4 |\n" +
"     #+TBLFM: $2=vsum(@1..@3)\n" +
"    #+END_SRC\n" +
"\n" +
"\n";