import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {TaskService} from "./service/task.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  previousTask: any;
  currentTask: any;

  intervalId = setInterval(() => this.getTask(), 1000);

  message: string | null = null;

  constructor(
    private taskService: TaskService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
  }

  getTask() {
    if (this.processInstanceId)
      this.taskService.getTaskByProcessId(this.processInstanceId).subscribe(
        tasks => {
          this.previousTask = this.currentTask;
          // @ts-ignore
          this.currentTask = tasks[0];
          if (this.previousTask?.name === 'Check salary' && !this.currentTask) {
            clearInterval(this.intervalId);
            sessionStorage.setItem("processInstanceId", "")
            this.message = "The request was rejected";
          }

          if (this.previousTask?.name === 'Create request' && !this.currentTask) {
            clearInterval(this.intervalId);
            sessionStorage.setItem("processInstanceId", "")
            this.message = "The request was approved";
          }
        }
      )
  }

  get processInstanceId() {
    return sessionStorage.getItem("processInstanceId")
  }
}
