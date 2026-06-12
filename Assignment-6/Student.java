import java.util.*;

/**
 * Represents a student with an ID, name, enrolled courses, and scores per course.
 */
public class Student {

    private final int id;           // e.g., 101  (no "CSB" prefix stored)
    private final String name;
    private final List<String> courses;          // ArrayList internally
    private final Map<String, Integer> scores;   // HashMap<course, marks>

    /* ------------------------------------------------------------------ */
    /*  Constructor                                                          */
    /* ------------------------------------------------------------------ */

    public Student(int id, String name, List<String> courses, Map<String, Integer> scores) {
        this.id      = id;
        this.name    = name;
        this.courses = new ArrayList<>(courses);          // defensive copy
        this.scores  = new HashMap<>(scores);             // defensive copy
    }

    /* ------------------------------------------------------------------ */
    /*  Computed helpers                                                     */
    /* ------------------------------------------------------------------ */

    /**
     * Returns the average score across all enrolled courses.
     * Courses with no score entry are treated as 0 (via getOrDefault).
     * Time complexity: O(C)  where C = number of courses for this student.
     */
    public double getAverageScore() {
        if (courses.isEmpty()) return 0.0;

        double total = courses.stream()
                .mapToInt(course -> scores.getOrDefault(course, 0))  // O(1) per lookup
                .sum();

        return total / courses.size();
    }

    /* ------------------------------------------------------------------ */
    /*  Getters                                                              */
    /* ------------------------------------------------------------------ */

    public int getId()                        { return id; }
    public String getName()                   { return name; }
    public List<String> getCourses()          { return Collections.unmodifiableList(courses); }
    public Map<String, Integer> getScores()   { return Collections.unmodifiableMap(scores); }

    /* ------------------------------------------------------------------ */
    /*  Display                                                              */
    /* ------------------------------------------------------------------ */

    @Override
    public String toString() {
        return String.format("Student{id=%d, name='%s', avgScore=%.2f, courses=%s, scores=%s}",
                id, name, getAverageScore(), courses, scores);
    }
}
