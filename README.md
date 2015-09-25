# rainbowify
This is a small jQuery plugin use for text decoration. 

## Usage

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	```
2. Include plugin's code:

	```html
	<script src="path/to/rainbow.js"></script>
	```

3. Call the plugin:

	```javascript
	$("#element").rainbow();
	```
4. Options:

			Option  		 | Default Value   | Avaliable Value             |
			------------ | --------------- | --------------------------- |
			`phase`      | [4.4,2.9,0.3]   | 0 ~ 2PI or 0deg ~360deg     |
			`brightness` | 128             | 0 ~ 255                     |
			`animate`		 | `false`         | `boolean`                   |
			`reverse`		 | `false`         | `boolean`                   |
			`duration`   | 2               |                             |
			`mode`       | `linear`        | `steppy`, `linear`          |

For more example, please visit (https://rainbowify.herokuapp.com)