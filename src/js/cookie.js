var merge = require('lodash.merge');

class Cookie {
    /**
     *  Handle Cookie logical
     *  @see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie/Simple_document.cookie_framework
     */

    static getItem(sKey) {
        if (!sKey) { return null; }
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    };

    static setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                    /*
                    Note: Despite officially defined in RFC 6265, the use of `max-age` is not compatible with any
                    version of Internet Explorer, Edge and some mobile browsers. Therefore passing a number to
                    the end parameter might not work as expected. A possible solution might be to convert the the
                    relative time to an absolute time. For instance, replacing the previous line with:
                    */
                    /*
                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; expires=" + (new Date(vEnd * 1e3 + Date.now())).toUTCString();
                    */
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:
                    sExpires = "; expires=" + vEnd.toUTCString();
                    break;
            }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
    }

    static removeItem(sKey, sPath, sDomain) {
        if (!this.hasItem(sKey)) { return false; }
        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
        return true;
    }

    static hasItem(sKey) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    }

    static keys() {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
        return aKeys;
    }

}

class CookieWarning {

    constructor() {
        this.options = {};
    }

    init(options) {
        this.options = merge(CookieWarning.defaults, options);

        if(this.isCookieSet()) {
            return false;
        }

        this.insertCookieWarning();
        this.addEventListener();
        this.fadeInOut(true);

    }

    /**
     * insert cookie warning into dom
     */
    insertCookieWarning() {
        const parser = new DOMParser();
        const el = parser.parseFromString(this.getTemplate(), "text/html");
        this.element = el.body.firstChild;
        document.body.appendChild(this.element);
    }

    getTemplate() {
        return this.options.template(this.options.tplWording, this.options.tplOptions);
    }

    /**
     *  check if cookie is set
     *  @returns {boolean}
     */
    isCookieSet() {

        return Cookie.hasItem(this.options.cookieName);
    }

    fadeInOut(fade) {

        if(!fade) {
            this.element.classList.remove('no-accepted');
        } else {
            this.element.classList.add('no-accepted');
        }
    }

    /**
     *  Remove Subdomain
     * @param url
     * @returns {string}
     */
    parseUrl(url) {
        const local = new RegExp(this.options.localUrls);
        const ipv4UrlRegex = new RegExp('([0-9]{1,3}\.){3}[0-9]{1,3}');
        const ipv6UrlRegex = new RegExp('(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}');

        if(ipv4UrlRegex.test(url) || ipv6UrlRegex.test(url) || local.test(url)) {
            return url;
        }

        var urlSplitted = url.split('.');
        return urlSplitted[urlSplitted.length-2] + '.' + urlSplitted[urlSplitted.length-1];
    }

    /**
     *   Added event listener on buttons
     *
     */
    addEventListener() {

        let acceptBtn = this.element.getElementsByClassName(this.options.tplOptions.btnAcceptClass);
        let declineBtn = this.element.getElementsByClassName(this.options.tplOptions.btnDeclineClass);

        for (let i = 0; i < acceptBtn.length; i++) {
            acceptBtn[i].addEventListener('click', (e) => {
                this.acceptCookie();
            })
        }

        for (let i = 0; i < declineBtn.length; i++) {
            declineBtn[i].addEventListener('click', (e) => {
                this.declineCookie();
            })
        }

    }

    /**
     * handle the behaviour on accepting
     */
    acceptCookie() {
        this.setCookie();
        this.fadeInOut(!this.isCookieSet());
    }

    /**
     *   handle the behaviour on decline the cookie warning
     */
    declineCookie() {
        eval(this.options.declineAction);
    }

    setCookie() {
        Cookie.setItem(this.options.cookieName, this.options.value, this.options.duration, this.options.path, this.parseUrl(window.location.hostname));
    }

}

CookieWarning.defaults = {
    localUrls: "(localhost)", // regex string
    cookieName: "kr-cookie-acc",
    declineAction: "console.log('user declined cookie');",
    duration: "31536e3",
    value: "true",
    path: "/",
    tplWording: {
        content: "Diese Website verwendet Cookies. Indem Sie die Website und ihre Angebote nutzen und weiter navigieren, akzeptieren Sie diese Cookies. Dies können Sie in Ihren Browsereinstellungen ändern.",
        btnAccept: "Akzeptieren",
        btnDecline: "",
        btnInfo: "",
    },
    tplOptions: {
        infoLink: {
          target: "",
          url: ""
        },
        position: "bottom",
        btnAcceptClass: "cookie-warning__accept",
        btnDeclineClass: "cookie-warning__decline",
        btnInfoClass: "cookie-warning__info"
    },
    template: function(wording, options) {
        return `<div class="cookie-warning ${options.position}">
                    <div class="cookie-warning__inner ">
                        <p>${ wording.content }</p>
                    </div>
                     <div class="cookie-warning__footer">
                        ${ wording.btnDecline.length > 0 ? `<button class="${ options.btnDeclineClass } cookie-warning__btn cookie-warning__button--secondary">${ wording.btnDecline }</button>` : ''}
                        <button class="${ options.btnAcceptClass } cookie-warning__btn cookie-warning__button--primary">${ wording.btnAccept }</button>
                        ${ wording.btnInfo.length > 0 ? `<a href="${ options.infoLink.url}" target="${ options.infoLink.target}" 
                                                        class="${ options.btnInfoClass } cookie-warning__btn cookie-warning__button--primary">${ wording.btnInfo }</a>` : ''
                        }
                    </div>
                 </div>
        `;
    }
};

export default CookieWarning;