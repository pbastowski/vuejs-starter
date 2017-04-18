/**
 * Google Analytics here
 *
 * ******  BIG WARNING  *******
 *
 * Make sure you turn off all content blockers when testing GA, otherwise
 * you might waste hours looking for why it's not working ;)
 *
 */

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

let tag = /(-ite\.|-ute\.)/i.test(location.origin)                     ? 'UA-YOURTAG-2'
        : /(localhost|127\.0\.0\.0|192\.168\.)/i.test(location.origin) ? 'UA-YOURTAG-1'
                                                                       : 'UA-YOURTAG-3'
console.log('Analytics for ', tag)

ga('create', tag, 'auto')
ga('send', 'pageview')


/**
 * Later, when you want to track Clicks, use the following code
 *
 *      ga('send', 'event', 'button', 'click', year);
 *  or
 *      ga('send', 'event', 'click', year.text);
 *
 *  And if you're going to redirect to a url directly after the ga() call
 *  then wrap the redirect in a setTimeout, see below, to ensure the ga()
 *  call works in all browsers. Without it some clicks will be missed.
 *
 *      function handleClick() {
 *          ga('send', 'event', 'click', 'lalala');
 *          setTimeout(()=>location.href = url, 100)
 *      }
 *
 */
