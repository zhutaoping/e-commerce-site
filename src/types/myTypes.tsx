export interface ProductTypes {
	id: string;
	title?: string;
	shortTitle?: string;
	price?: number;
	description?: string;
	category?: string;
	image?: string;
	count?: number;
	addedCount?: number;
	stripeId?: string;
}

export interface UserTypes {
	online: boolean;
	items: ProductTypes[];
}
