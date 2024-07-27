
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
