import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {

  pokemon: any;
  slideOpts = { initialSlide: 1, speed: 200 };

  constructor(
    private pokemonService: PokemonService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.paramMap.subscribe(param => {
      this.getPokemonDetail(param.get('Id'));
    });
  }

  public getPokemonDetail(id: string){
    this.pokemonService.getPokemonDetail(id).subscribe((response: any) => {
      this.pokemon = response;
      console.log(this.pokemon.sprites);
    });
  }

}
