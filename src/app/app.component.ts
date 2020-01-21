import { Component } from "@angular/core";
import { Todo } from "./models/Todo";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import uuid from "uuid";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public todos: Todo[] = [];
  public listVisible: boolean = true;
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      description: [
        "",
        Validators.compose([
          Validators.minLength(5),
          Validators.maxLength(10),
          Validators.required
        ])
      ],
      owner: [
        "",
        Validators.compose([
          Validators.minLength(5),
          Validators.maxLength(10),
          Validators.required
        ])
      ],
      done: [null, Validators.compose([Validators.required])]
    });
  }

  show(value) {
    console.log(value);
    this.listVisible = value;
  }

  makeIsDone(todo: Todo) {
    todo.done = true;
  }

  removeTodo(id) {
    this.todos = this.todos.filter(item => item.id !== id);
  }

  clearForm() {
    this.form.reset();
  }

  formSubmit() {
    const todo: Todo = this.form.value;
    this.todos.push({
      id: uuid(),
      ...todo
    });
    this.clearForm();
  }
}
