import { Component, Input } from '@angular/core';
import {Chart, ChartConfiguration, ChartData, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Pokemon } from '../../../../types';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [CommonModule,BaseChartDirective],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss'
})

export class PokemonDetailsComponent {
  @Input() pokemonData: Pokemon | null = null;
  @Input() showDetails = false;

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

  public radarChartLabels: string[] = ['HP', 'Ataque', 'Defesa', 'Ataque Especial', 'Defesa Especial', 'Velocidade'];

  public radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [{ data: [], label: 'Stats' }]
  };
  public radarChartType: ChartType = 'radar';

  toggleDetails() {
    this.showDetails = !this.showDetails;
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

  getTypeColorWithTransparency(type: string, opacity: number) {
    const color = this.typeColors[type.toLowerCase()] || '#777777';
    return this.hexToRgba(color, opacity);
  }

  hexToRgba(hex: string, alpha: number): string {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r},${g},${b},${alpha})`;
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
