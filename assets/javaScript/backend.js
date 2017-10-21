// // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyA1zM5_IWhS51dVyWnUxY5HVruePUsADJg",
//     authDomain: "usersignin-9e951.firebaseapp.com",
//     databaseURL: "https://usersignin-9e951.firebaseio.com",
//     projectId: "usersignin-9e951",
//     storageBucket: "usersignin-9e951.appspot.com",
//     messagingSenderId: "1097869544587"
//   };
//   firebase.initializeApp(config);

//   var database = firebase.database();
//   var provider = new firebase.auth.GoogleAuthProvider();
//   var user;

//   function User(uid, name, email) {
//    this.uid = uid;
//    this.name = name;
//    this.email = email;

//   }

// // To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();

// function Auth() {firebase.auth().signInWithRedirect(provider);};

// firebase.auth().getRedirectResult().then(function (result) {
//                 if (result.credential) {
//                     var token = result.credential.accessToken;
//                 }
//                 var currentUser = result.user;
//                 if (result.user != null) {

//                    database.ref("users/"+(currentUser.uid)).once("value", function (snapshot) {
//                         var userData = snapshot.val();
//                         console.log(userData);
//                         user = userData;
//                         if (!userData) {
//                             currentUser = new User(currentUser.uid, currentUser.displayName, currentUser.email);
//                             database.ref("users/"+(currentUser.uid)).update(currentUser);
//                             user = currentUser;

//                         }
//                     })
//                 }
//             });firebase.auth().getRedirectResult().then(function(result) {
//   if (result.credential) {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = result.credential.accessToken;
//     // ...
//   }
//   // The signed-in user info.
//   var user = result.user;
// }).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   // ...
// });

// firebase.auth().onAuthStateChanged(function (user) {

//                if (user) {
//                     app.currentUser = user;
//                 }
//             });

// firebase.auth().signOut().then(function() {
//   // Sign-out successful.
// }).catch(function(error) {
//   // An error happened.
// });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var diet;
var exclude;
var calories;
var duration;
var mealplan = [];

// function walmart(name){

//   var thirdqueryURL = "http://api.walmartlabs.com/v1/search?format=json&callback=product&apiKey=ybnhuvuf44ajn4txptrpedm4&query="+name;

//   $.ajax({
//     url: thirdqueryURL,
//     method:"GET",
//     dataType: "jsonp"
//   });
// };

function foodRecipeNutrition(diet, exclude, calories, duration) {
    // //build api Query Url with hard coded search criteria
    var firstqueryURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/mealplans/generate?diet=' + diet + '&exclude=' + exclude + '&calories=' + calories + '&duration=' + duration;
    //initialize variables for storing data recieved from API
    var recipeIds = [];
    var recipeTitle = [];
    var instructions;
    //first ajax call
    $.ajax({
        url: firstqueryURL,
        method: "GET",
        dataType: 'json',
        contentType: 'application/json',
        headers: {
            'X-MashApe-Key': "GgZnHbiCEBmshGzT8g37bSZFy5BFp1iIqh2jsnWgLcG2L1F9jx",
            'Accept': 'application/json',
        }
    }).done(function(response) {
        //loop through response.items array
        for (let i = 0; i < response.items.length; i++) {
            //parse the json object indexed at response.item[i].value this turns it from a json object to a javascript object we can use
            var valueParsed = JSON.parse(response.items[i].value);
            //set values
            recipeIds.push(valueParsed.id)
            recipeTitle.push(valueParsed.title);
            //set id equal to id value of current index
            var id = recipeIds[i];
            //build second api call query with id
        }
        ;console.log(recipeTitle);
        for (let i = 0; i < recipeTitle.length; i++) {
            let titlerow = $("<div>");
            let title = $("<button>");
            title.addClass("btn btn-success btn-block recipe");
            title.text(recipeTitle[i]);
            title.data("id", recipeIds[i]);
            titlerow.append(title);
            $("#recipebox").append(titlerow);
        }
    });
}
;
//**********************************************Working Code Above Don't Change*******************************************************

// $("#login").on("click", Auth);

$("#submit").on("click", function() {
    diet = "vegetarian";
    //$("#diet").val();
    exclude = "peanuts";
    //$("#exclude").val();
    calories = 2000;
    //$("#calories").val();
    duration = "day";
    //$("#duration").val();

    exclude = exclude.toString();
    diet = diet[0];

    foodRecipeNutrition(diet, exclude, calories, duration);

});

$(document).on("click", ".recipe", function() {
    var id = $(this).data("id");
    var title = $(this).text();
    $("#recipebox").empty();

    var secondqueryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk?ids=" + id;
    //second ajax call
    $.ajax({
        url: secondqueryURL,
        method: "GET",
        dataType: 'json',
        contentType: 'application/json',
        headers: {
            'X-Mashape-Key': "GgZnHbiCEBmshGzT8g37bSZFy5BFp1iIqh2jsnWgLcG2L1F9jx",
            'Accept': 'application/json'
        }
    }).done(function(response) {
        //init variables for data to be collected from second call
        let mealIngredients = [];
        let ingredients = [];
        //loop through second call response[0].extendedIngredients
        for (let j = 0; j < response[0].extendedIngredients.length; j++) {
            //builds ingredients objects that are put into ingredients array at [j] index
            let mealIngredient = {
                "id": response[0].extendedIngredients[j].id,
                "name": response[0].extendedIngredients[j].name
            };
            ingredients[j] = mealIngredient;
        };
        instructions = response[0].instructions;

        let titlerow = `<div class="row">
                          <div class = "col-12"><h1>${title}<h1></div>
                          </div>
                          `;

        let instrow = `<div class="row'>
                          <div class = "col-12"><h4>${instructions}</h4></div>
                      </div>`

        let ingredientsrow = $("<div>");
        ingredientsrow.addClass("row");
        let ingredientscol = $("<div>");
        ingredientscol.addClass("col-12");
        ingredientscol.attr("id", "ingredients-div");

        for (let i = 0; i < ingredients.length; i++) {
            let ingrow = $("<div>");
            ingrow.addClass("row");
            let ingrodiv = $("<div>");
            ingrodiv.addClass("col-12");
            let ingrodivbtn = $("<button>");
            ingrodivbtn.addClass("btn btn-success btn-block ingredient");
            ingrodivbtn.data("name", ingredients[i].name);
            ingrodivbtn.text(ingredients[i].name);
            ingredientscol.append(ingrow.append(ingrodiv.append(ingrodivbtn)));
        }

        ingredientsrow.append(ingredientscol);
        $("#recipebox").append(titlerow);
        $("#recipebox").append(instrow);
        $("#recipebox").append(ingredientsrow);

    });
});

$(document).on("click", ".ingredient", function() {
      var name = $(this).data("name");
      alert(name);
      var thirdqueryURL = "http://api.walmartlabs.com/v1/search?format=json&callback=product&apiKey=ybnhuvuf44ajn4txptrpedm4&query="+ name;

  $.ajax({
    url: thirdqueryURL,
    method:"GET",
    dataType: "jsonp"
  }).done(function(response) {
    console.log(response);
  });
});


// solution: run first and second ajax calls seperately, fill container with buttons of recipe titles/ids from first call,
// and on click of button execute second ajax call with id attached as data of recipe button, and on completion of the second call, fill the container
// with data retrieved from second call, then if user wants to know cost of ingredient at walmart they can click the ingredient and the walmart call will fire

// 

//         //build recipe object from data collected, this will be pushed to google firebase one recipe at a time
//        let recipe = {
//          title: recipeTitle[i],
//          recipeId: recipeIds[i],
//          ingredients,
//          instructions: response[0].instructions
//        };

//create instruction row and column and add instruction to column html, then append instruction to instruction row
// let instructionrow = $("<div>");
// instructionrow.addClass("row");
// let instructioncol = $("<div>");
// instructioncol.addClass("col-12");
// instructioncol.html(recipe.instructions);
// instructionrow.append(instructioncol);

//         //create ingredient row and col that all ingredients for recipe with go into;
//         let ingredientrow = $("<div>");
//         ingredientrow.addClass("row");
//         let ingredientcol = $("<div>");
//         instructioncol.addClass("col-12");

//         for (let j = 0; j < recipe.ingredients.length; j++){
//           let ingredient = $("<p>");
//           ingredientcol.append(ingredient);
//           ingredient.on("click", function(){
//             let name = $(this).html();
//             walmart(name);
//           });
//         }

//         $("#recipebox").append(titlerow);
//         $("#recipebox").append(instructionrow);
//         $("#recipebox").append(ingredientrow);

//         //this console logs out the recipe objects that are to be sent to google firebase for validation of data structure
//        // console.log("recipe",recipe);
//        mealplan.push(recipe);  

//// initialiaze value for grocery list
// var groceryList = [];

// //loop through ingredients of each firebase recipe object and add to the array if it doesn't already exist or if the ingredient is water.
// for (let i = 0; i < firebaseMealObject.length; i++) {
//   for (let j = 0; j < firebaseMealObject[i].ingredients.length; j++) {

//     if (groceryList.indexOf(firebaseMealObject[i].ingredients[j].name) === -1 && firebaseMealObject[i].ingredients[j].name !=="water"){

//       groceryList[(j*i)+j] = firebaseMealObject[i].ingredients[j].name;
//       console.log(groceryList[j]);

//     }

//   }
// }
// //filters grocery list so that undefined index values are removed
// groceryList = groceryList.filter(i=>i);

// var i = 0;

// walmart(groceryList[i]);
// console.log("length",groceryList);

// function product(data){
//   console.log(data);
//   if(++i < groceryList.length) {
//     walmart(groceryList[i]);
//   }
// }