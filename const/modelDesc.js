export const modelDesc = {
	category: {
		name: "text",
	},
	folder: {
		name: "text",
		category: "list",
		tag: "list",
	},
	link: {
		name: "text",
		url: "text",
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

