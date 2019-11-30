const accordion_head = 
'<div class="accordion" id="accordionExample">';
const accordion_body = 
    '<div style="height:40px">'+
        '<div class="w-100 h-100 bg-low-gray hov-bg-mid-lig-white-gray" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">'+
            '<div class="pt-1 px-4 font-size-21px-2c">'+
                '<p class="font-signika color-light-dark-gray mp-0 d-inline-block">';
const accordion_footer = 
                '</p>'+
                '<i class="fas fa-angle-down float-right mt-2"></i>'+
            '</div>'+
        '</div>'+
    '</div>'+
'</div>';

const collapse_zone = 
'<div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample" mrp-index="collapseMrpIndex">'+
    '<div class="bg-semi-white border table-responsive pb-5">'+  
        '<table class="table table-bordered">'+
            '<tbody>'+
                '<tr orange="true">'+
                    '<td title="true">Cantidad</td>'+
                    '<td></td>'+
                    '<td title="true">Tamaño Optimo Q*</td>'+
                    '<td></td>'+
                    '<td title="true">Tiempo de anticipación</td>'+
                    '<td></td>'+
                    '<td title="true">Deficit</td>'+
                    '<td></td>'+
                '</tr>'+
            '</tbody>'+
        '</table>'+
        '<table class="table table-bordered" mrp="true">'+
            '<tbody>'+
                '<tr blue="true">'+
                '</tr>'+
                '<tr white="true">'+
                    '<td>Demanda</td>'+
                '</tr>'+        
                '<tr>'+
                    '<td>Requerimiento Bruto</td>'+                          
                '</tr>'+
                '<tr>'+
                    '<td>Recepciones Programadas</td>'+                          
                '</tr>'+
                '<tr>'+
                    '<td>Inventario</td>'+                    
                '</tr>'+
                '<tr>'+
                    '<td>Stock de Seguridad</td>'+
                '</tr>'+
                '<tr>'+
                    '<td>Requerimiento Neto</td>'+
                '</tr>'+
                '<tr>'+
                    '<td>Plan Recibir Ordenes</td>'+                           
                '</tr>'+
                '<tr>'+
                    '<td>Plan Colocar Ordenes</td>'+                       
                '</tr>'+
                '<tr>'+
                    '<td>Costo Ord. Producto</td>'+
                '</tr>'+
                '<tr>'+
                    '<td>Costo m/to inv</td>'+
                '</tr>'+
                '<tr>'+
                    '<td>Costo de la compra</td>'+
                '</tr>'+
                '<tr>'+
                    '<td>Costo total</td>'+
                '</tr>'+
            '</tbody>'+
        '</table>'+
        '<br/><br/>'+
        '<div class="center">'+
            '<table class="table table-bordered" mrp-average="true">'+
                '<thead>'+
                    '<tr>'+
                        '<th>COSTO PROMEDIO UNITARIO</th>'+
                        '<th>VALOR</th>'+
                    '</tr>'+
                '</thead>'+
                '<tbody>'+
                    '<tr>'+
                        '<td>Unitario por compra</td>'+
                        '<td>$1000</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td>Unitario por mantenimiento</td>'+
                        '<td>$1000</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td>Unitario por setup</td>'+
                        '<td>$1000</td>'+
                    '</tr>'+    
                    '<tr>'+
                        '<td>Total Promedio por unidad</td>'+
                        '<td>$1000</td>'+
                    '</tr>'+                                                          
                '</tbody>'+
            '</table>'+            
        '</div>'+
        '<div class="center">'+
            '<a href="/mrp/download" link-mrp="true" mrp-key="mrpnone" mrp-name="mrpname" class="btn btn-success">Descargar Mrp del item</a>'+
        '</div>'+
    '</div>'+
'</div>';







const collapse_zone_eng = 
'<div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample" mrp-index="collapseMrpIndex">'+
    '<div class="bg-semi-white border table-responsive pb-5">'+  
        '<table class="table table-bordered">'+
            '<tbody>'+
                '<tr orange="true">'+
                    '<td title="true">Amount</td>'+
                    '<td></td>'+
                    '<td title="true">Optimal Size Q*</td>'+
                    '<td></td>'+
                    '<td title="true">Anticipation time</td>'+
                    '<td></td>'+
                    '<td title="true">Deficit</td>'+
                    '<td></td>'+
                '</tr>'+
            '</tbody>'+
        '</table>'+
        '<table class="table table-bordered" mrp="true">'+
            '<tbody>'+
                '<tr blue="true">'+
                '</tr>'+
                '<tr white="true">'+
                    '<td>Demand</td>'+
                '</tr>'+        
                '<tr>'+
                    '<td>Gross Requirement</td>'+                          
                '</tr>'+
                '<tr>'+
                    '<td>Scheduled Receptions</td>'+                          
                '</tr>'+
                '<tr>'+
                    '<td>Inventory</td>'+                    
                '</tr>'+
                '<tr>'+
                    '<td>Security stock</td>'+
                '</tr>'+
                '<tr>'+
                    '<td>Net Requirement</td>'+
                '</tr>'+
                '<tr>'+
                    '<td>Receive Orders Plan</td>'+                           
                '</tr>'+
                '<tr>'+
                    '<td>Place Orders Plan</td>'+                       
                '</tr>'+
                '<tr>'+
                    '<td>Ord. Cost Product</td>'+
                '</tr>'+
                '<tr>'+
                    '<td>Cost m/to inv</td>'+
                '</tr>'+
                '<tr>'+
                    '<td>Purchase cost</td>'+
                '</tr>'+
                '<tr>'+
                    '<td>Total cost</td>'+
                '</tr>'+
            '</tbody>'+
        '</table>'+
        '<br/><br/>'+
        '<div class="center">'+
            '<table class="table table-bordered" mrp-average="true">'+
                '<thead>'+
                    '<tr>'+
                        '<th>AVERAGE UNIT COST</th>'+
                        '<th>VALUE</th>'+
                    '</tr>'+
                '</thead>'+
                '<tbody>'+
                    '<tr>'+
                        '<td>Unitary per purchase</td>'+
                        '<td>$1000</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td>Unitary for maintenance</td>'+
                        '<td>$1000</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td>Unitary by setup</td>'+
                        '<td>$1000</td>'+
                    '</tr>'+    
                    '<tr>'+
                        '<td>Total Average per unit</td>'+
                        '<td>$1000</td>'+
                    '</tr>'+                                                          
                '</tbody>'+
            '</table>'+            
        '</div>'+
        '<div class="center">'+
            '<a href="/mrp/download" link-mrp="true" mrp-key="mrpnone" mrp-name="mrpname" class="btn btn-success">Download item Mrp</a>'+
        '</div>'+
    '</div>'+
'</div>';