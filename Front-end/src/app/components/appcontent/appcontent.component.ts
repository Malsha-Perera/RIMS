import { Component, OnInit, AfterViewInit } from '@angular/core';
// import * as Chart from 'chart.js';
// import { FusionChartsModule } from 'angular-fusioncharts';
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
          'caption': 'Sales in One Month',
          'subCaption': '',
          'xAxisName': 'Items',
          'yAxisName': 'Purchases (Kg)',
          'numberSuffix': 'Kg',
          'theme': 'gammel',
      },
      // Chart Data
      'data': [{
          'label': 'Rice',
          'value': '290'
      }, {
          'label': 'Buriyani',
          'value': '260'
      }, {
          'label': 'Fruit Salad',
          'value': '180'
      }, {
          'label': 'Rice & Curry',
          'value': '140'
      }, {
          'label': 'Those',
          'value': '115'
      }, {
          'label': 'Bread',
          'value': '100'
      }, {
          'label': 'Cake',
          'value': '30'
      }, {
          'label': 'Fruit Juice',
          'value': '30'
      }]
    };
  } // end of this.dataSource

  ngOnInit() {
  }

}
