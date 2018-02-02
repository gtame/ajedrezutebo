function Table() {
    //sets attributes
    this.header = [];
    this.data = [[]];
    this.class =[];
    this.tableClass = ''
}

Table.prototype.setHeader = function(keys) {
    //sets header data
    this.header = keys;
    return this;
}

Table.prototype.setData = function(data) {
    //sets the main data
    this.data = data;
    return this;
}

Table.prototype.setClass = function(data) {
    //sets the main data
    this.class = data;
    return this;
}


Table.prototype.setTableClass = function(tableClass) {
    //sets the table class name
    this.tableClass = tableClass;
    return this;
}


Table.prototype.clean = function(container) {

    container = container || '.table-container';
    $(container).empty();
}

Table.prototype.build = function(container) {

    //default selector
    container = container || '.table-container';
 
    //creates table
    var table = $('<table></table>').addClass(this.tableClass);

    var tr = $('<tr></tr>'); //creates row
    var th = $('<th></th>'); //creates table header cells
    var td = $('<td></td>'); //creates table cells

    var header = tr.clone(); //creates header row

    
    //fills header row
    this.header.forEach(function(d) {
        header.append(th.clone().text(d));

    });
 
    //attaches header row
    table.append($('<thead></thead>').append(header));
    
    //creates 
    var tbody = $('<tbody></tbody>');

    var value=this.class;
    //fills out the table body
    this.data.forEach(function(d,n,value) {
        var row = tr.clone(); //creates a row
        d.forEach(function(e,j) {
            row.append(td.clone().width(value[n]).html(e)); //fills in the row
        });
        tbody.append(row); //puts row on the tbody
    });
 
    $(container).append(table.append(tbody)); //puts entire table in the container

    return this;
}

//sample data
var data = {
    k: ['Equipo', 'Jugadores'],
    j: ['33%','66%'],
    v: []
};

//creates new table object
var table = new Table();
    
//sets table data and builds it



function formatUl (val, num)
{
    return '<li><span class="fa-li"><i class="fas fa-user"></i></span>'+val+'(' + num + ')</li>'
}

$("#buscarins").click(function()
{

    
    //consultar inscripcion
    var value=$( "#txtbuscar" ).val();

    //var trackingJSON = JSON.stringify(tracking_data);
    var urlAjax =  "http://127.0.0.1:8080/edsa-ajedrez/api.php/inscripciones?filter[]=equipo,cs," + encodeURI(value) + 
    "&filter[]=jugador1,cs,"+ encodeURI(value) +
    "&filter[]=jugador2,cs,"+ encodeURI(value) +
    "&filter[]=jugador3,cs,"+ encodeURI(value) +
    "&filter[]=jugador4,cs,"+ encodeURI(value) +
    "&satisfy=any" ;
          
    console.log(urlAjax);
    $.ajax({
    type: "GET",
    url: urlAjax,
    beforeSend: function() { table.clean(); },
    complete: function() { console.log('completed'); },
    success: function(result) { console.log(JSON.stringify(result));
        data.v= [];
        if (result!=null && result.inscripciones.records.length>0)
        {
             result.inscripciones.records.forEach(function(ins)
             {
                //Filas de la tabla
                data.v.push(
                [ 
                    '<i class="fas fa-chess-rook fa-2x"></i>'+ins[1],
                    '<ul class="fa-ul">'+
                    formatUl(ins[3],ins[4]) +
                    formatUl(ins[5],ins[6]) +
                    formatUl(ins[7],ins[8]) +
                    formatUl(ins[9],ins[10]) +
                    '</ul>'
                ]);
              });
            
            
        }

        table.clean();
        table
        .setHeader(data.k)
        .setClass (data.j)
        .setData(data.v)
        //.setTableClass('sean')
        .build();
    
    },
    error: function(data) {alert("ajax error"); },
    dataType: 'json'
    });



});