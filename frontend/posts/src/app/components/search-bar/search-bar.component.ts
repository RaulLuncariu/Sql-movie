import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  searchTerm!: string;
  countries!: Country[];
  term!: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Country[]>('./assets/data/movies.json')
      .subscribe((data: Country[]) => {
        this.countries = data;
      });
  }

}
