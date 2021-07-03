import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getPokemonData(pokemon: string): Observable<any> {
    const cleanedPokemon = pokemon.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${cleanedPokemon}/`;
    return this.http.get(url);
  }
}
