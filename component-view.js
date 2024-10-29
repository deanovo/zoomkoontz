const client = ZoomMtgEmbedded.createClient();

let meetingSDKElement = document.getElementById('meetingSDKElement');

var authEndpoint = 'https://damp-lake-1f18.design-a2e.workers.dev/'; // Your Cloudflare Worker URL
var sdkKey = 'M3y2mjj9SXakwTZqpAV4jA';
var meetingNumber = '85913735068';
var passWord = '402790';
var role = 0;
var userName = 'JavaScript';
var userEmail = '';
var registrantToken = '';
var zakToken = '';

function getSignature() {
  fetch(authEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      meetingNumber: meetingNumber,
      role: role
    })
  })
  .then((response) => response.json())
  .then((data) => {
    console.log('Signature data:', data);
    startMeeting(data.signature);
  })
  .catch((error) => {
    console.log('Error fetching signature:', error);
  });
}

function startMeeting(signature) {
  client.init({
    zoomAppRoot: meetingSDKElement,
    language: 'en-US',
    patchJsMedia: true,
    leaveOnPageUnload: true
  })
  .then(() => {
    console.log('Zoom client initialized');
    client.join({
      signature: signature,
      sdkKey: sdkKey,
      meetingNumber: meetingNumber,
      password: passWord,
      userName: userName,
      userEmail: userEmail,
      tk: registrantToken,
      zak: zakToken
    })
    .then(() => {
      console.log('Joined meeting successfully');
    })
    .catch((error) => {
      console.log('Error joining meeting:', error);
    });
  })
  .catch((error) => {
    console.log('Error initializing Zoom client:', error);
  });
}

// Call getSignature to start the process
getSignature();
