# Javascript Library DOM

A javascript Library for General purposes

___
## Selectors
```javascript
// Single selector
let classSelector   = $('.selector'); // like document.querySelector
let idSelector      = $('#selector'); 

// Multiple selectors
let multipleSelector = $$('.selectors'); // like document.querySelectorAll

// Access to children
let childSelector       = classSelector.$('.children'),
    listChildSelector   = classSelector.$$('.list');
```

## CSS styles

#### Add styles
```javascript
let selector = $('.selector');
let multiple = $$('.multipleSelectors');

// Apply css styles for one selector
selector.css({
    padding: '20px',
    margin: '10px',
    background: '#242424',
    boxSizing: 'border-box'
});

// Apply css styles for multiple selectors
// It is more easy than use loops
multiple.css({
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexFlow: 'row wrap'
});
```
Result
```html
<!-- Simple example -->
<div style="padding: 20px; margin: 10px; background: #242424; box-sizing: border-box;"></div>
```

#### Remove styles
```javascript
let selector = $('.selector');

// Remove one or more styles
selector.quitCss('padding', 'margin', 'background', 'boxSizing');
```

#### Get style
```javascript
let selector = $('.selector');
// if argument is null, return all styles
// if style isn't exists, return null

let valueStyle = selector.getStyle('padding');
```

## Attributes

#### Set attributes
```javascript
let selector = $('.selector');

selector.setAttributes({
    css: {}, // It works just like the previous one.
    // style: {}, // It's another form to add styles
    type: 'text',
    class: 'container modal direction', // Add class attribute
    value: 'value attribute', // Attribute for form nodes
    'data-custom': 'custom data', // Add custom data types
});
```
Result
```html
<input type="text" style="" value="value attribute" class="container modal direction" data-custom="custom data">
```

#### Remove attributes
```javascript
let selector = $('.selector');

// Delete node attributes
// You can use one or more arguments
selector.removeAttributes('style', 'type', 'class', 'value');
```

#### Remove all attributes
```javascript
let selector = $('.selector');

// Remove all attributes
selector.purgeAttributes();
// You can use string arguments for save one or more attributes
selector.purgeAttributes('class', 'id');
// All attributes are removed, only those specified in the function's arguments are maintained.
```

## Class Attribute

#### Add class
```javascript
let selector = $('.selector');

// Add class
selector.addClass('container');
// Multiple classes
selector.addClass('container', 'modal', 'custom', 'chip');
```
Result
```html
<div class="container modal custom chip"></div>
```

#### Remove class
```javascript
let selector = $('.selector');

// Single mode
selector.removeClass('container');
// Multiple mode
selector.removeClass('container', 'modal', 'custom', 'chip');
```
Result
```html
<div></div>
```

#### Toggle class
```javascript
let selector = $('.selector');
let button = $('#ClickButton');

button.on('click', () => {
    // Single toggle
    selector.toggleClass('container');
    // multiple toggle
    selector.toggleClass('container', 'modal', 'custom', 'chip');
});
```

#### Class Exists
```javascript
let selector = $('.selector');

// Verify if class exists
if ( selector.classExist('nameClass') ) {
    // TODO: type your code here
}
```

## Data attributes

#### Insert data
```javascript
let selector = $('.selector');

// The syntax is similar to "css" function
selector.setData({
    value: 'information',
    version: '1.0'
});
```
Result
```html
<div data-value="information" data-version="1.0"></div>
```

#### Remove data
```javascript
let selector = $('.selector');

// You can remove one or more data
selector.removeData('value', 'version');
```
Result
```html
<div></div>
```