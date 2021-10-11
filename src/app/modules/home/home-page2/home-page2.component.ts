import { Component, OnInit } from '@angular/core';
import { SharedsService } from 'src/app/shared/service/shareds.service';

@Component({
  selector: 'app-home-page2',
  templateUrl: './home-page2.component.html',
  styleUrls: ['./home-page2.component.css']
})
export class HomePage2Component implements OnInit {
  room: number = 0;
  listRent: any[] = [];

  constructor(
    private sharedsService: SharedsService,
  ) { }

  ngOnInit(): void {
    this. getRoomData() ;
  }
  getRoomData() {
    this.sharedsService.getRoom().subscribe((res) => {
      console.log('!!!!!!!!!!!!! Room Data !!!!!!!!!!!', res)
      this.listRent = res;
      let x = this.listRent;
      this.listRent = x.filter(i => String(i.roomStatus).indexOf('1') !== -1);
      this.room = this.listRent.length
      console.log('!!!!!!!!!!!!! Room this.listRent !!!!!!!!!!!', this.listRent)
    },
      (error) => {
        console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
      }
    );
  }

}
