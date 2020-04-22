var names = []
var address = []
var rating = []
var storeSize = []
var storeId = []

var map
var request
var service
var rad = 5
var lat = 43.888882
var long = -79.415550



function initialize() {
   clearList()
    var center = new google.maps.LatLng(lat,long)
    map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 13
    })
        request = {
        location: center,
        radius: rad*1000,
        types: ['supermarket']
        
        // supermarket maybe with grocery
        //department_store for costco
        }

    services = new google.maps.places.PlacesService(map)
    services.nearbySearch(request, callback)

        request2 = {
            location: center,
            radius: rad*1000,
            types: ['department_store']
        }
        services.nearbySearch(request2, callback2)



     
}

function callback(results, status) {
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
  // console.log(storeSize,names)
    //sortSizes()
    //console("sizes", )
 //   console.log(results)
 //  display(0) //displays store info in screen
   addListener() 
}

function callback2(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK){
        for(var i = 20; i < 20 + results.length; i++){
            createMarker(results[i-20])
            names[i] = results[i-20].name
            address[i] = results[i-20].vicinity
            rating[i] = results[i-20].rating
            storeSize[i] = results[i-20].user_ratings_total
            storeId[i] = results[i-20].id
           // console.log(storeId[i])

        }
    }
    //console.log("end")
    deleteRepeat()
    sortSizes()
    display() //displays store info in screen
    addListener() 
}

function createMarker(place) {
    var placeLoc = place.geometry.location
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    })
}

google.maps.event.addDomListener(window, 'load', initialize)


function display(){
    for (var i = 0; i < names.length; i++){
        if(names[i]==null){
            break
        }
        cells[i].innerText = `${names[i]} ${storeId[i]}`
     // console.log(names[i])
    //  console.log(storeId[i])


    }
}


function addListener(){
    searchForm.addEventListener('submit', e=> {
        e.preventDefault()
        rad = radius.value
        lat = latitude_input.value
        long = longitude_input.value
        
        initialize()

    })
}

function sortSizes(){
   // console.log(storeSize)
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


function clearList(){
    names = []
    address = []
    rating = []
    storeSize = []
    storeId = []
    
}

function deleteRepeat(){
    let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
  //  console.log(findDuplicates(storeId)) // All duplicates
}
