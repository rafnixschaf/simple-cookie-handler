# Cookie Warning Handler

DSGVO <3. Shows a cookie warning. If the user accepts the cookie warning, a cookie is written and the alert is no longer displayed.  

## Installing Package
* Loading package via  
npm: `npm install simple-cookie-handler -E`  
bower: `bower install simple-cookie-handler`  
yarn: `yarn add simple-cookie-handler --E`
* Load the files `simple-cookie-handler/dist/cookie.min.js` and `simple-cookie-handler/dist/cookie.min.css` 

### Loading via html
```
<link rel="stylesheet" href="[path-to-folder]simple-cookie-handler/dist/cookie.min.css">
<script src="[path-to-folder]simple-cookie-handler/dist/cookie.min.js">
<script>
    new CookieWarning().init(options);
</script>
```

### Usage with webpack

```
import 'simple-cookie-handler/dist/cookie.min.css';
const CookieWarning = require('simple-cookie-handler/dist/cookie.min');
new CookieWarning().init(options);
```  
Or
##### webpack.common.js
```
new webpack.ProvidePlugin({
        CookieWarning: 'exports-loader?CookieWarning!simple-cookie-handler/dist/cookie.min'
});
```
##### import.scss
```
@import "~simple-cookie-handler/dist/cookie.min.css";
```

##### main.js
```
new CookieWarning().init(options);
```



Options
======================  

**onAccept** 
 -------------------
`function` - will be triggered if cookie has been accepted  
_Default:_ function() {}

**localUrls**
 -------------------
`string regex` - regex string to detect local url  
_Default:_ localhost

**cookieName**
 -------------------
`string` - name of the cookie  
_Default:_ kr-cookie-acc
 
**declineAction**  
-------------------
`function` - evil eval function because dont know what to do with this option :)  
_Default:_ console.log('user declined cookie'); 

**duration**  
-------------------
`int` - duration the cookie exist  
_Default:_ 31536e3  
 
**value**  
-------------------
`string` - value of cookie  
_Default:_ true  
 
**path**  
-------------------
`string` - path for the cookie  
_Default:_ /  
 

**tplWording**  
-------------------
`object` - contains the template texts  
_Defaults:_  
  
**content**:   
`string` - cookie content
_Default:_  Diese Website verwendet Cookies. Indem (...)  

**btnAccept**   
`string` - contains accept button text  
_Default:_ Akzeptieren  

**btnDecline**  
`string` :  - contains decline button text
_Default:_   

**btnInfo**   
`string` - contains accept button text  
_Default:_ Mehr erfahren  
 
tplOptions
-------------------
`object` - contains the template options  
_Defaults:_

**infoLink**  
`object` - contains info link and target attribute  
_Default:_ target: "", url: ""

**position**  
`string` - position of the cookie warning  
_Default:_ bottom, accepted is: top, bottom

**btnAcceptClass**  
`string`  - class of the accept button  
_Default:_ cookie-warning__accept

**btnDeclineClass**:   
`string` - class of the decline button  
_Default:_ cookie-warning__decline

**btnInfoClass**:   
`string` - class of the info button (link)  
_Default:_ cookie-warning__info

 
**template**
======================

```javascript
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
```
