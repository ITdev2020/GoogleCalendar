// Client ID and API key from the Developer Console
var CLIENT_ID = '817151676915-l3nn4esbroq5q92n0ko1rrpibrle6fqa.apps.googleusercontent.com';
var API_KEY = 'AIzaSyA1_SDugEG25dVDMiLwqTXe_r3OA-7MbFQ';

// Array of API discovery doc URLs for APIs used by the app
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly';
// by Igor vvv
// var SCOPES = 'https://www.googleapis.com/auth/calendar';
// by Igor ^^^

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  }, function(error) {
// by Igor vvv
    appendPre(JSON.stringify(error, null, 2), 0);
// by Igor ^^^
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
      console.log("Inside updateSigninStatus-if ..." + isSignedIn);
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    listUpcomingEvents();
  } else {
          console.log("Inside updateSigninStatus-else ..." + isSignedIn);
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    console.log("Inside handleSignoutClick ...");
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a li element to the ul containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in li element.
 */
function appendPre(message, i) {
// by Igor vvv
  var ulList = document.getElementsByTagName('ul')[0];
  ulList = document.createElement('li');
  document.getElementById('events').appendChild(ulList);
  var pre = document.getElementsByTagName('li')[i];
// by Igor ^^^
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  }).then(function(response) {
    var events = response.result.items;
    if (events.length > 0) {
// by Igor vvv
      var textContent = document.createTextNode('Upcoming events:');
      document.getElementsByClassName('heading')[0].appendChild(textContent);
// by Igor ^^^
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        }
// by Igor vvv
        var aPre = (event.summary + ' (' + when + ')');
        appendPre(aPre, i);
// by Igor ^^^
      }
    } else {
// by Igor vvv
      var textContent = document.createTextNode('No upcoming events found.');
      document.getElementsByClassName('heading')[0].appendChild(textContent);
// by Igor ^^^
    }
  });
};

// by Igor vvv
var sectGapiStyle = document.getElementsByClassName('gapi')[0].style;
sectGapiStyle.position='fixed';
sectGapiStyle.bottom='100px';