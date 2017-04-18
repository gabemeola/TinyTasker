import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import * as components from 'components';

@NgModule({
	imports: [BrowserModule, FormsModule],
	// declarations: [MainComponent],
	declarations: Object.keys(components).map((c) => components[c]),
	providers: [],
	bootstrap: [components.MainComponent],
})
export class AppModule {}