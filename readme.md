# Grid Layout Utils


## Demo
https://davidperis92.github.io/grid-layout-utils/


## Installation

```
> npm install grid-layout-utils
```



## Usage

Include grid-layout.css in your project or import grid-layout.scss to overwrite the  config.



## Classes

To use the classes follow the next syntax: 

gl- [media query (ex: phone)] - [css property (ex: template-cols)] - [count ex: 5]

```css
/* Examples */

@media (max-width: 767px) {
  .gl-phone-template-cols-5 {
    grid-template-cols: repeat(5, 1fr);
  }
}

.gl-row-6 {
  grid-row: span 6;
}

.gl-col-pos-6 {
  grid-column: 6;
}

.gl-col-full {
  grid-column: 1 / -1;
}
```



## Developers

use gulp to develop:

```
> gulp
```



## License

[MIT](https://opensource.org/licenses/MIT)
