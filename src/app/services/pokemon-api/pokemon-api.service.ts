import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private pokemonDataSource = new BehaviorSubject<any>(null);
  pokemonData$ = this.pokemonDataSource.asObservable();


  constructor(
    private httpClient: HttpClient
  ) { }

  getPokemon<T>( name: string): Observable<T>{
    return this.httpClient.get<T>(`${this.apiUrl}/${name.toLowerCase()}`)
  }

  setPokemonData(data: any) {
    this.pokemonDataSource.next(data); 
  }
}
