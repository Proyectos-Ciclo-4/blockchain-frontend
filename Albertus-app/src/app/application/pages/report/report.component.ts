import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';
import { ApplicationService } from '../../services/application.service';
import { Block } from '../interfaces/models';



@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  applicationId:string;
  blocks:Block[] = [];
  selectedDate:string = "";
  selectedYear:string = "";
  selectedMonth:string = "";
  selectedDay: string = "";
  blocksToReport:Block[] = [];

  constructor(    
    private router: Router,
    private request$: ApplicationService,    
    private alertService$: SweetalertService
    
  ) {
    this.applicationId = this.router.url.split('/').pop()!;
  }

  

  ngOnInit(): void {    
    this.bringBlocksByApplicationID(this.applicationId);
    
  }


  bringBlocksByApplicationID(applicationId:string){
    this.request$.getAllBlocksByApplicationId(applicationId).subscribe((blocks: any[]) => {
        blocks.map((block: any) => {
          const validationExists = this.blocks.filter(b => b.hash == block.hash);
          if (validationExists.length < 1) {
            const ob = {
              timeStamp: block.timeStamp.split('T')[0],
              hash: block.hash,
              year: block.timeStamp.substring(0,4),
              month: block.timeStamp.substring(5,7),
              day: block.timeStamp.substring(8,10),
              hasOverCharge: block.hasOverCharge
            } as Block;          
            this.blocks.push(ob);
          }
      })
    })

  }


  // createReport(){
    
  //   this.bringBlocksByApplicationID(this.applicationId);
  //   console.log(this.blocks);
  //   debugger
  //   this.extractDateInfo();  
  //   this.blocksToReport = this.blocks.filter(block => block.year === this.selectedYear && block.month === this.selectedMonth && block.day === this.selectedDay);
  // }

  createReport(){

    this.extractDateInfo(); 
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    const asd = hoy.toLocaleDateString().split('/').reverse();
    const correctDate = hoy.toISOString().substring(0,10).split('-')
    console.log(asd);
    console.log(correctDate);

    let todaysDate = new Date(correctDate[0] + '-' + correctDate[1] +  '-' + correctDate[2]);
    let selectDate = new Date (this.selectedYear + '-' + this.selectedMonth + '-' + this.selectedDay);
    
    if(selectDate>todaysDate)
    {
        this.alertService$.errorMessage("Fecha Superior a fecha actual no es válida")
    }
    else
    {
      this.bringBlocksByApplicationID(this.applicationId);
      console.log(this.blocks);
      this.extractDateInfo();  
      this.blocksToReport = this.blocks.filter(block => block.year === this.selectedYear && block.month === this.selectedMonth && block.day === this.selectedDay);
      
    }

    
    
  }





  

  extractDateInfo(){
    this.selectedYear = this.selectedDate.substring(0,4);
    this.selectedMonth = this.selectedDate.substring(5,7);
    this.selectedDay = this.selectedDate.substring(8,10);
  }


}