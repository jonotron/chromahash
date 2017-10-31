(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["chromahash"] = factory();
	else
		root["chromahash"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = chromahash

function djb2(str) {
  var hash = 5381
  for (i = 0; i < str.length; i++) {
    char = str.charCodeAt(i)
    hash = (hash << 5) + hash + char /* hash * 33 + c */
  }
  return hash
}

// simple modulo hash to convert an int to a number from 0 - 255 (or so)
function to256ish(i) {
  // djb2 uses 33 as it's prime... should we then use k = 25 (coprime to 33),
  // m = 10 to get a 256ish number? k = 251 seems to work
  // does k even need to be prime here?
  const k = 5
  const m = 256 / k

  return (Math.abs(i) % k) * m
}

// convert a digit (base 10) to hex (base 16) left padded with 0
function toHex(d) {
  return ('0' + Number(d).toString(16)).slice(-2)
}

function chromahash(str) {
  // we need to prefix the string to ensure different values for r/g/b but also
  // if we only suffix we seem to get clustering around purple and yellow
  const rStr = 'red' + str
  const gStr = 'green' + str
  const bStr = 'blue' + str

  const rHex = toHex(to256ish(djb2(rStr)))
  const gHex = toHex(to256ish(djb2(gStr)))
  const bHex = toHex(to256ish(djb2(bStr)))

  return `${rHex}${gHex}${bHex}`
}


/***/ })
/******/ ]);
});