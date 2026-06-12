public abstract class LibraryItem {

    protected String title;
    protected int year;

    public LibraryItem(String title, int year){
        this.title = title;
        this.year = year;
    }
    public abstract void displayInfo();
}


class Book extends LibraryItem{
    String author;
    public Book(String title, int year, String author) {
        super(title, year);
        this.author = author;
    }

    //Overloading -- if someone enters a Book without author, this way the class will be created.
    public Book(String title, int year) {
        this(title, year, "Unknown");
    }

    @Override
    public void displayInfo() {
        System.out.println("BOOK : " + title + " (" + year + ")");
        System.out.println("Author : " + author);
    }
}

class DvD extends LibraryItem{

    String Genre;
    int Duration;

    public DvD(String title, int year, int Duration, String Genre){
        super(title, year);
        this.Genre = Genre;
        this.Duration = Duration;
    }
    @Override
    public void displayInfo(){
        System.out.println("DVD : " + title + " (" + year + ")");
        System.out.println("Duration : " + Duration);
        System.out.println("Genre : " + Genre);
    }
}

class Library {
    LibraryItem[] items;
    int count;

    public Library(int size){
        items = new LibraryItem[size];
        count = 0;
    }

    public void addItem(LibraryItem item){
        items[count] = item;
        count++;
    }

    public void displayAll(){
        for(int i = 0; i < count; i++){
            items[i].displayInfo();  // polymorphism -- same call, different behavior
            System.out.println();
        }
    }
}