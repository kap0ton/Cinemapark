
var app = {
    // Application Constructor
    initialize: function() {
        
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
        
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function() {
        
        app.receivedEvent('deviceready');
        cinemapark.initialize();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

var cinemapark = {
    initialize: function() {
        app.receivedEvent('cinemapark initialized');
        getCinemas();
    }
};

function getCinemas(){
    $.ajax({
           type: "GET",
           url: "http://gadget.www.cinemapark.ru/data/multiplexes/",
           //datatype: "xml",
           success: suc,
           error: err
    });
}

function suc(data){
    var items = $('data item', data);
    items.each(function(){
               var a = $('<a>');
               a.html($(this).attr('title'));
               a.attr('href','#');
               
               var li = $('<li>');
               li.html(a);
               
               $('ul').append(li);
    });
}

function err(){
    alert('error');
}

function setMainView(){
    
}