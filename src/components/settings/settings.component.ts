import { Component, OnInit } from '@angular/core';
import { oneLine } from 'common-tags';
import { StoreService, ApiService } from 'services';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

const template = oneLine`
<style>
	.form {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-around;
		width: 100%;
	}
	.form .styled-input {
		width: 90%;
	}
</style>
<div class="settings">
	<h2>Your Tiny Task Info</h2>
	<br/>
	<div class="banner" [ngClass]="{'active': bannerActive }">
		<i class="fa fa-check" aria-hidden="true"></i>
		<span>Tasks Loaded!</span>
	</div>
	
	<form #form="ngForm" (ngSubmit)="initTodos(form)" class="form">
		<div class="styled-input">
			<label for="first_name-input">First Name</label>
			<i class="fa fa-user" aria-hidden="true"></i>
			<input type="text" name="first_name" id="first_name-input" [(ngModel)]="formData.first_name" required/>
		</div>
		<br/>
		<div class="styled-input">
			<label for="last_name">Last Name</label>
			<i class="fa fa-user" aria-hidden="true"></i>
			<input type="text" name="last_name" id="last_name" [(ngModel)]="formData.last_name" required />
		</div>
		<br/>
		<div class="styled-input">
			<label for="email">Email Address</label>
			<i class="fa fa-envelope" aria-hidden="true"></i>
			<input type="text" name="email" id="email" [(ngModel)]="formData.email" required />
		</div>
		<br/>
		<button class="styled-button" type="submit" [disabled]="!form.valid">Update</button>
	</form>
	
</div>
`;

@Component({
	selector: 'settings',
	template,
})
export class SettingComponent implements OnInit {
	bannerActive = false;

	formData = new FormGroup({
		first_name: new FormControl('gabe'),
		last_name: new FormControl('gabe'),
		email: new FormControl('gabe'),
	});

	constructor(private storeService: StoreService, private apiService: ApiService) {}

	// async getFormData() {
	// 	this.formData = {
	// 		first_name: await this.storeService.get('first_name'),
	// 		last_name: await this.storeService.get('last_name'),
	// 		email: await this.storeService.get('email'),
	// 	}
	// }

	ngOnInit() {
		// This doesn't seem to work.
		// Trying to update initial values for when a user returns back to this route.
		// this.getFormData();
	}

	async initTodos(form: NgForm): Promise<any> {
		const { first_name, last_name, email } = form.value;
		const { data } = await this.apiService.initTodos({
			first_name,
			last_name,
			email,
		});
		this.storeService.set('first_name', first_name);
		this.storeService.set('last_name', last_name);
		this.storeService.set('email', email);
		this.storeService.set('application_id', data.application_id);

		const res = await this.apiService.getTodos();
		await this.storeService.set('tasks', res.data);
		this.bannerActive = true;
	}
}