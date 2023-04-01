//reWriten time-card and payroll application to using the employee record as context rather than passing it as an argument.
function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}
function createEmployeeRecords(employee) {
  return employee.map((employeeData) =>{
    return createEmployeeRecord(employeeData);
  })
}

function createTimeInEvent(dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date: date
  });
  return this;
}

function createTimeOutEvent(dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date: date
  })
  return this;
}
function hoursWorkedOnDate(date) {
  const timeInEvent = this.timeInEvents.find((event) => event.date === date);
  const timeOutEvent = this.timeOutEvents.find((event) => event.date === date);
  const timeInHours = parseInt(timeInEvent.hour.toString().slice(0,-2))
  const timeOutHours = parseInt(timeOutEvent.hour.toString().slice(0,-2));

  return (timeOutHours - timeInHours);

}

function wagesEarnedOnDate(date) {
  let hoursWorked = hoursWorkedOnDate.call(this, date)
  let payAmount  =  this.payPerHour
  return hoursWorked * payAmount;
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // 

    return payable
}
function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((data) => {
    return data.firstName === firstName
  });
}


function calculatePayroll(employees) {
  return employees.reduce(function (acc, employee) {
    return acc + allWagesFor.call(employee)
  },0)

}





/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */


