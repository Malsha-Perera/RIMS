import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js';
import { FusionChartsModule } from 'angular-fusioncharts';
import FusionCharts from 'fusioncharts/core';
import Column2D from 'fusioncharts/viz/column2d';

@Component({
  selector: 'app-appcontent',
  templateUrl: './appcontent.component.html',
  styleUrls: ['./appcontent.component.css']
})
export class AppcontentComponent implements OnInit {

  BarChart: any [] = [];
  // chart: any;
  dataSource: Object;
  constructor() {
    this.dataSource = {
      chart: {
          'caption': 'Items purchase in One Year [2017-18]',
          'subCaption': 'In MMbbl = One Million barrels',
          'xAxisName': 'Items',
          'yAxisName': 'Purchases (Kg)',
          'numberSuffix': 'Kg',
          'theme': 'gammel',
      },
      // Chart Data
      'data': [{
          'label': 'Venezuela',
          'value': '290'
      }, {
          'label': 'Saudi',
          'value': '260'
      }, {
          'label': 'Canada',
          'value': '180'
      }, {
          'label': 'Iran',
          'value': '140'
      }, {
          'label': 'Russia',
          'value': '115'
      }, {
          'label': 'UAE',
          'value': '100'
      }, {
          'label': 'US',
          'value': '30'
      }, {
          'label': 'China',
          'value': '30'
      }]
    };
  } // end of this.dataSource

  ngOnInit() {
  }

}
