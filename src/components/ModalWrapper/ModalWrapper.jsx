const MODAL_STYLES = {
	position: 'relative',
	top: '50px',
	backgroundColor: '#FFF',
	padding: '15px',
	zIndex: '1000',
	maxWidth: '600px',
	width: '100%',
	borderRadius: '.5em',
	overflowY: 'auto',
};
const OVERLAY_STYLE = {
	position: 'fixed',
	display: 'flex',
	justifyContent: 'center',
	top: '0',
	left: '0',
	width: '100%',
	height: '100vh',
	backgroundColor: 'rgba(0,0,0, .8)',
	zIndex: '1000',
	overflowY: 'auto',
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
