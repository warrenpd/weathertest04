var wurlweather;
var wadd;

function load_json(api_url)
    { 
        var xhr;
        if(window.XMLHttpRequest)
        {
            xhr=new XMLHttpRequest();
        }
        else
        {
            xhr=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.open("GET",api_url,false);
        xhr.send();
        //alert("Text: "+xhr.responseText);
        return xhr.responseText;
    }
    
    
    function getlatlong()
    {
        wadd = document.getElementById("address").value;
        var wurllatlong = "https://maps.googleapis.com/maps/api/geocode/json?address="+wadd+"&key=AIzaSyAc1qJ4n76RK0P0DV-kLl8xgauVoxKL4xM&quotaUser=warren.prasad";
        //alert("URL: "+wurllatlong);
        var data=load_json(wurllatlong);
        var json = JSON.parse(data);

        var wlat = parseFloat(json.results[0].geometry.location.lat);
        var wlng = parseFloat(json.results[0].geometry.location.lng);
        
        wurlweather = "https://api.forecast.io/forecast/e32c606d068ff332da3d875313cc02fb/"+wlat+","+wlng;
        //alert("URL for Weather AAAAAA: "+wurlweather);
  
         localStorage.setItem("thesurl", wurlweather);
        //alert("URL for Weather BBBBBB: "+wurlweather);
        $.getJSON(wurlweather + "?callback=?", function(data) {
                console.log(data);
            
                var d = new Date();
                var swicon = data.currently.icon;
                var swiconshow;
                 //alert("wiconshow: "+swicon);
                switch(swicon)
                {
                        case "clear-day":
                            swiconshow = '<i class="wi wi-day-sunny"></i>';
                        break;
                        
                        case "partly-cloudy-day":
                            swiconshow = '<i class="wi wi-day-cloudy-gusts"></i>';
                        break;
                        
                        case "clear-night":
                            swiconshow = '<i class="wi wi-night-clear"></i>';
                        break;
                        
                        case "rain":
                            swiconshow = '<i class="wi wi-rain"></i>';
                        break;
                        
                        case "snow":
                            swiconshow = '<i class="wi wi-snow"></i>';
                        break;
                        
                        case "sleet":
                            swiconshow = '<i class="wi wi-sleet"></i>';
                        break;
                        
                        case "wind":
                            swiconshow = '<i class="wi wi-windy"></i>';
                        break;
                        
                        case "fog":
                            swiconshow = '<i class="wi wi-fog"></i>';
                        break;
                        
                        case "cloudy":
                            swiconshow = '<i class="wi wi-cloud"></i>';
                        break;
                        
                        case "partly-cloudy-night":
                            swiconshow = '<i class="wi wi-night-partly-cloudy"></i>';
                        break;
                        
                        default:
                            swiconshow = '<i class="wi wi-refresh"></i>';
                        break;
                }
            
                document.getElementById("swdate").innerHTML = d.toDateString();
                //alert("Date: "+d.toDateString());
                document.getElementById("sicon").innerHTML = swiconshow;
                var tempinc = (parseFloat(data.currently.temperature)-32)*(5/9);
                var tempinc2 = (parseFloat(data.daily.data[0].temperatureMax)-32)*(5/9);
                var tempinc3 = (parseFloat(data.daily.data[1].temperatureMax)-32)*(5/9);
               
                document.getElementById("stemperature").innerHTML = "Feels like "+Math.round(tempinc)+'&deg;C';
                document.getElementById("sweather").innerHTML = data.currently.summary;
                document.getElementById("shumidity").innerHTML = '<img src="img/humidity.png" height="16" width="16">'+Math.round(data.currently.humidity*100)+'%';
                document.getElementById("swspeed").innerHTML = '<img src="img/wind.png" height="16" width="16">'+Math.round(data.currently.windSpeed*1.6)+' km/h';

                });     
            
    
            getforecast2();
        
    }
    
   function getforecast2()
    {
        
        var smonthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
            ];
        
        var sdayNames = [
        "Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday"
        ];
        
        var snowurl = localStorage.getItem("thesurl");
        
        //alert("GETFORECAST URL PASSED: "+snowurl);
        
        $.getJSON(snowurl + "?callback=?", function(data) {
              console.log(data);
                          
                var sdate01 = new Date(data.daily.data[1].time*1000); 
                var sxday1 = sdate01.getDay();
                var stempinc1 = (parseFloat(data.daily.data[1].temperatureMax)-32)*(5/9);
                
                var sdate02 = new Date(data.daily.data[2].time*1000); 
                var sxday2 = sdate02.getDay();
                var stempinc2 = (parseFloat(data.daily.data[2].temperatureMax)-32)*(5/9);
                
                var sdate03 = new Date(data.daily.data[3].time*1000); 
                var sxday3 = sdate03.getDay();
                var stempinc3 = (parseFloat(data.daily.data[3].temperatureMax)-32)*(5/9);
                
                var sdate04 = new Date(data.daily.data[4].time*1000); 
                var sxday4 = sdate04.getDay();
                var stempinc4 = (parseFloat(data.daily.data[4].temperatureMax)-32)*(5/9);
                
                var sdate05 = new Date(data.daily.data[5].time*1000); 
                var sxday5 = sdate05.getDay();
                var stempinc5 = (parseFloat(data.daily.data[5].temperatureMax)-32)*(5/9);
                
                var sdate06 = new Date(data.daily.data[6].time*1000); 
                var sxday6 = sdate06.getDay();
                var stempinc6 = (parseFloat(data.daily.data[6].temperatureMax)-32)*(5/9);
                
                var sdate07 = new Date(data.daily.data[7].time*1000); 
                var sxday7 = sdate07.getDay();
                var stempinc7 = (parseFloat(data.daily.data[7].temperatureMax)-32)*(5/9);
                
                //alert(toString(monthNames[day1]));
                
                //document.getElementById("cityname").innerHTML = wadd;
                document.getElementById("sday1").innerHTML = sdayNames[sxday1];
                document.getElementById("sdesc1").innerHTML = data.daily.data[1].summary;
                document.getElementById("stemp1").innerHTML = stempinc1.toFixed(2);
                
                document.getElementById("sday2").innerHTML = sdayNames[sxday2];
                document.getElementById("sdesc2").innerHTML = data.daily.data[2].summary;
                document.getElementById("stemp2").innerHTML = stempinc2.toFixed(2);
                
                document.getElementById("sday3").innerHTML = sdayNames[sxday3];
                document.getElementById("sdesc3").innerHTML = data.daily.data[3].summary;
                document.getElementById("stemp3").innerHTML = stempinc3.toFixed(2);
            
                document.getElementById("sday4").innerHTML = sdayNames[sxday4];
                document.getElementById("sdesc4").innerHTML = data.daily.data[4].summary;
                document.getElementById("stemp4").innerHTML = stempinc4.toFixed(2);
                
                document.getElementById("sday5").innerHTML = sdayNames[sxday5];
                document.getElementById("sdesc5").innerHTML = data.daily.data[5].summary;
                document.getElementById("stemp5").innerHTML = stempinc5.toFixed(2);
            
                document.getElementById("sday6").innerHTML = sdayNames[sxday6];
                document.getElementById("sdesc6").innerHTML = data.daily.data[6].summary;
                document.getElementById("stemp6").innerHTML = stempinc6.toFixed(2); 
            
                document.getElementById("sday7").innerHTML = sdayNames[sxday7];
                document.getElementById("sdesc7").innerHTML = data.daily.data[7].summary;
                document.getElementById("stemp7").innerHTML = stempinc7.toFixed(2);
            
            //document.getElementById("humidity").innerHTML = data.currently.humidity;
                //document.getElementById("lat").innerHTML = data.latitude;
                //document.getElementById("lng").innerHTML = data.longitude;
                //document.getElementById("url").innerHTML = wurlform;
                
                });        
        
    }