from django.http import HttpResponse
import xlrd
import xlwt

def instanciate_excel_response(filename):
    response = HttpResponse(content_type='application/ms-excel')
    response['Content-Disposition'] = 'attachment; filename=' + filename
    wb = xlwt.Workbook(encoding='utf-8')
    ws = wb.add_sheet("sheet1",cell_overwrite_ok=True)
    font_style = xlwt.XFStyle()

    return (response, ws, wb, font_style)



def build_excel_book_mrp_unique(all_info_mrp_keys, key, name, response, ws, wb, font_style):
    ws = build_excel_book_mrp_item(0, {"title": name}, all_info_mrp_keys[key], ws, font_style)
    wb.save(response)

    return response

def build_excel_book_mrp_complete(all_info_mrp_keys, mrp, periods, response, ws, wb, font_style):
    plan_master_production = []
    plan_master_compr = []
    plan_master_costs = []
    plan_periods = [i for i in range(1, periods + 1)]

    producto = mrp["producto"]
    mrp_table = all_info_mrp_keys[producto["key"]]
    ws = build_excel_book_mrp_item(0, producto, mrp_table, ws, font_style)
    plan_master_production.append((producto["title"], mrp_table["pla_col_ord"][-1*periods:]))
    plan_master_costs.append((producto["title"], mrp_table["total_uni_ave"], mrp_table["pla_col_ord"][-1*periods:]))

    counter = 1
    rows_count = 16
    for componente in mrp["componentes"]:
        mrp_table = all_info_mrp_keys[componente["key"]]
        ws = build_excel_book_mrp_item(counter*16 + 4, componente, mrp_table, ws, font_style)
        plan_master_production.append( (componente["title"], mrp_table["pla_col_ord"][-1*periods:]) )
        plan_master_costs.append( (componente["title"], mrp_table["total_uni_ave"], mrp_table["pla_col_ord"][-1*periods:]) )
        counter += 1
        rows_count += 16

    for materia in mrp["materia"]:
        mrp_table = all_info_mrp_keys[materia["key"]]
        ws = build_excel_book_mrp_item(counter*16 + 4, materia, mrp_table, ws, font_style)
        plan_master_compr.append( (materia["title"], mrp_table["pla_col_ord"][-1*periods:]) )
        plan_master_costs.append( (materia["title"], mrp_table["total_uni_ave"], mrp_table["pla_col_ord"][-1*periods:]) )
        counter += 1
        rows_count += 16

    # Planes Maestros de decisión
    write_simple_row(rows_count, 0, "Plan maestro de compras", ws, font_style)
    rows_count += 1
    write_row_with_label_extended(rows_count, 0, "Periodos: ", plan_periods, "Total", ws, font_style)
    rows_count += 1
    for name, plan_comp in plan_master_compr:
        write_row_with_label_extended(rows_count, 0, name, plan_comp, sum(plan_comp), ws, font_style)
        rows_count += 1

    rows_count += 3
    write_simple_row(rows_count, 0, "Plan maestro de produccion", ws, font_style)
    rows_count += 1    
    write_row_with_label_extended(rows_count, 0, "Periodos: ", plan_periods, "Total", ws, font_style)
    rows_count += 1
    for name,plan_pro in plan_master_production:
        write_row_with_label_extended(rows_count, 0, name, plan_pro, sum(plan_pro), ws, font_style)
        rows_count += 1

    
    rows_count += 3
    write_simple_row(rows_count, 0, "Plan maestro de costos", ws, font_style)
    rows_count += 1
    write_row_with_label_extended(rows_count, 0, "Periodos: ", plan_periods, "Total", ws, font_style)
    rows_count += 1
    for name, plan_master_costs, plan_col_ord in plan_master_costs:
        new_data = [plan_master_costs*data for data in plan_col_ord]
        write_row_with_label_extended(rows_count, 0, name, new_data, sum(new_data), ws, font_style)
        rows_count += 1


    wb.save(response)

    return response

def build_excel_book_mrp_item(row, objeto, mrp_table, ws, font_style):
    ##  HEADER
    write_row_with_two_columns(row, 0, "Nombre:", objeto["title"], ws, font_style)
    write_row_with_two_columns(row, 2, "Cantidad:", mrp_table["amount"], ws, font_style)
    write_row_with_two_columns(row, 4, "Q*:", mrp_table["Q"], ws, font_style)
    write_row_with_two_columns(row, 6, "Lead time:", mrp_table["lead"], ws, font_style)
    write_row_with_two_columns(row, 8, "Deficit:", mrp_table["deficit"], ws, font_style)

    ## BODY
    write_row_with_label(row+1, 0, "Periodo:", mrp_table["labels"][1:], ws, font_style)
    write_row_with_label(row+2, 0, "Requerimiento Bruto:", mrp_table["req_brut"], ws, font_style)
    write_row_with_label_extended(row+3, 0, "Recepciones Programadas:", mrp_table["recep_prog"], "Totales", ws, font_style)
    write_row_with_label_extended(row+4, 0, "Inventario:", mrp_table["invent"], mrp_table["total_invent"], ws, font_style)
    write_row_with_label_extended(row+5, 0, "Stock de seguridad:", mrp_table["stock"], mrp_table["total_stock"], ws, font_style)
    write_row_with_label(row+6, 0, "Requerimiento neto:", mrp_table["req_net"], ws, font_style)
    write_row_with_label(row+7, 0, "Plan Recibir Ordenes:", mrp_table["pla_rec_ord"], ws, font_style)
    write_row_with_label_extended(row+8, 0, "Plan Colocar Ordenes:", mrp_table["pla_col_ord"], mrp_table["total_pla_col_ord"], ws, font_style)

    write_row_with_label_extended(row+9, 0, "Costo Ord. Producto:", mrp_table["cost_ord_prod"], mrp_table["total_cost_ord_prod"], ws, font_style)
    write_row_with_label_extended(row+10, 0, "Costo m/to inv:", mrp_table["cost_m_inv"], mrp_table["total_cost_m_inv"], ws, font_style)
    write_row_with_label_extended(row+11, 0, "Costo de Compra:", mrp_table["cost_compr"], mrp_table["total_cost_compr"], ws, font_style)
    write_row_with_label_extended(row+12, 0, "Costo Total:", mrp_table["cost_total"], mrp_table["total_cost_total"], ws, font_style)

    # Promedios
    write_row_with_two_columns(row+8, len(mrp_table["pla_col_ord"])+4, "Costo Promedio Unitario:", "Valor", ws, font_style)
    write_row_with_two_columns(row+9, len(mrp_table["pla_col_ord"])+4, "Unitario por Compra:", mrp_table["uni_per_compr"], ws, font_style)
    write_row_with_two_columns(row+10, len(mrp_table["pla_col_ord"])+4, "Unitario por Mantenimiento:", mrp_table["uni_per_mant"], ws, font_style)
    write_row_with_two_columns(row+11, len(mrp_table["pla_col_ord"])+4, "Unitario por Setup:", mrp_table["uni_per_setup"], ws, font_style)
    write_row_with_two_columns(row+12, len(mrp_table["pla_col_ord"])+4, "Total Promedio Unitario:", mrp_table["total_uni_ave"], ws, font_style)

    return ws




## FUNCTIONS 
def write_simple_row(row, column, data, ws, font_style):
    ws.write(row, column, data, font_style)

def write_row_with_two_columns(row, column, label, value, ws, font_style):
    ws.write(row, column, label, font_style)
    ws.write(row, column+1, value, font_style)

def write_row_with_label(row, column, label, data, ws, font_style):
    ws.write(row, column, label, font_style)
    write_row(row, column+1, data, ws, font_style)

def write_row_with_label_extended(row, column, label, data, remaining, ws, font_style):
    ws.write(row, column, label, font_style)
    write_row(row, column+1, data, ws, font_style)
    ws.write(row, column + 1 + len(data), remaining, font_style)

def write_row(row, column, data, ws, font_style):
    for item in data:
        ws.write(row, column, item, font_style)
        column += 1