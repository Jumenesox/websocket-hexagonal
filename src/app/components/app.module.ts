import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../adapters/in-memory-data.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroAdapterService } from '../adapters/hero-adapter.service';
import { MessageAdapterService } from '../adapters/message-adapter.service';
import HeroesDisplayer from '../domain/heroes-displayer';
import { WebsocketService } from '../domain/websocket.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  providers: [
    
    // Inject domain classes into components
    {provide: 'IDisplayHeroes', useClass: HeroesDisplayer},
    {provide: 'IDisplayHeroesSearch', useClass: HeroesDisplayer},
    
    // Inject adapters into domain classes
    {provide: 'IManageHeroes', useClass: HeroAdapterService},
    {provide: 'IManageMessages', useClass: MessageAdapterService},
    {provide: 'IWebSocket', useClass: WebsocketService}
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
