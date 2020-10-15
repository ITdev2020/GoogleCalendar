function createEvent() {
  var test = {
    'summary':'EventCreatedForTestOnly',
    'location':'800 Howard St., San Francisco, CA 94103',
    'description':'Event created for test only',
    'start': {
      'dateTime':'2020-10-22T09:00:00-07:00',
      'timeZone':'America/Los_Angeles'
    },
    'end': {
      'dateTime':'2020-10-22T17:00:00-07:00',
      'timeZone':'America/Los_Angeles'
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
    'resource': test
  });
  
  request.execute(function(resp) {
    // appendPre('Event created: ' + event.htmlLink);
  
  // by Igor vvv
    var textContent = document.createTextNode('Event created: ' + resp.htmlLink);
    document.getElementsByClassName('event-created')[0].appendChild(textContent);
  // by Igor ^^^
  });
}