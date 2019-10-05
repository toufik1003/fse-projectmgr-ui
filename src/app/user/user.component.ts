import { Component, OnInit } from '@angular/core';
import { HttpClientService, User } from '../http-client.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User = new User("0", "", "", "");
  userList: User[];
  mode: String = "C";

  constructor(private httpClientService: HttpClientService) { }

  ngOnInit() {
    this.httpClientService.loadUserData().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }

  handleSuccessfulResponse(response) {
    console.log("loadUserData service response => ", response);
    this.userList = response;
    console.log("loadUserData userList => ", this.userList);
  }

  createUser() {
    console.log("about to save user => ", this.user);
    this.httpClientService.saveUserData(this.user)
      .subscribe(
        response => {
          //console.log("User created successfully !", response);
          alert("User saved successfully !");
          if (this.mode == "C") {
            console.log("pushing to master list !!!");
            this.userList.push(this.user);
          }
          this.user = new User("0", "", "", "");
        },
        error => {
          alert("Error in User creation/update !!!");
          this.user = new User("0", "", "", "");
        }
      );
  }

  editUser(userItem: User, id) {
    console.log("about to modify user , id =>", userItem, id);
    this.mode = "U";
    this.user = userItem;
    this.user.userId = id;

  }

  deleteUser(userItem: User, id) {
    console.log("about to delete user , id => ", userItem, id);
    this.httpClientService.deleteUserData(id)
    .subscribe(
      response => {
        console.log("delete successfull");
      },
      error => {
        alert("Error in User delete !!!");
      }
    );
  }

}
