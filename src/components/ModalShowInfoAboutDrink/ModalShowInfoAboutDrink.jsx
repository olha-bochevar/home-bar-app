import ModalWrapper from 'components/ModalWrapper/ModalWrapper';

export function ModalShowInfoAboutDrink({ isOpen, onClose }) {
	if (!isOpen) {
		return null; // Якщо модальне вікно не відкрите, повернемо null, тобто нічого не рендеримо
	}
	return (
		<ModalWrapper isOpen={isOpen} onRequestClose={onClose}>
			<button onClick={onClose}>Close</button>
			<h2>info</h2>
		</ModalWrapper>
	);
}
