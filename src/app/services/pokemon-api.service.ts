import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private pokemonDataSource = new BehaviorSubject<any>(null); // Compartilhar dados
  pokemonData$ = this.pokemonDataSource.asObservable(); // Observable para acessar os dados


  constructor(
    private httpClient: HttpClient
  ) { }

  getPokemon<T>( name: string): Observable<T>{
    return this.httpClient.get<T>(`${this.apiUrl}/${name.toLowerCase()}`)
  }

  setPokemonData(data: any) {
    this.pokemonDataSource.next(data); // Atualizar dados do Pokémon
  }
}
