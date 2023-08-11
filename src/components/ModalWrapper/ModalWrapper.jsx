import './ModalWrapper.css';
const MODAL_STYLES = {
	background: 'rgba(0, 0, 0, 0.3)',
	outline: 'none',
	width: '100vw',
	height: '100vh',
	position: 'absolute',
	top: '0',
	padding: '2rem',
	right: '0',
	zIndex: '1',
};
const OVERLAY_STYLE = {
	background: 'white',
	position: 'fixed',
	zIndex: 999999,
	width: '50rem',
	maxWidth: '600px',
	maxHeight: 'fit-content',
	top: '50%',
	left: '50%',
	right: 'auto',
	bottom: 'auto',
	marginRight: '-50%',
	transform: 'translate(-50%, -50%)',
	padding: '2rem',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	overflow: 'hidden',
	boxSizing: 'border-box',
};
export const ModalWrapper = ({ open, children }) => {
	if (!open) return null;
	return (
		<>
			<div style={MODAL_STYLES}>
				<div style={OVERLAY_STYLE}>{children}</div>
			</div>
		</>
	);
};
