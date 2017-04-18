import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import axios from 'axios';

@Injectable()
export class ApiService {
	constructor(private storeService: StoreService) {};

	getHeaders() {
		return {
			"Application-ID": this.storeService.get('application_id') || "",
		}
	}


	initTodos({first_name, last_name, email}): Promise<any> {
		return axios({
			method: 'POST',
			url: 'http://homework.avantlink.com/applications',
			data: {
				"first_name": first_name,
				"last_name": last_name,
				"email": email,
			}
		})
			.then(({data}) => data)
			.catch((err) => console.error(err));
	}

	getTodos(): Promise<any> {
		return axios({
			method: 'GET',
			url: 'http://homework.avantlink.com/tasks',
			headers: this.getHeaders(),
		})
			.then(({data}) => data)
			// Future Error Handling Here
			.catch((err) => console.error(err))
	}

	addTodo(value): Promise<any> {
		return axios({
			method: 'POST',
			url: 'http://homework.avantlink.com/tasks',
			headers: this.getHeaders(),
			data: {
				name: value,
			}
		})
			.then(({data}) => data)
			// Future Error Handling Here
			.catch((err) => console.error(err))
	}

	deleteTodo(task_id: number): Promise<any> {
		return axios({
			method: 'DELETE',
			url: 'http://homework.avantlink.com/tasks',
			headers: this.getHeaders(),
			params: {
				id: task_id
			}
		})
			.then(({data}) => data)
			// Future Error Handling Here
			.catch((err) => console.warn(err))
	}
}