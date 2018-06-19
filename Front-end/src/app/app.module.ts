import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';



import { AppComponent } from './app.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import {DataService} from './services/data.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PoMainComponent } from './components/po-main/po-main.component';
import { CreatePoComponent } from './components/create-po/create-po.component';
import { ViewPoComponent } from './components/view-po/view-po.component';
import { AppheaderComponent } from './components/appheader/appheader.component';
import { AppmenuComponent } from './components/appmenu/appmenu.component';
import { AppfooterComponent } from './components/appfooter/appfooter.component';
import { AppcontentComponent } from './components/appcontent/appcontent.component';
import { RecipieComponent } from './components/recipie/recipie.component';
import { MenuComponent } from './components/menu/menu.component';
import { UnitCostComponent } from './components/unit-cost/unit-cost.component';
import { PoListComponent } from './components/po-list/po-list.component';
import {DDataService} from "./services/po-list.service";

const appRoutes: Routes = [
  {path: 'item', component: ProductItemComponent},
  {path: 'po', component: PoMainComponent},
  {path: '', component: AppcontentComponent},
  {path: 'cpo', component: CreatePoComponent},
  {path: 'vpo', component: ViewPoComponent},
  {path: 'recipie', component: RecipieComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'uc', component: UnitCostComponent},
  {path: 'pitem', component: PoListComponent},

    ];



@NgModule({
  declarations: [
    AppComponent,
    ProductItemComponent,
    DashboardComponent,
    PoMainComponent,
    CreatePoComponent,
    ViewPoComponent,
    AppheaderComponent,
    AppmenuComponent,
    AppfooterComponent,
    AppcontentComponent,
    RecipieComponent,
    MenuComponent,
    UnitCostComponent,
    PoListComponent,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [DataService,DDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
