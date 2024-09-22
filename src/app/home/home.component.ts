import { Component, OnInit } from '@angular/core';
import { PokemonApiService } from '../services/pokemon-api.service';
import { PokemonSearchComponent } from '../components/pokemon-search/pokemon-search.component';
import { PokemonDetailsComponent } from '../components/pokemon-details/pokemon-details.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../../types';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PokemonSearchComponent, PokemonDetailsComponent, MatIconModule, CommonModule, BaseChartDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  pokemonData: Pokemon | null = null;
  showDetails = false;

  constructor(private pokemonService: PokemonApiService) {}

  ngOnInit(): void {}

  onPokemonSearched(pokemon: Pokemon) {
    this.showDetails = false;
    this.pokemonData = pokemon;
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }
}