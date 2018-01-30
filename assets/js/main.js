
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




showdiv= function(mydiv) {

   $("#home").hide(); 
   $("#inscripciones").hide();
   $("#agenda").hide();
   $("#contactar").hide();

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

$("#conins").click(function()
{
    alert("funcionalidad no implementada");
});

$("#btninshead").click(function()
{
    showdiv($("#inscripciones"));
});

$("#nvhome").click(function()
{
    showdiv($("#home"));
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


$("#btnSubmit").click(function(){

var urlAjax =  "http://localhost/ajedrez/api.php/inscripciones" ;

   var perruzo= {"equipo":"xLOS PERdRUZ3O3S","email":"gabrieltame@yahoo.es","jugador":"jugador1","edad":1,"jugador2":"jugador1","edad2":2,"jugador3":"jugador1","edad3":2,"jugador4":1,"edad4":2,"createdate":"1980-02-12","deletedflag":0,"updatedate":"2017-12-12"};
    //crear nuevos registro
$.ajax({
   type: "POST",
   url: urlAjax,
   data: JSON.stringify(perruzo),
   beforeSend: function() { alert( "Loading..."); },
   complete: function() { console.log('completed inserted'); },
   success: function(data) { alert("ajax worked" + data); },
   error: function(data) {alert("ajax error"); },
   dataType: 'json'
   });


    //consultar inscripcion

   //var trackingJSON = JSON.stringify(tracking_data);
   
   urlAjax =  "http://localhost/ajedrez/api.php/inscripciones/1" ;

   $.ajax({
   type: "GET",
   url: urlAjax,
   beforeSend: function() { alert( "Loading..."); },
   complete: function() { console.log('completed'); },
   success: function(data) { console.log(JSON.stringify(data)); alert("ajax worked" + data ); },
   error: function(data) {alert("ajax error"); },
   dataType: 'json'
   });
});
       // action goes here!!
}); 