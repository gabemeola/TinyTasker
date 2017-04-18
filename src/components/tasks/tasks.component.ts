import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { oneLine } from 'common-tags';
import axios from 'axios';

const template = oneLine`
<style>
	.panel {
		background-color: #fff;
		border-bottom: 2px solid #e6e6e6;
		width: 60%;
		margin: 0 auto;
		box-sizing: border-box;
		position: relative;
		padding: 15px;
		box-shadow: 0 3px 6px 0 rgba(0,0,0,.16);
		margin-bottom: 10px;
		border-radius: 0 0 3px 3px;
	}
	.form {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: flex-end;
		align-content: space-between;
		flex-wrap: wrap;
		margin: 20px 0;
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
	}
	.task-item:hover .task-delete {
		color: rgb(223, 67, 66);
	}
	.task-delete {
		font-size: 18px;
		transition: all .2s ease;
		color: gray;
		cursor: pointer;
	}
</style>
<div class="panel">
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
			<button class="styled-button">Add +</button>
		</div>
	</form>
</div>
`;

@Component({
	selector: 'tasks',
	template,
})
export class TasksComponent implements OnInit {
	tasks = [];

	addTodo(form: NgForm): void {
		const { input } = form.value;
		form.reset();
		axios({
			method: 'POST',
			url: 'http://homework.avantlink.com/tasks',
			headers: {"Application-ID": "50047f1b-23df-11e7-91b6-0ed54c19ffda"},
			data: {
				name: input,
			}
		}).then((res) => {
			console.log(res);
			this.tasks.push(res.data.data);
		})
	}

	deleteTodo(index: number) {
		console.log('deleting', this.tasks[index].task_id);
		axios({
			method: 'DELETE',
			url: 'http://homework.avantlink.com/tasks',
			headers: {"Application-ID": "50047f1b-23df-11e7-91b6-0ed54c19ffda"},
			params: {
				id: this.tasks[index].task_id
			}
		}).then((res) => {
			console.log(res);
			this.tasks.splice(index, 1);
		}).catch((err) => console.warn(err))
	}

	ngOnInit() {
		axios({
			method: 'GET',
			url: 'http://homework.avantlink.com/tasks',
			headers: {"Application-ID": "50047f1b-23df-11e7-91b6-0ed54c19ffda"},
		}).then((res) => {
			console.log(res);
			this.tasks = res.data.data;
		})
	}

}