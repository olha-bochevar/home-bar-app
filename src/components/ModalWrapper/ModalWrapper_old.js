import { useState } from 'react';
import Modal from 'react-modal';

// Стилі для модального вікна

const modalStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		border: 'none',
		boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
		padding: '20px',
		borderRadius: '5px',
		maxWidth: '600px',
		width: '100%',
		zIndex: '9999',
		height: '100vh',
		overflow: 'auto',
	},
};

// Компонент модального вікна
function ModalWrapper({ children }) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};
	return (
		<div>
			<button onClick={openModal} className="btn btn-outline-dark fs-5">
				<i className="bi bi-plus-lg"></i> Add new drink
			</button>
			<Modal
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				style={modalStyles}
			>
				<div className="d-flex justify-content-end">
					<button onClick={closeModal} className="btn fs-4 p-0">
						<i className="bi bi-x-lg"></i>
					</button>
				</div>
				<div>{children}</div>
			</Modal>
		</div>
	);
}

export default ModalWrapper;
