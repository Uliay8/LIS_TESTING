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

    var data = {"OkPercent": 31.26126126126126, "KoPercent": 68.73873873873873};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.25978070175438595, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.7633333333333333, 500, 1500, "http://samara.elsmoke.ru/all-products?keyword=%D0%BD%D0%B0%D0%B1%D0%BE%D1%80"], "isController": false}, {"data": [0.20166666666666666, 500, 1500, "http://samara.elsmoke.ru/ajax/cart_ajax.php?coupon_code=&action=update_citem&variant_id=1719&amount=2"], "isController": false}, {"data": [0.18333333333333332, 500, 1500, "http://samara.elsmoke.ru/ajax/cart_ajax.php?coupon_code=&action=update_citem&variant_id=1719&amount=1"], "isController": false}, {"data": [0.0, 500, 1500, "http://samara.elsmoke.ru/service.php?isdek_action=getPVZ&country=%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F&lang=rus&mode=all"], "isController": false}, {"data": [0.03, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1%D0%BE"], "isController": false}, {"data": [0.06833333333333333, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=y"], "isController": false}, {"data": [0.76, 500, 1500, "http://samara.elsmoke.ru/all-products?keyword=%D0%BD%D0%B0%D0%B1%D0%BE%D1%80&ajax=1&p%5Bmin%5D=0&p%5Bmax%5D=7486"], "isController": false}, {"data": [0.16333333333333333, 500, 1500, "http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo/sort-price"], "isController": false}, {"data": [0.09, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2Cj"], "isController": false}, {"data": [0.03, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1"], "isController": false}, {"data": [0.5133333333333333, 500, 1500, "http://samara.elsmoke.ru/ajax/cart.php?variant=1632&amount=1"], "isController": false}, {"data": [0.03666666666666667, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [0.985, 500, 1500, "http://samara.elsmoke.ru/catalog/napitki"], "isController": false}, {"data": [0.11166666666666666, 500, 1500, "http://samara.elsmoke.ru/contact"], "isController": false}, {"data": [0.18, 500, 1500, "http://samara.elsmoke.ru/service.php?isdek_action=getCity&city=%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3"], "isController": false}, {"data": [0.043333333333333335, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD"], "isController": false}, {"data": [0.06, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=yf"], "isController": false}, {"data": [0.19666666666666666, 500, 1500, "http://samara.elsmoke.ru/service.php?isdek_action=calc&shipment%5Btype%5D=courier&shipment%5Bgoods%5D%5B0%5D%5Blength%5D=20&shipment%5Bgoods%5D%5B0%5D%5Bwidth%5D=30&shipment%5Bgoods%5D%5B0%5D%5Bheight%5D=40&shipment%5Bgoods%5D%5B0%5D%5Bweight%5D=1&shipment%5BcityFromId%5D=137&shipment%5BcityToId%5D=430&shipment%5Bcurrency%5D=RUB&shipment%5Btimestamp%5D=1703271277873"], "isController": false}, {"data": [0.325, 500, 1500, "http://samara.elsmoke.ru/cart"], "isController": false}, {"data": [0.08666666666666667, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2Cjh"], "isController": false}, {"data": [0.5216666666666666, 500, 1500, "http://samara.elsmoke.ru/products/startovyj-nabor-smoant-vikii-pro-700-mah"], "isController": false}, {"data": [0.20333333333333334, 500, 1500, "http://samara.elsmoke.ru/ajax/cart_ajax.php?coupon_code=&action=remove_citem&variant_id=1719"], "isController": false}, {"data": [0.9983333333333333, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1%D0%BE%D1%80"], "isController": false}, {"data": [0.175, 500, 1500, "http://samara.elsmoke.ru/service.php?isdek_action=calc&shipment%5Btype%5D=pickup&shipment%5Bgoods%5D%5B0%5D%5Blength%5D=20&shipment%5Bgoods%5D%5B0%5D%5Bwidth%5D=30&shipment%5Bgoods%5D%5B0%5D%5Bheight%5D=40&shipment%5Bgoods%5D%5B0%5D%5Bweight%5D=1&shipment%5BcityFromId%5D=137&shipment%5BcityToId%5D=430&shipment%5Bcurrency%5D=RUB&shipment%5Btimestamp%5D=1703271277873"], "isController": false}, {"data": [0.375, 500, 1500, "http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo"], "isController": false}, {"data": [0.02666666666666667, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2C"], "isController": false}, {"data": [0.20333333333333334, 500, 1500, "http://samara.elsmoke.ru/oplata"], "isController": false}, {"data": [0.12, 500, 1500, "http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo/brand-ijoy/sort-price"], "isController": false}, {"data": [0.16666666666666666, 500, 1500, "http://samara.elsmoke.ru/service.php?isdek_action=getLang&lang=rus"], "isController": false}, {"data": [0.13666666666666666, 500, 1500, "http://samara.elsmoke.ru/ajax/cart.php?variant=1719&amount=1"], "isController": false}, {"data": [0.9716666666666667, 500, 1500, "http://samara.elsmoke.ru/cart-1"], "isController": false}, {"data": [0.575, 500, 1500, "http://samara.elsmoke.ru/cart-0"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 11100, 7630, 68.73873873873873, 507.09810810810916, 36, 63534, 89.0, 462.0, 724.9499999999989, 4527.939999999999, 57.41418906337285, 4831.368600629358, 25.5817278131013], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["http://samara.elsmoke.ru/all-products?keyword=%D0%BD%D0%B0%D0%B1%D0%BE%D1%80", 300, 54, 18.0, 347.84333333333325, 51, 1013, 342.0, 529.4000000000002, 671.8499999999999, 798.99, 8.517887563884157, 638.1839819349801, 4.100897040034072], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/cart_ajax.php?coupon_code=&action=update_citem&variant_id=1719&amount=2", 300, 238, 79.33333333333333, 167.02999999999994, 70, 1137, 151.5, 230.7000000000001, 297.34999999999985, 679.5100000000014, 4.392901071867862, 21.1016263343437, 1.9091816894731446], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/cart_ajax.php?coupon_code=&action=update_citem&variant_id=1719&amount=1", 300, 244, 81.33333333333333, 154.71666666666678, 69, 1156, 142.5, 191.90000000000003, 216.89999999999998, 619.5900000000013, 4.392065002562038, 19.353337054388405, 1.9088183286362637], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=getPVZ&country=%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F&lang=rus&mode=all", 300, 238, 79.33333333333333, 9922.439999999999, 69, 63534, 163.0, 51204.80000000004, 55771.549999999996, 59714.23, 3.5865432895775053, 9131.941432308478, 1.621778368810224], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1%D0%BE", 300, 291, 97.0, 54.38333333333334, 38, 248, 49.0, 61.900000000000034, 66.0, 218.64000000000033, 18.33068556764023, 12.396126115116706, 6.4622827049981675], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=y", 600, 559, 93.16666666666667, 60.30499999999998, 36, 323, 51.0, 66.0, 109.0, 286.97, 34.528399608678136, 30.117093086407323, 11.397069402083215], "isController": false}, {"data": ["http://samara.elsmoke.ru/all-products?keyword=%D0%BD%D0%B0%D0%B1%D0%BE%D1%80&ajax=1&p%5Bmin%5D=0&p%5Bmax%5D=7486", 300, 60, 20.0, 258.4866666666667, 47, 786, 226.0, 456.4000000000002, 656.6999999999995, 777.8900000000001, 8.581972137197127, 360.3485174643133, 3.7210894813628173], "isController": false}, {"data": ["http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo/sort-price", 300, 251, 83.66666666666667, 85.39999999999999, 38, 426, 52.0, 233.90000000000003, 278.6499999999999, 325.98, 17.42261455369069, 285.34142199387304, 7.741493771415296], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2Cj", 600, 546, 91.0, 60.91666666666662, 37, 273, 51.0, 75.79999999999995, 124.94999999999993, 239.99, 35.53028957186001, 19.925067174453723, 11.901259104636702], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1", 300, 291, 97.0, 55.339999999999975, 38, 330, 50.0, 60.0, 67.79999999999995, 208.84000000000015, 18.261504747991232, 12.346132555697588, 6.330892759313367], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/cart.php?variant=1632&amount=1", 300, 146, 48.666666666666664, 73.01000000000003, 42, 183, 69.0, 94.0, 102.0, 170.70000000000027, 6.811834427011194, 3.9244326309575173, 2.6877254646238735], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0", 300, 289, 96.33333333333333, 54.396666666666704, 39, 315, 50.0, 61.0, 65.94999999999999, 178.63000000000034, 18.197258279752518, 13.742365681487321, 6.201995253548465], "isController": false}, {"data": ["Test", 300, 298, 99.33333333333333, 17926.846666666665, 3836, 72973, 8750.5, 59036.700000000004, 62559.35, 68516.31, 4.074536860976802, 12251.505204478086, 61.87198813206253], "isController": true}, {"data": ["http://samara.elsmoke.ru/catalog/napitki", 300, 0, 0.0, 253.1633333333333, 162, 1005, 227.5, 355.4000000000002, 446.79999999999995, 644.7300000000002, 3.252490865921485, 176.37931869802793, 1.4897826895660093], "isController": false}, {"data": ["http://samara.elsmoke.ru/contact", 300, 253, 84.33333333333333, 193.19333333333344, 38, 3384, 54.0, 456.0, 556.75, 3149.6500000000005, 35.075412136092595, 660.5015235882146, 14.043866187302699], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=getCity&city=%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3", 300, 245, 81.66666666666667, 168.5766666666666, 70, 1194, 157.0, 215.7000000000001, 258.79999999999995, 509.8600000000001, 4.387440221126987, 2.487144457383331, 2.108185021096275], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD", 300, 287, 95.66666666666667, 57.95000000000004, 37, 412, 50.0, 62.900000000000034, 71.79999999999995, 287.96000000000004, 18.102824040550328, 12.812580142710598, 6.063738912020275], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=yf", 600, 564, 94.0, 57.12333333333332, 37, 239, 51.0, 66.0, 94.0, 221.97000000000003, 34.85940041831281, 19.82764568324425, 11.540367911921916], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=calc&shipment%5Btype%5D=courier&shipment%5Bgoods%5D%5B0%5D%5Blength%5D=20&shipment%5Bgoods%5D%5B0%5D%5Bwidth%5D=30&shipment%5Bgoods%5D%5B0%5D%5Bheight%5D=40&shipment%5Bgoods%5D%5B0%5D%5Bweight%5D=1&shipment%5BcityFromId%5D=137&shipment%5BcityToId%5D=430&shipment%5Bcurrency%5D=RUB&shipment%5Btimestamp%5D=1703271277873", 300, 239, 79.66666666666667, 187.81999999999988, 77, 1362, 163.5, 279.00000000000034, 402.24999999999983, 631.5000000000005, 4.389879863621066, 2.682099418889653, 3.0524955323826806], "isController": false}, {"data": ["http://samara.elsmoke.ru/cart", 600, 237, 39.5, 578.6949999999997, 99, 3597, 573.0, 973.9, 1351.8999999999999, 2632.2800000000016, 4.218430322077156, 253.60465694933666, 3.6872335468034843], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2Cjh", 300, 274, 91.33333333333333, 61.45666666666668, 37, 246, 51.0, 74.60000000000014, 152.84999999999997, 239.91000000000008, 17.911517105498838, 10.062167890620337, 6.017150277628516], "isController": false}, {"data": ["http://samara.elsmoke.ru/products/startovyj-nabor-smoant-vikii-pro-700-mah", 300, 143, 47.666666666666664, 167.72666666666672, 44, 1200, 185.0, 267.90000000000003, 290.79999999999995, 403.6600000000003, 6.815858230148812, 254.0350013844712, 3.2681507724639327], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/cart_ajax.php?coupon_code=&action=remove_citem&variant_id=1719", 300, 239, 79.66666666666667, 148.70666666666673, 66, 472, 144.5, 187.80000000000007, 223.0, 448.49000000000046, 4.402054292002934, 17.218781525128392, 1.8744698046588406], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1%D0%BE%D1%80", 300, 0, 0.0, 119.76333333333336, 75, 617, 110.0, 156.90000000000003, 202.84999999999997, 278.8700000000001, 18.318373328448434, 67.14614054771937, 6.565276378457593], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=calc&shipment%5Btype%5D=pickup&shipment%5Bgoods%5D%5B0%5D%5Blength%5D=20&shipment%5Bgoods%5D%5B0%5D%5Bwidth%5D=30&shipment%5Bgoods%5D%5B0%5D%5Bheight%5D=40&shipment%5Bgoods%5D%5B0%5D%5Bweight%5D=1&shipment%5BcityFromId%5D=137&shipment%5BcityToId%5D=430&shipment%5Bcurrency%5D=RUB&shipment%5Btimestamp%5D=1703271277873", 300, 247, 82.33333333333333, 165.36333333333337, 68, 695, 158.0, 218.90000000000003, 258.0, 470.95000000000005, 4.396506243038865, 2.5035183499179317, 3.052809710966352], "isController": false}, {"data": ["http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo", 300, 185, 61.666666666666664, 140.0966666666666, 40, 1359, 61.0, 274.0, 284.0, 692.5400000000004, 19.858343814125902, 743.6663389695175, 8.397131710465347], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2C", 600, 584, 97.33333333333333, 53.195, 37, 126, 51.0, 62.0, 68.94999999999993, 98.99000000000001, 35.22367030644593, 20.351301074321945, 11.764155512504404], "isController": false}, {"data": ["http://samara.elsmoke.ru/oplata", 300, 156, 52.0, 3167.7133333333354, 207, 5124, 3731.5, 4762.6, 4977.85, 5095.74, 48.685491723466406, 1100.772311648004, 17.73407071567673], "isController": false}, {"data": ["http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo/brand-ijoy/sort-price", 300, 264, 88.0, 71.8333333333333, 37, 312, 52.0, 164.4000000000002, 235.69999999999993, 301.93000000000006, 17.637721206420128, 133.43056663016637, 8.02654109589041], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=getLang&lang=rus", 300, 247, 82.33333333333333, 175.76000000000016, 61, 1622, 155.0, 236.0, 302.74999999999994, 1070.9500000000019, 4.391293528697104, 4.251392520346327, 1.7583900008416649], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/cart.php?variant=1719&amount=1", 300, 259, 86.33333333333333, 54.206666666666656, 37, 100, 53.0, 67.0, 75.0, 93.97000000000003, 17.72421127259837, 10.330122666312183, 6.300403225806452], "isController": false}, {"data": ["http://samara.elsmoke.ru/cart-1", 300, 0, 0.0, 159.27333333333323, 78, 1960, 109.5, 219.80000000000007, 502.0, 961.7400000000002, 3.283389333362519, 167.85889754046778, 1.7347988479407677], "isController": false}, {"data": ["http://samara.elsmoke.ru/cart-0", 300, 0, 0.0, 676.5100000000003, 429, 2457, 568.0, 1051.0, 1257.9999999999998, 1935.0400000000018, 3.244681426361955, 180.26616654070992, 2.506505839750592], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["503/Service Unavailable", 7630, 100.0, 68.73873873873873], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 11100, 7630, "503/Service Unavailable", 7630, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["http://samara.elsmoke.ru/all-products?keyword=%D0%BD%D0%B0%D0%B1%D0%BE%D1%80", 300, 54, "503/Service Unavailable", 54, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/cart_ajax.php?coupon_code=&action=update_citem&variant_id=1719&amount=2", 300, 238, "503/Service Unavailable", 238, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/cart_ajax.php?coupon_code=&action=update_citem&variant_id=1719&amount=1", 300, 244, "503/Service Unavailable", 244, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=getPVZ&country=%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F&lang=rus&mode=all", 300, 238, "503/Service Unavailable", 238, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1%D0%BE", 300, 291, "503/Service Unavailable", 291, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=y", 600, 559, "503/Service Unavailable", 559, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/all-products?keyword=%D0%BD%D0%B0%D0%B1%D0%BE%D1%80&ajax=1&p%5Bmin%5D=0&p%5Bmax%5D=7486", 300, 60, "503/Service Unavailable", 60, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo/sort-price", 300, 251, "503/Service Unavailable", 251, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2Cj", 600, 546, "503/Service Unavailable", 546, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1", 300, 291, "503/Service Unavailable", 291, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/cart.php?variant=1632&amount=1", 300, 146, "503/Service Unavailable", 146, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0", 300, 289, "503/Service Unavailable", 289, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://samara.elsmoke.ru/contact", 300, 253, "503/Service Unavailable", 253, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=getCity&city=%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3", 300, 245, "503/Service Unavailable", 245, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD", 300, 287, "503/Service Unavailable", 287, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=yf", 600, 564, "503/Service Unavailable", 564, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=calc&shipment%5Btype%5D=courier&shipment%5Bgoods%5D%5B0%5D%5Blength%5D=20&shipment%5Bgoods%5D%5B0%5D%5Bwidth%5D=30&shipment%5Bgoods%5D%5B0%5D%5Bheight%5D=40&shipment%5Bgoods%5D%5B0%5D%5Bweight%5D=1&shipment%5BcityFromId%5D=137&shipment%5BcityToId%5D=430&shipment%5Bcurrency%5D=RUB&shipment%5Btimestamp%5D=1703271277873", 300, 239, "503/Service Unavailable", 239, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/cart", 600, 237, "503/Service Unavailable", 237, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2Cjh", 300, 274, "503/Service Unavailable", 274, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/products/startovyj-nabor-smoant-vikii-pro-700-mah", 300, 143, "503/Service Unavailable", 143, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/cart_ajax.php?coupon_code=&action=remove_citem&variant_id=1719", 300, 239, "503/Service Unavailable", 239, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=calc&shipment%5Btype%5D=pickup&shipment%5Bgoods%5D%5B0%5D%5Blength%5D=20&shipment%5Bgoods%5D%5B0%5D%5Bwidth%5D=30&shipment%5Bgoods%5D%5B0%5D%5Bheight%5D=40&shipment%5Bgoods%5D%5B0%5D%5Bweight%5D=1&shipment%5BcityFromId%5D=137&shipment%5BcityToId%5D=430&shipment%5Bcurrency%5D=RUB&shipment%5Btimestamp%5D=1703271277873", 300, 247, "503/Service Unavailable", 247, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo", 300, 185, "503/Service Unavailable", 185, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2C", 600, 584, "503/Service Unavailable", 584, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/oplata", 300, 156, "503/Service Unavailable", 156, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo/brand-ijoy/sort-price", 300, 264, "503/Service Unavailable", 264, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=getLang&lang=rus", 300, 247, "503/Service Unavailable", 247, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/cart.php?variant=1719&amount=1", 300, 259, "503/Service Unavailable", 259, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
