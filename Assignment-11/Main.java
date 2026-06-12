import java.util.ArrayList;

public class Main{
    public static void main(String[] args){
        ArrayList<LibraryItem> library = new ArrayList<>();

        library.add(new Book("Clean Code", 2008, "Robert C. Martin"));
        library.add(new Book("The Hobbit", 1937, "J.R.R. Tolkien"));
        library.add(new DvD("Inception", 2010, 148, "Sci-Fi"));
        library.add(new DvD("The Matrix", 1999, 136, "Action"));

        Library lib = new Library(5);

        lib.addItem(new Book("1984", 1949, "George Orwell"));
        lib.addItem(new Book("Unknown Book", 2001));         // overloaded constructor
        lib.addItem(new DvD("Inception", 2010, 148, "Sci-Fi"));

        lib.displayAll();
        System.out.println("-----------------------");

        for (LibraryItem item : library) {
            item.displayInfo();
            System.out.println("---");
        }
    }
}