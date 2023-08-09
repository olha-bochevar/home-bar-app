import { useSettings } from 'hooks/SettingsContext';
import { useWindowWidth } from '../../hooks/useWindowWidth';

export function Settings() {
	const { volumeSettings, setVolumeSettings, setVolumeSettingsToDB } =
		useSettings();
	const { windowWidth } = useWindowWidth();

	const handleInputVolume = ({ target: { value } }) => {
		setVolumeSettings(value);
	};

	return (
		<section className="container-sm py-5 px-3">
			<h2 className="mb-5">Settings</h2>

			<form className="d-flex flex-column">
				<label htmlFor="volume" className="fs-5">
					underline positions in red if there is less volume left than:
				</label>

				<div
					className={` d-flex gap-3  ${
						windowWidth < 576 ? 'flex-column row-gap-3' : 'flex-row '
					} mt-3 w-50`}
				>
					<div className="col-auto ">
						<input
							className="form-control me-2 "
							type="number"
							step="any"
							name="volume"
							placeholder="Enter the volume"
							value={volumeSettings}
							onChange={handleInputVolume}
						/>
					</div>
					<div className="col-auto me-auto ">
						<button
							className="btn btn-outline-success "
							type="submit"
							onClick={setVolumeSettingsToDB}
						>
							Submit
						</button>
					</div>
				</div>
			</form>
		</section>
	);
}
