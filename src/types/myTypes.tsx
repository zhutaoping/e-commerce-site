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
}

export interface UserTypes {
	online: boolean;
	items: ProductTypes[];
}
