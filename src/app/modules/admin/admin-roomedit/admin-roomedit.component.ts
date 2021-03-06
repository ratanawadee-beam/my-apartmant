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
  roomStatus: any = ['1', '2'];

  roomeditForm = new FormGroup({
    roomId: new FormControl(''),
    roomTypename: new FormControl(''),
    roomStatus: new FormControl(''),
    roomWater: new FormControl(''),
    roomLight: new FormControl(''),
    roomPrice: new FormControl(''),
  })
  constructor(
    private _Activatedroute: ActivatedRoute,
    private sharedsService: SharedsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.roomId = this._Activatedroute.snapshot.paramMap.get("id");
    console.log('!!!!!!!!!!this.roomId!!!!!!!!!!!!!!', this.roomId)
    this.getRoomByroomId(this.roomId);
  }

  getRoomByroomId(roomId: any) {
    this.sharedsService.getRoomByroomId(roomId).subscribe((res) => {
      console.log('!!!!!!!!!!! res editroom !!!!!!!!!!!!!', res)
      this.roomeditForm.patchValue({
        roomId: roomId,
        roomTypename: res.roomTypename,
        roomStatus: res.roomStatus,
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
      "roomStatus": this.roomeditForm.value.roomStatus,
      "roomWater": this.roomeditForm.value.roomWater,
      "roomLight": this.roomeditForm.value.roomLight,
      "roomPrice": this.roomeditForm.value.roomPrice,
    }
    setTimeout(function () { window.location.reload(); }, 2 * 1000);
    this.sharedsService.updateRoom(body).subscribe(
      (error) => console.log(error),
    );
    this.router.navigate(['admin/room']);
  }
  back() {
    this.router.navigate(['admin/room']);
  }
}
