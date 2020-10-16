// dealing with events from the user interface and performing API calls.
document.getElementById('addEventBtn').onclick = function() {
  var userChoices = getUserInput();
  if (userChoices)
    createEvent(userChoices);
};

function getUserInput() {

  var date = document.querySelector('#date').value;
  var startTime = document.querySelector('#start').value;
  var endTime = document.querySelector('#end').value;
  var eventTitle = document.querySelector('#event-title').value;
  console.log("Inside getUserInput ..." + date);
  // console.log(startTime);
  // console.log(endTime);
  // console.log(eventTitle);

  // check input values, they should not be empty
  if (date=="" || startTime=="" || endTime=="" || eventTitle=="") {
    alert('All your input fields should have a meaningful value.');
    return
  }
  else return {'date': date, 'startTime': startTime, 'endTime': endTime, 'eventTitle': eventTitle};
};


  // Make an API call to create an event.  Give feedback to user.
function createEvent(eventData) {
  // First create resource that will be send to server.
  var resource = {
    'summary': eventData.eventTitle,
    'start': {
      'dateTime': new Date(eventData.date + ' ' + eventData.startTime).toISOString()
    },
    'end': {
      'dateTime': new Date(eventData.date + ' ' + eventData.endTime).toISOString()
    },
  };
  // create the request
  var request = gapi.client.calendar.events.insert({
    'calendarId': 'primary',
    'resource': resource
  });

  // execute the request
  request.execute(function(resp) {
    var linkToEvent = 'Event created: <a href="' + resp.htmlLink + '">link to event</a>';
    console.log("Inside linkToEvent ..." + linkToEvent);
    document.getElementsByClassName('event-created')[0].innerHTML = linkToEvent;
  });
}


function createEvent_() {
  var addEvent = {
    'summary':'EventCreatedForTestOnly',
    'location':'J.Basanaviciaus, Vilnius, Lithuania',
    'description':'Event created for test only',
    'start': {
      'dateTime':'2020-10-22T09:00:00',
      'timeZone':'Europe/Vilnius'
    },
    'end': {
      'dateTime':'2020-10-22T17:00:00',
      'timeZone':'Europe/Vilnius'
    }
    // 'recurrence': [
    //   'RRULE:FREQ=DAILY;COUNT=2'
    // ],
    // 'attendees': [
    //   {'email': 'lpage@example.com'},
    //   {'email': 'sbrin@example.com'}
    // ],
    // 'reminders': {
    //   'useDefault': false,
    //   'overrides': [
    //     {'method': 'email', 'minutes': 24 * 60},
    //     {'method': 'popup', 'minutes': 10}
    //   ]
    // }
  };
  
  var request = gapi.client.calendar.events.insert({
    'calendarId': 'primary',
    'resource': addEvent
  });
  
  request.execute(function(resp) {
    var linkToEvent = 'Event created: <a href="' + resp.htmlLink + '">link to event</a>';
    console.log("Inside linkToEvent ..." + linkToEvent);
    document.getElementsByClassName('event-created')[0].innerHTML = linkToEvent;
  });
}