import { createContext, useContext } from 'react';

const BottlesContext = createContext(null);
export const BottlesProvider = BottlesContext.Provider;
export const useBottles = () => useContext(BottlesContext);
