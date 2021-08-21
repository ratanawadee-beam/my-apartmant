import { Component, OnInit } from '@angular/core';
import { SharedsService } from 'src/app/shared/service/shareds.service';

@Component({
  selector: 'app-admin-rental',
  templateUrl: './admin-rental.component.html',
  styleUrls: ['./admin-rental.component.css']
})
export class AdminRentalComponent implements OnInit {
  listRent: any;
  constructor(
    private sharedsService: SharedsService,
  ) { }

  ngOnInit(): void {
    this.faceData();

  }
  faceData() {
    this.sharedsService.getRent().subscribe(
      (res) => {
        console.log('!!!!!! Rental Data !!!!!!', res)
        this.listRent = res;
      },
      (error) => {
        console.log('!!!!!! Rental Data !!!!!!', error);
      }
    );
  }
}
