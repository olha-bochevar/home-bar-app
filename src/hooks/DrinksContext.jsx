import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { db } from '../services/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export const DrinksContext = createContext();
export const DrinksProvider = ({ children }) => {
	const [drinks, setDrinks] = useState([]);
	const drinksRef = useRef(drinks);

	// Зчитування з localStorage при запуску
	useEffect(() => {
		const storedDrinks = JSON.parse(localStorage.getItem('drinks'));
		if (storedDrinks) {
			setDrinks(storedDrinks);
		}

		const unsub = onSnapshot(collection(db, 'bar'), (snapshot) => {
			drinksRef.current = snapshot.docs.map((doc) => doc.data());
			setDrinks(drinksRef.current);

			// Збереження в localStorage при оновленні даних
			localStorage.setItem('drinks', JSON.stringify(drinksRef.current));
		});

		return () => unsub();
	}, []);

	const drinksContextValue = {
		drinks,
		setDrinks: (d) => {
			// Оновлення стану та збереження в localStorage
			setDrinks(d);
			localStorage.setItem('drinks', JSON.stringify(d));
		},
	};
	return (
		<DrinksContext.Provider value={drinksContextValue}>
			{children}
		</DrinksContext.Provider>
	);
};

export const useDrinks = () => useContext(DrinksContext);

DrinksProvider.propTypes = {
	children: PropTypes.node,
};
