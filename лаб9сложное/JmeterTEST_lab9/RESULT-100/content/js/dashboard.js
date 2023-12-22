/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 64.47579352356524, "KoPercent": 35.524206476434756};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.543704638687283, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.975, 500, 1500, "http://samara.elsmoke.ru/all-products?keyword=%D0%BD%D0%B0%D0%B1%D0%BE%D1%80"], "isController": false}, {"data": [0.9807692307692307, 500, 1500, "http://samara.elsmoke.ru/ajax/cart_ajax.php?coupon_code=&action=update_citem&variant_id=1719&amount=2"], "isController": false}, {"data": [0.9615384615384616, 500, 1500, "http://samara.elsmoke.ru/ajax/cart_ajax.php?coupon_code=&action=update_citem&variant_id=1719&amount=1"], "isController": false}, {"data": [0.0, 500, 1500, "http://samara.elsmoke.ru/service.php?isdek_action=getPVZ&country=%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F&lang=rus&mode=all"], "isController": false}, {"data": [0.275, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1%D0%BE"], "isController": false}, {"data": [0.3975, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=y"], "isController": false}, {"data": [0.995, 500, 1500, "http://samara.elsmoke.ru/all-products?keyword=%D0%BD%D0%B0%D0%B1%D0%BE%D1%80&ajax=1&p%5Bmin%5D=0&p%5Bmax%5D=7486"], "isController": false}, {"data": [0.72, 500, 1500, "http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo/sort-price"], "isController": false}, {"data": [0.36, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2Cj"], "isController": false}, {"data": [0.46, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/cart.php?variant=1632&amount=1"], "isController": false}, {"data": [0.275, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [0.9, 500, 1500, "http://samara.elsmoke.ru/catalog/napitki"], "isController": false}, {"data": [0.17, 500, 1500, "http://samara.elsmoke.ru/contact"], "isController": false}, {"data": [0.8076923076923077, 500, 1500, "http://samara.elsmoke.ru/service.php?isdek_action=getCity&city=%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3"], "isController": false}, {"data": [0.475, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD"], "isController": false}, {"data": [0.375, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=yf"], "isController": false}, {"data": [0.6634615384615384, 500, 1500, "http://samara.elsmoke.ru/service.php?isdek_action=calc&shipment%5Btype%5D=courier&shipment%5Bgoods%5D%5B0%5D%5Blength%5D=20&shipment%5Bgoods%5D%5B0%5D%5Bwidth%5D=30&shipment%5Bgoods%5D%5B0%5D%5Bheight%5D=40&shipment%5Bgoods%5D%5B0%5D%5Bweight%5D=1&shipment%5BcityFromId%5D=137&shipment%5BcityToId%5D=430&shipment%5Bcurrency%5D=RUB&shipment%5Btimestamp%5D=1703271277873"], "isController": false}, {"data": [0.4768211920529801, 500, 1500, "http://samara.elsmoke.ru/cart"], "isController": false}, {"data": [0.425, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2Cjh"], "isController": false}, {"data": [0.995, 500, 1500, "http://samara.elsmoke.ru/products/startovyj-nabor-smoant-vikii-pro-700-mah"], "isController": false}, {"data": [0.8942307692307693, 500, 1500, "http://samara.elsmoke.ru/ajax/cart_ajax.php?coupon_code=&action=remove_citem&variant_id=1719"], "isController": false}, {"data": [0.335, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1%D0%BE%D1%80"], "isController": false}, {"data": [0.7019230769230769, 500, 1500, "http://samara.elsmoke.ru/service.php?isdek_action=calc&shipment%5Btype%5D=pickup&shipment%5Bgoods%5D%5B0%5D%5Blength%5D=20&shipment%5Bgoods%5D%5B0%5D%5Bwidth%5D=30&shipment%5Bgoods%5D%5B0%5D%5Bheight%5D=40&shipment%5Bgoods%5D%5B0%5D%5Bweight%5D=1&shipment%5BcityFromId%5D=137&shipment%5BcityToId%5D=430&shipment%5Bcurrency%5D=RUB&shipment%5Btimestamp%5D=1703271277873"], "isController": false}, {"data": [0.925, 500, 1500, "http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo"], "isController": false}, {"data": [0.4725, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2C"], "isController": false}, {"data": [0.115, 500, 1500, "http://samara.elsmoke.ru/oplata"], "isController": false}, {"data": [0.455, 500, 1500, "http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo/brand-ijoy/sort-price"], "isController": false}, {"data": [0.8942307692307693, 500, 1500, "http://samara.elsmoke.ru/service.php?isdek_action=getLang&lang=rus"], "isController": false}, {"data": [0.46, 500, 1500, "http://samara.elsmoke.ru/ajax/cart.php?variant=1719&amount=1"], "isController": false}, {"data": [0.9117647058823529, 500, 1500, "http://samara.elsmoke.ru/cart-1"], "isController": false}, {"data": [0.5098039215686274, 500, 1500, "http://samara.elsmoke.ru/cart-0"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 3119, 1108, 35.524206476434756, 2903.1554985572297, 37, 120191, 130.0, 712.0, 3221.0, 118172.60000000162, 5.615691527669749, 1241.5040760997995, 2.4627587962362805], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["http://samara.elsmoke.ru/all-products?keyword=%D0%BD%D0%B0%D0%B1%D0%BE%D1%80", 100, 0, 0.0, 368.31, 269, 1099, 336.0, 424.30000000000007, 508.44999999999965, 1098.1699999999996, 3.1362709738121373, 288.1749720675866, 1.5099429590716638], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/cart_ajax.php?coupon_code=&action=update_citem&variant_id=1719&amount=2", 52, 0, 0.0, 295.2884615384616, 135, 1254, 244.0, 454.90000000000003, 724.3499999999959, 1254.0, 0.4293085655314757, 9.11280959752322, 0.19117647058823528], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/cart_ajax.php?coupon_code=&action=update_citem&variant_id=1719&amount=1", 52, 0, 0.0, 222.53846153846152, 76, 2032, 149.0, 265.30000000000007, 820.7499999999918, 2032.0, 0.42913496294584647, 9.109060111905194, 0.19109916318682224], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=getPVZ&country=%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F&lang=rus&mode=all", 52, 2, 3.8461538461538463, 79385.38461538462, 15806, 111059, 91113.0, 104858.5, 106437.15, 111059.0, 0.3784377797346569, 4482.2921423672005, 0.1684377888317189], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1%D0%BE", 100, 72, 72.0, 81.99999999999999, 40, 668, 57.0, 136.9, 160.69999999999993, 664.169999999998, 6.578081831337982, 9.452652200368373, 2.498900226943823], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=y", 200, 120, 60.0, 94.76000000000003, 38, 993, 59.0, 158.0, 238.84999999999974, 373.96000000000004, 12.303906490310673, 27.888053675792065, 4.39768532759151], "isController": false}, {"data": ["http://samara.elsmoke.ru/all-products?keyword=%D0%BD%D0%B0%D0%B1%D0%BE%D1%80&ajax=1&p%5Bmin%5D=0&p%5Bmax%5D=7486", 100, 0, 0.0, 226.03, 174, 1434, 203.0, 255.8, 313.39999999999964, 1424.5099999999952, 3.152187618207036, 170.05849031884378, 1.3667688500819568], "isController": false}, {"data": ["http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo/sort-price", 100, 23, 23.0, 310.02999999999986, 45, 1226, 271.5, 742.8000000000009, 965.8999999999997, 1225.0299999999995, 6.645843025187745, 498.6793334011763, 3.13470916129461], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2Cj", 200, 126, 63.0, 92.17000000000002, 39, 949, 57.0, 123.9, 209.8499999999995, 918.3500000000015, 12.64862130027827, 6.142116153870479, 4.582654787503162], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1", 100, 54, 54.0, 122.56000000000003, 42, 435, 65.5, 305.10000000000014, 349.0499999999998, 434.7999999999999, 6.548359635911204, 12.97905343461463, 2.449239981009757], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/cart.php?variant=1632&amount=1", 100, 0, 0.0, 71.71999999999996, 55, 140, 69.0, 86.70000000000002, 92.0, 139.93999999999997, 2.8583678719451195, 1.6244126947263113, 1.1584205731027584], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0", 100, 72, 72.0, 82.49999999999999, 42, 857, 56.5, 122.9, 158.99999999999977, 851.4599999999972, 6.524008350730689, 12.296991208898747, 2.401905418188935], "isController": false}, {"data": ["Test", 50, 47, 94.0, 170395.72, 27584, 418332, 109322.0, 355191.4, 416723.75, 418332.0, 0.11905924149738427, 1504.4239856227036, 1.8866983145973772], "isController": true}, {"data": ["http://samara.elsmoke.ru/catalog/napitki", 50, 0, 0.0, 408.88000000000005, 185, 3216, 232.0, 632.9, 1752.199999999997, 3216.0, 0.11311782126026827, 6.167616644269338, 0.05302397871575075], "isController": false}, {"data": ["http://samara.elsmoke.ru/contact", 100, 71, 71.0, 530.0199999999998, 44, 3501, 63.5, 1628.7000000000007, 2578.199999999997, 3500.2699999999995, 11.341726210729272, 389.6946240217761, 4.973081121696723], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=getCity&city=%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3", 52, 8, 15.384615384615385, 18752.01923076923, 159, 120118, 265.0, 120020.0, 120046.25, 120118.0, 0.21934542264066578, 0.11000225672694448, 0.10774487069165518], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD", 100, 39, 39.0, 271.40000000000003, 40, 774, 142.0, 722.7, 743.75, 773.81, 6.491398896462187, 15.019093841285297, 2.351864248620578], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=yf", 200, 125, 62.5, 77.27500000000002, 39, 314, 58.5, 115.80000000000001, 161.69999999999993, 253.76000000000022, 12.416961569503943, 6.008402790712113, 4.450219625007761], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=calc&shipment%5Btype%5D=courier&shipment%5Bgoods%5D%5B0%5D%5Blength%5D=20&shipment%5Bgoods%5D%5B0%5D%5Bwidth%5D=30&shipment%5Bgoods%5D%5B0%5D%5Bheight%5D=40&shipment%5Bgoods%5D%5B0%5D%5Bweight%5D=1&shipment%5BcityFromId%5D=137&shipment%5BcityToId%5D=430&shipment%5Bcurrency%5D=RUB&shipment%5Btimestamp%5D=1703271277873", 52, 16, 30.76923076923077, 37208.63461538461, 221, 120177, 396.5, 120078.3, 120123.1, 120177.0, 0.14623418842837618, 0.09849276843816263, 0.10324933421261326], "isController": false}, {"data": ["http://samara.elsmoke.ru/cart", 151, 30, 19.867549668874172, 689.2516556291391, 117, 4233, 561.0, 1357.8000000000027, 2117.8, 3892.3999999999933, 0.307199036493618, 21.045301542683372, 0.23037146288791507], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2Cjh", 100, 57, 57.0, 90.57000000000002, 41, 916, 58.5, 142.30000000000004, 207.5499999999999, 909.5599999999968, 6.382842918235783, 2.999312847067084, 2.318767153890343], "isController": false}, {"data": ["http://samara.elsmoke.ru/products/startovyj-nabor-smoant-vikii-pro-700-mah", 100, 0, 0.0, 246.36000000000004, 134, 538, 235.0, 319.00000000000006, 386.84999999999997, 537.1999999999996, 2.8534741047225, 201.70481144778142, 1.3682185404479954], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/cart_ajax.php?coupon_code=&action=remove_citem&variant_id=1719", 52, 5, 9.615384615384615, 190.40384615384616, 47, 598, 169.5, 374.4, 421.9999999999998, 598.0, 0.1235298170095807, 2.0942674667003995, 0.05392366035476813], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1%D0%BE%D1%80", 100, 66, 66.0, 95.86, 37, 947, 57.5, 153.8, 276.7499999999995, 941.8699999999974, 6.605456106744171, 10.711159918092346, 2.54800308805073], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=calc&shipment%5Btype%5D=pickup&shipment%5Bgoods%5D%5B0%5D%5Blength%5D=20&shipment%5Bgoods%5D%5B0%5D%5Bwidth%5D=30&shipment%5Bgoods%5D%5B0%5D%5Bheight%5D=40&shipment%5Bgoods%5D%5B0%5D%5Bweight%5D=1&shipment%5BcityFromId%5D=137&shipment%5BcityToId%5D=430&shipment%5Bcurrency%5D=RUB&shipment%5Btimestamp%5D=1703271277873", 52, 11, 21.153846153846153, 20179.19230769231, 50, 120191, 274.5, 120022.6, 120068.05, 120191.0, 0.12353040392066499, 0.06370000433544205, 0.08709858557687511], "isController": false}, {"data": ["http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo", 100, 3, 3.0, 286.1600000000001, 62, 968, 246.0, 455.0000000000002, 655.4999999999999, 966.8699999999994, 7.012622720897616, 658.0244537824334, 3.2323807854137447], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2C", 200, 105, 52.5, 96.57500000000007, 39, 976, 64.0, 185.60000000000002, 240.0, 293.9000000000001, 12.535255405828893, 5.7277793011595115, 4.529340332184268], "isController": false}, {"data": ["http://samara.elsmoke.ru/oplata", 100, 0, 0.0, 3506.55, 217, 5878, 4238.0, 5331.0, 5402.6, 5873.929999999998, 16.68613382279326, 775.4077348051893, 6.078054605372935], "isController": false}, {"data": ["http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo/brand-ijoy/sort-price", 100, 50, 50.0, 209.87, 42, 1079, 157.5, 539.1, 918.2999999999985, 1077.8999999999994, 6.234413965087282, 184.96733020963217, 3.007617674563591], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=getLang&lang=rus", 52, 0, 0.0, 351.2307692307694, 149, 734, 310.5, 663.3000000000001, 700.3999999999999, 734.0, 0.42926958129705456, 1.1821681828688417, 0.17648681027935545], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/cart.php?variant=1719&amount=1", 100, 53, 53.0, 74.16999999999999, 38, 867, 60.0, 78.0, 82.94999999999999, 864.5099999999987, 6.282196255811032, 3.6287045326045986, 2.4049032541776607], "isController": false}, {"data": ["http://samara.elsmoke.ru/cart-1", 51, 0, 0.0, 260.21568627450984, 79, 2112, 98.0, 985.0000000000014, 1443.199999999999, 2112.0, 0.11548965348574948, 5.904262580163406, 0.06225614133216183], "isController": false}, {"data": ["http://samara.elsmoke.ru/cart-0", 51, 0, 0.0, 885.8627450980393, 446, 3432, 568.0, 2051.2000000000003, 2494.199999999999, 3432.0, 0.11529931476034698, 7.305700961194998, 0.09030278363066238], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["503/Service Unavailable", 1106, 99.81949458483754, 35.4600833600513], "isController": false}, {"data": ["Non HTTP response code: java.lang.IllegalArgumentException/Non HTTP response message: Self-suppression not permitted", 2, 0.18050541516245489, 0.06412311638345623], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 3119, 1108, "503/Service Unavailable", 1106, "Non HTTP response code: java.lang.IllegalArgumentException/Non HTTP response message: Self-suppression not permitted", 2, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=getPVZ&country=%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F&lang=rus&mode=all", 52, 2, "Non HTTP response code: java.lang.IllegalArgumentException/Non HTTP response message: Self-suppression not permitted", 2, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1%D0%BE", 100, 72, "503/Service Unavailable", 72, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=y", 200, 120, "503/Service Unavailable", 120, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo/sort-price", 100, 23, "503/Service Unavailable", 23, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2Cj", 200, 126, "503/Service Unavailable", 126, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1", 100, 54, "503/Service Unavailable", 54, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0", 100, 72, "503/Service Unavailable", 72, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://samara.elsmoke.ru/contact", 100, 71, "503/Service Unavailable", 71, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=getCity&city=%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3", 52, 8, "503/Service Unavailable", 8, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD", 100, 39, "503/Service Unavailable", 39, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=yf", 200, 125, "503/Service Unavailable", 125, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=calc&shipment%5Btype%5D=courier&shipment%5Bgoods%5D%5B0%5D%5Blength%5D=20&shipment%5Bgoods%5D%5B0%5D%5Bwidth%5D=30&shipment%5Bgoods%5D%5B0%5D%5Bheight%5D=40&shipment%5Bgoods%5D%5B0%5D%5Bweight%5D=1&shipment%5BcityFromId%5D=137&shipment%5BcityToId%5D=430&shipment%5Bcurrency%5D=RUB&shipment%5Btimestamp%5D=1703271277873", 52, 16, "503/Service Unavailable", 16, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/cart", 151, 30, "503/Service Unavailable", 30, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2Cjh", 100, 57, "503/Service Unavailable", 57, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/cart_ajax.php?coupon_code=&action=remove_citem&variant_id=1719", 52, 5, "503/Service Unavailable", 5, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1%D0%BE%D1%80", 100, 66, "503/Service Unavailable", 66, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=calc&shipment%5Btype%5D=pickup&shipment%5Bgoods%5D%5B0%5D%5Blength%5D=20&shipment%5Bgoods%5D%5B0%5D%5Bwidth%5D=30&shipment%5Bgoods%5D%5B0%5D%5Bheight%5D=40&shipment%5Bgoods%5D%5B0%5D%5Bweight%5D=1&shipment%5BcityFromId%5D=137&shipment%5BcityToId%5D=430&shipment%5Bcurrency%5D=RUB&shipment%5Btimestamp%5D=1703271277873", 52, 11, "503/Service Unavailable", 11, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo", 100, 3, "503/Service Unavailable", 3, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2C", 200, 105, "503/Service Unavailable", 105, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo/brand-ijoy/sort-price", 100, 50, "503/Service Unavailable", 50, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/cart.php?variant=1719&amount=1", 100, 53, "503/Service Unavailable", 53, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
