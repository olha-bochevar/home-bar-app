import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import wineBar from './../../assets/images/wine_bar.png';

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navigate = useNavigate();

	const handleToggleMenu = () => {
		setIsMenuOpen((prevState) => !prevState);
	};

	const handleNavLinkClick = (path) => {
		navigate(path); // Здійснюємо перехід на вказаний шлях
		setIsMenuOpen(false); // Закриваємо меню
	};

	return (
		<nav
			className={`navbar navbar-expand-lg w-100 ${
				isMenuOpen ? 'bg-white' : ''
			}`}
		>
			<div className="container-fluid">
				<Link className="navbar-brand d-flex align-items-center fs-3" to="/">
					<img
						src={wineBar}
						alt="Logo"
						width="30"
						height="30"
						className="d-inline-block align-text-top"
					/>
					Home Bar
				</Link>
				<button
					className={`navbar-toggler ${isMenuOpen ? 'collapsed' : ''}`}
					type="button"
					onClick={handleToggleMenu}
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
					<ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 fs-5">
						<li className="nav-item">
							<button
								className="nav-link btn-unstyled active"
								onClick={() => handleNavLinkClick('/')}
							>
								My Beverages
							</button>
						</li>
						<li className="nav-item">
							<button
								className="nav-link btn-unstyled link-offset-2 link-underline-opacity-25"
								onClick={() => handleNavLinkClick('/out-of-stock')}
							>
								Finished Beverages
							</button>
						</li>
						<li className="nav-item ms-lg-auto">
							<button
								className="nav-link btn-unstyled"
								onClick={() => handleNavLinkClick('/settings')}
							>
								Settings
							</button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
