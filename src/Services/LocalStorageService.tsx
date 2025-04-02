export const setItem = (key:string, value:any) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getItem = (key: string) => {
    const item = localStorage.getItem(key);
    if (!item) return null; // Ensure item is valid before parsing
    try {
        return JSON.parse(item);
    } catch (error) {
        console.error(`Error parsing localStorage key "${key}":`, error);
        return null; // Return null instead of breaking the app
    }
};


export const removeItem = (key:string) => {
    localStorage.removeItem(key);
}

