       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO-WORLD.
       AUTHOR. BOB-LAB-SAMPLES.
       DATE-WRITTEN. 2023-01-01.
      
       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       SPECIAL-NAMES.
           CRT IS "LINE-PRINTER".
      
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-MESSAGE        PIC X(30) VALUE SPACES.
       01  WS-NAME          PIC X(15) VALUE SPACES.
      
       PROCEDURE DIVISION.
       MAIN-LOGIC.
           DISPLAY "What is your name? " WITH NO ADVANCING.
           ACCEPT WS-NAME.
      
           STRING "Hello, " DELIMITED BY SIZE
                  WS-NAME "!" INTO WS-MESSAGE.
      
           DISPLAY WS-MESSAGE UPON CRT.
      
           STOP RUN.