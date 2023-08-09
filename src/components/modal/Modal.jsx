import { useState } from 'react';
import { db } from '../../services/firebase';
import { v4 as uuid } from 'uuid';
import { doc, setDoc } from 'firebase/firestore';
import { Drink } from 'hooks/Drink';

export const Modal = () => {
	//const { bottles } = useBottles();
	const [addNewBottle, setAddNewBottle] = useState({
		name: '',
		volume: '',
		//id: null,
		isAlcoholic: true,
	});

	const handleInputName = ({ target: { value } }) => {
		setAddNewBottle({ ...addNewBottle, name: value });
	};
	const handleInputVolume = ({ target: { value } }) => {
		setAddNewBottle({ ...addNewBottle, volume: Number(value) });
	};
	const handleInputIsAlcoholic = ({ target }) => {
		target.checked
			? setAddNewBottle({ ...addNewBottle, isAlcoholic: true })
			: setAddNewBottle({ ...addNewBottle, isAlcoholic: false });
	};

	const checkAddedBottleInTheBar = () => {
		console.log(addNewBottle.name);
	};

	const addBottleToCollection = async () => {
		try {
			const id = uuid();
			const drink = new Drink({
				name: addNewBottle.name,
				volume: addNewBottle.volume,
				isAlcoholic: true,
				id: id,
			});
			console.log(drink);
			console.log(drink.getInfoAboutDrink());

			await setDoc(doc(db, 'bar', id), drink.getInfoAboutDrink());

			/* {
				name: addNewBottle.name,
				volume: addNewBottle.volume,
				id: id,
				isAlcoholic: addNewBottle.isAlcoholic,
			} );*/
			setAddNewBottle({ name: '', volume: '', isAlcoholic: true });
			console.log(drink.getInfoAboutDrink(id));
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	};

	const handleAddingBottleToTheBar = () => {
		// check if this bottle has already added to the bar
		checkAddedBottleInTheBar();
		// if so, output warning
		// if not, add to the bar
		addBottleToCollection();
	};
	return (
		<>
			<button
				type="button"
				className="btn btn-outline-dark"
				data-bs-toggle="modal"
				data-bs-target="#staticBackdrop"
			>
				<i className="bi bi-plus-lg"></i> Add new beverage
			</button>

			<div
				className="modal fade"
				id="staticBackdrop"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				tabIndex="-1"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="staticBackdropLabel">
								Add new beverage
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<div className="form-floating mb-3">
								<input
									type="text"
									className="form-control"
									id="floatingInputName"
									placeholder="Name of beverage"
									value={addNewBottle.name}
									onChange={handleInputName}
									autoComplete="off"
								/>
								<label htmlFor="floatingInputName">What did you buy?</label>
							</div>
							<div className="form-floating mb-3">
								<input
									type="number"
									className="form-control"
									step="any"
									id="floatingVolume"
									placeholder="0,75"
									value={addNewBottle.volume}
									onChange={handleInputVolume}
								/>
								<label htmlFor="floatingVolume">How much? (l)</label>
							</div>
							<div className="form-check">
								<label
									className="form-check-label order-1"
									htmlFor="flexCheckIndeterminate"
								>
									Is alcoholic?
								</label>
								<input
									className="form-check-input"
									type="checkbox"
									value={addNewBottle.isAlcoholic}
									id="flexCheckIndeterminate"
									onChange={handleInputIsAlcoholic}
								/>
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-outline-secondary"
								data-bs-dismiss="modal"
							>
								Close
							</button>
							<button
								type="button"
								className="btn btn-outline-success"
								onClick={handleAddingBottleToTheBar}
								data-bs-dismiss="modal"
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
