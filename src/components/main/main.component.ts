import { Component } from '@angular/core';
import { oneLine } from 'common-tags';

const template = oneLine`
<style>
	.main {
		width: 100%;
	}
	.header {
		width: 100%;
		height: 120px;
		background-color: #2f61b1;
		color: #fff;
	}
	.content {
		position: relative;
		height: 100%;
		margin: 0 auto;
	}
	.text {
		font-weight: 300;
		position: absolute;
		top: 20px;
		left: 10px;
	}
	.panel {
		background-color: #fff;
		border-bottom: 2px solid #e6e6e6;
		margin: 0 auto;
		box-sizing: border-box;
		position: relative;
		padding: 15px;
		box-shadow: 0 3px 6px 0 rgba(0,0,0,.16);
		margin-bottom: 10px;
		border-radius: 0 0 3px 3px;
	}
	.nav {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: stretch;
		position: absolute;
		bottom: 0;
		width: 100%;
	}
	.nav-item {
		background-color: #244a8c;
		border-top: 4px solid #244a8c;
		padding: 15px;
		flex: 1;
		color: #fff;
		text-align: center;
		box-sizing: border-box;
	}
	.nav-item.active {
		background-color: #fff;
		color: #262626;
	}
</style>
<div class="main">
	<div class="header">
		<div class="content appWidth">
			<h1 class="text">Tiny Tasker</h1>
			<nav class="nav">
				<a class="nav-item" [routerLink]="['/tasks']" routerLinkActive="active">Tasks</a>
				<a class="nav-item" [routerLink]="['/settings']" routerLinkActive="active">Settings</a>
			</nav>
		</div>
	</div>
	<div class="panel appWidth">
		<router-outlet></router-outlet>
	</div>
</div>
`;

@Component({
	selector: 'app',
	template,
})
export class MainComponent {

}