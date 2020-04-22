// lists for store info 
var names = []
var address = []
var rating = []
var storeSize = []
var storeId = []


var map
var request
var service
var rad = 5

// starting location
var lat = 43.888882
var long = -79.415550





// when google maps loads, this function starts 
function initialize() {
    
    var center = new google.maps.LatLng(lat,long)
    map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 13 
    })

    // request1 with parameter 'supermarket' 
    request = {
        location: center,
        radius: rad*1000,
        types: ['supermarket']
    }
        

    // request2 with parameter 'costco/walmart' 
    request2 = {
        location: center,
        radius: rad*1000,
        types: ['department_store']
    }
    services = new google.maps.places.PlacesService(map)

    services.nearbySearch(request, callback1) // request 1 
    services.nearbySearch(request2, callback2)  // request 2 
}

// callback functions are called at the very END of the program

// callback1 is to collect 'supermarkets'
function callback1(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK){
        for(var i = 0; i < results.length; i++){
            createMarker(results[i])
            names[i] = results[i].name
            address[i] = results[i].vicinity
            rating[i] = results[i].rating
            storeSize[i] = results[i].user_ratings_total
            storeId[i] = results[i].id
           
        }
    }
 
}

// callback2 is to collect 'costco and walmart'
function callback2(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK){
        for(var i = 20; i < 20 + results.length; i++){
            createMarker(results[i-20])
            names[i] = results[i-20].name
            address[i] = results[i-20].vicinity
            rating[i] = results[i-20].rating
            storeSize[i] = results[i-20].user_ratings_total
            storeId[i] = results[i-20].id

        }
    }
    sortSizes()
    display() //displays store info in screen
  //  addListener() 
}

//adds a marker on map 
function createMarker(place) {
    var placeLoc = place.geometry.location
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    })
}


//when google maps loads, the 'initialize' function is called 
google.maps.event.addDomListener(window, 'load', initialize)




// output store info into table layout
function display(){
    for (var i = 0; i < names.length; i++){
        if(names[i]==null){
            break
        }
        cells[i].innerText = `${names[i]}`
        console.log(names[i])

    }
}

// add listener for search butten
function addListener(){
    //initializeObjects()
    searchForm.addEventListener('submit', e=> {
        e.preventDefault()
        rad = radius.value
        lat = latitude_input.value
        long = longitude_input.value
        
        initialize()

    })
}

// sort stores by size
function sortSizes(){
    var swapp;
    var n = storeSize.length-1;
    do {
        swapp = false;
        for (var i=0; i < n; i++)
        {
            if (storeSize[i] < storeSize[i+1])
            {
               var temp = storeSize[i];
               storeSize[i] = storeSize[i+1];
               storeSize[i+1] = temp;

               var temp2 = names[i];
               names[i] = names[i+1];
               names[i+1] = temp2;

               var temp3 = rating[i];
               rating[i] = rating[i+1];
               rating[i+1] = temp3;

               var temp4 = address[i];
               address[i] = address[i+1];
               address[i+1] = temp4;

               swapp = true;
            }
        }
        n--;
    } while (swapp);
}

// to initialize objects in js
function initializeObjects(){
    const cells = document.querySelectorAll('.cell')
    const searchForm = document.getElementById('search-container')
}





// auto complete
var searchInput = 'search_input'
$(document).ready(function () {
    var autocomplete
    autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
        types: ['geocode'] 
    })
    google.maps.event.addDomListener(autocomplete, 'place_changed', function () {
        var near_place = autocomplete.getPlace()
        document.getElementById('latitude_input').value = near_place.geometry.location.lat()
        document.getElementById('longitude_input').value = near_place.geometry.location.lng()

        document.getElementById('latitude_view').innerHTML = near_place.geometry.location.lat()
        document.getElementById('longitude_view').innerHTML = near_place.geometry.location.lng()


    })
})

//show lat and long
$(document).on('change','#'+searchInput, function () {
    document.getElementById('latitude_input').value = ''
    document.getElementById('longitude_input').value = ''
    document.getElementById('latitude_view').innerHTML = ''
    document.getElementById('longitude_view').innerHTML = ''
})

