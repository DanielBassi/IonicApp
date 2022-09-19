import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ListComponent } from './list/list.component';
import { PokemonComponent } from './pokemon/pokemon.component';



@NgModule({
  declarations: [ListComponent, PokemonComponent],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
