ngObelisk
=========

<img src="https://travis-ci.org/Wildhoney/ngObelisk.png?branch=master" alt="Travis CI" />
&nbsp;
<img src="https://badge.fury.io/js/ngobelisk.png" alt="NPM Version" />

<a href="https://github.com/nosir/obelisk.js">Obelisk</a> is a very useful JavaScript library for creating isometric shapes. However, animations are difficult to achieve. That's where ngObelisk attempts to make things easier by utilising the Angular.js runtime loop to manage animations!

Getting Started
---------

You can follow the <a href="https://github.com/nosir/obelisk.js#getting-started">Obelisk "Getting Started"</a> for adding objects onto your canvas, because `ngObelisk` doesn't alter how you interact with Obelisk.

However, you'll need to inject `obelisk` into your directive that you're using for your Obelisk doodles.

```javascript
var object = pixelView.renderObject(cube, p3d);
```

`ngObelisk` returns the object to manipulate from the `renderObject` method &ndash; this is how the animations work in `ngObelisk`.

Therefore with `object` you can now invoke methods to animate your canvas &ndash; try `object.setX(200)` to change the dimension of your newly rendered cube.