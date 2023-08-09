class Drink {
	constructor({
		id,
		name = '',
		volume = 0,

		abv = 0,
		type = '',
		isAlcoholic = false,
	}) {
		this.id = id;
		this.name = name;
		this.volume = volume;

		this.abv = abv;
		this.type = type;
		this.isAlcoholic = isAlcoholic;
	}

	getInfoAboutDrink() {
		return {
			name: this.name,
			volume: this.volume,
			abv: this.abv,
			type: this.type,
			isAlcoholic: this.isAlcoholic,
			id: this.id,
		};
	}

	changeVolume(value) {
		return this.volume - value;
	}
}
// Firestore data converter
const drinkConverter = {
	toFirestore: (drink) => {
		return {
			name: drink.name,
			volume: drink.volume,
			abv: drink.abv,
			type: drink.type,
			isAlcoholic: drink.isAlcoholic,
			id: drink.id,
		};
	},
	fromFirestore: (snapshot, options) => {
		const data = snapshot.data(options);
		return new Drink({
			name: data.name,
			volume: data.volume,
			isAlcoholic: data.isAlcoholic,
			abv: data.abv,
			type: data.type,
			id: data.id,
		});
	},
};

export { Drink, drinkConverter };
