import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { toArray } from 'utils';
import * as components from 'components';
import * as services from 'services';
import { routing } from 'config/app.routes';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		routing
	],
	declarations: [
		// Declare Everything from the components' index.ts file
		...toArray(components),
	],
	providers: [
		// Declare Everything from the services' index.ts file
		...toArray(services),
	],
	// Bootstrap MainComponent
	bootstrap: [components.MainComponent],
})
export class AppModule {}