import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

interface PokemonModel {
  name: string;
  id: number;
  types: string[];
  abilities: string[];
  stats: {
    hp: number;
    atk: number;
    def: number;
    spAtk: number;
    spDef: number;
    spd: number;
  };
  sprite: string;
}

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  pokemonSearch: string;
  pokemonData: PokemonModel;
  errorMessage: string;
  loading: boolean = true;
  found: boolean = false;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  onKey(event) {
    this.pokemonSearch = event.target.value;
  }

  getPokemon(pokemon: string){
    if(pokemon) {
      this.apiService.getPokemonData(pokemon).subscribe(data => {
        this.pokemonData = {
          name: this.capitalize(data.name),
          id: data.id,
          types: [],
          abilities: [],
          stats: {
            hp: data.stats[0].base_stat,
            atk: data.stats[1].base_stat,
            def: data.stats[2].base_stat,
            spAtk: data.stats[3].base_stat,
            spDef: data.stats[4].base_stat,
            spd: data.stats[5].base_stat
          },
          sprite: data.sprites.front_default
        }
        data.types.forEach(type => {
          this.pokemonData.types.push(this.capitalize(type.type.name));
        });
        data.abilities.forEach(ability => {
          this.pokemonData.abilities.push(this.capitalize(ability.ability.name));
        })
        this.loading = false;
        this.found = true;
      }, () => {
        this.loading = false;
        this.found = false;
        this.errorMessage = 'Error! Pokemon couldn\'t be found! Please check if you have any spelling errors';
      })
    } else {
      this.loading = false;
      this.found = false;
      this.errorMessage = 'Error! Input box is empty!'
    }
  }

  capitalize(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  back() {
    this.router.navigateByUrl('/landing');
  }
}
