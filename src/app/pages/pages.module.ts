import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ListComponent } from './list/list.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ListComponent, PokemonComponent],
  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
