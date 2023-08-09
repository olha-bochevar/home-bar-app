import PropTypes from 'prop-types';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useRef, useState } from 'react';
import { useSettings } from 'hooks/SettingsContext';
/* import { doc, getDoc } from '@firebase/firestore';
import { db } from './../../services/firebase';
import { drinkConverter } from 'hooks/Drink'; */
import { ModalShowInfoAboutDrink } from 'components/ModalShowInfoAboutDrink/ModalShowInfoAboutDrink';

export function Drink({ id, name, volume, onClickDelete }) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const parentElementRef = useRef(null);
	const { volumeSettings } = useSettings();
	const removeDrinkFromCollection = async () => {
		try {
			await onClickDelete(parentElementRef.current.id);
		} catch (error) {
			console.log(error.message);
		}
	};

	/* const getInfoAboutDrink = async () => {
		const ref = doc(db, 'bar', parentElementRef.current.id).withConverter(
			drinkConverter
		);
		const docSnap = await getDoc(ref);
		if (docSnap.exists()) {
			// Convert to City object
			const drink = docSnap.data();
			// Use a City instance method
			console.log(drink.getInfoAboutDrink());
		} else {
			console.log('No such document!');
		}
	}; */

	return (
		<li
			ref={parentElementRef}
			id={id}
			className={`row px-0 list-group-item d-flex justify-content-between gap-1  ${
				volume <= volumeSettings ? 'text-bg-warning' : ''
			}`}
		>
			<div className="col-6 d-flex justify-content-between align-items-center gap-1">
				<span className="col-8 fs-6 text-uppercase fw-medium w-auto">
					{name}
				</span>

				<span className="badge bg-primary rounded col-4 align-self-center w-auto fs-6">
					{volume}
				</span>
			</div>

			<div className="col-5 d-flex gap-2 justify-content-end">
				<button
					className="btn btn-outline-dark col-auto w-auto "
					onClick={openModal}
				>
					<i className="bi bi-eye"></i>
				</button>
				<ModalShowInfoAboutDrink isOpen={isModalOpen} onClose={closeModal} />
				<button
					className="btn btn-outline-dark col-auto w-auto"
					onClick={removeDrinkFromCollection}
				>
					<i className="bi bi-trash"></i>
				</button>
			</div>
		</li>
	);
}
Drink.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	volume: PropTypes.number,
	onClickDelete: PropTypes.func,
};
