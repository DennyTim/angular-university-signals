import {
  Component,
  contentChildren,
  effect,
  ElementRef,
  input,
  model
} from "@angular/core";
import { CourseCategory } from "../models/course-category.model";

@Component({
  selector: "course-category-combobox",
  templateUrl: "./course-category-combobox.component.html",
  styleUrl: "./course-category-combobox.component.scss",
  imports: [],
  standalone: true
})
export class CourseCategoryComboboxComponent {

  label = input.required<string>();
  value = model.required<CourseCategory>();
  title = contentChildren<ElementRef>("title");

  constructor() {
    effect(() => {
      console.log("title: ", this.title());
    });
  }

  onCategoryChanged(category: string) {
    this.value.set(category as CourseCategory);
  }
}
