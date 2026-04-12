function createTimedAsyncCache(ttlMs) {
  const store = new Map();

  function getEntry(key) {
    return store.get(key) || null;
  }

  function getFreshValue(key) {
    const entry = getEntry(key);
    if (!entry?.value) {
      return null;
    }

    return entry.expiresAt > Date.now() ? entry.value : null;
  }

  function getValue(key) {
    return getEntry(key)?.value || null;
  }

  function getPromise(key) {
    return getEntry(key)?.promise || null;
  }

  function setPending(key, promise) {
    const previous = getEntry(key);
    store.set(key, {
      value: previous?.value || null,
      expiresAt: previous?.expiresAt || 0,
      promise,
    });
  }

  function setValue(key, value) {
    store.set(key, {
      value,
      expiresAt: Date.now() + ttlMs,
      promise: null,
    });
  }

  function clear(key) {
    store.delete(key);
  }

  return {
    clear,
    getFreshValue,
    getPromise,
    getValue,
    setPending,
    setValue,
  };
}

module.exports = {
  createTimedAsyncCache,
};
