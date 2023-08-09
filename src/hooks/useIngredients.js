import { useEffect, useState } from 'react';

export function useIngredients() {
	const [ingredients, setIngredients] = useState([]);

	useEffect(() => {
		const getIngredients = async () => {
			try {
				const response = await fetch('ingredients.json', {
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				});
				const data = await response.json();
				setIngredients(data);
			} catch (error) {
				console.error('Error loading data');
			}
		};

		getIngredients();
	}, []);

	return { ingredients };
}
