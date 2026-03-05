# Lab: COBOL to Java Modernization with Bob

## Overview
Learn how to use IBM Bob to modernize legacy COBOL financial applications to modern Java in 30-45 minutes. This hands-on lab demonstrates AI-assisted code conversion, test generation, and modernization best practices.

**Duration**: 30-45 minutes  
**Difficulty**: Intermediate  
**What You'll Build**: Convert a COBOL financial calculator to Java with tests and modern UI

---

## Prerequisites

### System Requirements
- Java 11 or higher (OpenJDK 21 recommended)
- Apache Maven 3.6+
- VS Code or your preferred IDE
- IBM Bob AI assistant
- Terminal/Command Line access

### Quick Setup Verification
```bash
# Verify Java installation
java -version

# Verify Maven installation
mvn -version

# Set JAVA_HOME (if needed)
export JAVA_HOME=/path/to/your/jdk
```

### Required Files
You'll work with three COBOL programs from IBM Debug for z/OS samples:
- `COBCALC.cbl` - Main controller program
- `COBLOAN.cbl` - Loan payment calculator subprogram
- `COBVALU.cbl` - Present value calculator subprogram

**Source**: [IBM Debug for z/OS Sample Programs](https://www.ibm.com/docs/en/debug-for-zos/16.0.x?topic=mode-example-sample-cobol-program-debugging)

---

## Use Case: Financial Calculator Modernization

We'll modernize a COBOL financial calculator that performs:
- **Loan Payment Calculations**: Monthly payment for loans with interest
- **Present Value Calculations**: NPV of future cash flows

This mirrors real-world scenarios in banking, insurance, and financial services.

---

## Step 1: Understand the COBOL Code (5 minutes)

### Why This Step?
Before converting legacy code, you must fully understand:
- Business logic and financial calculations
- COBOL-specific patterns (REDEFINES, UNSTRING, LINKAGE SECTION)
- Data type mappings (COMP, DISPLAY, PIC clauses)
- Subprogram calling conventions

### Prompt for Bob:
```
Analyze the COBOL financial calculator codebase and provide a comprehensive explanation 
of its functionality. Describe:

1. The overall program structure and flow
2. How COBCALC orchestrates the subprograms
3. The financial calculations performed (loan payments and present value)
4. Non-obvious COBOL patterns used (REDEFINES arrays, UNSTRING delimiters, 
   underscore placeholder technique)
5. Data type usage (COMP vs DISPLAY, PIC clauses)
6. The LINKAGE SECTION feedback mechanism

Create a Mermaid architecture diagram showing:
- Program relationships and CALL flow
- Data structures and their transformations
- Key methods and their purposes
- The calculation pipeline from input to output
```

### What to Look For:
Bob should identify:
- ✅ Hardcoded test data pattern (not production-ready)
- ✅ REDEFINES technique for array simulation
- ✅ Monthly rate conversion requirement (INTEREST / 12)
- ✅ Two-character feedback mechanism ("OK"/"NO")
- ✅ Underscore placeholder formatting technique
- ✅ Case-insensitive input handling via FUNCTION UPPER-CASE

### Key COBOL Patterns:
```cobol
* REDEFINES for array simulation
05  BUFFER-DATA.
    10  FILLER PIC X(10) VALUE "LOAN".
    10  FILLER PIC X(10) VALUE "PVALUE".
05  BUFFER-ARRAY REDEFINES BUFFER-DATA
                 OCCURS 4 TIMES PIC X(10).

* LINKAGE SECTION for subprogram feedback
LINKAGE SECTION.
01  PARM-1.
    05  CALL-FEEDBACK PIC XX.

* Financial calculation with intrinsic function
COMPUTE PAYMENT = LOAN-AMOUNT *
    FUNCTION ANNUITY((INTEREST / 12) NO-OF-PERIODS).
```

---

## Step 2: Convert to Java (10 minutes)

### Why This Step?
Modern Java provides:
- Better maintainability and testability
- Precise financial calculations with BigDecimal
- Integration with modern systems
- Object-oriented design patterns

### Prompt for Bob:
```
Convert the COBOL financial calculator to Java with the following requirements:

1. Use BigDecimal for all financial calculations (avoid floating-point errors)
2. Create separate classes for each calculator (LoanCalculator, PresentValueCalculator)
3. Implement a CalculationResult class to replace LINKAGE SECTION feedback
4. Preserve the original calculation logic exactly
5. Handle edge cases (zero interest, negative values, empty arrays)
6. Create a Main class that mimics COBCALC's orchestration
7. Use Maven for build management with JUnit 5 dependencies

Provide:
- Complete Java source code for all classes
- Maven pom.xml configuration
- Package structure (com.financial.calculator)
- Proper error handling and validation
```

### Key Conversion Patterns:

| COBOL | Java |
|-------|------|
| `PIC S9(9)V99 COMP` | `BigDecimal` with scale 2 |
| `PIC XX` | `String` or custom enum |
| `FUNCTION ANNUITY` | Custom annuity formula |
| `FUNCTION PRESENT-VALUE` | NPV calculation loop |
| `UNSTRING ... DELIMITED BY` | `String.split()` |
| `INSPECT REPLACING` | `String.replace()` |

### Expected Deliverables:
```
src/main/java/com/financial/calculator/
├── Main.java                      # Main controller
├── CalculationResult.java         # Result wrapper
├── LoanCalculator.java            # Loan payment calculator
└── PresentValueCalculator.java    # Present value calculator
pom.xml                            # Maven configuration
```

### Sample Java Code Structure:
```java
public class CalculationResult {
    private final boolean success;
    private final String message;
    private final BigDecimal value;
    
    // Constructor, getters...
}

public class LoanCalculator {
    public static CalculationResult calculate(
        BigDecimal loanAmount,
        BigDecimal annualRate,
        int periods) {
        
        // Validation
        if (loanAmount.compareTo(BigDecimal.ZERO) <= 0) {
            return new CalculationResult(false, 
                "Loan amount must be positive", null);
        }
        
        // Calculate monthly rate
        BigDecimal monthlyRate = annualRate.divide(
            BigDecimal.valueOf(12), 10, RoundingMode.HALF_UP);
        
        // Calculate payment using annuity formula
        BigDecimal payment = calculateAnnuity(
            loanAmount, monthlyRate, periods);
        
        return new CalculationResult(true, 
            formatMessage(loanAmount, annualRate, periods), 
            payment);
    }
}
```

---

## Step 3: Create Comprehensive Tests (8 minutes)

### Why This Step?
Tests ensure:
- Conversion accuracy (matches COBOL output)
- Proper error handling
- Edge case coverage
- Safe refactoring capability

### Prompt for Bob:
```
Create a comprehensive JUnit 5 test suite for the financial calculators:

1. Test with original COBOL test data to verify conversion accuracy
2. Test edge cases:
   - Zero interest rates
   - Single period loans
   - Negative cash flows
   - Empty input arrays
   - Very large numbers
3. Test error conditions:
   - Negative loan amounts
   - Invalid discount rates (≤ -1)
   - Zero or negative periods
4. Verify message formatting matches COBOL output
5. Test currency formatting ($X,XXX.XX)

Provide:
- LoanCalculatorTest.java with 8+ test cases
- PresentValueCalculatorTest.java with 10+ test cases
- Clear test names describing what is being tested
- Assertions that validate both values and messages
```

### Test Categories:
- **Accuracy Tests**: Verify calculations match COBOL results
- **Edge Case Tests**: Zero interest, single cash flow, etc.
- **Validation Tests**: Reject invalid inputs appropriately
- **Format Tests**: Verify output message formatting
- **Boundary Tests**: Test with extreme values

### Sample Test Structure:
```java
@Test
void testLoanCalculation_WithCOBOLTestData() {
    // Test with original COBOL values: 30000, 0.09, 24
    CalculationResult result = LoanCalculator.calculate(
        new BigDecimal("30000"),
        new BigDecimal("0.09"),
        24
    );
    
    assertTrue(result.isSuccess());
    assertEquals(new BigDecimal("1370.54"), 
        result.getValue().setScale(2, RoundingMode.HALF_UP));
}

@Test
void testLoanCalculation_WithZeroInterest() {
    CalculationResult result = LoanCalculator.calculate(
        new BigDecimal("12000"),
        BigDecimal.ZERO,
        12
    );
    
    assertTrue(result.isSuccess());
    assertEquals(new BigDecimal("1000.00"), 
        result.getValue().setScale(2, RoundingMode.HALF_UP));
}
```

### Run Tests:
```bash
mvn test
```

### Expected Results:
```
Tests run: 19, Failures: 0, Errors: 0, Skipped: 0
- LoanCalculatorTest: 8 tests passed
- PresentValueCalculatorTest: 11 tests passed
```

---

## Step 4: Build Interactive UI (Optional - 10 minutes)

### Why This Step?
Legacy COBOL uses hardcoded test data. Modern applications need interactive user interfaces.

### Prompt for Bob:
```
Create a JavaFX or Swing GUI for the financial calculator with:

1. Tabbed interface with two tabs:
   - "Loan Calculator" tab
   - "Present Value Calculator" tab

2. Loan Calculator tab should have:
   - Input fields: Loan Amount, Annual Interest Rate (%), Number of Months
   - "Calculate" button
   - Results display area showing monthly payment
   - Input validation with error messages

3. Present Value Calculator tab should have:
   - Input fields: Discount Rate (%), Number of Periods
   - Dynamic cash flow input fields (add/remove capability)
   - "Calculate" button
   - Results display area showing present value
   - Input validation

4. Features:
   - Clear/Reset buttons
   - Currency formatting in results
   - Keyboard shortcuts (Enter to calculate)
   - Professional styling with proper layout
   - Error dialogs for invalid inputs

Provide complete source code and instructions to run the GUI.
```

### Run GUI:
```bash
mvn javafx:run
# or
mvn exec:java -Dexec.mainClass="com.financial.calculator.FinancialCalculatorGUI"
```

---

## Step 5: Add REST API (Optional - 7 minutes)

### Why This Step?
Modern architectures use microservices. Wrap calculators in REST API for integration.

### Prompt for Bob:
```
Create a Spring Boot REST API for the financial calculators:

1. Endpoints:
   - POST /api/loan/calculate
     Request: { "loanAmount": 30000, "annualRate": 0.09, "periods": 24 }
     Response: { "monthlyPayment": 1370.54, "message": "..." }
   
   - POST /api/presentvalue/calculate
     Request: { "discountRate": 0.12, "cashFlows": [50, 69, 83, 75, 44] }
     Response: { "presentValue": 231.36, "message": "..." }

2. Features:
   - Input validation with proper HTTP status codes
   - JSON request/response bodies
   - Error handling with meaningful messages
   - CORS configuration for web clients
   - Swagger/OpenAPI documentation

3. Provide:
   - REST controller classes
   - Request/Response DTOs
   - Updated pom.xml with Spring Boot dependencies
   - application.properties configuration
   - Instructions to run and test the API
```

### Run API:
```bash
mvn spring-boot:run
```

### Test API:
```bash
curl -X POST http://localhost:8080/api/loan/calculate \
  -H "Content-Type: application/json" \
  -d '{"loanAmount": 30000, "annualRate": 0.09, "periods": 24}'
```

---

## Success Criteria

### Step 1 - Understanding ✅
- [ ] Bob explained COBOL program structure
- [ ] Identified key patterns (REDEFINES, LINKAGE SECTION)
- [ ] Understood financial calculation logic
- [ ] Generated architecture diagram

### Step 2 - Conversion ✅
- [ ] Java classes created with proper structure
- [ ] BigDecimal used for financial calculations
- [ ] Maven pom.xml configured correctly
- [ ] Code compiles without errors

### Step 3 - Testing ✅
- [ ] 19+ test cases created
- [ ] All tests pass
- [ ] Edge cases covered
- [ ] Conversion accuracy verified

### Step 4 - UI (Optional) ✅
- [ ] GUI runs successfully
- [ ] Input validation works
- [ ] Results display correctly
- [ ] User-friendly error messages

### Step 5 - API (Optional) ✅
- [ ] REST endpoints functional
- [ ] JSON request/response working
- [ ] Swagger documentation available
- [ ] Error handling implemented

---

## Key Takeaways

### Modernization Patterns Learned:
1. **Data Type Mapping**: COBOL COMP → Java BigDecimal
2. **Subprogram Conversion**: CALL/LINKAGE → Method calls/Return objects
3. **Financial Precision**: Avoiding floating-point errors
4. **Test-Driven Migration**: Validate conversion accuracy
5. **UI Modernization**: From batch to interactive
6. **API-First Design**: Enable integration with modern systems

### Real-World Applications:
- Banking and financial services modernization
- Insurance policy calculation systems
- Payroll and benefits processing
- Inventory and pricing systems
- Any COBOL system with complex business logic

---

## Next Steps

### Expand Your Skills:
- Add more financial calculators (amortization, IRR, NPV)
- Implement database persistence (PostgreSQL, MongoDB)
- Create web frontend (React, Angular)
- Deploy to cloud (AWS, Azure, IBM Cloud)
- Implement CI/CD pipeline

### Apply to Your Code:
- Identify similar patterns in your COBOL applications
- Start with small, low-risk conversions
- Use Bob to help with complex business logic
- Build comprehensive test suites first

---

## Quick Reference

### Maven Commands:
```bash
mvn clean compile          # Compile the project
mvn test                   # Run all tests
mvn exec:java             # Run the main application
mvn javafx:run            # Run JavaFX GUI
mvn spring-boot:run       # Run Spring Boot API
mvn package               # Build JAR file
```

### Project Structure:
```
COBOL2JAVA/
├── pom.xml
├── README.md
├── src/
│   ├── main/java/com/financial/calculator/
│   │   ├── Main.java
│   │   ├── CalculationResult.java
│   │   ├── LoanCalculator.java
│   │   ├── PresentValueCalculator.java
│   │   ├── FinancialCalculatorGUI.java (Step 4)
│   │   └── controllers/ (Step 5)
│   └── test/java/com/financial/calculator/
│       ├── LoanCalculatorTest.java
│       └── PresentValueCalculatorTest.java
├── COBCALC.cbl (original)
├── COBLOAN.cbl (original)
└── COBVALU.cbl (original)
```

---

## Resources

- **COBOL Source Files**: [IBM Debug for z/OS Samples](https://www.ibm.com/docs/en/debug-for-zos/16.0.x?topic=mode-example-sample-cobol-program-debugging)
- **Full Workshop**: `../EMEA_Labs/COBOL2JAVA/WORKSHOP-COBOL2JAVA.md`
- **BigDecimal Guide**: [Java BigDecimal Documentation](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/math/BigDecimal.html)
- **JUnit 5**: [JUnit 5 User Guide](https://junit.org/junit5/docs/current/user-guide/)

---

**Lab Version**: 1.0  
**Estimated Duration**: 30-45 minutes  
**Difficulty Level**: Intermediate

*This lab demonstrates AI-assisted COBOL modernization patterns applicable to real-world enterprise systems.*