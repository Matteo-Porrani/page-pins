export const localDataDefaults = {
	category: [
		{ id: 1, name: "Web", color: 1 },
	],
	folder: [
		{
			id: 1,
			name: "Search",
			category: 1,
			color: 2,
		}
	],
	link: [
		{
			id: 1,
			name: "Google",
			url: "https://google.com",
			category: 1,
			folder: 1,
			color: 0,
		},
		{
			id: 2,
			name: "Qwant",
			url: "https://www.qwant.com",
			category: 1,
			folder: 1,
			color: 0,
		},
		{
			id: 2,
			name: "DuckDuckGo",
			url: "https://duckduckgo.com",
			category: 1,
			folder: 1,
			color: 0,
		},
	],
};
