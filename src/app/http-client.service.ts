import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Task {
  constructor(
    public taskId: String = "0",
    public taskName: String = "default",
    public parentTaskId: String = "0",
    public parentTaskName: String = "parent_default",
    public priority: String = "0",
    public startDate: String = "1901-01-01",
    public endDate: String = "2099-01-01",
    public status?: String,
    public parentTask?: ParentTask
  ) { }
}

export class ParentTask {
  constructor(
    public parentTaskId: String = "0",
    public parentTaskName: String = "parent_default",
  ) { }
}

export class User {
  constructor(
    public userId: String = "0",
    public firstName: String,
    public lastName: String,
    public employeeId: String
  ) { }
}

export class Project {
  constructor(
    public currDate: Date = new Date(),
    public projectId: String = "0",
    public projectName: String,
    public priority: String = "0",
    public startDate: String = ((currDate.getMonth() + 1) + '/' + currDate.getDate() + '/' + currDate.getFullYear()),
    public endDate: String = ((currDate.getMonth() + 1) + '/' + currDate.getDate() + '/' + currDate.getFullYear()),
    public noOfTasks: String,
    public noOfTasksCompleted: String,
    public userId: String,
    public userName: String
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  baseurl = "http://localhost:9091/projectmanager-srv"

  constructor(private httpClient: HttpClient) { }

  loadUserData() {
    return this.httpClient.get<User[]>(this.baseurl + '/getAllUser');
  }

  saveUserData(user: User) {
    return this.httpClient.post<User>(this.baseurl + '/saveUser', user);
  }

  deleteUserData(id: String) {
    //console.log("delete id:", id);
    return this.httpClient.get(this.baseurl + '/deleteUser/' + id);
  }

  loadProjectData() {
    return this.httpClient.get<Project[]>(this.baseurl + '/getAllProject');
  }

  saveProjectData(project: Project) {
    return this.httpClient.post<Project>(this.baseurl + '/saveProject', project);
  }

}
