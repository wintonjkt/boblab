       IDENTIFICATION DIVISION.
       PROGRAM-ID. CUSTOMER-RECORDS.
       AUTHOR. BOB-LAB-SAMPLES.
       DATE-WRITTEN. 2023-01-01.
      
       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT CUSTOMER-FILE
               ASSIGN TO "CUSTOMER.DAT"
               ORGANIZATION IS LINE SEQUENTIAL.
      
       DATA DIVISION.
       FILE SECTION.
       FD  CUSTOMER-FILE.
       01  CUSTOMER-RECORD.
           05  CUST-ID            PIC 9(5).
           05  CUST-NAME          PIC X(30).
           05  CUST-ADDRESS       PIC X(50).
           05  CUST-CITY          PIC X(20).
           05  CUST-STATE         PIC X(2).
           05  CUST-ZIP           PIC 9(5).
           05  CUST-BALANCE       PIC S9(7)V99.
           05  CUST-STATUS        PIC X(1).
               88  ACTIVE            VALUE "A".
               88  INACTIVE           VALUE "I".
      
       WORKING-STORAGE SECTION.
       01  WS-EOF              PIC X VALUE "N".
       01  WS-TOTAL-BALANCE    PIC S9(9)V99 VALUE ZEROS.
       01  WS-CUSTOMER-COUNT   PIC 9(3) VALUE ZEROS.
       01  WS-AVERAGE-BALANCE  PIC S9(7)V99.
      
       REPORT SECTION.
       RD  CUSTOMER-REPORT.
       01  REPORT-HEADER.
           05  FILLER            PIC X(10) VALUE SPACES.
           05  REPORT-DATE        PIC X(10).
           05  FILLER            PIC X(10) VALUE SPACES.
           05  REPORT-TITLE       PIC X(20) VALUE "CUSTOMER SUMMARY".
       01  DETAIL-LINE.
           05  DET-ID            PIC Z(5).
           05  FILLER            PIC X VALUE SPACE.
           05  DET-NAME          PIC X(30).
           05  FILLER            PIC X VALUE SPACE.
           05  DET-BALANCE       PIC $,$$,$$9.99.
           05  FILLER            PIC X VALUE SPACE.
           05  DET-STATUS        PIC X(7).
       01  SUMMARY-LINE.
           05  FILLER            PIC X(20) VALUE SPACES.
           05  SUMMARY-COUNT     PIC ZZZ.
           05  FILLER            PIC X(5) VALUE SPACES.
           05  SUMMARY-TOTAL     PIC $$$,$$9.99.
      
       PROCEDURE DIVISION.
       MAIN-PROCESSING.
           PERFORM OPEN-FILES.
           PERFORM PROCESS-RECORDS
               UNTIL WS-EOF = "Y".
           PERFORM CALCULATE-SUMMARY.
           PERFORM PRINT-REPORT.
           PERFORM CLOSE-FILES.
           STOP RUN.
      
       OPEN-FILES.
           OPEN INPUT CUSTOMER-FILE.
           OPEN OUTPUT CUSTOMER-REPORT.
      
       PROCESS-RECORDS.
           READ CUSTOMER-FILE
               AT END
                   MOVE "Y" TO WS-EOF
               NOT AT END
                   PERFORM PROCESS-CUSTOMER.
      
       PROCESS-CUSTOMER.
           ADD 1 TO WS-CUSTOMER-COUNT.
           
           IF CUST-STATUS = ACTIVE
               ADD CUST-BALANCE TO WS-TOTAL-BALANCE
           END-IF.
      
       CALCULATE-SUMMARY.
           COMPUTE WS-AVERAGE-BALANCE = 
               WS-TOTAL-BALANCE / WS-CUSTOMER-COUNT.
      
       PRINT-REPORT.
           PERFORM PRINT-HEADER.
           PERFORM REWIND-FILE.
           PERFORM PRINT-DETAILS
               WITH TEST BEFORE
               UNTIL WS-EOF = "Y".
           PERFORM PRINT-SUMMARY.
      
       PRINT-HEADER.
           ACCEPT REPORT-DATE FROM DATE YYYYMMDD.
           WRITE REPORT-HEADER.
      
       REWIND-FILE.
           CLOSE CUSTOMER-FILE.
           OPEN INPUT CUSTOMER-FILE.
           MOVE "N" TO WS-EOF.
      
       PRINT-DETAILS.
           READ CUSTOMER-FILE
               AT END
                   MOVE "Y" TO WS-EOF
               NOT AT END
                   MOVE CUST-ID TO DET-ID
                   MOVE CUST-NAME TO DET-NAME
                   MOVE CUST-BALANCE TO DET-BALANCE
                   IF CUST-STATUS = ACTIVE
                       MOVE "ACTIVE" TO DET-STATUS
                   ELSE
                       MOVE "INACTIVE" TO DET-STATUS
                   END-IF
                   WRITE DETAIL-LINE
           END-READ.
      
       PRINT-SUMMARY.
           MOVE WS-CUSTOMER-COUNT TO SUMMARY-COUNT.
           MOVE WS-TOTAL-BALANCE TO SUMMARY-TOTAL.
           WRITE SUMMARY-LINE.
      
       CLOSE-FILES.
           CLOSE CUSTOMER-FILE.
           CLOSE CUSTOMER-REPORT.