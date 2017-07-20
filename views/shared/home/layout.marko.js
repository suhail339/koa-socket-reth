function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      __loadTemplate = __helpers.l,
      __header_marko = __loadTemplate(require.resolve("./header.marko"), require),
      __footer_marko = __loadTemplate(require.resolve("./footer.marko"), require),
      __renderer = __helpers.r,
      _________node_modules_marko_layout_use_tag_js = __renderer(require("marko-layout/use-tag")),
      __tag = __helpers.t,
      _________node_modules_marko_layout_placeholder_tag_js = __renderer(require("marko-layout/placeholder-tag"));

  return function render(data, out) {
    out.w('<!DOCTYPE html> <html><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><title>Demo App</title><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><script src="https://code.jquery.com/jquery-3.2.1.js" integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE=" crossorigin="anonymous"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" crossorigin="anonymous"></script></head><body>');
    __tag(out,
      _________node_modules_marko_layout_use_tag_js,
      {
        "template": __header_marko
      });
    __tag(out,
      _________node_modules_marko_layout_placeholder_tag_js,
      {
        "name": "body",
        "content": data.layoutContent
      });
    __tag(out,
      _________node_modules_marko_layout_use_tag_js,
      {
        "template": __footer_marko
      });

    out.w('</body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);