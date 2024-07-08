import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-private-tasks',
  templateUrl: './private-tasks.component.html',
  styleUrl: './private-tasks.component.css'
})
export class PrivateTasksComponent implements OnInit{

  privateTask = <any>[];

  constructor(private taskService:TasksService){}

  ngOnInit(): void {
    this.taskService.getPrivateTasks()
      .subscribe(
        res => {
          console.log(res);
          this.privateTask = res;
          console.log(this.privateTask)
        },
        err => console.log(err)
      );
  }

}
