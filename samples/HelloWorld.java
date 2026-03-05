public class HelloWorld {
    private String name;
    
    public HelloWorld() {
        // Constructor
        this.name = "World";
    }
    
    public HelloWorld(String name) {
        // Constructor with parameter
        this.name = name;
    }
    
    public void sayHello() {
        System.out.println("Hello, " + name + "!");
    }
    
    public static void main(String[] args) {
        // Create instance with default name
        HelloWorld hello1 = new HelloWorld();
        hello1.sayHello();
        
        // Create instance with custom name
        HelloWorld hello2 = new HelloWorld("Bob");
        hello2.sayHello();
        
        // Demonstrate some basic operations
        int result = addNumbers(5, 3);
        System.out.println("5 + 3 = " + result);
        
        // Demonstrate string manipulation
        String message = formatMessage("Welcome to", "Java programming");
        System.out.println(message);
    }
    
    // Utility method for addition
    private int addNumbers(int a, int b) {
        return a + b;
    }
    
    // Utility method for string formatting
    private String formatMessage(String greeting, String subject) {
        return greeting + " " + subject + "!";
    }
}