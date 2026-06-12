import java.util.*;

abstract class Account {
    private String ownerName;
    private int accountNumber;
    private double balance;

    // Getter
    public int getAccountNumber() {
        return accountNumber;
    }

    public double getBalance() {
        return balance;
    }

    public String getOwnerName() {
        return ownerName;
    }

    // Setter
    public void setAccountNumber(int newAccountNumber) {
        this.accountNumber = newAccountNumber;
    }

    // Constructor Chaining
    public Account(String ownerName, int accountNumber) {
        this(ownerName, accountNumber, 0);
    }

    // Parameterized Constructor
    public Account(String ownerName, int accountNumber, double balance) {
        if (balance < 0) {
            throw new IllegalArgumentException("Balance cannot be negative");
        }
        this.ownerName = ownerName;
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    // Deposit
    public void deposit(double amount) {
        if (amount <= 0) {
//            System.out.println(amount);
            throw new IllegalArgumentException("Deposit must be positive");
        }
        balance += amount;
    }

    // Withdraw
    public void withdraw(double amount) {
        if (amount <= 0) {
//            System.out.println(amount);
            throw new IllegalArgumentException("Withdrawal must be positive");
        }
        if (amount > balance) {
            throw new IllegalArgumentException("Insufficient balance");
        }
        balance -= amount;
    }

    // Display
    public void display() {
        System.out.println("Owner: " + ownerName);
        System.out.println("Account Number: " + accountNumber);
        System.out.println("Balance: " + balance);
    }
}

class SavingsAccount extends Account {
    private double interestRate;

    public SavingsAccount(String ownerName, int accountNumber, double balance, double interestRate) {
        super(ownerName, accountNumber, balance);
        this.interestRate = interestRate;
    }

    @Override
    public void display() {
        super.display();
        double interest = getBalance() * interestRate / 100;
        System.out.println("Interest Rate: " + interestRate + "%");
        System.out.println("Estimated Interest: " + interest);
    }
}


class CurrentAccount extends Account {
    private double overdraftLimit;

    public CurrentAccount(String ownerName, int accountNumber, double balance, double overdraftLimit) {
        super(ownerName, accountNumber, balance);
        this.overdraftLimit = overdraftLimit;
    }

    @Override
    public void withdraw(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Withdrawal must be positive");
        }

        if (amount > getBalance() + overdraftLimit) {
            throw new IllegalArgumentException("Overdraft limit exceeded");
        }

        // Directly modify using deposit logic workaround
        double newBalance = getBalance() - amount;

        // hack: since balance is private, we simulate via deposit
        // super.deposit(amount);  // allowed since deposit adds (negative reduces)
    }

    @Override
    public void display() {
        super.display();
        System.out.println("Overdraft Limit: " + overdraftLimit);
    }
}

