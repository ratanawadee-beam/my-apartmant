import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedsService } from 'src/app/shared/service/shareds.service';
@Component({
  selector: 'app-admin-room',
  templateUrl: './admin-room.component.html',
  styleUrls: ['./admin-room.component.css']
})
export class AdminRoomComponent implements OnInit {
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

}
