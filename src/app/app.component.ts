import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Schedule Filter';
  items: any;
  fields: any  = { firstInput: '' };
  filteredResultSetLength = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getDataFromJsonFile();
  }

  getDataFromJsonFile() {
    this.http
      .get('../assets/data.json')
      .subscribe(data => {
        this.items = this.massageData(data);
        console.log(this.items);
      });
  }

  updateFilters(): void {
      const filteredItemsData = this.matchItemsdayAndRange();
      if (this.fields.firstInput.length > 3) {
        if (this.filteredResultSetLength === 0) {
          this.items = [{dayAndRange: 'item is scheduled for 00:00-24:00 ', id: ' '}];
        } else if (this.filteredResultSetLength) {
          this.items = filteredItemsData;
        }
    } else if (this.fields.firstInput < 3) {
      this.getDataFromJsonFile();
    }
}

  massageData(data) {
    const newArray: any[] = [];
    data.forEach(element => {
      newArray.push({dayAndRange: element[0], id: element[1].id});
    });

    return newArray;
  }

  matchItemsdayAndRange() {
    const resultSet = this.items.filter(item => {
      return item.dayAndRange.match(this.fields.firstInput);
    });
    this.filteredResultSetLength = resultSet.length;
    return resultSet;
  }
}
