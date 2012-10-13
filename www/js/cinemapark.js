
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
        container = $('#content');
        this.loadTemplates();
    },
    loadTemplates: function(){
        app.receivedEvent('loading templates...');
        for(var key in templates){
            var _key = key.toString();
            cinemapark.loadBegin(_key);
        }
    },
    loadBegin: function(key){
        $.get( templates[key], function(templ){
              app.receivedEvent(key + ' loaded');
              cinemapark.loadFinish(templ, key);
              });
    },
    loadFinish: function(tmpl, key){
        app.receivedEvent(key + ' saved');
        templates[key] = tmpl;
        if(key == "main")
            setMainView();
    }
};

var container;
var templates={
    main: "views/main.html",
    movie: "views/movie.html",
    multiplex: "views/multiplex.html"
};

function resetContainer() {
    //this removes child elements and cleans up event handlers
    container.children().remove();
    container.removeClass("nopadding");
}

/*--------------------------------------*/
/*      Main View                       */
/*--------------------------------------*/
function setMainView(){
    app.receivedEvent("set Main View");
    //container = $("body").find("#content");
    resetContainer();
    container.html( templates['main'] );
    
    
    var mName = window.localStorage.getItem('mName');
    var mId = window.localStorage.getItem('mId');
    if(mName != null && mId != null) {
        $('#multLabel').text(mName);
        loadMovies(mId);
    }
    
    $('#selMult').click(function (e) {
        e.preventDefault();
        setMultiplexView();
    });
    $('#selMov').click(function(e){
                       e.preventDefault();
                       setMovieView();
                       });
}

function loadMovies(mId){
    $.ajax({
           type: "GET",
           url: "http://www.cinemapark.ru/gadgets/data/movies/" + mId +"/",
           success: loadMoviesSuccess,
           error: loadMoviesError
           });
}

function loadMoviesSuccess(data){
    var items = $('data item', data);
    //var selId = window.localStorage.getItem('mId');
    items.each(function(){
               var movieId = $(this).attr('id');
               var movieName = $(this).attr('title');
               
               var img = $('<img>');
               img.attr('src', 'http://stasis.www.cinemapark.ru/img/film/poster_large/' + movieId + '.jpg')
               img.attr('class', 'movieImg');
               
               var a = $('<a>');
               a.html(movieName);
               a.attr('href','#');
               //a.attr('mId', id)
               a.click(function(item){
                       //        window.localStorage.setItem('mId', $(this).attr('mId'));
                       //        window.localStorage.setItem('mName', $(this).html());
                       setMovieView(movieId);
                       });
               
               var div = $('<div>');
               div.attr('class', 'movieText');
               div.html(a);
               
               var clr = $('<div>');
               clr.attr('class', 'clear');
               
               var li = $('<li>');
               li.append(img);
               li.append(div);
               li.append(clr);
               
               $('#movieList').append(li);
               });
}

function loadMoviesError(){
    alert('error');
}

/*--------------------------------------*/
/*      Multiplex View                  */
/*--------------------------------------*/
function setMultiplexView(){
    app.receivedEvent('set Multiplex View');
    resetContainer();
    container.html(templates['multiplex']);
    
    loadMultiplexes();
    
    $('#hrfMainView1').click(function(e){
                            e.preventDefault();
                            setMainView();
                            });
    $('#hrfMainView2').click(function(e){
                             e.preventDefault();
                             setMainView();
                             });
}

function loadMultiplexes(){
    $.ajax({
           type: "GET",
           url: "http://gadget.www.cinemapark.ru/data/multiplexes/",
           success: loadMultSuccess,
           error: loadMultError
           });
}

function loadMultSuccess(data){
    var items = $('data item', data);
    var selId = window.localStorage.getItem('mId');
    items.each(function(){
                var id = $(this).attr('id');
                var a = $('<a>');
                a.html($(this).attr('city') + ', ' + $(this).attr('title'));
                a.attr('href','#');
                a.attr('mId', id)
                a.click(function(item){
                        window.localStorage.setItem('mId', $(this).attr('mId'));
                        window.localStorage.setItem('mName', $(this).html());
                        setMainView();
                        });
                if (selId != null && selId == id){
                    a.addClass('multSelected');
                }
               
                var li = $('<li>');
                li.html(a);
               
                $('#multList').append(li);
                });
}

function loadMultError(){
    alert('error');
}


/*--------------------------------------*/
/*      Movie View                       */
/*--------------------------------------*/
function setMovieView(movieId){
    app.receivedEvent('set Movie View');
    resetContainer();
    container.html(templates['movie']);
    
    $('#movieImg').attr('src', 'http://stasis.www.cinemapark.ru/img/film/poster_large/' + movieId + '.jpg');
    
    $('#hrfMainView').click(function(e){
                            e.preventDefault();
                            setMainView();
                            });
}

function loadMovieDetails(){
    
}
