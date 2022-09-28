import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    
  ) {
    this.applicationId = this.router.url.split('/').pop()!;
  }

  

  ngOnInit(): void {
    this.bringBlocksByApplicationID(this.applicationId);

  }


  bringBlocksByApplicationID(applicationId:string){
    this.request$.getAllBlocksByApplicationId(applicationId).subscribe(blocks => {
        blocks.map((block: any) => {
        const ob = {
          timeStamp: block.timeStamp,
          hash: block.hash,
          year: block.timeStamp.substring(0,4),
          month: block.timeStamp.substring(5,7),
          day: block.timeStamp.substring(8,10),
        } as Block;
        this.blocks.push(ob);

        console.log(this.blocks);
      })
    })

  }


  createReport(){
    this.extractDateInfo();         
    this.blocksToReport = this.blocks.filter(block => block.year === this.selectedYear && block.month === this.selectedMonth && block.day === this.selectedDay);
  }


  extractDateInfo(){
    this.selectedYear = this.selectedDate.substring(0,4);
    this.selectedMonth = this.selectedDate.substring(5,7);
    this.selectedDay = this.selectedDate.substring(8,10);
  }


}