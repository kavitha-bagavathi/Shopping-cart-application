export const loadState = () => {
    try {
      const storedstate = localStorage.getItem('cartState');
      if (!storedstate) 
        return undefined;
      return JSON.parse(storedstate);
    } catch (err) {
      return undefined;
    }
  };
  
  export const saveState = (state) => {
    try {
      const storedstate = JSON.stringify(state);
      localStorage.setItem('cartState', storedstate);
    } catch (err) {
        return undefined;
    }
  };
  