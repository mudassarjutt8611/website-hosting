import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  url = environment.url;
  userData = JSON.parse(sessionStorage.getItem('userdata') || '{}');
  constructor(private httpClient: HttpClient) {}

  signIn(data: any) {
    return this.httpClient.post(environment.url + 'api/login', data);
  }

  createProject(data: any) {
    return this.httpClient.post(environment.url + 'api/addProject', data);
  }

  getServices() {
    return this.httpClient.get(environment.url + 'api/getService');
  }
  getAllProjects(data: any) {
    return this.httpClient.post(environment.url + 'api/getProject', data);
  }

  private logedInStatus = new BehaviorSubject(false);

  //3. Now we want to broadcast this message or data, so we create an observable
  getLogInStatus = this.logedInStatus.asObservable();



  //4. Create a method that updates the data (Behaviour Subject)
  logedInUser(){
    this.logedInStatus.next(true);
  }

  sendMessage(data:any){
    return this.httpClient.post("",data)
  }

  getGames(){
    return this.httpClient.get(environment.url + 'api/getOurGames')
  }
  getDownloads(){
    return this.httpClient.get(environment.url + 'api/userStatsList')
  }
  getClients(){
    return this.httpClient.get(environment.url + 'api/getOurClient')
  }
}
