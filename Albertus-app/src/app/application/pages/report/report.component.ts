import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { WebsocketService } from '../../services/websocket.service';
import { Block, eventMap } from '../interfaces/models';



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
    private socketService$: WebsocketService
    
  ) {
    this.applicationId = this.router.url.split('/').pop()!;
  }

  

  ngOnInit(): void {    
    this.bringBlocksByApplicationID(this.applicationId);
    this.socketService$.conect().subscribe(eventMap =>{
      const event = eventMap as eventMap;
      console.log(event.type);
      if(event.type  == "blockCreated"){
        this.createReport();
        /* console.log(event.data)
        const ob = {
          timeStamp: event.data.timeStamp,
          hash: event.data.hash,
          year: event.data.timeStamp.substring(0,4),
          month: event.data.timeStamp.substring(5,7),
          day: event.data.timeStamp.substring(8,10),
          hasOverCharge: event.data.hasOverCharge
        } as Block;          
        this.blocks.push(ob); */
      } 
    });

  }


  bringBlocksByApplicationID(applicationId:string){
    this.request$.getAllBlocksByApplicationId(applicationId).subscribe(blocks => {
        blocks.map((block: any) => {
          const validationExists = this.blocks.filter(b => b.hash == block.hash);
          if (validationExists.length < 1) {
            const ob = {
              timeStamp: block.timeStamp,
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
    this.bringBlocksByApplicationID(this.applicationId);
    console.log(this.blocks);
    debugger
    this.extractDateInfo();  
    this.blocksToReport = this.blocks.filter(block => block.year === this.selectedYear && block.month === this.selectedMonth && block.day === this.selectedDay);
  }


  extractDateInfo(){
    this.selectedYear = this.selectedDate.substring(0,4);
    this.selectedMonth = this.selectedDate.substring(5,7);
    this.selectedDay = this.selectedDate.substring(8,10);
  }


}