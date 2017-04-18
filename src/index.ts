// Angular 4 Polyfills
import 'zone.js/dist/zone';
import 'reflect-metadata';
import 'rxjs/add/operator/toPromise';

// Angular 4 Framework Imports
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app.module';

// Bootstrapping Application
if(process.env.NODE_ENV === 'production') {
	enableProdMode();
	platformBrowser().bootstrapModule(AppModule);
} else {
	platformBrowserDynamic().bootstrapModule(AppModule);
}