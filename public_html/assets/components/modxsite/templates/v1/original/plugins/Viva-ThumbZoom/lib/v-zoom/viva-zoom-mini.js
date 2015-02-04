
var vz = { 
    graphicsDir: 'graphics/', 
    restoreCursor: 'zoomout.cur', 
    expandSteps: 10, 
    expandDuration: 250, 
    restoreSteps: 10, 
    restoreDuration: 250, 
    marginLeft: 15, 
    marginRight: 15, 
    marginTop: 15, 
    marginBottom: 15, 
    zIndexCounter: 1001, 
    restoreTitle: 'Click to close image, click and drag to move. Use arrow keys for next and previous.', 
    loadingText: 'Loading...', 
    loadingTitle: 'Click to cancel', 
    loadingOpacity: 0.75, 
    focusTitle: 'Click to bring to front', 
    allowMultipleInstances: true, 
    numberOfImagesToPreload: 5, 
    captionSlideSpeed: 1, 
    padToMinWidth: false, 
    outlineWhileAnimating: 2, 
    outlineStartOffset: 3, 
    fullExpandTitle: 'Expand to actual size', 
    fullExpandPosition: 'bottom right', 
    fullExpandOpacity: 1, 
    showCredits: true, 
    creditsText: 'Городские и общественные бани', 
    creditsHref: 'http://gorodskie-bani.ru/', 
    creditsTitle: 'Городские и общественные бани', 
    enableKeyListener: true, 
    previousText: 'Previous', 
    nextText: 'Next', 
    moveText: 'Move', 
    closeText: 'Close', 
    closeTitle: 'Click to close', 
    resizeTitle: 'Resize', 
    allowWidthReduction: false, 
    allowHeightReduction: true, 
    preserveContent: true, 
    objectLoadTime: 'before', 
    cacheAjax: true, 
    captionId: null, 
    spaceForCaption: 30, 
    slideshowGroup: null, 
    minWidth: 200, 
    minHeight: 200, 
    allowSizeReduction: true, 
    outlineType: 'drop-shadow', 
    wrapperClassName: 'highslide-wrapper', 
    preloadTheseImages: [], 
    continuePreloading: true, 
    expanders: [], 
    overrides: ['allowSizeReduction', 'outlineType', 'outlineWhileAnimating', 'spaceForCaption', 'captionId', 'captionText', 'captionEval', 'contentId', 'width', 'height', 'allowWidthReduction', 'allowHeightReduction', 'preserveContent', 'objectType', 'cacheAjax', 'objectWidth', 'objectHeight', 'objectLoadTime', 'swfObject', 'wrapperClassName', 'minWidth', 'minHeight', 'slideshowGroup', 'easing', 'easingClose', 'fadeInOut'], 
    overlays: [], 
    idCounter: 0, 
    faders: [], 
    pendingOutlines: {}, 
    sleeping: [], 
    preloadTheseAjax: [], 
    cacheBindings: [], 
    cachedGets: {}, 
    clones: {}, 
    ie: (document.all && !window.opera), 
    safari: /Safari/.test(navigator.userAgent), 
    geckoMac: /Macintosh.+rv:1\.[0-8].+Gecko/.test(navigator.userAgent), 
    $: function (a) { 
        return document.getElementById(a) 
    }, 
    push: function (a, b) { 
        a[a.length] = b 
    }, 
    createElement: function (a, b, c, d, e) { 
        var f = document.createElement(a); 
        if (b) vz.setAttribs(f, b); 
        if (e) vz.setStyles(f, { 
            padding: 0, 
            border: 'none', 
            margin: 0 
        }); 
        if (c) vz.setStyles(f, c); 
        if (d) d.appendChild(f); 
        return f 
    }, 
    setAttribs: function (a, b) { 
        for (var x in b) a[x] = b[x] 
    }, 
    setStyles: function (a, b) { 
        for (var x in b) { 
            try { 
                if (vz.ie && x == 'opacity') { 
                    if (b[x] > 0.99) a.style.removeAttribute('filter'); 
                    else a.style.filter = 'alpha(opacity=' + (b[x] * 100) + ')' 
                } else a.style[x] = b[x] 
            } catch (e) {} 
        } 
    }, 
    ieVersion: function () { 
        var a = navigator.appVersion.split("MSIE"); 
        return a[1] ? parseFloat(a[1]) : null 
    }, 
    getPageSize: function () { 
        var a = document.compatMode && document.compatMode != "BackCompat" ? document.documentElement : document.body; 
        var b = vz.ie ? a.clientWidth : (document.documentElement.clientWidth || self.innerWidth), 
            height = vz.ie ? a.clientHeight : self.innerHeight; 
        return { 
            width: b, 
            height: height, 
            scrollLeft: vz.ie ? a.scrollLeft : pageXOffset, 
            scrollTop: vz.ie ? a.scrollTop : pageYOffset 
        } 
    }, 
    position: function (a) { 
        var p = { 
            x: a.offsetLeft, 
            y: a.offsetTop 
        }; 
        while (a.offsetParent) { 
            a = a.offsetParent; 
            p.x += a.offsetLeft; 
            p.y += a.offsetTop; 
            if (a != document.body && a != document.documentElement) { 
                p.x -= a.scrollLeft; 
                p.y -= a.scrollTop 
            } 
        } 
        return p 
    }, 
    expand: function (a, b, c) { 
        if (a.getParams) return b; 
        try { 
            new vz.Expander(a, b, c); 
            return false 
        } catch (e) { 
            return true 
        } 
    }, 
    htmlExpand: function (a, b, c) { 
        if (a.getParams) return b; 
        for (var i = 0; i < vz.sleeping.length; i++) { 
            if (vz.sleeping[i] && vz.sleeping[i].a == a) { 
                vz.sleeping[i].awake(); 
                vz.sleeping[i] = null; 
                return false 
            } 
        } 
        try { 
            vz.hasHtmlexpanders = true; 
            new vz.Expander(a, b, c, 'html'); 
            return false 
        } catch (e) { 
            return true 
        } 
    }, 
    getElementByClass: function (a, b, c) { 
        var d = a.getElementsByTagName(b); 
        for (var i = 0; i < d.length; i++) { 
            if ((new RegExp(c)).test(d[i].className)) { 
                return d[i] 
            } 
        } 
        return null 
    }, 
    getSelfRendered: function () { 
        var s = '<div class="highslide-header"><ul>' + '<li class="highslide-previous"><a onclick="return vz.previous(this)" href="#">' + vz.previousText + '</a></li>' + '<li class="highslide-next"><a onclick="return vz.next(this)" href="#">' + vz.nextText + '</a></li>' + '<li class="highslide-move"><a href="#" onclick="return false">' + vz.moveText + '</a></li>' + '<li class="highslide-close"><a onclick="return vz.close(this)" title="' + vz.closeTitle + '" href="#">' + vz.closeText + '</a></li>' + '</ul></div>' + '<div class="highslide-body"></div>' + '<div class="highslide-footer"><div>' + '<span class="highslide-resize" title="' + vz.resizeTitle + '"><span></span></span>' + '</div></div>'; 
        return vz.createElement('div', { 
            className: 'highslide-html-content', 
            innerHTML: s 
        }) 
    }, 
    getCacheBinding: function (a) { 
        for (var i = 0; i < vz.cacheBindings.length; i++) { 
            if (vz.cacheBindings[i][0] == a) { 
                var c = vz.cacheBindings[i][1]; 
                vz.cacheBindings[i][1] = c.cloneNode(1); 
                return c 
            } 
        } 
        return null 
    }, 
    preloadAjax: function (e) { 
        var b = document.getElementsByTagName('A'); 
        var a, re; 
        for (var i = 0; i < b.length; i++) { 
            a = b[i]; 
            re = vz.isvzAnchor(a); 
            if (re && re[0] == 'vz.htmlExpand' && vz.getParam(a, 'objectType') == 'ajax' && vz.getParam(a, 'cacheAjax')) { 
                vz.push(vz.preloadTheseAjax, a) 
            } 
        } 
        vz.preloadAjaxElement(0) 
    }, 
    preloadAjaxElement: function (i) { 
        if (!vz.preloadTheseAjax[i]) return; 
        var a = vz.preloadTheseAjax[i]; 
        var b = vz.getNode(vz.getParam(a, 'contentId')); 
        if (!b) b = vz.getSelfRendered(); 
        var c = new vz.Ajax(a, b, 1); 
        c.onError = function () {}; 
        c.onLoad = function () { 
            vz.push(vz.cacheBindings, [a, b]); 
            vz.preloadAjaxElement(i + 1) 
        }; 
        c.run() 
    }, 
    focusTopmost: function () { 
        var a = 0, 
            topmostKey = -1; 
        for (var i = 0; i < vz.expanders.length; i++) { 
            if (vz.expanders[i]) { 
                if (vz.expanders[i].wrapper.style.zIndex && vz.expanders[i].wrapper.style.zIndex > a) { 
                    a = vz.expanders[i].wrapper.style.zIndex; 
                    topmostKey = i 
                } 
            } 
        } 
        if (topmostKey == -1) vz.focusKey = -1; 
        else vz.expanders[topmostKey].focus() 
    }, 
    getAdjacentAnchor: function (a, b) { 
        var c = document.getElementsByTagName('A'), 
            vzAr = {}, 
            activeI = -1, 
            j = 0; 
        for (var i = 0; i < c.length; i++) { 
            if (vz.isvzAnchor(c[i]) && ((vz.expanders[a].slideshowGroup == vz.getParam(c[i], 'slideshowGroup')))) { 
                vzAr[j] = c[i]; 
                if (vz.expanders[a] && c[i] == vz.expanders[a].a) { 
                    activeI = j 
                } 
                j++ 
            } 
        } 
        return vzAr[activeI + b] || null 
    }, 
    getParam: function (a, b) { 
        a.getParams = a.onclick; 
        var p = a.getParams ? a.getParams() : null; 
        a.getParams = null; 
        return (p && typeof p[b] != 'undefined') ? p[b] : (typeof vz[b] != 'undefined' ? vz[b] : null) 
    }, 
    getSrc: function (a) { 
        var b = vz.getParam(a, 'src'); 
        if (b) return b; 
        return a.href 
    }, 
    getNode: function (b) { 
        var c = vz.$(b), 
            clone = vz.clones[b], 
            a = {}; 
        if (!c && !clone) return null; 
        if (!clone) { 
            clone = c.cloneNode(true); 
            clone.id = ''; 
            vz.clones[b] = clone; 
            return c 
        } else { 
            return clone.cloneNode(true) 
        } 
    }, 
    purge: function (d) { 
        var a = d.attributes, 
            i, l, n; 
        if (a) { 
            l = a.length; 
            for (var i = 0; i < l; i += 1) { 
                n = a[i].name; 
                if (typeof d[n] === 'function') { 
                    d[n] = null 
                } 
            } 
        } 
        a = d.childNodes; 
        if (a) { 
            l = a.length; 
            for (var i = 0; i < l; i += 1) vz.purge(d.childNodes[i]) 
        } 
    }, 
    discardElement: function (d) { 
        if (vz.ie) vz.purge(d); 
        vz.garbageBin.appendChild(d); 
        vz.garbageBin.innerHTML = '' 
    }, 
    previousOrNext: function (a, b) { 
        var c = vz.last = vz.getExpander(a); 
        try { 
            var d = vz.upcoming = vz.getAdjacentAnchor(c.key, b); 
            d.onclick() 
        } catch (e) {} 
        try { 
            c.close() 
        } catch (e) {} 
        return false 
    }, 
    previous: function (a) { 
        return vz.previousOrNext(a, -1) 
    }, 
    next: function (a) { 
        return vz.previousOrNext(a, 1) 
    }, 
    keyHandler: function (e) { 
        if (!e) e = window.event; 
        if (!e.target) e.target = e.srcElement; 
        if (e.target.form) return true; 
        var a = null; 
        switch (e.keyCode) { 
        case 32: 
        case 34: 
        case 39: 
        case 40: 
            a = 1; 
            break; 
        case 8: 
        case 33: 
        case 37: 
        case 38: 
            a = -1; 
            break; 
        case 27: 
        case 13: 
            a = 0 
        } 
        if (a !== null) { 
            vz.removeEventListener(document, 'keydown', vz.keyHandler); 
            if (!vz.enableKeyListener) return true; 
            if (e.preventDefault) e.preventDefault(); 
            else e.returnValue = false; 
            if (a == 0) { 
                try { 
                    vz.getExpander().close() 
                } catch (e) {} 
                return false 
            } else { 
                return vz.previousOrNext(vz.focusKey, a) 
            } 
        } 
        return true 
    }, 
    registerOverlay: function (a) { 
        vz.push(vz.overlays, a) 
    }, 
    getWrapperKey: function (a) { 
        var b, re = /^highslide-wrapper-([0-9]+)$/; 
        b = a; 
        while (b.parentNode) { 
            if (b.id && re.test(b.id)) return b.id.replace(re, "$1"); 
            b = b.parentNode 
        } 
        b = a; 
        while (b.parentNode) { 
            if (b.tagName && vz.isvzAnchor(b)) { 
                for (var c = 0; c < vz.expanders.length; c++) { 
                    var d = vz.expanders[c]; 
                    if (d && d.a == b) return c 
                } 
            } 
            b = b.parentNode 
        } 
        return null 
    }, 
    getExpander: function (a) { 
        if (typeof a == 'undefined') return vz.expanders[vz.focusKey] || null; 
        if (typeof a == 'number') return vz.expanders[a] || null; 
        if (typeof a == 'string') a = vz.$(a); 
        return vz.expanders[vz.getWrapperKey(a)] || null 
    }, 
    isvzAnchor: function (a) { 
        return (a.onclick && a.onclick.toString().replace(/\s/g, ' ').match(/vz.(htmlE|e)xpand/)) 
    }, 
    reOrder: function () { 
        for (var i = 0; i < vz.expanders.length; i++) if (vz.expanders[i] && vz.expanders[i].isExpanded) vz.focusTopmost() 
    }, 
    mouseClickHandler: function (e) { 
        if (!e) e = window.event; 
        if (e.button > 1) return true; 
        if (!e.target) e.target = e.srcElement; 
        var a = e.target; 
        while (a.parentNode && !(/highslide-(image|move|html|resize)/.test(a.className))) { 
            a = a.parentNode 
        } 
        var b = vz.getExpander(a); 
        if (b && (b.isClosing || !b.isExpanded)) return true; 
        if (b && e.type == 'mousedown') { 
            if (e.target.form) return true; 
            var c = a.className.match(/highslide-(image|move|resize)/); 
            if (c) { 
                vz.dragArgs = { 
                    exp: b, 
                    type: c[1], 
                    left: b.x.min, 
                    width: b.x.span, 
                    top: b.y.min, 
                    height: b.y.span, 
                    clickX: e.clientX, 
                    clickY: e.clientY 
                }; 
                vz.addEventListener(document, 'mousemove', vz.dragHandler); 
                if (e.preventDefault) e.preventDefault(); 
                if (/highslide-(image|html)-blur/.test(b.content.className)) { 
                    b.focus(); 
                    vz.hasFocused = true 
                } 
                return false 
            } else if (/highslide-html/.test(a.className) && vz.focusKey != b.key) { 
                b.focus(); 
                b.redoShowHide() 
            } 
        } else if (e.type == 'mouseup') { 
            vz.removeEventListener(document, 'mousemove', vz.dragHandler); 
            if (vz.dragArgs) { 
                if (vz.dragArgs.type == 'image') vz.dragArgs.exp.content.style.cursor = vz.styleRestoreCursor; 
                var d = vz.dragArgs.hasDragged; 
                if (!d && !vz.hasFocused && !/(move|resize)/.test(vz.dragArgs.type)) { 
                    b.close() 
                } else if (d || (!d && vz.hasHtmlexpanders)) { 
                    vz.dragArgs.exp.redoShowHide() 
                } 
                if (vz.dragArgs.exp.releaseMask) vz.dragArgs.exp.releaseMask.style.display = 'none'; 
                vz.hasFocused = false; 
                vz.dragArgs = null 
            } else if (/highslide-image-blur/.test(a.className)) { 
                a.style.cursor = vz.styleRestoreCursor 
            } 
        } 
        return false 
    }, 
    dragHandler: function (e) { 
        if (!vz.dragArgs) return true; 
        if (!e) e = window.event; 
        var a = vz.dragArgs, 
            exp = a.exp; 
        if (exp.iframe) { 
            if (!exp.releaseMask) exp.releaseMask = vz.createElement('div', null, { 
                position: 'absolute', 
                width: exp.x.span + 'px', 
                height: exp.y.span + 'px', 
                left: 0, 
                top: 0, 
                zIndex: 4, 
                background: (vz.ie ? 'white' : 'none'), 
                opacity: 0.01 
            }, exp.wrapper, true); 
            if (exp.releaseMask.style.display == 'none') exp.releaseMask.style.display = '' 
        } 
        a.dX = e.clientX - a.clickX; 
        a.dY = e.clientY - a.clickY; 
        var b = Math.sqrt(Math.pow(a.dX, 2) + Math.pow(a.dY, 2)); 
        if (!a.hasDragged) a.hasDragged = (a.type != 'image' && b > 0) || (b > (vz.dragSensitivity || 5)); 
        if (a.hasDragged && e.clientX > 5 && e.clientY > 5) { 
            if (a.type == 'resize') exp.resize(a); 
            else exp.move(a) 
        } 
        return false 
    }, 
    wrapperMouseHandler: function (e) { 
        try { 
            if (!e) e = window.event; 
            var a = /mouseover/i.test(e.type); 
            if (!e.target) e.target = e.srcElement; 
            if (vz.ie) e.relatedTarget = a ? e.fromElement : e.toElement; 
            var b = vz.getExpander(e.target); 
            if (!b || !e.relatedTarget || vz.getExpander(e.relatedTarget) == b || vz.dragArgs) return; 
            for (var i = 0; i < b.overlays.length; i++) { 
                var o = vz.$('vzId' + b.overlays[i]); 
                if (o && o.getAttribute('hideOnMouseOut')) { 
                    var c = a ? 0 : o.getAttribute('opacity'), 
                        to = a ? o.getAttribute('opacity') : 0; 
                    vz.fade(o, c, to) 
                } 
            } 
        } catch (e) {} 
    }, 
    addEventListener: function (a, b, c) { 
        try { 
            a.addEventListener(b, c, false) 
        } catch (e) { 
            try { 
                a.detachEvent('on' + b, c); 
                a.attachEvent('on' + b, c) 
            } catch (e) { 
                a['on' + b] = c 
            } 
        } 
    }, 
    removeEventListener: function (a, b, c) { 
        try { 
            a.removeEventListener(b, c, false) 
        } catch (e) { 
            try { 
                a.detachEvent('on' + b, c) 
            } catch (e) { 
                a['on' + b] = null 
            } 
        } 
    }, 
    preloadFullImage: function (i) { 
        if (vz.continuePreloading && vz.preloadTheseImages[i] && vz.preloadTheseImages[i] != 'undefined') { 
            var a = document.createElement('img'); 
            a.onload = function () { 
                a = null; 
                vz.preloadFullImage(i + 1) 
            }; 
            a.src = vz.preloadTheseImages[i] 
        } 
    }, 
    preloadImages: function (b) { 
        if (b && typeof b != 'object') vz.numberOfImagesToPreload = b; 
        var a, re, j = 0; 
        var c = document.getElementsByTagName('A'); 
        for (var i = 0; i < c.length; i++) { 
            a = c[i]; 
            re = vz.isvzAnchor(a); 
            if (re && re[0] == 'vz.expand') { 
                if (j < vz.numberOfImagesToPreload) { 
                    vz.preloadTheseImages[j] = vz.getSrc(a); 
                    j++ 
                } 
            } 
        } 
        new vz.Outline(vz.outlineType, function () { 
            vz.preloadFullImage(0) 
        }); 
        var d = vz.createElement('img', { 
            src: vz.graphicsDir + vz.restoreCursor 
        }) 
    }, 
    genContainer: function () { 
        if (!vz.container) { 
            vz.container = vz.createElement('div', null, { 
                position: 'absolute', 
                left: 0, 
                top: 0, 
                width: '100%', 
                zIndex: vz.zIndexCounter 
            }, document.body, true); 
            vz.loading = vz.createElement('a', { 
                className: 'highslide-loading', 
                title: vz.loadingTitle, 
                innerHTML: vz.loadingText, 
                href: 'javascript:void(0)' 
            }, { 
                position: 'absolute', 
                opacity: vz.loadingOpacity, 
                left: '-9999px', 
                zIndex: 1 
            }, vz.container); 
            vz.garbageBin = vz.createElement('div', null, { 
                display: 'none' 
            }, vz.container); 
            vz.clearing = vz.createElement('div', null, { 
                clear: 'both', 
                paddingTop: '1px' 
            }, null, true); 
            Math.linearTween = function (t, b, c, d) { 
                return c * t / d + b 
            }; 
            Math.easeInQuad = function (t, b, c, d) { 
                return c * (t /= d) * t + b 
            }; 
            vz.ie6SSL = (vz.ie && vz.ieVersion() <= 6 && location.protocol == 'https:') 
        } 
    }, 
    fade: function (a, o, b, c, i, d) { 
        if (typeof i == 'undefined') { 
            if (typeof c != 'number') c = 250; 
            if (c < 25) { 
                vz.setStyles(a, { 
                    opacity: b 
                }); 
                return 
            } 
            i = vz.faders.length; 
            d = b > o ? 1 : -1; 
            var e = (25 / (c - c % 25)) * Math.abs(o - b) 
        } 
        o = parseFloat(o); 
        a.style.visibility = (o <= 0) ? 'hidden' : 'visible'; 
        if (o < 0 || (d == 1 && o > b)) return; 
        if (a.fading && a.fading.i != i) { 
            clearTimeout(vz.faders[a.fading.i]); 
            o = a.fading.o 
        } 
        a.fading = { 
            i: i, 
            o: o, 
            step: (e || a.fading.step) 
        }; 
        a.style.visibility = (o <= 0) ? 'hidden' : 'visible'; 
        vz.setStyles(a, { 
            opacity: o 
        }); 
        vz.faders[i] = setTimeout(function () { 
            vz.fade(a, o + a.fading.step * d, b, null, i, d) 
        }, 25) 
    }, 
    close: function (a) { 
        var b = vz.getExpander(a); 
        if (b) b.close(); 
        return false 
    } 
}; 
vz.Outline = function (a, b) { 
    this.onLoad = b; 
    this.outlineType = a; 
    var v = vz.ieVersion(), 
        tr; 
    this.hasAlphaImageLoader = vz.ie && v >= 5.5 && v < 7; 
    if (!a) { 
        if (b) b(); 
        return 
    } 
    vz.genContainer(); 
    this.table = vz.createElement('table', { 
        cellSpacing: 0 
    }, { 
        visibility: 'hidden', 
        position: 'absolute', 
        borderCollapse: 'collapse' 
    }, vz.container, true); 
    var c = vz.createElement('tbody', null, null, this.table, 1); 
    this.td = []; 
    for (var i = 0; i <= 8; i++) { 
        if (i % 3 == 0) tr = vz.createElement('tr', null, { 
            height: 'auto' 
        }, c, true); 
        this.td[i] = vz.createElement('td', null, null, tr, true); 
        var d = i != 4 ? { 
            lineHeight: 0, 
            fontSize: 0 
        } : { 
            position: 'relative' 
        }; 
        vz.setStyles(this.td[i], d) 
    } 
    this.td[4].className = a; 
    this.preloadGraphic() 
}; 
vz.Outline.prototype = { 
    preloadGraphic: function () { 
        var a = vz.graphicsDir + (vz.outlinesDir || "outlines/") + this.outlineType + ".png"; 
        var b = vz.safari ? vz.container : null; 
        this.graphic = vz.createElement('img', null, { 
            position: 'absolute', 
            left: '-9999px', 
            top: '-9999px' 
        }, b, true); 
        var c = this; 
        this.graphic.onload = function () { 
            c.onGraphicLoad() 
        }; 
        this.graphic.src = a 
    }, 
    onGraphicLoad: function () { 
        var o = this.offset = this.graphic.width / 4, 
            pos = [ 
                [0, 0], 
                [0, -4], 
                [-2, 0], 
                [0, -8], 0, [-2, -8], 
                [0, -2], 
                [0, -6], 
                [-2, -2] 
            ], 
            dim = { 
                height: (2 * o) + 'px', 
                width: (2 * o) + 'px' 
            }; 
        for (var i = 0; i <= 8; i++) { 
            if (pos[i]) { 
                if (this.hasAlphaImageLoader) { 
                    var w = (i == 1 || i == 7) ? '100%' : this.graphic.width + 'px'; 
                    var a = vz.createElement('div', null, { 
                        width: '100%', 
                        height: '100%', 
                        position: 'relative', 
                        overflow: 'hidden' 
                    }, this.td[i], true); 
                    vz.createElement('div', null, { 
                        filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale, src='" + this.graphic.src + "')", 
                        position: 'absolute', 
                        width: w, 
                        height: this.graphic.height + 'px', 
                        left: (pos[i][0] * o) + 'px', 
                        top: (pos[i][1] * o) + 'px' 
                    }, a, true) 
                } else { 
                    vz.setStyles(this.td[i], { 
                        background: 'url(' + this.graphic.src + ') ' + (pos[i][0] * o) + 'px ' + (pos[i][1] * o) + 'px' 
                    }) 
                } 
                if (window.opera && (i == 3 || i == 5)) vz.createElement('div', null, dim, this.td[i], true); 
                vz.setStyles(this.td[i], dim) 
            } 
        } 
        this.graphic = null; 
        if (vz.pendingOutlines[this.outlineType]) vz.pendingOutlines[this.outlineType].destroy(); 
        vz.pendingOutlines[this.outlineType] = this; 
        if (this.onLoad) this.onLoad() 
    }, 
    setPosition: function (a, x, y, w, h, b) { 
        if (b) this.table.style.visibility = (h >= 4 * this.offset) ? 'visible' : 'hidden'; 
        this.table.style.left = (x - this.offset) + 'px'; 
        this.table.style.top = (y - this.offset) + 'px'; 
        this.table.style.width = (w + 2 * (a.offsetBorderW + this.offset)) + 'px'; 
        w += 2 * (a.offsetBorderW - this.offset); 
        h += +2 * (a.offsetBorderH - this.offset); 
        this.td[4].style.width = w >= 0 ? w + 'px' : 0; 
        this.td[4].style.height = h >= 0 ? h + 'px' : 0; 
        if (this.hasAlphaImageLoader) this.td[3].style.height = this.td[5].style.height = this.td[4].style.height 
    }, 
    destroy: function (a) { 
        if (a) this.table.style.visibility = 'hidden'; 
        else vz.discardElement(this.table) 
    } 
}; 
vz.Expander = function (a, b, c, d) { 
    this.a = a; 
    this.custom = c; 
    this.contentType = d || 'image'; 
    this.isHtml = (d == 'html'); 
    this.isImage = !this.isHtml; 
    vz.continuePreloading = false; 
    vz.genContainer(); 
    var e = this.key = vz.expanders.length; 
    for (var i = 0; i < vz.overrides.length; i++) { 
        var f = vz.overrides[i]; 
        this[f] = b && typeof b[f] != 'undefined' ? b[f] : vz[f] 
    } 
    var g = this.thumb = ((b && b.thumbnailId) ? vz.$(b.thumbnailId) : null) || a.getElementsByTagName('img')[0] || a; 
    this.thumbsUserSetId = g.id || a.id; 
    for (var i = 0; i < vz.expanders.length; i++) { 
        if (vz.expanders[i] && vz.expanders[i].a == a) { 
            vz.expanders[i].focus(); 
            return false 
        } 
    } 
    for (var i = 0; i < vz.expanders.length; i++) { 
        if (vz.expanders[i] && vz.expanders[i].thumb != g && !vz.expanders[i].onLoadStarted) { 
            vz.expanders[i].cancelLoading() 
        } 
    } 
    vz.expanders[this.key] = this; 
    if (!vz.allowMultipleInstances) { 
        if (vz.expanders[e - 1]) vz.expanders[e - 1].close(); 
        if (typeof vz.focusKey != 'undefined' && vz.expanders[vz.focusKey]) vz.expanders[vz.focusKey].close() 
    } 
    var h = vz.position(g); 
    this.thumbWidth = g.width ? g.width : g.offsetWidth; 
    this.thumbHeight = g.height ? g.height : g.offsetHeight; 
    this.thumbLeft = h.x; 
    this.thumbTop = h.y; 
    this.thumbOffsetBorderW = (this.thumb.offsetWidth - this.thumbWidth) / 2; 
    this.thumbOffsetBorderH = (this.thumb.offsetHeight - this.thumbHeight) / 2; 
    this.wrapper = vz.createElement('div', { 
        id: 'highslide-wrapper-' + this.key, 
        className: this.wrapperClassName 
    }, { 
        visibility: 'hidden', 
        position: 'absolute', 
        zIndex: vz.zIndexCounter++ 
    }, null, true); 
    this.wrapper.onmouseover = this.wrapper.onmouseout = vz.wrapperMouseHandler; 
    if (this.contentType == 'image' && this.outlineWhileAnimating == 2) this.outlineWhileAnimating = 0; 
    if (vz.pendingOutlines[this.outlineType]) { 
        this.connectOutline(); 
        this[this.contentType + 'Create']() 
    } else if (!this.outlineType) { 
        this[this.contentType + 'Create']() 
    } else { 
        this.displayLoading(); 
        var j = this; 
        new vz.Outline(this.outlineType, function () { 
            j.connectOutline(); 
            j[j.contentType + 'Create']() 
        }) 
    } 
    return true 
}; 
vz.Expander.prototype = { 
    connectOutline: function (x, y) { 
        var w = vz.pendingOutlines[this.outlineType]; 
        this.objOutline = w; 
        w.table.style.zIndex = this.wrapper.style.zIndex; 
        vz.pendingOutlines[this.outlineType] = null 
    }, 
    displayLoading: function () { 
        if (this.onLoadStarted || this.loading) return; 
        this.originalCursor = this.a.style.cursor; 
        this.a.style.cursor = 'wait'; 
        this.loading = vz.loading; 
        var a = this; 
        this.loading.onclick = function () { 
            a.cancelLoading() 
        }; 
        this.loading.style.top = (this.thumbTop + (this.thumbHeight - this.loading.offsetHeight) / 2) + 'px'; 
        var a = this, 
            left = (this.thumbLeft + this.thumbOffsetBorderW + (this.thumbWidth - this.loading.offsetWidth) / 2) + 'px'; 
        setTimeout(function () { 
            if (a.loading) a.loading.style.left = left 
        }, 100) 
    }, 
    imageCreate: function () { 
        var a = this; 
        var b = document.createElement('img'); 
        this.content = b; 
        b.onload = function () { 
            if (vz.expanders[a.key]) a.contentLoaded() 
        }; 
        if (vz.blockRightClick) b.oncontextmenu = function () { 
            return false 
        }; 
        b.className = 'highslide-image'; 
        b.style.visibility = 'hidden'; 
        b.style.display = 'block'; 
        b.style.position = 'absolute'; 
        b.style.maxWidth = 'none'; 
        b.style.zIndex = 3; 
        b.title = vz.restoreTitle; 
        if (vz.safari) vz.container.appendChild(b); 
        if (vz.ie && vz.flushImgSize) b.src = null; 
        b.src = vz.getSrc(this.a); 
        this.displayLoading() 
    }, 
    htmlCreate: function () { 
        this.content = vz.getCacheBinding(this.a); 
        if (!this.content) this.content = vz.getNode(this.contentId); 
        if (!this.content) this.content = vz.getSelfRendered(); 
        this.innerContent = this.content; 
        if (this.swfObject || this.objectType == 'iframe') this.setObjContainerSize(this.innerContent); 
        vz.container.appendChild(this.wrapper); 
        vz.setStyles(this.wrapper, { 
            position: 'static', 
            padding: '0 ' + vz.marginRight + 'px 0 ' + vz.marginLeft + 'px' 
        }); 
        this.content = vz.createElement('div', { 
            className: 'highslide-html' 
        }, { 
            position: 'relative', 
            zIndex: 3, 
            overflow: 'hidden' 
        }, this.wrapper); 
        this.mediumContent = vz.createElement('div', null, null, this.content, 1); 
        this.mediumContent.appendChild(this.innerContent); 
        vz.setStyles(this.innerContent, { 
            position: 'relative' 
        }); 
        this.innerContent.className += ' highslide-display-block'; 
        if (this.width) this.innerContent.style.width = this.width + 'px'; 
        if (this.height) this.innerContent.style.height = this.height + 'px'; 
        if (this.innerContent.offsetWidth < this.minWidth) this.innerContent.style.width = this.minWidth + 'px'; 
        if (this.objectType == 'ajax' && !vz.getCacheBinding(this.a)) { 
            this.displayLoading(); 
            var a = new vz.Ajax(this.a, this.innerContent); 
            var b = this; 
            a.onLoad = function () { 
                if (vz.expanders[b.key]) b.contentLoaded() 
            }; 
            a.onError = function () { 
                location.href = vz.getSrc(this.a) 
            }; 
            a.run() 
        } else if (this.objectType == 'iframe' && this.objectLoadTime == 'before') { 
            this.writeExtendedContent() 
        } else this.contentLoaded() 
    }, 
    contentLoaded: function () { 
        try { 
            if (!this.content) return; 
            this.content.onload = null; 
            if (this.onLoadStarted) return; 
            else this.onLoadStarted = true; 
            if (this.loading) { 
                vz.setStyles(this.loading, { 
                    left: '-9999px', 
                    top: '-9999px' 
                }); 
                this.loading = null; 
                this.a.style.cursor = this.originalCursor || '' 
            } 
            this.marginBottom = vz.marginBottom; 
            if (this.isImage) { 
                this.newWidth = this.content.width; 
                this.newHeight = this.content.height; 
                this.fullExpandWidth = this.newWidth; 
                this.fullExpandHeight = this.newHeight; 
                this.content.style.width = this.thumbWidth + 'px'; 
                this.content.style.height = this.thumbHeight + 'px'; 
                this.getCaption() 
            } else if (this.htmlGetSize) this.htmlGetSize(); 
            this.wrapper.appendChild(this.content); 
            this.content.style.position = 'relative'; 
            if (this.caption) this.wrapper.appendChild(this.caption); 
            this.wrapper.style.left = this.thumbLeft + 'px'; 
            this.wrapper.style.top = this.thumbTop + 'px'; 
            vz.container.appendChild(this.wrapper); 
            this.offsetBorderW = (this.content.offsetWidth - this.thumbWidth) / 2; 
            this.offsetBorderH = (this.content.offsetHeight - this.thumbHeight) / 2; 
            var a = vz.marginRight + 2 * this.offsetBorderW; 
            this.marginBottom += 2 * this.offsetBorderH; 
            var b = this.newWidth / this.newHeight; 
            var c = this.allowSizeReduction ? this.minWidth : this.newWidth; 
            var d = this.allowSizeReduction ? this.minHeight : this.newHeight; 
            var f = { 
                x: 'auto', 
                y: 'auto' 
            }; 
            var g = vz.getPageSize(); 
            this.x = { 
                min: parseInt(this.thumbLeft) - this.offsetBorderW + this.thumbOffsetBorderW, 
                span: this.newWidth, 
                minSpan: (this.newWidth < c && !vz.padToMinWidth) ? this.newWidth : c, 
                marginMin: vz.marginLeft, 
                marginMax: a, 
                scroll: g.scrollLeft, 
                clientSpan: g.width, 
                thumbSpan: this.thumbWidth 
            }; 
            var h = this.x.min + parseInt(this.thumbWidth); 
            this.x = this.justify(this.x); 
            this.y = { 
                min: parseInt(this.thumbTop) - this.offsetBorderH + this.thumbOffsetBorderH, 
                span: this.newHeight, 
                minSpan: this.newHeight < d ? this.newHeight : d, 
                marginMin: vz.marginTop, 
                marginMax: this.marginBottom, 
                scroll: g.scrollTop, 
                clientSpan: g.height, 
                thumbSpan: this.thumbHeight 
            }; 
            var i = this.y.min + parseInt(this.thumbHeight); 
            this.y = this.justify(this.y); 
            if (this.isHtml) this.htmlSizeOperations(); 
            if (this.isImage) this.correctRatio(b); 
            var x = this.x; 
            var y = this.y; 
            this.show() 
        } catch (e) { 
            window.location.href = vz.getSrc(this.a) 
        } 
    }, 
    setObjContainerSize: function (a, b) { 
        var c = vz.getElementByClass(a, 'DIV', 'highslide-body'); 
        if (this.objectType == 'iframe') { 
            if (this.objectWidth) c.style.width = this.objectWidth + 'px'; 
            if (this.objectHeight) c.style.height = this.objectHeight + 'px' 
        } 
        if (this.swfObject) { 
            c.style.width = this.swfObject.attributes.width + 'px'; 
            c.style.height = this.swfObject.attributes.height + 'px' 
        } 
    }, 
    writeExtendedContent: function () { 
        if (this.hasExtendedContent) return; 
        var a = this; 
        this.body = vz.getElementByClass(this.innerContent, 'DIV', 'highslide-body'); 
        if (this.objectType == 'iframe') { 
            this.displayLoading(); 
            this.ruler = vz.clearing.cloneNode(1); 
            this.body.appendChild(this.ruler); 
            this.newWidth = this.innerContent.offsetWidth; 
            if (!this.objectWidth) this.objectWidth = this.ruler.offsetWidth; 
            var b = this.innerContent.offsetHeight - this.body.offsetHeight; 
            var h = this.objectHeight || (vz.getPageSize()).height - b - vz.marginTop - vz.marginBottom; 
            var c = vz.ie6SSL ? ' src="blank.htm" ' : ''; 
            var d = vz.ie ? '<iframe name="vzIframe' + this.key + '" ' + c + '/>' : 'iframe'; 
            this.iframe = vz.createElement(d, { 
                name: 'vzIframe' + this.key, 
                frameBorder: 0, 
                allowTransparency: true, 
                key: this.key 
            }, { 
                width: this.objectWidth + 'px', 
                height: h + 'px' 
            }, this.body); 
            if (this.objectLoadTime == 'before') vz.addEventListener(this.iframe, 'load', function () { 
                if (vz.expanders[a.key]) vz.expanders[a.key].contentLoaded() 
            }); 
            if (vz.safari) this.iframe.src = null; 
            this.iframe.src = vz.getSrc(this.a); 
            if (this.objectLoadTime == 'after') this.correctIframeSize() 
        } else if (this.swfObject) { 
            this.body.id = this.body.id || 'vz-flash-id-' + this.key; 
            this.swfObject.write(this.body.id) 
        } 
        this.hasExtendedContent = true 
    }, 
    htmlGetSize: function () { 
        if (this.iframe && !this.objectHeight) { 
            try { 
                var a = this.iframe.contentDocument || this.iframe.contentWindow.document; 
                var b = a.createElement('div'); 
                b.style.clear = 'both'; 
                a.body.appendChild(b); 
                var h = b.offsetTop; 
                if (vz.ie) h += parseInt(a.body.currentStyle.marginTop) + parseInt(a.body.currentStyle.marginBottom) - 1; 
                this.iframe.style.height = this.body.style.height = h + 'px' 
            } catch (e) { 
                this.iframe.style.height = '300px' 
            } 
        } 
        this.innerContent.appendChild(vz.clearing); 
        if (!this.newWidth) this.newWidth = this.innerContent.offsetWidth; 
        this.newHeight = this.innerContent.offsetHeight; 
        this.innerContent.removeChild(vz.clearing); 
        if (vz.ie && this.newHeight > parseInt(this.innerContent.currentStyle.height)) { 
            this.newHeight = parseInt(this.innerContent.currentStyle.height) 
        } 
        vz.setStyles(this.wrapper, { 
            position: 'absolute', 
            padding: '0' 
        }); 
        vz.setStyles(this.content, { 
            width: this.thumbWidth + 'px', 
            height: this.thumbHeight + 'px' 
        }) 
    }, 
    correctIframeSize: function () { 
        var a = this.innerContent.offsetWidth - this.ruler.offsetWidth; 
        if (a < 0) a = 0; 
        var b = this.innerContent.offsetHeight - this.body.offsetHeight; 
        vz.setStyles(this.iframe, { 
            width: (this.x.span - a) + 'px', 
            height: (this.y.span - b) + 'px' 
        }); 
        vz.setStyles(this.body, { 
            width: this.iframe.style.width, 
            height: this.iframe.style.height 
        }); 
        this.scrollingContent = this.iframe; 
        this.scrollerDiv = this.scrollingContent 
    }, 
    htmlSizeOperations: function () { 
        this.setObjContainerSize(this.innerContent); 
        if (this.swfObject && this.objectLoadTime == 'before') this.writeExtendedContent(); 
        if (this.x.span < this.newWidth && !this.allowWidthReduction) this.x.span = this.newWidth; 
        if (this.y.span < this.newHeight && !this.allowHeightReduction) this.y.span = this.newHeight; 
        this.scrollerDiv = this.innerContent; 
        vz.setStyles(this.mediumContent, { 
            width: this.x.span + 'px', 
            position: 'relative', 
            left: (this.x.min - this.thumbLeft) + 'px', 
            top: (this.y.min - this.thumbTop) + 'px' 
        }); 
        vz.setStyles(this.innerContent, { 
            border: 'none', 
            width: 'auto', 
            height: 'auto' 
        }); 
        var a = vz.getElementByClass(this.innerContent, 'DIV', 'highslide-body'); 
        if (a && !this.swfObject && this.objectType != 'iframe') { 
            var b = a; 
            a = vz.createElement(b.nodeName, null, { 
                overflow: 'hidden' 
            }, null, true); 
            b.parentNode.insertBefore(a, b); 
            a.appendChild(vz.clearing); 
            a.appendChild(b); 
            var c = this.innerContent.offsetWidth - a.offsetWidth; 
            var d = this.innerContent.offsetHeight - a.offsetHeight; 
            a.removeChild(vz.clearing); 
            var e = vz.safari || navigator.vendor == 'KDE' ? 1 : 0; 
            vz.setStyles(a, { 
                width: (this.x.span - c - e) + 'px', 
                height: (this.y.span - d) + 'px', 
                overflow: 'auto', 
                position: 'relative' 
            }); 
            if (e && b.offsetHeight > a.offsetHeight) { 
                a.style.width = (parseInt(a.style.width) + e) + 'px' 
            } 
            this.scrollingContent = a; 
            this.scrollerDiv = this.scrollingContent 
        } 
        if (this.iframe && this.objectLoadTime == 'before') this.correctIframeSize(); 
        if (!this.scrollingContent && this.y.span < this.mediumContent.offsetHeight) this.scrollerDiv = this.content; 
        if (this.scrollerDiv == this.content && !this.allowWidthReduction && this.objectType != 'iframe') { 
            this.x.span += 17 
        } 
        if (this.scrollerDiv && this.scrollerDiv.offsetHeight > this.scrollerDiv.parentNode.offsetHeight) { 
            setTimeout("try { vz.expanders[" + this.key + "].scrollerDiv.style.overflow = 'auto'; } catch(e) {}", vz.expandDuration) 
        } 
    }, 
    justify: function (p) { 
        var a, dim = p == this.x ? 'x' : 'y'; 
        var b = false; 
        var c = true; 
        p.min = Math.round(p.min - ((p.span - p.thumbSpan) / 2)); 
        if (p.min < p.scroll + p.marginMin) { 
            p.min = p.scroll + p.marginMin; 
            b = true 
        } 
        if (p.span < p.minSpan) { 
            p.span = p.minSpan; 
            c = false 
        } 
        if (p.min + p.span > p.scroll + p.clientSpan - p.marginMax) { 
            if (b && c) { 
                p.span = p.clientSpan - p.marginMin - p.marginMax 
            } else if (p.span < p.clientSpan - p.marginMin - p.marginMax) { 
                p.min = p.scroll + p.clientSpan - p.span - p.marginMin - p.marginMax 
            } else { 
                p.min = p.scroll + p.marginMin; 
                if (c) p.span = p.clientSpan - p.marginMin - p.marginMax 
            } 
        } 
        if (p.span < p.minSpan) { 
            p.span = p.minSpan; 
            c = false 
        } 
        if (p.min < p.marginMin) { 
            tmpMin = p.min; 
            p.min = p.marginMin; 
            if (c) p.span = p.span - (p.min - tmpMin) 
        } 
        return p 
    }, 
    correctRatio: function (a) { 
        var x = this.x; 
        var y = this.y; 
        var b = false; 
        if (x.span / y.span > a) { 
            var c = x.span; 
            x.span = y.span * a; 
            if (x.span < x.minSpan) { 
                if (vz.padToMinWidth) x.imgSpan = x.span; 
                x.span = x.minSpan; 
                if (!x.imgSpan) y.span = x.span / a 
            } 
            b = true 
        } else if (x.span / y.span < a) { 
            var d = y.span; 
            y.span = x.span / a; 
            b = true 
        } 
        if (b) { 
            x.min = parseInt(this.thumbLeft) - this.offsetBorderW + this.thumbOffsetBorderW; 
            x.minSpan = x.span; 
            this.x = this.justify(x); 
            y.min = parseInt(this.thumbTop) - this.offsetBorderH + this.thumbOffsetBorderH; 
            y.minSpan = y.span; 
            this.y = this.justify(y) 
        } 
    }, 
    show: function () { 
        var a = { 
            x: this.x.min - 20, 
            y: this.y.min - 20, 
            w: this.x.span + 40, 
            h: this.y.span + 40 + this.spaceForCaption 
        }; 
        vz.hideSelects = (vz.ie && vz.ieVersion() < 7); 
        if (vz.hideSelects) this.showHideElements('SELECT', 'hidden', a); 
        vz.hideIframes = ((window.opera && navigator.appVersion < 9) || navigator.vendor == 'KDE' || (vz.ie && vz.ieVersion() < 5.5)); 
        if (vz.hideIframes) this.showHideElements('IFRAME', 'hidden', a); 
        if (vz.geckoMac) this.showHideElements('*', 'hidden', a); 
        if (this.x.imgSpan) this.content.style.margin = '0 auto'; 
        this.overlays = []; 
        this.changeSize(1, { 
            x: this.thumbLeft + this.thumbOffsetBorderW - this.offsetBorderW, 
            y: this.thumbTop + this.thumbOffsetBorderH - this.offsetBorderH, 
            w: this.thumbWidth, 
            h: this.thumbHeight, 
            imgW: this.thumbWidth, 
            o: vz.outlineStartOffset 
        }, { 
            x: this.x.min, 
            y: this.y.min, 
            w: this.x.span, 
            h: this.y.span, 
            imgW: this.x.imgSpan, 
            o: this.objOutline ? this.objOutline.offset : 0 
        }, vz.expandDuration, vz.expandSteps) 
    }, 
    changeSize: function (b, c, d, e, f) { 
        if (b && this.objOutline && !this.outlineWhileAnimating) this.objOutline.setPosition(this, this.x.min, this.y.min, this.x.span, this.y.span); 
        else if (!b && this.objOutline) { 
            if (this.outlineWhileAnimating) this.objOutline.setPosition(this, c.x, c.y, c.w, c.h); 
            else this.objOutline.destroy((this.isHtml && this.preserveContent)) 
        } 
        if (!b) { 
            var n = this.wrapper.childNodes.length; 
            for (var i = n - 1; i >= 0; i--) { 
                var g = this.wrapper.childNodes[i]; 
                if (g != this.content) vz.discardElement(g) 
            } 
        } 
        if (this.fadeInOut) { 
            c.op = b ? 0 : 1; 
            d.op = b 
        } 
        var t, exp = this, 
            easing = Math[this.easing] || Math.easeInQuad; 
        if (!b) easing = Math[this.easingClose] || easing; 
        for (var i = 1; i <= f; i++) { 
            t = Math.round(i * (e / f)); 
            (function () { 
                var a = i, 
                    size = {}; 
                for (var x in c) { 
                    size[x] = easing(t, c[x], d[x] - c[x], e); 
                    if (/[xywh]/.test(x)) size[x] = Math.round(size[x]) 
                } 
                setTimeout(function () { 
                    if (b && a == 1) { 
                        exp.content.style.visibility = 'visible'; 
                        exp.a.className += ' highslide-active-anchor' 
                    } 
                    exp.setSize(size) 
                }, t) 
            })() 
        } 
        if (b) { 
            setTimeout(function () { 
                if (exp.objOutline) exp.objOutline.table.style.visibility = "visible" 
            }, t); 
            setTimeout(function () { 
                if (exp.caption) exp.writeCaption(); 
                exp.afterExpand() 
            }, t + 50) 
        } else setTimeout(function () { 
            exp.afterClose() 
        }, t) 
    }, 
    setSize: function (a) { 
        try { 
            if (this.isHtml) { 
                vz.setStyles(this.content, { 
                    width: a.w + 'px', 
                    height: a.h + 'px' 
                }); 
                vz.setStyles(this.mediumContent, { 
                    left: (this.x.min - a.x) + 'px', 
                    top: (this.y.min - a.y) + 'px' 
                }); 
                this.innerContent.style.visibility = 'visible' 
            } else { 
                this.wrapper.style.width = (a.w + 2 * this.offsetBorderW) + 'px'; 
                this.content.style.width = ((a.imgW && !isNaN(a.imgW)) ? a.imgW : a.w) + 'px'; 
                if (vz.safari) this.content.style.maxWidth = this.content.style.width; 
                this.content.style.height = a.h + 'px' 
            } 
            if (a.op) vz.setStyles(this.wrapper, { 
                opacity: a.op 
            }); 
            if (this.objOutline && this.outlineWhileAnimating) { 
                var o = this.objOutline.offset - a.o; 
                this.objOutline.setPosition(this, a.x + o, a.y + o, a.w - 2 * o, a.h - 2 * o, 1) 
            } 
            vz.setStyles(this.wrapper, { 
                'visibility': 'visible', 
                'left': a.x + 'px', 
                'top': a.y + 'px' 
            }) 
        } catch (e) { 
            window.location.href = vz.getSrc(this.a) 
        } 
    }, 
    afterExpand: function () { 
        this.isExpanded = true; 
        this.focus(); 
        if (this.isHtml && this.objectLoadTime == 'after') this.writeExtendedContent(); 
        if (this.isHtml) { 
            if (this.iframe) { 
                try { 
                    var a = this, 
                        doc = this.iframe.contentDocument || this.iframe.contentWindow.document; 
                    vz.addEventListener(doc, 'mousedown', function () { 
                        if (vz.focusKey != a.key) a.focus() 
                    }) 
                } catch (e) {} 
                if (vz.ie && typeof this.isClosing != 'boolean') this.iframe.style.width = (this.objectWidth - 1) + 'px' 
            } 
        } 
        this.createOverlays(); 
        if (vz.showCredits) this.writeCredits(); 
        if (this.isImage && this.fullExpandWidth > this.x.span) this.createFullExpand(); 
        if (!this.caption) this.prepareNextOutline() 
    }, 
    prepareNextOutline: function () { 
        var a = this.key; 
        var b = this.outlineType; 
        new vz.Outline(b, function () { 
            try { 
                vz.expanders[a].preloadNext() 
            } catch (e) {} 
        }) 
    }, 
    preloadNext: function () { 
        var a = vz.getAdjacentAnchor(this.key, 1); 
        if (a.onclick.toString().match(/vz\.expand/)) var b = vz.createElement('img', { 
            src: vz.getSrc(a) 
        }) 
    }, 
    cancelLoading: function () { 
        vz.expanders[this.key] = null; 
        this.a.style.cursor = this.originalCursor; 
        if (this.loading) vz.loading.style.left = '-9999px' 
    }, 
    writeCredits: function () { 
        this.credits = vz.createElement('a', { 
            href: vz.creditsHref, 
            className: 'highslide-credits', 
            innerHTML: vz.creditsText, 
            title: vz.creditsTitle 
        }); 
        this.createOverlay({ 
            overlayId: this.credits, 
            position: 'top left' 
        }) 
    }, 
    getCaption: function () { 
        if (!this.captionId && this.thumbsUserSetId) this.captionId = 'caption-for-' + this.thumbsUserSetId; 
        if (this.captionId) this.caption = vz.getNode(this.captionId); 
        if (!this.caption && !this.captionText && this.captionEval) try { 
            this.captionText = eval(this.captionEval) 
        } catch (e) {} 
        if (!this.caption && this.captionText) this.caption = vz.createElement('div', { 
            className: 'highslide-caption', 
            innerHTML: this.captionText 
        }); 
        if (!this.caption) { 
            var a = this.a.nextSibling; 
            while (a && !vz.isvzAnchor(a)) { 
                if (/highslide-caption/.test(a.className || null)) { 
                    this.caption = a.cloneNode(1); 
                    break 
                } 
                a = a.nextSibling 
            } 
        } 
        if (this.caption) { 
            this.marginBottom += this.spaceForCaption 
        } 
    }, 
    writeCaption: function () { 
        try { 
            vz.setStyles(this.wrapper, { 
                width: this.wrapper.offsetWidth + 'px', 
                height: this.wrapper.offsetHeight + 'px' 
            }); 
            vz.setStyles(this.caption, { 
                visibility: 'hidden', 
                marginTop: vz.safari ? 0 : '-' + this.y.span + 'px' 
            }); 
            this.caption.className += ' highslide-display-block'; 
            var b, exp = this; 
            if (vz.ie && (vz.ieVersion() < 6 || document.compatMode == 'BackCompat')) { 
                b = this.caption.offsetHeight 
            } else { 
                var c = vz.createElement('div', { 
                    innerHTML: this.caption.innerHTML 
                }, null, null, true); 
                this.caption.innerHTML = ''; 
                this.caption.appendChild(c); 
                b = this.caption.childNodes[0].offsetHeight; 
                this.caption.innerHTML = this.caption.childNodes[0].innerHTML 
            } 
            vz.setStyles(this.caption, { 
                overflow: 'hidden', 
                height: 0, 
                zIndex: 2, 
                marginTop: 0 
            }); 
            this.wrapper.style.height = 'auto'; 
            if (vz.captionSlideSpeed) { 
                var d = (Math.round(b / 50) || 1) * vz.captionSlideSpeed 
            } else { 
                this.placeCaption(b, 1); 
                return 
            } 
            for (var h = b % d, t = 0; h <= b; h += d, t += 10) { 
                (function () { 
                    var a = h, 
                        end = (h == b) ? 1 : 0; 
                    setTimeout(function () { 
                        exp.placeCaption(a, end) 
                    }, t) 
                })() 
            } 
        } catch (e) {} 
    }, 
    placeCaption: function (a, b) { 
        if (!this.caption) return; 
        this.caption.style.height = a + 'px'; 
        this.caption.style.visibility = 'visible'; 
        this.y.span = this.wrapper.offsetHeight - 2 * this.offsetBorderH; 
        var o = this.objOutline; 
        if (o) { 
            var h = this.wrapper.offsetHeight - 2 * this.objOutline.offset; 
            if (h >= 0) o.td[4].style.height = h + 'px'; 
            if (o.hasAlphaImageLoader) o.td[3].style.height = o.td[5].style.height = o.td[4].style.height 
        } 
        if (b) this.prepareNextOutline() 
    }, 
    showHideElements: function (a, b, c) { 
        var d = document.getElementsByTagName(a); 
        var e = a == '*' ? 'overflow' : 'visibility'; 
        for (var i = 0; i < d.length; i++) { 
            if (e == 'visibility' || (document.defaultView.getComputedStyle(d[i], "").getPropertyValue('overflow') == 'auto' || d[i].getAttribute('hidden-by') != null)) { 
                var f = d[i].getAttribute('hidden-by'); 
                if (b == 'visible' && f) { 
                    f = f.replace('[' + this.key + ']', ''); 
                    d[i].setAttribute('hidden-by', f); 
                    if (!f) d[i].style[e] = d[i].origProp 
                } else if (b == 'hidden') { 
                    var g = vz.position(d[i]); 
                    g.w = d[i].offsetWidth; 
                    g.h = d[i].offsetHeight; 
                    var h = (g.x + g.w < c.x || g.x > c.x + c.w); 
                    var j = (g.y + g.h < c.y || g.y > c.y + c.h); 
                    var k = vz.getWrapperKey(d[i]); 
                    if (!h && !j && k != this.key) { 
                        if (!f) { 
                            d[i].setAttribute('hidden-by', '[' + this.key + ']'); 
                            d[i].origProp = d[i].style[e]; 
                            d[i].style[e] = 'hidden' 
                        } else if (!f.match('[' + this.key + ']')) { 
                            d[i].setAttribute('hidden-by', f + '[' + this.key + ']') 
                        } 
                    } else if (f == '[' + this.key + ']' || vz.focusKey == k) { 
                        d[i].setAttribute('hidden-by', ''); 
                        d[i].style[e] = d[i].origProp || '' 
                    } else if (f && f.match('[' + this.key + ']')) { 
                        d[i].setAttribute('hidden-by', f.replace('[' + this.key + ']', '')) 
                    } 
                } 
            } 
        } 
    }, 
    focus: function () { 
        this.wrapper.style.zIndex = vz.zIndexCounter++; 
        for (var i = 0; i < vz.expanders.length; i++) { 
            if (vz.expanders[i] && i == vz.focusKey) { 
                var a = vz.expanders[i]; 
                a.content.className += ' highslide-' + a.contentType + '-blur'; 
                if (a.caption) { 
                    a.caption.className += ' highslide-caption-blur' 
                } 
                if (a.isImage) { 
                    a.content.style.cursor = vz.ie ? 'hand' : 'pointer'; 
                    a.content.title = vz.focusTitle 
                } 
            } 
        } 
        if (this.objOutline) this.objOutline.table.style.zIndex = this.wrapper.style.zIndex; 
        this.content.className = 'highslide-' + this.contentType; 
        if (this.caption) { 
            this.caption.className = this.caption.className.replace(' highslide-caption-blur', '') 
        } 
        if (this.isImage) { 
            this.content.title = vz.restoreTitle; 
            vz.styleRestoreCursor = window.opera ? 'pointer' : 'url(' + vz.graphicsDir + vz.restoreCursor + '), pointer'; 
            if (vz.ie && vz.ieVersion() < 6) vz.styleRestoreCursor = 'hand'; 
            this.content.style.cursor = vz.styleRestoreCursor 
        } 
        vz.focusKey = this.key; 
        vz.addEventListener(document, 'keydown', vz.keyHandler) 
    }, 
    move: function (e) { 
        this.x.min = e.left + e.dX; 
        this.y.min = e.top + e.dY; 
        if (e.type == 'image') this.content.style.cursor = 'move'; 
        vz.setStyles(this.wrapper, { 
            left: this.x.min + 'px', 
            top: this.y.min + 'px' 
        }); 
        if (this.objOutline) this.objOutline.setPosition(this, this.x.min, this.y.min, this.x.span, this.y.span) 
    }, 
    resize: function (e) { 
        this.x.span = e.width + e.dX; 
        this.y.span = e.height + e.dY; 
        if (this.x.span < this.minWidth) this.x.span = this.minWidth; 
        if (this.y.span < this.minHeight) this.y.span = this.minHeight; 
        var d = this.scrollerDiv; 
        if (typeof this.wDiff == 'undefined') { 
            this.wDiff = this.innerContent.offsetWidth - d.offsetWidth; 
            this.hDiff = this.innerContent.offsetHeight - d.offsetHeight 
        } 
        vz.setStyles(d, { 
            width: (this.x.span - this.wDiff) + 'px', 
            height: (this.y.span - this.hDiff) + 'px' 
        }); 
        var a = { 
            width: this.x.span + 'px', 
            height: this.y.span + 'px' 
        }; 
        vz.setStyles(this.content, a); 
        if (this.releaseMask) vz.setStyles(this.releaseMask, a); 
        this.mediumContent.style.width = 'auto'; 
        vz.setStyles(this.body, { 
            width: 'auto', 
            height: 'auto' 
        }); 
        for (var i = 0; i < this.overlays.length; i++) { 
            this.positionOverlay(vz.$('vzId' + this.overlays[i])) 
        } 
        if (this.objOutline) this.objOutline.setPosition(this, this.x.min, this.y.min, this.x.span, this.y.span) 
    }, 
    close: function () { 
        if (this.isClosing || !this.isExpanded) return; 
        this.isClosing = true; 
        vz.removeEventListener(document, 'keydown', vz.keyHandler); 
        try { 
            if (this.isHtml) this.htmlPrepareClose(); 
            this.content.style.cursor = 'default'; 
            this.changeSize(0, { 
                x: this.x.min, 
                y: this.y.min, 
                w: this.x.span, 
                h: parseInt(this.content.style.height), 
                imgW: this.x.imgSpan, 
                o: this.objOutline ? this.objOutline.offset : 0 
            }, { 
                x: this.thumbLeft - this.offsetBorderW + this.thumbOffsetBorderW, 
                y: this.thumbTop - this.offsetBorderH + this.thumbOffsetBorderH, 
                w: this.thumbWidth, 
                h: this.thumbHeight, 
                imgW: this.thumbWidth, 
                o: vz.outlineStartOffset 
            }, vz.restoreDuration, vz.restoreSteps) 
        } catch (e) { 
            this.afterClose() 
        } 
    }, 
    htmlPrepareClose: function () { 
        if (vz.geckoMac) { 
            if (!vz.mask) vz.mask = vz.createElement('div', null, { 
                position: 'absolute' 
            }, vz.container); 
            vz.setStyles(vz.mask, { 
                width: this.x.span + 'px', 
                height: this.y.span + 'px', 
                left: this.x.min + 'px', 
                top: this.y.min + 'px', 
                display: 'block' 
            }) 
        } 
        if (this.swfObject) try { 
            vz.$(this.swfObject.getAttribute('id')).StopPlay() 
        } catch (e) {} 
        if (this.objectLoadTime == 'after' && !this.preserveContent) this.destroyObject(); 
        if (this.scrollerDiv && this.scrollerDiv != this.scrollingContent) this.scrollerDiv.style.overflow = 'hidden' 
    }, 
    destroyObject: function () { 
        if (vz.ie && this.iframe) try { 
            this.iframe.contentWindow.document.body.innerHTML = '' 
        } catch (e) {} 
        this.body.innerHTML = '' 
    }, 
    sleep: function () { 
        if (this.objOutline) this.objOutline.table.className = 'highslide-display-none'; 
        this.releaseMask = null; 
        this.wrapper.className += ' highslide-display-none'; 
        vz.push(vz.sleeping, this) 
    }, 
    awake: function () { 
        vz.expanders[this.key] = this; 
        if (!vz.allowMultipleInstances && vz.focusKey != this.key) { 
            try { 
                vz.expanders[vz.focusKey].close() 
            } catch (e) {} 
        } 
        this.wrapper.className = this.wrapper.className.replace(/highslide-display-none/, ''); 
        var z = vz.zIndexCounter++; 
        this.wrapper.style.zIndex = z; 
        this.isClosing = false; 
        var o = this.objOutline || 0; 
        if (o) { 
            if (!this.outlineWhileAnimating) o.table.style.visibility = 'hidden'; 
            o.table.className = null; 
            o.table.style.zIndex = z 
        } 
        this.show() 
    }, 
    createOverlay: function (o) { 
        var a = o.overlayId; 
        if (typeof a == 'string') a = vz.getNode(a); 
        if (!a || typeof a == 'string') return; 
        var b = vz.createElement('div', { 
            id: 'vzId' + vz.idCounter++ 
        }, { 
            'left': 0, 
            'top': 0, 
            'position': 'absolute', 
            'zIndex': 3, 
            'visibility': 'hidden' 
        }, this.wrapper, true); 
        if (o.opacity) vz.setStyles(a, { 
            opacity: o.opacity 
        }); 
        a.style.styleFloat = 'none'; 
        a.className += ' highslide-display-block'; 
        b.appendChild(a); 
        b.vzPos = o.position; 
        this.positionOverlay(b); 
        if (o.hideOnMouseOut) b.setAttribute('hideOnMouseOut', true); 
        if (!o.opacity) o.opacity = 1; 
        b.setAttribute('opacity', o.opacity); 
        vz.fade(b, 0, o.opacity); 
        vz.push(this.overlays, vz.idCounter - 1) 
    }, 
    positionOverlay: function (a, b) { 
        var c = this.offsetBorderW, 
            dLeft = this.x.span - a.offsetWidth, 
            top = this.offsetBorderH, 
            dTop = (b || parseInt(this.content.style.height)) - a.offsetHeight, 
            p = a.vzPos || 'center center'; 
        if (/^bottom/.test(p)) top += dTop; 
        if (/^center/.test(p)) top += dTop / 2; 
        if (/right$/.test(p)) c += dLeft; 
        if (/center$/.test(p)) c += dLeft / 2; 
        a.style.left = c + 'px'; 
        a.style.top = top + 'px' 
    }, 
    createOverlays: function () { 
        for (var i = 0; i < vz.overlays.length; i++) { 
            var o = vz.overlays[i], 
                tId = o.thumbnailId, 
                sg = o.slideshowGroup; 
            if ((!tId && !sg) || tId == this.thumbsUserSetId || sg === this.slideshowGroup) { 
                if (this.isImage || (this.isHtml && o.useOnHtml)) this.createOverlay(o) 
            } 
        } 
    }, 
    createFullExpand: function () { 
        this.fullExpandLabel = vz.createElement('a', { 
            href: 'javascript:vz.expanders[' + this.key + '].doFullExpand();', 
            title: vz.fullExpandTitle, 
            className: 'highslide-full-expand' 
        }); 
        this.createOverlay({ 
            overlayId: this.fullExpandLabel, 
            position: vz.fullExpandPosition, 
            hideOnMouseOut: true, 
            opacity: vz.fullExpandOpacity 
        }) 
    }, 
    doFullExpand: function () { 
        try { 
            if (this.fullExpandLabel) vz.discardElement(this.fullExpandLabel); 
            this.focus(); 
            this.x.min = parseInt(this.wrapper.style.left) - (this.fullExpandWidth - this.content.width) / 2; 
            if (this.x.min < vz.marginLeft) this.x.min = vz.marginLeft; 
            this.wrapper.style.left = this.x.min + 'px'; 
            vz.setStyles(this.content, { 
                width: this.fullExpandWidth + 'px', 
                maxWidth: this.fullExpandWidth + 'px', 
                height: this.fullExpandHeight + 'px' 
            }); 
            this.x.span = this.fullExpandWidth; 
            this.wrapper.style.width = (this.x.span + 2 * this.offsetBorderW) + 'px'; 
            this.y.span = this.wrapper.offsetHeight - 2 * this.offsetBorderH; 
            if (this.objOutline) this.objOutline.setPosition(this, this.x.min, this.y.min, this.x.span, this.y.span); 
            for (var i = 0; i < this.overlays.length; i++) this.positionOverlay(vz.$('vzId' + this.overlays[i])); 
            this.redoShowHide() 
        } catch (e) { 
            window.location.href = this.content.src 
        } 
    }, 
    redoShowHide: function () { 
        var a = { 
            x: parseInt(this.wrapper.style.left) - 20, 
            y: parseInt(this.wrapper.style.top) - 20, 
            w: this.content.offsetWidth + 40, 
            h: this.content.offsetHeight + 40 + this.spaceForCaption 
        }; 
        if (vz.hideSelects) this.showHideElements('SELECT', 'hidden', a); 
        if (vz.hideIframes) this.showHideElements('IFRAME', 'hidden', a); 
        if (vz.geckoMac) this.showHideElements('*', 'hidden', a) 
    }, 
    afterClose: function () { 
        this.a.className = this.a.className.replace('highslide-active-anchor', ''); 
        if (vz.hideSelects) this.showHideElements('SELECT', 'visible'); 
        if (vz.hideIframes) this.showHideElements('IFRAME', 'visible'); 
        if (vz.geckoMac) this.showHideElements('*', 'visible'); 
        if (this.isHtml && this.preserveContent) this.sleep(); 
        else { 
            if (this.objOutline && this.outlineWhileAnimating) this.objOutline.destroy(); 
            vz.discardElement(this.wrapper) 
        } 
        if (vz.mask) vz.mask.style.display = 'none'; 
        vz.expanders[this.key] = null; 
        vz.reOrder() 
    } 
}; 
vz.Ajax = function (a, b, c) { 
    this.a = a; 
    this.content = b; 
    this.pre = c 
}; 
vz.Ajax.prototype = { 
    run: function () { 
        this.src = vz.getSrc(this.a); 
        if (this.src.match('#')) { 
            var a = this.src.split('#'); 
            this.src = a[0]; 
            this.id = a[1] 
        } 
        if (vz.cachedGets[this.src]) { 
            this.cachedGet = vz.cachedGets[this.src]; 
            if (this.id) this.getElementContent(); 
            else this.loadHTML(); 
            return 
        } 
        try { 
            this.xmlHttp = new XMLHttpRequest() 
        } catch (e) { 
            try { 
                this.xmlHttp = new ActiveXObject("Msxml2.XMLHTTP") 
            } catch (e) { 
                try { 
                    this.xmlHttp = new ActiveXObject("Microsoft.XMLHTTP") 
                } catch (e) { 
                    this.onError() 
                } 
            } 
        } 
        var b = this; 
        this.xmlHttp.onreadystatechange = function () { 
            if (b.xmlHttp.readyState == 4) { 
                if (b.id) b.getElementContent(); 
                else b.loadHTML() 
            } 
        }; 
        this.xmlHttp.open("GET", this.src, true); 
        this.xmlHttp.send(null) 
    }, 
    getElementContent: function () { 
        vz.genContainer(); 
        var a = window.opera || vz.ie6SSL ? { 
            src: 'blank.htm' 
        } : null; 
        this.iframe = vz.createElement('iframe', a, { 
            position: 'absolute', 
            left: '-9999px' 
        }, vz.container); 
        try { 
            this.loadHTML() 
        } catch (e) { 
            var b = this; 
            setTimeout(function () { 
                b.loadHTML() 
            }, 1) 
        } 
    }, 
    loadHTML: function () { 
        var s = this.cachedGet || this.xmlHttp.responseText; 
        if (this.pre) vz.cachedGets[this.src] = s; 
        if (!vz.ie || vz.ieVersion() >= 5.5) { 
            s = s.replace(/\s/g, ' '); 
            s = s.replace(new RegExp('<link[^>]*>', 'gi'), ''); 
            s = s.replace(new RegExp('<script[^>]*>.*?</script>', 'gi'), ''); 
            if (this.iframe) { 
                var a = this.iframe.contentDocument || this.iframe.contentWindow.document; 
                a.open(); 
                a.write(s); 
                a.close(); 
                try { 
                    s = a.getElementById(this.id).innerHTML 
                } catch (e) { 
                    try { 
                        s = this.iframe.document.getElementById(this.id).innerHTML 
                    } catch (e) {} 
                } 
                vz.container.removeChild(this.iframe) 
            } else { 
                s = s.replace(new RegExp('^.*?<body[^>]*>(.*?)</body>.*?$', 'i'), '$1') 
            } 
        } 
        vz.getElementByClass(this.content, 'DIV', 'highslide-body').innerHTML = s; 
        this.onLoad(); 
        for (var x in this) this[x] = null 
    } 
}; 
var vzExpander = vz.Expander; 
vz.addEventListener(document, 'mousedown', vz.mouseClickHandler); 
vz.addEventListener(document, 'mouseup', vz.mouseClickHandler); 
vz.addEventListener(window, 'load', vz.preloadImages); 
vz.addEventListener(window, 'load', vz.preloadAjax);
 
