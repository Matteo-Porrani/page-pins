const titles = [
	["Développement", "blue"],
	["UX & Design", "purple"],
	["Cinéma", "teal"],
	["Moto", "yellow"],
	["Livres", "orange"],
	["Voyages", "red"],
	["Misc", "lime"],
];

export const categories = titles.map((t, i) => ({
	id: i+1,
	name: t[0],
	color: t[1],
}));

