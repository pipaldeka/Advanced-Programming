import java.util.ArrayList;
import java.util.Scanner;

public class BookSearch {
    public static void main(String[] args) {
        // Create ArrayList to store book titles
        ArrayList<String> books = new ArrayList<>();
        
        // Add at least 5 book titles
        books.add("Crime and Punishment");
        books.add("To Kill a Mockingbird");
        books.add("1984 by George Orwell");
        books.add("Pride and Prejudice");
        books.add("The Catcher in the Rye");
        
        // Display all books
        System.out.println("All books:");
        for (String book : books) {
            System.out.println("- " + book);
        }
        System.out.println();
        
        // Get search word from user
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a word to search in titles: ");
        String searchWord = scanner.nextLine().trim().toLowerCase();
        scanner.close();
        
        // Search for books containing the word (case-insensitive)
        boolean found = false;
        System.out.println("Books containing '" + searchWord + "':");
        for (String book : books) {
            if (book.toLowerCase().contains(searchWord)) {
                System.out.println("- " + book);
                found = true;
            }
        }
        
        if (!found) {
            System.out.println("No matches found.");
        }
    }
}

