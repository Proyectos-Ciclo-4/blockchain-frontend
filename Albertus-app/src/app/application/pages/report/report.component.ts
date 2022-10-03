import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';
import { ApplicationService } from '../../services/application.service';
import { WebsocketService } from '../../services/websocket.service';
import { Block, Datablock, eventMap } from '../interfaces/models';



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
    private alertService$: SweetalertService,
    private socketService$: WebsocketService
  ) {
    this.applicationId = this.router.url.split('/').pop()!;
  }

  

  ngOnInit(): void {    
    this.bringBlocksByApplicationID(this.applicationId);
    this.socketService$.conect().subscribe(e =>{      
      console.log(e);
      const event = e as eventMap;
      
      if(event.type  == "blockCreated"){
        const blockViewModel = event.data as Datablock
        //this.createReport();
        if (this.applicationId == blockViewModel.applicationId) {
          const ob = {
            timeStamp: blockViewModel.timeStamp.split('T')[0],
            hash: blockViewModel.hash,
            year: blockViewModel.timeStamp.substring(0,4),
            month: blockViewModel.timeStamp.substring(5,7),
            day: blockViewModel.timeStamp.substring(8,10),
            hasOverCharge: blockViewModel.hasOverCharge
          } as Block;     
          this.blocksToReport.push(ob);
        }
      } 
    });
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


  createReport(){

    this.extractDateInfo(); 
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    const asd = hoy.toLocaleDateString().split('/').reverse();
    const correctDate = hoy.toISOString().substring(0,10).split('-')

    let todaysDate = new Date(correctDate[0] + '-' + correctDate[1] +  '-' + correctDate[2]);
    let selectDate = new Date (this.selectedYear + '-' + this.selectedMonth + '-' + this.selectedDay);
    
    if(selectDate>todaysDate)
    {
      this.alertService$.errorMessage("Fecha Superior a fecha actual no es válida")
    }
    else
    {
      this.bringBlocksByApplicationID(this.applicationId);      
      this.extractDateInfo();  
      this.blocksToReport = this.blocks.filter(block => block.year === this.selectedYear && block.month === this.selectedMonth && block.day === this.selectedDay);
      
    }
    console.log(this.blocksToReport);
        
  }

  extractDateInfo(){
    this.selectedYear = this.selectedDate.substring(0,4);
    this.selectedMonth = this.selectedDate.substring(5,7);
    this.selectedDay = this.selectedDate.substring(8,10);
  }


}