export const modelDesc = {
	category: {
		name: "text",
		color: "text"
	},
	folder: {
		name: "text",
		category: "list",
		color: "text",
		tag: "list",
	},
	link: {
		name: "text",
		url: "text",
		color: "text",
		folder: "list"
	},

	tag: {
		name: "text",
	},
}

export const listMapper = {
	folder: {
		category: "category",
		tag: "tag",
	},
	link: {
		folder: "folder"
	},
}

