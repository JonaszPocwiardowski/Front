const readFromLocalStorage = (key) => {
    const lsData = localStorage.getItem(key);
    return lsData?JSON.parse(lsData):[];
}

const saveToLocalStorage = (key, obj) => {
    localStorage.setItem(key, JSON.stringify(obj));
};

export {readFromLocalStorage, saveToLocalStorage};