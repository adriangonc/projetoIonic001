import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  private sobreNome: string = "de Souza"
  public nomeDoUsuario: string = "Adriano Gonçalves " + this.sobreNome;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MoovieProvider) {
  }

  public exibeMensagemBoasVindas(usuario: string): void {
    alert("Bem vindo a primeira página Ionic criada por " + usuario);
  }

  ionViewDidLoad() {
    this.movieProvider.getLatestMovies().subscribe(data => {
      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);
      console.log(objeto_retorno);
    }, error => {
      console.log(error);
    }
    );

  }

}
