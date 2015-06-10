//===========================================================================//
//            _      _    _ _ _    _____                     _               //
//           | |    | |  (_) | |  / ____|                   | |              //
//           | | ___| | ___| | | | (___   ___  __ _ _ __ ___| |__            //
//       _   | |/ _ \ |/ / | | |  \___ \ / _ \/ _` | '__/ __| '_ \           //
//      | |__| |  __/   <| | | |  ____) |  __/ (_| | | | (__| | | |          //
//       \____/ \___|_|\_\_|_|_| |_____/ \___|\__,_|_|  \___|_| |_|          //
//                    / ____|         | |                                    //
//                   | (___  _   _ ___| |_ ___ _ __ ___                      //
//                    \___ \| | | / __| __/ _ \ '_ ` _ \                     //
//                    ____) | |_| \__ \ ||  __/ | | | | |                    //
//                   |_____/ \__, |___/\__\___|_| |_| |_|                    //
//                            __/ |                                          //
//                           |___/                                           //
//                                                                           //
//===========================================================================//
//                                                                           //
//           Created by Tibor Simon based on Christian Fei's work            //
//                  Tibor Simon 2015 all rights reserved                     //
//                                                                           //
//                              MIT License                                  //
//                                                                           //
//===========================================================================//
//         N A V I G A T I O N   A N D   E V E N T   H A N D L I N G         //
//===========================================================================//

var current = null;
var wraparound = true;
function get_next() {
    if (current == null) {
        current = $('.focusable').first();
    } else {
        if (!current.is($('.focusable').last())) {
            current = current.next('.focusable');
        } else {
            if (wraparound) {
                current = $('.focusable').first();
            }
        }
    }
    return current;
}
function get_prev() {
    if (current == null) {
        current = $('.focusable').last();
    } else {
        if (!current.is($('.focusable').first())) {
            current = current.prev('.focusable');
        } else {
            if (wraparound) {
                current = $('.focusable').last();
            }
        }
    }
    return current;
}
function invalidate_selection() {
    if (current != null) {
        current.removeClass('selected');
        current = null;
    }
}
function select_next() {
    if (current != null) {
        current.removeClass('selected');
    }
    current = get_next().addClass('selected');
}
function select_prev() {
    if (current != null) {
        current.removeClass('selected');
    }
    current = get_prev().addClass('selected');
}
function goto_current_link() {
    window.open(current.find('a').attr('href'),'_self');
}
function finishSearch() {
    $('#results-container').delay(2).html('');
    $('#search-input').delay(2).val('');
    $('#search-input').delay(2).blur();
}
$(window).keydown(function (e) {
    if ($('#search-input').is(":focus")) {
      if (e.which === 40) { // down
          select_next();
      } else if (e.which === 38) { // up
          select_prev();
      } else if (e.which === 27) { // esc
          finishSearch();
          invalidate_selection();
      } else if (e.which === 13) { // enter
          finishSearch();
          goto_current_link();
      } else {
          invalidate_selection();
      }
    }
});



//===========================================================================//
//                   S E A R C H   E N G I N E  C O D E                      //
//===========================================================================//

! function t(n, e, r) {
    function o(u, c) {
        if (!e[u]) {
            if (!n[u]) {
                var a = "function" == typeof require && require;
                if (!c && a) return a(u, !0);
                if (i) return i(u, !0);
                throw new Error("Cannot find module '" + u + "'")
            }
            var f = e[u] = {
                exports: {}
            };
            n[u][0].call(f.exports, function(t) {
                var e = n[u][1][t];
                return o(e ? e : t)
            }, f, f.exports, t, n, e, r)
        }
        return e[u].exports
    }
    for (var i = "function" == typeof require && require, u = 0; u < r.length; u++) o(r[u]);
    return o
}({
    1: [function(t, n) {
        n.exports = function() {
            function t(t) {
                return 200 == t.status && 4 == t.readyState
            }

            function n(n, e) {
                n.onreadystatechange = function() {
                    if (t(n)) try {
                        e(null, JSON.parse(n.responseText))
                    } catch (r) {
                        e(r, null)
                    }
                }
            }
            var e = this;
            e.load = function(t, e) {
                var r = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
                r.open("GET", t, !0), n(r, e), r.send()
            }
        }
    }, {}],
    2: [function(t, n) {
        function e() {
            function t(t) {
                return new RegExp(t.split("").join(".*?"), "gi")
            }
            var n = this;
            n.matches = function(n, e) {
                return "string" != typeof n ? !1 : (n = n.trim(), !!n.match(t(e)))
            }
        }
        n.exports = new e
    }, {}],
    3: [function(t, n) {
        function e() {
            function t(t, n) {
                return t.toLowerCase().indexOf(n.toLowerCase()) >= 0
            }
            var n = this;
            n.matches = function(n, e) {
                return "string" != typeof n ? !1 : (n = n.trim(), t(n, e))
            }
        }
        n.exports = new e
    }, {}],
    4: [function(t, n) {
        n.exports = function() {
            function n(t, n, r) {
                for (var o = t.get(), u = 0; u < o.length && i.length < c; u++) e(o[u], n, r);
                return i
            }

            function e(t, n, e) {
                for (var r in t)
                    if (e.matches(t[r], n)) {
                        i.push(t);
                        break
                    }
            }

            function r() {
                return u ? a : f
            }
            var o = this,
                i = [],
                u = !1,
                c = 10,
                a = t("./SearchStrategies/fuzzy"),
                f = t("./SearchStrategies/literal");
            o.setFuzzy = function(t) {
                u = !!t
            }, o.setLimit = function(t) {
                c = parseInt(t, 10) || c
            }, o.search = function(t, e) {
                return e ? (i.length = 0, n(t, e, r())) : []
            }
        }
    }, {
        "./SearchStrategies/fuzzy": 2,
        "./SearchStrategies/literal": 3
    }],
    5: [function(t, n) {
        n.exports = function(t) {
            function n(t) {
                return !!t && "[object Object]" == Object.prototype.toString.call(t)
            }

            function e(t) {
                return !!t && "[object Array]" == Object.prototype.toString.call(t)
            }

            function r(t) {
                return u.push(t), t
            }

            function o(t) {
                for (var e = [], o = 0; o < t.length; o++) n(t[o]) && e.push(r(t[o]));
                return e
            }
            var i = this,
                u = [];
            e(t) && o(t), i.clear = function() {
                return u.length = 0, u
            }, i.get = function() {
                return u
            }, i.put = function(t) {
                return n(t) ? r(t) : e(t) ? o(t) : void 0
            }
        }
    }, {}],
    6: [function(t, n) {
        n.exports = function() {
            var t = this,
                n = /\{(.*?)\}/g;
            t.setTemplatePattern = function(t) {
                n = t
            }, t.render = function(t, e) {
                return t.replace(n, function(t, n) {
                    return e[n] || t
                })
            }
        }
    }, {}],
    7: [function(t) {
        ! function(n) {
            "use strict";

            function e() {
                w.put(x.json), s()
            }

            function r(t) {
                y.load(t, function(n, e) {
                    n ? o("failed to get JSON (" + t + ")") : (w.put(e), s())
                })
            }

            function o(t) {
                throw new Error("SimpleJekyllSearch --- " + t)
            }

            function i(t) {
                for (var n = 0; n < m.length; n++) {
                    var e = m[n];
                    t[e] || o("You must specify a " + e)
                }
            }

            function u(t) {
                for (var n in x) x[n] = t[n] || x[n]
            }

            function c(t) {
                try {
                    return t instanceof Object && JSON.parse(JSON.stringify(t))
                } catch (n) {
                    return !1
                }
            }

            function a() {
                x.resultsContainer.innerHTML = ""
            }

            function f(t) {
                x.resultsContainer.innerHTML += t
            }

            function s() {
                x.searchInput.addEventListener("keyup", function(t) {
                    return 40 !== t.which && 38 !== t.which ? 0 == t.target.value.length ? void a() : void l(S.search(w, t.target.value)) : void 0
                })
            }

            function l(t) {
                if (a(), 0 == t.length) return f(x.noResultsText);
                for (var n = 0; n < t.length; n++) f(d.render(x.searchResultTemplate, t[n]))
            }
            var h = t("./Searcher"),
                p = t("./Templater"),
                g = t("./Store"),
                v = t("./JSONLoader"),
                S = new h,
                d = new p,
                w = new g,
                y = new v,
                m = ["searchInput", "resultsContainer", "json"],
                x = {
                    searchInput: null,
                    resultsContainer: null,
                    json: [],
                    searchResultTemplate: '<li><a href="{url}" title="{desc}">{title}</a></li>',
                    noResultsText: "No results found",
                    limit: 10,
                    fuzzy: !1
                };
            n.SimpleJekyllSearch = function(t) {
                i(t), u(t), c(x.json) ? e(x.json) : r(x.json)
            }
        }(window, document)
    }, {
        "./JSONLoader": 1,
        "./Searcher": 4,
        "./Store": 5,
        "./Templater": 6
    }]
}, {}, [7]);


//===========================================================================//
//                    S E A R C H   E N G I N E   C A L L                    //
//===========================================================================//

SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('results-container'),
  json: '/search.json',
  searchResultTemplate: '<div class="search-result-block-container focusable"><div class="search-result-block-title"><a href="{url}" title="Open {title}"><i class="fa fa-link"></i> {title}</a></div><div class="search-result-block-content">{excerpt}</div>',
  noResultsText: '<div class="search-result-block-container"><div class="search-result-block-title"><i class="fa fa-exclamation-triangle"></i> No results were found..</div><div class="search-result-block-content">The search algorithm tries to match your input to the following post parameters: <ul><li>title</li><li>category</li><li>tags</li><li>url</li><li>date</li><li>excerpt</li></ul>Make sure you pass the right keyword according to your needs.<br />You can search for a date as well. The accepted format is: <i>yyyy-mm-dd</i>.</div>',
  limit: 15,
  fuzzy: true
})
