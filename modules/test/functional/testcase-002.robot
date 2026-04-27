*** Settings ***
Library    SeleniumLibrary
Library    OperatingSystem
Library    XML
Library    Process
Library    Collections
Variables    modules/test/utilities/variables.py

*** Test Cases ***
Testcase 002001
    Log To Console    555
#     Append To List    ${list1}    a
#     Log To Console    ${list1}
# Testcase 002002
#     Log To Console    ${list1}
#     Append To List    ${list1}    g 
#     Log To Console    ${list1}
# Testcase 002003
#     Log To Console    ${str1}