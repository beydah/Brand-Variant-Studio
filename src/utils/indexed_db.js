// #region IDB Storage
/**
 * Simple IndexedDB Key-Value wrapper.
 */
const DB_NAME = 'BrandStudioDB';
const DB_VERSION = 1;
const STORE_NAME = 'kv-store';

const F_Get_DB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };
    });
};

export const F_IDB_Get = async (key, defaultValue = null) => {
    try {
        const db = await F_Get_DB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(key);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                resolve(request.result !== undefined ? request.result : defaultValue);
            };
        });
    } catch (err) {
        return defaultValue;
    }
};

export const F_IDB_Set = async (key, value) => {
    try {
        const db = await F_Get_DB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.put(value, key);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        });
    } catch (err) {
        // Silently ignore errors as requested
    }
};
// #endregion
