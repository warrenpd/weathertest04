    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }


    
    // onSuccess Geolocation
    //
    function onSuccess(position) {
       
        var dlat = position.coords.latitude;
        var dlng = position.coords.longitude;
       
        var d = new Date();
       
        var dwurl = "https://api.forecast.io/forecast/e32c606d068ff332da3d875313cc02fb/"+dlat+","+dlng;
        
        localStorage.setItem("theurl", dwurl);
        $.getJSON(dwurl + "?callback=?", function(data) {
                console.log(data);
                
                var wicon = data.currently.icon;
                var wiconshow;
            
                switch(wicon)
                {
                        case "clear-day":
                            wiconshow = '<i class="wi wi-day-sunny"></i>';
                        break;
                        
                        case "partly-cloudy-day":
                            wiconshow = '<i class="wi wi-day-cloudy-gusts"></i>';
                        break;
                        
                        case "clear-night":
                            wiconshow = '<i class="wi wi-night-clear"></i>';
                        break;
                        
                        case "rain":
                            wiconshow = '<i class="wi wi-rain"></i>';
                        break;
                        
                        case "snow":
                            wiconshow = '<i class="wi wi-snow"></i>';
                        break;
                        
                        case "sleet":
                            wiconshow = '<i class="wi wi-sleet"></i>';
                        break;
                        
                        case "wind":
                            wiconshow = '<i class="wi wi-windy"></i>';
                        break;
                        
                        case "fog":
                            wiconshow = '<i class="wi wi-fog"></i>';
                        break;
                        
                        case "cloudy":
                            wiconshow = '<i class="wi wi-cloud"></i>';
                        break;
                        
                        case "partly-cloudy-night":
                            wiconshow = '<i class="wi wi-night-partly-cloudy"></i>';
                        break;
                        
                        default:
                            wiconshow = '<i class="wi wi-refresh"></i>';
                        break;
                }
            
                document.getElementById("wdate").innerHTML = d.toDateString();
                document.getElementById("icon").innerHTML = wiconshow;
                var tempinc = (parseFloat(data.currently.temperature)-32)*(5/9);
                var tempinc2 = (parseFloat(data.daily.data[0].temperatureMax)-32)*(5/9);
                var tempinc3 = (parseFloat(data.daily.data[1].temperatureMax)-32)*(5/9);
               
                document.getElementById("temperature").innerHTML = "Feels like "+Math.round(tempinc)+'&deg;C';
                document.getElementById("weather").innerHTML = data.currently.summary;
                document.getElementById("humidity").innerHTML = '<img src="img/humidity.png" height="16" width="16">'+Math.round(data.currently.humidity*100)+'%';
                document.getElementById("wspeed").innerHTML = '<img src="img/wind.png" height="16" width="16">'+Math.round(data.currently.windSpeed*1.6)+' km/h';
                //document.getElementById("linkp2").innerHTML = '<ul data-role="listview"><li><a href="#pagetwo"> Next 7 Days Forecast..</a></li></ul>';
                //document.getElementById("lng").innerHTML = "Longitude: "+data.longitude;
                //document.getElementById("url").innerHTML = wurlform;
                });     
            
        //MAP-----------------------
/*        var map;

            function initialize() {
                var mapOptions = {
                    zoom: 8,
                    center: new google.maps.LatLng(-34.397, 150.644),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                map = new google.maps.Map(document.getElementById('map_canvas'),
                mapOptions);
            }

            google.maps.event.addDomListener(window, 'load', initialize);
  */      
        
        //MAP------------------------
        
        
        
        
        
            getforecast();
        
    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }


   function getforecast()
    {
        
        var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
            ];
        
        var dayNames = [
        "Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday"
        ];
        
        var nowurl = localStorage.getItem("theurl");
        
        //alert("GETFORECAST URL PASSED: "+nowurl);
        
        $.getJSON(nowurl + "?callback=?", function(data) {
              console.log(data);
                          
                var date01 = new Date(data.daily.data[1].time*1000); 
                var xday1 = date01.getDay();
                var tempinc1 = (parseFloat(data.daily.data[1].temperatureMax)-32)*(5/9);
                
                var date02 = new Date(data.daily.data[2].time*1000); 
                var xday2 = date02.getDay();
                var tempinc2 = (parseFloat(data.daily.data[2].temperatureMax)-32)*(5/9);
                
                var date03 = new Date(data.daily.data[3].time*1000); 
                var xday3 = date03.getDay();
                var tempinc3 = (parseFloat(data.daily.data[3].temperatureMax)-32)*(5/9);
                
                var date04 = new Date(data.daily.data[4].time*1000); 
                var xday4 = date04.getDay();
                var tempinc4 = (parseFloat(data.daily.data[4].temperatureMax)-32)*(5/9);
                
                var date05 = new Date(data.daily.data[5].time*1000); 
                var xday5 = date05.getDay();
                var tempinc5 = (parseFloat(data.daily.data[5].temperatureMax)-32)*(5/9);
                
                var date06 = new Date(data.daily.data[6].time*1000); 
                var xday6 = date06.getDay();
                var tempinc6 = (parseFloat(data.daily.data[6].temperatureMax)-32)*(5/9);
                
                var date07 = new Date(data.daily.data[7].time*1000); 
                var xday7 = date07.getDay();
                var tempinc7 = (parseFloat(data.daily.data[7].temperatureMax)-32)*(5/9);
                
                //alert(toString(monthNames[day1]));
                
                //document.getElementById("cityname").innerHTML = wadd;
                document.getElementById("day1").innerHTML = dayNames[xday1];
                document.getElementById("desc1").innerHTML = data.daily.data[1].summary;
                document.getElementById("temp1").innerHTML = tempinc1.toFixed(2);
                
                document.getElementById("day2").innerHTML = dayNames[xday2];
                document.getElementById("desc2").innerHTML = data.daily.data[2].summary;
                document.getElementById("temp2").innerHTML = tempinc2.toFixed(2);
                
                document.getElementById("day3").innerHTML = dayNames[xday3];
                document.getElementById("desc3").innerHTML = data.daily.data[3].summary;
                document.getElementById("temp3").innerHTML = tempinc3.toFixed(2);
            
                document.getElementById("day4").innerHTML = dayNames[xday4];
                document.getElementById("desc4").innerHTML = data.daily.data[4].summary;
                document.getElementById("temp4").innerHTML = tempinc4.toFixed(2);
                
                document.getElementById("day5").innerHTML = dayNames[xday5];
                document.getElementById("desc5").innerHTML = data.daily.data[5].summary;
                document.getElementById("temp5").innerHTML = tempinc5.toFixed(2);
            
                document.getElementById("day6").innerHTML = dayNames[xday6];
                document.getElementById("desc6").innerHTML = data.daily.data[6].summary;
                document.getElementById("temp6").innerHTML = tempinc6.toFixed(2); 
            
                document.getElementById("day7").innerHTML = dayNames[xday7];
                document.getElementById("desc7").innerHTML = data.daily.data[7].summary;
                document.getElementById("temp7").innerHTML = tempinc7.toFixed(2);
            
            //document.getElementById("humidity").innerHTML = data.currently.humidity;
                //document.getElementById("lat").innerHTML = data.latitude;
                //document.getElementById("lng").innerHTML = data.longitude;
                //document.getElementById("url").innerHTML = wurlform;
                
                });        
        
    }