
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

$("#nvmap").click(function ()
{
    showdiv($("#mapa"));
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



       // action goes here!!
}); 