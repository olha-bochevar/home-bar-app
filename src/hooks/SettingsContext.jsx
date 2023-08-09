import { createContext, useContext, useEffect, useState } from 'react';
import { db } from './../services/firebase';
import { getDoc, doc, setDoc } from '@firebase/firestore';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
	const [volumeSettings, setVolumeSettings] = useState(0);
	const volumeRef = doc(db, 'settings', 'volume');

	const getVolumeSettingsFromDB = async () => {
		await getDoc(volumeRef).then((snapshot) => {
			const data = snapshot.data().volume;
			setVolumeSettings(data);
		});
	};

	const setVolumeSettingsToDB = async (e) => {
		e.preventDefault();

		setDoc(volumeRef, { volume: volumeSettings });
	};

	useEffect(() => {
		getVolumeSettingsFromDB();
	}, []);

	const settingsContextValue = {
		volumeSettings,
		setVolumeSettings: (v) => setVolumeSettings(v),
		getVolumeSettingsFromDB,
		setVolumeSettingsToDB,
	};
	return (
		<SettingsContext.Provider value={settingsContextValue}>
			{children}
		</SettingsContext.Provider>
	);
};

export const useSettings = () => useContext(SettingsContext);
