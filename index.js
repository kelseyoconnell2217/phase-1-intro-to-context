// Employees always check in and check out.
// Employees always check in and out on the hour.
// The time is represented on a 24-hour clock (1300 is 1:00 pm); this keeps the math easier and is the standard in most of the world.
// When timestamps are needed, they will be provided as Strings in the form: "YYYY-MM-DD 800" or "YYYY-MM-DD 1800" e.g. "2018-01-01 2300".
// Employees will never work across days, e.g., in at 2200 and out at 0400 the next day.
// The lab tests will guide you toward a solution. When you encounter a failing test, look at how the test is calling the function that's missing or failing: how did it call the function, what arguments did it pass? What kind of thing did it expect back?

let employeeRecord
function createEmployeeRecord(employeeInfo){
    var newRecord = {
        firstName : employeeInfo[0],
        familyName : employeeInfo[1],
        title : employeeInfo[2], 
        payPerHour : employeeInfo[3],
        timeInEvents : [], 
        timeOutEvents : []
    }
    return newRecord
}


let employeeRecords = []
function createEmployeeRecords(recordArray){
    employeeRecords = []
    for(let i of recordArray){
        employeeRecords.push(createEmployeeRecord(i))
    }
return employeeRecords
}

 
function createTimeInEvent(employeeRecord, timeStamp){
    let stamp = timeStamp.split(' ')
    employeeRecord["timeInEvents"].push({
        type : "TimeIn",
        date : stamp[0],
        hour : parseInt(stamp[1])
    })
    return employeeRecord;   
}

function createTimeOutEvent(employeeRecord, timeStamp){
    let stamp = timeStamp.split(' ')
    employeeRecord["timeOutEvents"].push({
        type:`TimeOut`,
        date : stamp[0],
        hour : parseInt(stamp[1])
    })
    return employeeRecord;   
}

function hoursWorkedOnDate(employeeRecord, enteredDate){
    let clockIn = employeeRecord.timeInEvents.find(event => event.date === enteredDate)
    let clockOut = employeeRecord.timeOutEvents.find(event => event.date === enteredDate)
    return (clockOut.hour-clockIn.hour)/100

   }


function wagesEarnedOnDate(employeeRecord, enteredDate){
    let clockIn = employeeRecord.timeInEvents.find(event => event.date === enteredDate)
    let clockOut = employeeRecord.timeOutEvents.find(event => event.date === enteredDate)
    return ((clockOut.hour-clockIn.hour)/100) * (employeeRecord.payPerHour)
}



function allWagesFor(employeeRecord){
    let totalHours 
    totalUpHours(employeeRecord);
    const wages = totalHours * employeeRecord.payPerHour
    
    return wages
    function totalUpHours(employeeRecord){
        totalHours = 0
        let clockIns = employeeRecord.timeInEvents
        let clockOuts = employeeRecord.timeOutEvents
        for(let inObj of clockIns){
            let inDate = inObj.date;
            let inHour = inObj.hour;
            // console.log(" ")
            // console.log("Date: ", inDate)
            // console.log("In: ", inHour)
            let match = false;
            for(let outObj of clockOuts){
                let outDate = outObj.date;
                let outHour = outObj.hour;
                if(inDate === outDate && outHour > inHour){
                    match = true
                    // console.log("Out: ", outHour)
                    let hoursNow = ((outHour - inHour)/100);
                    // console.log(hoursNow);
                    totalHours = totalHours + hoursNow;
                    break;
                }                
            }if(match == false){console.log(`Missing out-punch on ${inDate}`)}
        } return totalHours
    }     
    }

function calculatePayroll(array){
    let totalPayrollCost = 0
    for(let index in array){
        let indexPersonsWages = allWagesFor(array[index])
        totalPayrollCost = (totalPayrollCost + indexPersonsWages)
    }
 return totalPayrollCost
}







// Search function:

// let currentEmployee = locateEmployee(employeeRecord.firstName, employeeRecord.familyName);
//     if (currentEmployee === -1) {
//         console.log('Employee not found');
//         return;}
// function locateEmployee(first, last){
//     return employeeRecords.findIndex(empObject => 
//         empObject['firstName'] == first && empObject['familyName'] == last)}


