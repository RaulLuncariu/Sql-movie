import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

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

  cards:any = []
  cardsForHandset = []
  cardsForWeb = []

  isHandset:boolean = false;
  isHandsetObserver: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return true;
      }

      return false;
    })
  );

  constructor(private http: HttpClient, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.http.get<Country[]>('./assets/data/movies.json')
      .subscribe((data: Country[]) => {
        this.countries = data;
      });
  }

  getMovies(): Observable<any>{
    return this.http.get('http://localhost:3000/movie');

  }

}
