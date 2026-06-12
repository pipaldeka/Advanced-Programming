# Assignment 8

## Question

Develop a course enrollment dashboard in ReactJS.

You are building a React component that displays enrolled students.

Each student:
{
  id: number,
  name: string,
  enrolledCourses: Set<string>,
  gpa: number
}

You must:
1. Maintain students in state.
2. Implement the following features:
   a. Add new student
   b. Remove student by ID
   c. Display students sorted by GPA (descending)
   d. Display all unique courses across students
   e. Filter students enrolled in a specific course
3. Use useState, Map internally for id-to-student mapping, Set for course uniqueness, map/filter/reduce, spread operator for updates, convert Set to array before rendering.
4. Compute time complexity of filtering students by course.
