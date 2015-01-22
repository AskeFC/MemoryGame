;(function mainApp(w, d) {
    
    "use strict";
    
    var totalCards = 8,
        setStyle = "zocial",
        turned = {},
        symbols = [],
        iDs = {
            cardList    : null,
            gameSize    : null,
            cardStyle   : null
        },
        fonts = {
            animals      : [[33,126], [167], [196], [214], [220], [223], [228], [232,233], [246], [252]],
            birds        : [[33,126]],
            butterfly    : [[33,90], [97,122]],
            crawlers     : [[33,62], [64,94], [97,122], [8208]],
            DavysDingbats: [[33,126], [161,165], [167], [169,172], [174], [176,177], [181,182], [186], [193,194], [197], [199,200], [202,207], [210,212], [216,217], [219], [223], [229,231], [247], [305], [338,339], [402], [729,730], [770,771], [931], [937], [960], [8211,8212], [8216], [8218], [8220], [8222], [8224,8226], [8230], [8240], [8249,8250], [8482], [8706], [8710], [8719], [8725], [8729,8730], [8734], [8747], [8776], [8800], [8804,8805], [9674], [61440,61442]],
            Dingleberries: [[33,126], [166], [171], [187], [8364]],
            dingosaurs   : [[33,126]],
            dogs         : [[33,122], [894]],
            efon         : [[33,126], [8208]],
            famousfaces  : [[33,126]],
            flowers      : [[48,57], [65,90], [97,122]],
            hearts       : [[33,122], [173]],
            icomoon      : [[59648,60138]],
            music        : [[33], [35,37], [40,41], [58,126], [163,172], [174,182], [185,190], [192,194], [197,198], [200,203], [207,222], [224,237], [239,242], [244,247], [250,251], [253,254], [339], [353], [8482], [339]],
            poponex      : [[33], [48,57], [63], [65,90], [97,122], [8216,8217], [8220,8221]],
            stars        : [[65,90], [97,122]],
            zocial       : [[33,126], [163], [199] ,[201,202], [209] ,[214], [220,221], [224,229] ,[231], [233]],
            socialico    : [[33], [36], [38], [40,41], [44,58], [63,90], [97,122]],
            socialicoPlus: [[33], [36], [38], [40,41], [44,58], [63,90], [97,122]],
            fauxsnow     : [[33,126]],
        },
    
    
        getById = function getById(tmp) {
            var id = tmp || null;
            return d.getElementById(id) || false;
        },
        checkData = function checkData(tmp) {
            var data = tmp || null;
            return ((data === null) || (data === "") || (data === undefined)) ? false : true;
        },
        isElmnt = function isElmnt(tmp) {
            var obj = tmp || null;
            if(checkData(obj) && (obj.nodeType === 1)) {
                return true;
            };
            return false;
        },
        emptyElement = function emptyElement(tmp) {
            if (isElmnt(tmp)) {
                var elem = '', obj = tmp;
                while (elem = obj.lastChild) { obj.removeChild(elem); };
            };
            return;
        },
        emptyArray = function emptyArray(tmp) {
            var arr = tmp || null;
            if(!checkData(arr)) { return; };
            while(arr.length) {
                arr.pop();
            };
        },
        
        
        shuffleSyms = function shuffleSyms(o) {
            var t = o;
            for(var j, x, i = t.length; i; j = Math.floor(Math.random() * i), x = t[--i], t[i] = t[j], t[j] = x);
            return t;
        },
        delDups = function delDups(tmp) {
            var seen = {}, out = [], a = tmp, j = 0;
            for(var i = 0, iEnd = a.length; i < iEnd; i++) {
                 var item = a[i];
                 if(seen[item] !== 1) {
                       seen[item] = 1;
                       out[j++] = item;
                 };
            };
            return out;
        },
        genSyms = function genSyms() {
            var fname = setStyle || "zocial", chosen = fonts[fname];
            for(var i = 0, iEnd = chosen.length; i < iEnd; ++i) {
                var tmp = chosen[i], c = tmp.length;
                if(1 === c) {
                    symbols.push(tmp);
                } else {
                    for(var c = tmp[0], cEnd = tmp[1]; c < cEnd; ++c) {
                        symbols.push(c);
                    };
                };
            };
            symbols = shuffleSyms(delDups(symbols));
        },
        makeCard = function makeCard(tmp) {
            var li = d.createElement("li"), div = d.createElement("div"), char = tmp;
            li.dataset.charcode = char;
            li.appendChild(div);
            div = d.createElement("div");
            div.appendChild(d.createTextNode(String.fromCharCode(char)));
            li.appendChild(div);
            return li;
        },
        genCards = function genCards() {
            var tmp = d.createDocumentFragment(), iEnd = totalCards / 2;
            for(var i = 0, c = iEnd - 1; i < iEnd; ++i, --c) {
                tmp.appendChild(makeCard(symbols[i]));
                tmp.appendChild(makeCard(symbols[c]));
            };
            for(var i = totalCards; i >= 0; --i) {
                tmp.appendChild(tmp.childNodes[Math.random() * i | 0]);
            };
            emptyElement(iDs.cardList);
            iDs.cardList.appendChild(tmp);
        },
        checkWon = function checkWon() {
            var tmp = iDs.cardList.children, iEnd = iDs.cardList.children.length, count = 0;
            for(var i = 0; i < iEnd; ++i) {
                if(tmp[i].classList.contains("found")) { ++count; };
            };
            if(count === iEnd) {
                alert("you WON!");
            };
        },
        refreshCard = function refreshCard(tmp) {
            var elm = tmp || null;
            if(!isElmnt(elm)) { return; };
            var newone = elm.cloneNode(true);
            elm.parentNode.replaceChild(newone, elm);
        },
        
        
        cardFound = function cardFound(event) {
            event.stopPropagation();
            var obj = this || event.target;
            if(!isElmnt(obj)) { return; };
            obj.className = "found";
            refreshCard(obj);
            checkWon();
        },
        transEndEvt = function transEndEvt(tmp) {
            var obj = tmp || null;
            if(!isElmnt(obj)) { return; };
            obj.addEventListener("transitionend", cardFound, false);
            obj.addEventListener("webkitTransitionEnd", cardFound, false);
            obj.addEventListener("OTransitionEnd", cardFound, false);
            obj.addEventListener("otransitionend", cardFound, false);
            obj.addEventListener("MSTransitionEnd", cardFound, false);
        },
        turnBack = function turnBack(key, event) {
            event.stopPropagation();
            var obj = this || event.target, card = key;
            if(!isElmnt(obj)) { return; };
            delete turned[card];
            obj.className = "";
            refreshCard(obj);
        },
        animEndEvt = function animEndEvt(tmp, key) {
            var obj = tmp || null, card = key;
            if(!isElmnt(obj)) { return; };
            obj.addEventListener("animationend", function(event) { turnBack(card, event); }, false);
            obj.addEventListener("webkitAnimationEnd", function(event) { turnBack(card, event); }, false);
            obj.addEventListener("OAnimationEnd", function(event) { turnBack(card, event); }, false);
            obj.addEventListener("oanimationend", function(event) { turnBack(card, event); }, false);
            obj.addEventListener("MSAnimationEnd", function(event) { turnBack(card, event); }, false);
        },
        clickCard = function clickCard(event) {
            event.stopPropagation();
            var div = event.target, li = div.parentNode, card = li.dataset.charcode, len = Object.keys(turned).length;
            if(!(li.classList.contains("found")) && !(li.classList.contains("turnCard")) && (len < 2)) {
                li.className = "turnCard";
                if(turned[card]) {
                    transEndEvt(li);
                    turned[card].className = "found";
                    refreshCard(turned[card]);
                    delete turned[card];
                } else {
                    turned[card] = li;
                    animEndEvt(li, card);
                };
            };
        },
        restart = function restart(event) {
            event.stopPropagation();
            var cL = iDs.cardList, cS = iDs.cardStyle, siz = cS.options[cS.selectedIndex].dataset.size || "3rem";
            cL.style.fontSize = siz;
            cL.style.fontFamily = setStyle = cS.value || "zocial";
            totalCards = iDs.gameSize.value || 8;
            emptyArray(symbols);
            genSyms();
            genCards();
            // IE6 leaks through garbage collection when clearing an object by replacing with new empty one
            turned = {};
        },
        onReady = function onReady(event) {
            event.stopPropagation();
            d.removeEventListener("DOMContentLoaded", onReady);
            var gS = iDs.gameSize = getById("gameSize"), cS = iDs.cardStyle = getById("cardStyle"), cL = iDs.cardList = getById("cardList");
            gS.addEventListener("change", restart, false);
            cS.addEventListener("change", restart, false);
            cL.addEventListener("click", clickCard, false);
            if ("createEvent" in d) {
                var evt = d.createEvent("HTMLEvents");
                evt.initEvent("change", false, true);
                cS.dispatchEvent(evt);
            }
            else {
                cS.fireEvent("onchange");
            };
        };
    
    d.addEventListener("DOMContentLoaded", onReady, false);
    
}(window, document));