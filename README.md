# Make !mpact
A React Native app for impactful investment.

## Installation
Clone the repo:
```
git clone https://github.com/makeimpact-io/react_native_mi.git
```
Go to the project folder and install the neccesary packages:
```
cd ./MakeImpactRN
npm install
```

## Getting started
- The ./api folder contains all the api requests in the app. To add a new api request make a new folder and a TS file that will contain the request only there.
- The ./assets folder contains all visual components such as icons as well as fonts and the the "Theme" which contains color constants so that the colors of the app can be easily changed. If you want to use another color in the app please create a new constant there.
- The ./components folder contains all the components that the app uses. All of the are separated in different folders and some of them are grouped into folders as well. All of the components are export through the ./components/index.ts file.
- The ./navigation folder contains all the navigators and the routing logic of the app. The ./navigation/app folder contains all the navigators for the app when a user is signed whereas the ./navigation/AuthContent.tsx contains the one for the unauthenticated users. the ./navigation/Routes.ts contains the logic for routing between the auth content and the app content.
- The ./screens folder contains all the app's screens seperated primarily by the BottomTabNavigation. Some screens have a 'helper' file containing some function to make the screen code more understandable.
- The app uses React Redux and it utilizes a lot the '@reduxjs/toolkit' package. All of the reducers are made as a slice making it easier to create both the reducers and the actions. If you need to add a new reducers, add it first to any of the slices available or create a new one and then export the action for this reducer.
- All of the types in the app are made inside the ./types folder and exported through the index file.
- The ./utils folder contains some utils for the app such as enums for Gender and Investment as well as the validations for the user inputs.
