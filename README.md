# LeanNodeTask

Clone above git repository by below command in terminal
`git clone https://github.com/dalvianiket/LeanNodeTask.git`

## How to run mobile application?
Please install the application from the app-release.apk

After installation, the first screen to load will ask you to enter the ip (Only the ip) of the system on which the nodeJS server is running for it to connect to the backend (Please follow nodesJS servers readme for installation). This ip is stored in localstorage for subsequent openings. If you wish to reset the ip, we have provided a button for it.

The application then follows the functionality thats mentioned in the test. The nodeJS app connects to firebase to store the information on it. 
The different location types have different color and also the marker text logos.


## How to run the React Native Code?

Make sure you have node js install in your machine if not then download from link below
`https://nodejs.org/en/`

Make sure you have android studio as well as xcode install in your machine 

For RN setup please follow the below link 
https://facebook.github.io/react-native/docs/getting-started


Install the React Native command line interface.
`npm install -g react-native-cli`

In your project folder run following command through terminal
`npm install`

In the project folder run the follow command
`react-native run-android`
Make sure you have an android device connected to the machine in the debug mode

#known issues
1. Current map location is fixed.
2. Zoom level 3 makes the map look very small. Hence the zoom level is adjusted accordingly.

#todo
1. Initial position of the map is set by default. To make it dynamic based on the users location.

