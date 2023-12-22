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

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8881578947368421, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.95, 500, 1500, "http://samara.elsmoke.ru/all-products?keyword=%D0%BD%D0%B0%D0%B1%D0%BE%D1%80"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/cart_ajax.php?coupon_code=&action=update_citem&variant_id=1719&amount=2"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/cart_ajax.php?coupon_code=&action=update_citem&variant_id=1719&amount=1"], "isController": false}, {"data": [0.0, 500, 1500, "http://samara.elsmoke.ru/service.php?isdek_action=getPVZ&country=%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F&lang=rus&mode=all"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1%D0%BE"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=y"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/all-products?keyword=%D0%BD%D0%B0%D0%B1%D0%BE%D1%80&ajax=1&p%5Bmin%5D=0&p%5Bmax%5D=7486"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo/sort-price"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2Cj"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/cart.php?variant=1632&amount=1"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/catalog/napitki"], "isController": false}, {"data": [0.65, 500, 1500, "http://samara.elsmoke.ru/contact"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/service.php?isdek_action=getCity&city=%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=yf"], "isController": false}, {"data": [0.95, 500, 1500, "http://samara.elsmoke.ru/service.php?isdek_action=calc&shipment%5Btype%5D=courier&shipment%5Bgoods%5D%5B0%5D%5Blength%5D=20&shipment%5Bgoods%5D%5B0%5D%5Bwidth%5D=30&shipment%5Bgoods%5D%5B0%5D%5Bheight%5D=40&shipment%5Bgoods%5D%5B0%5D%5Bweight%5D=1&shipment%5BcityFromId%5D=137&shipment%5BcityToId%5D=430&shipment%5Bcurrency%5D=RUB&shipment%5Btimestamp%5D=1703271277873"], "isController": false}, {"data": [0.675, 500, 1500, "http://samara.elsmoke.ru/cart"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2Cjh"], "isController": false}, {"data": [0.925, 500, 1500, "http://samara.elsmoke.ru/products/startovyj-nabor-smoant-vikii-pro-700-mah"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/cart_ajax.php?coupon_code=&action=remove_citem&variant_id=1719"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1%D0%BE%D1%80"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/service.php?isdek_action=calc&shipment%5Btype%5D=pickup&shipment%5Bgoods%5D%5B0%5D%5Blength%5D=20&shipment%5Bgoods%5D%5B0%5D%5Bwidth%5D=30&shipment%5Bgoods%5D%5B0%5D%5Bheight%5D=40&shipment%5Bgoods%5D%5B0%5D%5Bweight%5D=1&shipment%5BcityFromId%5D=137&shipment%5BcityToId%5D=430&shipment%5Bcurrency%5D=RUB&shipment%5Btimestamp%5D=1703271277873"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2C"], "isController": false}, {"data": [0.375, 500, 1500, "http://samara.elsmoke.ru/oplata"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo/brand-ijoy/sort-price"], "isController": false}, {"data": [0.975, 500, 1500, "http://samara.elsmoke.ru/service.php?isdek_action=getLang&lang=rus"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/cart.php?variant=1719&amount=1"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/cart-1"], "isController": false}, {"data": [0.575, 500, 1500, "http://samara.elsmoke.ru/cart-0"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 740, 0, 0.0, 755.8229729729738, 58, 27711, 114.5, 608.9999999999998, 1235.7999999999956, 21413.150000000023, 3.814983605881261, 1381.428863605314, 1.7721629925968696], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["http://samara.elsmoke.ru/all-products?keyword=%D0%BD%D0%B0%D0%B1%D0%BE%D1%80", 20, 0, 0.0, 404.90000000000003, 312, 904, 360.5, 672.9000000000005, 893.7999999999998, 904.0, 0.5734109349465294, 52.8458373501964, 0.27606600676624904], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/cart_ajax.php?coupon_code=&action=update_citem&variant_id=1719&amount=2", 20, 0, 0.0, 108.55000000000001, 78, 177, 91.0, 166.90000000000003, 176.54999999999998, 177.0, 0.3715193282930544, 7.886060101378337, 0.16544220088050082], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/cart_ajax.php?coupon_code=&action=update_citem&variant_id=1719&amount=1", 20, 0, 0.0, 86.85, 74, 120, 85.0, 101.50000000000001, 119.1, 120.0, 0.37196845707484005, 7.8954300769044785, 0.1656422035411397], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=getPVZ&country=%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F&lang=rus&mode=all", 20, 0, 0.0, 19513.65, 14027, 27711, 18255.5, 24005.7, 27525.899999999998, 27711.0, 0.29486782549722085, 3632.158823528057, 0.1364915520367995], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1%D0%BE", 20, 0, 0.0, 101.05000000000003, 88, 121, 96.5, 117.0, 120.8, 121.0, 1.2157315664701234, 4.41058864202784, 0.46183552671570116], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=y", 40, 0, 0.0, 99.175, 82, 113, 100.0, 108.9, 110.94999999999999, 113.0, 2.3240950554877693, 11.130236476671897, 0.8306824124106676], "isController": false}, {"data": ["http://samara.elsmoke.ru/all-products?keyword=%D0%BD%D0%B0%D0%B1%D0%BE%D1%80&ajax=1&p%5Bmin%5D=0&p%5Bmax%5D=7486", 20, 0, 0.0, 221.64999999999998, 186, 368, 208.0, 266.50000000000006, 363.0999999999999, 368.0, 0.5758710048949035, 31.45636314965448, 0.24969406852864962], "isController": false}, {"data": ["http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo/sort-price", 20, 0, 0.0, 291.95, 216, 348, 287.5, 347.0, 347.95, 348.0, 1.470263912372271, 143.01977849555246, 0.6934936227302801], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2Cj", 40, 0, 0.0, 93.55, 74, 125, 91.0, 106.8, 110.0, 125.0, 2.4097837219109586, 0.7624706307608892, 0.8730759383095367], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1", 20, 0, 0.0, 119.25000000000001, 87, 398, 103.5, 146.20000000000007, 385.5999999999998, 398.0, 1.2152883271556176, 4.40185977091815, 0.4545463176763687], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/cart.php?variant=1632&amount=1", 20, 0, 0.0, 75.44999999999999, 58, 123, 72.0, 99.50000000000003, 121.89999999999998, 123.0, 0.6790249202145718, 0.38659328953622596, 0.2751907635635228], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0", 20, 0, 0.0, 117.0, 86, 403, 102.0, 116.80000000000001, 388.6999999999998, 403.0, 1.215362177929023, 6.353353260209042, 0.4474526768351969], "isController": false}, {"data": ["Test", 20, 0, 0.0, 27227.75, 21415, 35208, 25510.5, 33184.700000000004, 35112.5, 35208.0, 0.5659790021790192, 7518.26125170678, 8.979389520898774], "isController": true}, {"data": ["http://samara.elsmoke.ru/catalog/napitki", 20, 0, 0.0, 233.50000000000003, 195, 395, 226.0, 256.5, 388.0999999999999, 395.0, 0.24735026033614899, 13.48666424598365, 0.11594543453256985], "isController": false}, {"data": ["http://samara.elsmoke.ru/contact", 20, 0, 0.0, 631.7499999999999, 424, 1257, 622.5, 1006.1000000000004, 1245.3999999999999, 1257.0, 3.0599755201958385, 358.1646063628366, 1.3417275474296206], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=getCity&city=%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3", 20, 0, 0.0, 185.0, 135, 424, 158.5, 231.0, 414.34999999999985, 424.0, 0.37169194171870357, 0.18076424509366637, 0.18257914715283974], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD", 20, 0, 0.0, 126.25000000000001, 110, 145, 127.0, 136.9, 144.6, 145.0, 1.212635663614867, 4.1459350178863765, 0.4393435851573395], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=yf", 40, 0, 0.0, 90.42500000000001, 73, 108, 88.5, 103.9, 105.0, 108.0, 2.3539104337079975, 0.7424932325075031, 0.8436378214558937], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=calc&shipment%5Btype%5D=courier&shipment%5Bgoods%5D%5B0%5D%5Blength%5D=20&shipment%5Bgoods%5D%5B0%5D%5Bwidth%5D=30&shipment%5Bgoods%5D%5B0%5D%5Bheight%5D=40&shipment%5Bgoods%5D%5B0%5D%5Bweight%5D=1&shipment%5BcityFromId%5D=137&shipment%5BcityToId%5D=430&shipment%5Bcurrency%5D=RUB&shipment%5Btimestamp%5D=1703271277873", 20, 0, 0.0, 295.3, 193, 1239, 216.5, 580.0000000000007, 1207.6499999999996, 1239.0, 0.371892374346864, 0.26511858718086984, 0.2625763541531081], "isController": false}, {"data": ["http://samara.elsmoke.ru/cart", 40, 0, 0.0, 573.6, 206, 1674, 588.5, 836.3, 1163.499999999999, 1674.0, 0.31060964908874894, 27.86113952973699, 0.27648505385194794], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2Cjh", 20, 0, 0.0, 91.94999999999999, 77, 138, 90.5, 104.50000000000001, 136.34999999999997, 138.0, 1.2195121951219512, 0.3870522103658537, 0.44302591463414637], "isController": false}, {"data": ["http://samara.elsmoke.ru/products/startovyj-nabor-smoant-vikii-pro-700-mah", 20, 0, 0.0, 329.95000000000005, 190, 695, 277.5, 607.7, 690.75, 695.0, 0.6750599115671516, 47.72254958526007, 0.3236859536908901], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/cart_ajax.php?coupon_code=&action=remove_citem&variant_id=1719", 20, 0, 0.0, 97.44999999999999, 70, 202, 88.0, 138.4, 198.84999999999997, 202.0, 0.37283522547210257, 6.9696520864791305, 0.16275131424416978], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1%D0%BE%D1%80", 20, 0, 0.0, 101.14999999999999, 88, 146, 97.5, 114.50000000000001, 144.45, 146.0, 1.2159533073929962, 4.41851782891537, 0.46904448869163423], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=calc&shipment%5Btype%5D=pickup&shipment%5Bgoods%5D%5B0%5D%5Blength%5D=20&shipment%5Bgoods%5D%5B0%5D%5Bwidth%5D=30&shipment%5Bgoods%5D%5B0%5D%5Bheight%5D=40&shipment%5Bgoods%5D%5B0%5D%5Bweight%5D=1&shipment%5BcityFromId%5D=137&shipment%5BcityToId%5D=430&shipment%5Bcurrency%5D=RUB&shipment%5Btimestamp%5D=1703271277873", 20, 0, 0.0, 176.05, 151, 254, 166.0, 216.60000000000002, 252.14999999999998, 254.0, 0.37224538415723646, 0.18503212942972005, 0.262462077501489], "isController": false}, {"data": ["http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo", 20, 0, 0.0, 265.8, 201, 408, 258.5, 320.6, 403.74999999999994, 408.0, 1.5946420028703556, 154.23115830808484, 0.7350302981980545], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2C", 40, 0, 0.0, 90.25000000000001, 74, 115, 90.0, 102.6, 106.85, 115.0, 2.3816612086930635, 0.7512466507889252, 0.8605611789222982], "isController": false}, {"data": ["http://samara.elsmoke.ru/oplata", 20, 0, 0.0, 1330.95, 316, 2256, 1526.5, 2066.6000000000004, 2246.85, 2256.0, 7.945967421533572, 369.2477093265793, 2.8943807111640845], "isController": false}, {"data": ["http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo/brand-ijoy/sort-price", 20, 0, 0.0, 221.15000000000003, 148, 348, 220.5, 263.8, 343.79999999999995, 348.0, 1.2172113687541843, 71.51366414856065, 0.5872093907857099], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=getLang&lang=rus", 20, 0, 0.0, 138.79999999999998, 60, 540, 92.0, 393.10000000000053, 533.8999999999999, 540.0, 0.3711814706209866, 1.0221989718273263, 0.15260488196429234], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/cart.php?variant=1719&amount=1", 20, 0, 0.0, 68.40000000000002, 59, 81, 67.0, 80.80000000000001, 81.0, 81.0, 1.2237655265251177, 0.6967336933243591, 0.4684727406228967], "isController": false}, {"data": ["http://samara.elsmoke.ru/cart-1", 20, 0, 0.0, 112.0, 83, 272, 97.0, 204.80000000000018, 269.09999999999997, 272.0, 0.25694060817841957, 13.135762398990224, 0.1385070465961793], "isController": false}, {"data": ["http://samara.elsmoke.ru/cart-0", 20, 0, 0.0, 625.7, 449, 1569, 568.5, 884.9000000000003, 1535.6499999999996, 1569.0, 0.25549636556419986, 16.13775176372335, 0.20010555193602372], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 740, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
