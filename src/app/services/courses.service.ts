import {
  HttpClient,
  HttpContext
} from "@angular/common/http";
import {
  inject,
  Injectable
} from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "../../environments/environment";
import { SkipLoading } from "../loading/skip-loading";
import { Course } from "../models/course.model";
import { GetCoursesResponse } from "../models/get-courses.response";

@Injectable({
  providedIn: "root"
})
export class CoursesService {

  env = environment;
  http = inject(HttpClient);

  async loadAllCourses(): Promise<Course[]> {

    const courses$ = this.http.get<GetCoursesResponse>(`${this.env["apiRoot"]}/courses`, {
      context: new HttpContext().set(SkipLoading, true)
    });

    const response = await firstValueFrom(courses$);

    return response.courses;
  }

  async getCourseById(courseId: string) {
    const course$ = this.http.get<Course>(`${this.env["apiRoot"]}/courses/${courseId}`);
    return firstValueFrom(course$);
  }

  async createCourse(course: Partial<Course>): Promise<Course> {
    const uri = `${this.env["apiRoot"]}/courses`;
    const courses$ = this.http.post<Course>(uri, course);

    return firstValueFrom(courses$);
  }

  async saveCourse(
    courseId: string,
    changes: Partial<Course>
  ): Promise<Course> {
    const uri = `${this.env["apiRoot"]}/courses/${courseId}`;
    const courses$ = this.http.put<Course>(uri, changes);

    return firstValueFrom(courses$);
  }

  async deleteCourse(courseId: string) {
    const uri = `${this.env["apiRoot"]}/courses/${courseId}`;
    const delete$ = this.http.delete(uri);

    return firstValueFrom(delete$);
  }
}
