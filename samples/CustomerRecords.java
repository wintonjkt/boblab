import java.io.*;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Customer Records Application
 * Demonstrates file processing, business logic, and reporting
 * Converted from COBOL to Java structure
 */
public class CustomerRecords {
    
    // Customer class to represent the data structure
    static class Customer {
        private int id;
        private String name;
        private String address;
        private String city;
        private String state;
        private String zip;
        private double balance;
        private char status; // 'A' for Active, 'I' for Inactive
        
        public Customer(int id, String name, String address, String city, 
                   String state, String zip, double balance, char status) {
            this.id = id;
            this.name = name;
            this.address = address;
            this.city = city;
            this.state = state;
            this.zip = zip;
            this.balance = balance;
            this.status = status;
        }
        
        // Getters
        public int getId() { return id; }
        public String getName() { return name; }
        public double getBalance() { return balance; }
        public char getStatus() { return status; }
        public boolean isActive() { return status == 'A'; }
    }
    
    // Constants
    private static final String CUSTOMER_FILE = "customer.dat";
    private static final String REPORT_FILE = "customer_report.txt";
    private static final DecimalFormat currencyFormat = new DecimalFormat("$#,##0.00");
    private static final DecimalFormat idFormat = new DecimalFormat("00000");
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    
    // Working storage variables
    private static boolean eofReached = false;
    private static double totalBalance = 0.0;
    private static int customerCount = 0;
    private static double averageBalance = 0.0;
    
    public static void main(String[] args) {
        try {
            mainProcessing();
        } catch (IOException e) {
            System.err.println("Error processing files: " + e.getMessage());
        }
    }
    
    private static void mainProcessing() throws IOException {
        openFiles();
        processRecords();
        calculateSummary();
        printReport();
        closeFiles();
    }
    
    private static void openFiles() throws IOException {
        // Files would be opened here in a real implementation
        System.out.println("Opening files...");
        // In a real app: new BufferedReader(new FileReader(CUSTOMER_FILE));
        // In a real app: new PrintWriter(new FileWriter(REPORT_FILE));
    }
    
    private static void processRecords() throws IOException {
        eofReached = false;
        
        // Simulate reading customer records
        Customer[] customers = getSampleCustomers();
        
        for (Customer customer : customers) {
            customerCount++;
            
            if (customer.isActive()) {
                totalBalance += customer.getBalance();
            }
            
            System.out.println("Processed customer: " + idFormat.format(customer.getId()) + 
                             " - " + customer.getName());
        }
    }
    
    private static Customer[] getSampleCustomers() {
        // Sample data for demonstration
        return new Customer[] {
            new Customer(12345, "John Smith", "123 Main St", "New York", "NY", "10001", 1500.75, 'A'),
            new Customer(23456, "Mary Johnson", "456 Oak Ave", "Chicago", "IL", "60601", 2500.50, 'A'),
            new Customer(34567, "Bob Wilson", "789 Pine Rd", "Los Angeles", "CA", "90210", 750.25, 'I'),
            new Customer(45678, "Alice Brown", "321 Elm St", "Houston", "TX", "77001", 3200.00, 'A'),
            new Customer(56789, "Charlie Davis", "654 Maple Dr", "Phoenix", "AZ", "85001", 1250.75, 'A')
        };
    }
    
    private static void calculateSummary() {
        if (customerCount > 0) {
            averageBalance = totalBalance / customerCount;
        }
    }
    
    private static void printReport() throws IOException {
        System.out.println("\n=== CUSTOMER SUMMARY REPORT ===");
        printHeader();
        printDetails();
        printSummary();
        System.out.println("=== END OF REPORT ===\n");
    }
    
    private static void printHeader() {
        String reportDate = dateFormat.format(new Date());
        System.out.println("Date: " + reportDate);
        System.out.println("CUSTOMER SUMMARY REPORT");
        System.out.println("ID     Name                          Balance    Status");
        System.out.println("--------------------------------------------");
    }
    
    private static void printDetails() {
        Customer[] customers = getSampleCustomers();
        
        for (Customer customer : customers) {
            System.out.printf("%-6s %-30s %-11s %s%n",
                idFormat.format(customer.getId()),
                customer.getName(),
                currencyFormat.format(customer.getBalance()),
                customer.isActive() ? "ACTIVE" : "INACTIVE");
        }
    }
    
    private static void printSummary() {
        System.out.println("--------------------------------------------");
        System.out.printf("Total Customers: %d%n", customerCount);
        System.out.printf("Total Balance: %s%n", currencyFormat.format(totalBalance));
        System.out.printf("Average Balance: %s%n", currencyFormat.format(averageBalance));
    }
    
    private static void closeFiles() throws IOException {
        System.out.println("Closing files...");
        // In a real app: bufferedReader.close();
        // In a real app: printWriter.close();
    }
}