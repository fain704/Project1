

var diet;
var exclude;
var calories;
var duration;
var mealplan = [];


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
};


$("#submit").on("click", function() {

    diet = $("#diet").val();
    exclude = $("#exclude").val();
    calories = $("#calories").val();
    duration = $("#duration").val();


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

      var thirdqueryURL = "http://api.walmartlabs.com/v1/search?format=json&callback=product&apiKey=ybnhuvuf44ajn4txptrpedm4&query="+ name;


  $.ajax({
    url: thirdqueryURL,
    method:"GET",
    dataType: "jsonp"
  }).done(function(response) {
function product(data){
  console.log(data);
}  
});

});
