import CookieWarning from './cookie.js';


var cookie = new CookieWarning().init( { onAccept: function() { console.log("cookie accepted"); }, position: "bottom",  tplWording: {
        content: "Diese Website verwendet Coosieren, akönnen Sie in Ihren Browsereinstellungen ändern."} });