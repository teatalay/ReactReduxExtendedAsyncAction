export function readStorageItem(key) {
    return localStorage.getItem(key);
  }
  export function writeStorageItem(key, value) {
    localStorage.setItem(key, value);
  }
  export function removeStorageItem(key) {
    localStorage.removeItem(key);
  }
  