import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, tap} from "rxjs";
import {MoneyInfoModel} from "../models/MoneyInfo.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(
    private http: HttpClient,
  ) { }

  getTasks(): Observable<any> {
    return this.http.get<any>(`${environment.endPoint}/task`)
  }

  sendMoneyInfo(moneyInfo: MoneyInfoModel): Observable<any> {
    const body = {
      "variables": {
        "offer": {"value":moneyInfo.offer},
        "wishfulsalary":{"value":moneyInfo.wishfulsalary},
      }
    }
    return this.http.post(`${environment.endPoint}/process-definition/key/${environment.key}/submit-form`, body)
      .pipe(
        tap((taskInfo: any) => sessionStorage.setItem("processInstanceId", taskInfo.id)),
        tap(taskInfo => this.getTask(taskInfo, moneyInfo).subscribe())
      )
  }

  getTask(taskInfo: any, moneyInfo: MoneyInfoModel) {
    return this.http.get(`${environment.endPoint}/task?processInstanceId=${taskInfo.id}`)
      .pipe(
        tap(taskInfo => this.taskComplete(taskInfo, moneyInfo).subscribe())
      )
  }

  getTaskByProcessId(processInstanceId: string) {
    return this.http.get(`${environment.endPoint}/task?processInstanceId=${processInstanceId}`)
  }

  taskComplete(taskInfo: any, moneyInfo: MoneyInfoModel) {
    const body = {
      "variables": {
        "offer": {"value":moneyInfo.offer},
        "wishfulsalary":{"value":moneyInfo.wishfulsalary},
      }
    }
    return this.http.post(`${environment.endPoint}/task/${taskInfo[0].id}/complete`, body)
  }

  sendRequestInfo(taskId: string, request: any) {
    const body = {
      "variables": {
        "firstname": {"value":request.firstname},
        "lastname":{"value":request.lastname},
        "passportnumber":{"value":request.passportnumber}
      }
    }
    return this.http.post(`${environment.endPoint}/task/${taskId}/submit-form`, body)
  }
}
