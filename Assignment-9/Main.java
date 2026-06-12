import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {

        List<Account> accounts = new ArrayList<>();

        Account s1 = new SavingsAccount("Alice", 101, 5000, 5);
        Account c1 = new CurrentAccount("Bob", 102, 2000, 1000);

        accounts.add(s1);
        accounts.add(c1);

        // Operations
        s1.deposit(1000);
        s1.deposit(2000);
        c1.withdraw(1500);  // uses overdraft

        // Polymorphism
        for (Account acc : accounts) {
            System.out.println("---------------");
            acc.display();  // calls correct overridden version
        }
    }
}
