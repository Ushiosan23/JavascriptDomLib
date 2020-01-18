((w, d) => {
	
	// ---------------------------------------------------
	//                      WINDOW
	// ---------------------------------------------------
	
	w.on = w.addEventListener.bind(w);   // Like addEventListener
	w.$ = d.querySelector.bind(d);      // Like document.querySelector
	w.$$ = d.querySelectorAll.bind(d);   // Like document.querySelectorAll
	
	/**
	 * Get type var in lower case.
	 * @param obj
	 * @returns {string}
	 * @example typeOf([]) => array
	 * @example typeOf({}) => object
	 * @example typeOf(true) => boolean
	 */
	w.typeOf = obj => ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLocaleLowerCase();
	
	/**
	 * Verify if object is html
	 * @param obj
	 * @returns {boolean}
	 * @example isHtml($("body")) => true
	 * @example isHtml([]) => false
	 */
	w.isHtml = obj => /^html([\w]*)element/.test(typeOf(obj));
	
	/**
	 * Verify if object is window.
	 * @param obj
	 * @returns {boolean}
	 */
	w.isWindow = obj => obj !== null && obj === obj.window;
	
	/**
	 * Get object window.
	 * @param obj
	 * @returns {boolean|Window}
	 */
	w.getWindow = obj => isWindow(obj) ? obj : obj.nodeType === 9 && obj.defaultView;
	
	/**
	 * Get offset of node element.
	 * @param obj
	 * @returns {null|{top: number, left: number}}
	 * @example offset($("body")) => {top: ##, left: ##}
	 * @example offset([]) => null
	 */
	w.offset = obj => {
		if (!isHtml(obj))
			return null;
		
		let docElement, win,
			box = {top: 0, left: 0},
			doc = obj && obj.ownerDocument;
		
		docElement = doc.documentElement;
		
		if (typeof obj.getBoundingClientRect !== typeof undefined)
			box = obj.getBoundingClientRect();
		
		win = getWindow(doc);
		
		return {
			top: box.top + win.pageYOffset - docElement.clientTop,
			left: box.left + win.pageXOffset - docElement.clientLeft
		}
	};
	
	/**
	 * Parse to Json string the actual object
	 * @param obj
	 * @returns {string|null}
	 */
	w.objToJson = obj => {
		if (typeof obj !== 'object')
			return null;
		
		return JSON.stringify(obj, null, 4);
	};
	
	/**
	 * Check if object is null
	 *
	 * @param obj
	 * @param replace
	 * @returns {boolean}
	 */
	w.isNull = (obj, replace = null) => obj === null ? replace : obj;
	
	// ---------------------------------------------------
	//                      STRING
	// ---------------------------------------------------
	
	/**
	 * Verify if text is json.
	 * @returns {boolean}
	 */
	String.prototype.isJson = function () {
		try {
			JSON.parse(this);
		} catch (_) {
			return false;
		}
		return true;
	};
	
	/**
	 * Parse text to object.
	 * This verify if text is Json format.
	 * @returns {null|Object}
	 */
	String.prototype.parseJson = function () {
		return this.isJson() ? JSON.parse(this) : null;
	};
	
	/**
	 * Parse text to int.
	 * @param radix
	 * @returns {number}
	 */
	String.prototype.toInt = function (radix = null) {
		return parseInt(this, radix);
	};
	
	// ---------------------------------------------------
	//                      NUMBER
	// ---------------------------------------------------
	
	/**
	 * Change number to radix number.
	 * @param radix (2 - 36)
	 * @returns {string}
	 * @example (120).radix(2) => 1111000 (binary)
	 * @example (120).radix(8) => 170 (octal)
	 * @example (120).radix(12) => a0 (hexadecimal)
	 * @example (120).radix(0) => error
	 */
	Number.prototype.radix = function (radix = null) {
		return this.toString(radix);
	};
	
	// ---------------------------------------------------
	//                      ELEMENT
	// ---------------------------------------------------
	
	/**
	 * Like Element.querySelector
	 * @param selectors
	 * @returns {Element | *}
	 */
	Element.prototype.$ = function (selectors) {
		return this.querySelector(selectors);
	};
	
	/**
	 * Like Element.querySelectorAll
	 * @param selectors
	 * @returns {NodeListOf<HTMLElementTagNameMap[*]> | NodeListOf<Element> | NodeListOf<SVGElementTagNameMap[*]>}
	 */
	Element.prototype.$$ = function (selectors) {
		return this.querySelectorAll(selectors);
	};
	
	/**
	 * Apply styles an actual element.
	 * @param styles
	 * @returns {Element}
	 */
	Element.prototype.css = function (styles = null) {
		if (typeOf(styles) !== 'object')
			return this;
		
		let defaultStyles = window.getComputedStyle(this);
		
		for (let style in styles) {
			for (let local in defaultStyles) {
				if (style === local)
					this.style[local] = styles[local];
			}
		}
		
		return this;
	};
	
	/**
	 * Remove styles an actual element
	 * @param styles
	 * @returns {Element}
	 */
	Element.prototype.quitCss = function (...styles) {
		let defaultStyles = window.getComputedStyle(this);
		
		styles.forEach(style => {
			if (style in defaultStyles)
				this.style[style] = null;
		});
		
		return this;
	};
	
	/**
	 * Get specify style.
	 * @param styleName
	 * @returns {null|string|CSSStyleDeclaration}
	 */
	Element.prototype.getStyle = function (styleName = null) {
		let defaultStyles = window.getComputedStyle(this);
		
		if (styleName === null)
			return defaultStyles;
		
		if (styleName in defaultStyles)
			return defaultStyles[styleName];
		
		return null;
	};
	
	/**
	 * Add class attribute. You can add multiple classes.
	 * @param classNames
	 * @returns {Element}
	 */
	Element.prototype.addClass = function (...classNames) {
		let localClasses = Array.from(this.classList);
		
		classNames.forEach(nodeClass => {
			if (localClasses.indexOf(nodeClass) === -1)
				this.classList.add(nodeClass);
		});
		
		return this;
	};
	
	/**
	 * Remove multiple class name.
	 * @param classNames
	 * @returns {Element}
	 * @example $("body").removeClass("styleBody", "container", ...)
	 */
	Element.prototype.removeClass = function (...classNames) {
		let localClasses = Array.from(this.classList);
		
		classNames.forEach(nodeClass => {
			if (localClasses.indexOf(nodeClass) !== -1)
				this.classList.remove(nodeClass);
		});
		
		if (this.classList.length === 0)
			this.removeAttribute("class");
		
		return this;
	};
	
	/**
	 * Verify if class attribute exists in node
	 * @param className
	 * @returns {boolean}
	 */
	Element.prototype.classExist = function (className) {
		let localClasses = Array.from(this.classList);
		return localClasses.indexOf(className) !== -1;
	};
	
	/**
	 * Toggle multiple classes. If class exists remove class, but if not exists add the class.
	 * @param classNames
	 * @returns {Element}
	 */
	Element.prototype.toggleClass = function (...classNames) {
		let localClasses = Array.from(this.classList);
		
		classNames.forEach(nodeClass => {
			if (localClasses.indexOf(nodeClass) === -1)
				this.classList.add(nodeClass);
			else
				this.classList.remove(nodeClass);
		});
		
		if (this.classList.length === 0)
			this.removeAttribute("class");
		
		return this;
	};
	
	/**
	 * Set multiple attributes.
	 * @param attributes
	 * @returns {Element}
	 * @example $("body").setAttributes({class: "container body example", "data-type": 9})
	 */
	Element.prototype.setAttributes = function (attributes = null) {
		if (typeOf(attributes) !== 'object' || attributes === null)
			return this;
		
		for (let attr in attributes) {
			if (attr === 'style' || attr === 'css')
				this.css(attributes[attr]);
			else
				this.setAttribute(attr, attributes[attr]);
		}
		
		return this;
	};
	
	/**
	 * Remove multiple attributes.
	 * @param attributes
	 * @returns {Element}
	 * @example $("body").removeAttributes("class", "style", "data-type")
	 */
	Element.prototype.removeAttributes = function (...attributes) {
		let localAttributes = this.attributes;
		
		attributes.forEach(nodeAttribute => {
			if (nodeAttribute in localAttributes)
				this.removeAttribute(nodeAttribute);
		});
		
		return this;
	};
	
	/**
	 * Remove all attributes.
	 * Write which value can be persist.
	 * @param saveValues
	 * @returns {Element}
	 */
	Element.prototype.purgeAttributes = function (...saveValues) {
		let localAttributes = this.attributes,
			arrAttributes = Array.from(localAttributes);
		
		arrAttributes.forEach(objAttribute => {
			if (saveValues.indexOf(objAttribute.name) === -1)
				this.removeAttribute(objAttribute.name);
		});
		
		return this;
	};
	
	/**
	 * Insert current node in target node.
	 * @param node
	 * @returns {Element}
	 */
	Element.prototype.insertInto = function (node) {
		if (isHtml(node))
			node.appendChild(this);
		
		return this;
	};
	
	/**
	 * Remove all children nodes inside them.
	 *
	 * @returns {Element}
	 */
	Element.prototype.clearContent = function () {
		let nodes = Array.from(this.children);
		
		nodes.forEach(el => {
			el.remove();
		});
		
		return this;
	};
	
	/**
	 * Set data attribute in current element.
	 * @param obj
	 * @returns {Element}
	 * @example $("body").setData({type: 9}) => <body data-type="9" />
	 */
	Element.prototype.setData = function (obj = null) {
		if (typeOf(obj) !== 'object' || obj === null)
			return this;
		
		for (let data in obj) {
			this.dataset[data] = obj[data];
		}
		
		return this;
	};
	
	/**
	 * Remove specify data name.
	 * @param dataNames
	 * @returns {Element}
	 */
	Element.prototype.removeData = function (...dataNames) {
		dataNames.forEach(dataName => {
			if (dataName in this.dataset)
				this.removeAttribute(`data-${dataName}`);
		});
		
		return this;
	};
	
	/**
	 * Verify if data exists
	 * @param dataName
	 * @returns {boolean}
	 */
	Element.prototype.dataExists = function (dataName) {
		return dataName in this.dataset;
	};
	
	/**
	 * Return selected data.
	 * @param dataName
	 * @returns {string | undefined|null}
	 */
	Element.prototype.getData = function (dataName) {
		if (this.dataExists(dataName))
			return this.dataset[dataName];
		
		return null;
	};
	
	/**
	 * Like Element.addEventListener.
	 * @param type
	 * @param listener
	 * @param options
	 */
	Element.prototype.on = function (type, listener, options = false) {
		this.addEventListener(type, listener, options);
		return this;
	};
	
	// ---------------------------------------------------
	//                      NODE LIST
	// ---------------------------------------------------
	
	/**
	 * Apply css styles to multiple nodes.
	 * @param styles
	 * @returns {NodeList}
	 */
	NodeList.prototype.css = function (styles = null) {
		this.forEach(node => {
			node.css(styles);
		});
		
		return this;
	};
	
	/**
	 * Apply multiple attributes to multiple nodes.
	 * @param attributes
	 * @returns {NodeList}
	 */
	NodeList.prototype.setAttributes = function (attributes = null) {
		this.forEach(node => {
			node.setAttributes(attributes);
		});
		
		return this;
	};
	
	/**
	 * Add event listener to multiple nodes.
	 * @param type
	 * @param listener
	 * @param options
	 * @returns {NodeList}
	 */
	NodeList.prototype.on = function (type, listener, options = false) {
		this.forEach(node => {
			node.on(type, listener, options);
		});
		
		return this;
	};
	
	// ---------------------------------------------------
	//                      DOCUMENT
	// ---------------------------------------------------
	
	d.on = d.addEventListener.bind(d); // Like document.addEventListener
	
	/**
	 * Create new node element.
	 * @param name
	 * @param options
	 * @returns {HTMLElement}
	 * @example document.createCustomElement("div") => <div />
	 * * @example document.createCustomElement("canvas", {attr: {width: 120, height: 120}}) => <canvas width="120" height="120"/>
	 */
	Document.prototype.createCustomElement = function (name, options = null) {
		let nameN = name.trim(),
			node = document.createElement(nameN);
		
		if (typeOf(options) !== 'object' || options === null)
			return node;
		
		let css = options.css || null,
			attr = options.attr || null,
			into = options.into || null,
			inText = options.innerText || null,
			inHtml = options.innerHTML || null;
		
		if (css !== null) node.css(css);
		if (attr !== null) node.setAttributes(attr);
		if (inText !== null) node.innerText = inText;
		if (inHtml !== null) node.innerHTML = inHtml;
		if (into !== null) node.insertInto(into);
		
		return node;
	}
	
	
})(window, document);