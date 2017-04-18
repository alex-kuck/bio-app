import { Component, OnInit } from '@angular/core';
import { Owner } from '../owner'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  owner: Owner

  constructor() {
    //Create the owner property
    this.owner = new Owner({
      name: 'Baerree',
      age: 33,
      country: 'GER',
      jobtitle: 'Software Developer',
      company: 'Example DEV'
    });

  }

  ngOnInit() {
  }

}
