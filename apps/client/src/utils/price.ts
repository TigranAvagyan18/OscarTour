export const formatPrice = (price: number | string) => {
	return Number(price).toLocaleString("en-US", {
		style: "currency",
		currency: "EUR",
	});
};
