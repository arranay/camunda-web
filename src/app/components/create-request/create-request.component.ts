import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {TaskService} from "../../service/task.service";

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {

  // @ts-ignore
  form = this.fb.group({
    firstname: [null, Validators.required],
    lastname: [null, Validators.required],
    passportnumber: [null, Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
  }

  async sendRequest() {
    const processInstanceId = sessionStorage.getItem("processInstanceId");
    if (processInstanceId) {
      const task = await this.taskService.getTaskByProcessId(processInstanceId).toPromise()
      // @ts-ignore
      if (task && task[0]) await this.taskService.sendRequestInfo(task[0].id, this.form.value).toPromise()
    }
  }
}
