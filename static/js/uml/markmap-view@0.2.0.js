/*! markmap-view v0.2.0 | MIT License */ ! function(t, e) {
    "use strict";

    function n() {
        return (n = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
            }
            return t
        }).apply(this, arguments)
    }

    function r(t) {
        var e = 0,
            n = t.children,
            r = n && n.length;
        if (r)
            for (; --r >= 0;) e += n[r].value;
        else e = 1;
        t.value = e
    }

    function i(t, e) {
        var n, r, i, o, l, c = new h(t),
            d = +t.value && (c.value = t.value),
            u = [c];
        for (null == e && (e = s); n = u.pop();)
            if (d && (n.value = +n.data.value), (i = e(n.data)) && (l = i.length))
                for (n.children = new Array(l), o = l - 1; o >= 0; --o) u.push(r = n.children[o] = new h(i[o])), r.parent = n, r.depth = n.depth + 1;
        return c.eachBefore(a)
    }

    function s(t) {
        return t.children
    }

    function o(t) {
        t.data = t.data.data
    }

    function a(t) {
        var e = 0;
        do {
            t.height = e
        } while ((t = t.parent) && t.height < ++e)
    }

    function h(t) {
        this.data = t, this.depth = this.height = 0, this.parent = null
    }
    h.prototype = i.prototype = {
        constructor: h,
        count: function() {
            return this.eachAfter(r)
        },
        each: function(t) {
            var e, n, r, i, s = this,
                o = [s];
            do {
                for (e = o.reverse(), o = []; s = e.pop();)
                    if (t(s), n = s.children)
                        for (r = 0, i = n.length; r < i; ++r) o.push(n[r])
            } while (o.length);
            return this
        },
        eachAfter: function(t) {
            for (var e, n, r, i = this, s = [i], o = []; i = s.pop();)
                if (o.push(i), e = i.children)
                    for (n = 0, r = e.length; n < r; ++n) s.push(e[n]);
            for (; i = o.pop();) t(i);
            return this
        },
        eachBefore: function(t) {
            for (var e, n, r = this, i = [r]; r = i.pop();)
                if (t(r), e = r.children)
                    for (n = e.length - 1; n >= 0; --n) i.push(e[n]);
            return this
        },
        sum: function(t) {
            return this.eachAfter((function(e) {
                for (var n = +t(e.data) || 0, r = e.children, i = r && r.length; --i >= 0;) n += r[i].value;
                e.value = n
            }))
        },
        sort: function(t) {
            return this.eachBefore((function(e) {
                e.children && e.children.sort(t)
            }))
        },
        path: function(t) {
            for (var e = this, n = function(t, e) {
                    if (t === e) return t;
                    var n = t.ancestors(),
                        r = e.ancestors(),
                        i = null;
                    t = n.pop(), e = r.pop();
                    for (; t === e;) i = t, t = n.pop(), e = r.pop();
                    return i
                }(e, t), r = [e]; e !== n;) e = e.parent, r.push(e);
            for (var i = r.length; t !== n;) r.splice(i, 0, t), t = t.parent;
            return r
        },
        ancestors: function() {
            for (var t = this, e = [t]; t = t.parent;) e.push(t);
            return e
        },
        descendants: function() {
            var t = [];
            return this.each((function(e) {
                t.push(e)
            })), t
        },
        leaves: function() {
            var t = [];
            return this.eachBefore((function(e) {
                e.children || t.push(e)
            })), t
        },
        links: function() {
            var t = this,
                e = [];
            return t.each((function(n) {
                n !== t && e.push({
                    source: n.parent,
                    target: n
                })
            })), e
        },
        copy: function() {
            return i(this).eachBefore(o)
        }
    };
    const l = Object.freeze({
        children: t => t.children,
        nodeSize: t => t.data.size,
        spacing: 0
    });

    function c(t) {
        const e = Object.assign({}, l, t);

        function n(t) {
            const n = e[t];
            return "function" == typeof n ? n : () => n
        }

        function r(t) {
            const e = o(function() {
                const t = s(),
                    e = n("nodeSize"),
                    r = n("spacing");
                return class extends t {
                    constructor(t) {
                        super(t), Object.assign(this, {
                            x: 0,
                            y: 0,
                            relX: 0,
                            prelim: 0,
                            shift: 0,
                            change: 0,
                            lExt: this,
                            lExtRelX: 0,
                            lThr: null,
                            rExt: this,
                            rExtRelX: 0,
                            rThr: null
                        })
                    }
                    get size() {
                        return e(this.data)
                    }
                    spacing(t) {
                        return r(this.data, t.data)
                    }
                    get x() {
                        return this.data.x
                    }
                    set x(t) {
                        this.data.x = t
                    }
                    get y() {
                        return this.data.y
                    }
                    set y(t) {
                        this.data.y = t
                    }
                    update() {
                        return d(this), u(this), this
                    }
                }
            }(), t, (t => t.children));
            return e.update(), e.data
        }

        function s() {
            const t = n("nodeSize"),
                e = n("spacing");
            return class n extends i.prototype.constructor {
                constructor(t) {
                    super(t)
                }
                copy() {
                    const t = o(this.constructor, this, (t => t.children));
                    return t.each((t => t.data = t.data.data)), t
                }
                get size() {
                    return t(this)
                }
                spacing(t) {
                    return e(this, t)
                }
                get nodes() {
                    return this.descendants()
                }
                get xSize() {
                    return this.size[0]
                }
                get ySize() {
                    return this.size[1]
                }
                get top() {
                    return this.y
                }
                get bottom() {
                    return this.y + this.ySize
                }
                get left() {
                    return this.x - this.xSize / 2
                }
                get right() {
                    return this.x + this.xSize / 2
                }
                get root() {
                    const t = this.ancestors();
                    return t[t.length - 1]
                }
                get numChildren() {
                    return this.hasChildren ? this.children.length : 0
                }
                get hasChildren() {
                    return !this.noChildren
                }
                get noChildren() {
                    return null === this.children
                }
                get firstChild() {
                    return this.hasChildren ? this.children[0] : null
                }
                get lastChild() {
                    return this.hasChildren ? this.children[this.numChildren - 1] : null
                }
                get extents() {
                    return (this.children || []).reduce(((t, e) => n.maxExtents(t, e.extents)), this.nodeExtents)
                }
                get nodeExtents() {
                    return {
                        top: this.top,
                        bottom: this.bottom,
                        left: this.left,
                        right: this.right
                    }
                }
                static maxExtents(t, e) {
                    return {
                        top: Math.min(t.top, e.top),
                        bottom: Math.max(t.bottom, e.bottom),
                        left: Math.min(t.left, e.left),
                        right: Math.max(t.right, e.right)
                    }
                }
            }
        }

        function o(t, e, n) {
            const r = (e, i) => {
                const s = new t(e);
                Object.assign(s, {
                    parent: i,
                    depth: null === i ? 0 : i.depth + 1,
                    height: 0,
                    length: 1
                });
                const o = n(e) || [];
                return s.children = 0 === o.length ? null : o.map((t => r(t, s))), s.children && Object.assign(s, s.children.reduce(((t, e) => ({
                    height: Math.max(t.height, e.height + 1),
                    length: t.length + e.length
                })), s)), s
            };
            return r(e, null)
        }
        return Object.assign(r, {
            nodeSize(t) {
                return arguments.length ? (e.nodeSize = t, r) : e.nodeSize
            },
            spacing(t) {
                return arguments.length ? (e.spacing = t, r) : e.spacing
            },
            children(t) {
                return arguments.length ? (e.children = t, r) : e.children
            },
            hierarchy(t, n) {
                const r = void 0 === n ? e.children : n;
                return o(s(), t, r)
            },
            dump(t) {
                const e = n("nodeSize"),
                    r = t => n => {
                        const i = t + "  ",
                            s = t + "    ",
                            {
                                x: o,
                                y: a
                            } = n,
                            h = e(n),
                            l = n.children || [],
                            c = 0 === l.length ? " " : `,${i}children: [${s}${l.map(r(s)).join(s)}${i}],${t}`;
                        return `{ size: [${h.join(", ")}],${i}x: ${o}, y: ${a}${c}},`
                    };
                return r("\n")(t)
            }
        }), r
    }
    c.version = "2.1.1";
    const d = (t, e = 0) => (t.y = e, (t.children || []).reduce(((e, n) => {
            const [r, i] = e;
            d(n, t.y + t.ySize);
            const s = (0 === r ? n.lExt : n.rExt).bottom;
            0 !== r && f(t, r, i);
            return [r + 1, E(s, r, i)]
        }), [0, null]), p(t), S(t), t),
        u = (t, e, n) => {
            void 0 === e && (e = -t.relX - t.prelim, n = 0);
            const r = e + t.relX;
            return t.relX = r + t.prelim - n, t.prelim = 0, t.x = n + t.relX, (t.children || []).forEach((e => u(e, r, t.x))), t
        },
        p = t => {
            (t.children || []).reduce(((t, e) => {
                const [n, r] = t, i = n + e.shift, s = r + i + e.change;
                return e.relX += s, [i, s]
            }), [0, 0])
        },
        f = (t, e, n) => {
            const r = t.children[e - 1],
                i = t.children[e];
            let s = r,
                o = r.relX,
                a = i,
                h = i.relX,
                l = !0;
            for (; s && a;) {
                s.bottom > n.lowY && (n = n.next);
                const r = o + s.prelim - (h + a.prelim) + s.xSize / 2 + a.xSize / 2 + s.spacing(a);
                (r > 0 || r < 0 && l) && (h += r, g(i, r), m(t, e, n.index, r)), l = !1;
                const c = s.bottom,
                    d = a.bottom;
                c <= d && (s = y(s), s && (o += s.relX)), c >= d && (a = x(a), a && (h += a.relX))
            }!s && a ? v(t, e, a, h) : s && !a && z(t, e, s, o)
        },
        g = (t, e) => {
            t.relX += e, t.lExtRelX += e, t.rExtRelX += e
        },
        m = (t, e, n, r) => {
            const i = t.children[e],
                s = e - n;
            if (s > 1) {
                const e = r / s;
                t.children[n + 1].shift += e, i.shift -= e, i.change -= r - e
            }
        },
        x = t => t.hasChildren ? t.firstChild : t.lThr,
        y = t => t.hasChildren ? t.lastChild : t.rThr,
        v = (t, e, n, r) => {
            const i = t.firstChild,
                s = i.lExt,
                o = t.children[e];
            s.lThr = n;
            const a = r - n.relX - i.lExtRelX;
            s.relX += a, s.prelim -= a, i.lExt = o.lExt, i.lExtRelX = o.lExtRelX
        },
        z = (t, e, n, r) => {
            const i = t.children[e],
                s = i.rExt,
                o = t.children[e - 1];
            s.rThr = n;
            const a = r - n.relX - i.rExtRelX;
            s.relX += a, s.prelim -= a, i.rExt = o.rExt, i.rExtRelX = o.rExtRelX
        },
        S = t => {
            if (t.hasChildren) {
                const e = t.firstChild,
                    n = t.lastChild,
                    r = (e.prelim + e.relX - e.xSize / 2 + n.relX + n.prelim + n.xSize / 2) / 2;
                Object.assign(t, {
                    prelim: r,
                    lExt: e.lExt,
                    lExtRelX: e.lExtRelX,
                    rExt: n.rExt,
                    rExtRelX: n.rExtRelX
                })
            }
        },
        E = (t, e, n) => {
            for (; null !== n && t >= n.lowY;) n = n.next;
            return {
                lowY: t,
                index: e,
                next: n
            }
        };
    /*! markmap-common v0.1.1 | MIT License */
    class $ {
        constructor() {
            this.listeners = []
        }
        tap(t) {
            return this.listeners.push(t), () => this.revoke(t)
        }
        revoke(t) {
            const e = this.listeners.indexOf(t);
            e >= 0 && this.listeners.splice(e, 1)
        }
        revokeAll() {
            this.listeners.splice(0)
        }
        call(...t) {
            for (const e of this.listeners) e(...t)
        }
    }
    const k = Math.random().toString(36).slice(2, 8);
    let w = 0;

    function X() {}

    function b(t, e, n = "c") {
        const r = (t, i) => e(t, (() => {
            var e;
            null == (e = t[n]) || e.forEach((e => {
                r(e, t)
            }))
        }), i);
        r(t)
    }

    function C(t) {
        if (Array.from) return Array.from(t);
        const e = [];
        for (let n = 0; n < t.length; n += 1) e.push(t[n]);
        return e
    }

    function j(t, ...e) {
        const n = (t || "").split(" ").filter(Boolean);
        return e.forEach((t => {
            t && n.indexOf(t) < 0 && n.push(t)
        })), n.join(" ")
    }

    function O(t) {
        if ("string" == typeof t) {
            const e = t;
            t = t => t.tagName === e
        }
        const e = t;
        return function() {
            let t = C(this.childNodes);
            return e && (t = t.filter((t => e(t)))), t
        }
    }

    function R(t, e, n) {
        const r = document.createElement(t);
        return e && Object.entries(e).forEach((([t, e]) => {
            r[t] = e
        })), n && Object.entries(n).forEach((([t, e]) => {
            r.setAttribute(t, e)
        })), r
    }
    const M = function(t) {
        const e = {};
        return function(...n) {
            const r = `${n[0]}`;
            let i = e[r];
            return i || (i = {
                value: t(...n)
            }, e[r] = i), i.value
        }
    }((t => {
        document.head.append(R("link", {
            rel: "preload",
            as: "script",
            href: t
        }))
    }));

    function I(t, e) {
        if ("script" === t.type) return new Promise(((e, r) => {
            document.head.append(R("script", n({}, t.data, {
                onload: e,
                onerror: r
            })))
        }));
        if ("iife" === t.type) {
            const {
                fn: n,
                getParams: r
            } = t.data;
            n(...(null == r ? void 0 : r(e)) || [])
        }
    }

    function A(t) {
        "style" === t.type ? document.head.append(R("style", {
            textContent: t.data
        })) : "stylesheet" === t.type && document.head.append(R("link", n({
            rel: "stylesheet"
        }, t.data)))
    }

    function H(t) {
        const e = t.data;
        return Math.max(6 - 2 * e.d, 1.5)
    }
    const B = new $;
    class N {
        constructor(t, r) {
            var i;
            this.options = void 0, this.state = void 0, this.svg = void 0, this.styleNode = void 0, this.g = void 0, this.zoom = void 0, this.viewHooks = void 0, this.revokers = [], ["handleZoom", "handleClick"].forEach((t => {
                this[t] = this[t].bind(this)
            })), this.viewHooks = {
                transformHtml: new $
            }, this.svg = t.datum ? t : e.select(t), this.styleNode = this.svg.append("style"), this.zoom = e.zoom().on("zoom", this.handleZoom), this.options = n({
                duration: 500,
                nodeFont: "300 16px/20px sans-serif",
                nodeMinHeight: 16,
                spacingVertical: 5,
                spacingHorizontal: 80,
                autoFit: !1,
                fitRatio: .95,
                color: (i = e.scaleOrdinal(e.schemeCategory10), t => i(t.p.i)),
                paddingX: 8
            }, r), this.state = {
                id: this.options.id || (w += 1, `mm-${k}-${w}`)
            }, this.g = this.svg.append("g").attr("class", `${this.state.id}-g`), this.updateStyle(), this.svg.call(this.zoom), this.revokers.push(B.tap((() => {
                this.setData()
            })))
        }
        getStyleContent() {
            const {
                style: t,
                nodeFont: e
            } = this.options, {
                id: n
            } = this.state;
            return `.${n} a { color: #0097e6; }\n.${n} a:hover { color: #00a8ff; }\n.${n}-g > path { fill: none; }\n.${n}-fo > div { display: inherit; font: ${e}; white-space: nowrap; }\n.${n}-fo code { font-size: calc(1em - 2px); color: #555; background-color: #f0f0f0; border-radius: 2px; }\n.${n}-fo :not(pre) > code { padding: .2em .4em; }\n.${n}-fo del { text-decoration: line-through; }\n.${n}-fo em { font-style: italic; }\n.${n}-fo strong { font-weight: bolder; }\n.${n}-fo pre { margin: 0; padding: .2em .4em; }\n.${n}-g > g { cursor: pointer; }\n${"function"==typeof t?t(n):""}\n`
        }
        updateStyle() {
            this.svg.attr("class", j(this.svg.attr("class"), this.state.id)), this.styleNode.text(this.getStyleContent())
        }
        handleZoom(t) {
            const {
                transform: e
            } = t;
            this.g.attr("transform", e)
        }
        handleClick(t, e) {
            var r;
            const {
                data: i
            } = e;
            i.p = n({}, i.p, {
                f: !(null != (r = i.p) && r.f)
            }), this.renderData(e.data)
        }
        initializeData(t) {
            let e = 0;
            const {
                nodeFont: r,
                color: i,
                nodeMinHeight: s
            } = this.options, {
                id: o
            } = this.state, a = document.createElement("div"), h = `${o}-container`;
            a.className = j(a.className, `${o}-fo`, h);
            const l = document.createElement("style");
            l.textContent = `\n${this.getStyleContent()}\n.${h} {\n  position: absolute;\n  width: 0;\n  height: 0;\n  top: -100px;\n  left: -100px;\n  overflow: hidden;\n  font: ${r};\n}\n.${h} > div {\n  display: inline-block;\n}\n`, document.body.append(l, a), b(t, ((t, r) => {
                var s;
                t.c = null == (s = t.c) ? void 0 : s.map((t => n({}, t))), e += 1;
                const o = document.createElement("div");
                o.innerHTML = t.v, a.append(o), t.p = n({}, t.p, {
                    i: e,
                    el: o
                }), i(t), r()
            }));
            const c = C(a.childNodes);
            this.viewHooks.transformHtml.call(this, c), b(t, ((t, e, n) => {
                var r;
                const i = t.p.el.getBoundingClientRect();
                t.v = t.p.el.innerHTML, t.p.s = [Math.ceil(i.width), Math.max(Math.ceil(i.height), s)], t.p.k = `${(null==n||null==(r=n.p)?void 0:r.i)||""}.${t.p.i}:${t.v}`, e()
            })), a.remove(), l.remove()
        }
        setOptions(t) {
            Object.assign(this.options, t)
        }
        setData(t, e) {
            t || (t = n({}, this.state.data)), this.state.data = t, this.initializeData(t), e && this.setOptions(e), this.renderData()
        }
        renderData(t) {
            var n, r;
            if (!this.state.data) return;
            const {
                spacingHorizontal: i,
                paddingX: s,
                spacingVertical: o,
                autoFit: a,
                color: h
            } = this.options, {
                id: l
            } = this.state, d = c().children((t => {
                var e;
                return !(null != (e = t.p) && e.f) && t.c
            })).nodeSize((t => {
                const [e, n] = t.data.p.s;
                return [n, e + (e ? 2 * s : 0) + i]
            })).spacing(((t, e) => t.parent === e.parent ? o : 2 * o)), u = d.hierarchy(this.state.data);
            d(u),
                function(t, e) {
                    b(t, ((t, n) => {
                        t.ySizeInner = t.ySize - e, t.y += e, n()
                    }), "children")
                }(u, i);
            const p = u.descendants().reverse(),
                f = u.links(),
                g = e.linkHorizontal(),
                m = e.min(p, (t => t.x - t.xSize / 2)),
                x = e.max(p, (t => t.x + t.xSize / 2)),
                y = e.min(p, (t => t.y)),
                v = e.max(p, (t => t.y + t.ySizeInner));
            Object.assign(this.state, {
                minX: m,
                maxX: x,
                minY: y,
                maxY: v
            }), a && this.fit();
            const z = t && p.find((e => e.data === t)) || u,
                S = null != (n = z.data.p.x0) ? n : z.x,
                E = null != (r = z.data.p.y0) ? r : z.y,
                $ = this.g.selectAll(O("g")).data(p, (t => t.data.p.k)),
                k = $.enter().append("g").attr("transform", (t => `translate(${E+z.ySizeInner-t.ySizeInner},${S+z.xSize/2-t.xSize})`)).on("click", this.handleClick),
                w = this.transition($.exit());
            w.select("rect").attr("width", 0).attr("x", (t => t.ySizeInner)), w.select("foreignObject").style("opacity", 0), w.attr("transform", (t => `translate(${z.y+z.ySizeInner-t.ySizeInner},${z.x+z.xSize/2-t.xSize})`)).remove();
            const X = $.merge(k);
            this.transition(X).attr("transform", (t => `translate(${t.y},${t.x-t.xSize/2})`));
            const C = X.selectAll(O("rect")).data((t => [t]), (t => t.data.p.k)).join((t => t.append("rect").attr("x", (t => t.ySizeInner)).attr("y", (t => t.xSize - H(t) / 2)).attr("width", 0).attr("height", H)), (t => t), (t => t.remove()));
            this.transition(C).attr("x", -1).attr("width", (t => t.ySizeInner + 2)).attr("fill", (t => h(t.data)));
            const j = X.selectAll(O("circle")).data((t => t.data.c ? [t] : []), (t => t.data.p.k)).join((t => t.append("circle").attr("stroke-width", "1.5").attr("cx", (t => t.ySizeInner)).attr("cy", (t => t.xSize)).attr("r", 0)), (t => t), (t => t.remove()));
            this.transition(j).attr("r", 6).attr("stroke", (t => h(t.data))).attr("fill", (t => {
                var e;
                return null != (e = t.data.p) && e.f && t.data.c ? h(t.data) : "#fff"
            }));
            const R = X.selectAll(O("foreignObject")).data((t => [t]), (t => t.data.p.k)).join((t => {
                {{/* foreignObject 的 .attr("y", 0) 可以影響他的位置，例如y=-5可以往上移動 */}}
                const e = t.append("foreignObject").attr("class", `${l}-fo`).attr("x", s).attr("y", 0).style("opacity", 0).attr("height", (t => t.xSize));
                return e.append("xhtml:div").select((function(t) {
                    const e = t.data.p.el.cloneNode(!0);
                    return this.replaceWith(e), e
                })).attr("xmlns", "http://www.w3.org/1999/xhtml"), e
            }), (t => t), (t => t.remove())).attr("width", (t => Math.max(0, t.ySizeInner - 2 * s)));
            this.transition(R).style("opacity", 1);
            const M = this.g.selectAll(O("path")).data(f, (t => t.target.data.p.k)).join((t => {
                const e = [E + z.ySizeInner, S + z.xSize / 2];
                return t.insert("path", "g").attr("d", g({
                    source: e,
                    target: e
                }))
            }), (t => t), (t => {
                const e = [z.y + z.ySizeInner, z.x + z.xSize / 2];
                return this.transition(t).attr("d", g({
                    source: e,
                    target: e
                })).remove()
            }));
            this.transition(M).attr("stroke", (t => h(t.target.data))).attr("stroke-width", (t => H(t.target))).attr("d", (t => {
                const e = [t.source.y + t.source.ySizeInner, t.source.x + t.source.xSize / 2],
                    n = [t.target.y, t.target.x + t.target.xSize / 2];
                return g({
                    source: e,
                    target: n
                })
            })), p.forEach((t => {
                t.data.p.x0 = t.x, t.data.p.y0 = t.y
            }))
        }
        transition(t) {
            const {
                duration: e
            } = this.options;
            return t.transition().duration(e)
        }
        fit() {
            const t = this.svg.node(),
                {
                    width: n,
                    height: r
                } = t.getBoundingClientRect(),
                {
                    fitRatio: i
                } = this.options,
                {
                    minX: s,
                    maxX: o,
                    minY: a,
                    maxY: h
                } = this.state,
                l = h - a,
                c = o - s,
                d = Math.min(n / l * i, r / c * i, 2),
                u = e.zoomIdentity.translate((n - l * d) / 2 - a * d, (r - c * d) / 2 - s * d).scale(d);
            return this.transition(this.svg).call(this.zoom.transform, u).end().catch(X)
        }
        rescale(t) {
            const n = this.svg.node(),
                {
                    width: r,
                    height: i
                } = n.getBoundingClientRect(),
                s = r / 2,
                o = i / 2,
                a = e.zoomTransform(n),
                h = a.translate((s - a.x) * (1 - t) / a.k, (o - a.y) * (1 - t) / a.k).scale(t);
            return this.transition(this.svg).call(this.zoom.transform, h).end().catch(X)
        }
        destroy() {
            this.svg.remove(), this.revokers.forEach((t => {
                t()
            }))
        }
        static create(t, e, n) {
            const r = new N(t, e);
            return n && (r.setData(n), r.fit()), r
        }
    }
    t.Markmap = N, t.loadCSS = function(t) {
        for (const e of t) A(e)
    }, t.loadJS = async function(t, e) {
        const r = t.filter((t => "script" === t.type));
        r.length > 1 && r.forEach((t => M(t.data.src))), e = n({
            getMarkmap: () => window.markmap
        }, e);
        for (const n of t) await I(n, e)
    }, t.refreshHook = B
}(this.markmap = this.markmap || {}, d3);
