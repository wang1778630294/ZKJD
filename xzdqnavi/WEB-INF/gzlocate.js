var dLoc = {};
(function () {
    var e = 35;
    var t = 52;
    var i = true;
    var r = true;
    var n = 0;
    var a = [];
    var o = [];
    var s = {
        alpha: 0,
        beta: 0,
        gamma: 0
    };
    var c = null;
    var f = false;
    var l = false;

    var p = {
        map: [],
        obstacle: [],
        hwObstacle: [],
        aps: [],
        roads: [],
        poiList: [],
        mapInfo: null,
        filterPoiList: []
    };


    var g = function () {
        var e = [-.00868331738625167, -.00281935994810742, -.00283620174071117, -.00250768991491832, -.00179790389516092, -.000716919728262325, .0006927111857561, .00234179121345493, .00412333074914049, .00589285272443655, .00749969993475725, .00877894172772015, .00962269149842373, .00994153938983649, .00966378261817836, .00883840100294115, .00751801859529968, .00584526898045774, .00398928778908712, .00215769750280585, .000559210726540666, -.000618216471598856, -.0012317912864319, -.00120368229374989, -.00053389058089984, .000674109911503082, .00223907987608249, .00390195691851279, .00533849097203222, .00621165061009779, .00618366809924862, .00497745464625127, .0023947918507135, -.00163796765800328, -.00705280587105352, -.0136255848960293, -.0209837768438509, -.0286247148948028, -.0359412288773305, -.0422811919993904, -.0469905464323133, -.0494765763884226, -.049266061331278, -.0460508167884474, -.039736000885158, -.0304505930567507, -.0185625196346448, -.00465529784529705, .0105010765137949, .0260079086781106, .0409005746542444, .0542171334675495, .0650808900149999, .0727608365147878, .0767374483224153, .0767374483224153, .0727608365147878, .0650808900149999, .0542171334675495, .0409005746542444, .0260079086781106, .0105010765137949, -.00465529784529705, -.0185625196346448, -.0304505930567507, -.039736000885158, -.0460508167884474, -.049266061331278, -.0494765763884226, -.0469905464323133, -.0422811919993904, -.0359412288773305, -.0286247148948028, -.0209837768438509, -.0136255848960293, -.00705280587105352, -.00163796765800328, .0023947918507135, .00497745464625127, .00618366809924862, .00621165061009779, .00533849097203222, .00390195691851279, .00223907987608249, .000674109911503082, -.00053389058089984, -.00120368229374989, -.0012317912864319, -.000618216471598856, .000559210726540666, .00215769750280585, .00398928778908712, .00584526898045774, .00751801859529968, .00883840100294115, .00966378261817836, .00994153938983649, .00962269149842373, .00877894172772015, .00749969993475725, .00589285272443655, .00412333074914049, .00234179121345493, .0006927111857561, -.000716919728262325, -.00179790389516092, -.00250768991491832, -.00283620174071117, -.00281935994810742, -.00868331738625167];
        var t = 110;
        var i = 100;
        var r = new Array(t);
        var n = new Array(t);
        var a = new Array(t);
        var o = 0;
        var s = new Array(i);
        var c = new Array(i);
        var f = new Array(i);
        var l = 0;
        var u = 8;
        var v = 1;
        var p = 0;
        var h = 0;
        var g = 0;
        var d = 0;
        var y = 0;
        var x = 0;
        var m = 0;
        this.reset = function () {
            r = new Array(t);
            n = new Array(t);
            a = new Array(t);
            o = 0;
            s = new Array(i);
            c = new Array(i);
            f = new Array(i);
            l = 0;
            p = 0;
            h = 0;
            g = 0;
            d = 0;
            y = 0;
            x = 0;
            m = 0
        };
        this.detectStep = function (m, w) {
            r[o] = w[0];
            n[o] = w[1];
            a[o] = w[2];
            o = (o + 1) % t;
            var P = o;
            var L = 0;
            var D = 0;
            var M = 0;
            var b = 0;
            while (L < t) {
                D += r[P] * e[L];
                M += n[P] * e[L];
                b += a[P] * e[L];
                L = L + 1;
                P = (P + 1) % t
            }
            var I = l - 1;
            if (I < 0) {
                I = i - 1
            }
            s[l] = D;
            c[l] = M;
            f[l] = b;
            l = (l + 1) % i;
            if (y >= 3) {
                var S = (m - x) / 1e3;
                if (S > 3) y = 0
            }
            var V = 0;
            if (b > 0 && f[I] < 0) {
                d++
            }
            if (d == 1) {
                if (p < D) p = D;
                if (h < M) h = M;
                if (g < b) g = b
            } else if (d == 2) {
                var A = p + h + g;
                d = 1;
                p = -5;
                h = -5;
                g = -5;
                if (A > v && A < u) {
                    V = 1;
                    if (y < 3) y = y + 1;
                    if (y >= 3) {
                        var k = (m - x) / 1e3;
                        x = m;
                        k = 1 / k;
                        if (k > 1 && k < 2.2) {
                            return 1
                        } else return 0
                    } else return 0
                }
            } else {}
            return 0
        }
    };
    var d = 0,
        y = 1,
        x = 2,
        m = 3;
    var w = function (i, n) {
        var a = 0,
            s = 1,
            c = 2;
        var f = a;
        var u = p.aps;
        var v = 0,
            g = 0;
        var d, y = 1;
        var w = new M;
        var L = 0;
        var D = false;
        var b = false;
        var S = null;
        var V = null;
        var A = 0;
        var k = true;
        var C = function () {
            n.showSignalFlash(b);
            S = setInterval(function () {
                if (D) {
                    b = false;
                    if (L > 5) {
                        i.setCurrentPos(null);
                        typeof E.position === "function" && E.position(null);
                        D = false
                    }
                    L++
                } else {
                    b = !b
                }
                n.showSignalFlash(b);
                typeof E.status === "function" && E.status(D ? "online" : "offline");
                n.setLocationVisible(D ? "visible" : "hidden")
            }, 1e3)
        };
        var T = function () {
            n.showSignalFlash(false);
            L = 0;
            clearInterval(S);
            S = null
        };
        C();
        var R = function (e) {
            var t = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
            var i = "";
            for (var r = 0; r < 4; r++) {
                i = t[e % 16] + i;
                e = parseInt(e / 16)
            }
            return i
        };
        var F = function (e, t) {
            if (!u) {
                return null
            }
            for (var i = 0; i < u.length; i++) {
                var r = u[i];
                if (r.ma == e && r.mi == t) {
                    return r
                }
            }
            return null
        };
        var j = function (e) {
            var t = (new Date).getTime();
            var i = e.filter(function (e) {
                return parseInt(e.rssi) !== 0
            });
            i.forEach(function (e) {
                var i = F(e.major, e.minor);
                if (i) {
                    var n = i.measures.push({
                        timestamp: t,
                        rssi: parseInt(e.rssi)
                    });
                    if (n > 5) i.measures.shift();
                    I.setApColor(i);
                    if (r) {
                        o.push({
                            timestamp: t,
                            major: e.major,
                            minor: e.minor,
                            rssi: e.rssi
                        })
                    }
                }
            })
        };
        this.onRegionChange = function (e, t) {
            y = t;
            w = new M
        };
        var O = [22.9887298711, 113.2631809825];
        var _ = proj4("EPSG:4326", "EPSG:3857", [O[1], O[0]]);
        var N = p.map[0].orientation * Math.PI / 180;
        var B = function (e) {
            var t = e.lng - _[0];
            var i = e.lat - _[1];
            var r = t * Math.cos(N) - i * Math.sin(N);
            var n = -t * Math.sin(N) - i * Math.cos(N);
            return {
                x: r,
                y: n,
                region: 1,
                acc: e.acc
            }
        };
        var q = [];
        var G = function (e) {
            var t = null;
            var i = 0;
            var r = tcmap.getLocation();
            if (r === null) {
                if (q.length > 0) {
                    q.shift()
                }
            } else {
                var n = proj4("EPSG:4326", "EPSG:3857", [r.lng, r.lat]);
                var a = B({
                    lat: n[1],
                    lng: n[0],
                    acc: r.accuracy
                });
                if (q.length >= e) {
                    q.shift()
                }
                q.push(a)
            }
            var o = 10;
            var s = q.length;
            if (s > 0) {
                var c = 0;
                var f = 0;
                var l = null;
                var u = 0;
                for (var v = 0; v < s; v++) {
                    l = q[v];
                    W(JSON.stringify(l));
                    if (l.acc > 0) {
                        var h = 0;
                        if (l.acc >= 10) {
                            h = f < p.map[1].h ? l.acc / 2 : 0 - l.acc / 2
                        }
                        c += l.x;
                        f += l.y + h;
                        u = u + 1;
                        var g = o / l.acc;
                        i += g > 1 ? 1 : g
                    }
                }
                if (u > 0) {
                    t = {
                        x: c / u,
                        y: f / u,
                        region: 1
                    };
                    var d = D2DLocView.isPosOverStep(t);
                    t.overStep = d;
                    i = i * 1 / u
                }
            }
            return {
                position: t,
                confidence: i
            }
        };
        var z = function (t) {
            var i = p.map[1];
            if (t.region === 1 && (t.y < e || t.y > i.h - e)) {
                return true
            } else {
                return false
            }
        };
        var H = .5;
        var J = null;
        var U = function (e, i) {
            var r = p.map[1];
            if (i === 1 && (e.y < t || e.y > r.h - t) && e.x >= 0 && e.x <= r.w) {
                return true
            } else {
                return false
            }
        };
        var W = function (e) {};
        var Y = 0;
        var Q = 0;
        var X = [];
        var Z = function (e) {
            W();
            var t = G(8);
            var i = t.position;
            var r = t.confidence;
            if (i) {
                W("GPS位置: x=" + i.x + ", y=" + i.y + ", 置信度=" + r)
            }
            var n = (new Date).getTime();
            var a = u.filter(function (t) {
                return t.measures.length > 0 && n - t.measures[t.measures.length - 1].timestamp < e
            });
            for (var o = 0; o < a.length; o++) {
                var s = 0;
                var c = 0;
                for (var f = 0; f < a[o].measures.length; f++) {
                    if (n - a[o].measures[f].timestamp < e) {
                        s = s + a[o].measures[f].rssi;
                        c = c + 1
                    }
                }
                s = s / c;
                a[o].meanrssi = s
            }
            var l = a.sort(function (e, t) {
                return t.meanrssi - e.meanrssi
            });
            if (l.length >= 3) {
                if (l[0].re === l[1].re && l[0].re === l[2].re && l[0].re !== y) {
                    W("区域从" + y + "切换为" + l[0].re);
                    P(y, l[0].re)
                }
            }
            var v = {
                region: y,
                position: null,
                accuracy: x
            };
            if (y === null) {
                W("没有region");
                return v
            }
            var p = null;
            if (y >= 0) {
                var h = l.filter(function (e) {
                    return e.re === y
                });
                if (h.length > 0) {
                    var g = w.locate(h);
                    if (J && U(g, y)) {
                        p = {
                            x: J.x * H + g.x * (1 - H),
                            y: J.y * H + g.y * (1 - H),
                            region: y
                        }
                    } else {
                        p = {
                            x: g.x,
                            y: g.y,
                            region: y
                        }
                    }
                    v.position = {
                        x: p.x,
                        y: p.y
                    };
                    J = p;
                    Y = Y + 1;
                    Q = 0;
                    W("蓝牙位置 " + Y + ": x=" + parseInt(p.x) + ", y=" + parseInt(p.y))
                } else {
                    if (Q++ < 3 && J) {
                        W("上次的蓝牙位置第 " + Q + "次: x=" + parseInt(J.x) + ", y=" + parseInt(J.y));
                        p = J;
                        v.position = {
                            x: p.x,
                            y: p.y
                        }
                    } else {
                        J = null;
                        Q = 0;
                        W("蓝牙位置不见了")
                    }
                    Y = 0
                }
            } else {
                W("region=" + y)
            }
            if (y === 1) {
                if (p) {
                    if (i) {
                        var d = r;
                        var m = r;
                        var L = {
                            x: p.x * (1 - d) + i.x * d,
                            y: p.y * (1 - m) + i.y * m,
                            region: y
                        };
                        var D = D2DLocView.isPosOverStep(L);
                        var M = U(i, 1);
                        var b = U(L, L.region);
                        if (M && D) {
                            v.position = null
                        } else {
                            if (b) {
                                v.position = {
                                    x: L.x,
                                    y: L.y
                                }
                            }
                        }
                        W("GPS与蓝牙融合位置: x=" + parseInt(L.x) + ", y=" + parseInt(L.y) + ", 超出边界=" + D + ", 在东西广场=" + b)
                    }
                } else {
                    if (i) {
                        if (i.overStep) {
                            v.position = null
                        } else {
                            var I = U(i, 1);
                            if (I && r > .8) {
                                v.position = {
                                    x: i.x,
                                    y: i.y
                                }
                            }
                        }
                    }
                }
            }
            if (v.position) {
                W("输出位置: x=" + parseInt(v.position.x) + ", y=" + parseInt(v.position.y))
            } else {
                W("输出位置为空")
            }
            if ($("#debug_output").html().length < 1) {
                W("没有输出")
            }
            return v
        };
        var K = 0;
        var ee = function () {
            switch (f) {
                case a:
                    return;
                case s:
                    v += 1;
                    if (v >= 5) {
                        v = 0;
                        var e = Z(3e3);
                        if (e.position !== null) {
                            L = 0;
                            D = true;
                            i.onBluetoothLocation(e.region, e.position, x);
                            f = c
                        }
                        if (e.region < 0) {
                            L = 0;
                            D = true
                        }
                    }
                    break;
                case c:
                    var t = Z(2500);
                    if (l) {
                        if (K++ > 5) {
                            K = 0;
                            t = {
                                region: 1,
                                position: {
                                    x: Math.random() * 400,
                                    y: Math.random() * 400
                                },
                                accuracy: x
                            }
                        }
                    }
                    if (t.accuracy === m) {
                        g += 1
                    } else {
                        g = 0
                    }
                    if (t.position !== null) {
                        L = 0;
                        D = true;
                        i.onBluetoothLocation(t.region, t.position, x)
                    }
                    if (t.region < 0) {
                        L = 0;
                        D = true
                    }
                    break
            }
        };
        var te = function () {
            u.forEach(function (e) {
                e.measures = [];
                e.meanrssi = null
            })
        };
        te();
        this.startScan = function (e) {
            f = c;
            v = 0;
            if (h()) {
                if (V) {
                    clearInterval(V)
                }
                V = setInterval(function () {
                    if (A < 5) {
                        A++;
                        typeof E.beaconStatus === "function" && E.beaconStatus("ok")
                    } else {
                        typeof E.beaconStatus === "function" && E.beaconStatus("error")
                    }
                }, 1e3);
                wx.startSearchBeacons({
                    ticket: "",
                    complete: function (t) {
                        console.log(t.errMsg);
                        if (t.errMsg === "startSearchBeacons:ok" || t.errMsg === "startSearchBeacons:already started" || t.errMsg === "startSearchBeacons:location service disable") {
                            wx.onSearchBeacons({
                                complete: function (e) {
                                    if (e.beacons.length > 0) {
                                        A = 0;
                                        j(e.beacons)
                                    }
                                }
                            });
                            typeof e.success === "function" && e.success();
                            typeof e.complete === "function" && e.complete()
                        } else {
                            typeof e.fail === "function" && e.fail();
                            typeof e.complete === "function" && e.complete()
                        }
                    }
                })
            } else {
                typeof e.success === "function" && e.success();
                typeof e.complete === "function" && e.complete()
            }
        };
        this.stopScan = function (e) {
            if (h()) {
                wx.stopSearchBeacons({
                    complete: function (t) {
                        if (t.errMsg === "stopSearchBeacons:ok") {
                            typeof e.success === "function" && e.success();
                            typeof e.complete === "function" && e.complete()
                        } else {
                            typeof e.fail === "function" && e.fail();
                            typeof e.complete === "function" && e.complete()
                        }
                    }
                });
                if (V) {
                    clearInterval(V)
                }
                V = null
            } else {
                typeof e.success === "function" && e.success();
                typeof e.complete === "function" && e.complete()
            }
        };
        d = setInterval(ee, 1e3)
    };
    var P = function (e, t) {
        _.onRegionChanged(e, t)
    };
    var L = function (e) {
        var t;
        var o = new g;
        var c = "deviceorientation";
        var f = function (i) {
            var a = i.absolute;
            if (typeof i.webkitCompassHeading !== "undefined") {
                t = i.webkitCompassHeading;
                a = true
            } else {
                t = 360 - i.alpha
            }
            if (r) {
                n = t;
                s = {
                    alpha: i.alpha,
                    beta: i.beta,
                    gamma: i.gamma
                }
            }
            if (a) {
                e.onDirectionChange(t)
            } else if (c === "deviceorientation") {
                window.removeEventListener(c, f, false);
                c = "deviceorientationabsolute";
                window.addEventListener(c, f, false)
            }
        };
        var l = function (c) {
            var f = c.acceleration;
            if (!f || !f.z) {
                f = c.accelerationIncludingGravity
            }
            var l = [f.x, f.y, f.z];
            if (r) {
                if (i) {
                    a.push({
                        timestamp: (new Date).getTime(),
                        acce: [l[0], l[1], l[2]],
                        compass: n,
                        orientation: {
                            alpha: s.alpha,
                            beta: s.beta,
                            gamma: s.gamma
                        }
                    })
                }
            }
            var u = o.detectStep((new Date).getTime(), l);
            if (u > 0 && t) {
                e.onStepDetected({
                    direction: t,
                    increment: u
                })
            }
        };

    };

    function D(e, t) {
        return Math.sqrt((e.x - t.x) * (e.x - t.x) + (e.y - t.y) * (e.y - t.y))
    }
    function M() {
        this.lastAPs = null;
        this.lastPosition = null;
        this.cc = .1;

        function e(e) {
            var t = [];
            for (var i = 0; i < e.length; i++) {
                var r = e[i];
                var n = [];
                n.push(r);
                for (var a = 0; a < e.length; a++) {
                    if (a !== i) {
                        var o = e[a];
                        for (var s = 0; s < r.ne.length; s++) {
                            if (o.na === r.ne[s]) {
                                n.push(o);
                                break
                            }
                        }
                    }
                }
                t.push(n)
            }
            return t
        }
        this.locate = function (i) {
            var r = null;
            var n = 0;
            var a = e(i);
            var o = 0;
            var s = 0;
            for (var c = 0; c < a.length; c++) {
                var f = a[c];
                if (f.length > s) {
                    s = f.length;
                    o = c
                }
                if (f.length >= 4) {
                    r = f;
                    n = 4;
                    break
                }
            }
            if (r === null) {
                r = a[o];
                if (r.length >= 2) {
                    n = 2
                } else if (r.length === 1) {
                    n = 1
                } else {}
            }
            var l = false;
            var u = 0;
            var v = 1;
            if (this.lastAPs === null) {
                this.lastAPs = r;
                this.cc = .5;
                l = true;
                v = 1
            } else {
                for (var c = 0; c < r.length; c++) {
                    var p = r[c];
                    for (var h = 0; h < this.lastAPs.length; h++) {
                        if (p.na === this.lastAPs[h].na) {
                            l = true;
                            u = u + 1
                        }
                    }
                }
                v = u / r.length;
                this.lastAPs = r
            }
            var g = t(r);
            var d = {
                x: 0,
                y: 0
            };
            if (this.lastPosition !== null && l) {
                var y = D(this.lastPosition, g);
                if (y > 6) {
                    this.cc = this.cc + .1;
                    if (this.cc > .5) this.cc = .5;
                    d.x = this.lastPosition.x * (1 - this.cc) + this.cc * g.x;
                    d.y = this.lastPosition.y * (1 - this.cc) + this.cc * g.y
                } else if (y > 2) {
                    this.cc = .1;
                    var x = .2;
                    d.x = this.lastPosition.x * (1 - x) + x * g.x;
                    d.y = this.lastPosition.y * (1 - x) + x * g.y
                } else {
                    this.cc = .1;
                    d.x = this.lastPosition.x;
                    d.y = this.lastPosition.y
                }
                this.lastPosition = d
            } else if (this.lastPosition === null) {
                d.x = g.x;
                d.y = g.y;
                this.lastPosition = d
            } else {
                d = this.lastPosition
            }
            return d
        };

        function t(e) {
            var t = 0;
            var n = 0;
            if (e.length === 1) {
                t = e[0].x;
                n = e[0].y
            } else if (e.length === 2) {
                var a = i(e[0], e[1]);
                t = a.x;
                n = a.y
            } else if (e.length >= 3) {
                var o = i(e[0], e[1]);
                var s = i(e[0], e[2]);
                var c = i(e[1], e[2]);
                var f = r(o, s, c, 1, 1, 1);
                t = f.x;
                n = f.y
            } else {
                t = -1;
                n = -1
            }
            return {
                x: t,
                y: n
            }
        }
        function i(e, t) {
            var i = Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2);
            var r = Math.sqrt(i);
            if (r) {
                var n = 1;
                var a = e.meanrssi - t.meanrssi;
                if (a > 10) {
                    n = .16667
                } else if (a > 5) {
                    n = .33333
                } else {
                    n = .5
                }
                var o = n * r;
                var s = (t.x - e.x) * o / r + e.x;
                var c = (t.y - e.y) * o / r + e.y;
                return {
                    x: s,
                    y: c
                }
            } else {
                return e
            }
        }
        function r(e, t, i, r, n, a) {
            var o = D(e, t) * a;
            var s = D(t, i) * r;
            var c = D(i, e) * n;
            var f = o + s + c;
            var l = (e.x * s + t.x * c + i.x * o) / f;
            var u = (e.y * s + t.y * c + i.y * o) / f;
            return {
                x: l,
                y: u
            }
        }
    }
    var b = function (e) {
        var t = .6,
            n = 0,
            s = 0;
        var c = false;
        var f, l, u, v, h = null;
        var g = null;
        var d = {
                x: 0,
                y: 0,
                region: null,
                direction: 0
            },
            y = {
                x: 0,
                y: 0,
                region: null,
                direction: 0
            },
            x = {
                x: 0,
                y: 0,
                region: null,
                direction: 0
            };
        var m = new L(this);
        var P = new w(this, e);
        var M = function (e, t, i) {
            var r = e.y - t.y;
            var n = t.x - e.x;
            var a = e.x * t.y - t.x * e.y;
            var o = Math.abs(r * i.x + n * i.y + a) / Math.sqrt(r * r + n * n);
            return o
        };
        var b = function (e, t, i) {
            var r = e.y - t.y;
            var n = t.x - e.x;
            var a = e.x * t.y - t.x * e.y;
            var o = (n * n * i.x - r * n * i.y - r * a) / (r * r + n * n);
            var s = (r * r * i.y - r * n * i.x - n * a) / (r * r + n * n);
            return {
                x: o,
                y: s
            }
        };
        this.getRealPosPixel = function () {
            return y
        };
        this.getPrjPosPixel = function () {
            return d
        };
        this.getPosMeter = function () {
            var e = {
                x: x.x,
                y: x.y,
                region: h,
                direction: x.direction
            };
            return e
        };


        var I = function (e) {
            if (p.roads.length <= 0) {
                return {
                    x: e.x,
                    y: e.y,
                    region: null
                }
            }
            var t = null,
                i = null;
            for (var r = 0; r < p.roads.length; r++) {
                var n = p.roads[r].region;
                if (n != null && n === h) {
                    var a = p.roads[r];
                    var o, s, f, l;
                    var u = b(a.pt1, a.pt2, e);
                    if ((u.x - a.pt1.x) * (u.x - a.pt2.x) < 0 || (u.y - a.pt1.y) * (u.y - a.pt2.y) < 0) {
                        f = u.x - e.x;
                        l = u.y - e.y;
                        s = Math.sqrt(f * f + l * l);
                        o = u
                    } else {
                        var v = D(u, a.pt1) < D(u, a.pt2) ? a.pt1 : a.pt2;
                        f = v.x - e.x;
                        l = v.y - e.y;
                        s = Math.sqrt(f * f + l * l);
                        o = v
                    }
                    if (!i || s < i) {
                        i = s;
                        t = o
                    }
                }
            }
            if (t) {
                if (e.x > 0 && e.y > 0) {
                    var g = 15;
                    var d = e.x - t.x;
                    var y = e.y - t.y;
                    if (d * d + y * y > g * g) {
                        c = true
                    } else {
                        c = false
                    }
                }
                return t
            } else {
                c = true;
                return {
                    x: e.x,
                    y: e.y,
                    region: null
                }
            }
        };
        var S = function (t) {
            if (f) {
                var i = I(f);
                if (u === undefined || u === null) {
                    u = 0
                }
                var r = {
                    region: h,
                    x: i.x,
                    y: i.y,
                    direction: u
                };
                var n = {
                    x: f.x,
                    y: f.y,
                    direction: u,
                    region: h
                };
                if (h >= 0) {
                    x = n;
                    d = {
                        x: r.x * p.map[r.region].ratio,
                        y: r.y * p.map[r.region].ratio,
                        region: W.getPathStatus() ? null : h,
                        direction: r.direction
                    };
                    if (!c) {
                        e.updatePath()
                    }
                    if (c && p.roads.length > 0) {
                        if (l) {
                            n = {
                                x: l.x,
                                y: l.y,
                                direction: u,
                                region: h
                            }
                        }
                        d.region = null;
                        typeof B.deviated === "function" && B.deviated(n, c);
                        c = false
                    }
                    y = {
                        x: n.x * p.map[n.region].ratio,
                        y: n.y * p.map[n.region].ratio,
                        region: h,
                        direction: n.direction
                    };
                    e.updateLocation(y, d);
                    e.showPosition(t)
                }
                typeof E.position === "function" && E.position(n)
            }
        };
        this.getPosition = function () {
            return disPos
        };

        this.onStepDetected = function (e) {
            s += e.increment;
            if (x.region === null || h === null || !f || h < 0) {
                return
            }
            var n = (e.direction - p.map[h].orientation) * Math.PI / 180;
            f.x += Math.sin(n) * t * e.increment;
            f.y -= Math.cos(n) * t * e.increment;
            var o = {
                x: f.x,
                y: f.y,
                region: h
            };
            if (D2DLocView.isPosOverStep(o)) {
                f = x
            } else {
                S(false)
            }
            if (r) {
                if (!i) {
                    a.push({
                        timestamp: (new Date).getTime(),
                        direction: u
                    })
                }
            }
        };
        this.onDirectionChange = function (t) {
            if (h !== null && h >= 0) {
                u = (360 + t - p.map[h].orientation) % 360;
                e.updateDirection(u)
            }
        };
        var V = function (t) {
            f = null;
            e.setCurrentRegion(t);
            if (t >= 0) {
                e.refreshLayoutMode();
                if (e.isFollow()) {
                    e.showMap(t)
                }
            } else {
                if (t > -1024) e.setLayoutMode(2)
            }
            h = t
        };
        this.onBluetoothLocation = function (e, i, r) {
            l = i;
            if (!f) {
                h = e;
                f = i;
                S(true)
            } else {
                var a = Math.sqrt((f.x - i.x) * (f.x - i.x) + (f.y - i.y) * (f.y - i.y));
                var o = u * Math.PI / 180;
                var s = Math.sin(o);
                var c = -Math.cos(o);
                var p = i.x - f.x;
                var g = i.y - f.y;
                if (s * p + c * g > 0) {
                    if (t < 1.2) {
                        t += .2
                    }
                } else {
                    if (t > .6) {
                        t -= .2
                    }
                }
                var d = 10;
                if (h === 0) {
                    d = 5
                }
                if (a > d && (!v || a - v > -.001)) {
                    v = a;
                    n += 1;
                    if (n >= 3) {
                        f = i;
                        n = 0;
                        v = null;
                        S(true)
                    }
                } else {
                    S(false);
                    n = 0;
                    v = null
                }
            }
        };
        this.startLocate = function (e) {
            m.startDetect();
            return P.startScan(e)
        };
        this.stopLocate = function (e) {
            m.stopDetect();
            return P.stopScan(e)
        };
        this.setOrientationMode = function (e) {
            m.setOrientationMode(e)
        };
        this.setCurrentPos = function (e) {
            f = e
        };
        this.sendData = function (e, t) {
            if (r) {
                var i = (new Date).getTime();
                var n = 8;
                if (a.length < 3 || o.length < 3) {
                    a = [];
                    o = [];
                    return
                }
                var s = a.map(function (e) {
                    return e.timestamp + "," + e.acce[0].toFixed(n) + "," + e.acce[1].toFixed(n) + "," + e.acce[2].toFixed(n) + "," + e.orientation.alpha.toFixed(4) + "," + e.orientation.beta.toFixed(4) + "," + e.orientation.gamma.toFixed(4)
                }).join("\n");
                var c = o.map(function (e) {
                    return e.timestamp + "," + e.major + "," + e.minor + "," + parseInt(e.rssi)
                }).join("\n");
                a = [];
                o = [];
                return dlAjax({
                    url: "../../../cicadanet.com_3A8088/default.htm",
                    method: "POST",
                    data: {
                        userId: e,
                        nickName: t,
                        pdr: s,
                        beacon: c
                    },
                    contentType: "application/x-www-form-urlencoded"
                })
            }
        }
    };
    var I = null;
    var S = function () {
        var e = "path_route1";
        var t = 4;
        var i = false;
        var r = false;
        var n = false;
        var a = 0;
        var o = 1;
        var s = null;
        var c = 0;
        var f = null;
        var l = new Object;
        var v = 0;
        var h = 0;
        var g = "";
        var d = 0;
        var y = "hidden";
        var x = {
            id: "test",
            imgSrc: "../img/userhead.png" + u.version
        };
        var m = {
            points: [],
            distance: 0
        };
        var w = null;
        var P = function () {
            D2DLocView.config("loc_d2-container", p.mapInfo, 1);
            D2DLocView.setFollowCallback(function (e) {
                i = false;
                n = false
            })
        };
        var L = function () {
            var e = {};
            e.c = "d25Canvas";
            e.n = "loc_d25-container";
            e.mapX = p.map[0].hp;
            e.mapY = p.map[0].wp;
            e.xshift = 1090;
            e.yshift = 1055;
            e.map = {
                src: "../static/map-25d.png" + u.version,
                loc: {
                    src: "../img/userhead.png" + u.version,
                    width: 30,
                    height: 30
                }
            };
            D25DLocView.config(e);
            D25DLocView.setFollowCallback(function (e) {
                i = false;
                n = false
            })
        };
        var D = function (e) {
            var t = {
                x: e.currentPos.x - e.previousPos.x,
                y: e.currentPos.y - e.previousPos.y
            };
            var i = {
                x: e.nextPos.x - e.currentPos.x,
                y: e.nextPos.y - e.currentPos.y
            };
            return t.x * i.x + t.y * i.y >= 0
        };
        var M = function (e, t) {
            var i = e.x - t.x;
            var r = e.y - t.y;
            var n = Math.sqrt(i * i + r * r);
            return n
        };
        var b = function (e) {
            var t = [];
            if (!(e instanceof Array) && e.length > 1) {
                return t
            }
            var i = D2DLocView.getMapView().scale;
            var r = 10 / i;
            for (var n = 1; n < e.length; n++) {
                var a = e[n - 1].region === e[n].region ? e[n].region : null;
                if (a != null) {
                    var o = M(e[n - 1], e[n]);
                    var s = parseInt(o / r);
                    if (s <= 1) {
                        t.push({
                            pt1: e[n - 1],
                            pt2: e[n],
                            region: a
                        })
                    } else {
                        var c = (e[n].x - e[n - 1].x) / s;
                        var f = (e[n].y - e[n - 1].y) / s;
                        var l = {
                            x: e[n - 1].x,
                            y: e[n - 1].y
                        };
                        var u = {
                            x: e[n - 1].x + c,
                            y: e[n - 1].y + f
                        };
                        t.push({
                            pt1: l,
                            pt2: u,
                            region: a
                        });
                        for (var v = 1; v < s - 1; v++) {
                            l = {
                                x: l.x + c,
                                y: l.y + f
                            };
                            u = {
                                x: u.x + c,
                                y: u.y + f
                            };
                            if (v % 2 === d) {
                                continue
                            }
                            t.push({
                                pt1: l,
                                pt2: u,
                                region: a
                            })
                        }
                    }
                }
            }
            d = (d + 1) % 2;
            return t
        };
        var I = function (e) {
            var t = "";
            var i = e.points;
            var r = e.distance;
            if (!(i instanceof Array)) {
                return null
            }
            var n = _.getPrjPosPixel();
            var a = _.getRealPosPixel();
            var o = n.region;
            var s = [];
            var c = 0;
            var f = false;
            var l = "38bc3d";
            var u = "bebebe";
            var v = i.length;
            for (var h = 1; h < v; h++) {
                var d = i[h - 1].region === i[h].region ? i[h].region : null;
                if (d != null) {
                    var y = p.map[i[h].region].ratio;
                    if (f || o == null) {
                        s.push({
                            pt1: i[h - 1],
                            pt2: i[h],
                            color: l,
                            region: d
                        });
                        var x = M(i[h - 1], i[h]) / y;
                        c += x
                    } else {
                        var m = {
                            x: i[h].x,
                            y: i[h].y
                        };
                        var w = {
                            x: i[h - 1].x,
                            y: i[h - 1].y
                        };
                        var P = {
                            previousPos: w,
                            currentPos: n,
                            nextPos: m
                        };
                        if (o === d && D(P)) {
                            f = true;
                            s.push({
                                pt1: i[h - 1],
                                pt2: n,
                                color: u,
                                region: i[h].region
                            });
                            s.push({
                                pt1: n,
                                pt2: i[h],
                                color: l,
                                region: i[h].region
                            });
                            var L = M(n, i[h]) / y;
                            c += L;
                            if (L <= 10) {
                                if (h + 1 < i.length) {
                                    if (M(i[h], i[h + 1]) / y >= 5) {
                                        var b = {
                                            x: i[h + 1].x - i[h].x,
                                            y: i[h + 1].y - i[h].y
                                        };
                                        var I = {
                                            x: i[h].x - i[h - 1].x,
                                            y: i[h].y - i[h - 1].y
                                        };
                                        var S = b.x * I.y - b.y * I.x;
                                        var V = parseInt(L);
                                        var A = false;
                                        if (S != 0) {
                                            if (V >= 1) {
                                                t = "请沿当前路线, 直行" + parseInt(L) + "米后"
                                            } else {
                                                t = "请沿当前路线, 准备";
                                                A = true
                                            }
                                            if (S < 0) {
                                                t += "右转";
                                                if (A && g !== "right") {
                                                    g = "right";
                                                    typeof B.tipsType === "function" && B.tipsType(g)
                                                }
                                            } else {
                                                t += "左转";
                                                if (A && g !== "left") {
                                                    g = "left";
                                                    typeof B.tipsType === "function" && B.tipsType(g)
                                                }
                                            }
                                        }
                                    } else {
                                        if (g !== "straight") {
                                            g = "straight";
                                            typeof B.tipsType === "function" && B.tipsType(g)
                                        }
                                    }
                                }
                            } else {}
                        } else {
                            s.push({
                                pt1: i[h - 1],
                                pt2: i[h],
                                color: u,
                                region: i[h].region
                            })
                        }
                    }
                } else {
                    if (o == i[h - 1].region) {
                        var k = M(n, i[h - 1]) / y;
                        if (k <= 5) {
                            if (o > i[h].region) {
                                t = "请前往楼梯口, 准备下楼梯";
                                if (g !== "down") {
                                    g = "down";
                                    typeof B.tipsType === "function" && B.tipsType(g)
                                }
                            } else if (o < i[h].region) {
                                t = "请前往楼梯口, 准备上楼梯";
                                if (g !== "up") {
                                    g = "up";
                                    typeof B.tipsType === "function" && B.tipsType(g)
                                }
                            }
                        }
                    }
                }
            }
            if (t.length === 0) {
                var C = parseInt(c);
                var T = parseInt(c / 42);
                var R = parseInt(r);
                t = "剩余" + C + "米，全程" + R + "米";
                if (g !== "straight") {
                    g = "straight";
                    typeof B.tipsType === "function" && B.tipsType(g)
                }
            }
            if (t.length > 0) {
                typeof B.tips === "function" && B.tips(t)
            }
            var y = p.map[1].ratio;
            var F = M(a, i[v - 1]) / y;
            if (a.region === i[v - 1].region && F < 15) {
                typeof B.closeEnd === "function" && B.closeEnd(F)
            }
            if (f) {
                typeof B.passLength === "function" && B.passLength(r - c)
            }
            return s
        };
        var S = function (e) {
            var t = $.extend(true, {}, e);
            var i = {
                d2: false,
                d25: false
            };
            var r = p.map[t.pos.region].ratio;
            t.pos.x = e.pos.x * r;
            t.pos.y = e.pos.y * r;
            if (t.drawMode == undefined) {
                t.drawMode = 0
            }
            if (t.scale == undefined) {
                t.scale = 1
            }
            if (t.alpha == undefined) {
                t.alpha = 1
            }
            if (t.font == undefined) {
                t.font = "serif"
            }
            if (t.fontSize == undefined) {
                t.fontSize = 20
            }
            if (t.name == undefined) {
                t.name = ""
            }
            if (t.drawMode == 0 || t.drawMode == 1) {
                i.d2 = D2DLocView.addPoi(t)
            }
            if (t.drawMode == 0 || t.drawMode == 2) {
                var n = new Image;
                n.src = t.imgSrc;
                n.onload = function () {
                    i.d25 = D25DLocView.addPoi({
                        id: t.id,
                        pos: {
                            x: t.pos.x,
                            y: t.pos.y,
                            region: t.pos.region
                        },
                        width: t.width,
                        height: t.height,
                        img: n,
                        name: t.name,
                        fontSize: t.fontSize,
                        font: t.font,
                        alpha: t.alpha,
                        scale: t.scale,
                        isMoi: t.isMoi
                    })
                }
            }
            return i
        };
        var V = function (e) {
            D2DLocView.removePoi(e);
            D25DLocView.removePoi(e)
        };
        var A = function (e) {
            var t = $.extend(true, {}, e);
            if (e.pos) {
                var i = e.pos.region;
                if (i !== null && i >= 0) {
                    if (t.pos !== undefined) {
                        var r = p.map[e.pos.region].ratio;
                        t.pos.x = t.pos.x * r;
                        t.pos.y = t.pos.y * r
                    }
                } else {
                    t.pos.region = 0;
                    t.alpha = 0;
                    t.display = "none"
                }
            }
            D2DLocView.refreshPoi(t);
            D25DLocView.refreshPoi(t)
        };
        var k = function (e) {
            if (e === f) {
                return
            }
            f = e;
            $("#loc_d2-container").css("display", f === 0 ? "block" : "none");
            $("#loc_d25-container").css("display", f === 1 ? "block" : "none");
            $("#loc_stair-container").css("display", f === 2 ? "-webkit-box" : "none");
            D25DLocView.setContainerVislble(f === 1);
            D2DLocView.setContainerVislble(f === 0);
            if (e == 2) {} else {
                c = e
            }
        };
        this.init = function () {
            P();
            L();
            k(0)
        };
        this.setRenderMode = function (e) {
            if (e) {
                D25DLocView.setContainerVislble(f === 1);
                D2DLocView.setContainerVislble(f === 0)
            } else {
                D25DLocView.setContainerVislble(false);
                D2DLocView.setContainerVislble(false)
            }
        };
        this.setMyInfo = function (e) {
            x = e;
            if (x.imgSrc != undefined) {
                D2DLocView.configLocPattern({
                    wxImg: {
                        imgSrc: x.imgSrc,
                        width: 30,
                        height: 30
                    },
                    wxFrame: {
                        imgSrc: "../img/headframe.png",
                        width: 48,
                        height: 48
                    },
                    locImg: {
                        imgSrc: "../img/bigloc.png",
                        width: 30,
                        height: 30
                    },
                    locFrame: {
                        imgSrc: "../img/compass.png",
                        width: 64,
                        height: 64
                    }
                });
                D25DLocView.updateLocationImage(x.imgSrc);
                D2DLocView.setLocationPattern("compass")
            }
        };
        this.getMyInfo = function () {
            return x
        };
        this.setLocationVisible = function (e) {
            if (e !== y) {
                y = e;
                D2DLocView.setLocationPattern(e);
                D25DLocView.setPositionVisible(e)
            }
        };
        this.getLocationVisible = function () {
            return y
        };
        this.setHeadPattern = function (e) {
            D2DLocView.setLocationPattern(e)
        };
        this.addPoi = function (e) {
            return S(e)
        };
        this.removePoi = function (e) {
            V(e)
        };
        this.refreshPoi = function (e) {
            A(e)
        };
        this.removePoiByArray = function (e) {
            for (var t in e) {
                var i = e[t];
                D2DLocView.removePoi(i)
            }
            D25DLocView.removePoiByArray(e)
        };
        this.addMoi = function (e) {
            if (e.imgSrc == undefined) {
                e.imgSrc = "../img/userhead.png" + u.version
            }
            if (e.width == undefined || e.height == undefined) {
                e.width = 30;
                e.height = 30
            }
            e.scale = 1;
            S({
                id: e.id,
                pos: {
                    x: -100,
                    y: -100,
                    region: 0
                },
                frameWidth: 48,
                frameHeigth: 48,
                display: e.display,
                width: e.width,
                height: e.height,
                imgSrc: e.imgSrc,
                name: e.name,
                fontSize: e.fontSize,
                font: e.font,
                alpha: e.alpha,
                scale: e.scale,
                isMoi: true
            });
            l[e.id] = {
                name: e.name,
                imgSrc: e.imgSrc
            }
        };
        this.removeMoi = function (e) {
            if (e == null || e == "" || l[e] == undefined) return;
            V(e);
            delete l[e]
        };
        this.refreshMoi = function (e) {
            A(e)
        };
        this.removeAllMoi = function () {
            for (var e in l) {
                V(e)
            }
            l = []
        };
        this.getMoiObject = function () {
            return l
        };
        var C = function (e) {
            if (e >= 0) {
                D2DLocView.showMap(e);
                o = e;
                switch (e) {
                    case 1:
                        $("#loc_d2-container").css("background-color", "#faf7ee");
                        break;
                    case 0:
                        $("#loc_d2-container").css("background-color", "#2b2f33");
                        break;
                    default:
                        break
                }
            }
        };
        this.showMap = function (e) {
            C(e)
        };
        this.set2DMode = function () {
            if (o != null && o >= 0) {
                D2DLocView.showMap(o)
            }
            k(0)
        };
        this.set25DMode = function () {
            k(1);
            D25DLocView.renderScene()
        };
        this.setPath = function (t) {
            m.points = [];
            m.distance = 0;
            p.roads = [];
            if (t && t.points != undefined) {
                var i = [];
                for (var r = 1; r < t.points.length; r++) {
                    var n = t.points[r - 1].region === t.points[r].region ? t.points[r - 1].region : null;
                    i.push({
                        pt1: t.points[r - 1],
                        pt2: t.points[r],
                        region: n
                    })
                }
                p.roads = i;
                m.points = t.points.map(function (e) {
                    var t = p.map[e.region].ratio;
                    return {
                        x: e.x * t,
                        y: e.y * t,
                        region: e.region
                    }
                });
                m.distance = t.distance
            }
            g = "";
            if (m.distance > 0 && m.points.length > 0) {
                var a = I(m);
                D2DLocView.addPath(e, a);
                if (w === null) {
                    w = setInterval(function () {
                        if (m.points && m.points.length > 1) {
                            if (f == 0) {
                                var t = b(m.points);
                                D2DLocView.updatePathArrow(e, t)
                            }
                        }
                    }, 1e3)
                }
            } else {
                D2DLocView.removeAllPath(e)
            }
            D25DLocView.updatePath(m.points)
        };
        this.updatePath = function () {
            if (f == 0) {
                if (m.points && m.points.length > 1) {
                    var t = I(m);
                    D2DLocView.updatePath(e, t)
                }
            } else if (f == 1) {
                D25DLocView.updatePath(m.points)
            }
        };
        this.showPosition = function (e) {
            if (i) {
                D2DLocView.showCurrentPosition(e);
                D25DLocView.showCurrentPosition(e)
            }
        };
        this.updateLocation = function (e, t) {
            if (f == 0) {
                D2DLocView.updateLocation(e)
            } else if (f == 1) {
                D25DLocView.updateLocation(e, t)
            }
        };
        this.setLayoutMode = function (e) {
            k(e)
        };
        this.refreshLayoutMode = function () {
            k(c)
        };
        this.getLayoutMode = function () {
            return f
        };
        this.setCurrentRegion = function (e) {
            s = e
        };
        this.getCurrentRegion = function () {
            return s
        };
        this.setSelectRegion = function (e) {
            o = e;
            i = false
        };
        this.getSelectRegion = function () {
            return o
        };
        this.setFollow = function (e) {
            i = e;
            if (e) {
                D2DLocView.setRotateMode(false);
                D2DLocView.setMapView({
                    rotation: MAP_DEFAULT_ANGLE || 0
                });
                if (s != null && s >= 0) {
                    C(s);
                    D2DLocView.showCurrentPosition(true);
                    D25DLocView.showCurrentPosition(true)
                }
            }
        };
        this.isFollow = function () {
            return i
        };
        this.showSignalFlash = function (e) {
            $("#loc_signalRec").css("display", e ? "block" : "none")
        };
        this.setPositionCenter = function (e) {
            if (e && e.region !== null) {
                var t = p.map[e.region].ratio;
                var i = {
                    x: e.x * t,
                    y: e.y * t,
                    region: e.region
                };
                C(e.region);
                D2DLocView.setPositionCenter(i, true);
                D25DLocView.setPositionCenter(i, true)
            }
        };
        this.showAps = function (e) {
            if (e) {
                D2DLocView.setAp(p.aps)
            } else {
                D2DLocView.setAp(null)
            }
            r = e
        };
        this.setApColor = function (e) {
            if (r && e.re >= 0) {
                D2DLocView.setApColor(e, "green")
            }
        };
        this.reset2DMap = function () {
            D2DLocView.setMapView({
                rotation: MAP_DEFAULT_ANGLE || 0
            })
        };
        this.updateDirection = function (e) {
            if (f !== 0) {
                return
            }
            v = v + 1;
            if (v < 5) {
                return
            }
            v = 0;
            if (n) {
                i = true;
                var t = 5;
                var r = Math.abs(h - e);
                if (r > t && r < 360 - t) {
                    var a = _.getRealPosPixel();
                    D2DLocView.setMapView({
                        rotation: 360 - e,
                        center: [a.x, a.y]
                    });
                    h = e
                }
            }
            D2DLocView.updateDirection(e)
        };
        this.scaleTo = function (e) {
            if (f == 0) {
                D2DLocView.setScaleRotate({
                    factor: e
                })
            } else if (f == 1) {
                D25DLocView.scaleTo(e, true)
            }
        };
        this.setTouchCallback = function (e) {
            D2DLocView.setTouchCallback(e);
            D25DLocView.setTouchCallback(e)
        };
        this.setScaleCallback = function (e) {
            D2DLocView.setScaleCallback(e)
        };
        this.setLockRotation = function (e) {
            n = e;
            i = e;
            if (e) {
                D2DLocView.setRotateMode(e)
            }
        };
        this.setFitView = function () {
            D2DLocView.setFitView()
        }
    };
    var V = function () {
        var e = [];
        var t = 20;
        var i = 5;
        var r = 1;
        var n = 0;
        var a = 1e7;
        var o = null;
        var s = false;
        this.init = function () {
            e = [];
            for (var r = 0; r < p.obstacle.length; r++) {
                var n = p.map[r];
                var a = p.obstacle[r];
                var o = new EasyStar.js;
                o.setGrid(a);
                o.setAcceptableTiles([0, 1]);
                o.setTileCost(1, t);
                o.setTileCost(0, i);
                o.setIterationsPerCalculation(1e3);
                o.enableDiagonals();
                e[r] = o
            }
        };
        var c = function (t, i, n) {
            var a = p.map[n];
            if (t < 0) {
                t = 0
            } else if (t >= a.w) {
                t = a.w - 1
            }
            if (i < 0) {
                i = 0
            } else if (i >= a.h) {
                i = a.h - 1
            }
            var o = {
                x: t,
                y: i,
                region: n
            };
            var s = e[n];
            if (s.getGrid()[i][t] > r) {
                var c = t,
                    f = t;
                var l = i,
                    u = i;
                var v = s.getGrid();
                var h = v[0].length,
                    g = v.length;
                var d = 0;
                var y = 0;
                while (y < 4) {
                    if (c < h) {
                        if (s.getGrid()[i][c] <= r) {
                            o.x = c;
                            o.y = i;
                            break
                        }
                        c = c + 1;
                        if (c === h) {
                            y = y + 1
                        }
                    }
                    if (l < g) {
                        if (s.getGrid()[l][t] <= r) {
                            o.x = t;
                            o.y = l;
                            break
                        }
                        l = l + 1;
                        if (l === g) {
                            y = y + 1
                        }
                    }
                    if (f >= 0) {
                        if (s.getGrid()[i][f] <= r) {
                            o.x = f;
                            o.y = i;
                            break
                        }
                        f = f - 1;
                        if (f < 0) {
                            y = y + 1
                        }
                    }
                    if (u >= 0) {
                        if (s.getGrid()[u][t] <= r) {
                            o.x = t;
                            o.y = u;
                            break
                        }
                        u = u - 1;
                        if (u < 0) {
                            y = y + 1
                        }
                    }
                }
                if (y === 4) {
                    myAlert("map block error,x:" + t + ",y:" + i)
                }
            }
            return o
        };
        this.findPath = function (t, i, r, n, a, s) {
            if (o == null) {
                o = setInterval(function () {
                    for (var t = 0; t < e.length; t++) {
                        e[t].calculate()
                    }
                }, 10)
            }
            var f = c(t, i, a.region);
            var l = c(r, n, a.region);
            var u = e[a.region];
            var v = u.findPath(f.x, f.y, l.x, l.y, {
                region: a.region,
                rid: a.id
            }, s);
            return {
                id: v,
                status: 1
            }
        };
        this.cancelAllPath = function () {
            for (var t = 0; t < e.length; t++) {
                e[t].cancelAllPath()
            }
            s = false
        };
        this.getNearStair = function (e, t) {
            var i = p.poiList.stair;
            var r = i.length;
            var n = Math.cos(Math.PI / 180 * 90);
            var a = [];
            var o = [];
            var s = Math.sin(Math.PI / 180 * 30);
            var c = 5;
            if (r > 0) {
                var f = Number.POSITIVE_INFINITY;
                var l = Number.POSITIVE_INFINITY;
                for (var u = 0; u < r; u++) {
                    var v = i[u];
                    var h = v.region;
                    if (e.region !== h) {
                        continue
                    }
                    var g = v.name;
                    var d = 0;
                    var y = i[d];
                    for (; d < r; d++) {
                        y = i[d];
                        var x = y.region;
                        var m = y.name;
                        if (g === m && h !== x) {
                            break
                        }
                    }
                    if (d === r) {
                        return
                    }
                    var w = p.map[0].w / 2;
                    if (e.region === 0) {
                        var P = e.x - w;
                        var L = v.x - w;
                        if (P * L < 0) {
                            continue
                        }
                    } else if (t) {
                        if (e.region === 1 && t.region === 0) {
                            var P = t.x - w;
                            var L = v.x - w;
                            if (P * L < 0) {
                                continue
                            }
                        }
                    }
                    var D = e.x - v.x;
                    var M = e.y - v.y;
                    var b = D * D + M * M;
                    if (b < f) {
                        a[h] = {
                            x: parseInt(v.x),
                            y: parseInt(v.y)
                        };
                        a[x] = {
                            x: parseInt(y.x),
                            y: parseInt(y.y)
                        };
                        f = b
                    }
                    if (t) {
                        var I = b;
                        var S = Math.sqrt(I);
                        var V = e.x - t.x;
                        var A = e.y - t.y;
                        var k = V * V + A * A;
                        var C = Math.sqrt(k);
                        var T = v.x - t.x;
                        var R = v.y - t.y;
                        var F = T * T + R * R;
                        var j = Math.sqrt(F);
                        var O = (I + k - F) / (2 * S * C);
                        var _ = (I + F - k) / (2 * S * j);
                        if (O > n && _ < 0) {
                            if (b < l) {
                                o[h] = {
                                    x: parseInt(v.x),
                                    y: parseInt(v.y),
                                    name: g
                                };
                                o[x] = {
                                    x: parseInt(y.x),
                                    y: parseInt(y.y)
                                };
                                l = b
                            }
                        }
                    }
                }
                if (f < c * c) {
                    return a
                } else if (o.length > 0) {
                    return o
                } else {
                    return a
                }
            } else {
                return null
            }
        };
        this.getNearStair2 = function (e) {
            var t = p.poiList.stair2;
            var i = t.length;
            var r = [];
            if (i > 0) {
                var n = 2e6;
                for (var a = 0; a < i; a++) {
                    var o = t[a];
                    var s = o.region;
                    if (e.region !== s) {
                        continue
                    }
                    var c = e.x - o.x;
                    var f = e.y - o.y;
                    var l = c * c + f * f;
                    if (l < n) {
                        var u = o.p;
                        for (var v = 0; v < i; v++) {
                            var h = t[v];
                            var g = h.region;
                            if (u === h.id) {
                                r[s] = {
                                    x: parseInt(o.x),
                                    y: parseInt(o.y)
                                };
                                r[g] = {
                                    x: parseInt(h.x),
                                    y: parseInt(h.y)
                                };
                                n = l;
                                break
                            }
                        }
                    }
                }
                return r
            } else {
                return null
            }
        };
        this.compressPath = function (e, t) {
            if (e.length < 3) {
                return e.map(function (e) {
                    return {
                        x: e.x,
                        y: e.y,
                        region: t
                    }
                })
            }
            var i = [],
                r = e[0].x,
                n = e[0].y,
                a = e[1].x,
                o = e[1].y,
                s = a - r,
                c = o - n,
                f, l, u, v, p, h;
            p = Math.sqrt(s * s + c * c);
            s /= p;
            c /= p;
            i.push({
                x: r,
                y: n,
                region: t
            });
            for (h = 2; h < e.length; h++) {
                f = a;
                l = o;
                u = s;
                v = c;
                a = e[h].x;
                o = e[h].y;
                s = a - f;
                c = o - l;
                p = Math.sqrt(s * s + c * c);
                s /= p;
                c /= p;
                if (s !== u || c !== v) {
                    i.push({
                        x: f,
                        y: l,
                        region: t
                    })
                }
            }
            i.push({
                x: a,
                y: o,
                region: t
            });
            return i
        };
        this.setPathStatus = function (e) {
            s = e
        };
        this.getPathStatus = function () {
            return s
        };
        this.getLength = function (e) {
            var t, i = 0,
                r, n, a, o;
            for (t = 1; t < e.length; ++t) {
                r = e[t - 1];
                n = e[t];
                a = r.x - n.x;
                o = r.y - n.y;
                i += Math.sqrt(a * a + o * o)
            }
            return i
        }
    };
    var A = [];
    var k = function (e, t) {
        var i = I.getMyInfo().openId;
        var r = e + t;
        var n = _.getPosMeter();
        var a = I.getMoiObject();
        var o = n.region === null ? "" : n.region;
        var s = n.direction >= 0 ? parseInt(n.direction) : "";
        if (I.getLocationVisible() !== "visible") {
            o = ""
        }
        var c = HOST + ":" + PORT + "/user-location/refresh?userId=" + i + "&region=" + o + "&x=" + n.x + "&y=" + n.y + "&orientation=" + s + "&shareId=" + r;
        dlAjax({
            url: c,
            method: "POST"
        }).then(function (e) {
            var t = e.data;
            var r = t.success;
            if (r === true) {
                var n = t.data;
                var o = n.length;
                var s = [];
                I.setRenderMode(false);
                var c = $.extend(true, {}, a);
                for (var f = 0; f < o; f++) {
                    var l = n[f];
                    if (l.userId === i) {
                        continue
                    }
                    if (c[l.userId] !== undefined) {
                        delete c[l.userId]
                    }
                    var u = l.headImgUrl;
                    var v = "../img/userhead.png";
                    if (u && u.length > 5) {
                        v = u.substr(0, u.lastIndexOf("/") + 1) + "64"
                    }
                    var p = {
                        x: l.x,
                        y: l.y,
                        region: l.region,
                        orientation: (l.orientation + 180) % 360
                    };
                    var h = {
                        id: l.userId,
                        imgSrc: v,
                        name: l.nickName,
                        pos: p,
                        alpha: 1,
                        display: "block"
                    };
                    if (p.region === null || p.region < 0) {
                        h.alpha = 0;
                        h.display = "none";
                        h.pos.region = null
                    }
                    if (!(h.id in a)) {
                        I.addMoi(h)
                    } else {
                        I.refreshMoi(h)
                    }
                    s.push({
                        id: h.id,
                        name: h.name,
                        imgSrc: h.imgSrc,
                        pos: p
                    })
                }
                for (var g in c) {
                    var d = {
                        id: g,
                        alpha: 0,
                        display: "none"
                    };
                    I.refreshMoi(d)
                }
                I.setRenderMode(true);
                typeof N === "function" && N(s)
            }
        }, R)
    };
    var C;
    var T = function (e, t, i) {
        if (e) {
            if (C != null) {
                I.removeAllMoi();
                clearInterval(C);
                C = null
            }
            C = setInterval(function () {
                k(t, i)
            }, 2e3)
        } else {
            if (C) {
                clearInterval(C);
                C = null
            }
        }
    };
    var R = function (e) {};
    var F = function (e) {
        myAlert(e.message)
    };
    var j = function (e) {
        return dlAjax({
            url: HOST + ":" + PORT + "/location/getConfig?appCode=" + u.appCode
        }).then(function (t) {
            var i = t.data;
            if (!i.success) {
                return new Promise(function (e, t) {
                    myAlert("config ajax fail");
                    t()
                })
            }
            v.wxJsTicket = i.data.wxJsTicket;
            v.wxAppId = i.data.wxAppId;
            r = i.data.uploadRawData || false;
            var n = new Promise(function (t, i) {
                $(e.element).load("../front/template.html" + u.version, function (e, r, n) {
                    if (n.status == 200) {
                        t()
                    } else {
                        myAlert("template loading fail,err:" + n.status);
                        i()
                    }
                })
            });
            var a = dlAjax({
                url: "../static/mapinfo.json" + u.version
            }).then(function (e) {
                var t = e.data;
                p.mapInfo = t
            }, F);
            typeof c.progressCallback === "function" && c.progressCallback(1);
            return Promise.all([a, n])
        }, F)
    };
    var O = function () {
        return new Promise(function (e, t) {
            var i = parseInt((new Date).getTime() / 1e3);
            var r = "Wm3WZYTPz0wzccnW";
            var n = "jsapi_ticket=" + v.wxJsTicket + "&noncestr=" + r + "&timestamp=" + i + "&url=" + location.href.split("#")[0];
            var a = hex_sha1(n);
            if (h()) {
                wx.config({
                    debug: false,
                    appId: v.wxAppId,
                    timestamp: i,
                    nonceStr: r,
                    signature: a,
                    jsApiList: ["checkJsApi", "startSearchBeacons", "stopSearchBeacons", "onSearchBeacons", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "hideOptionMenu", "showOptionMenu", "closeWindow", "openLocation", "getLocation"]
                });
                wx.ready(function () {
                    v.wxReady = true;
                    typeof c.progressCallback === "function" && c.progressCallback(2);
                    e()
                });
                wx.error(function (e) {
                    myAlert("ohh,config fail!");
                    t(e)
                })
            } else {
                e()
            }
        })
    };
    var _;
    var E;
    var N;
    var B;
    var q = function (e, t, i, r) {
        if (e) {
            if (t != undefined & t.length > 0) {
                T(true, t, i);
                I.setHeadPattern("head")
            }
        } else {
            I.setHeadPattern("compass");
            T(false);
            I.removeAllMoi()
        }
        N = r
    };
    var G = function (e) {
        c = e;
        j(e).then(function () {
            return O()
        }, function (t) {
            typeof e.fail === "function" && e.fail();
            typeof e.complete === "function" && e.complete()
        }).then(function () {
            var e = [];
            var t = p.mapInfo.map;
            for (var i = 0; i < t.length; i++) {
                var r = dlAjax({
                    url: t[i].file,
                    param: t[i]
                }).then(function (e) {
                    var t = D2DLocView.addMap(e.data, e.param);
                    p.map[t.floor] = t
                });
                e.push(r)
            }
            var n = p.mapInfo.ap;
            var a = dlAjax({
                url: n
            }).then(function (e) {
                var t = e.data;
                p.aps = t
            });
            e.push(a);
            for (var o = 0; o < t.length; o++) {
                var s = dlAjax({
                    url: t[o].obstacleFile,
                    param: t[o]
                }).then(function (e) {
                    var t = e.data;
                    var i = t.region;
                    var r = t.obstacle;
                    p.obstacle[i] = r
                });
                e.push(s)
            }
            typeof c.progressCallback === "function" && c.progressCallback(3);
            return Promise.all(e)
        }).then(function () {
            typeof c.progressCallback === "function" && c.progressCallback(4);
            if (!I) {
                I = new S;
                I.init()
            }
            if (!_) {
                _ = new b(I)
            }
            if (!W) {
                W = new V;
                W.init()
            }
            var t = I.getSelectRegion();
            I.showMap(t);
            typeof e.success === "function" && e.success();
            typeof e.complete === "function" && e.complete()
        }, function (t) {
            typeof e.fail === "function" && e.fail();
            typeof e.complete === "function" && e.complete()
        })
    };
    var z = function (e) {
        if (!v.wxReady || !_) {
            myAlert(v.wxReady + " ");
            return
        }
        _.startLocate(e)
    };
    var H = function (e) {
        if (!_) {
            return
        }
        _.stopLocate(e)
    };
    var J = function (e) {
        E = e
    };
    var U = function (e) {
        B = e
    };
    var W = null;
    var Y, Q;
    var X = [];
    var Z = 0;
    var K = function (e, t, i) {
        if (W.getPathStatus()) {
            console.log("err:path is planning");
            return 0
        }
        W.setPathStatus(true);
        var r = 0;
        var n = [];
        X = [];
        Z = 0;
        var a = null;
        var o = (new Date).getTime();
        Y = null;
        Q = null;
        if (!W) {
            return {
                success: false,
                points: null,
                distance: null,
                errMsg: "pathNavigation is null"
            }
        }
        var s = p.map;
        var c = {
            x: parseInt(e.x),
            y: parseInt(e.y),
            region: e.region
        };
        var f = {
            x: parseInt(t.x),
            y: parseInt(t.y),
            region: t.region
        };

        function l(a, o) {
            console.log(a, o);
            var s = {
                rid: o.rid,
                path: []
            };
            if (a && a.length > 0) {
                var c = W.compressPath(a, o.region);
                r += W.getLength(c);
                s.path = c
            }
            X.push(s);
            if (X.length == Z) {
                var f = X.sort(function (e, t) {
                    return e.rid - t.rid
                });
                for (var l = 0; l < Z; l++) {
                    n = n.concat(f[l].path)
                }
                console.log(n);
                W.setPathStatus(false);
                Y = e;
                Q = t;
                typeof B.totalLength === "function" && B.totalLength(r);
                typeof B.passLength === "function" && B.passLength(0);
                typeof i === "function" && i({
                    success: true,
                    points: n,
                    distance: r,
                    errMsg: null
                })
            }
        }
        if (c.region == f.region) {
            var u = p.map[0].w / 2;
            var v = c.x - u;
            var h = f.x - u;
            if (c.region === 0 && v * h < 0) {
                var g = c.region + 1;
                var d = c.region;
                var y = W.getNearStair(c, f);
                if (!y) {
                    return {
                        success: false,
                        points: null,
                        distance: null,
                        errMsg: "cannot find stairPos1 error"
                    }
                }
                a = W.findPath(c.x, c.y, y[d].x, y[d].y, {
                    region: d,
                    id: Z
                }, l);
                Z++;
                var g = c.region + 1;
                var x = W.getNearStair(f, c);
                if (!x) {
                    return {
                        success: false,
                        points: null,
                        distance: null,
                        errMsg: "cannot find stairPos2 error"
                    }
                }
                a = W.findPath(y[g].x, y[g].y, x[g].x, x[g].y, {
                    region: g,
                    id: Z
                }, l);
                Z++;
                a = W.findPath(x[d].x, x[d].y, f.x, f.y, {
                    region: d,
                    id: Z
                }, l);
                Z++
            } else {
                a = W.findPath(c.x, c.y, f.x, f.y, {
                    region: c.region,
                    id: Z
                }, l);
                Z++
            }
        } else {
            var m = W.getNearStair(c, f);
            if (!m) {
                return {
                    success: false,
                    points: null,
                    distance: null,
                    errMsg: "cannot find stair error"
                }
            }
            a = W.findPath(c.x, c.y, m[c.region].x, m[c.region].y, {
                region: c.region,
                id: Z
            }, l);
            Z++;
            a = W.findPath(m[f.region].x, m[f.region].y, f.x, f.y, {
                region: f.region,
                id: Z
            }, l);
            Z++
        }
    };
    var ee = function (e, t, i) {
        if (W.getPathStatus()) {
            console.log("err:path is planning");
            return 0
        }
        W.setPathStatus(true);
        var r = 0;
        var n = [];
        X = [];
        Z = 0;
        var a = null;
        var o = (new Date).getTime();
        Y = null;
        Q = null;
        if (!W) {
            return {
                success: false,
                points: null,
                distance: null,
                errMsg: "pathNavigation is null"
            }
        }
        var s = p.map;
        var c = {
            x: parseInt(e.x),
            y: parseInt(e.y),
            region: e.region
        };
        var f = {
            x: parseInt(t.x),
            y: parseInt(t.y),
            region: t.region
        };

        function l(a, o) {
            console.log(a, o);
            var s = {
                rid: o.rid,
                path: []
            };
            if (a && a.length > 0) {
                var c = W.compressPath(a, o.region);
                r += W.getLength(c);
                s.path = c
            }
            X.push(s);
            if (X.length == Z) {
                var f = X.sort(function (e, t) {
                    return e.rid - t.rid
                });
                for (var l = 0; l < Z; l++) {
                    n = n.concat(f[l].path)
                }
                console.log(n);
                W.setPathStatus(false);
                Y = e;
                Q = t;
                typeof B.totalLength === "function" && B.totalLength(r);
                typeof B.passLength === "function" && B.passLength(0);
                typeof i === "function" && i({
                    success: true,
                    points: n,
                    distance: r,
                    errMsg: null
                })
            }
        }
        var u = c;
        var v = W.getNearStair2(u);
        if (!v) {
            return {
                success: false,
                points: null,
                distance: null,
                errMsg: "cannot find stair error"
            }
        }
        var h = [{
            x: c.x,
            y: c.y,
            region: 1
        },
            {
                x: v[1].x,
                y: v[1].y,
                region: 1
            }];
        var g = (c.x - v[1].x) * (c.x - v[1].x) + (c.y - v[1].y) * (c.y - v[1].y);
        var d = Math.round(Math.sqrt(g));
        r += d;
        var y = app.startPosition;
        var x = y.p;
        var m = D2DLocView.getMapPoiById(x);
        var w = [{
            x: m.mx,
            y: m.my,
            region: 0
        },
            {
                x: v[0].x,
                y: v[0].y,
                region: 0
            }];
        g = (m.mx - v[0].x) * (m.mx - v[0].x) + (m.my - v[0].y) * (m.my - v[0].y);
        d = Math.round(Math.sqrt(g));
        r += d;
        n = n.concat(h);
        n = n.concat(w);
        if (f.region == 0) {
            a = W.findPath(v[f.region].x, v[f.region].y, f.x, f.y, {
                region: f.region,
                id: Z
            }, l);
            Z++
        } else {
            var P = W.getNearStair(u);
            a = W.findPath(v[0].x, v[0].y, P[0].x, P[0].y, {
                region: 0,
                id: Z
            }, l);
            Z++;
            a = W.findPath(P[1].x, P[1].y, f.x, f.y, {
                region: f.region,
                id: Z
            }, l);
            Z++
        }
    };

    var ne = function (e, t) {
        te(e, Q, t)
    };
    var ae = function () {
        return p.map
    };
    var oe = function (e) {
        I && I.addPoi(e)
    };
    var se = function (e) {
        I && I.removePoi(e)
    };
    var ce = function (e) {
        I && I.refreshPoi(e)
    };
    var fe = function (e) {
        I && I.setMyInfo(e)
    };
    var le = function (e) {
        I && I.addMoi(e)
    };
    var ue = function (e) {
        I && I.removeMoi(e)
    };
    var ve = function () {
        I && I.removeAllMoi()
    };
    var pe = function () {
        I && I.set2DMode()
    };
    var he = function () {
        I && I.set25DMode()
    };
    var ge = function (e) {
        I && I.setFollow(e)
    };
    var de = function (e) {
        I && I.showMap(e)
    };
    var ye = function () {
        I && I.reset2DMap()
    };
    var xe = function () {
        I && I.removePoiByArray()
    };
    var me = function (e) {
        I && I.setTouchCallback(e)
    };
    var we = function (e) {
        I && I.setScaleCallback(e)
    };
    var Pe = function (e) {
        I && I.scaleTo(e)
    };
    var Le = function (e) {
        I && I.setPositionCenter(e)
    };
    var De = function (e) {
        I && I.setLockRotation(e)
    };

    var Ie = function (e) {
        I && I.setPath(e)
    };
    var Se = function (e) {
        I && I.showAps(e)
    };
    var Ve = function (e) {
        _ && _.setRegionCallback(e)
    };

    var Ce = function (e, t) {
        if (!(t instanceof Array)) {
            return null
        }
        var i = [];

        function r(t, i, n) {
            var a = t.length;
            if (0 == a) return 0;
            var o = Math.ceil(a / 2);
            if (o > a - 1) o = a - 1;
            var s = t[o].distance;
            if (!e) {
                s = t[o].region
            }
            if (i == s) {
                return o
            }
            if (i > s) {
                o++;
                return o + r(t.slice(o), i, n)
            }
            if (i < s) {
                return r(t.slice(0, o), i, n)
            }
        }
        function n(e, t, i) {
            var r = e.slice(0, t);
            r.push(i);
            return r.concat(e.slice(t))
        }
        var a = t.length;
        for (var o = 0; o < a; o++) {
            if (!e) {
                var s = {
                    id: t[o].id,
                    name: t[o].name,
                    x: t[o].x,
                    y: t[o].y,
                    region: t[o].region,
                    event: "searches",
                    type: "indoor"
                };
                var c = r(i, s.region, e);
                i = n(i, c, s)
            } else {
                var f = t[o].x - e.x;
                var l = t[o].y - e.y;
                var u = parseInt(Math.sqrt(f * f + l * l));
                var s = {
                    id: t[o].id,
                    name: t[o].name,
                    x: t[o].x,
                    y: t[o].y,
                    region: t[o].region,
                    distance: u,
                    event: "searches",
                    type: "indoor"
                };
                var c = r(i, u, e);
                i = n(i, c, s)
            }
        }
        if (!e) {
            i = i.reverse()
        }
        return i
    };
    var Te = function (e) {
        l = e
    };

    var Fe = function (e, t) {
        return _.sendData(e, t)
    };
    dLoc.config = G;
    dLoc.startLocate = z;
    dLoc.stopLocate = H;
    dLoc.onLocationUpdate = J;
    dLoc.pathCallback = U;
    dLoc.enableShareMode = q;
    dLoc.planPath = K;
    dLoc.startNavigation = te;
    dLoc.startNavigation2 = ie;
    dLoc.cancelNavigation = re;
    dLoc.refreshNavigation = ne;
    dLoc.getPoiList = Ae;
    dLoc.getMap = ae;
    dLoc.showAps = Se;
    dLoc.addPoi = oe;
    dLoc.removePoi = se;
    dLoc.refreshPoi = ce;
    dLoc.setMyInfo = fe;
    dLoc.addMoi = le;
    dLoc.removeMoi = ue;
    dLoc.removeAllMoi = ve;
    dLoc.set2DMode = pe;
    dLoc.set25DMode = he;
    dLoc.setFollow = ge;
    dLoc.showMap = de;
    dLoc.reset2DMap = ye;
    dLoc.removePoiByArray = xe;
    dLoc.touchCallback = me;
    dLoc.scaleCallback = we;
    dLoc.scale = Pe;
    dLoc.setPositionCenter = Le;
    dLoc.setLockRotation = De;
    dLoc.setMapViewCallback = Me;
    dLoc.setFitView = be;
    dLoc.setPath = Ie;
    dLoc.regionChange = Ve;
    dLoc.calPoiDistance = Ce;
    dLoc.enablePoiFilter = ke;
    dLoc.simulatePos = Te;
    dLoc.initPoiData = Re;
    dLoc.sendData = Fe
})();