
const colors = [
	"yellow",
	"orange",
	"red",
	"fuchsia",
	"purple",
	"blue",
	"sky",
	"teal",
	"green",
	"lime",
];

export const baseColors = colors.map((c, i) => {
	return {
		id: i+1,
		name: c,
	};
});

export function getColorName(id) {
	
	console.log("getColorName", id);
	
	const color = baseColors.find(c => c.id === id);
	return color ? color.name : null;
}