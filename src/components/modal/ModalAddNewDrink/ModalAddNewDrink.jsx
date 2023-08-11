import { db } from './../../../services/firebase';
import { v4 as uuid } from 'uuid';
import { doc, setDoc } from 'firebase/firestore';
import { Drink } from 'hooks/Drink';

import { ModalWrapper } from 'components/ModalWrapper/ModalWrapper';
import { useEffect, useRef, useState } from 'react';
import { useIngredients } from 'hooks/useIngredients';

export function ModalAddNewDrink({ isModalOpen, setIsModalOpen }) {
	const { ingredients } = useIngredients();
	const [addNewDrink, setAddNewDrink] = useState({
		id: '',
		name: '',
		volume: 0,
		abv: 0,
		type: '',
		isAlcoholic: true,
	});
	const { name, volume, abv, type, isAlcoholic } = addNewDrink;

	const [shownIngredients, setShownIngredients] = useState([]);

	useEffect(() => {
		if (ingredients.length > 0) {
			const filteredIngredients = ingredients.filter(
				(item) => item.isAlcoholic
			);
			setShownIngredients(filteredIngredients);
		}
	}, []);

	useEffect(() => {
		const filteredIngredients = ingredients.filter((item) =>
			isAlcoholic ? item.isAlcoholic : !item.isAlcoholic
		);
		setShownIngredients(filteredIngredients);
	}, [isAlcoholic]);

	const inputAbvRef = useRef();

	const handleInputName = ({ target: { value } }) => {
		setAddNewDrink({ ...addNewDrink, name: value });
	};
	const handleInputVolume = ({ target: { value } }) => {
		setAddNewDrink({ ...addNewDrink, volume: value });
	};
	const handleInputAbv = ({ target: { value } }) => {
		setAddNewDrink({ ...addNewDrink, abv: value });
	};

	const handleLabelClick = (e) => {
		console.log(e.target.htmlFor);
		setAddNewDrink({ ...addNewDrink, type: e.target.htmlFor });
		console.log(type);
	};
	const handleInputIsAlco = ({ target: { value } }) => {
		const newValue = value === 'Alcoholic';
		setAddNewDrink({ ...addNewDrink, isAlcoholic: newValue });
	};

	const addDrinkToBar = async (e) => {
		e.preventDefault();

		try {
			const id = uuid();
			const drink = new Drink({
				id: id,
				name: name,
				volume: volume,
				abv: abv,
				type: type,
				isAlcoholic: isAlcoholic,
			});
			await setDoc(doc(db, 'bar', id), drink.getInfoAboutDrink());
			setAddNewDrink({
				id: '',
				name: '',
				volume: 0,
				abv: 0,
				type: '',
				isAlcoholic: 'Alcoholic',
			});
			setIsModalOpen(false);
		} catch (error) {
			console.error('Error adding document: ', error);
		}
	};

	return (
		<ModalWrapper open={isModalOpen}>
			<div className="d-flex align-self-end">
				<button onClick={() => setIsModalOpen(false)} className="btn fs-4 p-0">
					<i className="bi bi-x-lg"></i>
				</button>
			</div>
			<form className="row g-3 fs-5 p-2" onSubmit={addDrinkToBar}>
				<div className="col-md-12">
					<div className="mb-2">
						<label htmlFor="inputName" className="form-label">
							Name
						</label>
						<input
							type="text"
							className="form-control"
							name="inputName"
							value={name}
							onChange={handleInputName}
							autoFocus={true}
						/>
					</div>
					<div className="mb-2">
						<label htmlFor="inputIsAlco" className="form-label">
							Is Alcoholic?
						</label>
						<select
							className="form-select"
							aria-label="Is Alcoholic?"
							name="inputIsAlco"
							value={isAlcoholic ? 'Alcoholic' : 'N/A'}
							onChange={handleInputIsAlco}
						>
							<option value="Alcoholic">Alcoholic</option>
							<option value="N/A">N/A</option>
						</select>
					</div>
					<div className="mb-1 d-flex gap-1">
						<div className="col-md-6">
							<label htmlFor="inputVolume" className="form-label">
								Volume
							</label>
							<input
								type="number"
								className="form-control"
								name="inputVolume"
								step="any"
								value={volume}
								onChange={handleInputVolume}
							/>
						</div>
						<div className="col-md-6">
							<label htmlFor="inputAbv" className="form-label">
								ABV, %
							</label>
							<input
								type="number"
								className="form-control"
								name="inputAbv"
								step="any"
								ref={inputAbvRef}
								value={abv}
								onChange={handleInputAbv}
							/>
						</div>
					</div>
				</div>
				<div className="col-12">
					<p>Choose a type of your drink:</p>
					<ul className="list-group d-flex flex-row flex-wrap gap-2">
						{shownIngredients.map((item) => (
							<li key={item.id} className="w-auto d-inline">
								<input
									type="radio"
									className="btn-check"
									label={item.name}
									name={item.name}
									id={item.name}
									autoComplete="off"
									value={item.name}
									/* checked={type === item.name} */
								/>
								<label
									className="btn btn-outline-danger"
									htmlFor={item.id}
									onClick={handleLabelClick}
								>
									{item.name}
								</label>
							</li>
						))}
					</ul>
				</div>

				<div className="col-12 d-flex justify-content-center">
					<button
						type="submit"
						className="btn btn-primary py-2 px-4 w-auto mt-2"
					>
						Add drink
					</button>
				</div>
			</form>
		</ModalWrapper>
	);
}
