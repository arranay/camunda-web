import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {TaskService} from "../../service/task.service";

@Component({
  selector: 'app-request-for-a-salary',
  templateUrl: './request-for-a-salary.component.html',
  styleUrls: ['./request-for-a-salary.component.css']
})
export class RequestForASalaryComponent implements OnInit {

  // @ts-ignore
  form = this.fb.group({
    offer: [null, Validators.required],
    wishfulsalary: [null, Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
  }

  sendMoneyInfo(): void {
    //@ts-ignore
    this.taskService.sendMoneyInfo(this.form.value).subscribe()
  }

}
