import { Component } from '@angular/core';
import { Piloto } from 'src/app/interfaces/piloto';
import { Temporada } from 'src/app/interfaces/temporada';
import { PilotoService } from 'src/app/services/piloto.service';
import { TemporadaService } from 'src/app/services/temporada.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-temporadas',
  templateUrl: './temporadas.component.html',
  styleUrls: ['./temporadas.component.scss']
})
export class TemporadasComponent {
  public pilotos: Piloto[] = [];
  public temporada!: Temporada;

  displayedColumns: string[] = ['posicion', 'nombre', 'escuderia', 'victorias', 'puntos'];
  dataSource = new MatTableDataSource<Piloto>();

  selectedYear: string = '';
  years = [  "2023",  "2022",  "2021",  "2020",  "2019",  "2018",  "2017",  "2016",  "2015",  "2014",  "2013",  "2012",  "2011",  "2010",  "2009",  "2008",  "2007",  "2006",  "2005",  "2004",  "2003",  "2002",  "2001",  "2000"];
  constructor(private pilotoService: PilotoService, temporadaService: TemporadaService) {
    this.dataSource = new MatTableDataSource<Piloto>();
  }

  onYearSelected(year: string) {
    console.log('Year selected:', year);
    this.selectedYear = year;
    //this.pilotos.splice(0);
    //this.resultados.splice(0);
    console.log(this.pilotos)
    this.loadDrivers();
  }

  loadDrivers(){
    this.pilotoService.getDriversFromSeason(this.selectedYear).subscribe((response: any) => {
      const data = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      console.log('Year selected:', this.selectedYear);
      this.dataSource = data.map((piloto: any) => {
        return {
          pilotoId: piloto.Driver.driverId,
          nombre: piloto.Driver.givenName,
          apellido: piloto.Driver.familyName,
          fecha: piloto.Driver.dateOfBirth,
          nacionalidad: piloto.Driver.nationality,
          url: piloto.Driver.url,
          posicion: piloto.position,
          puntos: piloto.points,
          victorias: piloto.wins,
          escuderia: piloto.Constructors[0].name
        } as Piloto;
      }).sort((a: Piloto, b: Piloto) => {
        return parseInt(a.posicion) - parseInt(b.posicion);
      });
    });
  }

}
