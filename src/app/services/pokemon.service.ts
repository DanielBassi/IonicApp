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

  public async getListPaginatePokemonList(limit: number = 10, offset: number = 0): Promise<any>{
    return this.http.get(`${this.urlApi}?limit=${limit}&offset=${offset}`)
    .pipe(
      map((response: any) => response.results.map(async (result: any) => (
        await this.getAsyncPokemonDetail(result.url.split(this.urlApi)[1].replace('/', '')).then(pokemon => pokemon)
      )))
    );
    /* .pipe(map((result: any) => result.results.map((res: any) => (
      this.getPokemonDetail(res.url.split(this.urlApi)[1].replace('/', '')).subscribe(res => {
        return res
      });
    )))); */
  }

  async getAsyncPokemonDetail(id: string): Promise<any>{
    return await this.getPokemonDetail(id).toPromise().then(pokemon => pokemon);
  }

  public getPokemonDetail(id: string): Observable<any>{
    return this.http.get(`${this.urlApi}${id}`);
  }

}
