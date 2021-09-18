const dateOfBirth = document.querySelector("#birthday");
const showButton = document.querySelector("#check-btn");
const outputBox = document.querySelector("#output-box");


function reverseStr(str) {
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');
    return reversedStr;
}


  
function isPalindrome(str) {
    var reverse = reverseStr(str);
    return str === reverse;
}


function convertDateToStr(date) {

    var dateStr = { day: "", month: "", year: "" };
  
    if (date.day < 10) {
      dateStr.day = "0" + date.day;
    }
    else {
      dateStr.day = date.day.toString();
    }
  
    if (date.month < 10) {
      dateStr.month = "0" + date.month;
    }
    else {
      dateStr.month = date.month.toString();
    }
  
    dateStr.year = date.year.toString();
    return dateStr;
}


function getAllDateFormats(date) {
    var dateStr = convertDateToStr(date);
  
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}


function checkPalindromeForAllDateFormats(date){
    var listOfPalindromes = getAllDateFormats(date);
  
    var ifPalindrome = false;
  
    for(var i=0; i < listOfPalindromes.length; i++){
      if(isPalindrome(listOfPalindromes[i])){
        ifPalindrome = true;
        break;
      }
    }
    
    return ifPalindrome;
}



// for leap year
function isLeapYear(year){
    if(year % 400 === 0){
      return true;
    }
    if(year % 100 === 0){
      return false;
    }
    if(year % 4 === 0){
      return true;
    }
    return false;

}


// get the next date
function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    //for february
    if(month === 2){ 
      // check for leap year
      if(isLeapYear(year)){

         if(day > 29){
           day = 1;
           month++;
        }
      }
      else {
         if(day > 28){
           day = 1;
           month++;
         }
      }
    }

    // for other months
    else {
      // if the day exceeds the max days in month
      if(day > daysInMonth[month - 1]){ 
        day = 1; 
        month++;
      }
    }
  
    // increase the year if month is greater than 12
    if(month > 12){
      month = 1;
      year++; 
    }
  
    return {
      day: day,  
      month: month,
      year: year
    };

}


// get the next palindrome date
function getNextPalindromeDate(date){
    var counter = 0;
    var nextDate = getNextDate(date);
  
    while(1){  // infinite loop
      counter++;
      var ifPalindrome = checkPalindromeForAllDateFormats(nextDate);
      if(ifPalindrome){
        break;
      }
      nextDate = getNextDate(nextDate);
    }
    return [counter, nextDate];

}



function showResults() {

    var bdayStr = dateOfBirth.value;

    if(bdayStr !== ''){
        var listOfDate = bdayStr.split('-');
    
        var date = {
          day: Number(listOfDate[2]),
          month: Number(listOfDate[1]),
          year: Number(listOfDate[0])
        };
        
        var ifPalindrome = checkPalindromeForAllDateFormats(date);
    
        if(ifPalindrome){
            outputBox.innerText = "Congrats! Your birthday is a palindrome!";
        }
        else {
          var [ctr, nextDate] = getNextPalindromeDate(date);
    
          outputBox.innerText = `You missed the palindrome date by ${ctr} days! The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} `;
        }
    }
    else {

        outputBox.innerText = "Date of Birth cannot be blank. Please enter the Date of Birth to continue."

    }


}

showButton.addEventListener("click",showResults);