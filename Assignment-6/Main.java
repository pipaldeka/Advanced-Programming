import java.util.*;
import java.util.stream.*;

/**
 * Main driver:
 *   1. Demonstrates the analyzer with a real batch of students.
 *   2. Benchmarks getAverageScorePerCourse and getTopNStudents
 *      at input sizes: 10, 100, 1_000, 10_000, 20_000
 *      to empirically confirm the theoretical time complexities.
 */
public class Main {

    /* ------------------------------------------------------------------ */
    /*  Shared data – courses available in the batch                        */
    /* ------------------------------------------------------------------ */

    private static final List<String> ALL_COURSES = List.of(
            "Data Structures", "Algorithms", "Operating Systems",
            "DBMS", "Computer Networks", "OOP", "Discrete Math",
            "Software Engineering", "Linear Algebra", "Probability"
    );

    private static final String[] FIRST_NAMES = {
            "Aarav", "Bhavna", "Chetan", "Divya", "Eshan",
            "Farida", "Gaurav", "Heena", "Ishaan", "Jyoti",
            "Karan", "Lavanya", "Manav", "Naina", "Omkar",
            "Priya", "Quamar", "Ritu", "Suresh", "Tanvi"
    };

    /* ------------------------------------------------------------------ */
    /*  Student generator                                                    */
    /* ------------------------------------------------------------------ */

    /**
     * Generates a list of n synthetic students.
     * Each student is enrolled in 4–6 randomly picked courses
     * with random marks in [40, 100].
     */
    private static List<Student> generateStudents(int n, Random rng) {
        List<Student> students = new ArrayList<>(n);
        for (int i = 0; i < n; i++) {
            int id   = 1000 + i;                                    // e.g., 1000, 1001 …
            String name = FIRST_NAMES[i % FIRST_NAMES.length] + " " + (i + 1);

            // Pick 4–6 courses (no duplicates) — using HashSet for uniqueness
            Collections.shuffle(new ArrayList<>(ALL_COURSES), rng);
            List<String> enrolled = new ArrayList<>(ALL_COURSES.subList(0, 4 + rng.nextInt(3)));

            // Build score map — HashMap<course, marks>
            Map<String, Integer> scores = new HashMap<>();
            for (String course : enrolled) {
                scores.put(course, 40 + rng.nextInt(61));           // marks in [40, 100]
            }
            // Intentionally omit score for one course occasionally
            // to test getOrDefault behaviour
            if (!enrolled.isEmpty() && rng.nextInt(5) == 0) {
                scores.remove(enrolled.get(0));
            }

            students.add(new Student(id, name, enrolled, scores));
        }
        return students;
    }

    /* ================================================================== */
    /*  Demo with a small, readable batch                                    */
    /* ================================================================== */

    private static void runDemo() {
        System.out.println("╔══════════════════════════════════════════════════════════════╗");
        System.out.println("║            STUDENT PERFORMANCE ANALYZER – DEMO               ║");
        System.out.println("╚══════════════════════════════════════════════════════════════╝\n");

        // ---------- Hard-coded demo batch --------------------------------
        List<Student> batch = new ArrayList<>();

        batch.add(new Student(101, "Aarav Sharma",
                List.of("Data Structures", "Algorithms", "OOP"),
                Map.of("Data Structures", 88, "Algorithms", 92, "OOP", 85)));

        batch.add(new Student(102, "Bhavna Patel",
                List.of("Algorithms", "DBMS", "Computer Networks", "Linear Algebra"),
                Map.of("Algorithms", 78, "DBMS", 91,
                       "Computer Networks", 82)));          // Linear Algebra score missing → 0 via getOrDefault

        batch.add(new Student(103, "Chetan Nair",
                List.of("OOP", "Software Engineering", "Probability"),
                Map.of("OOP", 95, "Software Engineering", 89, "Probability", 93)));

        batch.add(new Student(104, "Divya Menon",
                List.of("Data Structures", "DBMS", "Discrete Math"),
                Map.of("Data Structures", 72, "DBMS", 68, "Discrete Math", 76)));

        batch.add(new Student(105, "Eshan Gupta",
                List.of("Algorithms", "Operating Systems", "Computer Networks"),
                Map.of("Algorithms", 55, "Operating Systems", 61, "Computer Networks", 58)));

        StudentAnalyzer analyzer = new StudentAnalyzer();

        // ---- All students -----------------------------------------------
        System.out.println("▶ All Students:");
        batch.forEach(s -> System.out.printf("   [%d] %-20s | avg = %.2f%n",
                s.getId(), s.getName(), s.getAverageScore()));

        // ---- Top 3 students ---------------------------------------------
        System.out.println("\n▶ Top 3 Students (by average score, descending):");
        List<Student> top3 = analyzer.getTopNStudents(batch, 3);
        top3.forEach(s -> System.out.printf("   [%d] %-20s | avg = %.2f%n",
                s.getId(), s.getName(), s.getAverageScore()));

        // ---- Average score per course -----------------------------------
        System.out.println("\n▶ Average Score Per Course:");
        Map<String, Double> courseAvg = analyzer.getAverageScorePerCourse(batch);
        courseAvg.entrySet().stream()
                .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
                .forEach(e -> System.out.printf("   %-25s : %.2f%n", e.getKey(), e.getValue()));

        // ---- All unique courses ------------------------------------------
        System.out.println("\n▶ All Unique Courses (HashSet – unordered):");
        Set<String> unique = analyzer.getAllUniqueCourses(batch);
        System.out.println("   " + unique);
        System.out.println("   Total unique courses: " + unique.size());
    }

    /* ================================================================== */
    /*  Complexity Benchmark                                                 */
    /* ================================================================== */

    private static void runBenchmark() {
        System.out.println("\n╔══════════════════════════════════════════════════════════════╗");
        System.out.println("║              TIME COMPLEXITY BENCHMARK                        ║");
        System.out.println("╚══════════════════════════════════════════════════════════════╝");
        System.out.println();
        System.out.println("  Theoretical complexities:");
        System.out.println("    getAverageScorePerCourse : O(S × C)   – S=students, C=avg courses");
        System.out.println("    getTopNStudents          : O(S × C + S log S)  ≈ O(S log S) for fixed C");
        System.out.println();

        int[] sizes = {10, 100, 1_000, 10_000, 20_000};
        int   warmup = 3;     // warm-up iterations to let JIT compile
        int   runs   = 5;     // timed iterations for averaging
        int   TOP_N  = 10;

        StudentAnalyzer analyzer = new StudentAnalyzer();
        Random rng = new Random(42);

        System.out.printf("%-10s | %-22s | %-22s%n",
                "Size (S)", "getAvgPerCourse (ms)", "getTopN (ms)");
        System.out.println("-".repeat(60));

        for (int size : sizes) {
            List<Student> students = generateStudents(size, rng);

            // ---- Warm-up (not measured) ---------------------------------
            for (int w = 0; w < warmup; w++) {
                analyzer.getAverageScorePerCourse(students);
                analyzer.getTopNStudents(students, TOP_N);
            }

            // ---- Timed runs for getAverageScorePerCourse ----------------
            long avgTime = 0;
            for (int r = 0; r < runs; r++) {
                long t0 = System.nanoTime();
                analyzer.getAverageScorePerCourse(students);
                avgTime += System.nanoTime() - t0;
            }
            double avgMs = avgTime / (double) runs / 1_000_000.0;

            // ---- Timed runs for getTopNStudents -------------------------
            long sortTime = 0;
            for (int r = 0; r < runs; r++) {
                long t0 = System.nanoTime();
                analyzer.getTopNStudents(students, TOP_N);
                sortTime += System.nanoTime() - t0;
            }
            double sortMs = sortTime / (double) runs / 1_000_000.0;

            System.out.printf("%-10d | %-22.4f | %-22.4f%n", size, avgMs, sortMs);
        }

        System.out.println();
        System.out.println("  Interpretation:");
        System.out.println("    • Doubling S should roughly double getAverageScorePerCourse time → O(S)");
        System.out.println("    • getTopNStudents grows slightly faster than linear → O(S log S)");
        System.out.println("    • Small sizes dominated by JVM overhead; trend visible at ≥1 000");
    }

    /* ================================================================== */
    /*  Entry point                                                          */
    /* ================================================================== */

    public static void main(String[] args) {
        runDemo();
        runBenchmark();
    }
}
