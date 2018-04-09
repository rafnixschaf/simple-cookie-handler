# Cookie

* Load `dist/cookie.min.js` and `cookie.min.css` 

* Loading via html
```
<script src="simple-cookie-handler/dist/cookie.min.js">
<script>
    new CookieWarning().init();
</script>
```

* Usage with webpack
```
import 'simple-cookie-handler/dist/cookie.min.css
```

```
const CookieWarning = require('simple-cookie-handler/dist/cookie.min');
new CookieWarning().init();
```