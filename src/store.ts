import { makeObservable, observable, action  } from 'mobx';
import { Movie } from './interfaces/movie';
import api from './services/api';

export class Store {

  constructor(){
    makeObservable(this,
      {
      page: observable,
      movies: observable,
      setMovies: action,
      setPage: action,
      BuscarMovies: action,
    });
  }

  public page = 1;

  public movies: Movie = {
    page: 0 ,
    results: [],
    total_pages: 0,
    total_results: 0
  };


  setMovies(movies:Movie){
    this.movies = movies;
  }

  setPage(pageNumber:number){
    this.page = pageNumber;
  }

  async BuscarMovies(search:string){
    try {
      const reponse = await api.get(`${search}&page=${this.page}`);
      this.setMovies(reponse.data);
    } catch (error) {
      console.log(error)
    }

  }

}

