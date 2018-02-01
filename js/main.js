
(function ($) {
    "use strict";


    /*==================================================================
    [ Validate ]*/
    var inputscontact = $('#contactform .validate-input .input100');
    var inputsinscripcion= $('#inscripcionform .validate-input .input100');


//funcion para convertir un formulario en un objeto json.
function toJSONString( form ) {
    var obj = {};
    var elements = form.querySelectorAll( "input, select, textarea" );
    for( var i = 0; i < elements.length; ++i ) {
        var element = elements[i];
        var name = element.name;
        var value = element.value; 
        if( name ) {
            obj[ name ] = value;
        }
    }

    return JSON.stringify( obj );
}

//funcion para mostrar un msg al usuario
function showMessage()
{

}
 
    //Valida si el nombre del equipo es correcto
    $('#equipo').focusout(function(e)
    {
        
        if ( this.value!=null)
        {
            
            

            var urlAjax =  "http://127.0.0.1:8080/edsa-ajedrez/api.php/inscripciones?filter=equipo,eq," + encodeURI(this.value) ;
            
            $.ajax({
            type: "GET",
            url: urlAjax,
            beforeSend: function() { hideValidate($('#equipo')); },
            complete: function() { console.log('completed'); },
            success: function(data) { if (data!=null && data.inscripciones.records.length>0)   { showValidate($('#equipo'));} },
            error: function(data) {showValidate($('#equipo')); },
            dataType: 'json'
            });
        }
    });


    //Submit de la inscripcion
    $('#inscripcionform').on('submit',function(e){
        
        e.preventDefault();

        if  (validateform(inputsinscripcion))
        {
            debugger; 
            //Si pasa las validaciones llamada al servicio
            var urlAjax =  "http://127.0.0.1:8080/edsa-ajedrez/api.php/inscripciones" ;
            var inscriptionData=JSON.parse(toJSONString(this));
            Object.assign(inscriptionData,  {"createdate":"1980-02-12","deletedflag":0,"updatedate":"2017-12-12"});
            
            
            
             //crear nuevos registro via ajax
            $.ajax({
            type: "POST",
            url: urlAjax,
            data: JSON.stringify(inscriptionData),
            /*beforeSend: function() { alert( "Loading..."); },
            complete: function() { 
                console.log('completed inserted'); 
            },*/
            success: function(data) { 
                if ( data!=null)
                {
                    $("#inscripcionform").trigger('reset');  
                    $("#equipo").focus();
                    showMessage();

                }
                else
                    showMessage();
            },
            error: function(data) {alert("ajax error"); },
            dataType: 'json'
            });
         
            //Put message ...
            showMessage();

            
             
            //consultar inscripcion
         
            //var trackingJSON = JSON.stringify(tracking_data);
            /*
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
            
            */
        }
        return false;
  });



    $('#contactform').on('submit',function(e){

            e.preventDefault();

          if (validateform(inputscontact))
          {
            var urlAjax =  "http://127.0.0.1:8080/edsa-ajedrez/mail.php" ;
            var messageData=JSON.parse(toJSONString(this));
            //Llamamos api rest. 

            //Si ok

            //Clear form
            $("#contactform").trigger('reset');
            $("#first-name").focus();            
            //Showmessage al usuario
            showMessage();

          } 

          return false;
    });


    inputscontact.each(function(){
        $(this).focus(function(){

           hideValidate(this);
        });
    });


    inputsinscripcion.each(function(){
        $(this).focus(function(){

           hideValidate(this);
        });
    });


    function validateform(inputs)
    {
        var check = true;
        for(var i=0; i<inputs.length; i++) {
            if(validate(inputs[i]) == false){
                showValidate(inputs[i]);
                check=false;
            }
        }

        return check;
    }




    function validate (input) {

        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else if ($(input).attr('name').startsWith('edad'))
        {
            var edadvalue=parseInt($(input).val().trim());
            if (isNaN(edadvalue) || !isFinite(edadvalue) || edadvalue<=5 || edadvalue>16)
                return false;
            else
                return true;
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    


})(jQuery);