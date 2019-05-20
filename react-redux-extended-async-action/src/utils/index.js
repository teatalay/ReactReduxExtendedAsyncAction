import { set, get, merge } from "lodash";
import { defaultDateFormat, defaultTimeFormat } from "../constants";

import moment from "moment";

export function isDefined(obj) {
  return obj !== undefined && obj !== null;
}

export function isDefinedAndNotEmpty(obj) {
  return obj !== undefined && obj !== null && obj !== "";
}

export function createURL(url, routes, queryObject) {
  return addQueryToURL(
    addRoutesToURL(
      url,
      typeof routes === "string" ? routes.split("/") : routes
    ),
    queryObject
  );
}

export function addRoutesToURL(url = "", routes) {
  if (!routes) return url;
  if (routes instanceof Array) {
    url = url.length
      ? url[url.length - 1] === "/"
        ? url
        : url.concat("/")
      : url;
    for (let index = 0; index < routes.length; index++) {
      const element = routes[index];
      if (isDefinedAndNotEmpty(element))
        url = url.concat(`${encodeURIComponent(element)}/`);
    }
    return url;
  }
  if (typeof routes === "object") {
    url = "/".concat(url);
    for (const key in routes) {
      if (routes.hasOwnProperty(key)) {
        const element = routes[key];
        if (isDefinedAndNotEmpty(element))
          url = url.concat(`${encodeURIComponent(element)}/`);
      }
    }
    return url;
  }
  return url;
}

export function addQueryToURL(url = "", queryObject = {}) {
  let queryAdded = false;
  for (const key in queryObject) {
    if (queryObject.hasOwnProperty(key)) {
      const element = queryObject[key];
      if (isDefinedAndNotEmpty(element)) {
        if (!queryAdded) {
          url = url.concat("?");
        }
        url = url.concat(
          `${queryAdded ? "&" : ""}${encodeURIComponent(
            key
          )}=${encodeURIComponent(element)}`
        );
        queryAdded = true;
      }
    }
  }
  return url;
}

export function serializeObjectWithDot(obj) {
  if (!obj || typeof obj !== "object") return obj;
  let serializedObject = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key];
      const isDotted = key.indexOf(".") !== -1;
      if (isDotted) set(serializedObject, key, element);
      else serializedObject[key] = element;
    }
  }
  return serializedObject;
}

export function getObjectFromString(valuePath, obj) {
  return get(obj, valuePath);
}

export function mergeObjects(firstObj, secondObj) {
  return merge(firstObj, secondObj);
}

export function getSmallImageSource(src) {
  if (!src) return "";
  let extensionPointer = src.lastIndexOf(".");
  return src
    .substring(0, extensionPointer)
    .concat("_size50x50")
    .concat(src.substring(extensionPointer, src.length));
}

export function getRandom(max = 10000) {
  return (new Date().getTime() * Math.random()) % (max + 1);
}

export function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

export function arrayEqual(arrA, arrB) {
  if (arrA === arrB) {
    return true;
  }

  if (!(arrA instanceof Array) || !(arrB instanceof Array)) {
    return false;
  }
  if (arrA.length !== arrB.length) {
    return false;
  }
  for (let i = 0; i < arrA.length; i++) {
    // eslint-disable-next-line
    if (arrA[i] != arrB[i]) {
      return false;
    }
  }

  return true;
}

export function dateFormatter(dateObject = new Date(), timeFormatting = false) {
  if (timeFormatting)
    return moment(dateObject).format(
      defaultDateFormat + " " + defaultTimeFormat
    );
  return moment(dateObject).format(defaultDateFormat);
}
