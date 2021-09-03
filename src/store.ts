import { makeObservable, observable, action  } from 'mobx';
import { Movie } from './interfaces/movie';
import api from './services/api';

export class Store {

  constructor(){
    makeObservable(this,
      {
      loading:observable,
      page: observable,
      movies: observable,
      setMovies: action,
      setPage: action,
      BuscarMovies: action,
      setLoading: action
    });
  }

  public page = 1;
  public loading = false;
  public movies: Movie = {
    page: 0 ,
    results: [],
    total_pages: 0,
    total_results: 0
  };


  public setMovies(movies:Movie){
    this.movies = movies;
  }

  public setPage(pageNumber:number){
    this.page = pageNumber;
  }

  public setLoading(loading:boolean){
    this.loading = loading;
  }


  async BuscarMovies(search:string){
    if(this.loading){
      return;
    }

    this.setLoading(true)

    try {

      const reponse = await api.get(`${search}&page=${this.page}`);
      this.setMovies(reponse.data);
    } catch (error) {

      console.log(error);

    }finally{
      this.setLoading(false);
    }

  }

}

