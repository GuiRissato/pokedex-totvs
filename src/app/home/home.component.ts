import { Component, OnInit } from '@angular/core';
import { PokemonApiService } from '../services/pokemon-api.service';
import { PokemonSearchComponent } from '../components/pokemon-search/pokemon-search.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../../types';
import { Chart, ChartConfiguration, ChartData, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PokemonSearchComponent, MatIconModule, CommonModule, BaseChartDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  pokemonData: any;
  showDetails = false;

  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins:{
      legend:{
        display: false
      }
    },
    scales: {
      r: {
        pointLabels: {
          display: true 
        },
        ticks: {
          display: false
        }
      }
    }
  };
  public radarChartLabels: string[] = ['HP', 'Atque', 'Defesa', 'Ataque Especial', 'Defesa Especial', 'velocidade'];

  public radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [
      { data: [], label: 'Stats' }
    ]
  };
  public radarChartType: ChartType = 'radar';

  constructor(
    private pokemonService: PokemonApiService,
  ) { }

  ngOnInit(): void {
    // Inicialização do componente
  }

  onPokemonSearched(pokemon: Pokemon) {
    this.showDetails = false;
    this.pokemonData = pokemon;
    this.updateChartData(pokemon);
  }

  updateChartData(pokemon: Pokemon) {
    const stats = pokemon.stats.map((stat) => stat.base_stat);
    this.radarChartData.datasets[0].data = stats;
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  typeColors: { [key: string]: string } = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
  };

  getTypeColorWithTransparency(type: string, opacity: number) {
    const color = this.typeColors[type.toLowerCase()] || '#777777'; // Cor padrão se o tipo não for encontrado
    const rgbaColor = this.hexToRgba(color, opacity);
    return rgbaColor;
  }

  getCardStyles() {
    if (this.pokemonData?.types.length === 1) {
      const mainTypeColor = this.getTypeColorWithTransparency(this.pokemonData.types[0].type.name, 0.6);
      return {
        backgroundColor: mainTypeColor,
        border: `3px solid ${mainTypeColor}`
      };
    } else if (this.pokemonData?.types.length > 1) {
      const mainTypeColor = this.getTypeColorWithTransparency(this.pokemonData?.types[0].type.name, 0.6);
      const secondTypeColor = this.getTypeColorWithTransparency(this.pokemonData?.types[1].type.name, 1);
      return {
        backgroundColor: mainTypeColor,
        border: `3px solid ${secondTypeColor}`
      };
    }
    return {};
  }

  hexToRgba(hex: string, alpha: number): string {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r},${g},${b},${alpha})`;
  }

  getGender(genderRate: number): string {
    if (genderRate === -1) {
      return 'Genderless';
    }
    const femaleRate = (genderRate / 8) * 100;
    const maleRate = 100 - femaleRate;
    return `Male: ${maleRate}%, Female: ${femaleRate}%`;
  }

  getWeaknesses(types: any[]): string {
    return 'Implementar lógica de fraquezas';
  }
}