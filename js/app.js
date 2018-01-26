var initBbq = [
  {
    "title": "Stubb's BBQ",
    "location": {
      "lat": 30.23507699999999,
      "lng": -97.91172940000001
    }
  },
  {
    "title": "Franklin Barbecue",
    "location": {
      "lat": 30.270142,
      "lng": -97.73127119999998
    }
  },
  {
    "title": "Salt Lick",
    "location": {
      "lat": 30.201817,
      "lng": -97.66789790000001
    }
  },
  {
    "title": "Rudy's Country Store & Bar-B-Q",
    "location": {
      "lat": 30.263601,
      "lng": -97.815497
    }
  },
  {
    "title": "Terry Black's Barbecue",
    "location": {
      "lat": 30.2596563,
      "lng": -97.75482139999997
    }
  },
  {
    "title": "Stiles Switch",
    "location": {
      "lat": 30.3345671,
      "lng": -97.72141909999999
    }
  },
  {
    "title": "Iron Works BBQ",
    "location": {
      "lat": 30.2622231,
      "lng": -97.73900170000002
    }
  },
  {
    "title": "House Park Bar-B-Que",
    "location": {
      "lat": 30.27678680000001,
      "lng": -97.750453
    }
  },
  {
    "title": "Valentina's Tex Mex BBQ",
    "location": {
      "lat": 30.1530261,
      "lng": -97.83382840000002
    }
  },
  {
    "title": "Stubb's Bar-B-Q",
    "location": {
      "lat": 30.2685007,
      "lng": -97.7362579
    }
  },
  {
    "title": "Bill Miller Bar-B-Q",
    "location": {
      "lat": 30.3292244,
      "lng": -97.65899669999999
    }
  },
  {
    "title": "SLAB BBQ & Beer",
    "location": {
      "lat": 30.37111770000001,
      "lng": -97.72469130000002
    }
  },
  {
    "title": "Brown's BBQ",
    "location": {
      "lat": 30.2494355,
      "lng": -97.76689909999999
    }
  },
  {
    "title": "Rudy's Texas Bar-B-Q",
    "location": {
      "lat": 30.41059210000001,
      "lng": -97.84947439999996
    }
  },
  {
    "title": "Gordo's Tortas & BBQ",
    "location": {
      "lat": 30.2300256,
      "lng": -97.93531209999998
    }
  },
  {
    "title": "Green Mesquite BBQ",
    "location": {
      "lat": 30.2614245,
      "lng": -97.75918820000004
    }
  },
  {
    "title": "Rudy's Country Store & Bar-B-Q",
    "location": {
      "lat": 30.4141089,
      "lng": -97.74709989999997
    }
  },
  {
    "title": "La Barbecue",
    "location": {
      "lat": 30.2561407,
      "lng": -97.7223452
    }
  },
  {
    "title": "Black's BBQ",
    "location": {
      "lat": 30.298592,
      "lng": -97.74117100000001
    }
  },
  {
    "title": "Lamberts",
    "location": {
      "lat": 30.26484189999999,
      "lng": -97.74807899999996
    }
  }
];

var sidebarInitial = function(){$("#sidebar")
  .sidebar({
    dimPage: false,
    closable: false,
  })
  .sidebar('attach events','#launch-btn')
}


function initMap() {
  var map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.7587, lng: -122.4352},
    zoom: 11
  });
}



//main view
var ViewModel = function() {
  sidebarInitial();

  var self = this;

  //sidebar initial state
  this.open = ko.observable(false);

  this.sidebarToggle = function() {
    self.open($("#sidebar").sidebar('is hidden'));
  }

  this.arrowDirection = ko.computed(function() {
    //return left or right class according to the state
    return this.open() ? "left" : "right"
    }, this)
  }

ko.applyBindings(new ViewModel());