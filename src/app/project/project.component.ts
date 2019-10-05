import { Component, OnInit } from '@angular/core';
import { HttpClientService, User, Project } from '../http-client.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  project: Project = new Project(new Date(), "0", "", "", "", "", "", "", "", "");
  projectList: Project[];
  userList: User[];
  mode: String = "C";

  constructor(private httpClientService: HttpClientService) { }

  ngOnInit() {
    this.httpClientService.loadProjectData().subscribe(
      response => this.handleSuccessfulResponse(response),
    );

    this.httpClientService.loadUserData().subscribe(
      response => this.getManagerList(response),
    );
  }

  checkValue(event: any) {
    //console.log(event);
    if(event == 'B'){
      this.project.startDate="";
      this.project.endDate="";
    }
  }

  handleSuccessfulResponse(response) {
    console.log("loadProjectData service response => ", response);
    this.projectList = response;
    console.log("loadProjectData projectList => ", this.projectList);
  }

  getManagerList(response) {
    this.userList = response;
  }

  createProject() {
    console.log("about to save project => ", this.project);
    this.httpClientService.saveProjectData(this.project)
      .subscribe(
        response => {
          if (this.mode == "C") {
            console.log("pushing to master list !!!");
            this.projectList.push(this.project);
          }
          this.project = new Project(new Date(), "0", "", "", "", "", "", "", "", "");
        },
        error => {
          alert("Error in Project creation/update !!!");
          this.project = new Project(new Date(), "0", "", "", "", "", "", "", "", "");
        }
      );
  }

  editProject(item: Project, id) {
    console.log("about to modify project , id =>", item, id);
    this.mode = "U";
    this.project = item;
    this.project.projectId = id;
    this.project.userId = item.userId;
  }

}
