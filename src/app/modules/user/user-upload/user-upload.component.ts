import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/shared/service/admin.service';
import { SharedsService } from 'src/app/shared/service/shareds.service';

@Component({
  selector: 'app-user-upload',
  templateUrl: './user-upload.component.html',
  styleUrls: ['./user-upload.component.css']
})
export class UserUploadComponent implements OnInit {

  userId: any;
  inId: any;
  listData: any;
  displayList: any;
  conCategory: any = ['1', '2'];
  localUrl: any;
  BASE64_MARKER = ';base64,';

  contactForm = this.userContact.group({
    roomId: [''],
    userId: [''],
    conId: [0],
    conName: [''],
    conLastname: [''],
  })

  constructor(
    private userContact: FormBuilder,
    private sharedsService: SharedsService,
    private adminService: AdminService,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const tax: any = localStorage.getItem('taxInfo');
    let taxInfo = JSON.parse(tax);
    console.log('Log  User  id >>>::', taxInfo);
    this.setDataForm(taxInfo);
    // this.userId = this._Activatedroute.snapshot.paramMap.get("id");

    this.inId = this._Activatedroute.snapshot.paramMap.get("id");
    console.log('test inId', this.inId);
  }

  setDataForm(taxInfo: any) {
    console.log('LOG taxInfo', taxInfo)
    this.contactForm.patchValue({
      userId: taxInfo.userId,
      roleId: taxInfo.roleId,
      roomId: taxInfo.roomId,
      conName: taxInfo.userName,
      conLastname: taxInfo.userLasname,
      conPhone: taxInfo.userPhone,
    });
  }

  //อัพไฟล์รูป

  showPreviewImage(file: any) {
    this.localUrl = file.target.files;
  }

  upload() {
    if (this.localUrl) {
      console.log(this.localUrl);
      const file: File | null = this.localUrl.item(0);
      console.log(file);
      this.adminService.uploadFile(file, Number(this.inId)).subscribe(data => {
        console.log('report===>', data)
        this.router.navigate(['user/alertuser']);
      },
        error => {
          if (error.status == 200) {
            this.router.navigate(['user/alertuser']);
          }
        });

    }


  }

}
