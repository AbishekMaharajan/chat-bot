const store = new Map();

export const getVector = (vector) => {
  return store.get(vector) ?? null;
};

export const setVector = (vector) => {
  if (!store.get(vector.name)) store.set(vector.name, vector.value);

  console.log("store: ", store);
  return true;
};

export default store;
