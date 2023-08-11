import { ModalAddNewDrink } from 'components/Modal/ModalAddNewDrink/ModalAddNewDrink';
import { useState } from 'react';

export function AddNewDrink() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => setIsModalOpen(true);

	return (
		<div>
			{isModalOpen && (
				<ModalAddNewDrink
					isModalOpen={isModalOpen}
					setIsModalOpen={() => setIsModalOpen(false)}
				/>
			)}
			<button onClick={handleOpenModal} className="btn btn-outline-dark fs-5">
				<i className="bi bi-plus-lg"></i> Add new drink
			</button>
		</div>
	);
}
