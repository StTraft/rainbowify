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

			Option  		 | Default Value | Avaliable Value |
			------------ | ------------- | --------------- |
			`phaseShift` | `2`           | `0 ~ 2PI`       |
			`brightness` | `128`         | `0 ~ 255`       |
			`steps`			 | `null`        | ``              |
			`animate`		 | `true`        | `boolean`       |
			`period`		 | `3`           | `speed cntl`    |
			`mode`       | `linear`      | `steppy`        |