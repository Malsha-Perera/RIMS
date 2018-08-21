import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import { AppBootstrapModule } from './app-bootstrap.module';

import { RegisterService } from './services/register.service';



//import { chart } from 'chart.js';
import { DataTableModule } from 'angular2-datatable';
 import { FusionChartsModule } from 'angular-fusioncharts';
import FusionCharts from 'fusioncharts/core';
import Column2D from 'fusioncharts/viz/column2d';
import FusionTheme from 'fusioncharts/themes/es/fusioncharts.theme.fusion';
import GammelTheme from 'fusioncharts/themes/es/fusioncharts.theme.gammel';


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

import{RegisterComponent} from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';


import { StockIssueComponent } from './components/inventory/stock-issue/stock-issue.component';
import { CustomerPipe } from './pipes/customer.pipe';
import { SalesItemPipe } from './pipes/sales-item.pipe';
import { InvoiceComponent } from './components/invoice/invoice.component';


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

  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'header',component:AppheaderComponent},

  {path: 'items/stockIssue', component: StockIssueComponent},
  {path: 'invoice',component:InvoiceComponent}


    ];


 FusionChartsModule.fcRoot(FusionCharts, Column2D, FusionCharts, FusionTheme, GammelTheme);
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

    RegisterComponent,
    LoginComponent,

    StockIssueComponent,

    CustomerPipe,

    SalesItemPipe,

    InvoiceComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppBootstrapModule,
    RouterModule.forRoot(appRoutes),
    DataTableModule,
    FusionChartsModule

  ],

  providers: [DataService,DDataService,RegisterService],


  bootstrap: [AppComponent]
})
export class AppModule { }
