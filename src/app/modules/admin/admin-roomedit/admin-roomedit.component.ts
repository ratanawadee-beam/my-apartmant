import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedsService } from 'src/app/shared/service/shareds.service';

@Component({
  selector: 'app-admin-roomedit',
  templateUrl: './admin-roomedit.component.html',
  styleUrls: ['./admin-roomedit.component.css']
})
export class AdminRoomeditComponent implements OnInit {
  roomId: any
  roomTypename: any = ['แอร์', 'พัดลม'];
  roomStatvs: any = ['ว่าง', 'ไม่ว่าง'];
  roomeditForm = new FormGroup({
    roomId: new FormControl(''),
    roomTypename: new FormControl(''),
    roomStatvs: new FormControl(''),
    roomWater: new FormControl(''),
    roomLight: new FormControl(''),
    roomPrice: new FormControl(''),
  })
  constructor(
    private _Activatedroute: ActivatedRoute,
    private sharedsService: SharedsService,
    private router: Router
     )    { }
 
  ngOnInit(): void {
    this.roomId = this._Activatedroute.snapshot.paramMap.get("id");
    console.log('!!!!!!!!!!this.roomId!!!!!!!!!!!!!!', this.roomId)
    this.getRoomByroomId(this.roomId); 
  }

  getRoomByroomId(roomId: any) {
    this.sharedsService.getRoomByroomId(roomId).subscribe((res) => {
      console.log('!!!!!!!!!!! res editroom !!!!!!!!!!!!!', res)
      this.roomeditForm.patchValue({
        roomId:roomId,
        roomTypename: res.roomTypename,
        roomStatvs: res.roomStatvs,
        roomWater: res.roomWater,
        roomLight: res.roomLight,
        roomPrice: res.roomPrice,
      });
    },
      (error) => {
        console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
      }
    );
  }
 
  save() {
    console.log(this.roomeditForm.value.roomId,
      this.roomeditForm.value.roomName);
    let body = {
      "roomId": this.roomeditForm.value.roomId,
      "roomTypename": this.roomeditForm.value.roomTypename,
      "roomStatvs": this.roomeditForm.value.roomStatvs,
      "roomWater": this.roomeditForm.value. roomWater,
      "roomLight": this.roomeditForm.value.roomLight,
      "roomPrice": this.roomeditForm.value.roomPrice,
  
    }
    this.sharedsService.updateRoom(body).subscribe(
      (error) => console.log(error),
    );
    this.router.navigate(['admin/room']);
  }
  back(){
    this.router.navigate(['admin/room']);
  }
}
