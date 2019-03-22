import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MoovieProvider
  ]
})
export class FeedPage {

  public objetoFeed = {
    titulo: "Adriano Gonçalves",
    data: "April 15, 1988",
    descricao: "Estou aprendendo Ionic agora :)",
    qtdLikes: 1024,
    qtdComents: 512,
    timeComent: "2h ago"
  }

  public loading;
  public refresher;
  public isRefreshing: boolean = false;

  private sobreNome: string = "de Souza"
  public nomeDoUsuario: string = "Adriano Gonçalves " + this.sobreNome;

  public listaFilmes = new Array<any>();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MoovieProvider,
    public loadingCtrl: LoadingController) {
  }

  public exibeMensagemBoasVindas(usuario: string): void {
    alert("Bem vindo a primeira página Ionic criada por " + usuario);
  }

  ionViewDidEnter() {
    this.carregarFilmes();
  }

  carregarFilmes(){
    this.iniciaLoading();
    this.movieProvider.getLatestMovies().subscribe(data => {
      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);
      this.listaFilmes = objeto_retorno.results;
      console.log(objeto_retorno);
      this.fechaLoading();
      this.estaCarregando();
    }, error => {
      this.estaCarregando();
      console.log(error);
      this.fechaLoading();
    }
    );
  }

  iniciaLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Carregando filmes...'
    });
  
    this.loading.present();
  
    /*setTimeout(() => {
      this.loading.dismiss();
    }, 5000);*/
   }

  fechaLoading(){
    this.loading.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregarFilmes();
    console.log('Begin async operation', refresher);

   /* setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);*/
  }

  estaCarregando(){
    if(this.isRefreshing){
      this.refresher.complete();
      this.isRefreshing = false;
    }
  }

}
