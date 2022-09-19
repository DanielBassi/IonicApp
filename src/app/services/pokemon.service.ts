import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private urlApi: string = environment.urlApi;

  constructor(
    private http: HttpClient
  ) { }

  public getListPaginatePokemonList(limit: number = 10, offset: number = 0): Observable<any[]>{
    return this.http.get(`${this.urlApi}?limit=${limit}&offset=${offset}`)
    .pipe(map((result: any) => result.results.map((res: any) => ({
      id: res.url.split(this.urlApi)[1].replace('/', ''),
      url: res.url,
      name: res.name
    }))));
  }

  public getPokemonDetail(id: string): Observable<any>{
    return this.http.get(`${this.urlApi}${id}`);
  }

}
