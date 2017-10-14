 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA1zM5_IWhS51dVyWnUxY5HVruePUsADJg",
    authDomain: "usersignin-9e951.firebaseapp.com",
    databaseURL: "https://usersignin-9e951.firebaseio.com",
    projectId: "usersignin-9e951",
    storageBucket: "usersignin-9e951.appspot.com",
    messagingSenderId: "1097869544587"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var provider = new firebase.auth.GoogleAuthProvider();

  function User(uid, name, email) {
  	this.uid = uid;
  	this.name = name;
  	this.email = email;
  }

// firebase.auth().languageCode = 'pt';
// To apply the default browser preference instead of explicitly setting it.
firebase.auth().useDeviceLanguage();

function Auth() {firebase.auth().signInWithRedirect(provider);};

firebase.auth().getRedirectResult().then(function (result) {
                if (result.credential) {
                    var token = result.credential.accessToken;
                }
                var currentUser = result.user;
                if (result.user != null) {
                    
                   database.ref("users/"+(currentUser.uid)).once("value", function (snapshot) {
                        var userData = snapshot.val();
                        console.log(userData);
                        if (!userData) {
                            currentUser = new User(currentUser.uid, currentUser.displayName, currentUser.email);
                            database.ref("users/"+(currentUser.uid)).update(currentUser);
                        }
                    })
                }
            });firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // ...
  }
  // The signed-in user info.
  var user = result.user;
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

firebase.auth().onAuthStateChanged(function (user) {
        
               if (user) {
                    app.currentUser = user;
                }
            });
                    
       

firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});

$("#signin").on("click",Auth)