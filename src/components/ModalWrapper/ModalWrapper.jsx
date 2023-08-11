const MODAL_STYLES = {
	background: 'white',
	outline: 'none',
	width: '50rem',
	maxWidth: 'calc(100vw - 2rem)',
	maxHeight: 'calc(100vh - 2rem)',
	boxShadow: '0 0 34px 0 rgba(0, 0, 0, 0.24)',
	overflowY: 'auto',
	position: 'relative',
	padding: '2rem',
};
const OVERLAY_STYLE = {
	position: 'fixed',
	zIndex: 999999,
	top: 0,
	left: 0,
	width: '100vw',
	height: '100vh',
	background: 'rgba(0, 0, 0, 0.3)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
};
export const ModalWrapper = ({ open, children }) => {
	if (!open) return null;
	return (
		<>
			<div style={OVERLAY_STYLE}>
				<div style={MODAL_STYLES}>{children}</div>
			</div>
		</>
	);
};
