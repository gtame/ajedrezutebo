
 $(document).ready(function(){


    // Sticky sidebar
var rotatetext = function() {
var show =$('#span1');
if (show) {
 // fix
  show.cycleText();
} 
};

rotatetext();


var map =null;
  var panorama=null;
  
    //Gogle maps
    function initMap() {
      var fenway = {lat: 41.711547, lng: -1.00189};
      
          
      var marker = new google.maps.Marker({
        position: fenway,
        title:"Pabellon"});
        
        map = new google.maps.Map(document.getElementById('mapa'), {
          center: fenway,
          zoom: 14
        });
        panorama = new google.maps.StreetViewPanorama(
            document.getElementById('pano'), {
              position: fenway,
              pov: {
                heading: 34,
                pitch: 8
              }
            });
        marker.setMap(map);	
  
        map.setStreetView(panorama);
  
  
  
        google.maps.event.trigger(map, 'resize');
        map.setCenter(fenway);
  
        google.maps.event.trigger(panorama, 'resize');
        map.setCenter(fenway);
        
     }	
  
  
showdiv= function(mydiv) {

    $("#mapa").hide();
    $("#pano").hide();
   $("#contenedor").show();
   $("#home").hide(); 
   $("#inscritos").hide(); 
   $("#inscripciones").hide();
   $("#agenda").hide();
   $("#contactar").hide();
   $("#mapa").hide();
   $("#pano").hide();
   if (mydiv!=null) mydiv.show();



};

$("nav").find("li").on("click", "a", function () {
    
    if($('.navbar-toggler').css('display') !='none' && $('navbar-collapse collapse show')!=null)
    {
        event.preventDefault();
        $(".navbar-toggler").trigger( "click" );
    }
    
});

showdiv($("#home"));


$("#btninshead").click(function()
{
    showdiv($("#inscripciones"));
});

$("#nvhome").click(function()
{
    showdiv($("#home"));
});

$("#nvmap").click(function ()
{
    if (map==null)
        initMap();
    $('#contenedor').hide();
    $("#mapa").show();
    $("#pano").show();

    
});


$("#nvhome2").click(function()
{
    showdiv($("#home"));
});
$("#nvins").click(function()
{
    showdiv($("#inscripciones"));
});


$("#nvagenda").click(function()
{
    showdiv($("#agenda"));
});

$("#nvcontactar").click(function()
{
    showdiv($("#contactar"));
});


$("#buscarins").click(function()
{
    showdiv($("#inscritos"));
});
$("#conins2").click(function()
{
    showdiv($("#inscritos"));
});

$("#conins").click(function()
{
    showdiv($("#inscritos"));
});



       // action goes here!!
}); 