import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  dataSource: any;
  limit = 25;
  offset = 0;
  url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/769px-Pokebola-pokeball-png-0.png';

  constructor( private pokemonService: PokemonService ) { }

  ngOnInit() {
    this.getListPaginatePokemonList();
  }

  getListPaginatePokemonList(): void{
    this.pokemonService.getListPaginatePokemonList(this.limit, this.offset).subscribe((response: any) => {
      this.dataSource = response;
      console.log(this.dataSource);
    });
  }

}
