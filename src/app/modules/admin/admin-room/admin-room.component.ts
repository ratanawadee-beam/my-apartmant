import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedsService } from 'src/app/shared/service/shareds.service';
@Component({
  selector: 'app-admin-room',
  templateUrl: './admin-room.component.html',
  styleUrls: ['./admin-room.component.css']
})
export class AdminRoomComponent implements OnInit {

  page = 1;
  count = 0;
  tableSize = 5;
  tableSizes = [3, 6, 9, 12];


  listRoom: any;
  constructor(
    private sharedsService: SharedsService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getRoomData();
    
  }

  getRoomData() {
    this.sharedsService.getRoom().subscribe((res) => {
      console.log('!!!!!!!!!!!!! Room Data !!!!!!!!!!!', res)
      this.listRoom = res;
    },
      (error) => {
        console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
      }
    );
  }
  // Next(){
  //   this.router.navigate(['admin/regisroom']);
  // }
gotoedit(data: any){
  this.router.navigate(['admin/roomedit',data.roomId]);
}

pageChanged(event: any) {
  this.page = event;
  this.getRoomData();
}
}
