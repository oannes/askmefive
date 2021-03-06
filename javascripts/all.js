/*
 * Foundation Responsive Library
 * http://foundation.zurb.com
 * Copyright 2013, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
/*jslint unparam: true, browser: true, indent: 2 */
// Accommodate running jQuery or Zepto in noConflict() mode by
// using an anonymous function to redefine the $ shorthand name.
// See http://docs.jquery.com/Using_jQuery_with_Other_Libraries
// and http://zeptojs.com/
var libFuncName = null;
if (typeof jQuery == "undefined" && typeof Zepto == "undefined" && typeof $ == "function") libFuncName = $;
else if (typeof jQuery == "function") libFuncName = jQuery;
else {
    if (typeof Zepto != "function") throw new TypeError;
    libFuncName = Zepto
}(function(e) {
    (function() {
        Array.prototype.filter || (Array.prototype.filter = function(e) {
            "use strict";
            if (this == null) throw new TypeError;
            var t = Object(this),
                n = t.length >>> 0;
            if (typeof e != "function") try {
                throw new TypeError
            } catch (r) {
                return
            }
            var i = [],
                s = arguments[1];
            for (var o = 0; o < n; o++)
                if (o in t) {
                    var u = t[o];
                    e && e.call(s, u, o, t) && i.push(u)
                }
            return i
        }, Function.prototype.bind || (Function.prototype.bind = function(e) {
            if (typeof this != "function") throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            var t = Array.prototype.slice.call(arguments, 1),
                n = this,
                r = function() {},
                i = function() {
                    return n.apply(this instanceof r && e ? this : e, t.concat(Array.prototype.slice.call(arguments)))
                };
            return r.prototype = this.prototype, i.prototype = new r, i
        })), e.fn.stop = e.fn.stop || function() {
            return this
        }
    })(),
    function(t, n, r) {
        "use strict";
        t.Foundation = {
            name: "Foundation",
            version: "4.0.8",
            cache: {},
            init: function(e, t, n, r, i, s) {
                var o, u = [e, n, r, i],
                    a = [],
                    s = s || !1;
                s && (this.nc = s), this.scope = e || this.scope;
                if (t && typeof t == "string") {
                    if (/off/i.test(t)) return this.off();
                    o = t.split(" ");
                    if (o.length > 0)
                        for (var f = o.length - 1; f >= 0; f--) a.push(this.init_lib(o[f], u))
                } else
                    for (var l in this.libs) a.push(this.init_lib(l, u));
                return typeof t == "function" && u.unshift(t), this.response_obj(a, u)
            },
            response_obj: function(e, t) {
                for (var n in t)
                    if (typeof t[n] == "function") return t[n]({
                        errors: e.filter(function(e) {
                            if (typeof e == "string") return e
                        })
                    });
                return e
            },
            init_lib: function(e, t) {
                return this.trap(function() {
                    if (this.libs.hasOwnProperty(e)) return this.patch(this.libs[e]), this.libs[e].init.apply(this.libs[e], t)
                }.bind(this), e)
            },
            trap: function(e, t) {
                if (!this.nc) try {
                    return e()
                } catch (n) {
                    return this.error({
                        name: t,
                        message: "could not be initialized",
                        more: n.name + " " + n.message
                    })
                }
                return e()
            },
            patch: function(e) {
                this.fix_outer(e)
            },
            inherit: function(e, t) {
                var n = t.split(" ");
                for (var r = n.length - 1; r >= 0; r--) this.lib_methods.hasOwnProperty(n[r]) && (this.libs[e.name][n[r]] = this.lib_methods[n[r]])
            },
            random_str: function(e) {
                var t = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");
                e || (e = Math.floor(Math.random() * t.length));
                var n = "";
                for (var r = 0; r < e; r++) n += t[Math.floor(Math.random() * t.length)];
                return n
            },
            libs: {},
            lib_methods: {
                set_data: function(e, t) {
                    var n = [this.name, +(new Date), Foundation.random_str(5)].join("-");
                    return Foundation.cache[n] = t, e.attr("data-" + this.name + "-id", n), t
                },
                get_data: function(e) {
                    return Foundation.cache[e.attr("data-" + this.name + "-id")]
                },
                remove_data: function(t) {
                    t ? (delete Foundation.cache[t.attr("data-" + this.name + "-id")], t.attr("data-" + this.name + "-id", "")) : e("[data-" + this.name + "-id]").each(function() {
                        delete Foundation.cache[e(this).attr("data-" + this.name + "-id")], e(this).attr("data-" + this.name + "-id", "")
                    })
                },
                throttle: function(e, t) {
                    var n = null;
                    return function() {
                        var r = this,
                            i = arguments;
                        clearTimeout(n), n = setTimeout(function() {
                            e.apply(r, i)
                        }, t)
                    }
                },
                data_options: function(t) {
                    function u(e) {
                        return !isNaN(e - 0) && e !== null && e !== "" && e !== !1 && e !== !0
                    }

                    function a(t) {
                        return typeof t == "string" ? e.trim(t) : t
                    }
                    var n = {},
                        r, i, s = (t.attr("data-options") || ":").split(";"),
                        o = s.length;
                    for (r = o - 1; r >= 0; r--) i = s[r].split(":"), /true/i.test(i[1]) && (i[1] = !0), /false/i.test(i[1]) && (i[1] = !1), u(i[1]) && (i[1] = parseInt(i[1], 10)), i.length === 2 && i[0].length > 0 && (n[a(i[0])] = a(i[1]));
                    return n
                },
                delay: function(e, t) {
                    return setTimeout(e, t)
                },
                scrollTo: function(n, r, i) {
                    if (i < 0) return;
                    var s = r - e(t).scrollTop(),
                        o = s / i * 10;
                    this.scrollToTimerCache = setTimeout(function() {
                        isNaN(parseInt(o, 10)) || (t.scrollTo(0, e(t).scrollTop() + o), this.scrollTo(n, r, i - 10))
                    }.bind(this), 10)
                },
                scrollLeft: function(e) {
                    if (!e.length) return;
                    return "scrollLeft" in e[0] ? e[0].scrollLeft : e[0].pageXOffset
                },
                empty: function(e) {
                    if (e.length && e.length > 0) return !1;
                    if (e.length && e.length === 0) return !0;
                    for (var t in e)
                        if (hasOwnProperty.call(e, t)) return !1;
                    return !0
                }
            },
            fix_outer: function(e) {
                e.outerHeight = function(e, t) {
                    return typeof Zepto == "function" ? e.height() : typeof t != "undefined" ? e.outerHeight(t) : e.outerHeight()
                }, e.outerWidth = function(e) {
                    return typeof Zepto == "function" ? e.width() : typeof bool != "undefined" ? e.outerWidth(bool) : e.outerWidth()
                }
            },
            error: function(e) {
                return e.name + " " + e.message + "; " + e.more
            },
            off: function() {
                return e(this.scope).off(".fndtn"), e(t).off(".fndtn"), !0
            },
            zj: function() {
                try {
                    return Zepto
                } catch (e) {
                    return jQuery
                }
            }()
        }, e.fn.foundation = function() {
            var e = Array.prototype.slice.call(arguments, 0);
            return this.each(function() {
                return Foundation.init.apply(Foundation, [this].concat(e)), this
            })
        }
    }(this, this.document)
})(libFuncName),
function(e, t, n, r) {
    "use strict";
    Foundation.libs.alerts = {
        name: "alerts",
        version: "4.0.0",
        settings: {
            speed: 300,
            callback: function() {}
        },
        init: function(t, n, r) {
            return this.scope = t || this.scope, typeof n == "object" && e.extend(!0, this.settings, n), typeof n != "string" ? (this.settings.init || this.events(), this.settings.init) : this[n].call(this, r)
        },
        events: function() {
            var t = this;
            e(this.scope).on("click.fndtn.alerts", "[data-alert] a.close", function(n) {
                n.preventDefault(), e(this).closest("[data-alert]").fadeOut(t.speed, function() {
                    e(this).remove(), t.settings.callback()
                })
            }), this.settings.init = !0
        },
        off: function() {
            e(this.scope).off(".fndtn.alerts")
        }
    }
}(Foundation.zj, this, this.document),
function(e, t, n, r) {
    "use strict";
    Foundation.libs.clearing = {
        name: "clearing",
        version: "4.0.0",
        settings: {
            templates: {
                viewing: '<a href="#" class="clearing-close">&times;</a><div class="visible-img" style="display: none"><img src="//:0"><p class="clearing-caption"></p><a href="#" class="clearing-main-left"><span></span></a><a href="#" class="clearing-main-right"><span></span></a></div>'
            },
            close_selectors: ".clearing-close",
            init: !1,
            locked: !1
        },
        init: function(t, n, r) {
            return this.scope = this.scope || t, Foundation.inherit(this, "set_data get_data remove_data throttle"), typeof n == "object" && (r = e.extend(!0, this.settings, n)), typeof n != "string" ? (e(this.scope).find("ul[data-clearing]").each(function() {
                var t = Foundation.libs.clearing,
                    n = e(this),
                    r = r || {},
                    i = t.get_data(n);
                i || (r.$parent = n.parent(), t.set_data(n, e.extend(!0, t.settings, r)), t.assemble(n.find("li")), t.settings.init || t.events().swipe_events())
            }), this.settings.init) : this[n].call(this, r)
        },
        events: function() {
            var n = this;
            return e(this.scope).on("click.fndtn.clearing", "ul[data-clearing] li", function(t, r, i) {
                var r = r || e(this),
                    i = i || r,
                    s = n.get_data(r.parent());
                t.preventDefault(), s || n.init(), n.open(e(t.target), r, i), n.update_paddles(i)
            }).on("click.fndtn.clearing", ".clearing-main-right", function(e) {
                this.nav(e, "next")
            }.bind(this)).on("click.fndtn.clearing", ".clearing-main-left", function(e) {
                this.nav(e, "prev")
            }.bind(this)).on("click.fndtn.clearing", this.settings.close_selectors, function(e) {
                Foundation.libs.clearing.close(e, this)
            }).on("keydown.fndtn.clearing", function(e) {
                this.keydown(e)
            }.bind(this)), e(t).on("resize.fndtn.clearing", function(e) {
                this.resize()
            }.bind(this)), this.settings.init = !0, this
        },
        swipe_events: function() {
            var t = this;
            e(this.scope).on("touchstart.fndtn.clearing", ".visible-img", function(t) {
                t.touches || (t = t.originalEvent);
                var n = {
                    start_page_x: t.touches[0].pageX,
                    start_page_y: t.touches[0].pageY,
                    start_time: (new Date).getTime(),
                    delta_x: 0,
                    is_scrolling: r
                };
                e(this).data("swipe-transition", n), t.stopPropagation()
            }).on("touchmove.fndtn.clearing", ".visible-img", function(n) {
                n.touches || (n = n.originalEvent);
                if (n.touches.length > 1 || n.scale && n.scale !== 1) return;
                var r = e(this).data("swipe-transition");
                typeof r == "undefined" && (r = {}), r.delta_x = n.touches[0].pageX - r.start_page_x, typeof r.is_scrolling == "undefined" && (r.is_scrolling = !!(r.is_scrolling || Math.abs(r.delta_x) < Math.abs(n.touches[0].pageY - r.start_page_y)));
                if (!r.is_scrolling && !r.active) {
                    n.preventDefault();
                    var i = r.delta_x < 0 ? "next" : "prev";
                    r.active = !0, t.nav(n, i)
                }
            }).on("touchend.fndtn.clearing", ".visible-img", function(t) {
                e(this).data("swipe-transition", {}), t.stopPropagation()
            })
        },
        assemble: function(e) {
            var t = e.parent(),
                n = this.get_data(t),
                r = t.detach(),
                i = {
                    grid: '<div class="carousel">' + this.outerHTML(r[0]) + "</div>",
                    viewing: n.templates.viewing
                },
                s = '<div class="clearing-assembled"><div>' + i.viewing + i.grid + "</div></div>";
            return n.$parent.append(s)
        },
        open: function(e, t, n) {
            var r = n.closest(".clearing-assembled"),
                i = r.find("div").first(),
                s = i.find(".visible-img"),
                o = s.find("img").not(e);
            this.locked() || (o.attr("src", this.load(e)), this.loaded(o, function() {
                r.addClass("clearing-blackout"), i.addClass("clearing-container"), s.show(), this.fix_height(n).caption(s.find(".clearing-caption"), e).center(o).shift(t, n, function() {
                    n.siblings().removeClass("visible"), n.addClass("visible")
                })
            }.bind(this)))
        },
        close: function(t, n) {
            t.preventDefault();
            var r = function(e) {
                    return /blackout/.test(e.selector) ? e : e.closest(".clearing-blackout")
                }(e(n)),
                i, s;
            return n === t.target && r && (i = r.find("div").first(), s = i.find(".visible-img"), this.settings.prev_index = 0, r.find("ul[data-clearing]").attr("style", "").closest(".clearing-blackout").removeClass("clearing-blackout"), i.removeClass("clearing-container"), s.hide()), !1
        },
        keydown: function(t) {
            var n = e(".clearing-blackout").find("ul[data-clearing]");
            t.which === 39 && this.go(n, "next"), t.which === 37 && this.go(n, "prev"), t.which === 27 && e("a.clearing-close").trigger("click")
        },
        nav: function(t, n) {
            var r = e(".clearing-blackout").find("ul[data-clearing]");
            t.preventDefault(), this.go(r, n)
        },
        resize: function() {
            var t = e(".clearing-blackout .visible-img").find("img");
            t.length && this.center(t)
        },
        fix_height: function(t) {
            var n = t.parent().children(),
                r = this;
            return n.each(function() {
                var t = e(this),
                    n = t.find("img");
                t.height() > r.outerHeight(n) && t.addClass("fix-height")
            }).closest("ul").width(n.length * 100 + "%"), this
        },
        update_paddles: function(e) {
            var t = e.closest(".carousel").siblings(".visible-img");
            e.next().length ? t.find(".clearing-main-right").removeClass("disabled") : t.find(".clearing-main-right").addClass("disabled"), e.prev().length ? t.find(".clearing-main-left").removeClass("disabled") : t.find(".clearing-main-left").addClass("disabled")
        },
        center: function(e) {
            return e.css({
                marginLeft: -(this.outerWidth(e) / 2),
                marginTop: -(this.outerHeight(e) / 2)
            }), this
        },
        load: function(e) {
            var t = e.parent().attr("href");
            return this.preload(e), t ? t : e.attr("src")
        },
        preload: function(e) {
            this.img(e.closest("li").next()).img(e.closest("li").prev())
        },
        loaded: function(e, t) {
            function n() {
                t()
            }

            function r() {
                this.one("load", n);
                if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
                    var e = this.attr("src"),
                        t = e.match(/\?/) ? "&" : "?";
                    t += "random=" + (new Date).getTime(), this.attr("src", e + t)
                }
            }
            if (!e.attr("src")) {
                n();
                return
            }
            this.complete || this.readyState === 4 ? n() : r.call(e)
        },
        img: function(e) {
            if (e.length) {
                var t = new Image,
                    n = e.find("a");
                n.length ? t.src = n.attr("href") : t.src = e.find("img").attr("src")
            }
            return this
        },
        caption: function(e, t) {
            var n = t.data("caption");
            return n ? e.text(n).show() : e.text("").hide(), this
        },
        go: function(e, t) {
            var n = e.find(".visible"),
                r = n[t]();
            r.length && r.find("img").trigger("click", [n, r])
        },
        shift: function(e, t, n) {
            var r = t.parent(),
                i = this.settings.prev_index || t.index(),
                s = this.direction(r, e, t),
                o = parseInt(r.css("left"), 10),
                u = this.outerWidth(t),
                a;
            t.index() !== i && !/skip/.test(s) ? /left/.test(s) ? (this.lock(), r.animate({
                left: o + u
            }, 300, this.unlock())) : /right/.test(s) && (this.lock(), r.animate({
                left: o - u
            }, 300, this.unlock())) : /skip/.test(s) && (a = t.index() - this.settings.up_count, this.lock(), a > 0 ? r.animate({
                left: -(a * u)
            }, 300, this.unlock()) : r.animate({
                left: 0
            }, 300, this.unlock())), n()
        },
        direction: function(t, n, r) {
            var i = t.find("li"),
                s = this.outerWidth(i) + this.outerWidth(i) / 4,
                o = Math.floor(this.outerWidth(e(".clearing-container")) / s) - 1,
                u = i.index(r),
                a;
            return this.settings.up_count = o, this.adjacent(this.settings.prev_index, u) ? u > o && u > this.settings.prev_index ? a = "right" : u > o - 1 && u <= this.settings.prev_index ? a = "left" : a = !1 : a = "skip", this.settings.prev_index = u, a
        },
        adjacent: function(e, t) {
            for (var n = t + 1; n >= t - 1; n--)
                if (n === e) return !0;
            return !1
        },
        lock: function() {
            this.settings.locked = !0
        },
        unlock: function() {
            this.settings.locked = !1
        },
        locked: function() {
            return this.settings.locked
        },
        outerHTML: function(e) {
            return e.outerHTML || (new XMLSerializer).serializeToString(e)
        },
        off: function() {
            e(this.scope).off(".fndtn.clearing"), e(t).off(".fndtn.clearing"), this.remove_data(), this.settings.init = !1
        }
    }
}(Foundation.zj, this, this.document),
function(e, t, n) {
    function i(e) {
        return e
    }

    function s(e) {
        return decodeURIComponent(e.replace(r, " "))
    }
    var r = /\+/g,
        o = e.cookie = function(r, u, a) {
            if (u !== n) {
                a = e.extend({}, o.defaults, a), u === null && (a.expires = -1);
                if (typeof a.expires == "number") {
                    var f = a.expires,
                        l = a.expires = new Date;
                    l.setDate(l.getDate() + f)
                }
                return u = o.json ? JSON.stringify(u) : String(u), t.cookie = [encodeURIComponent(r), "=", o.raw ? u : encodeURIComponent(u), a.expires ? "; expires=" + a.expires.toUTCString() : "", a.path ? "; path=" + a.path : "", a.domain ? "; domain=" + a.domain : "", a.secure ? "; secure" : ""].join("")
            }
            var c = o.raw ? i : s,
                h = t.cookie.split("; ");
            for (var p = 0, d = h.length; p < d; p++) {
                var v = h[p].split("=");
                if (c(v.shift()) === r) {
                    var m = c(v.join("="));
                    return o.json ? JSON.parse(m) : m
                }
            }
            return null
        };
    o.defaults = {}, e.removeCookie = function(t, n) {
        return e.cookie(t) !== null ? (e.cookie(t, null, n), !0) : !1
    }
}(Foundation.zj, document),
function(e, t, n, r) {
    "use strict";
    Foundation.libs.dropdown = {
        name: "dropdown",
        version: "4.0.9",
        settings: {
            activeClass: "open"
        },
        init: function(t, n, r) {
            return this.scope = t || this.scope, Foundation.inherit(this, "throttle"), typeof n == "object" && e.extend(!0, this.settings, n), typeof n != "string" ? (this.settings.init || this.events(), this.settings.init) : this[n].call(this, r)
        },
        events: function() {
            var n = this;
            e(this.scope).on("click.fndtn.dropdown", "[data-dropdown]", function(t) {
                t.preventDefault(), t.stopPropagation(), n.toggle(e(this))
            }), e("*, html, body").on("click.fndtn.dropdown", function(t) {
                e(t.target).data("dropdown") || e("[data-dropdown-content]").css("left", "-99999px").removeClass(n.settings.activeClass)
            }), e(t).on("resize.fndtn.dropdown", n.throttle(function() {
                n.resize.call(n)
            }, 50)).trigger("resize"), this.settings.init = !0
        },
        toggle: function(t, n) {
            var r = e("#" + t.data("dropdown"));
            e("[data-dropdown-content]").not(r).css("left", "-99999px").removeClass(this.settings.activeClass), r.hasClass(this.settings.activeClass) ? r.css("left", "-99999px").removeClass(this.settings.activeClass) : this.css(r.addClass(this.settings.activeClass), t)
        },
        resize: function() {
            var t = e("[data-dropdown-content].open"),
                n = e("[data-dropdown='" + t.attr("id") + "']");
            t.length && n.length && this.css(t, n)
        },
        css: function(n, r) {
            if (n.parent()[0] === e("body")[0]) var i = r.offset();
            else var i = r.position(); if (this.small()) n.css({
                position: "absolute",
                width: "95%",
                left: "2.5%",
                "max-width": "none",
                top: i.top + this.outerHeight(r)
            });
            else {
                if (e(t).width() > this.outerWidth(n) + r.offset().left) var s = i.left;
                else {
                    n.hasClass("right") || n.addClass("right");
                    var s = i.left - (this.outerWidth(n) - this.outerWidth(r))
                }
                n.attr("style", "").css({
                    position: "absolute",
                    top: i.top + this.outerHeight(r),
                    left: s
                })
            }
            return n
        },
        small: function() {
            return e(t).width() < 768 || e("html").hasClass("lt-ie9")
        },
        off: function() {
            e(this.scope).off(".fndtn.dropdown"), e("html, body").off(".fndtn.dropdown"), e(t).off(".fndtn.dropdown"), e("[data-dropdown-content]").off(".fndtn.dropdown"), this.settings.init = !1
        }
    }
}(Foundation.zj, this, this.document),
function(e, t, n, r) {
    "use strict";
    Foundation.libs.forms = {
        name: "forms",
        version: "4.0.4",
        settings: {
            disable_class: "no-custom"
        },
        init: function(t, n, r) {
            return this.scope = t || this.scope, typeof n == "object" && e.extend(!0, this.settings, n), typeof n != "string" ? (this.settings.init || this.events(), this.assemble(), this.settings.init) : this[n].call(this, r)
        },
        assemble: function() {
            e('form.custom input[type="radio"]', e(this.scope)).not('[data-customforms="disabled"]').each(this.append_custom_markup), e('form.custom input[type="checkbox"]', e(this.scope)).not('[data-customforms="disabled"]').each(this.append_custom_markup), e("form.custom select", e(this.scope)).not('[data-customforms="disabled"]').each(this.append_custom_select)
        },
        events: function() {
            var t = this;
            e(this.scope).on("change.fndtn.forms", 'form.custom select:not([data-customforms="disabled"])', function(n) {
                t.refresh_custom_select(e(this))
            }).on("click.fndtn.forms", "form.custom label", function(n) {
                var r = e("#" + t.escape(e(this).attr("for")) + ':not([data-customforms="disabled"])'),
                    i, s;
                r.length !== 0 && (r.attr("type") === "checkbox" ? (n.preventDefault(), i = e(this).find("span.custom.checkbox"), i.length == 0 && (i = e(this).next("span.custom.checkbox")), i.length == 0 && (i = e(this).prev("span.custom.checkbox")), t.toggle_checkbox(i)) : r.attr("type") === "radio" && (n.preventDefault(), s = e(this).find("span.custom.radio"), s.length == 0 && (s = e(this).next("span.custom.radio")), s.length == 0 && (s = e(this).prev("span.custom.radio")), t.toggle_radio(s)))
            }).on("click.fndtn.forms", "form.custom div.custom.dropdown a.current, form.custom div.custom.dropdown a.selector", function(n) {
                var r = e(this),
                    i = r.closest("div.custom.dropdown"),
                    s = i.prev();
                i.hasClass("open") || e(t.scope).trigger("click"), n.preventDefault();
                if (!1 === s.is(":disabled")) return i.toggleClass("open"), i.hasClass("open") ? e(t.scope).on("click.fndtn.forms.customdropdown", function() {
                    i.removeClass("open"), e(t.scope).off(".fndtn.forms.customdropdown")
                }) : e(t.scope).on(".fndtn.forms.customdropdown"), !1
            }).on("click.fndtn.forms touchend.fndtn.forms", "form.custom div.custom.dropdown li", function(t) {
                var n = e(this),
                    r = n.closest("div.custom.dropdown"),
                    i = r.prev(),
                    s = 0;
                t.preventDefault(), t.stopPropagation();
                if (!e(this).hasClass("disabled")) {
                    e("div.dropdown").not(r).removeClass("open");
                    var o = n.closest("ul").find("li.selected");
                    o.removeClass("selected"), n.addClass("selected"), r.removeClass("open").find("a.current").html(n.html()), n.closest("ul").find("li").each(function(e) {
                        n[0] == this && (s = e)
                    }), i[0].selectedIndex = s, i.data("prevalue", o.html()), i.trigger("change")
                }
            }), this.settings.init = !0
        },
        append_custom_markup: function(t, n) {
            var r = e(n).hide(),
                i = r.attr("type"),
                s = r.next("span.custom." + i);
            s.length === 0 && (s = e('<span class="custom ' + i + '"></span>').insertAfter(r)), s.toggleClass("checked", r.is(":checked")), s.toggleClass("disabled", r.is(":disabled"))
        },
        append_custom_select: function(t, n) {
            var r = Foundation.libs.forms,
                i = e(n),
                s = i.next("div.custom.dropdown"),
                o = s.find("ul"),
                u = s.find(".current"),
                a = s.find(".selector"),
                f = i.find("option"),
                l = f.filter(":selected"),
                c = i.attr("class") ? i.attr("class").split(" ") : [],
                h = 0,
                p = "",
                d, v = !1;
            if (i.hasClass(r.settings.disable_class)) return;
            if (s.length === 0) {
                var m = i.hasClass("small") ? "small" : i.hasClass("medium") ? "medium" : i.hasClass("large") ? "large" : i.hasClass("expand") ? "expand" : "";
                s = e('<div class="' + ["custom", "dropdown", m].concat(c).filter(function(e, t, n) {
                    return e == "" ? !1 : n.indexOf(e) == t
                }).join(" ") + '"><a href="#" class="selector"></a><ul /></div>'), a = s.find(".selector"), o = s.find("ul"), p = f.map(function() {
                    return "<li>" + e(this).html() + "</li>"
                }).get().join(""), o.append(p), v = s.prepend('<a href="#" class="current">' + l.html() + "</a>").find(".current"), i.after(s).hide()
            } else p = f.map(function() {
                return "<li>" + e(this).html() + "</li>"
            }).get().join(""), o.html("").append(p);
            s.toggleClass("disabled", i.is(":disabled")), d = o.find("li"), f.each(function(t) {
                this.selected && (d.eq(t).addClass("selected"), v && v.html(e(this).html())), e(this).is(":disabled") && d.eq(t).addClass("disabled")
            });
            if (!s.is(".small, .medium, .large, .expand")) {
                s.addClass("open");
                var r = Foundation.libs.forms;
                r.hidden_fix.adjust(o), h = r.outerWidth(d) > h ? r.outerWidth(d) : h, Foundation.libs.forms.hidden_fix.reset(), s.removeClass("open")
            }
        },
        refresh_custom_select: function(t) {
            var n = this,
                r = 0,
                i = t.next(),
                s = t.find("option");
            i.find("ul").html(""), s.each(function() {
                var t = e("<li>" + e(this).html() + "</li>");
                i.find("ul").append(t)
            }), s.each(function(t) {
                this.selected && (i.find("li").eq(t).addClass("selected"), i.find(".current").html(e(this).html())), e(this).is(":disabled") && i.find("li").eq(t).addClass("disabled")
            }), i.removeAttr("style").find("ul").removeAttr("style"), i.find("li").each(function() {
                i.addClass("open"), n.outerWidth(e(this)) > r && (r = n.outerWidth(e(this))), i.removeClass("open")
            })
        },
        toggle_checkbox: function(e) {
            var t = e.prev(),
                n = t[0];
            !1 === t.is(":disabled") && (n.checked = n.checked ? !1 : !0, e.toggleClass("checked"), t.trigger("change"))
        },
        toggle_radio: function(e) {
            var t = e.prev(),
                n = t.closest("form.custom"),
                r = t[0];
            !1 === t.is(":disabled") && (n.find('input[type="radio"][name="' + this.escape(t.attr("name")) + '"]').next().not(e).removeClass("checked"), e.hasClass("checked") || e.toggleClass("checked"), r.checked = e.hasClass("checked"), t.trigger("change"))
        },
        escape: function(e) {
            return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
        },
        hidden_fix: {
            tmp: [],
            hidden: null,
            adjust: function(t) {
                var n = this;
                n.hidden = t.parents().andSelf().filter(":hidden"), n.hidden.each(function() {
                    var t = e(this);
                    n.tmp.push(t.attr("style")), t.css({
                        visibility: "hidden",
                        display: "block"
                    })
                })
            },
            reset: function() {
                var t = this;
                t.hidden.each(function(n) {
                    var i = e(this),
                        s = t.tmp[n];
                    s === r ? i.removeAttr("style") : i.attr("style", s)
                }), t.tmp = [], t.hidden = null
            }
        },
        off: function() {
            e(this.scope).off(".fndtn.forms")
        }
    }
}(Foundation.zj, this, this.document),
function(e, t, n, r) {
    "use strict";
    Foundation.libs.joyride = {
        name: "joyride",
        version: "4.0.0",
        defaults: {
            tipLocation: "bottom",
            nubPosition: "auto",
            scrollSpeed: 300,
            timer: 0,
            startTimerOnClick: !0,
            startOffset: 0,
            nextButton: !0,
            tipAnimation: "fade",
            pauseAfter: [],
            tipAnimationFadeSpeed: 300,
            cookieMonster: !1,
            cookieName: "joyride",
            cookieDomain: !1,
            cookieExpires: 365,
            tipContainer: "body",
            postRideCallback: function() {},
            postStepCallback: function() {},
            template: {
                link: '<a href="#close" class="joyride-close-tip">&times;</a>',
                timer: '<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
                tip: '<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',
                wrapper: '<div class="joyride-content-wrapper"></div>',
                button: '<a href="#" class="small button joyride-next-tip"></a>'
            }
        },
        settings: {},
        init: function(t, n, r) {
            return this.scope = t || this.scope, Foundation.inherit(this, "throttle data_options scrollTo scrollLeft delay"), typeof n == "object" ? e.extend(!0, this.settings, this.defaults, n) : e.extend(!0, this.settings, this.defaults, r), typeof n != "string" ? (this.settings.init || this.events(), this.settings.init) : this[n].call(this, r)
        },
        events: function() {
            var n = this;
            e(this.scope).on("click.joyride", ".joyride-next-tip, .joyride-modal-bg", function(e) {
                e.preventDefault(), this.settings.$li.next().length < 1 ? this.end() : this.settings.timer > 0 ? (clearTimeout(this.settings.automate), this.hide(), this.show(), this.startTimer()) : (this.hide(), this.show())
            }.bind(this)).on("click.joyride", ".joyride-close-tip", function(e) {
                e.preventDefault(), this.end()
            }.bind(this)), e(t).on("resize.fndtn.joyride", n.throttle(function() {
                e("[data-joyride]").length > 0 && n.settings.$next_tip && (n.is_phone() ? n.pos_phone() : n.pos_default())
            }, 100)), this.settings.init = !0
        },
        start: function() {
            var t = this,
                n = e(this.scope).find("[data-joyride]"),
                r = ["timer", "scrollSpeed", "startOffset", "tipAnimationFadeSpeed", "cookieExpires"],
                i = r.length;
            this.settings.init || this.init(), this.settings.$content_el = n, this.settings.body_offset = e(this.settings.tipContainer).position(), this.settings.$tip_content = this.settings.$content_el.find("> li"), this.settings.paused = !1, this.settings.attempts = 0, this.settings.tipLocationPatterns = {
                top: ["bottom"],
                bottom: [],
                left: ["right", "top", "bottom"],
                right: ["left", "top", "bottom"]
            }, typeof e.cookie != "function" && (this.settings.cookieMonster = !1);
            if (!this.settings.cookieMonster || this.settings.cookieMonster && e.cookie(this.settings.cookieName) === null) this.settings.$tip_content.each(function(n) {
                var s = e(this);
                e.extend(!0, t.settings, t.data_options(s));
                for (var o = i - 1; o >= 0; o--) t.settings[r[o]] = parseInt(t.settings[r[o]], 10);
                t.create({
                    $li: s,
                    index: n
                })
            }), !this.settings.startTimerOnClick && this.settings.timer > 0 ? (this.show("init"), this.startTimer()) : this.show("init")
        },
        resume: function() {
            this.set_li(), this.show()
        },
        tip_template: function(t) {
            var n, r;
            return t.tip_class = t.tip_class || "", n = e(this.settings.template.tip).addClass(t.tip_class), r = e.trim(e(t.li).html()) + this.button_text(t.button_text) + this.settings.template.link + this.timer_instance(t.index), n.append(e(this.settings.template.wrapper)), n.first().attr("data-index", t.index), e(".joyride-content-wrapper", n).append(r), n[0]
        },
        timer_instance: function(t) {
            var n;
            return t === 0 && this.settings.startTimerOnClick && this.settings.timer > 0 || this.settings.timer === 0 ? n = "" : n = this.outerHTML(e(this.settings.template.timer)[0]), n
        },
        button_text: function(t) {
            return this.settings.nextButton ? (t = e.trim(t) || "Next", t = this.outerHTML(e(this.settings.template.button).append(t)[0])) : t = "", t
        },
        create: function(t) {
            var n = t.$li.attr("data-button") || t.$li.attr("data-text"),
                r = t.$li.attr("class"),
                i = e(this.tip_template({
                    tip_class: r,
                    index: t.index,
                    button_text: n,
                    li: t.$li
                }));
            e(this.settings.tipContainer).append(i)
        },
        show: function(t) {
            var n = null;
            this.settings.$li === r || e.inArray(this.settings.$li.index(), this.settings.pauseAfter) === -1 ? (this.settings.paused ? this.settings.paused = !1 : this.set_li(t), this.settings.attempts = 0, this.settings.$li.length && this.settings.$target.length > 0 ? (this.settings.tipSettings = e.extend(this.settings, this.data_options(this.settings.$li)), this.settings.timer = parseInt(this.settings.timer, 10), this.settings.tipSettings.tipLocationPattern = this.settings.tipLocationPatterns[this.settings.tipSettings.tipLocation], /body/i.test(this.settings.$target.selector) || this.scroll_to(), this.is_phone() ? this.pos_phone(!0) : this.pos_default(!0), n = this.settings.$next_tip.find(".joyride-timer-indicator"), /pop/i.test(this.settings.tipAnimation) ? (n.width(0), thsi.settings.timer > 0 ? (this.settings.$next_tip.show(), this.delay(function() {
                n.animate({
                    width: n.parent().width()
                }, this.settings.timer, "linear")
            }.bind(this), this.settings.tipAnimationFadeSpeed)) : this.settings.$next_tip.show()) : /fade/i.test(this.settings.tipAnimation) && (n.width(0), this.settings.timer > 0 ? (this.settings.$next_tip.fadeIn(this.settings.tipAnimationFadeSpeed).show(), this.delay(function() {
                n.animate({
                    width: n.parent().width()
                }, this.settings.timer, "linear")
            }.bind(this), this.settings.tipAnimationFadeSpeed)) : this.settings.$next_tip.fadeIn(this.settings.tipAnimationFadeSpeed)), this.settings.$current_tip = this.settings.$next_tip) : this.settings.$li && this.settings.$target.length < 1 ? this.show() : this.end()) : this.settings.paused = !0
        },
        is_phone: function() {
            return Modernizr ? Modernizr.mq("only screen and (max-width: 767px)") || e(".lt-ie9").length > 0 : this.settings.$window.width() < 767 ? !0 : !1
        },
        hide: function() {
            this.settings.postStepCallback(this.settings.$li.index(), this.settings.$current_tip), e(".joyride-modal-bg").hide(), this.settings.$current_tip.hide()
        },
        set_li: function(e) {
            e ? (this.settings.$li = this.settings.$tip_content.eq(this.settings.startOffset), this.set_next_tip(), this.settings.$current_tip = this.settings.$next_tip) : (this.settings.$li = this.settings.$li.next(), this.set_next_tip()), this.set_target()
        },
        set_next_tip: function() {
            this.settings.$next_tip = e(".joyride-tip-guide[data-index='" + this.settings.$li.index() + "']"), this.settings.$next_tip.data("closed", "")
        },
        set_target: function() {
            var t = this.settings.$li.attr("data-class"),
                r = this.settings.$li.attr("data-id"),
                i = function() {
                    return r ? e(n.getElementById(r)) : t ? e("." + t).first() : e("body")
                };
            this.settings.$target = i()
        },
        scroll_to: function() {
            var n, r;
            n = e(t).height() / 2, r = Math.ceil(this.settings.$target.offset().top - n + this.outerHeight(this.settings.$next_tip)), r > 0 && this.scrollTo(e("html, body"), r, this.settings.scrollSpeed)
        },
        paused: function() {
            return e.inArray(this.settings.$li.index() + 1, this.settings.pauseAfter) === -1 ? !0 : !1
        },
        restart: function() {
            this.hide(), this.settings.$li = r, this.show("init")
        },
        pos_default: function(n) {
            var r = Math.ceil(e(t).height() / 2),
                i = this.settings.$next_tip.offset(),
                s = this.settings.$next_tip.find(".joyride-nub"),
                o = Math.ceil(this.outerHeight(s) / 2),
                u = n || !1;
            u && (this.settings.$next_tip.css("visibility", "hidden"), this.settings.$next_tip.show()), /body/i.test(this.settings.$target.selector) ? this.settings.$li.length && this.pos_modal(s) : (this.bottom() ? (this.settings.$next_tip.css({
                top: this.settings.$target.offset().top + o + this.outerHeight(this.settings.$target),
                left: this.settings.$target.offset().left
            }), this.nub_position(s, this.settings.tipSettings.nubPosition, "top")) : this.top() ? (this.settings.$next_tip.css({
                top: this.settings.$target.offset().top - this.outerHeight(this.settings.$next_tip) - o,
                left: this.settings.$target.offset().left
            }), this.nub_position(s, this.settings.tipSettings.nubPosition, "bottom")) : this.right() ? (this.settings.$next_tip.css({
                top: this.settings.$target.offset().top,
                left: this.outerWidth(this.settings.$target) + this.settings.$target.offset().left
            }), this.nub_position(s, this.settings.tipSettings.nubPosition, "left")) : this.left() && (this.settings.$next_tip.css({
                top: this.settings.$target.offset().top,
                left: this.settings.$target.offset().left - this.outerWidth(this.settings.$next_tip) - o
            }), this.nub_position(s, this.settings.tipSettings.nubPosition, "right")), !this.visible(this.corners(this.settings.$next_tip)) && this.settings.attempts < this.settings.tipSettings.tipLocationPattern.length && (s.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"), this.settings.tipSettings.tipLocation = this.settings.tipSettings.tipLocationPattern[this.settings.attempts], this.settings.attempts++, this.pos_default(!0))), u && (this.settings.$next_tip.hide(), this.settings.$next_tip.css("visibility", "visible"))
        },
        pos_phone: function(t) {
            var n = this.outerHeight(this.settings.$next_tip),
                r = this.settings.$next_tip.offset(),
                i = this.outerHeight(this.settings.$target),
                s = e(".joyride-nub", this.settings.$next_tip),
                o = Math.ceil(this.outerHeight(s) / 2),
                u = t || !1;
            s.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"), u && (this.settings.$next_tip.css("visibility", "hidden"), this.settings.$next_tip.show()), /body/i.test(this.settings.$target.selector) ? this.settings.$li.length && this.pos_modal(s) : this.top() ? (this.settings.$next_tip.offset({
                top: this.settings.$target.offset().top - n - o
            }), s.addClass("bottom")) : (this.settings.$next_tip.offset({
                top: this.settings.$target.offset().top + i + o
            }), s.addClass("top")), u && (this.settings.$next_tip.hide(), this.settings.$next_tip.css("visibility", "visible"))
        },
        pos_modal: function(t) {
            this.center(), t.hide(), this.settings.$next_tip.data("closed") || (e(".joyride-modal-bg").length < 1 && e("body").append('<div class="joyride-modal-bg">').show(), /pop/i.test(this.settings.tipAnimation) ? e(".joyride-modal-bg").show() : e(".joyride-modal-bg").fadeIn(this.settings.tipAnimationFadeSpeed))
        },
        center: function() {
            var n = e(t);
            return this.settings.$next_tip.css({
                top: (n.height() - this.outerHeight(this.settings.$next_tip)) / 2 + n.scrollTop(),
                left: (n.width() - this.outerWidth(this.settings.$next_tip)) / 2 + this.scrollLeft(n)
            }), !0
        },
        bottom: function() {
            return /bottom/i.test(this.settings.tipSettings.tipLocation)
        },
        top: function() {
            return /top/i.test(this.settings.tipSettings.tipLocation)
        },
        right: function() {
            return /right/i.test(this.settings.tipSettings.tipLocation)
        },
        left: function() {
            return /left/i.test(this.settings.tipSettings.tipLocation)
        },
        corners: function(n) {
            var r = e(t),
                i = r.width() + this.scrollLeft(r),
                s = r.width() + r.scrollTop();
            return [n.offset().top <= r.scrollTop(), i <= n.offset().left + this.outerWidth(n), s <= n.offset().top + this.outerHeight(n), this.scrollLeft(r) >= n.offset().left]
        },
        visible: function(e) {
            var t = e.length;
            while (t--)
                if (e[t]) return !1;
            return !0
        },
        nub_position: function(e, t, n) {
            t === "auto" ? e.addClass(n) : e.addClass(t)
        },
        startTimer: function() {
            this.settings.$li.length ? this.settings.automate = setTimeout(function() {
                this.hide(), this.show(), this.startTimer()
            }.bind(this), this.settings.timer) : clearTimeout(this.settings.automate)
        },
        end: function() {
            this.settings.cookieMonster && e.cookie(this.settings.cookieName, "ridden", {
                expires: this.settings.cookieExpires,
                domain: this.settings.cookieDomain
            }), this.settings.timer > 0 && clearTimeout(this.settings.automate), this.settings.$next_tip.data("closed", !0), e(".joyride-modal-bg").hide(), this.settings.$current_tip.hide(), this.settings.postStepCallback(this.settings.$li.index(), this.settings.$current_tip), this.settings.postRideCallback(this.settings.$li.index(), this.settings.$current_tip)
        },
        outerHTML: function(e) {
            return e.outerHTML || (new XMLSerializer).serializeToString(e)
        },
        off: function() {
            e(this.scope).off(".joyride"), e(t).off(".joyride"), e(".joyride-close-tip, .joyride-next-tip, .joyride-modal-bg").off(".joyride"), e(".joyride-tip-guide, .joyride-modal-bg").remove(), clearTimeout(this.settings.automate), this.settings = {}
        }
    }
}(Foundation.zj, this, this.document),
function(e, t, n, r) {
    "use strict";
    Foundation.libs.magellan = {
        name: "magellan",
        version: "4.0.0",
        settings: {
            activeClass: "active"
        },
        init: function(t, n, r) {
            return this.scope = t || this.scope, Foundation.inherit(this, "data_options"), typeof n == "object" && e.extend(!0, this.settings, n), typeof n != "string" ? (this.settings.init || (this.fixed_magellan =
                e("[data-magellan-expedition]"), this.set_threshold(), this.last_destination = e("[data-magellan-destination]").last(), this.events()), this.settings.init) : this[n].call(this, r)
        },
        events: function() {
            var n = this;
            e(this.scope).on("arrival.fndtn.magellan", "[data-magellan-arrival]", function(t) {
                var r = e(this),
                    i = r.closest("[data-magellan-expedition]"),
                    s = i.attr("data-magellan-active-class") || n.settings.activeClass;
                r.closest("[data-magellan-expedition]").find("[data-magellan-arrival]").not(r).removeClass(s), r.addClass(s)
            }), this.fixed_magellan.on("update-position.fndtn.magellan", function() {
                var t = e(this)
            }).trigger("update-position"), e(t).on("resize.fndtn.magellan", function() {
                this.fixed_magellan.trigger("update-position")
            }.bind(this)).on("scroll.fndtn.magellan", function() {
                var r = e(t).scrollTop();
                n.fixed_magellan.each(function() {
                    var t = e(this);
                    typeof t.data("magellan-top-offset") == "undefined" && t.data("magellan-top-offset", t.offset().top), typeof t.data("magellan-fixed-position") == "undefined" && t.data("magellan-fixed-position", !1);
                    var i = r + n.settings.threshold > t.data("magellan-top-offset"),
                        s = t.attr("data-magellan-top-offset");
                    t.data("magellan-fixed-position") != i && (t.data("magellan-fixed-position", i), i ? t.css({
                        position: "fixed",
                        top: 0
                    }) : t.css({
                        position: "",
                        top: ""
                    }), i && typeof s != "undefined" && s != 0 && t.css({
                        position: "fixed",
                        top: s + "px"
                    }))
                })
            }), this.last_destination.length > 0 && e(t).on("scroll.fndtn.magellan", function(r) {
                var i = e(t).scrollTop(),
                    s = i + e(t).height(),
                    o = Math.ceil(n.last_destination.offset().top);
                e("[data-magellan-destination]").each(function() {
                    var t = e(this),
                        r = t.attr("data-magellan-destination"),
                        u = t.offset().top - i;
                    u <= n.settings.threshold && e("[data-magellan-arrival='" + r + "']").trigger("arrival"), s >= e(n.scope).height() && o > i && o < s && e("[data-magellan-arrival]").last().trigger("arrival")
                })
            }), this.settings.init = !0
        },
        set_threshold: function() {
            this.settings.threshold || (this.settings.threshold = this.fixed_magellan.length > 0 ? this.outerHeight(this.fixed_magellan, !0) : 0)
        },
        off: function() {
            e(this.scope).off(".fndtn.magellan")
        }
    }
}(Foundation.zj, this, this.document),
function(e, t, n, r) {
    "use strict";
    Foundation.libs = Foundation.libs || {}, Foundation.libs.orbit = {
        name: "orbit",
        version: "4.0.0",
        settings: {
            timer_speed: 1e4,
            animation_speed: 500,
            bullets: !0,
            stack_on_small: !0,
            container_class: "orbit-container",
            stack_on_small_class: "orbit-stack-on-small",
            next_class: "orbit-next",
            prev_class: "orbit-prev",
            timer_container_class: "orbit-timer",
            timer_paused_class: "paused",
            timer_progress_class: "orbit-progress",
            slides_container_class: "orbit-slides-container",
            bullets_container_class: "orbit-bullets",
            bullets_active_class: "active",
            slide_number_class: "orbit-slide-number",
            caption_class: "orbit-caption",
            active_slide_class: "active",
            orbit_transition_class: "orbit-transitioning"
        },
        init: function(t, n, r) {
            var i = this;
            Foundation.inherit(i, "data_options"), typeof n == "object" && e.extend(!0, i.settings, n), e("[data-orbit]", t).each(function(t, n) {
                var r = e.extend(!0, {}, i);
                r._init(t, n)
            })
        },
        _container_html: function() {
            var e = this;
            return '<div class="' + e.settings.container_class + '"></div>'
        },
        _bullets_container_html: function(t) {
            var n = this,
                r = e('<ol class="' + n.settings.bullets_container_class + '"></ol>');
            return t.each(function(t, i) {
                var s = e('<li data-orbit-slide-number="' + (t + 1) + '" class=""></li>');
                t === 0 && s.addClass(n.settings.bullets_active_class), r.append(s)
            }), r
        },
        _slide_number_html: function(t, n) {
            var r = this,
                i = e('<div class="' + r.settings.slide_number_class + '"></div>');
            return i.append("<span>" + t + "</span> of <span>" + n + "</span>"), i
        },
        _timer_html: function() {
            var e = this;
            return typeof e.settings.timer_speed == "number" && e.settings.timer_speed > 0 ? '<div class="' + e.settings.timer_container_class + '"><span></span><div class="' + e.settings.timer_progress_class + '"></div></div>' : ""
        },
        _next_html: function() {
            var e = this;
            return '<a href="#" class="' + e.settings.next_class + '">Next <span></span></a>'
        },
        _prev_html: function() {
            var e = this;
            return '<a href="#" class="' + e.settings.prev_class + '">Prev <span></span></a>'
        },
        _init: function(t, n) {
            var r = this,
                i = e(n),
                s = i.wrap(r._container_html()).parent(),
                o = i.children();
            e.extend(!0, r.settings, r.data_options(i)), s.append(r._prev_html()), s.append(r._next_html()), i.addClass(r.settings.slides_container_class), r.settings.stack_on_small && s.addClass(r.settings.stack_on_small_class), s.append(r._slide_number_html(1, o.length)), s.append(r._timer_html()), r.settings.bullets && s.after(r._bullets_container_html(o)), i.append(o.first().clone().attr("data-orbit-slide", "")), i.prepend(o.last().clone().attr("data-orbit-slide", "")), i.css("marginLeft", "-100%"), o.first().addClass(r.settings.active_slide_class), r._init_events(i), r._init_dimensions(i), r._start_timer(i)
        },
        _init_events: function(i) {
            var s = this,
                o = i.parent();
            e(t).on("load.fndtn.orbit", function() {
                i.height(""), i.height(i.height(o.height())), i.trigger("orbit:ready")
            }).on("resize.fndtn.orbit", function() {
                i.height(""), i.height(i.height(o.height()))
            }), e(n).on("click.fndtn.orbit", "[data-orbit-link]", function(t) {
                t.preventDefault();
                var n = e(t.currentTarget).attr("data-orbit-link"),
                    r = i.find("[data-orbit-slide=" + n + "]").first();
                r.length === 1 && (s._reset_timer(i, !0), s._goto(i, r.index(), function() {}))
            }), o.siblings("." + s.settings.bullets_container_class).on("click.fndtn.orbit", "[data-orbit-slide-number]", function(t) {
                t.preventDefault(), s._reset_timer(i, !0), s._goto(i, e(t.currentTarget).data("orbit-slide-number"), function() {})
            }), o.on("orbit:after-slide-change.fndtn.orbit", function(e, t) {
                var n = o.find("." + s.settings.slide_number_class);
                n.length === 1 && n.replaceWith(s._slide_number_html(t.slide_number, t.total_slides))
            }).on("orbit:next-slide.fndtn.orbit click.fndtn.orbit", "." + s.settings.next_class, function(e) {
                e.preventDefault(), s._reset_timer(i, !0), s._goto(i, "next", function() {})
            }).on("orbit:prev-slide.fndtn.orbit click.fndtn.orbit", "." + s.settings.prev_class, function(e) {
                e.preventDefault(), s._reset_timer(i, !0), s._goto(i, "prev", function() {})
            }).on("orbit:toggle-play-pause.fndtn.orbit click.fndtn.orbit touchstart.fndtn.orbit", "." + s.settings.timer_container_class, function(t) {
                t.preventDefault();
                var n = e(t.currentTarget).toggleClass(s.settings.timer_paused_class),
                    r = n.closest("." + s.settings.container_class).find("." + s.settings.slides_container_class);
                n.hasClass(s.settings.timer_paused_class) ? s._stop_timer(r) : s._start_timer(r)
            }).on("touchstart.fndtn.orbit", function(e) {
                e.touches || (e = e.originalEvent);
                var t = {
                    start_page_x: e.touches[0].pageX,
                    start_page_y: e.touches[0].pageY,
                    start_time: (new Date).getTime(),
                    delta_x: 0,
                    is_scrolling: r
                };
                o.data("swipe-transition", t), e.stopPropagation()
            }).on("touchmove.fndtn.orbit", function(e) {
                e.touches || (e = e.originalEvent);
                if (e.touches.length > 1 || e.scale && e.scale !== 1) return;
                var t = o.data("swipe-transition");
                typeof t == "undefined" && (t = {}), t.delta_x = e.touches[0].pageX - t.start_page_x, typeof t.is_scrolling == "undefined" && (t.is_scrolling = !!(t.is_scrolling || Math.abs(t.delta_x) < Math.abs(e.touches[0].pageY - t.start_page_y)));
                if (!t.is_scrolling && !t.active) {
                    e.preventDefault(), s._stop_timer(i);
                    var n = t.delta_x < 0 ? "next" : "prev";
                    t.active = !0, s._goto(i, n, function() {})
                }
            }).on("touchend.fndtn.orbit", function(e) {
                o.data("swipe-transition", {}), e.stopPropagation()
            })
        },
        _init_dimensions: function(e) {
            var t = e.parent(),
                n = e.children();
            e.css("width", n.length * 100 + "%"), n.css("width", 100 / n.length + "%"), e.height(t.height()), e.css("width", n.length * 100 + "%")
        },
        _start_timer: function(e) {
            var t = this,
                n = e.parent(),
                r = function() {
                    t._reset_timer(e, !1), t._goto(e, "next", function() {
                        t._start_timer(e)
                    })
                },
                i = n.find("." + t.settings.timer_container_class),
                s = i.find("." + t.settings.timer_progress_class),
                o = s.width() / i.width(),
                u = t.settings.timer_speed - o * t.settings.timer_speed;
            s.animate({
                width: "100%"
            }, u, "linear", r), e.trigger("orbit:timer-started")
        },
        _stop_timer: function(e) {
            var t = this,
                n = e.parent(),
                r = n.find("." + t.settings.timer_container_class),
                i = r.find("." + t.settings.timer_progress_class),
                s = i.width() / r.width();
            t._rebuild_timer(n, s * 100 + "%"), e.trigger("orbit:timer-stopped"), r = n.find("." + t.settings.timer_container_class), r.addClass(t.settings.timer_paused_class)
        },
        _reset_timer: function(e, t) {
            var n = this,
                r = e.parent();
            n._rebuild_timer(r, "0%");
            if (typeof t == "boolean" && t) {
                var i = r.find("." + n.settings.timer_container_class);
                i.addClass(n.settings.timer_paused_class)
            }
        },
        _rebuild_timer: function(t, n) {
            var r = this,
                i = t.find("." + r.settings.timer_container_class),
                s = e(r._timer_html()),
                o = s.find("." + r.settings.timer_progress_class);
            if (typeof Zepto == "function") i.remove(), t.append(s), o.css("width", n);
            else if (typeof jQuery == "function") {
                var u = i.find("." + r.settings.timer_progress_class);
                u.css("width", n), u.stop()
            }
        },
        _goto: function(t, n, r) {
            var i = this,
                s = t.parent(),
                o = t.children(),
                u = t.find("." + i.settings.active_slide_class),
                a = u.index();
            if (s.hasClass(i.settings.orbit_transition_class)) return !1;
            n === "prev" ? a === 0 ? a = o.length - 1 : a-- : n === "next" ? a = (a + 1) % o.length : typeof n == "number" && (a = n % o.length), a === o.length - 1 && n === "next" ? (t.css("marginLeft", "0%"), a = 1) : a === 0 && n === "prev" && (t.css("marginLeft", "-" + (o.length - 1) * 100 + "%"), a = o.length - 2), s.addClass(i.settings.orbit_transition_class), u.removeClass(i.settings.active_slide_class), e(o[a]).addClass(i.settings.active_slide_class);
            var f = s.siblings("." + i.settings.bullets_container_class);
            f.length === 1 && (f.children().removeClass(i.settings.bullets_active_class), e(f.children()[a - 1]).addClass(i.settings.bullets_active_class));
            var l = "-" + a * 100 + "%";
            t.trigger("orbit:before-slide-change"), t.css("marginLeft") === l ? (s.removeClass(i.settings.orbit_transition_class), t.trigger("orbit:after-slide-change", [{
                slide_number: a,
                total_slides: t.children().length - 2
            }]), r()) : t.animate({
                marginLeft: l
            }, i.settings.animation_speed, "linear", function() {
                s.removeClass(i.settings.orbit_transition_class), t.trigger("orbit:after-slide-change", [{
                    slide_number: a,
                    total_slides: t.children().length - 2
                }]), r()
            })
        }
    }
}(Foundation.zj, this, this.document),
function(e, t, n) {
    function f(e) {
        var t = {},
            r = /^jQuery\d+$/;
        return n.each(e.attributes, function(e, n) {
            n.specified && !r.test(n.name) && (t[n.name] = n.value)
        }), t
    }

    function l(e, r) {
        var i = this,
            s = n(i);
        if (i.value == s.attr("placeholder") && s.hasClass("placeholder"))
            if (s.data("placeholder-password")) {
                s = s.hide().next().show().attr("id", s.removeAttr("id").data("placeholder-id"));
                if (e === !0) return s[0].value = r;
                s.focus()
            } else i.value = "", s.removeClass("placeholder"), i == t.activeElement && i.select()
    }

    function c() {
        var e, t = this,
            r = n(t),
            i = r,
            s = this.id;
        if (t.value == "") {
            if (t.type == "password") {
                if (!r.data("placeholder-textinput")) {
                    try {
                        e = r.clone().attr({
                            type: "text"
                        })
                    } catch (o) {
                        e = n("<input>").attr(n.extend(f(this), {
                            type: "text"
                        }))
                    }
                    e.removeAttr("name").data({
                        "placeholder-password": !0,
                        "placeholder-id": s
                    }).bind("focus.placeholder", l), r.data({
                        "placeholder-textinput": e,
                        "placeholder-id": s
                    }).before(e)
                }
                r = r.removeAttr("id").hide().prev().attr("id", s).show()
            }
            r.addClass("placeholder"), r[0].value = r.attr("placeholder")
        } else r.removeClass("placeholder")
    }
    var r = "placeholder" in t.createElement("input"),
        i = "placeholder" in t.createElement("textarea"),
        s = n.fn,
        o = n.valHooks,
        u, a;
    r && i ? (a = s.placeholder = function() {
        return this
    }, a.input = a.textarea = !0) : (a = s.placeholder = function() {
        var e = this;
        return e.filter((r ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({
            "focus.placeholder": l,
            "blur.placeholder": c
        }).data("placeholder-enabled", !0).trigger("blur.placeholder"), e
    }, a.input = r, a.textarea = i, u = {
        get: function(e) {
            var t = n(e);
            return t.data("placeholder-enabled") && t.hasClass("placeholder") ? "" : e.value
        },
        set: function(e, r) {
            var i = n(e);
            return i.data("placeholder-enabled") ? (r == "" ? (e.value = r, e != t.activeElement && c.call(e)) : i.hasClass("placeholder") ? l.call(e, !0, r) || (e.value = r) : e.value = r, i) : e.value = r
        }
    }, r || (o.input = u), i || (o.textarea = u), n(function() {
        n(t).delegate("form", "submit.placeholder", function() {
            var e = n(".placeholder", this).each(l);
            setTimeout(function() {
                e.each(c)
            }, 10)
        })
    }), n(e).bind("beforeunload.placeholder", function() {
        n(".placeholder").each(function() {
            this.value = ""
        })
    }))
}(this, document, Foundation.zj),
function(e, t, n, r) {
    "use strict";
    Foundation.libs.reveal = {
        name: "reveal",
        version: "4.0.9",
        locked: !1,
        settings: {
            animation: "fadeAndPop",
            animationSpeed: 250,
            closeOnBackgroundClick: !0,
            dismissModalClass: "close-reveal-modal",
            bgClass: "reveal-modal-bg",
            open: function() {},
            opened: function() {},
            close: function() {},
            closed: function() {},
            bg: e(".reveal-modal-bg"),
            css: {
                open: {
                    opacity: 0,
                    visibility: "visible",
                    display: "block"
                },
                close: {
                    opacity: 1,
                    visibility: "hidden",
                    display: "none"
                }
            }
        },
        init: function(t, n, r) {
            return this.scope = t || this.scope, Foundation.inherit(this, "data_options delay"), typeof n == "object" && e.extend(!0, this.settings, n), typeof n != "string" ? (this.events(), this.settings.init) : this[n].call(this, r)
        },
        events: function() {
            var t = this;
            return e(this.scope).off(".fndtn.reveal").on("click.fndtn.reveal", "[data-reveal-id]", function(n) {
                n.preventDefault(), t.locked || (t.locked = !0, t.open.call(t, e(this)))
            }).on("click.fndtn.reveal touchend.click.fndtn.reveal", this.close_targets(), function(n) {
                n.preventDefault(), t.locked || (t.locked = !0, t.close.call(t, e(this).closest(".reveal-modal")))
            }).on("open.fndtn.reveal", ".reveal-modal", this.settings.open).on("opened.fndtn.reveal", ".reveal-modal", this.settings.opened).on("opened.fndtn.reveal", ".reveal-modal", this.open_video).on("close.fndtn.reveal", ".reveal-modal", this.settings.close).on("closed.fndtn.reveal", ".reveal-modal", this.settings.closed).on("closed.fndtn.reveal", ".reveal-modal", this.close_video), !0
        },
        open: function(t) {
            if (t) var n = e("#" + t.data("reveal-id"));
            else var n = e(this.scope); if (!n.hasClass("open")) {
                var r = e(".reveal-modal.open");
                typeof n.data("css-top") == "undefined" && n.data("css-top", parseInt(n.css("top"), 10)).data("offset", this.cache_offset(n)), n.trigger("open"), r.length < 1 && this.toggle_bg(n), this.hide(r, this.settings.css.open), this.show(n, this.settings.css.open)
            }
        },
        close: function(t) {
            var t = t || e(this.scope),
                n = e(".reveal-modal.open");
            n.length > 0 && (this.locked = !0, t.trigger("close"), this.toggle_bg(t), this.hide(n, this.settings.css.close))
        },
        close_targets: function() {
            var e = "." + this.settings.dismissModalClass;
            return this.settings.closeOnBackgroundClick ? e + ", ." + this.settings.bgClass : e
        },
        toggle_bg: function(t) {
            e(".reveal-modal-bg").length === 0 && (this.settings.bg = e("<div />", {
                "class": this.settings.bgClass
            }).insertAfter(t)), this.settings.bg.filter(":visible").length > 0 ? this.hide(this.settings.bg) : this.show(this.settings.bg)
        },
        show: function(n, r) {
            if (r) {
                if (/pop/i.test(this.settings.animation)) {
                    r.top = e(t).scrollTop() - n.data("offset") + "px";
                    var i = {
                        top: e(t).scrollTop() + n.data("css-top") + "px",
                        opacity: 1
                    };
                    return this.delay(function() {
                        return n.css(r).animate(i, this.settings.animationSpeed, "linear", function() {
                            this.locked = !1, n.trigger("opened")
                        }.bind(this)).addClass("open")
                    }.bind(this), this.settings.animationSpeed / 2)
                }
                if (/fade/i.test(this.settings.animation)) {
                    var i = {
                        opacity: 1
                    };
                    return this.delay(function() {
                        return n.css(r).animate(i, this.settings.animationSpeed, "linear", function() {
                            this.locked = !1, n.trigger("opened")
                        }.bind(this)).addClass("open")
                    }.bind(this), this.settings.animationSpeed / 2)
                }
                return n.css(r).show().css({
                    opacity: 1
                }).addClass("open").trigger("opened")
            }
            return /fade/i.test(this.settings.animation) ? n.fadeIn(this.settings.animationSpeed / 2) : n.show()
        },
        hide: function(n, r) {
            if (r) {
                if (/pop/i.test(this.settings.animation)) {
                    var i = {
                        top: -e(t).scrollTop() - n.data("offset") + "px",
                        opacity: 0
                    };
                    return this.delay(function() {
                        return n.animate(i, this.settings.animationSpeed, "linear", function() {
                            this.locked = !1, n.css(r).trigger("closed")
                        }.bind(this)).removeClass("open")
                    }.bind(this), this.settings.animationSpeed / 2)
                }
                if (/fade/i.test(this.settings.animation)) {
                    var i = {
                        opacity: 0
                    };
                    return this.delay(function() {
                        return n.animate(i, this.settings.animationSpeed, "linear", function() {
                            this.locked = !1, n.css(r).trigger("closed")
                        }.bind(this)).removeClass("open")
                    }.bind(this), this.settings.animationSpeed / 2)
                }
                return n.hide().css(r).removeClass("open").trigger("closed")
            }
            return /fade/i.test(this.settings.animation) ? n.fadeOut(this.settings.animationSpeed / 2) : n.hide()
        },
        close_video: function(t) {
            var n = e(this).find(".flex-video"),
                r = n.find("iframe");
            r.length > 0 && (r.attr("data-src", r[0].src), r.attr("src", "about:blank"), n.fadeOut(100).hide())
        },
        open_video: function(t) {
            var n = e(this).find(".flex-video"),
                r = n.find("iframe");
            if (r.length > 0) {
                var i = r.attr("data-src");
                typeof i == "string" && (r[0].src = r.attr("data-src")), n.show().fadeIn(100)
            }
        },
        cache_offset: function(e) {
            var t = e.show().height() + parseInt(e.css("top"), 10);
            return e.hide(), t
        },
        off: function() {
            e(this.scope).off(".fndtn.reveal")
        }
    }
}(Foundation.zj, this, this.document),
function(e, t, n, r) {
    "use strict";
    Foundation.libs.section = {
        name: "section",
        version: "4.0.9",
        settings: {
            deep_linking: !1,
            one_up: !0,
            callback: function() {}
        },
        init: function(e, t, n) {
            var r = this;
            return this.scope = e || this.scope, Foundation.inherit(this, "throttle data_options"), typeof t != "string" ? (this.set_active_from_hash(), this.events(), !0) : this[t].call(this, n)
        },
        events: function() {
            var r = this;
            e(this.scope).on("click.fndtn.section", "[data-section] .title", function(t) {
                var n = e(this),
                    i = n.closest("[data-section]");
                r.toggle_active.call(this, t, r)
            }), e(t).on("resize.fndtn.section", r.throttle(function() {
                r.resize.call(this)
            }, 30)).on("hashchange", function() {
                r.settings.toggled || (r.set_active_from_hash(), e(this).trigger("resize"))
            }).trigger("resize"), e(n).on("click.fndtn.section", function(t) {
                e(t.target).closest(".title").length < 1 && e('[data-section="vertical-nav"], [data-section="horizontal-nav"]').find("section, .section").removeClass("active").attr("style", "")
            })
        },
        toggle_active: function(t, n) {
            var r = e(this),
                i = r.closest("section, .section"),
                s = i.find(".content"),
                o = i.closest("[data-section]"),
                n = Foundation.libs.section,
                u = e.extend({}, n.settings, n.data_options(o));
            n.settings.toggled = !0, !u.deep_linking && s.length > 0 && t.preventDefault();
            if (i.hasClass("active"))(n.small(o) || n.is_vertical(o) || n.is_horizontal(o) || n.is_accordion(o)) && i.removeClass("active").attr("style", "");
            else {
                var a = null,
                    f = n.outerHeight(i.find(".title"));
                if (n.small(o) || u.one_up) a = r.closest("[data-section]").find("section.active, .section.active"), n.small(o) ? a.attr("style", "") : a.attr("style", "visibility: hidden; padding-top: " + f + "px;");
                n.small(o) ? i.attr("style", "") : i.css("padding-top", f), i.addClass("active"), a !== null && a.removeClass("active").attr("style", "")
            }
            setTimeout(function() {
                n.settings.toggled = !1
            }, 300), u.callback()
        },
        resize: function() {
            var t = e("[data-section]"),
                n = Foundation.libs.section;
            t.each(function() {
                var t = e(this),
                    r = t.find("section.active, .section.active"),
                    i = e.extend({}, n.settings, n.data_options(t));
                if (r.length > 1) r.not(":first").removeClass("active").attr("style", "");
                else if (r.length < 1 && !n.is_vertical(t) && !n.is_horizontal(t) && !n.is_accordion(t)) {
                    var s = t.find("section, .section").first();
                    s.addClass("active"), n.small(t) ? s.attr("style", "") : s.css("padding-top", n.outerHeight(s.find(".title")))
                }
                n.small(t) ? r.attr("style", "") : r.css("padding-top", n.outerHeight(r.find(".title"))), n.position_titles(t), n.is_horizontal(t) && !n.small(t) ? n.position_content(t) : n.position_content(t, !1)
            })
        },
        is_vertical: function(e) {
            return /vertical-nav/i.test(e.data("section"))
        },
        is_horizontal: function(e) {
            return /horizontal-nav/i.test(e.data("section"))
        },
        is_accordion: function(e) {
            return /accordion/i.test(e.data("section"))
        },
        is_tabs: function(e) {
            return /tabs/i.test(e.data("section"))
        },
        set_active_from_hash: function() {
            var n = t.location.hash.substring(1),
                r = e("[data-section]"),
                i = this;
            r.each(function() {
                var t = e(this),
                    r = e.extend({}, i.settings, i.data_options(t));
                n.length > 0 && r.deep_linking && (t.find("section, .section").attr("style", "").removeClass("active"), t.find('.content[data-slug="' + n + '"]').closest("section, .section").addClass("active"))
            })
        },
        position_titles: function(t, n) {
            var r = t.find(".title"),
                i = 0,
                s = this;
            typeof n == "boolean" ? r.attr("style", "") : r.each(function() {
                e(this).css("left", i), i += s.outerWidth(e(this))
            })
        },
        position_content: function(t, n) {
            var r = t.find(".title"),
                i = t.find(".content"),
                s = this;
            typeof n == "boolean" ? (i.attr("style", ""), t.attr("style", "")) : (t.find("section, .section").each(function() {
                var t = e(this).find(".title"),
                    n = e(this).find(".content");
                n.css({
                    left: t.position().left - 1,
                    top: s.outerHeight(t) - 2
                })
            }), typeof Zepto == "function" ? t.height(this.outerHeight(r.first())) : t.height(this.outerHeight(r.first()) - 2))
        },
        small: function(t) {
            var n = e.extend({}, this.settings, this.data_options(t));
            return this.is_tabs(t) ? !1 : t && this.is_accordion(t) ? !0 : e("html").hasClass("lt-ie9") ? !0 : e("html").hasClass("ie8compat") ? !0 : e(this.scope).width() < 768
        },
        off: function() {
            e(this.scope).off(".fndtn.section"), e(t).off(".fndtn.section"), e(n).off(".fndtn.section")
        }
    }
}(Foundation.zj, this, this.document),
function(e, t, n, r) {
    "use strict";
    Foundation.libs.tooltips = {
        name: "tooltips",
        version: "4.0.2",
        settings: {
            selector: ".has-tip",
            additionalInheritableClasses: [],
            tooltipClass: ".tooltip",
            tipTemplate: function(e, t) {
                return '<span data-selector="' + e + '" class="' + Foundation.libs.tooltips.settings.tooltipClass.substring(1) + '">' + t + '<span class="nub"></span></span>'
            }
        },
        cache: {},
        init: function(t, n, r) {
            var i = this;
            this.scope = t || this.scope, typeof n == "object" && e.extend(!0, this.settings, n);
            if (typeof n == "string") return this[n].call(this, r);
            Modernizr.touch ? e(this.scope).on("click.fndtn.tooltip touchstart.fndtn.tooltip touchend.fndtn.tooltip", "[data-tooltip]", function(t) {
                t.preventDefault(), e(i.settings.tooltipClass).hide(), i.showOrCreateTip(e(this))
            }).on("click.fndtn.tooltip touchstart.fndtn.tooltip touchend.fndtn.tooltip", this.settings.tooltipClass, function(t) {
                t.preventDefault(), e(this).fadeOut(150)
            }) : e(this.scope).on("mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip", "[data-tooltip]", function(t) {
                var n = e(this);
                t.type === "mouseover" || t.type === "mouseenter" ? i.showOrCreateTip(n) : (t.type === "mouseout" || t.type === "mouseleave") && i.hide(n)
            })
        },
        showOrCreateTip: function(e) {
            var t = this.getTip(e);
            return t && t.length > 0 ? this.show(e) : this.create(e)
        },
        getTip: function(t) {
            var n = this.selector(t),
                r = null;
            return n && (r = e("span[data-selector=" + n + "]" + this.settings.tooltipClass)), typeof r == "object" ? r : !1
        },
        selector: function(e) {
            var t = e.attr("id"),
                n = e.attr("data-tooltip") || e.attr("data-selector");
            return (t && t.length < 1 || !t) && typeof n != "string" && (n = "tooltip" + Math.random().toString(36).substring(7), e.attr("data-selector", n)), t && t.length > 0 ? t : n
        },
        create: function(t) {
            var n = e(this.settings.tipTemplate(this.selector(t), e("<div>").html(t.attr("title")).html())),
                r = this.inheritable_classes(t);
            n.addClass(r).appendTo("body"), Modernizr.touch && n.append('<span class="tap-to-close">tap to close </span>'), t.removeAttr("title").attr("title", ""), this.show(t)
        },
        reposition: function(n, r, i) {
            var s, o, u, a, f, l;
            r.css("visibility", "hidden").show(), s = n.data("width"), o = r.children(".nub"), u = this.outerHeight(o), a = this.outerHeight(o), l = function(e, t, n, r, i, s) {
                return e.css({
                    top: t ? t : "auto",
                    bottom: r ? r : "auto",
                    left: i ? i : "auto",
                    right: n ? n : "auto",
                    width: s ? s : "auto"
                }).end()
            }, l(r, n.offset().top + this.outerHeight(n) + 10, "auto", "auto", n.offset().left, s), e(t).width() < 767 ? (l(r, n.offset().top + this.outerHeight(n) + 10, "auto", "auto", 12.5, e(this.scope).width()), r.addClass("tip-override"), l(o, -u, "auto", "auto", n.offset().left)) : (l(r, n.offset().top + this.outerHeight(n) + 10, "auto", "auto", n.offset().left, s), r.removeClass("tip-override"), i && i.indexOf("tip-top") > -1 ? l(r, n.offset().top - this.outerHeight(r), "auto", "auto", n.offset().left, s).removeClass("tip-override") : i && i.indexOf("tip-left") > -1 ? l(r, n.offset().top + this.outerHeight(n) / 2 - u * 2.5, "auto", "auto", n.offset().left - this.outerWidth(r) - u, s).removeClass("tip-override") : i && i.indexOf("tip-right") > -1 && l(r, n.offset().top + this.outerHeight(n) / 2 - u * 2.5, "auto", "auto", n.offset().left + this.outerWidth(n) + u, s).removeClass("tip-override")), r.css("visibility", "visible").hide()
        },
        inheritable_classes: function(t) {
            var n = ["tip-top", "tip-left", "tip-bottom", "tip-right", "noradius"].concat(this.settings.additionalInheritableClasses),
                r = t.attr("class"),
                i = r ? e.map(r.split(" "), function(t, r) {
                    if (e.inArray(t, n) !== -1) return t
                }).join(" ") : "";
            return e.trim(i)
        },
        show: function(e) {
            var t = this.getTip(e);
            this.reposition(e, t, e.attr("class")), t.fadeIn(150)
        },
        hide: function(e) {
            var t = this.getTip(e);
            t.fadeOut(150)
        },
        reload: function() {
            var t = e(this);
            return t.data("fndtn-tooltips") ? t.foundationTooltips("destroy").foundationTooltips("init") : t.foundationTooltips("init")
        },
        off: function() {
            e(this.scope).off(".fndtn.tooltip"), e(this.settings.tooltipClass).each(function(t) {
                e("[data-tooltip]").get(t).attr("title", e(this).text())
            }).remove()
        }
    }
}(Foundation.zj, this, this.document),
function(e, t, n, r) {
    "use strict";
    Foundation.libs.topbar = {
        name: "topbar",
        version: "4.0.0",
        settings: {
            index: 0,
            stickyClass: "sticky",
            custom_back_text: !0,
            back_text: "Back",
            init: !1
        },
        init: function(n, r, i) {
            var s = this;
            return this.scope = n || this.scope, typeof r == "object" && e.extend(!0, this.settings, r), typeof r != "string" ? (e(".top-bar").each(function() {
                s.settings.$w = e(t), s.settings.$topbar = e(this), s.settings.$section = s.settings.$topbar.find("section"), s.settings.$titlebar = s.settings.$topbar.children("ul").first(), s.settings.$topbar.data("index", 0);
                var n = e("<div class='top-bar-js-breakpoint'/>").insertAfter(s.settings.$topbar);
                s.settings.breakPoint = n.width(), n.remove(), s.assemble(), s.settings.$topbar.parent().hasClass("fixed") && e("body").css("padding-top", s.outerHeight(s.settings.$topbar))
            }), s.settings.init || this.events(), this.settings.init) : this[r].call(this, i)
        },
        events: function() {
            var n = this,
                r = this.outerHeight(e(".top-bar"));
            e(this.scope).on("click.fndtn.topbar", ".top-bar .toggle-topbar", function(i) {
                var s = e(this).closest(".top-bar"),
                    o = s.find("section, .section"),
                    u = s.children("ul").first();
                s.data("height") || n.largestUL(), i.preventDefault(), n.breakpoint() && s.toggleClass("expanded").css("min-height", ""), s.hasClass("expanded") || (o.css({
                    left: "0%"
                }), o.find(">.name").css({
                    left: "100%"
                }), o.find("li.moved").removeClass("moved"), s.data("index", 0)), s.parent().hasClass("fixed") ? (s.parent().removeClass("fixed"), e("body").css("padding-top", "0"), t.scrollTo(0)) : s.hasClass("fixed expanded") && (s.parent().addClass("fixed"), e("body").css("padding-top", r))
            }).on("click.fndtn.topbar", ".top-bar .has-dropdown>a", function(t) {
                var r = e(this).closest(".top-bar"),
                    i = r.find("section, .section"),
                    s = r.children("ul").first();
                (Modernizr.touch || n.breakpoint()) && t.preventDefault();
                if (n.breakpoint()) {
                    var o = e(this),
                        u = o.closest("li");
                    r.data("index", r.data("index") + 1), u.addClass("moved"), i.css({
                        left: -(100 * r.data("index")) + "%"
                    }), i.find(">.name").css({
                        left: 100 * r.data("index") + "%"
                    }), o.siblings("ul").height(r.data("height") + n.outerHeight(s, !0)), r.css("min-height", r.data("height") + n.outerHeight(s, !0) * 2)
                }
            }), e(t).on("resize.fndtn.topbar", function() {
                this.breakpoint() || e(".top-bar").css("min-height", "")
            }.bind(this)), e(this.scope).on("click.fndtn", ".top-bar .has-dropdown .back", function(t) {
                t.preventDefault();
                var n = e(this),
                    r = n.closest(".top-bar"),
                    i = r.find("section, .section"),
                    s = n.closest("li.moved"),
                    o = s.parent();
                r.data("index", r.data("index") - 1), i.css({
                    left: -(100 * r.data("index")) + "%"
                }), i.find(">.name").css({
                    left: 100 * r.data("index") + "%"
                }), r.data("index") === 0 && r.css("min-height", 0), setTimeout(function() {
                    s.removeClass("moved")
                }, 300)
            })
        },
        breakpoint: function() {
            return e(t).width() <= this.settings.breakPoint || e("html").hasClass("lt-ie9")
        },
        assemble: function() {
            var t = this;
            this.settings.$section.detach(), this.settings.$section.find(".has-dropdown>a").each(function() {
                var n = e(this),
                    r = n.siblings(".dropdown"),
                    i = e('<li class="title back js-generated"><h5><a href="#"></a></h5></li>');
                t.settings.custom_back_text == 1 ? i.find("h5>a").html("&laquo; " + t.settings.back_text) : i.find("h5>a").html("&laquo; " + n.html()), r.prepend(i)
            }), this.settings.$section.appendTo(this.settings.$topbar), this.sticky()
        },
        largestUL: function() {
            var t = this.settings.$topbar.find("section ul ul"),
                n = t.first(),
                r = 0,
                i = this;
            t.each(function() {
                e(this).children("li").length > n.children("li").length && (n = e(this))
            }), n.children("li").each(function() {
                r += i.outerHeight(e(this), !0)
            }), this.settings.$topbar.data("height", r)
        },
        sticky: function() {
            var n = "." + this.settings.stickyClass;
            if (e(n).length > 0) {
                var r = e(n).length ? e(n).offset().top : 0,
                    i = e(t),
                    s = this.outerHeight(e(".top-bar"));
                i.scroll(function() {
                    i.scrollTop() >= r ? (e(n).addClass("fixed"), e("body").css("padding-top", s)) : i.scrollTop() < r && (e(n).removeClass("fixed"), e("body").css("padding-top", "0"))
                })
            }
        },
        off: function() {
            e(this.scope).off(".fndtn.topbar"), e(t).off(".fndtn.topbar")
        }
    }
}(Foundation.zj, this, this.document);
var Handlebars = {};
(function(e, t) {
    e.VERSION = "1.0.0", e.COMPILER_REVISION = 4, e.REVISION_CHANGES = {
        1: "<= 1.0.rc.2",
        2: "== 1.0.0-rc.3",
        3: "== 1.0.0-rc.4",
        4: ">= 1.0.0"
    }, e.helpers = {}, e.partials = {};
    var n = Object.prototype.toString,
        r = "[object Function]",
        i = "[object Object]";
    e.registerHelper = function(t, r, s) {
        if (n.call(t) === i) {
            if (s || r) throw new e.Exception("Arg not supported with multiple helpers");
            e.Utils.extend(this.helpers, t)
        } else s && (r.not = s), this.helpers[t] = r
    }, e.registerPartial = function(t, r) {
        n.call(t) === i ? e.Utils.extend(this.partials, t) : this.partials[t] = r
    }, e.registerHelper("helperMissing", function(e) {
        if (arguments.length === 2) return t;
        throw new Error("Missing helper: '" + e + "'")
    }), e.registerHelper("blockHelperMissing", function(t, i) {
        var s = i.inverse || function() {},
            o = i.fn,
            u = n.call(t);
        return u === r && (t = t.call(this)), t === !0 ? o(this) : t === !1 || t == null ? s(this) : u === "[object Array]" ? t.length > 0 ? e.helpers.each(t, i) : s(this) : o(t)
    }), e.K = function() {}, e.createFrame = Object.create || function(t) {
        e.K.prototype = t;
        var n = new e.K;
        return e.K.prototype = null, n
    }, e.logger = {
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3,
        level: 3,
        methodMap: {
            0: "debug",
            1: "info",
            2: "warn",
            3: "error"
        },
        log: function(t, n) {
            if (e.logger.level <= t) {
                var r = e.logger.methodMap[t];
                typeof console != "undefined" && console[r] && console[r].call(console, n)
            }
        }
    }, e.log = function(t, n) {
        e.logger.log(t, n)
    }, e.registerHelper("each", function(t, i) {
        var s = i.fn,
            o = i.inverse,
            u = 0,
            a = "",
            f, l = n.call(t);
        l === r && (t = t.call(this)), i.data && (f = e.createFrame(i.data));
        if (t && typeof t == "object")
            if (t instanceof Array)
                for (var c = t.length; u < c; u++) f && (f.index = u), a += s(t[u], {
                    data: f
                });
            else
                for (var h in t) t.hasOwnProperty(h) && (f && (f.key = h), a += s(t[h], {
                    data: f
                }), u++);
        return u === 0 && (a = o(this)), a
    }), e.registerHelper("if", function(t, i) {
        var s = n.call(t);
        return s === r && (t = t.call(this)), !t || e.Utils.isEmpty(t) ? i.inverse(this) : i.fn(this)
    }), e.registerHelper("unless", function(t, n) {
        return e.helpers["if"].call(this, t, {
            fn: n.inverse,
            inverse: n.fn
        })
    }), e.registerHelper("with", function(t, i) {
        var s = n.call(t);
        s === r && (t = t.call(this));
        if (!e.Utils.isEmpty(t)) return i.fn(t)
    }), e.registerHelper("log", function(t, n) {
        var r = n.data && n.data.level != null ? parseInt(n.data.level, 10) : 1;
        e.log(r, t)
    });
    var s = function() {
        function n() {
            this.yy = {}
        }
        var e = {
                trace: function() {},
                yy: {},
                symbols_: {
                    error: 2,
                    root: 3,
                    program: 4,
                    EOF: 5,
                    simpleInverse: 6,
                    statements: 7,
                    statement: 8,
                    openInverse: 9,
                    closeBlock: 10,
                    openBlock: 11,
                    mustache: 12,
                    partial: 13,
                    CONTENT: 14,
                    COMMENT: 15,
                    OPEN_BLOCK: 16,
                    inMustache: 17,
                    CLOSE: 18,
                    OPEN_INVERSE: 19,
                    OPEN_ENDBLOCK: 20,
                    path: 21,
                    OPEN: 22,
                    OPEN_UNESCAPED: 23,
                    CLOSE_UNESCAPED: 24,
                    OPEN_PARTIAL: 25,
                    partialName: 26,
                    params: 27,
                    hash: 28,
                    dataName: 29,
                    param: 30,
                    STRING: 31,
                    INTEGER: 32,
                    BOOLEAN: 33,
                    hashSegments: 34,
                    hashSegment: 35,
                    ID: 36,
                    EQUALS: 37,
                    DATA: 38,
                    pathSegments: 39,
                    SEP: 40,
                    $accept: 0,
                    $end: 1
                },
                terminals_: {
                    2: "error",
                    5: "EOF",
                    14: "CONTENT",
                    15: "COMMENT",
                    16: "OPEN_BLOCK",
                    18: "CLOSE",
                    19: "OPEN_INVERSE",
                    20: "OPEN_ENDBLOCK",
                    22: "OPEN",
                    23: "OPEN_UNESCAPED",
                    24: "CLOSE_UNESCAPED",
                    25: "OPEN_PARTIAL",
                    31: "STRING",
                    32: "INTEGER",
                    33: "BOOLEAN",
                    36: "ID",
                    37: "EQUALS",
                    38: "DATA",
                    40: "SEP"
                },
                productions_: [0, [3, 2],
                    [4, 2],
                    [4, 3],
                    [4, 2],
                    [4, 1],
                    [4, 1],
                    [4, 0],
                    [7, 1],
                    [7, 2],
                    [8, 3],
                    [8, 3],
                    [8, 1],
                    [8, 1],
                    [8, 1],
                    [8, 1],
                    [11, 3],
                    [9, 3],
                    [10, 3],
                    [12, 3],
                    [12, 3],
                    [13, 3],
                    [13, 4],
                    [6, 2],
                    [17, 3],
                    [17, 2],
                    [17, 2],
                    [17, 1],
                    [17, 1],
                    [27, 2],
                    [27, 1],
                    [30, 1],
                    [30, 1],
                    [30, 1],
                    [30, 1],
                    [30, 1],
                    [28, 1],
                    [34, 2],
                    [34, 1],
                    [35, 3],
                    [35, 3],
                    [35, 3],
                    [35, 3],
                    [35, 3],
                    [26, 1],
                    [26, 1],
                    [26, 1],
                    [29, 2],
                    [21, 1],
                    [39, 3],
                    [39, 1]
                ],
                performAction: function(t, n, r, i, s, o, u) {
                    var a = o.length - 1;
                    switch (s) {
                        case 1:
                            return o[a - 1];
                        case 2:
                            this.$ = new i.ProgramNode([], o[a]);
                            break;
                        case 3:
                            this.$ = new i.ProgramNode(o[a - 2], o[a]);
                            break;
                        case 4:
                            this.$ = new i.ProgramNode(o[a - 1], []);
                            break;
                        case 5:
                            this.$ = new i.ProgramNode(o[a]);
                            break;
                        case 6:
                            this.$ = new i.ProgramNode([], []);
                            break;
                        case 7:
                            this.$ = new i.ProgramNode([]);
                            break;
                        case 8:
                            this.$ = [o[a]];
                            break;
                        case 9:
                            o[a - 1].push(o[a]), this.$ = o[a - 1];
                            break;
                        case 10:
                            this.$ = new i.BlockNode(o[a - 2], o[a - 1].inverse, o[a - 1], o[a]);
                            break;
                        case 11:
                            this.$ = new i.BlockNode(o[a - 2], o[a - 1], o[a - 1].inverse, o[a]);
                            break;
                        case 12:
                            this.$ = o[a];
                            break;
                        case 13:
                            this.$ = o[a];
                            break;
                        case 14:
                            this.$ = new i.ContentNode(o[a]);
                            break;
                        case 15:
                            this.$ = new i.CommentNode(o[a]);
                            break;
                        case 16:
                            this.$ = new i.MustacheNode(o[a - 1][0], o[a - 1][1]);
                            break;
                        case 17:
                            this.$ = new i.MustacheNode(o[a - 1][0], o[a - 1][1]);
                            break;
                        case 18:
                            this.$ = o[a - 1];
                            break;
                        case 19:
                            this.$ = new i.MustacheNode(o[a - 1][0], o[a - 1][1], o[a - 2][2] === "&");
                            break;
                        case 20:
                            this.$ = new i.MustacheNode(o[a - 1][0], o[a - 1][1], !0);
                            break;
                        case 21:
                            this.$ = new i.PartialNode(o[a - 1]);
                            break;
                        case 22:
                            this.$ = new i.PartialNode(o[a - 2], o[a - 1]);
                            break;
                        case 23:
                            break;
                        case 24:
                            this.$ = [
                                [o[a - 2]].concat(o[a - 1]), o[a]
                            ];
                            break;
                        case 25:
                            this.$ = [
                                [o[a - 1]].concat(o[a]), null
                            ];
                            break;
                        case 26:
                            this.$ = [
                                [o[a - 1]], o[a]
                            ];
                            break;
                        case 27:
                            this.$ = [
                                [o[a]], null
                            ];
                            break;
                        case 28:
                            this.$ = [
                                [o[a]], null
                            ];
                            break;
                        case 29:
                            o[a - 1].push(o[a]), this.$ = o[a - 1];
                            break;
                        case 30:
                            this.$ = [o[a]];
                            break;
                        case 31:
                            this.$ = o[a];
                            break;
                        case 32:
                            this.$ = new i.StringNode(o[a]);
                            break;
                        case 33:
                            this.$ = new i.IntegerNode(o[a]);
                            break;
                        case 34:
                            this.$ = new i.BooleanNode(o[a]);
                            break;
                        case 35:
                            this.$ = o[a];
                            break;
                        case 36:
                            this.$ = new i.HashNode(o[a]);
                            break;
                        case 37:
                            o[a - 1].push(o[a]), this.$ = o[a - 1];
                            break;
                        case 38:
                            this.$ = [o[a]];
                            break;
                        case 39:
                            this.$ = [o[a - 2], o[a]];
                            break;
                        case 40:
                            this.$ = [o[a - 2], new i.StringNode(o[a])];
                            break;
                        case 41:
                            this.$ = [o[a - 2], new i.IntegerNode(o[a])];
                            break;
                        case 42:
                            this.$ = [o[a - 2], new i.BooleanNode(o[a])];
                            break;
                        case 43:
                            this.$ = [o[a - 2], o[a]];
                            break;
                        case 44:
                            this.$ = new i.PartialNameNode(o[a]);
                            break;
                        case 45:
                            this.$ = new i.PartialNameNode(new i.StringNode(o[a]));
                            break;
                        case 46:
                            this.$ = new i.PartialNameNode(new i.IntegerNode(o[a]));
                            break;
                        case 47:
                            this.$ = new i.DataNode(o[a]);
                            break;
                        case 48:
                            this.$ = new i.IdNode(o[a]);
                            break;
                        case 49:
                            o[a - 2].push({
                                part: o[a],
                                separator: o[a - 1]
                            }), this.$ = o[a - 2];
                            break;
                        case 50:
                            this.$ = [{
                                part: o[a]
                            }]
                    }
                },
                table: [{
                    3: 1,
                    4: 2,
                    5: [2, 7],
                    6: 3,
                    7: 4,
                    8: 6,
                    9: 7,
                    11: 8,
                    12: 9,
                    13: 10,
                    14: [1, 11],
                    15: [1, 12],
                    16: [1, 13],
                    19: [1, 5],
                    22: [1, 14],
                    23: [1, 15],
                    25: [1, 16]
                }, {
                    1: [3]
                }, {
                    5: [1, 17]
                }, {
                    5: [2, 6],
                    7: 18,
                    8: 6,
                    9: 7,
                    11: 8,
                    12: 9,
                    13: 10,
                    14: [1, 11],
                    15: [1, 12],
                    16: [1, 13],
                    19: [1, 19],
                    20: [2, 6],
                    22: [1, 14],
                    23: [1, 15],
                    25: [1, 16]
                }, {
                    5: [2, 5],
                    6: 20,
                    8: 21,
                    9: 7,
                    11: 8,
                    12: 9,
                    13: 10,
                    14: [1, 11],
                    15: [1, 12],
                    16: [1, 13],
                    19: [1, 5],
                    20: [2, 5],
                    22: [1, 14],
                    23: [1, 15],
                    25: [1, 16]
                }, {
                    17: 23,
                    18: [1, 22],
                    21: 24,
                    29: 25,
                    36: [1, 28],
                    38: [1, 27],
                    39: 26
                }, {
                    5: [2, 8],
                    14: [2, 8],
                    15: [2, 8],
                    16: [2, 8],
                    19: [2, 8],
                    20: [2, 8],
                    22: [2, 8],
                    23: [2, 8],
                    25: [2, 8]
                }, {
                    4: 29,
                    6: 3,
                    7: 4,
                    8: 6,
                    9: 7,
                    11: 8,
                    12: 9,
                    13: 10,
                    14: [1, 11],
                    15: [1, 12],
                    16: [1, 13],
                    19: [1, 5],
                    20: [2, 7],
                    22: [1, 14],
                    23: [1, 15],
                    25: [1, 16]
                }, {
                    4: 30,
                    6: 3,
                    7: 4,
                    8: 6,
                    9: 7,
                    11: 8,
                    12: 9,
                    13: 10,
                    14: [1, 11],
                    15: [1, 12],
                    16: [1, 13],
                    19: [1, 5],
                    20: [2, 7],
                    22: [1, 14],
                    23: [1, 15],
                    25: [1, 16]
                }, {
                    5: [2, 12],
                    14: [2, 12],
                    15: [2, 12],
                    16: [2, 12],
                    19: [2, 12],
                    20: [2, 12],
                    22: [2, 12],
                    23: [2, 12],
                    25: [2, 12]
                }, {
                    5: [2, 13],
                    14: [2, 13],
                    15: [2, 13],
                    16: [2, 13],
                    19: [2, 13],
                    20: [2, 13],
                    22: [2, 13],
                    23: [2, 13],
                    25: [2, 13]
                }, {
                    5: [2, 14],
                    14: [2, 14],
                    15: [2, 14],
                    16: [2, 14],
                    19: [2, 14],
                    20: [2, 14],
                    22: [2, 14],
                    23: [2, 14],
                    25: [2, 14]
                }, {
                    5: [2, 15],
                    14: [2, 15],
                    15: [2, 15],
                    16: [2, 15],
                    19: [2, 15],
                    20: [2, 15],
                    22: [2, 15],
                    23: [2, 15],
                    25: [2, 15]
                }, {
                    17: 31,
                    21: 24,
                    29: 25,
                    36: [1, 28],
                    38: [1, 27],
                    39: 26
                }, {
                    17: 32,
                    21: 24,
                    29: 25,
                    36: [1, 28],
                    38: [1, 27],
                    39: 26
                }, {
                    17: 33,
                    21: 24,
                    29: 25,
                    36: [1, 28],
                    38: [1, 27],
                    39: 26
                }, {
                    21: 35,
                    26: 34,
                    31: [1, 36],
                    32: [1, 37],
                    36: [1, 28],
                    39: 26
                }, {
                    1: [2, 1]
                }, {
                    5: [2, 2],
                    8: 21,
                    9: 7,
                    11: 8,
                    12: 9,
                    13: 10,
                    14: [1, 11],
                    15: [1, 12],
                    16: [1, 13],
                    19: [1, 19],
                    20: [2, 2],
                    22: [1, 14],
                    23: [1, 15],
                    25: [1, 16]
                }, {
                    17: 23,
                    21: 24,
                    29: 25,
                    36: [1, 28],
                    38: [1, 27],
                    39: 26
                }, {
                    5: [2, 4],
                    7: 38,
                    8: 6,
                    9: 7,
                    11: 8,
                    12: 9,
                    13: 10,
                    14: [1, 11],
                    15: [1, 12],
                    16: [1, 13],
                    19: [1, 19],
                    20: [2, 4],
                    22: [1, 14],
                    23: [1, 15],
                    25: [1, 16]
                }, {
                    5: [2, 9],
                    14: [2, 9],
                    15: [2, 9],
                    16: [2, 9],
                    19: [2, 9],
                    20: [2, 9],
                    22: [2, 9],
                    23: [2, 9],
                    25: [2, 9]
                }, {
                    5: [2, 23],
                    14: [2, 23],
                    15: [2, 23],
                    16: [2, 23],
                    19: [2, 23],
                    20: [2, 23],
                    22: [2, 23],
                    23: [2, 23],
                    25: [2, 23]
                }, {
                    18: [1, 39]
                }, {
                    18: [2, 27],
                    21: 44,
                    24: [2, 27],
                    27: 40,
                    28: 41,
                    29: 48,
                    30: 42,
                    31: [1, 45],
                    32: [1, 46],
                    33: [1, 47],
                    34: 43,
                    35: 49,
                    36: [1, 50],
                    38: [1, 27],
                    39: 26
                }, {
                    18: [2, 28],
                    24: [2, 28]
                }, {
                    18: [2, 48],
                    24: [2, 48],
                    31: [2, 48],
                    32: [2, 48],
                    33: [2, 48],
                    36: [2, 48],
                    38: [2, 48],
                    40: [1, 51]
                }, {
                    21: 52,
                    36: [1, 28],
                    39: 26
                }, {
                    18: [2, 50],
                    24: [2, 50],
                    31: [2, 50],
                    32: [2, 50],
                    33: [2, 50],
                    36: [2, 50],
                    38: [2, 50],
                    40: [2, 50]
                }, {
                    10: 53,
                    20: [1, 54]
                }, {
                    10: 55,
                    20: [1, 54]
                }, {
                    18: [1, 56]
                }, {
                    18: [1, 57]
                }, {
                    24: [1, 58]
                }, {
                    18: [1, 59],
                    21: 60,
                    36: [1, 28],
                    39: 26
                }, {
                    18: [2, 44],
                    36: [2, 44]
                }, {
                    18: [2, 45],
                    36: [2, 45]
                }, {
                    18: [2, 46],
                    36: [2, 46]
                }, {
                    5: [2, 3],
                    8: 21,
                    9: 7,
                    11: 8,
                    12: 9,
                    13: 10,
                    14: [1, 11],
                    15: [1, 12],
                    16: [1, 13],
                    19: [1, 19],
                    20: [2, 3],
                    22: [1, 14],
                    23: [1, 15],
                    25: [1, 16]
                }, {
                    14: [2, 17],
                    15: [2, 17],
                    16: [2, 17],
                    19: [2, 17],
                    20: [2, 17],
                    22: [2, 17],
                    23: [2, 17],
                    25: [2, 17]
                }, {
                    18: [2, 25],
                    21: 44,
                    24: [2, 25],
                    28: 61,
                    29: 48,
                    30: 62,
                    31: [1, 45],
                    32: [1, 46],
                    33: [1, 47],
                    34: 43,
                    35: 49,
                    36: [1, 50],
                    38: [1, 27],
                    39: 26
                }, {
                    18: [2, 26],
                    24: [2, 26]
                }, {
                    18: [2, 30],
                    24: [2, 30],
                    31: [2, 30],
                    32: [2, 30],
                    33: [2, 30],
                    36: [2, 30],
                    38: [2, 30]
                }, {
                    18: [2, 36],
                    24: [2, 36],
                    35: 63,
                    36: [1, 64]
                }, {
                    18: [2, 31],
                    24: [2, 31],
                    31: [2, 31],
                    32: [2, 31],
                    33: [2, 31],
                    36: [2, 31],
                    38: [2, 31]
                }, {
                    18: [2, 32],
                    24: [2, 32],
                    31: [2, 32],
                    32: [2, 32],
                    33: [2, 32],
                    36: [2, 32],
                    38: [2, 32]
                }, {
                    18: [2, 33],
                    24: [2, 33],
                    31: [2, 33],
                    32: [2, 33],
                    33: [2, 33],
                    36: [2, 33],
                    38: [2, 33]
                }, {
                    18: [2, 34],
                    24: [2, 34],
                    31: [2, 34],
                    32: [2, 34],
                    33: [2, 34],
                    36: [2, 34],
                    38: [2, 34]
                }, {
                    18: [2, 35],
                    24: [2, 35],
                    31: [2, 35],
                    32: [2, 35],
                    33: [2, 35],
                    36: [2, 35],
                    38: [2, 35]
                }, {
                    18: [2, 38],
                    24: [2, 38],
                    36: [2, 38]
                }, {
                    18: [2, 50],
                    24: [2, 50],
                    31: [2, 50],
                    32: [2, 50],
                    33: [2, 50],
                    36: [2, 50],
                    37: [1, 65],
                    38: [2, 50],
                    40: [2, 50]
                }, {
                    36: [1, 66]
                }, {
                    18: [2, 47],
                    24: [2, 47],
                    31: [2, 47],
                    32: [2, 47],
                    33: [2, 47],
                    36: [2, 47],
                    38: [2, 47]
                }, {
                    5: [2, 10],
                    14: [2, 10],
                    15: [2, 10],
                    16: [2, 10],
                    19: [2, 10],
                    20: [2, 10],
                    22: [2, 10],
                    23: [2, 10],
                    25: [2, 10]
                }, {
                    21: 67,
                    36: [1, 28],
                    39: 26
                }, {
                    5: [2, 11],
                    14: [2, 11],
                    15: [2, 11],
                    16: [2, 11],
                    19: [2, 11],
                    20: [2, 11],
                    22: [2, 11],
                    23: [2, 11],
                    25: [2, 11]
                }, {
                    14: [2, 16],
                    15: [2, 16],
                    16: [2, 16],
                    19: [2, 16],
                    20: [2, 16],
                    22: [2, 16],
                    23: [2, 16],
                    25: [2, 16]
                }, {
                    5: [2, 19],
                    14: [2, 19],
                    15: [2, 19],
                    16: [2, 19],
                    19: [2, 19],
                    20: [2, 19],
                    22: [2, 19],
                    23: [2, 19],
                    25: [2, 19]
                }, {
                    5: [2, 20],
                    14: [2, 20],
                    15: [2, 20],
                    16: [2, 20],
                    19: [2, 20],
                    20: [2, 20],
                    22: [2, 20],
                    23: [2, 20],
                    25: [2, 20]
                }, {
                    5: [2, 21],
                    14: [2, 21],
                    15: [2, 21],
                    16: [2, 21],
                    19: [2, 21],
                    20: [2, 21],
                    22: [2, 21],
                    23: [2, 21],
                    25: [2, 21]
                }, {
                    18: [1, 68]
                }, {
                    18: [2, 24],
                    24: [2, 24]
                }, {
                    18: [2, 29],
                    24: [2, 29],
                    31: [2, 29],
                    32: [2, 29],
                    33: [2, 29],
                    36: [2, 29],
                    38: [2, 29]
                }, {
                    18: [2, 37],
                    24: [2, 37],
                    36: [2, 37]
                }, {
                    37: [1, 65]
                }, {
                    21: 69,
                    29: 73,
                    31: [1, 70],
                    32: [1, 71],
                    33: [1, 72],
                    36: [1, 28],
                    38: [1, 27],
                    39: 26
                }, {
                    18: [2, 49],
                    24: [2, 49],
                    31: [2, 49],
                    32: [2, 49],
                    33: [2, 49],
                    36: [2, 49],
                    38: [2, 49],
                    40: [2, 49]
                }, {
                    18: [1, 74]
                }, {
                    5: [2, 22],
                    14: [2, 22],
                    15: [2, 22],
                    16: [2, 22],
                    19: [2, 22],
                    20: [2, 22],
                    22: [2, 22],
                    23: [2, 22],
                    25: [2, 22]
                }, {
                    18: [2, 39],
                    24: [2, 39],
                    36: [2, 39]
                }, {
                    18: [2, 40],
                    24: [2, 40],
                    36: [2, 40]
                }, {
                    18: [2, 41],
                    24: [2, 41],
                    36: [2, 41]
                }, {
                    18: [2, 42],
                    24: [2, 42],
                    36: [2, 42]
                }, {
                    18: [2, 43],
                    24: [2, 43],
                    36: [2, 43]
                }, {
                    5: [2, 18],
                    14: [2, 18],
                    15: [2, 18],
                    16: [2, 18],
                    19: [2, 18],
                    20: [2, 18],
                    22: [2, 18],
                    23: [2, 18],
                    25: [2, 18]
                }],
                defaultActions: {
                    17: [2, 1]
                },
                parseError: function(t, n) {
                    throw new Error(t)
                },
                parse: function(t) {
                    function v(e) {
                        r.length = r.length - 2 * e, i.length = i.length - e, s.length = s.length - e
                    }

                    function m() {
                        var e;
                        return e = n.lexer.lex() || 1, typeof e != "number" && (e = n.symbols_[e] || e), e
                    }
                    var n = this,
                        r = [0],
                        i = [null],
                        s = [],
                        o = this.table,
                        u = "",
                        a = 0,
                        f = 0,
                        l = 0,
                        c = 2,
                        h = 1;
                    this.lexer.setInput(t), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, this.yy.parser = this, typeof this.lexer.yylloc == "undefined" && (this.lexer.yylloc = {});
                    var p = this.lexer.yylloc;
                    s.push(p);
                    var d = this.lexer.options && this.lexer.options.ranges;
                    typeof this.yy.parseError == "function" && (this.parseError = this.yy.parseError);
                    var g, y, b, w, E, S, x = {},
                        T, N, C, k;
                    for (;;) {
                        b = r[r.length - 1];
                        if (this.defaultActions[b]) w = this.defaultActions[b];
                        else {
                            if (g === null || typeof g == "undefined") g = m();
                            w = o[b] && o[b][g]
                        } if (typeof w == "undefined" || !w.length || !w[0]) {
                            var L = "";
                            if (!l) {
                                k = [];
                                for (T in o[b]) this.terminals_[T] && T > 2 && k.push("'" + this.terminals_[T] + "'");
                                this.lexer.showPosition ? L = "Parse error on line " + (a + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + k.join(", ") + ", got '" + (this.terminals_[g] || g) + "'" : L = "Parse error on line " + (a + 1) + ": Unexpected " + (g == 1 ? "end of input" : "'" + (this.terminals_[g] || g) + "'"), this.parseError(L, {
                                    text: this.lexer.match,
                                    token: this.terminals_[g] || g,
                                    line: this.lexer.yylineno,
                                    loc: p,
                                    expected: k
                                })
                            }
                        }
                        if (w[0] instanceof Array && w.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + b + ", token: " + g);
                        switch (w[0]) {
                            case 1:
                                r.push(g), i.push(this.lexer.yytext), s.push(this.lexer.yylloc), r.push(w[1]), g = null, y ? (g = y, y = null) : (f = this.lexer.yyleng, u = this.lexer.yytext, a = this.lexer.yylineno, p = this.lexer.yylloc, l > 0 && l--);
                                break;
                            case 2:
                                N = this.productions_[w[1]][1], x.$ = i[i.length - N], x._$ = {
                                    first_line: s[s.length - (N || 1)].first_line,
                                    last_line: s[s.length - 1].last_line,
                                    first_column: s[s.length - (N || 1)].first_column,
                                    last_column: s[s.length - 1].last_column
                                }, d && (x._$.range = [s[s.length - (N || 1)].range[0], s[s.length - 1].range[1]]), S = this.performAction.call(x, u, f, a, this.yy, w[1], i, s);
                                if (typeof S != "undefined") return S;
                                N && (r = r.slice(0, -1 * N * 2), i = i.slice(0, -1 * N), s = s.slice(0, -1 * N)), r.push(this.productions_[w[1]][0]), i.push(x.$), s.push(x._$), C = o[r[r.length - 2]][r[r.length - 1]], r.push(C);
                                break;
                            case 3:
                                return !0
                        }
                    }
                    return !0
                }
            },
            t = function() {
                var e = {
                    EOF: 1,
                    parseError: function(t, n) {
                        if (!this.yy.parser) throw new Error(t);
                        this.yy.parser.parseError(t, n)
                    },
                    setInput: function(e) {
                        return this._input = e, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
                            first_line: 1,
                            first_column: 0,
                            last_line: 1,
                            last_column: 0
                        }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this
                    },
                    input: function() {
                        var e = this._input[0];
                        this.yytext += e, this.yyleng++, this.offset++, this.match += e, this.matched += e;
                        var t = e.match(/(?:\r\n?|\n).*/g);
                        return t ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), e
                    },
                    unput: function(e) {
                        var t = e.length,
                            n = e.split(/(?:\r\n?|\n)/g);
                        this._input = e + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - t - 1), this.offset -= t;
                        var r = this.match.split(/(?:\r\n?|\n)/g);
                        this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), n.length - 1 && (this.yylineno -= n.length - 1);
                        var i = this.yylloc.range;
                        return this.yylloc = {
                            first_line: this.yylloc.first_line,
                            last_line: this.yylineno + 1,
                            first_column: this.yylloc.first_column,
                            last_column: n ? (n.length === r.length ? this.yylloc.first_column : 0) + r[r.length - n.length].length - n[0].length : this.yylloc.first_column - t
                        }, this.options.ranges && (this.yylloc.range = [i[0], i[0] + this.yyleng - t]), this
                    },
                    more: function() {
                        return this._more = !0, this
                    },
                    less: function(e) {
                        this.unput(this.match.slice(e))
                    },
                    pastInput: function() {
                        var e = this.matched.substr(0, this.matched.length - this.match.length);
                        return (e.length > 20 ? "..." : "") + e.substr(-20).replace(/\n/g, "")
                    },
                    upcomingInput: function() {
                        var e = this.match;
                        return e.length < 20 && (e += this._input.substr(0, 20 - e.length)), (e.substr(0, 20) + (e.length > 20 ? "..." : "")).replace(/\n/g, "")
                    },
                    showPosition: function() {
                        var e = this.pastInput(),
                            t = (new Array(e.length + 1)).join("-");
                        return e + this.upcomingInput() + "\n" + t + "^"
                    },
                    next: function() {
                        if (this.done) return this.EOF;
                        this._input || (this.done = !0);
                        var e, t, n, r, i, s;
                        this._more || (this.yytext = "", this.match = "");
                        var o = this._currentRules();
                        for (var u = 0; u < o.length; u++) {
                            n = this._input.match(this.rules[o[u]]);
                            if (n && (!t || n[0].length > t[0].length)) {
                                t = n, r = u;
                                if (!this.options.flex) break
                            }
                        }
                        if (t) {
                            s = t[0].match(/(?:\r\n?|\n).*/g), s && (this.yylineno += s.length), this.yylloc = {
                                first_line: this.yylloc.last_line,
                                last_line: this.yylineno + 1,
                                first_column: this.yylloc.last_column,
                                last_column: s ? s[s.length - 1].length - s[s.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + t[0].length
                            }, this.yytext += t[0], this.match += t[0], this.matches = t, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._input = this._input.slice(t[0].length), this.matched += t[0], e = this.performAction.call(this, this.yy, this, o[r], this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1);
                            if (e) return e;
                            return
                        }
                        return this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                            text: "",
                            token: null,
                            line: this.yylineno
                        })
                    },
                    lex: function() {
                        var t = this.next();
                        return typeof t != "undefined" ? t : this.lex()
                    },
                    begin: function(t) {
                        this.conditionStack.push(t)
                    },
                    popState: function() {
                        return this.conditionStack.pop()
                    },
                    _currentRules: function() {
                        return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules
                    },
                    topState: function() {
                        return this.conditionStack[this.conditionStack.length - 2]
                    },
                    pushState: function(t) {
                        this.begin(t)
                    }
                };
                return e.options = {}, e.performAction = function(t, n, r, i) {
                    var s = i;
                    switch (r) {
                        case 0:
                            return n.yytext = "\\", 14;
                        case 1:
                            n.yytext.slice(-1) !== "\\" && this.begin("mu"), n.yytext.slice(-1) === "\\" && (n.yytext = n.yytext.substr(0, n.yyleng - 1), this.begin("emu"));
                            if (n.yytext) return 14;
                            break;
                        case 2:
                            return 14;
                        case 3:
                            return n.yytext.slice(-1) !== "\\" && this.popState(), n.yytext.slice(-1) === "\\" && (n.yytext = n.yytext.substr(0, n.yyleng - 1)), 14;
                        case 4:
                            return n.yytext = n.yytext.substr(0, n.yyleng - 4), this.popState(), 15;
                        case 5:
                            return 25;
                        case 6:
                            return 16;
                        case 7:
                            return 20;
                        case 8:
                            return 19;
                        case 9:
                            return 19;
                        case 10:
                            return 23;
                        case 11:
                            return 22;
                        case 12:
                            this.popState(), this.begin("com");
                            break;
                        case 13:
                            return n.yytext = n.yytext.substr(3, n.yyleng - 5), this.popState(), 15;
                        case 14:
                            return 22;
                        case 15:
                            return 37;
                        case 16:
                            return 36;
                        case 17:
                            return 36;
                        case 18:
                            return 40;
                        case 19:
                            break;
                        case 20:
                            return this.popState(), 24;
                        case 21:
                            return this.popState(), 18;
                        case 22:
                            return n.yytext = n.yytext.substr(1, n.yyleng - 2).replace(/\\"/g, '"'), 31;
                        case 23:
                            return n.yytext = n.yytext.substr(1, n.yyleng - 2).replace(/\\'/g, "'"), 31;
                        case 24:
                            return 38;
                        case 25:
                            return 33;
                        case 26:
                            return 33;
                        case 27:
                            return 32;
                        case 28:
                            return 36;
                        case 29:
                            return n.yytext = n.yytext.substr(1, n.yyleng - 2), 36;
                        case 30:
                            return "INVALID";
                        case 31:
                            return 5
                    }
                }, e.rules = [/^(?:\\\\(?=(\{\{)))/, /^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|$)))/, /^(?:[\s\S]*?--\}\})/, /^(?:\{\{>)/, /^(?:\{\{#)/, /^(?:\{\{\/)/, /^(?:\{\{\^)/, /^(?:\{\{\s*else\b)/, /^(?:\{\{\{)/, /^(?:\{\{&)/, /^(?:\{\{!--)/, /^(?:\{\{![\s\S]*?\}\})/, /^(?:\{\{)/, /^(?:=)/, /^(?:\.(?=[}\/ ]))/, /^(?:\.\.)/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}\}\})/, /^(?:\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=[}\s]))/, /^(?:false(?=[}\s]))/, /^(?:-?[0-9]+(?=[}\s]))/, /^(?:[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.]))/, /^(?:\[[^\]]*\])/, /^(?:.)/, /^(?:$)/], e.conditions = {
                    mu: {
                        rules: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
                        inclusive: !1
                    },
                    emu: {
                        rules: [3],
                        inclusive: !1
                    },
                    com: {
                        rules: [4],
                        inclusive: !1
                    },
                    INITIAL: {
                        rules: [0, 1, 2, 31],
                        inclusive: !0
                    }
                }, e
            }();
        return e.lexer = t, n.prototype = e, e.Parser = n, new n
    }();
    e.Parser = s, e.parse = function(t) {
        return t.constructor === e.AST.ProgramNode ? t : (e.Parser.yy = e.AST, e.Parser.parse(t))
    }, e.AST = {}, e.AST.ProgramNode = function(t, n) {
        this.type = "program", this.statements = t, n && (this.inverse = new e.AST.ProgramNode(n))
    }, e.AST.MustacheNode = function(e, t, n) {
        this.type = "mustache", this.escaped = !n, this.hash = t;
        var r = this.id = e[0],
            i = this.params = e.slice(1),
            s = this.eligibleHelper = r.isSimple;
        this.isHelper = s && (i.length || t)
    }, e.AST.PartialNode = function(e, t) {
        this.type = "partial", this.partialName = e, this.context = t
    }, e.AST.BlockNode = function(t, n, r, i) {
        var s = function(t, n) {
            if (t.original !== n.original) throw new e.Exception(t.original + " doesn't match " + n.original)
        };
        s(t.id, i), this.type = "block", this.mustache = t, this.program = n, this.inverse = r, this.inverse && !this.program && (this.isInverse = !0)
    }, e.AST.ContentNode = function(e) {
        this.type = "content", this.string = e
    }, e.AST.HashNode = function(e) {
        this.type = "hash", this.pairs = e
    }, e.AST.IdNode = function(t) {
        this.type = "ID";
        var n = "",
            r = [],
            i = 0;
        for (var s = 0, o = t.length; s < o; s++) {
            var u = t[s].part;
            n += (t[s].separator || "") + u;
            if (u === ".." || u === "." || u === "this") {
                if (r.length > 0) throw new e.Exception("Invalid path: " + n);
                u === ".." ? i++ : this.isScoped = !0
            } else r.push(u)
        }
        this.original = n, this.parts = r, this.string = r.join("."), this.depth = i, this.isSimple = t.length === 1 && !this.isScoped && i === 0, this.stringModeValue = this.string
    }, e.AST.PartialNameNode = function(e) {
        this.type = "PARTIAL_NAME", this.name = e.original
    }, e.AST.DataNode = function(e) {
        this.type = "DATA", this.id = e
    }, e.AST.StringNode = function(e) {
        this.type = "STRING", this.original = this.string = this.stringModeValue = e
    }, e.AST.IntegerNode = function(e) {
        this.type = "INTEGER", this.original = this.integer = e, this.stringModeValue = Number(e)
    }, e.AST.BooleanNode = function(e) {
        this.type = "BOOLEAN", this.bool = e, this.stringModeValue = e === "true"
    }, e.AST.CommentNode = function(e) {
        this.type = "comment", this.comment = e
    };
    var o = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
    e.Exception = function(e) {
        var t = Error.prototype.constructor.apply(this, arguments);
        for (var n = 0; n < o.length; n++) this[o[n]] = t[o[n]]
    }, e.Exception.prototype = new Error, e.SafeString = function(e) {
        this.string = e
    }, e.SafeString.prototype.toString = function() {
        return this.string.toString()
    };
    var u = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        },
        a = /[&<>"'`]/g,
        f = /[&<>"'`]/,
        l = function(e) {
            return u[e] || "&amp;"
        };
    e.Utils = {
        extend: function(e, t) {
            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        },
        escapeExpression: function(t) {
            return t instanceof e.SafeString ? t.toString() : t == null || t === !1 ? "" : (t = t.toString(), f.test(t) ? t.replace(a, l) : t)
        },
        isEmpty: function(e) {
            return !e && e !== 0 ? !0 : n.call(e) === "[object Array]" && e.length === 0 ? !0 : !1
        }
    };
    var c = e.Compiler = function() {},
        h = e.JavaScriptCompiler = function() {};
    c.prototype = {
        compiler: c,
        disassemble: function() {
            var e = this.opcodes,
                t, n = [],
                r, i;
            for (var s = 0, o = e.length; s < o; s++) {
                t = e[s];
                if (t.opcode === "DECLARE") n.push("DECLARE " + t.name + "=" + t.value);
                else {
                    r = [];
                    for (var u = 0; u < t.args.length; u++) i = t.args[u], typeof i == "string" && (i = '"' + i.replace("\n", "\\n") + '"'), r.push(i);
                    n.push(t.opcode + " " + r.join(" "))
                }
            }
            return n.join("\n")
        },
        equals: function(e) {
            var t = this.opcodes.length;
            if (e.opcodes.length !== t) return !1;
            for (var n = 0; n < t; n++) {
                var r = this.opcodes[n],
                    i = e.opcodes[n];
                if (r.opcode !== i.opcode || r.args.length !== i.args.length) return !1;
                for (var s = 0; s < r.args.length; s++)
                    if (r.args[s] !== i.args[s]) return !1
            }
            t = this.children.length;
            if (e.children.length !== t) return !1;
            for (n = 0; n < t; n++)
                if (!this.children[n].equals(e.children[n])) return !1;
            return !0
        },
        guid: 0,
        compile: function(e, t) {
            this.children = [], this.depths = {
                list: []
            }, this.options = t;
            var n = this.options.knownHelpers;
            this.options.knownHelpers = {
                helperMissing: !0,
                blockHelperMissing: !0,
                each: !0,
                "if": !0,
                unless: !0,
                "with": !0,
                log: !0
            };
            if (n)
                for (var r in n) this.options.knownHelpers[r] = n[r];
            return this.program(e)
        },
        accept: function(e) {
            return this[e.type](e)
        },
        program: function(e) {
            var t = e.statements,
                n;
            this.opcodes = [];
            for (var r = 0, i = t.length; r < i; r++) n = t[r], this[n.type](n);
            return this.isSimple = i === 1, this.depths.list = this.depths.list.sort(function(e, t) {
                return e - t
            }), this
        },
        compileProgram: function(e) {
            var t = (new this.compiler).compile(e, this.options),
                n = this.guid++,
                r;
            this.usePartial = this.usePartial || t.usePartial, this.children[n] = t;
            for (var i = 0, s = t.depths.list.length; i < s; i++) {
                r = t.depths.list[i];
                if (r < 2) continue;
                this.addDepth(r - 1)
            }
            return n
        },
        block: function(e) {
            var t = e.mustache,
                n = e.program,
                r = e.inverse;
            n && (n = this.compileProgram(n)), r && (r = this.compileProgram(r));
            var i = this.classifyMustache(t);
            i === "helper" ? this.helperMustache(t, n, r) : i === "simple" ? (this.simpleMustache(t), this.opcode("pushProgram", n), this.opcode("pushProgram", r), this.opcode("emptyHash"), this.opcode("blockValue")) : (this.ambiguousMustache(t, n, r), this.opcode("pushProgram", n), this.opcode("pushProgram", r), this.opcode("emptyHash"), this.opcode("ambiguousBlockValue")), this.opcode("append")
        },
        hash: function(e) {
            var t = e.pairs,
                n, r;
            this.opcode("pushHash");
            for (var i = 0, s = t.length; i < s; i++) n = t[i], r = n[1], this.options.stringParams ? (r.depth && this.addDepth(r.depth), this.opcode("getContext", r.depth || 0), this.opcode("pushStringParam", r.stringModeValue, r.type)) : this.accept(r), this.opcode("assignToHash", n[0]);
            this.opcode("popHash")
        },
        partial: function(e) {
            var t = e.partialName;
            this.usePartial = !0, e.context ? this.ID(e.context) : this.opcode("push", "depth0"), this.opcode("invokePartial", t.name), this.opcode("append")
        },
        content: function(e) {
            this.opcode("appendContent", e.string)
        },
        mustache: function(e) {
            var t = this.options,
                n = this.classifyMustache(e);
            n === "simple" ? this.simpleMustache(e) : n === "helper" ? this.helperMustache(e) : this.ambiguousMustache(e), e.escaped && !t.noEscape ? this.opcode("appendEscaped") : this.opcode("append")
        },
        ambiguousMustache: function(e, t, n) {
            var r = e.id,
                i = r.parts[0],
                s = t != null || n != null;
            this.opcode("getContext", r.depth), this.opcode("pushProgram", t), this.opcode("pushProgram", n), this.opcode("invokeAmbiguous", i, s)
        },
        simpleMustache: function(e) {
            var t = e.id;
            t.type === "DATA" ? this.DATA(t) : t.parts.length ? this.ID(t) : (this.addDepth(t.depth), this.opcode("getContext", t.depth), this.opcode("pushContext")), this.opcode("resolvePossibleLambda")
        },
        helperMustache: function(e, t, n) {
            var r = this.setupFullMustacheParams(e, t, n),
                i = e.id.parts[0];
            if (this.options.knownHelpers[i]) this.opcode("invokeKnownHelper", r.length, i);
            else {
                if (this.options.knownHelpersOnly) throw new Error("You specified knownHelpersOnly, but used the unknown helper " + i);
                this.opcode("invokeHelper", r.length, i)
            }
        },
        ID: function(e) {
            this.addDepth(e.depth), this.opcode("getContext", e.depth);
            var t = e.parts[0];
            t ? this.opcode("lookupOnContext", e.parts[0]) : this.opcode("pushContext");
            for (var n = 1, r = e.parts.length; n < r; n++) this.opcode("lookup", e.parts[n])
        },
        DATA: function(t) {
            this.options.data = !0;
            if (t.id.isScoped || t.id.depth) throw new e.Exception("Scoped data references are not supported: " + t.original);
            this.opcode("lookupData");
            var n = t.id.parts;
            for (var r = 0, i = n.length; r < i; r++) this.opcode("lookup", n[r])
        },
        STRING: function(e) {
            this.opcode("pushString", e.string)
        },
        INTEGER: function(e) {
            this.opcode("pushLiteral", e.integer)
        },
        BOOLEAN: function(e) {
            this.opcode("pushLiteral", e.bool)
        },
        comment: function() {},
        opcode: function(e) {
            this.opcodes.push({
                opcode: e,
                args: [].slice.call(arguments, 1)
            })
        },
        declare: function(e, t) {
            this.opcodes.push({
                opcode: "DECLARE",
                name: e,
                value: t
            })
        },
        addDepth: function(e) {
            if (isNaN(e)) throw new Error("EWOT");
            if (e === 0) return;
            this.depths[e] || (this.depths[e] = !0, this.depths.list.push(e))
        },
        classifyMustache: function(e) {
            var t = e.isHelper,
                n = e.eligibleHelper,
                r = this.options;
            if (n && !t) {
                var i = e.id.parts[0];
                r.knownHelpers[i] ? t = !0 : r.knownHelpersOnly && (n = !1)
            }
            return t ? "helper" : n ? "ambiguous" : "simple"
        },
        pushParams: function(e) {
            var t = e.length,
                n;
            while (t--) n = e[t], this.options.stringParams ? (n.depth && this.addDepth(n.depth), this.opcode("getContext", n.depth || 0), this.opcode("pushStringParam", n.stringModeValue, n.type)) : this[n.type](n)
        },
        setupMustacheParams: function(e) {
            var t = e.params;
            return this.pushParams(t), e.hash ? this.hash(e.hash) : this.opcode("emptyHash"), t
        },
        setupFullMustacheParams: function(e, t, n) {
            var r = e.params;
            return this.pushParams(r), this.opcode("pushProgram", t), this.opcode("pushProgram", n), e.hash ? this.hash(e.hash) : this.opcode("emptyHash"), r
        }
    };
    var p = function(e) {
        this.value = e
    };
    h.prototype = {
        nameLookup: function(e, t) {
            return /^[0-9]+$/.test(t) ? e + "[" + t + "]" : h.isValidJavaScriptVariableName(t) ? e + "." + t : e + "['" + t + "']"
        },
        appendToBuffer: function(e) {
            return this.environment.isSimple ? "return " + e + ";" : {
                appendToBuffer: !0,
                content: e,
                toString: function() {
                    return "buffer += " + e + ";"
                }
            }
        },
        initializeBuffer: function() {
            return this.quotedString("")
        },
        namespace: "Handlebars",
        compile: function(t, n, r, i) {
            this.environment = t, this.options = n || {}, e.log(e.logger.DEBUG, this.environment.disassemble() + "\n\n"), this.name = this.environment.name, this.isChild = !!r, this.context = r || {
                programs: [],
                environments: [],
                aliases: {}
            }, this.preamble(), this.stackSlot = 0, this.stackVars = [], this.registers = {
                list: []
            }, this.compileStack = [], this.inlineStack = [], this.compileChildren(t, n);
            var s = t.opcodes,
                o;
            this.i = 0;
            for (g = s.length; this.i < g; this.i++) o = s[this.i], o.opcode === "DECLARE" ? this[o.name] = o.value : this[o.opcode].apply(this, o.args);
            return this.createFunctionContext(i)
        },
        nextOpcode: function() {
            var e = this.environment.opcodes;
            return e[this.i + 1]
        },
        eat: function() {
            this.i = this.i + 1
        },
        preamble: function() {
            var e = [];
            if (!this.isChild) {
                var t = this.namespace,
                    n = "helpers = this.merge(helpers, " + t + ".helpers);";
                this.environment.usePartial && (n = n + " partials = this.merge(partials, " + t + ".partials);"), this.options.data && (n += " data = data || {};"), e.push(n)
            } else e.push("");
            this.environment.isSimple ? e.push("") : e.push(", buffer = " + this.initializeBuffer()), this.lastContext = 0, this.source = e
        },
        createFunctionContext: function(t) {
            var n = this.stackVars.concat(this.registers.list);
            n.length > 0 && (this.source[1] = this.source[1] + ", " + n.join(", "));
            if (!this.isChild)
                for (var r in this.context.aliases) this.context.aliases.hasOwnProperty(r) && (this.source[1] = this.source[1] + ", " + r + "=" + this.context.aliases[r]);
            this.source[1] && (this.source[1] = "var " + this.source[1].substring(2) + ";"), this.isChild || (this.source[1] += "\n" + this.context.programs.join("\n") + "\n"), this.environment.isSimple || this.source.push("return buffer;");
            var i = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];
            for (var s = 0, o = this.environment.depths.list.length; s < o; s++) i.push("depth" + this.environment.depths.list[s]);
            var u = this.mergeSource();
            if (!this.isChild) {
                var a = e.COMPILER_REVISION,
                    f = e.REVISION_CHANGES[a];
                u = "this.compilerInfo = [" + a + ",'" + f + "'];\n" + u
            }
            if (t) return i.push(u), Function.apply(this, i);
            var l = "function " + (this.name || "") + "(" + i.join(",") + ") {\n  " + u + "}";
            return e.log(e.logger.DEBUG, l + "\n\n"), l
        },
        mergeSource: function() {
            var e = "",
                n;
            for (var r = 0, i = this.source.length; r < i; r++) {
                var s = this.source[r];
                s.appendToBuffer ? n ? n = n + "\n    + " + s.content : n = s.content : (n && (e += "buffer += " + n + ";\n  ", n = t), e += s + "\n  ")
            }
            return e
        },
        blockValue: function() {
            this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
            var e = ["depth0"];
            this.setupParams(0, e), this.replaceStack(function(t) {
                return e.splice(1, 0, t), "blockHelperMissing.call(" + e.join(", ") + ")"
            })
        },
        ambiguousBlockValue: function() {
            this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
            var e = ["depth0"];
            this.setupParams(0, e);
            var t = this.topStack();
            e.splice(1, 0, t), e[e.length - 1] = "options", this.source.push("if (!" + this.lastHelper + ") { " + t + " = blockHelperMissing.call(" + e.join(", ") + "); }")
        },
        appendContent: function(e) {
            this.source.push(this.appendToBuffer(this.quotedString(e)))
        },
        append: function() {
            this.flushInline();
            var e = this.popStack();
            this.source.push("if(" + e + " || " + e + " === 0) { " + this.appendToBuffer(e) + " }"), this.environment.isSimple && this.source.push("else { " + this.appendToBuffer("''") + " }")
        },
        appendEscaped: function() {
            this.context.aliases.escapeExpression = "this.escapeExpression", this.source.push(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"))
        },
        getContext: function(e) {
            this.lastContext !== e && (this.lastContext = e)
        },
        lookupOnContext: function(e) {
            this.push(this.nameLookup("depth" + this.lastContext, e, "context"))
        },
        pushContext: function() {
            this.pushStackLiteral("depth" + this.lastContext)
        },
        resolvePossibleLambda: function() {
            this.context.aliases.functionType = '"function"', this.replaceStack(function(e) {
                return "typeof " + e + " === functionType ? " + e + ".apply(depth0) : " + e
            })
        },
        lookup: function(e) {
            this.replaceStack(function(t) {
                return t + " == null || " + t + " === false ? " + t + " : " + this.nameLookup(t, e, "context")
            })
        },
        lookupData: function(e) {
            this.push("data")
        },
        pushStringParam: function(e, t) {
            this.pushStackLiteral("depth" + this.lastContext), this.pushString(t), typeof e == "string" ? this.pushString(e) : this.pushStackLiteral(e)
        },
        emptyHash: function() {
            this.pushStackLiteral("{}"), this.options.stringParams && (this.register("hashTypes", "{}"), this.register("hashContexts", "{}"))
        },
        pushHash: function() {
            this.hash = {
                values: [],
                types: [],
                contexts: []
            }
        },
        popHash: function() {
            var e = this.hash;
            this.hash = t, this.options.stringParams && (this.register("hashContexts", "{" + e.contexts.join(",") + "}"), this.register("hashTypes", "{" + e.types.join(",") + "}")), this.push("{\n    " + e.values.join(",\n    ") + "\n  }")
        },
        pushString: function(e) {
            this.pushStackLiteral(this.quotedString(e))
        },
        push: function(e) {
            return this.inlineStack.push(e), e
        },
        pushLiteral: function(e) {
            this.pushStackLiteral(e)
        },
        pushProgram: function(e) {
            e != null ? this.pushStackLiteral(this.programExpression(e)) : this.pushStackLiteral(null)
        },
        invokeHelper: function(e, t) {
            this.context.aliases.helperMissing = "helpers.helperMissing";
            var n = this.lastHelper = this.setupHelper(e, t, !0),
                r = this.nameLookup("depth" + this.lastContext, t, "context");
            this.push(n.name + " || " + r), this.replaceStack(function(e) {
                return e + " ? " + e + ".call(" + n.callParams + ") " + ": helperMissing.call(" + n.helperMissingParams + ")"
            })
        },
        invokeKnownHelper: function(e, t) {
            var n = this.setupHelper(e, t);
            this.push(n.name + ".call(" + n.callParams + ")")
        },
        invokeAmbiguous: function(e, t) {
            this.context.aliases.functionType = '"function"', this.pushStackLiteral("{}");
            var n = this.setupHelper(0, e, t),
                r = this.lastHelper = this.nameLookup("helpers", e, "helper"),
                i = this.nameLookup("depth" + this.lastContext, e, "context"),
                s = this.nextStack();
            this.source.push("if (" + s + " = " + r + ") { " + s + " = " + s + ".call(" + n.callParams + "); }"), this.source.push("else { " + s + " = " + i + "; " + s + " = typeof " + s + " === functionType ? " + s + ".apply(depth0) : " + s + "; }")
        },
        invokePartial: function(e) {
            var t = [this.nameLookup("partials", e, "partial"), "'" + e + "'", this.popStack(), "helpers", "partials"];
            this.options.data && t.push("data"), this.context.aliases.self = "this", this.push("self.invokePartial(" + t.join(", ") + ")")
        },
        assignToHash: function(e) {
            var t = this.popStack(),
                n, r;
            this.options.stringParams && (r = this.popStack(), n = this.popStack());
            var i = this.hash;
            n && i.contexts.push("'" + e + "': " + n), r && i.types.push("'" + e + "': " + r), i.values.push("'" + e + "': (" + t + ")")
        },
        compiler: h,
        compileChildren: function(e, t) {
            var n = e.children,
                r, i;
            for (var s = 0, o = n.length; s < o; s++) {
                r = n[s], i = new this.compiler;
                var u = this.matchExistingProgram(r);
                u == null ? (this.context.programs.push(""), u = this.context.programs.length, r.index = u, r.name = "program" + u, this.context.programs[u] = i.compile(r, t, this.context), this.context.environments[u] = r) : (r.index = u, r.name = "program" + u)
            }
        },
        matchExistingProgram: function(e) {
            for (var t = 0, n = this.context.environments.length; t < n; t++) {
                var r = this.context.environments[t];
                if (r && r.equals(e)) return t
            }
        },
        programExpression: function(e) {
            this.context.aliases.self = "this";
            if (e == null) return "self.noop";
            var t = this.environment.children[e],
                n = t.depths.list,
                r, i = [t.index, t.name, "data"];
            for (var s = 0, o = n.length; s < o; s++) r = n[s], r === 1 ? i.push("depth0") : i.push("depth" + (r - 1));
            return (n.length === 0 ? "self.program(" : "self.programWithDepth(") + i.join(", ") + ")"
        },
        register: function(e, t) {
            this.useRegister(e), this.source.push(e + " = " + t + ";")
        },
        useRegister: function(e) {
            this.registers[e] || (this.registers[e] = !0, this.registers.list.push(e))
        },
        pushStackLiteral: function(e) {
            return this.push(new p(e))
        },
        pushStack: function(e) {
            this.flushInline();
            var t = this.incrStack();
            return e && this.source.push(t + " = " + e + ";"), this.compileStack.push(t), t
        },
        replaceStack: function(e) {
            var t = "",
                n = this.isInline(),
                r;
            if (n) {
                var i = this.popStack(!0);
                if (i instanceof p) r = i.value;
                else {
                    var s = this.stackSlot ? this.topStackName() : this.incrStack();
                    t = "(" + this.push(s) + " = " + i + "),", r = this.topStack()
                }
            } else r = this.topStack();
            var o = e.call(this, r);
            return n ? ((this.inlineStack.length || this.compileStack.length) && this.popStack(), this.push("(" + t + o + ")")) : (/^stack/.test(r) || (r = this.nextStack()), this.source.push(r + " = (" + t + o + ");")), r
        },
        nextStack: function() {
            return this.pushStack()
        },
        incrStack: function() {
            return this.stackSlot++, this.stackSlot > this.stackVars.length && this.stackVars.push("stack" + this.stackSlot), this.topStackName()
        },
        topStackName: function() {
            return "stack" + this.stackSlot
        },
        flushInline: function() {
            var e = this.inlineStack;
            if (e.length) {
                this.inlineStack = [];
                for (var t = 0, n = e.length; t < n; t++) {
                    var r = e[t];
                    r instanceof p ? this.compileStack.push(r) : this.pushStack(r)
                }
            }
        },
        isInline: function() {
            return this.inlineStack.length
        },
        popStack: function(e) {
            var t = this.isInline(),
                n = (t ? this.inlineStack : this.compileStack).pop();
            return !e && n instanceof p ? n.value : (t || this.stackSlot--, n)
        },
        topStack: function(e) {
            var t = this.isInline() ? this.inlineStack : this.compileStack,
                n = t[t.length - 1];
            return !e && n instanceof p ? n.value : n
        },
        quotedString: function(e) {
            return '"' + e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"'
        },
        setupHelper: function(e, t, n) {
            var r = [];
            this.setupParams(e, r, n);
            var i = this.nameLookup("helpers", t, "helper");
            return {
                params: r,
                name: i,
                callParams: ["depth0"].concat(r).join(", "),
                helperMissingParams: n && ["depth0", this.quotedString(t)].concat(r).join(", ")
            }
        },
        setupParams: function(e, t, n) {
            var r = [],
                i = [],
                s = [],
                o, u, a;
            r.push("hash:" + this.popStack()), u = this.popStack(), a = this.popStack();
            if (a || u) a || (this.context.aliases.self = "this", a = "self.noop"), u || (this.context.aliases.self = "this", u = "self.noop"), r.push("inverse:" + u), r.push("fn:" + a);
            for (var f = 0; f < e; f++) o = this.popStack(), t.push(o), this.options.stringParams && (s.push(this.popStack()), i.push(this.popStack()));
            return this.options.stringParams && (r.push("contexts:[" + i.join(",") + "]"), r.push("types:[" + s.join(",") + "]"), r.push("hashContexts:hashContexts"), r.push("hashTypes:hashTypes")), this.options.data && r.push("data:data"), r = "{" + r.join(",") + "}", n ? (this.register("options", r), t.push("options")) : t.push(r), t.join(", ")
        }
    };
    var d = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield".split(" "),
        v = h.RESERVED_WORDS = {};
    for (var m = 0, g = d.length; m < g; m++) v[d[m]] = !0;
    h.isValidJavaScriptVariableName = function(e) {
        return !h.RESERVED_WORDS[e] && /^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(e) ? !0 : !1
    }, e.precompile = function(t, n) {
        if (t == null || typeof t != "string" && t.constructor !== e.AST.ProgramNode) throw new e.Exception("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + t);
        n = n || {}, "data" in n || (n.data = !0);
        var r = e.parse(t),
            i = (new c).compile(r, n);
        return (new h).compile(i, n)
    }, e.compile = function(n, r) {
        function s() {
            var i = e.parse(n),
                s = (new c).compile(i, r),
                o = (new h).compile(s, r, t, !0);
            return e.template(o)
        }
        if (n == null || typeof n != "string" && n.constructor !== e.AST.ProgramNode) throw new e.Exception("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + n);
        r = r || {}, "data" in r || (r.data = !0);
        var i;
        return function(e, t) {
            return i || (i = s()), i.call(this, e, t)
        }
    }, e.VM = {
        template: function(t) {
            var n = {
                escapeExpression: e.Utils.escapeExpression,
                invokePartial: e.VM.invokePartial,
                programs: [],
                program: function(t, n, r) {
                    var i = this.programs[t];
                    return r ? i = e.VM.program(t, n, r) : i || (i = this.programs[t] = e.VM.program(t, n)), i
                },
                merge: function(t, n) {
                    var r = t || n;
                    return t && n && (r = {}, e.Utils.extend(r, n), e.Utils.extend(r, t)), r
                },
                programWithDepth: e.VM.programWithDepth,
                noop: e.VM.noop,
                compilerInfo: null
            };
            return function(r, i) {
                i = i || {};
                var s = t.call(n, e, r, i.helpers, i.partials, i.data),
                    o = n.compilerInfo || [],
                    u = o[0] || 1,
                    a = e.COMPILER_REVISION;
                if (u !== a) {
                    if (u < a) {
                        var f = e.REVISION_CHANGES[a],
                            l = e.REVISION_CHANGES[u];
                        throw "Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + f + ") or downgrade your runtime to an older version (" + l + ")."
                    }
                    throw "Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + o[1] + ")."
                }
                return s
            }
        },
        programWithDepth: function(e, t, n) {
            var r = Array.prototype.slice.call(arguments, 3),
                i = function(e, i) {
                    return i = i || {}, t.apply(this, [e, i.data || n].concat(r))
                };
            return i.program = e, i.depth = r.length, i
        },
        program: function(e, t, n) {
            var r = function(e, r) {
                return r = r || {}, t(e, r.data || n)
            };
            return r.program = e, r.depth = 0, r
        },
        noop: function() {
            return ""
        },
        invokePartial: function(n, r, i, s, o, u) {
            var a = {
                helpers: s,
                partials: o,
                data: u
            };
            if (n === t) throw new e.Exception("The partial " + r + " could not be found");
            if (n instanceof Function) return n(i, a);
            if (!e.compile) throw new e.Exception("The partial " + r + " could not be compiled when running in runtime-only mode");
            return o[r] = e.compile(n, {
                data: u !== t
            }), o[r](i, a)
        }
    }, e.template = e.VM.template
})(Handlebars),
function() {
    var e = this,
        t = e._,
        n = {},
        r = Array.prototype,
        i = Object.prototype,
        s = Function.prototype,
        o = r.push,
        u = r.slice,
        a = r.concat,
        f = i.toString,
        l = i.hasOwnProperty,
        c = r.forEach,
        h = r.map,
        p = r.reduce,
        d = r.reduceRight,
        v = r.filter,
        m = r.every,
        g = r.some,
        y = r.indexOf,
        b = r.lastIndexOf,
        w = Array.isArray,
        E = Object.keys,
        S = s.bind,
        x = function(e) {
            if (e instanceof x) return e;
            if (!(this instanceof x)) return new x(e);
            this._wrapped = e
        };
    typeof exports != "undefined" ? (typeof module != "undefined" && module.exports && (exports = module.exports = x), exports._ = x) : e._ = x, x.VERSION = "1.5.1";
    var T = x.each = x.forEach = function(e, t, r) {
        if (e == null) return;
        if (c && e.forEach === c) e.forEach(t, r);
        else if (e.length === +e.length) {
            for (var i = 0, s = e.length; i < s; i++)
                if (t.call(r, e[i], i, e) === n) return
        } else
            for (var o in e)
                if (x.has(e, o) && t.call(r, e[o], o, e) === n) return
    };
    x.map = x.collect = function(e, t, n) {
        var r = [];
        return e == null ? r : h && e.map === h ? e.map(t, n) : (T(e, function(e, i, s) {
            r.push(t.call(n, e, i, s))
        }), r)
    };
    var N = "Reduce of empty array with no initial value";
    x.reduce = x.foldl = x.inject = function(e, t, n, r) {
        var i = arguments.length > 2;
        e == null && (e = []);
        if (p && e.reduce === p) return r && (t = x.bind(t, r)), i ? e.reduce(t, n) : e.reduce(t);
        T(e, function(e, s, o) {
            i ? n = t.call(r, n, e, s, o) : (n = e, i = !0)
        });
        if (!i) throw new TypeError(N);
        return n
    }, x.reduceRight = x.foldr = function(e, t, n, r) {
        var i = arguments.length > 2;
        e == null && (e = []);
        if (d && e.reduceRight === d) return r && (t = x.bind(t, r)), i ? e.reduceRight(t, n) : e.reduceRight(t);
        var s = e.length;
        if (s !== +s) {
            var o = x.keys(e);
            s = o.length
        }
        T(e, function(u, a, f) {
            a = o ? o[--s] : --s, i ? n = t.call(r, n, e[a], a, f) : (n = e[a], i = !0)
        });
        if (!i) throw new TypeError(N);
        return n
    }, x.find = x.detect = function(e, t, n) {
        var r;
        return C(e, function(e, i, s) {
            if (t.call(n, e, i, s)) return r = e, !0
        }), r
    }, x.filter = x.select = function(e, t, n) {
        var r = [];
        return e == null ? r : v && e.filter === v ? e.filter(t, n) : (T(e, function(e, i, s) {
            t.call(n, e, i, s) && r.push(e)
        }), r)
    }, x.reject = function(e, t, n) {
        return x.filter(e, function(e, r, i) {
            return !t.call(n, e, r, i)
        }, n)
    }, x.every = x.all = function(e, t, r) {
        t || (t = x.identity);
        var i = !0;
        return e == null ? i : m && e.every === m ? e.every(t, r) : (T(e, function(e, s, o) {
            if (!(i = i && t.call(r, e, s, o))) return n
        }), !!i)
    };
    var C = x.some = x.any = function(e, t, r) {
        t || (t = x.identity);
        var i = !1;
        return e == null ? i : g && e.some === g ? e.some(t, r) : (T(e, function(e, s, o) {
            if (i || (i = t.call(r, e, s, o))) return n
        }), !!i)
    };
    x.contains = x.include = function(e, t) {
        return e == null ? !1 : y && e.indexOf === y ? e.indexOf(t) != -1 : C(e, function(e) {
            return e === t
        })
    }, x.invoke = function(e, t) {
        var n = u.call(arguments, 2),
            r = x.isFunction(t);
        return x.map(e, function(e) {
            return (r ? t : e[t]).apply(e, n)
        })
    }, x.pluck = function(e, t) {
        return x.map(e, function(e) {
            return e[t]
        })
    }, x.where = function(e, t, n) {
        return x.isEmpty(t) ? n ? void 0 : [] : x[n ? "find" : "filter"](e, function(e) {
            for (var n in t)
                if (t[n] !== e[n]) return !1;
            return !0
        })
    }, x.findWhere = function(e, t) {
        return x.where(e, t, !0)
    }, x.max = function(e, t, n) {
        if (!t && x.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.max.apply(Math, e);
        if (!t && x.isEmpty(e)) return -Infinity;
        var r = {
            computed: -Infinity,
            value: -Infinity
        };
        return T(e, function(e, i, s) {
            var o = t ? t.call(n, e, i, s) : e;
            o > r.computed && (r = {
                value: e,
                computed: o
            })
        }), r.value
    }, x.min = function(e, t, n) {
        if (!t && x.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.min.apply(Math, e);
        if (!t && x.isEmpty(e)) return Infinity;
        var r = {
            computed: Infinity,
            value: Infinity
        };
        return T(e, function(e, i, s) {
            var o = t ? t.call(n, e, i, s) : e;
            o < r.computed && (r = {
                value: e,
                computed: o
            })
        }), r.value
    }, x.shuffle = function(e) {
        var t, n = 0,
            r = [];
        return T(e, function(e) {
            t = x.random(n++), r[n - 1] = r[t], r[t] = e
        }), r
    };
    var k = function(e) {
        return x.isFunction(e) ? e : function(t) {
            return t[e]
        }
    };
    x.sortBy = function(e, t, n) {
        var r = k(t);
        return x.pluck(x.map(e, function(e, t, i) {
            return {
                value: e,
                index: t,
                criteria: r.call(n, e, t, i)
            }
        }).sort(function(e, t) {
            var n = e.criteria,
                r = t.criteria;
            if (n !== r) {
                if (n > r || n === void 0) return 1;
                if (n < r || r === void 0) return -1
            }
            return e.index < t.index ? -1 : 1
        }), "value")
    };
    var L = function(e, t, n, r) {
        var i = {},
            s = k(t == null ? x.identity : t);
        return T(e, function(t, o) {
            var u = s.call(n, t, o, e);
            r(i, u, t)
        }), i
    };
    x.groupBy = function(e, t, n) {
        return L(e, t, n, function(e, t, n) {
            (x.has(e, t) ? e[t] : e[t] = []).push(n)
        })
    }, x.countBy = function(e, t, n) {
        return L(e, t, n, function(e, t) {
            x.has(e, t) || (e[t] = 0), e[t]++
        })
    }, x.sortedIndex = function(e, t, n, r) {
        n = n == null ? x.identity : k(n);
        var i = n.call(r, t),
            s = 0,
            o = e.length;
        while (s < o) {
            var u = s + o >>> 1;
            n.call(r, e[u]) < i ? s = u + 1 : o = u
        }
        return s
    }, x.toArray = function(e) {
        return e ? x.isArray(e) ? u.call(e) : e.length === +e.length ? x.map(e, x.identity) : x.values(e) : []
    }, x.size = function(e) {
        return e == null ? 0 : e.length === +e.length ? e.length : x.keys(e).length
    }, x.first = x.head = x.take = function(e, t, n) {
        return e == null ? void 0 : t != null && !n ? u.call(e, 0, t) : e[0]
    }, x.initial = function(e, t, n) {
        return u.call(e, 0, e.length - (t == null || n ? 1 : t))
    }, x.last = function(e, t, n) {
        return e == null ? void 0 : t != null && !n ? u.call(e, Math.max(e.length - t, 0)) : e[e.length - 1]
    }, x.rest = x.tail = x.drop = function(e, t, n) {
        return u.call(e, t == null || n ? 1 : t)
    }, x.compact = function(e) {
        return x.filter(e, x.identity)
    };
    var A = function(e, t, n) {
        return t && x.every(e, x.isArray) ? a.apply(n, e) : (T(e, function(e) {
            x.isArray(e) || x.isArguments(e) ? t ? o.apply(n, e) : A(e, t, n) : n.push(e)
        }), n)
    };
    x.flatten = function(e, t) {
        return A(e, t, [])
    }, x.without = function(e) {
        return x.difference(e, u.call(arguments, 1))
    }, x.uniq = x.unique = function(e, t, n, r) {
        x.isFunction(t) && (r = n, n = t, t = !1);
        var i = n ? x.map(e, n, r) : e,
            s = [],
            o = [];
        return T(i, function(n, r) {
            if (t ? !r || o[o.length - 1] !== n : !x.contains(o, n)) o.push(n), s.push(e[r])
        }), s
    }, x.union = function() {
        return x.uniq(x.flatten(arguments, !0))
    }, x.intersection = function(e) {
        var t = u.call(arguments, 1);
        return x.filter(x.uniq(e), function(e) {
            return x.every(t, function(t) {
                return x.indexOf(t, e) >= 0
            })
        })
    }, x.difference = function(e) {
        var t = a.apply(r, u.call(arguments, 1));
        return x.filter(e, function(e) {
            return !x.contains(t, e)
        })
    }, x.zip = function() {
        var e = x.max(x.pluck(arguments, "length").concat(0)),
            t = new Array(e);
        for (var n = 0; n < e; n++) t[n] = x.pluck(arguments, "" + n);
        return t
    }, x.object = function(e, t) {
        if (e == null) return {};
        var n = {};
        for (var r = 0, i = e.length; r < i; r++) t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
        return n
    }, x.indexOf = function(e, t, n) {
        if (e == null) return -1;
        var r = 0,
            i = e.length;
        if (n) {
            if (typeof n != "number") return r = x.sortedIndex(e, t), e[r] === t ? r : -1;
            r = n < 0 ? Math.max(0, i + n) : n
        }
        if (y && e.indexOf === y) return e.indexOf(t, n);
        for (; r < i; r++)
            if (e[r] === t) return r;
        return -1
    }, x.lastIndexOf = function(e, t, n) {
        if (e == null) return -1;
        var r = n != null;
        if (b && e.lastIndexOf === b) return r ? e.lastIndexOf(t, n) : e.lastIndexOf(t);
        var i = r ? n : e.length;
        while (i--)
            if (e[i] === t) return i;
        return -1
    }, x.range = function(e, t, n) {
        arguments.length <= 1 && (t = e || 0, e = 0), n = arguments[2] || 1;
        var r = Math.max(Math.ceil((t - e) / n), 0),
            i = 0,
            s = new Array(r);
        while (i < r) s[i++] = e, e += n;
        return s
    };
    var O = function() {};
    x.bind = function(e, t) {
        var n, r;
        if (S && e.bind === S) return S.apply(e, u.call(arguments, 1));
        if (!x.isFunction(e)) throw new TypeError;
        return n = u.call(arguments, 2), r = function() {
            if (this instanceof r) {
                O.prototype = e.prototype;
                var i = new O;
                O.prototype = null;
                var s = e.apply(i, n.concat(u.call(arguments)));
                return Object(s) === s ? s : i
            }
            return e.apply(t, n.concat(u.call(arguments)))
        }
    }, x.partial = function(e) {
        var t = u.call(arguments, 1);
        return function() {
            return e.apply(this, t.concat(u.call(arguments)))
        }
    }, x.bindAll = function(e) {
        var t = u.call(arguments, 1);
        if (t.length === 0) throw new Error("bindAll must be passed function names");
        return T(t, function(t) {
            e[t] = x.bind(e[t], e)
        }), e
    }, x.memoize = function(e, t) {
        var n = {};
        return t || (t = x.identity),
            function() {
                var r = t.apply(this, arguments);
                return x.has(n, r) ? n[r] : n[r] = e.apply(this, arguments)
            }
    }, x.delay = function(e, t) {
        var n = u.call(arguments, 2);
        return setTimeout(function() {
            return e.apply(null, n)
        }, t)
    }, x.defer = function(e) {
        return x.delay.apply(x, [e, 1].concat(u.call(arguments, 1)))
    }, x.throttle = function(e, t, n) {
        var r, i, s, o = null,
            u = 0;
        n || (n = {});
        var a = function() {
            u = n.leading === !1 ? 0 : new Date, o = null, s = e.apply(r, i)
        };
        return function() {
            var f = new Date;
            !u && n.leading === !1 && (u = f);
            var l = t - (f - u);
            return r = this, i = arguments, l <= 0 ? (clearTimeout(o), o = null, u = f, s = e.apply(r, i)) : !o && n.trailing !== !1 && (o = setTimeout(a, l)), s
        }
    }, x.debounce = function(e, t, n) {
        var r, i = null;
        return function() {
            var s = this,
                o = arguments,
                u = function() {
                    i = null, n || (r = e.apply(s, o))
                },
                a = n && !i;
            return clearTimeout(i), i = setTimeout(u, t), a && (r = e.apply(s, o)), r
        }
    }, x.once = function(e) {
        var t = !1,
            n;
        return function() {
            return t ? n : (t = !0, n = e.apply(this, arguments), e = null, n)
        }
    }, x.wrap = function(e, t) {
        return function() {
            var n = [e];
            return o.apply(n, arguments), t.apply(this, n)
        }
    }, x.compose = function() {
        var e = arguments;
        return function() {
            var t = arguments;
            for (var n = e.length - 1; n >= 0; n--) t = [e[n].apply(this, t)];
            return t[0]
        }
    }, x.after = function(e, t) {
        return function() {
            if (--e < 1) return t.apply(this, arguments)
        }
    }, x.keys = E || function(e) {
        if (e !== Object(e)) throw new TypeError("Invalid object");
        var t = [];
        for (var n in e) x.has(e, n) && t.push(n);
        return t
    }, x.values = function(e) {
        var t = [];
        for (var n in e) x.has(e, n) && t.push(e[n]);
        return t
    }, x.pairs = function(e) {
        var t = [];
        for (var n in e) x.has(e, n) && t.push([n, e[n]]);
        return t
    }, x.invert = function(e) {
        var t = {};
        for (var n in e) x.has(e, n) && (t[e[n]] = n);
        return t
    }, x.functions = x.methods = function(e) {
        var t = [];
        for (var n in e) x.isFunction(e[n]) && t.push(n);
        return t.sort()
    }, x.extend = function(e) {
        return T(u.call(arguments, 1), function(t) {
            if (t)
                for (var n in t) e[n] = t[n]
        }), e
    }, x.pick = function(e) {
        var t = {},
            n = a.apply(r, u.call(arguments, 1));
        return T(n, function(n) {
            n in e && (t[n] = e[n])
        }), t
    }, x.omit = function(e) {
        var t = {},
            n = a.apply(r, u.call(arguments, 1));
        for (var i in e) x.contains(n, i) || (t[i] = e[i]);
        return t
    }, x.defaults = function(e) {
        return T(u.call(arguments, 1), function(t) {
            if (t)
                for (var n in t) e[n] === void 0 && (e[n] = t[n])
        }), e
    }, x.clone = function(e) {
        return x.isObject(e) ? x.isArray(e) ? e.slice() : x.extend({}, e) : e
    }, x.tap = function(e, t) {
        return t(e), e
    };
    var M = function(e, t, n, r) {
        if (e === t) return e !== 0 || 1 / e == 1 / t;
        if (e == null || t == null) return e === t;
        e instanceof x && (e = e._wrapped), t instanceof x && (t = t._wrapped);
        var i = f.call(e);
        if (i != f.call(t)) return !1;
        switch (i) {
            case "[object String]":
                return e == String(t);
            case "[object Number]":
                return e != +e ? t != +t : e == 0 ? 1 / e == 1 / t : e == +t;
            case "[object Date]":
            case "[object Boolean]":
                return +e == +t;
            case "[object RegExp]":
                return e.source == t.source && e.global == t.global && e.multiline == t.multiline && e.ignoreCase == t.ignoreCase
        }
        if (typeof e != "object" || typeof t != "object") return !1;
        var s = n.length;
        while (s--)
            if (n[s] == e) return r[s] == t;
        var o = e.constructor,
            u = t.constructor;
        if (o !== u && !(x.isFunction(o) && o instanceof o && x.isFunction(u) && u instanceof u)) return !1;
        n.push(e), r.push(t);
        var a = 0,
            l = !0;
        if (i == "[object Array]") {
            a = e.length, l = a == t.length;
            if (l)
                while (a--)
                    if (!(l = M(e[a], t[a], n, r))) break
        } else {
            for (var c in e)
                if (x.has(e, c)) {
                    a++;
                    if (!(l = x.has(t, c) && M(e[c], t[c], n, r))) break
                }
            if (l) {
                for (c in t)
                    if (x.has(t, c) && !(a--)) break;
                l = !a
            }
        }
        return n.pop(), r.pop(), l
    };
    x.isEqual = function(e, t) {
        return M(e, t, [], [])
    }, x.isEmpty = function(e) {
        if (e == null) return !0;
        if (x.isArray(e) || x.isString(e)) return e.length === 0;
        for (var t in e)
            if (x.has(e, t)) return !1;
        return !0
    }, x.isElement = function(e) {
        return !!e && e.nodeType === 1
    }, x.isArray = w || function(e) {
        return f.call(e) == "[object Array]"
    }, x.isObject = function(e) {
        return e === Object(e)
    }, T(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(e) {
        x["is" + e] = function(t) {
            return f.call(t) == "[object " + e + "]"
        }
    }), x.isArguments(arguments) || (x.isArguments = function(e) {
        return !!e && !!x.has(e, "callee")
    }), typeof / . / != "function" && (x.isFunction = function(e) {
        return typeof e == "function"
    }), x.isFinite = function(e) {
        return isFinite(e) && !isNaN(parseFloat(e))
    }, x.isNaN = function(e) {
        return x.isNumber(e) && e != +e
    }, x.isBoolean = function(e) {
        return e === !0 || e === !1 || f.call(e) == "[object Boolean]"
    }, x.isNull = function(e) {
        return e === null
    }, x.isUndefined = function(e) {
        return e === void 0
    }, x.has = function(e, t) {
        return l.call(e, t)
    }, x.noConflict = function() {
        return e._ = t, this
    }, x.identity = function(e) {
        return e
    }, x.times = function(e, t, n) {
        var r = Array(Math.max(0, e));
        for (var i = 0; i < e; i++) r[i] = t.call(n, i);
        return r
    }, x.random = function(e, t) {
        return t == null && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
    };
    var _ = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2F;"
        }
    };
    _.unescape = x.invert(_.escape);
    var D = {
        escape: new RegExp("[" + x.keys(_.escape).join("") + "]", "g"),
        unescape: new RegExp("(" + x.keys(_.unescape).join("|") + ")", "g")
    };
    x.each(["escape", "unescape"], function(e) {
        x[e] = function(t) {
            return t == null ? "" : ("" + t).replace(D[e], function(t) {
                return _[e][t]
            })
        }
    }), x.result = function(e, t) {
        if (e == null) return void 0;
        var n = e[t];
        return x.isFunction(n) ? n.call(e) : n
    }, x.mixin = function(e) {
        T(x.functions(e), function(t) {
            var n = x[t] = e[t];
            x.prototype[t] = function() {
                var e = [this._wrapped];
                return o.apply(e, arguments), F.call(this, n.apply(x, e))
            }
        })
    };
    var P = 0;
    x.uniqueId = function(e) {
        var t = ++P + "";
        return e ? e + t : t
    }, x.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var H = /(.)^/,
        B = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            " ": "t",
            "\u2028": "u2028",
            "\u2029": "u2029"
        },
        j = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    x.template = function(e, t, n) {
        var r;
        n = x.defaults({}, n, x.templateSettings);
        var i = new RegExp([(n.escape || H).source, (n.interpolate || H).source, (n.evaluate || H).source].join("|") + "|$", "g"),
            s = 0,
            o = "__p+='";
        e.replace(i, function(t, n, r, i, u) {
            return o += e.slice(s, u).replace(j, function(e) {
                return "\\" + B[e]
            }), n && (o += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'"), r && (o += "'+\n((__t=(" + r + "))==null?'':__t)+\n'"), i && (o += "';\n" + i + "\n__p+='"), s = u + t.length, t
        }), o += "';\n", n.variable || (o = "with(obj||{}){\n" + o + "}\n"), o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
        try {
            r = new Function(n.variable || "obj", "_", o)
        } catch (u) {
            throw u.source = o, u
        }
        if (t) return r(t, x);
        var a = function(e) {
            return r.call(this, e, x)
        };
        return a.source = "function(" + (n.variable || "obj") + "){\n" + o + "}", a
    }, x.chain = function(e) {
        return x(e).chain()
    };
    var F = function(e) {
        return this._chain ? x(e).chain() : e
    };
    x.mixin(x), T(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
        var t = r[e];
        x.prototype[e] = function() {
            var n = this._wrapped;
            return t.apply(n, arguments), (e == "shift" || e == "splice") && n.length === 0 && delete n[0], F.call(this, n)
        }
    }), T(["concat", "join", "slice"], function(e) {
        var t = r[e];
        x.prototype[e] = function() {
            return F.call(this, t.apply(this._wrapped, arguments))
        }
    }), x.extend(x.prototype, {
        chain: function() {
            return this._chain = !0, this
        },
        value: function() {
            return this._wrapped
        }
    })
}.call(this);