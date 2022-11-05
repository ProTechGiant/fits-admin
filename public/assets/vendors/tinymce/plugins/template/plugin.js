/* eslint-disable no-undef */
/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.7.0 (2021-02-10)
 */
(function () {
  "use strict";

  let global = tinymce.util.Tools.resolve("tinymce.PluginManager");

  let noop = function () {};
  let constant = function (value) {
    return function () {
      return value;
    };
  };
  function curry(fn) {
    let initialArgs = [];
    for (let _i = 1; _i < arguments.length; _i++) {
      initialArgs[_i - 1] = arguments[_i];
    }
    return function () {
      let restArgs = [];
      for (let _i = 0; _i < arguments.length; _i++) {
        restArgs[_i] = arguments[_i];
      }
      let all = initialArgs.concat(restArgs);
      return fn.apply(null, all);
    };
  }
  let never = constant(false);
  let always = constant(true);

  let global$1 = tinymce.util.Tools.resolve("tinymce.util.Tools");

  let global$2 = tinymce.util.Tools.resolve("tinymce.util.XHR");

  let getCreationDateClasses = function (editor) {
    return editor.getParam("template_cdate_classes", "cdate");
  };
  let getModificationDateClasses = function (editor) {
    return editor.getParam("template_mdate_classes", "mdate");
  };
  let getSelectedContentClasses = function (editor) {
    return editor.getParam("template_selected_content_classes", "selcontent");
  };
  let getPreviewReplaceValues = function (editor) {
    return editor.getParam("template_preview_replace_values");
  };
  let getContentStyle = function (editor) {
    return editor.getParam("content_style", "", "string");
  };
  let shouldUseContentCssCors = function (editor) {
    return editor.getParam("content_css_cors", false, "boolean");
  };
  let getTemplateReplaceValues = function (editor) {
    return editor.getParam("template_replace_values");
  };
  let getTemplates = function (editor) {
    return editor.getParam("templates");
  };
  let getCdateFormat = function (editor) {
    return editor.getParam(
      "template_cdate_format",
      editor.translate("%Y-%m-%d")
    );
  };
  let getMdateFormat = function (editor) {
    return editor.getParam(
      "template_mdate_format",
      editor.translate("%Y-%m-%d")
    );
  };
  let getBodyClassFromHash = function (editor) {
    let bodyClass = editor.getParam("body_class", "", "hash");
    return bodyClass[editor.id] || "";
  };
  let getBodyClass = function (editor) {
    let bodyClass = editor.getParam("body_class", "", "string");
    if (bodyClass.indexOf("=") === -1) {
      return bodyClass;
    } else {
      return getBodyClassFromHash(editor);
    }
  };

  let addZeros = function (value, len) {
    value = "" + value;
    if (value.length < len) {
      for (let i = 0; i < len - value.length; i++) {
        value = "0" + value;
      }
    }
    return value;
  };
  let getDateTime = function (editor, fmt, date) {
    let daysShort = "Sun Mon Tue Wed Thu Fri Sat Sun".split(" ");
    let daysLong =
      "Sunday Monday Tuesday Wednesday Thursday Friday Saturday Sunday".split(
        " "
      );
    let monthsShort = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(
      " "
    );
    let monthsLong =
      "January February March April May June July August September October November December".split(
        " "
      );
    date = date || new Date();
    fmt = fmt.replace("%D", "%m/%d/%Y");
    fmt = fmt.replace("%r", "%I:%M:%S %p");
    fmt = fmt.replace("%Y", "" + date.getFullYear());
    fmt = fmt.replace("%y", "" + date.getYear());
    fmt = fmt.replace("%m", addZeros(date.getMonth() + 1, 2));
    fmt = fmt.replace("%d", addZeros(date.getDate(), 2));
    fmt = fmt.replace("%H", "" + addZeros(date.getHours(), 2));
    fmt = fmt.replace("%M", "" + addZeros(date.getMinutes(), 2));
    fmt = fmt.replace("%S", "" + addZeros(date.getSeconds(), 2));
    fmt = fmt.replace("%I", "" + (((date.getHours() + 11) % 12) + 1));
    fmt = fmt.replace("%p", "" + (date.getHours() < 12 ? "AM" : "PM"));
    fmt = fmt.replace("%B", "" + editor.translate(monthsLong[date.getMonth()]));
    fmt = fmt.replace(
      "%b",
      "" + editor.translate(monthsShort[date.getMonth()])
    );
    fmt = fmt.replace("%A", "" + editor.translate(daysLong[date.getDay()]));
    fmt = fmt.replace("%a", "" + editor.translate(daysShort[date.getDay()]));
    fmt = fmt.replace("%%", "%");
    return fmt;
  };

  let createTemplateList = function (editor, callback) {
    return function () {
      let templateList = getTemplates(editor);
      if (typeof templateList === "function") {
        templateList(callback);
        return;
      }
      if (typeof templateList === "string") {
        global$2.send({
          url: templateList,
          success: function (text) {
            callback(JSON.parse(text));
          },
        });
      } else {
        callback(templateList);
      }
    };
  };
  let replaceTemplateValues = function (html, templateValues) {
    global$1.each(templateValues, function (v, k) {
      if (typeof v === "function") {
        v = v(k);
      }
      html = html.replace(new RegExp("\\{\\$" + k + "\\}", "g"), v);
    });
    return html;
  };
  let replaceVals = function (editor, e) {
    let dom = editor.dom,
      vl = getTemplateReplaceValues(editor);
    global$1.each(dom.select("*", e), function (e) {
      global$1.each(vl, function (v, k) {
        if (dom.hasClass(e, k)) {
          if (typeof vl[k] === "function") {
            vl[k](e);
          }
        }
      });
    });
  };
  let hasClass = function (n, c) {
    return new RegExp("\\b" + c + "\\b", "g").test(n.className);
  };
  let insertTemplate = function (editor, _ui, html) {
    let el;
    let dom = editor.dom;
    let sel = editor.selection.getContent();
    html = replaceTemplateValues(html, getTemplateReplaceValues(editor));
    el = dom.create("div", null, html);
    let n = dom.select(".mceTmpl", el);
    if (n && n.length > 0) {
      el = dom.create("div", null);
      el.appendChild(n[0].cloneNode(true));
    }
    global$1.each(dom.select("*", el), function (n) {
      if (hasClass(n, getCreationDateClasses(editor).replace(/\s+/g, "|"))) {
        n.innerHTML = getDateTime(editor, getCdateFormat(editor));
      }
      if (
        hasClass(n, getModificationDateClasses(editor).replace(/\s+/g, "|"))
      ) {
        n.innerHTML = getDateTime(editor, getMdateFormat(editor));
      }
      if (hasClass(n, getSelectedContentClasses(editor).replace(/\s+/g, "|"))) {
        n.innerHTML = sel;
      }
    });
    replaceVals(editor, el);
    editor.execCommand("mceInsertContent", false, el.innerHTML);
    editor.addVisual();
  };

  let register = function (editor) {
    editor.addCommand("mceInsertTemplate", curry(insertTemplate, editor));
  };

  let setup = function (editor) {
    editor.on("PreProcess", function (o) {
      let dom = editor.dom,
        dateFormat = getMdateFormat(editor);
      global$1.each(dom.select("div", o.node), function (e) {
        if (dom.hasClass(e, "mceTmpl")) {
          global$1.each(dom.select("*", e), function (e) {
            if (
              dom.hasClass(
                e,
                getModificationDateClasses(editor).replace(/\s+/g, "|")
              )
            ) {
              e.innerHTML = getDateTime(editor, dateFormat);
            }
          });
          replaceVals(editor, e);
        }
      });
    });
  };

  let none = function () {
    return NONE;
  };
  let NONE = (function () {
    let eq = function (o) {
      return o.isNone();
    };
    let call = function (thunk) {
      return thunk();
    };
    let id = function (n) {
      return n;
    };
    let me = {
      fold: function (n, _s) {
        return n();
      },
      is: never,
      isSome: never,
      isNone: always,
      getOr: id,
      getOrThunk: call,
      getOrDie: function (msg) {
        throw new Error(msg || "error: getOrDie called on none.");
      },
      getOrNull: constant(null),
      getOrUndefined: constant(undefined),
      or: id,
      orThunk: call,
      map: none,
      each: noop,
      bind: none,
      exists: never,
      forall: always,
      filter: none,
      equals: eq,
      equals_: eq,
      toArray: function () {
        return [];
      },
      toString: constant("none()"),
    };
    return me;
  })();
  let some = function (a) {
    let constant_a = constant(a);
    let self = function () {
      return me;
    };
    let bind = function (f) {
      return f(a);
    };
    let me = {
      fold: function (_n, s) {
        return s(a);
      },
      is: function (v) {
        return a === v;
      },
      isSome: always,
      isNone: never,
      getOr: constant_a,
      getOrThunk: constant_a,
      getOrDie: constant_a,
      getOrNull: constant_a,
      getOrUndefined: constant_a,
      or: self,
      orThunk: self,
      map: function (f) {
        return some(f(a));
      },
      each: function (f) {
        f(a);
      },
      bind: bind,
      exists: bind,
      forall: bind,
      filter: function (f) {
        return f(a) ? me : NONE;
      },
      toArray: function () {
        return [a];
      },
      toString: function () {
        return "some(" + a + ")";
      },
      equals: function (o) {
        return o.is(a);
      },
      equals_: function (o, elementEq) {
        return o.fold(never, function (b) {
          return elementEq(a, b);
        });
      },
    };
    return me;
  };
  let from = function (value) {
    return value === null || value === undefined ? NONE : some(value);
  };
  let Optional = {
    some: some,
    none: none,
    from: from,
  };

  let map = function (xs, f) {
    let len = xs.length;
    let r = new Array(len);
    for (let i = 0; i < len; i++) {
      let x = xs[i];
      r[i] = f(x, i);
    }
    return r;
  };
  let findUntil = function (xs, pred, until) {
    for (let i = 0, len = xs.length; i < len; i++) {
      let x = xs[i];
      if (pred(x, i)) {
        return Optional.some(x);
      } else if (until(x, i)) {
        break;
      }
    }
    return Optional.none();
  };
  let find = function (xs, pred) {
    return findUntil(xs, pred, never);
  };

  let global$3 = tinymce.util.Tools.resolve("tinymce.Env");

  let global$4 = tinymce.util.Tools.resolve("tinymce.util.Promise");

  let hasOwnProperty = Object.hasOwnProperty;
  let get = function (obj, key) {
    return has(obj, key) ? Optional.from(obj[key]) : Optional.none();
  };
  let has = function (obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  let entitiesAttr = {
    '"': "&quot;",
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&#039;",
  };
  let htmlEscape = function (html) {
    return html.replace(/["'<>&]/g, function (match) {
      return get(entitiesAttr, match).getOr(match);
    });
  };

  let getPreviewContent = function (editor, html) {
    if (html.indexOf("<html>") === -1) {
      let contentCssEntries_1 = "";
      let contentStyle = getContentStyle(editor);
      let cors_1 = shouldUseContentCssCors(editor)
        ? ' crossorigin="anonymous"'
        : "";
      global$1.each(editor.contentCSS, function (url) {
        contentCssEntries_1 +=
          '<link type="text/css" rel="stylesheet" href="' +
          editor.documentBaseURI.toAbsolute(url) +
          '"' +
          cors_1 +
          ">";
      });
      if (contentStyle) {
        contentCssEntries_1 +=
          '<style type="text/css">' + contentStyle + "</style>";
      }
      let bodyClass = getBodyClass(editor);
      let encode = editor.dom.encode;
      let isMetaKeyPressed = global$3.mac
        ? "e.metaKey"
        : "e.ctrlKey && !e.altKey";
      let preventClicksOnLinksScript =
        "<script>" +
        'document.addEventListener && document.addEventListener("click", function(e) {' +
        "for (let elm = e.target; elm; elm = elm.parentNode) {" +
        'if (elm.nodeName === "A" && !(' +
        isMetaKeyPressed +
        ")) {" +
        "e.preventDefault();" +
        "}" +
        "}" +
        "}, false);" +
        "</script> ";
      let directionality = editor.getBody().dir;
      let dirAttr = directionality
        ? ' dir="' + encode(directionality) + '"'
        : "";
      html =
        "<!DOCTYPE html>" +
        "<html>" +
        "<head>" +
        '<base href="' +
        encode(editor.documentBaseURI.getURI()) +
        '">' +
        contentCssEntries_1 +
        preventClicksOnLinksScript +
        "</head>" +
        '<body class="' +
        encode(bodyClass) +
        '"' +
        dirAttr +
        ">" +
        html +
        "</body>" +
        "</html>";
    }
    return replaceTemplateValues(html, getPreviewReplaceValues(editor));
  };
  let open = function (editor, templateList) {
    let createTemplates = function () {
      if (!templateList || templateList.length === 0) {
        let message = editor.translate("No templates defined.");
        editor.notificationManager.open({
          text: message,
          type: "info",
        });
        return Optional.none();
      }
      return Optional.from(
        global$1.map(templateList, function (template, index) {
          let isUrlTemplate = function (t) {
            return t.url !== undefined;
          };
          return {
            selected: index === 0,
            text: template.title,
            value: {
              url: isUrlTemplate(template)
                ? Optional.from(template.url)
                : Optional.none(),
              content: !isUrlTemplate(template)
                ? Optional.from(template.content)
                : Optional.none(),
              description: template.description,
            },
          };
        })
      );
    };
    let createSelectBoxItems = function (templates) {
      return map(templates, function (t) {
        return {
          text: t.text,
          value: t.text,
        };
      });
    };
    let findTemplate = function (templates, templateTitle) {
      return find(templates, function (t) {
        return t.text === templateTitle;
      });
    };
    let loadFailedAlert = function (api) {
      editor.windowManager.alert(
        "Could not load the specified template.",
        function () {
          return api.focus("template");
        }
      );
    };
    let getTemplateContent = function (t) {
      return new global$4(function (resolve, reject) {
        t.value.url.fold(
          function () {
            return resolve(t.value.content.getOr(""));
          },
          function (url) {
            return global$2.send({
              url: url,
              success: function (html) {
                resolve(html);
              },
              error: function (e) {
                reject(e);
              },
            });
          }
        );
      });
    };
    let onChange = function (templates, updateDialog) {
      return function (api, change) {
        if (change.name === "template") {
          let newTemplateTitle = api.getData().template;
          findTemplate(templates, newTemplateTitle).each(function (t) {
            api.block("Loading...");
            getTemplateContent(t)
              .then(function (previewHtml) {
                updateDialog(api, t, previewHtml);
              })
              .catch(function () {
                updateDialog(api, t, "");
                api.disable("save");
                loadFailedAlert(api);
              });
          });
        }
      };
    };
    let onSubmit = function (templates) {
      return function (api) {
        let data = api.getData();
        findTemplate(templates, data.template).each(function (t) {
          getTemplateContent(t)
            .then(function (previewHtml) {
              insertTemplate(editor, false, previewHtml);
              api.close();
            })
            .catch(function () {
              api.disable("save");
              loadFailedAlert(api);
            });
        });
      };
    };
    let openDialog = function (templates) {
      let selectBoxItems = createSelectBoxItems(templates);
      let buildDialogSpec = function (bodyItems, initialData) {
        return {
          title: "Insert Template",
          size: "large",
          body: {
            type: "panel",
            items: bodyItems,
          },
          initialData: initialData,
          buttons: [
            {
              type: "cancel",
              name: "cancel",
              text: "Cancel",
            },
            {
              type: "submit",
              name: "save",
              text: "Save",
              danger: true,
            },
          ],
          onSubmit: onSubmit(templates),
          onChange: onChange(templates, updateDialog),
        };
      };
      let updateDialog = function (dialogApi, template, previewHtml) {
        let content = getPreviewContent(editor, previewHtml);
        let bodyItems = [
          {
            type: "selectbox",
            name: "template",
            label: "Templates",
            items: selectBoxItems,
          },
          {
            type: "htmlpanel",
            html:
              '<p aria-live="polite">' +
              htmlEscape(template.value.description) +
              "</p>",
          },
          {
            label: "Preview",
            type: "iframe",
            name: "preview",
            sandboxed: false,
          },
        ];
        let initialData = {
          template: template.text,
          preview: content,
        };
        dialogApi.unblock();
        dialogApi.redial(buildDialogSpec(bodyItems, initialData));
        dialogApi.focus("template");
      };
      let dialogApi = editor.windowManager.open(
        buildDialogSpec([], {
          template: "",
          preview: "",
        })
      );
      dialogApi.block("Loading...");
      getTemplateContent(templates[0])
        .then(function (previewHtml) {
          updateDialog(dialogApi, templates[0], previewHtml);
        })
        .catch(function () {
          updateDialog(dialogApi, templates[0], "");
          dialogApi.disable("save");
          loadFailedAlert(dialogApi);
        });
    };
    let optTemplates = createTemplates();
    optTemplates.each(openDialog);
  };

  let showDialog = function (editor) {
    return function (templates) {
      open(editor, templates);
    };
  };
  let register$1 = function (editor) {
    editor.ui.registry.addButton("template", {
      icon: "template",
      tooltip: "Insert template",
      onAction: createTemplateList(editor, showDialog(editor)),
    });
    editor.ui.registry.addMenuItem("template", {
      icon: "template",
      text: "Insert template...",
      onAction: createTemplateList(editor, showDialog(editor)),
    });
  };

  function Plugin() {
    global.add("template", function (editor) {
      register$1(editor);
      register(editor);
      setup(editor);
    });
  }

  Plugin();
})();
