import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, Platform, IonInfiniteScroll } from '@ionic/angular';
import { PokemonService } from 'src/app/services/pokemon.service';
import { environment } from 'src/environments/environment';

import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;

  dataSource: any = [];
  limit = 20;
  offset = 100;
  url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/769px-Pokebola-pokeball-png-0.png';
  urlApi: string = environment.urlApi;
  dataSourceComplete: any = [];
  backToTop: boolean = true;

  constructor(private pokemonService: PokemonService, private toastController: ToastController) { }

  ngOnInit() {
    this.getListPaginatePokemonList();
  }

  /* getScrollPos(pos: number) {

    if (pos > this.platform.height()) {
         this.backToTop = true;
    } else {
         this.backToTop = false;
    }
  } */

  search(search: string) {
    this.dataSource = this.dataSourceComplete.filter(f => f.name.toLowerCase().includes(search));
  }

  gotToTop() {
    console.log(this.content);
    this.content.scrollToTop(1000);
  }

  getScrollPos(pos: any) {

  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      this.offset++;
      this.getListPaginatePokemonList();
    }, 500);
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'No más elementos para cargar',
      duration: 1500,
      position: position
    });

    await toast.present();
  }

  getListPaginatePokemonList() {
    this.pokemonService.getListPaginatePokemonList(this.limit, this.offset).then((observable: any) => {

      console.log(observable);

      observable.subscribe((response: any) => {
        console.log(response);
        if (response.length === 0)
        this.presentToast('bottom');

        /* response = response.results.map(res => ({
          id: res.url.split(this.urlApi)[1].replace('/', ''),
          url: res.url,
          name: res.name
        })); */

        this.dataSource = [...this.dataSource, ...response];
        this.dataSourceComplete = this.dataSource;
      });
    });
  }

}
