# Javascript Library DOM

A javascript Library for General purposes

___
#### Selectors
```javascript
// Single selector
let classSelector   = $('.selector');
let idSelector      = $('#selector');

// Multiple selectors
let multipleSelector = $$('.selectors');
```

#### CSS styles
```javascript
let selector = $('.selector'); // like document.querySelector
let multiple = $$('.multipleSelectors'); // like document.querySelectorAll

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

#### Attributes
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

// Result
// <input type='text' class='container modal direction' value='value attribute' data-custom='custom-data' style=''>
```