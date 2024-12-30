import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Course } from "../models/course.model";

@Injectable({
  providedIn: "root"
})
export class CoursesServiceWithFetch {

  env = environment;

  async loadAllCourses(): Promise<Course[]> {
    const uri = `${this.env["apiRoot"]}/courses`;
    const response = await fetch(uri);
    const payload = await response.json();

    return payload.courses;
  }

  async createCourse(course: Partial<Course>): Promise<Course> {
    const uri = `${this.env["apiRoot"]}/courses`;
    const response = await fetch(uri, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course)
    });

    return response.json();
  }

  async saveCourse(courseId: string, changes: Partial<Course>): Promise<Course> {
    const uri = `${this.env["apiRoot"]}/courses/${courseId}`;
    const response = await fetch(uri, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changes)
    });

    return response.json();
  }

  async deleteCourse(courseId: string): Promise<void> {
    const uri = `${this.env["apiRoot"]}/courses/${courseId}`;
    await fetch(uri, {
      method: "DELETE",
    });
  }
}
