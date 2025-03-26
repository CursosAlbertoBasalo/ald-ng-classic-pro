import { importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { CoreModule } from './app/core/core.module';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(BrowserModule, AppRoutingModule, CoreModule)],
}).catch((err) => console.error(err));
