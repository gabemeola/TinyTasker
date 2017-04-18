import { Injectable } from '@angular/core';

@Injectable()
export class StoreService {
	store: Map<any, any>;

	constructor() {
		this.store = new Map();
		// Setting up some default values
		this.store.set('first_name', '');
		this.store.set('last_name', '');
		this.store.set('email', '');
		this.store.set('application_id', '');
		this.store.set('tasks', []);
	}

	set(key: any, value: any): Promise<Map<any, any>> {
		return new Promise((res, reject) => {
			this.store.set(key, value);
			res(this.store);
		})
	}

	del(key: any): Promise<Map<any, any>> {
		return new Promise((res, reject) => {
			this.store.delete(key);
			res(this.store);
		})
	}

	get(key: any): any {
		return this.store.get(key);
	}

	debug(): void {
		console.log(this.store)
	}
}