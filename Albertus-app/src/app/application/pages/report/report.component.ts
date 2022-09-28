import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Block } from '../../interfaces/models';
import { ReportService } from '../../services/report.service';

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
    private request$: ReportService,
    private router: Router,
    
  ) {
    this.applicationId = this.router.url.split('/').pop()!;
  }

  

  ngOnInit(): void {
    this.bringBlocksByApplicationID(this.applicationId);

  }


  bringBlocksByApplicationID(applicationId:string){
    this.request$.getAllBlocksByApplicationId(applicationId).subscribe(blocks => {
        blocks.map((block: any) => {
        const ob:Block = {
          timeStamp: block.timeStamp,
          hash: block.hash,
          year: block.timeStamp.substring(0,4),
          month: block.timeStamp.substring(5,7),
          day: block.timeStamp.substring(8,10),
        }
        this.blocks.push(ob);

        console.log(this.blocks);
      })
    })

  }


  createReport(){
      this.extractDateInfo();
      // this.blocksToReport.map(block => block.year === this.selectedYear && block.month === this.selectedMonth && block.day === this.selectedDay)
      // console.log(this.blocks.filter(block => block.year === this.selectedYear && block.month === this.selectedMonth && block.day === this.selectedDay));
      console.log(this.selectedDay);
      // this.blocksToReport = this.blocks.filter(block => block.year === this.selectedYear && block.month === this.selectedMonth && block.day === this.selectedDay) 
      this.blocksToReport = this.blocks.filter(block => block.year === this.selectedYear && block.month === this.selectedMonth && block.day === this.selectedDay) 
      console.log(this.blocksToReport); 
      console.log(this.selectedDate);
  }

  // checkBlock(block:Block){
  //   return block.year === this.selectedYear && block.month === this.selectedMonth && block.day === this.selectedDay;
  // }

  extractDateInfo(){
    this.selectedYear = this.selectedDate.substring(0,4);
    this.selectedMonth = this.selectedDate.substring(5,7);
    this.selectedDay = this.selectedDate.substring(8,10);
  }


}