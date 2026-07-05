/*!
 * Client Side Validations Simple Form JS (Default) - v19.0.0 (https://github.com/DavyJonesLocker/client_side_validations-simple_form)
 * Copyright (c) 2026 Geremia Taglialatela, Brian Cardarella
 * Licensed under MIT (https://opensource.org/licenses/mit-license.php)
 */
(function(global, factory) {
	typeof exports === "object" && typeof module !== "undefined" ? factory(require("@client-side-validations/client-side-validations")) : typeof define === "function" && define.amd ? define(["@client-side-validations/client-side-validations"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.ClientSideValidations));
})(this, function(_client_side_validations_client_side_validations) {
	//#region \0rolldown/runtime.js
	var __create = Object.create;
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __getProtoOf = Object.getPrototypeOf;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
			key = keys[i];
			if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: ((k) => from[k]).bind(null, key),
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
		value: mod,
		enumerable: true
	}) : target, mod));
	//#endregion
	_client_side_validations_client_side_validations = __toESM(_client_side_validations_client_side_validations);
	//#region src/utils.js
	const addClass = (element, customClass) => {
		if (customClass) element.classList.add(...customClass.split(" "));
	};
	const removeClass = (element, customClass) => {
		if (customClass) element.classList.remove(...customClass.split(" "));
	};
	//#endregion
	//#region src/index.js
	_client_side_validations_client_side_validations.default.formBuilders["SimpleForm::FormBuilder"] = {
		add: function(element, settings, message) {
			this.wrapper(settings.wrapper).add.call(this, element, settings, message);
		},
		remove: function(element, settings) {
			this.wrapper(settings.wrapper).remove.call(this, element, settings);
		},
		wrapper: function(name) {
			return this.wrappers[name] || this.wrappers.default;
		},
		wrappers: { default: {
			add(element, settings, message) {
				const wrapperElement = element.closest(`${settings.wrapper_tag}.${settings.wrapper_class.replace(/ /g, ".")}`);
				let errorElement = wrapperElement.querySelector(`${settings.error_tag}.${settings.error_class.replace(/ /g, ".")}`);
				if (!errorElement) {
					errorElement = document.createElement(settings.error_tag);
					addClass(errorElement, settings.error_class);
					errorElement.textContent = message;
					wrapperElement.appendChild(errorElement);
				}
				addClass(wrapperElement, settings.wrapper_error_class);
				errorElement.textContent = message;
			},
			remove(element, settings) {
				const wrapperElement = element.closest(`${settings.wrapper_tag}.${settings.wrapper_class.replace(/ /g, ".")}`);
				const errorElement = wrapperElement.querySelector(`${settings.error_tag}.${settings.error_class.replace(/ /g, ".")}`);
				removeClass(wrapperElement, settings.wrapper_error_class);
				if (errorElement) errorElement.remove();
			}
		} }
	};
	//#endregion
});
