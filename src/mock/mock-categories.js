const titles = [
	["Développement", "red"],
	["UX & Design", "orange"],
	["Cinéma", "green"],
	["Moto", "teal"],
	["Livres", "blue"],
	["Voyages", "yellow"],
	["Misc", "amber"],
];

export const categories = titles.map((t, i) => ({
	id: i+1,
	name: t[0],
	color: t[1],
}));

