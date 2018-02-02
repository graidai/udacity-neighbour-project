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


var initiateSidebar = function() {
  $("#sidebar")
    .sidebar({
      dimPage: false,
      closable: false,
    })
    .sidebar('attach events','#launch-btn');
};


function getPlacesDetails(marker, detailFunc, infoWindow) {
  var innerHTML = '';
  // if the place already has details, dont make the network call
  // previous placeDetails data
  if(!marker.placeDetails){
    $.ajax({
      type: "GET",
      dataType: "jsonp",
      cache: false,
      url: 'https://api.foursquare.com/v2/venues/' + marker.idFourSqr + '?' +
      	'&client_id=55GRDDIO4M4MSANZAEVW3YOIBGYHHIO5KLNVJALFQ5MOFR4G&client' +
      	'_secret=IGWG0OXVMSZGVULL12DSBCKXA50FQV5PDO2NASVMTFBLW54B&v=20180128',
      error: function(request, status, error) {
        if(infoWindow) {
          infoWindow.setContent('OOPS!! <br>Error:<br><strong>' +
            error + '</strong> error' + ' <br>Please try again later');
          infoWindow.open(map, marker);
        } else {
          alert('Sorry No Info Available\nError: ' + error);
        }
        console.log(status);
      },
      success: function(result, status) {
        if(result.meta.errorDetail){
          console.log(result.meta);
          if (!infoWindow) {
            return;
          }
          infoWindow.setContent('<p>OOPS!! No Info Available</p><strong>' +
            result.meta.code + ' error<br>Error Type: ' + result.meta.errorType +
            '</strong>' + '<br>Please try again later');
          infoWindow.open(map, marker);
          return;
        }
        var venue = result.response.venue;
        if(result.meta.code == 200){
          //if no infoWindow, just return the values of callback
          if(!infoWindow){
            detailFunc(venue);
            return;
          }
          innerContent(venue);
          detailFunc(venue);
        }
      }
    });
  } else {
    if (!infoWindow) return;
    var venue = marker.placeDetails;
    innerContent(venue);
  }
  function innerContent(venue) {
    infoWindow.setContent('');
    infoWindow.marker = marker;
    innerHTML = '<div>';
    innerHTML += '<strong>' + marker.title + '</strong>';
    if (venue.location.formattedAddress) {
      innerHTML += '<br><br><p>' + venue.location.formattedAddress.join(',<br>');
    }
    if (venue.contact.formattedPhone) {
      innerHTML += '<br>' + venue.contact.formattedPhone;
    }
    if (venue.rating) {
      innerHTML += '<br><br>Rating: ' + venue.rating;
    }
    if (venue.price) {
      innerHTML += ', Price: ' + venue.price.currency;
    }
    if (venue.bestPhoto) {
      innerHTML += '<br><img src="' + venue.bestPhoto.prefix + '200x100' +
        venue.bestPhoto.suffix +'">';
    }

    innerHTML += '</p></div>';
    infoWindow.setContent(innerHTML);
    infoWindow.open(map, marker);
  }
}

function animateMarker(marker) {
  marker.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout(function () {
    marker.setAnimation(null);
  }, 1400);
}

function makeMarkerIcon(marker, iconType) {
  var url = '';
  switch(iconType) {
    case 'black':
      url = 'static/chickenBlack.png';
      break;
    case 'blue':
      url = 'static/chickenBlue.png';
      break;
    case 'default':
      url = 'static/chickenDefault.png';
      break;
    default:
      url = 'static/chickenDefault.png';
  }
  var icon = {
    url: url,
    size: new google.maps.Size(20, 32),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 32),
    scale: 10
  };
  marker.setIcon(icon);
}

function searchIdFourSqr(data, callback) {
  $.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: false,
    url: 'https://api.foursquare.com/v2/venues/search?ll=' + data.location.lat +
      ',' + data.location.lng +'&name=' + data.title + '&limit=30&intent=mat' +
      'ch&client_id=55GRDDIO4M4MSANZAEVW3YOIBGYHHIO5KLNVJALFQ5MOFR4G&client' +
      '_secret=IGWG0OXVMSZGVULL12DSBCKXA50FQV5PDO2NASVMTFBLW54B&v=20170801',
    success: function(data){
      if(data.meta.code == 200){
        callback(data.response.venues[0]);
      } else {
        callback('');
      }
    }
  });
}

function selectMarker(marker, markers, infoWindow) {
  function setPlaceDetails(placeDetails) {
    marker.placeDetails = placeDetails;
  }
  // if just hovering the sidebar, async placedetails and save in marker object
  // if the marker object already has placeDetails key, network call is not made
  // in getPlacesDetails()
  if(!infoWindow){
    getPlacesDetails(marker, setPlaceDetails);
    return;
  }
  getPlacesDetails(marker, setPlaceDetails, infoWindow);
  //change other markers color to default
  markers.forEach(obj => {
    makeMarkerIcon(obj.marker, 'default');
  });
  makeMarkerIcon(marker, 'black');

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
  //async call to Foursqure API to find the id of the given location
  searchIdFourSqr(data, function(idx){
    self.marker.idFourSqr = idx.id;
  });
};

var ModalView = function(marker) {
  //initial default observables
  this.marker = ko.observable(marker);
  this.title = ko.observable(marker.title || '');
  this.address = ko.observableArray(['Sorry! No address']);
  this.rating = ko.observable('0');
  this.price = ko.observable('N/a');
  this.phone = ko.observable('not available');
  this.notAvailable = ko.observable("Sorry info not available");
  this.photoUrlArray = ko.observableArray([{
    'url': 'static/nepal.jpg',
    'caption': 'Go Visit Nepal',
    'attribution': 'https://pixabay.com/en/nepal-ebc-gokyo-trekking-2565878'
  }]);
  this.tipArray = ko.observableArray(["here's a tip", "try the food first"]);
  this.hours = ko.observableArray([{
    'days': 'No Hours Available',
    'time': 'No Time Avalilable'
  }]);

  if(marker.placeDetails) {
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
      this.hours([]);
      this.notAvailable('');
      marker.placeDetails.hours.timeframes.forEach(val => {
        this.hours.push({'days':val.days, 'time':val.open[0].renderedTime});
      });
      // this.hours(marker.placeDetails.hours.timeframes);
    }
    if(marker.placeDetails.photos) {
      var url;
      var caption;
      this.photoUrlArray([]);
      var items = marker.placeDetails.photos.groups[0].items;
      items.forEach((item, idx) => {
        url = item.prefix + '500x300' + item.suffix;
        caption = item.user.firstName;
        this.photoUrlArray.push({'url': url, 'caption': caption});
      });
    }
    if(marker.placeDetails.tips.groups[0].items[0]) {
      var tips = marker.placeDetails.tips.groups[0].items;
      this.tipArray([]);
      //get five tips from the tips data
      for(var i=0; i < 5; i++) {
        this.tipArray.push(tips[i].text);
      }
    }
  }
};


var FilterView = function(locations) {
  this.filteredArray = ko.observableArray(locations);
  this.btnVisibility = ko.observable(null);
  this.currMarker = ko.observable();

  this.filterBtn = function(dataModel) {
    // remove all markers first, then display the markers on the filter list
    dataModel.locations().forEach(obj => {
      obj.marker.setVisible(false);
    });
    this.filteredArray().forEach(location => {
      location.marker.setVisible(true);
    });
  }.bind(this);

  //mouse hover on locations list
  this.changeMarkerIcon = function(childElement, viewModel, data, event) {
    if(viewModel.currentMarker() != data.marker){
      makeMarkerIcon(data.marker, 'blue');
    }
    selectMarker(data.marker);
    // make show detail button visible just for the highlighted element
    childElement.style.visibility = 'visible';
  }.bind(this);
  this.changeMarkertoDefault = function(childElement, viewModel, data, event) {
    if(viewModel.currentMarker() != data.marker){
      makeMarkerIcon(data.marker, 'default');
    }
    childElement.style.visibility = 'hidden';
  }.bind(this);
};



//main view
var ViewModel = function() {
  initiateSidebar();
  var self = this;

  this.locations = ko.observableArray(initLocations.map(location => {
    return new Location(location);
  }));

  //add event listener for the each markers on the map
  this.locations().forEach(location => {
    location.marker.addListener('click', function() {
      self.selectMarkerOnMap(this);
    });
    location.marker.addListener('mouseover', function() {
      if(self.currentMarker() != this){
        makeMarkerIcon(this, 'blue');
      }
    });
    location.marker.addListener('mouseout', function() {
      if(self.currentMarker() != this){
        makeMarkerIcon(this, 'default');
      }
    });
  });

  //inital map and model entities
  this.currentFilteredView = ko.observable(new FilterView(this.locations()));
  this.modalView = ko.observable(new ModalView(this.locations()[0].marker));
  this.infoWindow = new google.maps.InfoWindow();
  this.inputTitle = ko.observable();
  this.filterStatus = ko.observable(true);
  this.currentMarker = ko.observable();
  this.filteredArray = ko.observableArray(this.locations());
  this.sidebarStatus= ko.observable('Show Locations');
  this.currentInfoWindow = ko.observable();
  this.modalViewList = {'Initial': null};


  this.filterTitle = function(dataModel, event) {
    this.filteredArray([]);
    var filter;
    var data = dataModel.locations();
    var input = dataModel.inputTitle();
    //check for empty backspace in input field
    filter = input ? input.toUpperCase() : '';
    //check for string match
    data.forEach(obj => {
      var title = obj.marker.title.toUpperCase();
      //if input field empty, display all markers
      if(filter===''){
        obj.marker.setVisible(true);
      }
      if(title.indexOf(filter) > -1){
        // in case you want to filter without clicking the button in real time
        // surprisingly easier than having to put the button implemntation
        if(this.filterStatus()) obj.marker.setVisible(true);
        this.filteredArray.push(obj);
      } else {
        if(this.filterStatus()) obj.marker.setVisible(false);
      }
    });
    this.currentFilteredView(new FilterView(this.filteredArray()));
  }.bind(this);

  this.filterToggle = function() {
    this.filterStatus(!this.filterStatus());
  }.bind(this);


  //select location from the list
  this.selectFromList = function(data, e) {
    //show details only if marker is on the map
    if(data.marker.map){
      this.selectMarkerOnMap(data.marker);
    }
  }.bind(this);
  //select location from the marker on map
  this.selectMarkerOnMap = function(marker) {
    selectMarker(marker, this.locations(), this.infoWindow);
    this.currentMarker(marker);
    this.currentInfoWindow(this.infoWindow);
  }.bind(this);


  //semantic ui implementations
  this.showModal = function(data) {
    var markerTitle = data.marker.title;
    var currentModalView;
    if (!this.modalViewList[markerTitle]) {
      currentModalView = new ModalView(data.marker);
      this.modalViewList[markerTitle] = currentModalView;
    } else {
      currentModalView = this.modalViewList[markerTitle];
    }
    this.modalView(currentModalView);
    $('.ui.rating').rating('disable');
    $('.ui.modal').modal('show');
    $('.shape').shape();
    $('#1side').addClass('active');
  }.bind(this);

  this.flipNext = function(){
    $('.shape').shape('flip right');
  };

  this.flipPrevious = function(){
    $('.shape').shape('flip left');
  };

  this.sidebarToggle = function() {
    $('.chevron').toggleClass('open');
    $("#launch-btn").popup();
    self.sidebarStatus(
      $("#sidebar").sidebar('is visible') ? 'Show Locations' : 'Hide Sidebar');
  }.bind(this);

  this.reset = function() {
    map.setCenter({lat: 30.275, lng: -97.732});
    if(this.currentMarker) {
      this.infoWindow.close();
      this.currentMarker(null);
    }
  }.bind(this);
};


var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 30.275, lng: -97.732},
    zoom: 11
  });
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel);
}
