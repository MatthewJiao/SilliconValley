var names = ['']
var address = []
var rating = []
var map
var request
var service
var rad = 5
var lat = 43.888882
var long = -79.415550



function initialize() {
    var center = new google.maps.LatLng(lat,long)
    map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 13
    })
        request = {
        location: center,
        radius: rad*1000,
        types: ['grocery_or_supermarket']
    }

    services = new google.maps.places.PlacesService(map)
    services.nearbySearch(request, callback)

    removeChildren()    
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK){
        for(var i = 0; i < results.length; i++){
            createMarker(results[i])
            names[i] = results[i].name
            address[i] = results[i].vicinity
           // console.log(results[i].opening_hours)
            rating[i] = results[i].rating

        }
    }
    console.log(names,address,rating)

   // console.log('hi')
    display()
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


function appendStore(name, address, rating){
    const messageElement = document.createElement('div')
    messageElement.innerText = `Store: ${name} \n Location: ${address} \n Rating: ${rating}`
    storeContainer.appendChild(messageElement) 

}

function removeChildren(){
    storeContainer.length = 0

}


function display(){
    for (var i = 0; i < names.length; i++){
        appendStore(names[i], address[i], rating[i])

    }
}

function addListener(){
    searchForm.addEventListener('submit', e=> {
        e.preventDefault()
        rad = radius.value
        lat = latitude_input.value
        long = longitude_input.value
        //showTime()
        initialize()

    })
}

/*
function showTime() {
    var center = new google.maps.LatLng(long,lat)
    map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 13
    })
        request = {
        location: center,
        radius: rad*10,
        types: ['grocery_or_supermarket']
    }

    services = new google.maps.places.PlacesService(map)
    services.nearbySearch(request, callback)

    
}

*/