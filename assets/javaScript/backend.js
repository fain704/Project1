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

//*************************************Working Code Below Don't Change***********************************************************
////values hard coded that will be used for food-recipe-nutrition api calls
// var diet = "vegan";
// var exclude = "dairy";
// var calories = 2000;
// var duration = "day";
////build api Query Url with hard coded search criteria
// var firstqueryURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/mealplans/generate?diet='+diet+'&exclude='+exclude+'&calories='+calories+'&duration='+duration;
////initialize variables for storing data recieved from API
// var recipeIds =[];
// var recipeTitle =[];
// var instructions =[];
////first ajax call
// $.ajax({
//   url: firstqueryURL,
//   method: "GET",
//   dataType :'json',
//   contentType:'application/json',
//   headers: {
//     'X-MashApe-Key': "GgZnHbiCEBmshGzT8g37bSZFy5BFp1iIqh2jsnWgLcG2L1F9jx",
//     'Accept': 'application/json',
//   }
// }).done(function(response) {
//  //console log returned response 
//  console.log(response);
//  //loop through response.items array
//  for (let i = 0; i < response.items.length; i++) {
    ////parse the json object indexed at response.item[i].value this turns it from a json object to a javascript object we can use
//    var valueParsed = JSON.parse(response.items[i].value);
    ////set values
//    recipeIds[i] = valueParsed.id;
//    recipeTitle[i] = valueParsed.title;
    //set id equal to id value of current index
//    var id = recipeIds[i];
    ////build second api call query with id
//    var secondqueryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk?ids="+ id;
    ////second ajax call
//    $.ajax({
//      url: secondqueryURL,
//      method: "GET",
//      dataType :'json',
//      contentType:'application/json',
//      headers: {
//        'X-Mashape-Key': "GgZnHbiCEBmshGzT8g37bSZFy5BFp1iIqh2jsnWgLcG2L1F9jx",
//        'Accept': 'application/json'
//      }
//    }).done(function(response) {
      ////init variables for data to be collected from second call
//      let mealIngredients = [];
//      let ingredients = [];
      ///loop through second call response[0].extendedIngredients
//      for (let j = 0; j<response[0].extendedIngredients.length; j++){
        //builds ingredients objects that are put into ingredients array at [j] index
//        let mealIngredient = {
//          "id": response[0].extendedIngredients[j].id,
//          "name": response[0].extendedIngredients[j].name
//        };

//        ingredients[j] = mealIngredient;

//      };

      //build recipe object from data collected, this will be pushed to google firebase one recipe at a time
//      let recipe = {
//        title: recipeTitle[i],
//        recipeId: recipeIds[i],
//        ingredients,
//        instructions: response[0].instructions
//      };

      ////this console logs out the recipe objects that are to be sent to google firebase for validation of data structure
//      console.log("recipe",recipe);

        
//    });

//  };

// });
//**********************************************Working Code Above Don't Change*******************************************************



//this object is a recreation of what the console.log("recipe",recipe); returned in the log, and is what will be pushed to firebase as an array or recipe objects
// var firebaseMealObject =[ //first recipe object [0]
//               {ingredients:[
//                 {id:12104,
//                 name:"coconut"},
//                 {id:93604,
//                 name:"curry leaves"},
//                 {id:11216,
//                 name:"ginger"},
//                 {id:8160,
//                 name:"grits"},
//                 {id:93718,
//                 name:"urad dal"},
//               ],
//               instructions:"Lightly rinse the grits and soak it with 1.5 to 2 cups of water.In a separate bowl add all the daals, rinse it and soak it in 3-4 cups of water.  Also add the red chillies with the daal.After 4 hours either using a blender or wet grinder first grind the daals (adding water little by little) along with the chillies, also add the green chillies, ginger and coconut.Once it is ground coarsely add the grits also and grind it for another couple of minutes.  The batter should not be very smooth and also not very coarse.Transfer the batter to a bowl, add salt and coriander leaves.Now prepare the adais as usual.",
//               recipeId:247056,
//               title:"Hominy Grits Adai"},
//               //second recipe object [1]
//               {ingredients:[
//                 {id:9040,
//                 name:"bananas"},
//                 {id:2010,
//                 name:"cinnamon"},
//                 {id:9087,
//                 name:"dates"},
//                 {id:99132,
//                 name:"hazel nut milk"},
//                 {id:93602,
//                 name:"hemp seeds"},
//                 {id:1012047,
//                 name:"sea salt"},
//                 {id:12698,
//                 name:"tahini"},
//               ],
//               instructions:"Place all ingredients into a blender and blend until smooth. Add more milk, as desired. Serve cold with granola, hemp seeds and a drizzle of tahini.",
//               recipeId:893265,
//               title:"Tahini Date Smoothie Bowls"},
//               //third recipe object [2]
//               {ingredients:[
//                 {id:19334,
//                 name:"brown sugar"},
//                 {id:9218,
//                 name:"canned mandarin oranges"},
//                 {id:9079,
//                 name:"dried cranberries"},
//                 {id:9214,
//                 name:"orange juice concentrate"},
//                 {id:8402,
//                 name:"quick cooking oats"},
//                 {id:12155,
//                 name:"walnuts"},
//                 {id:14412,
//                 name:"water"},
//                 {id:20078,
//                 name:"wheat germ"}
//               ],
//               instructions:"Directions                                                                                In a large saucepan, bring the water and orange juice concentrate to a boil. Stir in the oats, wheat germ and cranberries. Return to a boil; cook and stir for 2 minutes. Remove from the heat. Stir in oranges, brown sugar and walnuts if desired.                                        Yield: 4 servings.                                                                                                                         Originally published as Orange Cranberry Oatmeal in  Quick CookingSeptember/October 2003, p16                                                                                                                                                                                                        Nutritional Facts                                                                             1 serving (1 cup) equals 223 calories, 2 g fat (trace saturated fat), 0 cholesterol, 10 mg sodium, 48 g carbohydrate, 4 g fiber, 6 g protein.                                                                                                                                                                     Print                                                                                    Add to Recipe Box                            Email a Friend",
//               recipeId:129201,
//               title:"Orange Cranberry Oatmeal"},
//               //fourth recipe object [3]
//               {ingredients:[
//                 {id:1002030,
//                 name:"black pepper"},
//                 {id:93784,
//                 name:"brown rice syrup"},
//                 {id:4042,
//                 name:"peanut oil"},
//                 {id:16091,
//                 name:"peanuts"},
//                 {id:11112,
//                 name:"red cabbage"},
//                 {id:1022053,
//                 name:"rice vinegar"},
//                 {id:2047,
//                 name:"salt"},
//                 {id:11114,
//                 name:"savoy cabbage"},
//                 {id:11291,
//                 name:"scallions"}
//               ],
//               instructions:"Place the shredded cabbage and scallions in a large bowl. Heat a medium dry skillet over medium-low heat. Add nuts and let toast, stirring every 20 seconds or so, until the nuts are lightly browning. Add to cabbage mixture.In a small bowl, whisk together the ingredients for the dressing. Pour over the cabbage and toss until everything is well combined and cabbage is coated. Taste and add more salt if desired. Let sit for 5 minutes before serving.",
//               recipeId:723984,
//               title:"Cabbage Salad with Peanuts"},
//               //fifth recipe object [4]
//               {ingredients:[
//                 {id:11109,
//                 name:"cabbage"},
//                 {id:16026,
//                 name:"canned great northern beans"},
//                 {id:10016034,
//                 name:"canned red kidney beans"},
//                 {id:10011693,
//                 name:"canned tomatoes"},
//                 {id:11143,
//                 name:"celery"},
//                 {id:11172,
//                 name:"corn kernel"},
//                 {id:11215,
//                 name:"garlic"},
//                 {id:1022027,
//                 name:"italian seasoning"},
//                 {id:11282,
//                 name:"onion"},
//                 {id:11420420,
//                 name:"spaghetti"},
//                 {id:98845,
//                 name:"vegetable bouillon cubes"},
//                 {id:14412,
//                 name:"water"},
//                 {id:11477,
//                 name:"zucchini"}

//               ],
//               instructions:"1                               In 4-quart Dutch oven, heat all ingredients except cheese to boiling, breaking up tomatoes; reduce heat to low.                                                          2                               Cover and simmer 15 to 20 minutes, stirring occasionally, until macaroni and vegetables are tender. Serve with cheese.",
//               recipeId:183910,
//               title:"Minestrone Soup"},
//               //sixth recipe object [5]
//               {ingredients:[
//                 {id:9003,
//                 name:"apple"},
//                 {id:9016,
//                 name:"apple juice"},
//                 {id:11124,
//                 name:"carrots"},
//                 {id:11957,
//                 name:"fennel bulb"},
//                 {id:11216,
//                 name:"fresh ginger"},
//                 {id:9152,
//                 name:"lemon juice"},                
//               ],
//               instructions:"Blend all ingredients in blender until smooth.",
//               recipeId:757637,
//               title:"Apple, Carrot, Ginger, and Fennel Smoothie"},
//               //seventh recipe object [6]
//               {ingredients:[
//                 {id:16018,
//                 name:"canned black beans"},
//                 {id:11124,
//                 name:"carrots"},
//                 {id:11172,
//                 name:"corn kernels"},
//                 {id:2042,
//                 name:"dried thyme"},
//                 {id:11297,
//                 name:"fresh parsley"},
//                 {id:1022020,
//                 name:"garlic powder"},
//                 {id:11260,
//                 name:"mushrooms"},
//                 {id:11282,
//                 name:"onion"},
//                 {id:20005,
//                 name:"pearl barley"},
//                 {id:8402,
//                 name:"quick cooking oats"},
//                 {id:1102047,
//                 name:"salt and pepper"},
//                 {id:6615,
//                 name:"vegetable broth"}               
//               ],
//               instructions:"Preheat oven to 350 degrees Fahrenheit.In a casserole dish, combine all ingredients. Cover tightly with foil and bake in preheated oven for one hour to 1 hour and 20 minutes, stirring every 30 minutes or until barley is cooked through and tender.Keep covered with foil until ready to serve.",
//               recipeId:619111,
//               title:"Barley, Bulgur and Vegetable Vegan Casserole"},
//               //eighth recipe object [7]
//               {ingredients:[
//                 {id:2004,
//                 name:"bay leaf"},
//                 {id:1006615,
//                 name:"broth"},
//                 {id:18350,
//                 name:"burger buns"},
//                 {id:16069,
//                 name:"dried brown lentils"},
//                 {id:11215,
//                 name:"garlic"},
//                 {id:1022027,
//                 name:"italian seasoning"},
//                 {id:8120,
//                 name:"old-fashioned oats"},
//                 {id:4053,
//                 name:"olive oil"},
//                 {id:14096,
//                 name:"red wine"},
//                 {id:2047,
//                 name:"salt"},
//                 {id:16124,
//                 name:"soy sauce"},
//                 {id:14412,
//                 name:"water"},
//                 {id:11260,
//                 name:"white mushrooms"}               
//               ],
//               instructions:"Combine lentils, bay leaf, and water in a small saucepan. Bring to a boil, then simmer over low heat for 10 minutes. (Yes, the lentils will be undercooked--don't cook them for the time indicated on the package!) Remove from heat, drain, and cool slightly. Discard bay leaf.Add mushrooms and lentils to food processor. Pulse until coarsely chopped.Heat olive oil in a large skillet over medium-high heat. Add garlic and cook until fragrant (about 30 seconds), stirring constantly. Stir in mushroom-lentil mixture. Cook for about 4 minutes or until browned, stirring constantly.Add red wine to skillet and cook until evaporated. Stir in broth, soy sauce, oats, and Italian seasoning. Continue to cook, stirring constantly, until liquid has been absorbed. Remove from heat. Season with salt and pepper to taste and allow to cool slightly.Preheat oven to 350 degrees.Line a baking sheet with parchment paper (or spray it with oil or cooking spray). Divide the burger mixture into 4 patties and pat them into shape on the baking sheet. You want them to be pretty tightly packed because that will help them hold their shape. Bake them for 20-30 minutes, or until the patties are browned and cooked through. Use a spatula to carefully transfer patties to buns, then top them with all of your fabulous burger toppings.",
//               recipeId:495417,
//               title:"Lentil Mushroom Burgers"},
//               //ninth recipe object [7]
//               {ingredients:[
//                 {id:4016,
//                 name:"asian toasted sesame dressing"},
//                 {id:11124,
//                 name:"carrots"},
//                 {id:10111205,
//                 name:"english cucumber"},
//                 {id:10016162,
//                 name:"extra firm tofu"},
//                 {id:2044,
//                 name:"fresh basil leaves"},
//                 {id:11043,
//                 name:"fresh bean sprouts"},
//                 {id:11215,
//                 name:"garlic cloves"},
//                 {id:11291,
//                 name:"green onion"},
//                 {id:19334,
//                 name:"light brown sugar"},
//                 {id:9160,
//                 name:"lime juice"},
//                 {id:1032009,
//                 name:"red pepper flakes"},
//                 {id:20133,
//                 name:"rice noodles"},
//                 {id:1022053,
//                 name:"rice vinegar"},
//                 {id:4058,
//                 name:"sesame oil"},
//                 {id:16124,
//                 name:"soy sauce"}               
//               ],
//               instructions:"Whisk together all ingredients in a small bowl.Place tofu and half of dressing in resealable bag or bowl. Toss to coat and marinate for 30 minutes.Heat oil in a large skillet over medium heat. Add tofu and cook about 4 minutes, or until browned. Remove from heat and set aside.Divide noodles, tofu, carrots, and basil into four bowls. Top with remaining ingredients, as desired. Ladle dressing into bowls and serve.",
//               recipeId:495631,
//               title:"Thai Tofu and Noodle Salad"}



//             ];


//initialiaze value for grocery list
var groceryList = [];

//loop through ingredients of each firebase recipe object and add to the array if it doesn't already exist or if the ingredient is water.
for (let i = 0; i < firebaseMealObject.length; i++) {
  for (let j = 0; j < firebaseMealObject[i].ingredients.length; j++) {

    if (groceryList.indexOf(firebaseMealObject[i].ingredients[j].name) === -1 && firebaseMealObject[i].ingredients[j].name !=="water"){

      groceryList[(j*i)+j] = firebaseMealObject[i].ingredients[j].name;
      console.log(groceryList[j]);

    }

  }
}
//filters grocery list so that undefined index values are removed
groceryList = groceryList.filter(i=>i);


var i = 0;

walmart(groceryList[i]);
console.log("length",groceryList);

function product(data){
  console.log(data);
  if(++i < groceryList.length) {
    walmart(groceryList[i]);
  }
}

function walmart(name){

  var thirdqueryURL = "http://api.walmartlabs.com/v1/search?format=json&callback=product&apiKey=ybnhuvuf44ajn4txptrpedm4&query="+name;

  $.ajax({
    url: thirdqueryURL,
    method:"GET",
    dataType: "jsonp"
  });
};