# Cookie

If the user accepts the cookie warning, a cookie is written and the alert is no longer displayed.  

## Installing Package
* Loading package via  
npm: `npm install simple-cookie-handler -E`  
bower `bower install simple-cookie-handler`  
yarn `yarn add simple-cookie-handler --E`
* Insert into your project the files `simple-cookie-handler/dist/cookie.min.js` and `simple-cookie-handler/dist/cookie.min.css` 

### Loading via html
```
<script src="simple-cookie-handler/dist/cookie.min.js">
<script>
    new CookieWarning().init(options);
</script>
```

### Usage with webpack

```
const CookieWarning = require('simple-cookie-handler/dist/cookie.min');
new CookieWarning().init(options);
```

## Options  

**cookieName**  
(string) - name of the cookie  
_Default:_ kr-cookie-acc

**position**  
(string) - position the the cookie warning top or bottom: top, bottom  
_Default:_ bottom
 
**btnClass**  
(string) - class of close element  
_Default:_ .cookie-close  
 
**duration**  
(int) - duration the cookie exist  
_Default:_ 31536e3  
 
**value**  
(string) - value of cookie  
_Default:_ true  
 
**path**  
(string) - path for the cookie  
_Default:_ /  
 
**tplContent**  
(string) - content for the cookie box  
_Default:_ Diese Website verwendet Cookies. Indem (...)  

**tplBtn**  
(string) - Close Button text  
_Default:_ Akzeptieren  
 
**template**

```javascript
template: function(content, btnText, position) {
         return  '<div class="cookie-warning '+ position + '">' +
             '   <div class="cookie--inner">' +
             '      <p>' + content +
             '      </p>' +
             '   </div>' +
             '   <div class="cookie--footer">' +
             '        <button class="cookie-close btn button__primary">'+ btnText +'</button>' +
             '   </div>' +
             '</div>'
             }
```