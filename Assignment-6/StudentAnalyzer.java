import java.util.*;
import java.util.stream.*;

/**
 * Provides analytical methods over a collection of Student objects.
 *
 * Collections used:
 *   - ArrayList  : backing list for students and top-N results
 *   - HashMap    : course → running totals when computing averages
 *   - HashSet    : accumulating unique course names
 */
public class StudentAnalyzer {

    /* ================================================================== */
    /*  1.  getTopNStudents                                                  */
    /* ================================================================== */

    /**
     * Returns the top N students sorted by average score (descending).
     *
     * Time Complexity:
     *   - Computing avg per student : O(S * C)   S = #students, C = avg courses/student
     *   - Sorting                   : O(S log S)
     *   - Taking first N            : O(N)
     *   Overall                     : O(S * C + S log S)
     *   When C is small/constant    : O(S log S)
     *
     * @param students source list (ArrayList)
     * @param n        number of top students to return
     * @return         new ArrayList of at most n students
     */
    public List<Student> getTopNStudents(List<Student> students, int n) {
        return students.stream()
                // Sort descending by average score
                .sorted(Comparator.comparingDouble(Student::getAverageScore).reversed())
                .limit(n)                       // O(N) after sort
                .collect(Collectors.toList());  // returns ArrayList
    }

    /* ================================================================== */
    /*  2.  getAverageScorePerCourse                                         */
    /* ================================================================== */

    /**
     * Computes the average score for each course across all students
     * who are enrolled in that course.
     *
     * Uses getOrDefault to safely handle missing scores.
     *
     * Time Complexity:
     *   - Outer loop over students   : O(S)
     *   - Inner loop over courses    : O(C) per student  → O(S * C) total
     *   - HashMap put/get            : O(1) amortised
     *   Overall                      : O(S * C)
     *
     * @param students source list
     * @return HashMap<course, averageScore>
     */
    public Map<String, Double> getAverageScorePerCourse(List<Student> students) {

        // Accumulate totals and counts per course
        Map<String, Integer> totalScores = new HashMap<>();
        Map<String, Integer> counts      = new HashMap<>();

        for (Student student : students) {                          // O(S)
            for (String course : student.getCourses()) {            // O(C)
                int score = student.getScores().getOrDefault(course, 0); // O(1)
                totalScores.merge(course, score, Integer::sum);          // O(1)
                counts.merge(course, 1, Integer::sum);                   // O(1)
            }
        }

        // Convert totals → averages  (O(unique courses) ≈ O(C))
        Map<String, Double> averages = new HashMap<>();
        for (String course : totalScores.keySet()) {
            averages.put(course, (double) totalScores.get(course) / counts.get(course));
        }
        return averages;
    }

    /* ================================================================== */
    /*  3.  getAllUniqueCourses                                              */
    /* ================================================================== */

    /**
     * Returns the set of all distinct course names across every student.
     *
     * Time Complexity:
     *   - Iterating all students & courses : O(S * C)
     *   - HashSet add                      : O(1) amortised
     *   Overall                            : O(S * C)
     *
     * @param students source list
     * @return HashSet of unique course names
     */
    public Set<String> getAllUniqueCourses(List<Student> students) {
        return students.stream()
                .flatMap(student -> student.getCourses().stream())  // O(S * C)
                .collect(Collectors.toCollection(HashSet::new));    // O(1) per add
    }
}
