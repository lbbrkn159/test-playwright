*** Settings ***
Library    SeleniumLibrary
Library    OperatingSystem
Library    XML
Library    Process
Library    Collections
Library    String
Variables    modules/test/utilities/variables.py

*** Test Cases ***
Testcase 001001
    Log To Console    message
    [Documentation]    #555

*** Keywords ***
aaa
    Log To Console    ${list1}
    Set Global Variable    ${list1}
    Append To List    ${list1}    4 
    Log To Console    ${list1[1]}

Clear Text
    [Arguments]    ${locator}
    Wait Until Element Is Visible    ${locator}
    ${value}=    Get Value    ${locator}
    ${text}=    Convert To String    ${value}
    ${len}    Evaluate    len('${text}')
    FOR    ${i}    IN RANGE    1    ${len}
        Press Key    ${locator}    \ue003
    END