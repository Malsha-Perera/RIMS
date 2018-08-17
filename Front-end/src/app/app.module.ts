import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import { AppBootstrapModule } from './app-bootstrap.module';
import { chart } from 'chart.js';
import { DataTableModule } from 'angular2-datatable';


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
import { StockUpdateComponent } from './components/stock-update/stock-update.component';
import { AddRecipieComponent } from './components/add-recipie/add-recipie.component';
import { ItemDetailComponent } from './components/inventory/item-detail/item-detail.component';
import { ItemDetailPipe } from './pipes/item-detail.pipe';
import { SetRolComponent } from './components/inventory/item-detail/set-rol/set-rol.component';
import { CustomerComponent } from './components/customer/customer.component';
import { SalesComponent } from './components/sales/sales.component';
import { PoListComponent } from './components/po-list/po-list.component';
import {DDataService} from './services/po-list.service';
import { ViewPoAllComponent } from './components/view-po-all/view-po-all.component';
import { StockIssueComponent } from './components/inventory/stock-issue/stock-issue.component';

const appRoutes: Routes = [
  {path: 'item', component: ProductItemComponent},
  {path: 'po', component: PoMainComponent},
  {path: '', component: AppcontentComponent},
  {path: 'po/cpo', component: CreatePoComponent},
  {path: 'po/vpo', component: ViewPoComponent},
  {path: 'menu/recipie', component: RecipieComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'uc', component: UnitCostComponent},
  {path: 'items/stockupdate', component: StockUpdateComponent},
  {path: 'stockupdate', component: StockUpdateComponent},
  {path: 'menu/addrecipie', component: AddRecipieComponent},
  {path: 'addrecipie', component: AddRecipieComponent},
  {path: 'items', component: ItemDetailComponent},
  {path: 'sales', component: SalesComponent},
  {path: 'customers', component: CustomerComponent},
  {path: 'pitem', component: PoListComponent},
  {path: 'vpa', component: ViewPoAllComponent},
  {path: 'items/stockIssue', component: StockIssueComponent}

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
    StockUpdateComponent,
    AddRecipieComponent,
    ItemDetailComponent,
    ItemDetailPipe,
    SetRolComponent,
    CustomerComponent,
    SalesComponent,
    PoListComponent,
    ViewPoAllComponent,
    StockIssueComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    AppBootstrapModule,
    RouterModule.forRoot(appRoutes),
    DataTableModule

  ],
  providers: [DataService, DDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
