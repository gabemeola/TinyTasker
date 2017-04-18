import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent, SettingComponent } from 'components';

// Router Configuration
export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: '/tasks',
	},
	{
		path: 'tasks',
		component: TasksComponent,
	},
	{
		path: 'settings',
		component: SettingComponent,
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});