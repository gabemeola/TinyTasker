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
		width: 60%;
		height: 100%;
		margin: 0 auto;
	}
	.text {
		font-weight: 300;
		position: absolute;
		top: 20px;
		left: 10px;
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
		<div class="content">
			<h1 class="text">Tiny Tasker</h1>
			<nav class="nav">
				<a class="nav-item active" href="#">Tasks</a>
				<a class="nav-item" href="#">Settings</a>
			</nav>
		</div>
	</div>
	<tasks></tasks>
</div>
`;

@Component({
	selector: 'app',
	template,
})
export class MainComponent {

}