var initLocations = [
  {
    title: "Stubb's BBQ",
    location: {
      lat: 30.23507699999999,
      lng: -97.91172940000001
    }
  },
  {
    title: "Franklin Barbecue",
    location: {
      lat: 30.270142,
      lng: -97.73127119999998
    }
  },
  {
    title: "Salt Lick",
    location: {
      lat: 30.201817,
      lng: -97.66789790000001
    }
  },
  {
    title: "Rudy's Country Store & Bar-B-Q",
    location: {
      lat: 30.263601,
      lng: -97.815497
    }
  },
  {
    title: "Terry Black's Barbecue",
    location: {
      lat: 30.2596563,
      lng: -97.75482139999997
    }
  },
  {
    title: "Stiles Switch",
    location: {
      lat: 30.3345671,
      lng: -97.72141909999999
    }
  },
  {
    title: "Iron Works BBQ",
    location: {
      lat: 30.2622231,
      lng: -97.73900170000002
    }
  },
  {
    title: "Valentina's Tex Mex BBQ",
    location: {
      lat: 30.1530261,
      lng: -97.83382840000002
    }
  },
  {
    title: "Stubb's Bar-B-Q",
    location: {
      lat: 30.2685007,
      lng: -97.7362579
    }
  },
  {
    title: "Bill Miller Bar-B-Q",
    location: {
      lat: 30.3292244,
      lng: -97.65899669999999
    }
  },
  {
    title: "SLAB BBQ & Beer",
    location: {
      lat: 30.37111770000001,
      lng: -97.72469130000002
    }
  },
  {
    title: "Rudy's Texas Bar-B-Q",
    location: {
      lat: 30.41059210000001,
      lng: -97.84947439999996
    }
  },
  {
    title: "Gordo's Tortas & BBQ",
    location: {
      lat: 30.2300256,
      lng: -97.93531209999998
    }
  },
  {
    title: "Green Mesquite BBQ",
    location: {
      lat: 30.2614245,
      lng: -97.75918820000004
    }
  },
  {
    title: "Rudy's Country Store & Bar-B-Q",
    location: {
      lat: 30.4141089,
      lng: -97.74709989999997
    }
  },
  {
    title: "La Barbecue",
    location: {
      lat: 30.2561407,
      lng: -97.7223452
    }
  },
  {
    title: "Black's BBQ",
    location: {
      lat: 30.298592,
      lng: -97.74117100000001
    }
  },
  {
    title: "Lamberts",
    location: {
      lat: 30.26484189999999,
      lng: -97.74807899999996
    }
  }
];


var initiateSidebar = function(){$("#sidebar")
  .sidebar({
    dimPage: false,
    closable: false,
  })
  .sidebar('attach events','#launch-btn')
}


function getPlacesDetails(marker, detailFunc, infoWindow) {
  var innerHTML = '';
  // if the place already has details, dont make the network call
  // previous placeDetails data
  if(!marker.placeDetails){
    $.ajax({
      type: "GET",
      dataType: "jsonp",
      cache: false,
      url: 'https://api.foursquare.com/v2/venues/' + marker.idFourSqr + '?'
      + '&client_id=55GRDDIO4M4MSANZAEVW3YOIBGYHHIO5KLNVJALFQ5MOFR4G&client'
      + '_secret=IGWG0OXVMSZGVULL12DSBCKXA50FQV5PDO2NASVMTFBLW54B&v=20180128',
      success: function(result, status){
        if(result.meta.errorDetail){
          console.log(result.meta.errorDetail)
          infoWindow.setContent('OOPS!! No Info Available');
          infoWindow.open(map, marker);
          return
        }
        var venue = result.response.venue;
        if(result.meta.code == 200){
          if(!infoWindow){
            detailFunc(venue);
            return;
          }
          infoWindow.setContent('');
          infoWindow.marker = marker;
          innerHTML = '<div>';
          innerHTML += '<strong>' + marker.title + '</strong>';
          if (venue.location.formattedAddress) {
            innerHTML += '<br><br><p>'
            + venue.location.formattedAddress.join(',<br>');
          }
          if (venue.contact.formattedPhone) {
            innerHTML += '<br>'
            + venue.contact.formattedPhone;
          }
          if (venue.rating) {
            innerHTML += '<br><br>Rating: '
            + venue.rating;
          }
          if (venue.price) {
            innerHTML += ', Price: '
            + venue.price.currency;
          }
          if (venue.bestPhoto) {
            innerHTML += '<br><img src="'
            + venue.bestPhoto.prefix
            + '200x100' + venue.bestPhoto.suffix +'">';
          }
          innerHTML += '</p><button class="ui orange button" id="detail-btn" data-bind="click: sidebarToggle">ss</button></div>'
          innerHTML += '</p></div>'
          infoWindow.setContent(innerHTML);
          infoWindow.open(map, marker);
          detailFunc(venue);
        }
      }
    });
  } else {
    if(!infoWindow) return;

    var venue = marker.placeDetails;
      infoWindow.marker = marker;
      innerHTML = '<div>';
      innerHTML += '<strong>' + marker.title + '</strong>';
      if (venue.location.formattedAddress) {
        innerHTML += '<br><br><p>'
        + venue.location.formattedAddress.join(',<br>');
      }
      if (venue.contact.formattedPhone) {
        innerHTML += '<br>'
        + venue.contact.formattedPhone;
      }
      if (venue.rating) {
        innerHTML += '<br><br>Rating: '
        + venue.rating;
      }
      if (venue.price) {
        innerHTML += ', Price: '
        + venue.price.currency;
      }
      if (venue.bestPhoto) {
        innerHTML += '<br><img src="'
        + venue.bestPhoto.prefix
        + '200x100' + venue.bestPhoto.suffix +'">';
      }
      innerHTML += '</p><button class="ui orange button" id="detail-btn" data-bind="click: sidebarToggle">ss</button></div>'
      innerHTML += '</p></div>'
      infoWindow.setContent(innerHTML);
      infoWindow.open(map, marker);
  }
}

function animateMarker(marker) {
  marker.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout(function () {
    marker.setAnimation(null);
  }, 1420);
}

function makeMarkerIcon(marker, iconType) {
  var url = '';
  switch(iconType) {
    case 'black':
    url = 'static/chickenBlack.png'
    break;
    case 'blue':
    url = 'static/chickenBlue.png'
    break;
    case 'default':
    url = 'static/chickenDefault.png'
    break;
    default:
    url = 'static/chickenDefault.png'
  }
  var icon = {
    url: url,
    size: new google.maps.Size(20, 32),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 32),
    scale: 10
  }
  marker.setIcon(icon);
}

function searchIdFourSqr(data, callback) {
  $.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: false,
    url: 'https://api.foursquare.com/v2/venues/search?ll=' + data.location.lat
      + ','+ data.location.lng +'&name=' + data.title + '&limit=30&intent=mat'
      + 'ch&client_id=55GRDDIO4M4MSANZAEVW3YOIBGYHHIO5KLNVJALFQ5MOFR4G&client'
      + '_secret=IGWG0OXVMSZGVULL12DSBCKXA50FQV5PDO2NASVMTFBLW54B&v=20170801',
    success: function(data){
      if(data.meta.code == 200){
        callback(data.response.venues[0]);
      } else {
        callback('');
      }
    }
  });
}

function currentMarker(marker, markers, infoWindow) {
  function setPlaceDetails(placeDetails) {
    marker['placeDetails'] = placeDetails;
  }
  if(!infoWindow){
    getPlacesDetails(marker, setPlaceDetails);
    return;
  }
  getPlacesDetails(marker, setPlaceDetails, infoWindow);
  //change previous markers color
  markers.forEach(obj =>{
    makeMarkerIcon(obj.marker, 'default');
  })
  makeMarkerIcon(marker, 'black');
  marker['currentColor'] = 'black';
  animateMarker(marker);
}


var Location = function(data) {
  var self = this;
  var icon = {
      url: 'static/chickenDefault.png',
      size: new google.maps.Size(20, 32),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 32),
      scale: 10
    };
  this.marker = new google.maps.Marker({
    position: data.location,
    title: data.title,
    animation: google.maps.Animation.DROP,
    map: map,
    icon: icon
  });
  //async call find the id of the given location
  searchIdFourSqr(data, function(idx){
    self.marker['idFourSqr'] = idx.id;
  });
}

var ModalView = function(marker) {
  this.title = ko.observable(marker.title || '');
  this.address = ko.observableArray([]);
  this.rating = ko.observable();
  this.price = ko.observable();
  this.phone = ko.observable('not available');
  this.notAvailable = ko.observable("Sorry info not available");
  this.photoUrlArray = ko.observableArray([{
    'url': 'static/nepal.jpg',
    'caption': 'Go Visit Nepal'
  }]);
  this.tipArray = ko.observableArray(["here's a tip, try the food first"]);
  this.hours = ko.observableArray();

  if(marker.placeDetails) {
    console.log(marker.placeDetails)
    this.address(marker.placeDetails.location.formattedAddress);

    if(marker.placeDetails.rating) {
      this.rating(Math.round(marker.placeDetails.rating));
      }
      if(marker.placeDetails.price) {
        this.price(marker.placeDetails.price.currency);
      }
      if(marker.placeDetails.contact.formattedPhone) {
        this.phone(marker.placeDetails.contact.formattedPhone);
      }
      if(marker.placeDetails.hours) {
        this.notAvailable('');
        this.hours(marker.placeDetails.hours.timeframes);
      }
      if(marker.placeDetails.photos) {
        var url;
        var caption
        this.photoUrlArray([]);
        var items = marker.placeDetails.photos.groups[0].items;
        items.forEach((item, idx) => {
          url = item.prefix + '500x300' + item.suffix;
          caption = item.user.firstName;
          this.photoUrlArray.push({'url': url, 'caption': caption});
        })
      }
      if(marker.placeDetails.tips.groups[0].items[0]) {
        var tips = marker.placeDetails.tips.groups[0].items;
        this.tipArray([]);
        //get ten tips
        for(var i=0; i < 5; i++) {
          this.tipArray.push(tips[i].text);
        }
      }
    }
}


var FilterView = function(locations) {
  this.filteredArray = ko.observableArray(locations);
  this.btnVisibility = ko.observable(null);

  this.filterBtn = function(dataModel) {
    // remove all markers first, then display the markers on the filter list
    dataModel.locations().forEach(obj => {
      obj.marker.setMap(null);
    })
    locations.forEach(location => {
      location.marker.setMap(map);
    })
  }.bind(this);

  this.changeMarkerIcon = function(childElement, data, event) {
    //change all to default color, except the selected marker [black]
    this.filteredArray().forEach(obj =>{
      if(obj.marker.currentColor != 'black'){
        makeMarkerIcon(obj.marker, 'default');
      }
    })
    if(data.marker.currentColor != 'black'){
      makeMarkerIcon(data.marker, 'blue');
    }
    currentMarker(data.marker);
    // make show detail button visible just for the highlighted element
    childElement.style.visibility = 'visible';
  }.bind(this)
  this.changeMarkertoDefault = function(childElement, data, event) {
    if(data.marker.currentColor != 'black'){
      makeMarkerIcon(data.marker, 'default');
    }
    childElement.style.visibility = 'hidden';
  }.bind(this);

}



//main view
var ViewModel = function() {
  initiateSidebar();
  var self = this;

  this.locations = ko.observableArray(initLocations.map(location => {
    return new Location(location);
  }));

  //add event listener for the each markers on the map
  var self = this;
  this.locations().forEach(location => {
    location.marker.addListener('click', function() {
      self.selectMarkerOnMap(this);
    });
  });

  this.currentFilteredView = ko.observable(new FilterView(this.locations()));
  this.modalView = ko.observable(new ModalView(this.locations()[0].marker));

  this.filterTitle = function(dataModel, event) {
    this.filteredArray([]);
    var filter
    var data = dataModel.locations();
    var input = dataModel.inputTitle();
    //check for empty backspace in input field
    filter = input ? input.toUpperCase() : '';
    //check for string match
    data.forEach(obj => {
      var title = obj.marker.title.toUpperCase();
      //if input field empty, display all markers
      if(filter==''){
        obj.marker.setMap(map);
      }
      if(title.indexOf(filter) > -1){
        // obj.marker.setMap(map);
        this.filteredArray.push(obj);
      } else {
        // obj.marker.setMap(null);
      }
    });
    this.currentFilteredView(new FilterView(this.filteredArray()));
  }.bind(this);

  this.infoWindow = new google.maps.InfoWindow();

  this.selectFromList = function(data, e) {
    //show details only if marker is on the map
    if(data.marker.map){
      this.selectMarkerOnMap(data.marker);
    }
  }.bind(this);

  this.selectMarkerOnMap = function(marker) {
    currentMarker(marker, this.locations(), this.infoWindow);
  }.bind(this);

  this.showModal = function(data) {
    this.modalView(new ModalView(data.marker));
    $('.ui.rating').rating('disable');
    $('.ui.modal').modal('show');
    $('.shape').shape();
    $('#1side').addClass('active');
  }.bind(this);

  this.flipNext = function(){
    $('.shape').shape('flip right');
  }

  this.flipPrevious = function(){
    $('.shape').shape('flip left');
  }

  this.inputTitle = ko.observable();

  //inital filtered Array
  this.filteredArray = ko.observableArray(this.locations());


  this.sidebarToggle = function() {
    $('.chevron').toggleClass('open');
  }

}


var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 30.275, lng: -97.732},
    zoom: 11
  });
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel);
}
