import { db } from './../../services/firebase';
import { useState } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { Drink } from 'components/Drink/Drink';
import './MyBeverages.css';
import { useDrinks } from 'hooks/DrinksContext';
import { ModalAddNewDrink } from 'components/Modal/ModalAddNewDrink/ModalAddNewDrink';

export function MyBeverages() {
	const { drinks } = useDrinks();
	const [typeOfBeverage, setTypeOfBeverage] = useState('All');

	const handleInputKindOfDrink = ({ target: { value } }) => {
		setTypeOfBeverage(value);
	};

	const filterBevs = (option) => {
		const filteredBevs = drinks.filter((drink) => {
			switch (option) {
				case 'All':
					return drink;

				case 'Alcoholic':
					return drink.isAlcoholic;
				case 'N/A':
					return !drink.isAlcoholic;
				default:
					return drink;
			}
		});
		return filteredBevs;
	};

	const filteredBevs = filterBevs(typeOfBeverage);

	const removeDrinkFromCollection = async (id) => {
		await deleteDoc(doc(db, 'bar', id));
	};

	return (
		<section
			className="myBeverages p-5 d-flex flex-column gap-4"
			id="myBeverages"
		>
			<h2>My beverages</h2>
			<h4>Now you have {drinks.length} beverages in your bar.</h4>
			<div>
				<ModalAddNewDrink />
			</div>
			<div
				className="btn-group"
				role="group"
				aria-label="Basic radio toggle button group"
			>
				<input
					type="radio"
					className="btn-check"
					name="type"
					id="all"
					value="All"
					autoComplete="off"
					checked={typeOfBeverage === 'All'}
					onChange={handleInputKindOfDrink}
				/>
				<label className="btn btn-outline-primary" htmlFor="all">
					All
					<span>{` (${drinks.length})`}</span>
				</label>

				<input
					type="radio"
					className="btn-check"
					name="type"
					id="alco"
					value="Alcoholic"
					autoComplete="off"
					checked={typeOfBeverage === 'Alcoholic'}
					onChange={handleInputKindOfDrink}
				/>
				<label className="btn btn-outline-primary" htmlFor="alco">
					Alcoholic
					<span>{` (${
						drinks.filter((bottle) => bottle.isAlcoholic).length
					})`}</span>
				</label>

				<input
					type="radio"
					className="btn-check"
					name="type"
					id="non-alco"
					value="N/A"
					autoComplete="off"
					checked={typeOfBeverage === 'N/A'}
					onChange={handleInputKindOfDrink}
				/>
				<label className="btn btn-outline-primary" htmlFor="non-alco">
					N/A
					<span>{` (${
						drinks.filter((bottle) => !bottle.isAlcoholic).length
					})`}</span>
				</label>
			</div>
			<ul className="list-group">
				{filteredBevs.map((bottle) => (
					<Drink
						key={bottle?.id}
						id={bottle?.id}
						name={bottle?.name}
						volume={+bottle?.volume}
						onClickDelete={removeDrinkFromCollection}
					/>
				))}
			</ul>
		</section>
	);
}
