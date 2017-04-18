import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { oneLine } from 'common-tags';
import { StoreService, ApiService } from 'services';

const template = oneLine`
<style>
	.form {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: flex-end;
		align-content: space-between;
		flex-wrap: wrap;
		margin: 20px 0;
	}
	.styled-input {
		flex: 1;
		min-width: 200px;
	}
	.task-items {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.task-item {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		min-height: 30px;
		width: 100%;
		margin: 5px 0;
		padding: 10px 20px;
		box-sizing: border-box;
		background-color: #e6e6e6;
		border-radius: 3px;
		border: 2px solid #d0d0d0;
	}
	.task-item:hover .task-delete {
		color: rgb(223, 67, 66);
	}
	.task-delete {
		font-size: 18px;
		transition: all .2s ease;
		color: gray;
		cursor: pointer;
		align-self: center;
	}
</style>
<div>
	<ul class="task-items">
		<li *ngFor="let task of tasks; let i=index" class="task-item">
			<span>{{task.task_name}}</span>
			<i class="fa fa-times-circle task-delete" (click)="deleteTodo(i)" aria-hidden="true" name="Delete Task" aria-label="Delete Task"></i>
		</li>
	</ul>
	<form #form="ngForm" (ngSubmit)="addTodo(form)" class="form">
		<div class="styled-input">
			<label for="task-input">Add A Tiny Task</label>
			<i class="fa fa-pencil-square" aria-hidden="true"></i>
			<input type="text" name="input" id="task-input" ngModel placeholder="Feed the kids..."/>
		</div>
		<div>
			<button class="styled-button" type="submit">Add +</button>
		</div>
	</form>
</div>
`;

@Component({
	selector: 'tasks',
	template,
})
export class TasksComponent implements OnInit {
	tasks = this.storeService.get('tasks');
	noAppId = false;

	constructor(private storeService: StoreService, private apiService: ApiService) {};

	addTodo(form: NgForm): any {
		if(this.storeService.get('application_id') === '') return this.noAppId = true;

		const { input } = form.value;
		form.reset();
		this.apiService.addTodo(input)
			.then((res) => {
				// Add new Task to store
				this.storeService.set('tasks', [...this.tasks, res.data])
					// Update our internal store
					.then((res) => {
						this.tasks = res.get('tasks')
					})
			});
	}

	deleteTodo(index: number): any {
		if(this.storeService.get('application_id') === '') return this.noAppId = true;

		const { task_id } = this.tasks[index];
		this.apiService.deleteTodo(task_id)
			.then((res) => {
				// Just Remove the Todo at the index
				this.storeService.set('tasks', this.tasks.filter((s, i) => i !== index))
					.then((res) => {
						console.log(res);
						this.tasks = res.get('tasks')
					});
			});
	}

	ngOnInit() {
		this.storeService.debug();
		// Run if we have an application_id
		if(this.storeService.get('application_id') !== '') {
			this.apiService.getTodos()
				.then((res) => {
					console.log(res);
					this.tasks = res.data;
				});
		}
	}

}