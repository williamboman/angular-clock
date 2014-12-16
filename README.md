![angular-clock](angular-clock.gif)

*Useful clock directives & services for Angular*

## Dependencies
- [angular](https://github.com/angular/angular.js) ~1

## Install
### Bower
```bash
$ bower install angular-clock --save
```

Then simply just include the JavaScript file in your document!

## Usage
To use this Angular module, add `wb.angularClock` as a dependency in your Angular module.
```js
angular.module('yourApp', [..., 'wb.angularClock']);
```

### Directives
###### liveTime
Displays the current time, updating each second.

`<ANY live-time [time-locale="en"] [time-format="DD.MM.YYYY HH:mm:ss"]></ANY>`

### Configuration
You can configurate this module through the `angularClock` provider. These are the default values;
- `format` - `DD.MM.YYYY HH:mm:ss`

  The default format which will be used as a global default when outputting text representations of a timestamp/date. To change this: `angularClock.setFormat()`.

- `locale` - `en`

  The default locale which will be used as a global default when outputting text representations of a date. To change this: `angularClock.setLocale()`.

## License
Licensed under the MIT license.

## Authors
**William Boman** <william@redwill.se>
