  function delvePlayerCallback(playerId, eventName, data) {		
    var id = "limelight_player_156792";
    if (eventName == 'onPlayerLoad' && (DelvePlayer.getPlayers() == null || DelvePlayer.getPlayers().length == 0)) {
      DelvePlayer.registerPlayer(id);
    }
    
    switch (eventName) {
      case 'onPlayerLoad':
        doOnPlayerLoad();
        break;
		
      case 'onChannelLoad':
        doOnChannelLoad(data);
        break;

      case 'onMediaLoad':
        doOnMediaLoad(data);
        break;

      case 'onPlayStateChanged':
        doOnPlayStateChanged(data);
        break;

      case 'onPlayheadUpdate':
        doOnPlayheadUpdate(data);
        break; 
    }
  }

  function doOnPlayerLoad() {
    document.getElementById('state').innerHTML = "paused"
  }
  
  function doOnChannelLoad(e) {
    document.getElementById('channelTitle').innerHTML = e.title;
    document.getElementById('state').innerHTML = "paused"
    
    //create a dynamic playlist of media in the channel
    if (e.mediaList && e.mediaList.length > 0) {
  	
    	var playlistHTML = "";
    	
    	for (var i = 0; i < e.mediaList.length; i++) {
      		var media = e.mediaList[i];
      		if (media) {
      		    
      			playlistHTML += '<div style="float:left; width:220px; margin-left:10px; margin-right:10px; margin-top:20px; margin-bottom:20px">';
      			playlistHTML += '<a href="javascript:onPlaylistItemClick(\'' + media.id + '\');">';
      			playlistHTML += '<img width="200" border="1" src="' + media.thumbnailUrl + '"/>';
      			playlistHTML += '<b>' + media.title + '<b /><br />';
       			playlistHTML += '</a>';
      			playlistHTML += '</div>';
			}
		}
		
        playlistHTML += '<br style="clear:both;" />';
		
        var playlistBox = document.getElementById('playlist-box').innerHTML = playlistHTML;
    } 
  }

  function onPlaylistItemClick(mediaId) {
  
     DelvePlayer.doSetMedia(mediaId, false);
  
  }
  
  function doOnMediaLoad(e) {
    document.getElementById('mediaTitle').innerHTML = e.title;
    document.getElementById('mediaDescription').innerHTML = e.description;
    document.getElementById('totalDuration').innerHTML = e.durationInMilliseconds;
    document.getElementById('URL').innerHTML = e.thumbnailUrl;
    
  }
  
  function doOnPlayStateChanged(e) {
  
    var play_state;
    
    if (e.isBusy) {
        play_state = "buffering";
    } else if (e.isPlaying) {
    	play_state = "playing";
    } else {
    	play_state = "paused";
    }
  
    document.getElementById('state').innerHTML = play_state;
    
  }

  function doOnPlayheadUpdate(e) {
    document.getElementById('timePosition').innerHTML = e.positionInMilliseconds;
  }


"undefined" === typeof LimelightPlayerUtil && ("undefined" === typeof JSON && (this.JSON = {}, function () {
    function y(d) {
        return 10 > d ? "0" + d : d
    }

    function E(d) {
        A.lastIndex = 0;
        return A.test(d) ? '"' + d.replace(A, function (d) {
            var g = F[d];
            return "string" === typeof g ? g : "\\u" + ("0000" + d.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + d + '"'
    }

    function B(d, q) {
        var g, l, s, C, m = p,
            n, c = q[d];
        c && ("object" === typeof c && "function" === typeof c.toJSON) && (c = c.toJSON(d));
        "function" === typeof u && (c = u.call(q, d, c));
        switch (typeof c) {
        case "string":
            return E(c);
        case "number":
            return isFinite(c) ? String(c) : "null";
        case "boolean":
        case "null":
            return String(c);
        case "object":
            if (!c) return "null";
            p += v;
            n = [];
            if ("[object Array]" === Object.prototype.toString.apply(c)) {
                C = c.length;
                for (g = 0; g < C; g += 1) n[g] = B(g, c) || "null";
                s = 0 === n.length ? "[]" : p ? "[\n" + p + n.join(",\n" + p) + "\n" + m + "]" : "[" + n.join(",") + "]";
                p = m;
                return s
            }
            if (u && "object" === typeof u)
                for (C = u.length, g = 0; g < C; g += 1) l = u[g], "string" === typeof l && (s = B(l, c)) && n.push(E(l) + (p ? ": " : ":") + s);
            else
                for (l in c) Object.hasOwnProperty.call(c, l) &&
                    (s = B(l, c)) && n.push(E(l) + (p ? ": " : ":") + s);
            s = 0 === n.length ? "{}" : p ? "{\n" + p + n.join(",\n" + p) + "\n" + m + "}" : "{" + n.join(",") + "}";
            p = m;
            return s
        }
    }
    "function" !== typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + y(this.getUTCMonth() + 1) + "-" + y(this.getUTCDate()) + "T" + y(this.getUTCHours()) + ":" + y(this.getUTCMinutes()) + ":" + y(this.getUTCSeconds()) + "Z" : null
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
        return this.valueOf()
    });
    var D = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        A = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        p, v, F = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, u;
    "function" !== typeof JSON.stringify && (JSON.stringify = function (d, q, g) {
        var l;
        v = p = "";
        if ("number" === typeof g)
            for (l = 0; l < g; l += 1) v += " ";
        else "string" === typeof g && (v = g); if ((u = q) && "function" !==
            typeof q && ("object" !== typeof q || "number" !== typeof q.length)) throw Error("JSON.stringify");
        return B("", {
            "": d
        })
    });
    "function" !== typeof JSON.parse && (JSON.parse = function (d, p) {
        function g(d, l) {
            var m, n, c = d[l];
            if (c && "object" === typeof c)
                for (m in c) Object.hasOwnProperty.call(c, m) && (n = g(c, m), void 0 !== n ? c[m] = n : delete c[m]);
            return p.call(d, l, c)
        }
        var l;
        d = String(d);
        D.lastIndex = 0;
        D.test(d) && (d = d.replace(D, function (d) {
            return "\\u" + ("0000" + d.charCodeAt(0).toString(16)).slice(-4)
        }));
        if (/^[\],:{}\s]*$/.test(d.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
            "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return l = eval("(" + d + ")"), "function" === typeof p ? g({
            "": l
        }, "") : l;
        throw new SyntaxError("JSON.parse");
    })
}()), LimelightPlayerUtil = function () {
    function y(a, f, k, r, b) {
        c(a, function (e) {
            var G = {
                service: {}
            };
            a.playlistService && (G.service.playlistService = a.playlistService);
            a.metricsCollectionService && (G.service.metricsCollectionService = a.metricsCollectionService);
            a.cuePointService && (G.service.cuePointService =
                a.cuePointService);
            return DelvePlayer = e = e.createPlayer(f, k, r, b, G)
        })
    }

    function E(a, f, k, r) {
        k.postStartSessionEvent();
        v(a, f, C, k, function (a, e) {
            var f = e.mediaList[0],
                d = document.createElement("TABLE");
            d.style = "border-style:none";
            var c = d.appendChild(document.createElement("TR")).appendChild(document.createElement("TD")).appendChild(document.createElement("A"));
            c.href = "#";
            c.appendChild(document.createElement("IMG")).src = encodeURI(f.thumbnailImageUrl);
            var h = d.appendChild(document.createElement("TR")).appendChild(document.createElement("TD"));
            h.style = "text-align:center";
            h = h.appendChild(document.createElement("A"));
            h.href = "#";
            h.appendChild(document.createTextNode("Click to play"));
            var t = function () {
                k.postPlayStateEvent(w.PLAY, 0, function () {
                    window.location = f.mobileUrls[0].mobileUrl
                });
                return !1
            };
            c.onclick = t;
            h.onclick = t;
            r(d)
        })
    }

    function B(a, f, k, r, b, e) {
        v(a, r, n.htmlCodec, b, function (a, r) {
            b.postStartSessionEvent();
            var d = r.mediaList[0],
                h = document.createElement("VIDEO");
            h.src = encodeURI(d.mobileUrls[0].mobileUrl);
            h.width = f;
            h.height = k;
            h.poster = encodeURI(d.previewImageUrl);
            h.controls = !0;
            h.addEventListener("click", h.play);
            h.addEventListener("play", function () {
                b.postPlayStateEvent(w.PLAY, Math.round(1E3 * h.currentTime));
                b.startHeartbeat({
                    quality: a,
                    getPosition: function () {
                        return Math.round(1E3 * h.currentTime)
                    },
                    isPlaying: function () {
                        return !h.paused
                    }
                })
            });
            h.addEventListener("pause", function () {
                h.ended || b.postPlayStateEvent(w.PAUSE, Math.round(1E3 * h.currentTime));
                b.stopHeartbeat()
            });
            h.addEventListener("ended", function () {
                b.postEvent(w.MEDIA_COMPLETE);
                b.stopHeartbeat()
            });
            var t = 0;
            h.addEventListener("timeupdate",
                function () {
                    var a = h.currentTime;
                    if (h.seeking && a !== t) {
                        var e = Math.round(1E3 * t),
                            f = Math.round(1E3 * a);
                        e !== f && b.postEvent(w.SEEK, {
                            offsetBefore: e,
                            offsetAfter: f,
                            heatmapDisplayed: !1,
                            spectrumType: "",
                            spectrumColor: 0,
                            relatedConcepts: ""
                        })
                    }
                    t = a
                });
            e(h)
        })
    }

    function D(a) {
        a = a || {};
        a.wmode = a.wmode || "window";
        a.id = a.id || "limelight_player_" + Math.floor(1E9 * Math.random());
        a.resources = a.resources || {};
        a.resources.beaconingService = a.resources.beaconingService || g;
        a.resources.cuePointService = a.resources.cuePointService || q;
        a.resources.metricsCollectionService =
            a.resources.metricsCollectionService || d;
        a.resources.playlistService = a.resources.playlistService || u;
        a.resources.htmlPlayerLocation = a.resources.htmlPlayerLocation || n.loadingProtocol + l;
        a.resources.playerIframeLocation = a.resources.playerIframeLocation || n.loadingProtocol + s;
        return a
    }

    function A(a, f, k, r, b, e, d, c, g) {
        var h = w.create(f.metricsCollectionService, r, g);
        switch (g) {
        case "iframe":
            return L(f, d, b, e, r, h, a);
        case "html":
            return y(f, d, b, e, null !== k ? k : r);
        case "video":
            B(f, b, e, r, h, a);
            break;
        case "link":
            E(f, r, h, a);
            break;
        case "install-flash":
            n.Flash.canUpgrade ? (f = !0 === n.Flash.isActiveX ? "ActiveX" : "PlugIn", document.title = document.title.slice(0, 47) + " - Flash Player Installation", p(a, "http://assets.delvenetworks.com/player/playerProductInstall.swf", "MMredirectURL=" + window.location + "&MMplayerType=" + f + "&MMdoctitle=" + document.title, b, e, d, c)) : a('<table width="' + b + '" height="' + e + '" bgcolor="black" style="background-color:black; margin-left:auto; margin-right:auto"><tr><td align="center" style="text-align:center; vertical-align:middle"><a href="http://www.adobe.com/go/getflash/" style="text-decoration:underline; color:white"><span style="font-size:12px; color:white">You need to have the latest version of Adobe Flash Player to view this content.<br/>Please click here to continue.</span></a></td></tr></table>')
        }
        return null
    }

    function p(a, f, k, r, b, e, d) {
        var c = "",
            g;
        if ("string" === typeof k) c = k;
        else if ("object" === typeof k)
            for (g in k) c += encodeURIComponent(g) + "=" + encodeURIComponent(k[g]) + "&";
        a('<object type="application/x-shockwave-flash" id="' + e + '" name="' + e + '" width="' + r + '" height="' + b + '" data="' + f + '"><param name="movie" value="' + f + '"/><param name="wmode" value="' + d + '"/><param name="allowScriptAccess" value="always"/><param name="allowFullScreen" value="true"/><param name="flashVars" value="' + c + '"/></object>');
        return document.getElementById(e)
    }

    function v(a, f, k, r, b) {
        var e;
        f.mediaId ? e = a.playlistService + "/media/" + f.mediaId + "/getMobilePlaylistByMediaId?platform=" + k : f.channelId ? e = a.playlistService + "/channel/" + f.channelId + "/getFirstAvailableMobilePlaylistByChannelId?platform=" + k : f.channelListId && (e = a.playlistService + "/channel_list/" + f.channelListId + "/getFirstAvailableMobilePlaylistByChannelListId?platform=" + k);
        M(e, function (a) {
            a && a.mediaList && a.mediaList[0] ? (a.id && r.setChannelId(a.id), a.mediaList[0].mediaId && r.setMediaId(a.mediaList[0].mediaId),
                0 < a.mediaList[0].mobileUrls.length ? b(k, a) : showError("Video Not Available For This Device")) : showError("Video Not Available")
        })
    }

    function F(a) {
        function f(a) {
            return ("object" === typeof a || "function" === typeof a) && a.nodeType
        }
        if ("undefined" === typeof a) return function (a) {
            f(a) ? document.body.appendChild(a) : document.write(a)
        };
        "string" === typeof a && (a = document.getElementById(a));
        if (f(a)) {
            if ("OBJECT" === a.nodeName) {
                var k = a.parentNode,
                    r = a.nextSibling,
                    b = !1;
                return function (e) {
                    var d = document.createElement("DIV");
                    f(e) ?
                        d.appendChild(e) : d.innerHTML = e;
                    b || (k.replaceChild(d.firstChild, a), b = !0);
                    for (; d.firstChild;) k.insertBefore(d.firstChild, r)
                }
            }
            return function (e) {
                f(e) ? a.appendChild(e) : a.innerHTML += e
            }
        }
        return null
    }
    var u = "http://production.ps.delve.cust.lldns.net/r/PlaylistService",
        d = "http://mcs.delve.cust.lldns.net/r/MetricsCollectionService",
        q = "http://cps.lvp.llnw.net/r/CuePointService",
        g = "http://production.eqbc.lvp.llnw.net",
        l = "//videoplatform.limelight.com/player/html-player.js",
        s = "//assets.delvenetworks.com/player/resources/iframe.html",
        C = "Mobile3gp",
        m = navigator,
        n = function () {
            var a = m.userAgent.toLowerCase(),
                f = m.platform.toLowerCase(),
                k = /android \d+\x2E\d+/.test(a),
                d = /android [2-9]+\x2E\d+/.test(a),
                b = /blackberry/.test(a);
            /playbook/.test(a);
            var e = /msie/.test(a),
                c = /msie\s\d\d/.test(a),
                g = /iemobile/.test(a),
                n = /ipad/.test(a),
                h = /iphone|ipad|ipod/.test(a),
                t = /silk/.test(a),
                H = /linux/.test(f ? f : a),
                f = /opera mobi|opera tablet/.test(a),
                z = /fennec/.test(a),
                l = /symbian|series60/.test(a),
                p = /nintendo wiiu/.test(a),
                I = /mobile/.test(a) || k,
                b = k || h || t || b ||
                    l || f || z || p || g || I,
                g = [0, 0, 0];
            if (h && (a = a.match(/os (.*) like mac os x/)) && 1 < a.length) {
                var g = [],
                    a = a[1].split("_"),
                    x;
                for (x in a) g.push(parseInt(a[x]));
                for (; 3 > g.length;) g.push(0)
            }
            x = function () {
                var a = document.createElement("VIDEO");
                return a.canPlayType ? a.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"') : ""
            }();
            z = (d || t || h) && !z;
            d = function () {
                var a = document.createElement("VIDEO");
                return a.canPlayType ? a.canPlayType("application/vnd.apple.mpegurl") : ""
            }();
            t = "probably" === d || h ? "HttpLiveStreaming" : "MobileH264";
            a = function () {
                var a = function () {
                    var a = null;
                    if ("undefined" !== typeof m.plugins && "object" == typeof m.plugins["Shockwave Flash"]) {
                        if ((a = m.plugins["Shockwave Flash"].description) && ("undefined" === typeof m.mimeTypes || !m.mimeTypes["application/x-shockwave-flash"] || m.mimeTypes["application/x-shockwave-flash"].enabledPlugin)) return a = a.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), [parseInt(a.replace(/^(.*)\..*$/, "$1"), 10), parseInt(a.replace(/^.*\.(.*)\s.*$/, "$1"), 10), /[a-zA-Z]/.test(a) ? parseInt(a.replace(/^.*[a-zA-Z]+(.*)$/,
                            "$1"), 10) : 0]
                    } else if ("undefined" !== typeof window.ActiveXObject) try {
                        var e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                        if (e && (a = e.GetVariable("$version"))) return a = a.split(" ")[1].split(","), [parseInt(a[0], 10), parseInt(a[1], 10), parseInt(a[2], 10)]
                    } catch (f) {}
                    return [0, 0, 0]
                }();
                return function (e, f, d) {
                    return a[0] > e || a[0] == e && (a[1] > f || a[1] == f && a[2] >= d)
                }
            }();
            e = {
                canUpgrade: !H && a(6, 0, 65),
                H264: a(9, 0, 115),
                hasAdaptiveStreaming: a(10, 0, 0),
                isActiveX: e
            };
            k = e.H264 && !k ? "flash" : b ? "probably" === x || z ? f || h && !n && 5 > g[0] ?
                "video" : "html" : "link" : "install-flash";
            "install-flash" === k && (c && "assets.delvenetworks.com" !== window.location.host) && (k = "iframe");
            return {
                Metrics: {
                    H264: x,
                    HLS: d
                },
                embedMode: k,
                htmlCodec: t,
                Flash: e,
                loadingProtocol: "https:" === document.location.protocol ? "https:" : "http:"
            }
        }(),
        c = function () {
            var a = [];
            return function (f, d) {
                if (void 0 !== LimelightPlayerUtil.Player) d(LimelightPlayerUtil.Player);
                else if (a.push(d), void 0 === LimelightPlayerUtil.playerLoadedCallback) {
                    var c = document.getElementsByTagName("head")[0] || document.documentElement,
                        b = document.createElement("SCRIPT");
                    b.type = "text/javascript";
                    b.src = f.htmlPlayerLocation;
                    b.charset = "utf-8";
                    LimelightPlayerUtil.playerLoadedCallback = function (e) {
                        LimelightPlayerUtil.Player = e;
                        delete LimelightPlayerUtil.playerLoadedCallback;
                        c && c.removeChild(b);
                        a.forEach(function (a) {
                            a(e)
                        });
                        a = []
                    };
                    b.onerror = function () {
                        a.forEach(function (a) {
                            a(null)
                        });
                        a = []
                    };
                    c.insertBefore(b, c.firstChild)
                }
            }
        }(),
        L = function () {
            var a = [];
            return function (f, d, c, b, e, g, n) {
                function l(a) {
                    var e = {}, f;
                    for (f in a) e[f] = "object" === typeof a[f] &&
                        a[f] ? l(a[f]) : a[f];
                    return e
                }
                var h = document.createElement("IFRAME");
                h.id = d;
                h.width = c;
                h.height = b;
                h.src = f.playerIframeLocation;
                h.style.border = "none";
                n(h);
                var t = document.getElementById(d).contentWindow,
                    H = {}, z = {}, p = {}, m = 0,
                    I = {}, x = 0,
                    s = 1,
                    q = null,
                    J = null,
                    K = void 0;
                window.addEventListener("message", function (d) {
                    var b, c = d.data.state;
                    c && (c.channelList && (H = c.channelList), c.channel && (z = c.channel), c.media && (p = c.media), c.index && (m = c.index), c.playState && (I = c.playState), c.position && (x = c.position), c.volume && (s = c.volume),
                        c.quality && (q = c.quality), c.actualQuality && (J = c.actualQuality), c.customEvents && (K = c.customEvents));
                    switch (d.data.type) {
                    case "event":
                        "function" === typeof delvePlayerCallback && delvePlayerCallback(d.data.id, d.data.eventName, d.data.data);
                        break;
                    case "init":
                        t.postMessage({
                            type: "init",
                            embed: "../embed.js",
                            flashVars: e,
                            resourceLocations: f
                        }, "*");
                        break;
                    case "api":
                        b = {};
                        for (var k in d.data.funcs) {
                            var c = d.data.funcs[k],
                                g = function (a) {
                                    return function () {
                                        t.postMessage({
                                                type: "func",
                                                name: a,
                                                args: Array.prototype.slice.call(arguments)
                                            },
                                            "*")
                                    }
                                }(c);
                            b[c] = g
                        }
                        b.registerPlayer = function () {};
                        b.getPlayers = function () {
                            return a
                        };
                        b.doGetActualQuality = function () {
                            return J ? J.name : null
                        };
                        b.doGetQuality = function () {
                            return q ? q.name : null
                        };
                        b.doGetQualityDetails = function () {
                            return l({
                                actual: J,
                                selected: q
                            })
                        };
                        b.doGetCurrentIndex = function () {
                            return m
                        };
                        b.doGetCurrentMedia = function () {
                            return l(p)
                        };
                        b.doGetCurrentChannel = function () {
                            return l(z)
                        };
                        b.doGetCurrentChannelList = function () {
                            return l(H)
                        };
                        b.doGetCurrentPlayState = function () {
                            return l(I)
                        };
                        b.doGetCustomEvents = function () {
                            return l(K)
                        };
                        b.doGetPlayheadPositionInMilliseconds = function () {
                            return x
                        };
                        b.doSetVolume = function () {
                            var a = b.doSetVolume;
                            return function (b) {
                                b || (b = 0);
                                if ("number" === typeof b) return 0 > b && (b = 0), 1 < b && (b = 1), s = b, a(b)
                            }
                        }();
                        b.doGetVolume = function () {
                            return s
                        };
                        delete b.doGetChannels;
                        delete b.doGetChannelMedia;
                        b.getPlayer = function () {
                            return b
                        };
                        b.getPlayerNodeByIdOrName = function (a) {
                            var b = document.getElementById(a);
                            return b && b.doPlay ? b : (a = document.getElementsByName(a)) && null != a.length ? a[0] : null
                        };
                        DelvePlayer = b;
                        for (var r in b) h[r] =
                            b[r];
                        a.push(b)
                    }
                })
            }
        }(),
        w = function () {
            function a(a) {
                var b = document.cookie.indexOf(a + "="),
                    c = b + a.length + 1;
                if (!b && a != document.cookie.substring(0, a.length) || -1 == b) return null;
                a = document.cookie.indexOf(";", c); - 1 == a && (a = document.cookie.length);
                return unescape(document.cookie.substring(c, a))
            }

            function f() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) {
                    var b = 16 * Math.random() | 0;
                    return ("x" == a ? b : b & 3 | 8).toString(16)
                }).toUpperCase()
            }

            function c(a, b) {
                if (void 0 !== a) {
                    var f = !1;
                    return function () {
                        f ||
                            (f = !0, a.apply(b || this, arguments))
                    }
                }
            }
            var d = f(),
                b = {
                    H264: n.Metrics.H264,
                    HLS: n.Metrics.HLS
                }, e = m.userAgent,
                g = m.platform,
                l = function () {
                    var b = a("Limelight_Embed_Code_UserId");
                    return function () {
                        if (!b) {
                            var a = b = f(),
                                c = 365,
                                d = new Date;
                            d.setTime(d.getTime());
                            c && (c *= 864E5);
                            d = new Date(d.getTime() + c);
                            document.cookie = "Limelight_Embed_Code_UserId=" + escape(a) + (c ? ";expires=" + d.toGMTString() : "") + ""
                        }
                        return b
                    }
                }(),
                p = function () {
                    var a = +new Date;
                    return function () {
                        return new Date - a
                    }
                }(),
                h = function () {
                    var a = 0;
                    return function (b, c,
                        d) {
                        var f = "_limelight_embed_ajax_" + a++,
                            e = document.createElement("IFRAME");
                        e.id = f;
                        e.name = f;
                        e.style.cssText = "display:none;width:0px;height:0px;";
                        (document.getElementsByTagName("body")[0] || document.documentElement).appendChild(e);
                        var h = document.createElement("FORM");
                        h.setAttribute("target", f);
                        h.setAttribute("method", "POST");
                        h.setAttribute("action", b);
                        for (field in c) b = document.createElement("INPUT"), b.setAttribute("type", "hidden"), b.setAttribute("name", field), b.setAttribute("value", JSON.stringify(c[field])),
                        h.appendChild(b);
                        e.appendChild(h);
                        e.onload = function () {
                            void 0 !== d && d();
                            setTimeout(function () {
                                e.parentNode.removeChild(e)
                            }, 0)
                        };
                        h.submit()
                    }
                }();
            return {
                HEARTBEAT: "Heartbeat",
                MEDIA_COMPLETE: "MediaComplete",
                PLAY: "Play",
                PAUSE: "Pause",
                SEEK: "Seek",
                START_SESSION: "StartSession",
                create: function (a, f, n) {
                    var m = {}, q = null;
                    b.embedMode = n;
                    var s = {
                        postEvent: function (b, c, e) {
                            var k = {
                                channelListId: m.channelListId || f.channelListId,
                                channelId: m.channelId || f.channelId,
                                mediaId: m.mediaId || f.mediaId,
                                millisecondsElapsed: p()
                            }, g;
                            for (g in k) void 0 ===
                                k[g] && (k[g] = "");
                            for (g in c) k[g] = void 0 === c[g] ? "" : c[g];
                            h(a + "/recordMetricsEvent", {
                                sourceInstanceId: d,
                                source: "Limelight Embed Code",
                                sourceVersion: 1,
                                eventType: b,
                                data: k
                            }, e)
                        },
                        postStartSessionEvent: function () {
                            this.postEvent(w.START_SESSION, {
                                adConfigurationChannelId: f.adConfigurationChannelId,
                                htmlCapabilities: JSON.stringify(b),
                                pageURL: window.location.href,
                                platform: g,
                                playerProviderId: "Delve Networks",
                                userAgent: e,
                                userId: l(),
                                version: "1.5.4"
                            })
                        },
                        postPlayStateEvent: function (a, b, f) {
                            var e = c(f);
                            this.postEvent(a, {
                                positionInMilliseconds: b
                            }, e);
                            void 0 !== f && setTimeout(e, 1E3)
                        },
                        setChannelListId: function (a) {
                            m.channelListId = a
                        },
                        setChannelId: function (a) {
                            m.channelId = a
                        },
                        setMediaId: function (a) {
                            m.mediaId = a
                        },
                        startHeartbeat: function (a) {
                            null !== q && clearInterval(q);
                            q = setInterval(function () {
                                a.isPlaying() && s.postEvent(w.HEARTBEAT, {
                                    droppedFrames: 0,
                                    droppedFramesRatio: "",
                                    selectedMediaQuality: a.quality,
                                    positionInMilliseconds: a.getPosition(),
                                    maxBytesPerSecond: "",
                                    currentBitrate: ""
                                })
                            }, 3E4)
                        },
                        stopHeartbeat: function () {
                            null !== q && clearInterval(q);
                            q = null
                        }
                    };
                    return s
                }
            }
        }(),
        M = function () {
            var a = 0;
            return function (c, d) {
                var g = "_" + a++;
                c += "&jsonp=LimelightPlayerUtil.jsonpCallback." + g;
                var b = document.getElementsByTagName("head")[0] || document.documentElement,
                    e = document.createElement("SCRIPT");
                e.type = "text/javascript";
                e.src = c;
                e.charset = "utf-8";
                LimelightPlayerUtil.jsonpCallback[g] = function (a) {
                    delete LimelightPlayerUtil.jsonpCallback[g];
                    d(a);
                    b && b.removeChild(e)
                };
                e.onerror = function () {
                    d(null)
                };
                b.insertBefore(e, b.firstChild)
            }
        }();
    return {
        jsonpCallback: [],
        initEmbed: function (a,
            c) {
            c = c || {};
            var d = document.getElementById(a);
            if (null === d) return console && (console.error && "function" === typeof console.error) && console.error("No such element: " + a), null;
            var g = d.width,
                b = d.height,
                e = d.firstChild;
            c.id = a;
            for (var l = "", m = {}; null !== e;) {
                if ("PARAM" === e.nodeName) switch (e.name) {
                case "flashVars":
                    for (var l = e.value, m = {}, p = l.split("&"), h = 0; h < p.length; h++) {
                        var q = p[h],
                            s = q.indexOf("="); - 1 === s ? m[decodeURIComponent(q)] = "true" : m[decodeURIComponent(q.substring(0, s))] = decodeURIComponent(q.substring(s + 1))
                    }
                    break;
                case "wmode":
                    c.wmode = e.value
                }
                e = e.nextSibling
            }
            c = D(c);
            e = c.embedMode || n.embedMode;
            return "flash" !== e ? (d = F(d), A(d, c.resources, l, m, g, b, c.id, c.wmode, e)) : d
        },
        embedPlayer: function (a, c, d, g, b) {
            b = F(b);
            g = D(g);
            var e = g.embedMode || n.embedMode;
            return "flash" === e ? p(b, n.loadingProtocol + (n.Flash.hasAdaptiveStreaming ? "//assets.delvenetworks.com/player/fp10loader.swf" : "//assets.delvenetworks.com/player/fp9loader.swf"), a, c, d, g.id, g.wmode) : A(b, g.resources, null, a, c, d, g.id, g.wmode, e)
        }
    }
}());