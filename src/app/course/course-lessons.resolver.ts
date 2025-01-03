import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot
} from "@angular/router";
import { Lesson } from "../models/lesson.model";
import { LessonsService } from "../services/lessons.service";

export const courseLessonsResolver: ResolveFn<Lesson[] | null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {

  const courseId = route.paramMap.get("courseId");

  if (!courseId) {
    return null;
  }

  const lessonsService = inject(LessonsService);

  return lessonsService.loadLessons({ courseId });
};
