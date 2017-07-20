function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      __renderer = __helpers.r,
      _________node_modules_marko_layout_placeholder_tag_js = __renderer(require("marko-layout/placeholder-tag")),
      __tag = __helpers.t;

  return function render(data, out) {
    out.w('<header class="main-header">');
    __tag(out,
      _________node_modules_marko_layout_placeholder_tag_js,
      {
        "name": "profileImage",
        "content": data.layoutContent
      },
      function(out) {
      });
    __tag(out,
      _________node_modules_marko_layout_placeholder_tag_js,
      {
        "name": "name",
        "content": data.layoutContent
      },
      function(out) {
      });

    out.w('</header>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);