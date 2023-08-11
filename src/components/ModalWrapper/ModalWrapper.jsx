import './ModalWrapper.css';
const MODAL_STYLES = {
	background: 'rgba(0, 0, 0, 0.3)',
	outline: 'none',
	width: '50rem',
	maxWidth: 'calc(100vw - 2rem)',
	maxHeight: 'calc(100vh - 2rem)',
	boxShadow: '0 0 34px 0 rgba(0, 0, 0, 0.24)',
	overflow: 'auto',
	position: 'relative',
	padding: '2rem',
};
const OVERLAY_STYLE = {
	background: 'white',
	position: 'fixed',
	zIndex: 999999,
	width: '100vw',
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
