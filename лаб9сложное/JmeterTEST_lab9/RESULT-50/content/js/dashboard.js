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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.878421052631579, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.94, 500, 1500, "http://samara.elsmoke.ru/all-products?keyword=%D0%BD%D0%B0%D0%B1%D0%BE%D1%80"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/cart_ajax.php?coupon_code=&action=update_citem&variant_id=1719&amount=2"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/cart_ajax.php?coupon_code=&action=update_citem&variant_id=1719&amount=1"], "isController": false}, {"data": [0.0, 500, 1500, "http://samara.elsmoke.ru/service.php?isdek_action=getPVZ&country=%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F&lang=rus&mode=all"], "isController": false}, {"data": [0.99, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1%D0%BE"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=y"], "isController": false}, {"data": [0.99, 500, 1500, "http://samara.elsmoke.ru/all-products?keyword=%D0%BD%D0%B0%D0%B1%D0%BE%D1%80&ajax=1&p%5Bmin%5D=0&p%5Bmax%5D=7486"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo/sort-price"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2Cj"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/cart.php?variant=1632&amount=1"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [0.99, 500, 1500, "http://samara.elsmoke.ru/catalog/napitki"], "isController": false}, {"data": [0.53, 500, 1500, "http://samara.elsmoke.ru/contact"], "isController": false}, {"data": [0.98, 500, 1500, "http://samara.elsmoke.ru/service.php?isdek_action=getCity&city=%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=yf"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/service.php?isdek_action=calc&shipment%5Btype%5D=courier&shipment%5Bgoods%5D%5B0%5D%5Blength%5D=20&shipment%5Bgoods%5D%5B0%5D%5Bwidth%5D=30&shipment%5Bgoods%5D%5B0%5D%5Bheight%5D=40&shipment%5Bgoods%5D%5B0%5D%5Bweight%5D=1&shipment%5BcityFromId%5D=137&shipment%5BcityToId%5D=430&shipment%5Bcurrency%5D=RUB&shipment%5Btimestamp%5D=1703271277873"], "isController": false}, {"data": [0.67, 500, 1500, "http://samara.elsmoke.ru/cart"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2Cjh"], "isController": false}, {"data": [0.94, 500, 1500, "http://samara.elsmoke.ru/products/startovyj-nabor-smoant-vikii-pro-700-mah"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/cart_ajax.php?coupon_code=&action=remove_citem&variant_id=1719"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1%D0%BE%D1%80"], "isController": false}, {"data": [0.97, 500, 1500, "http://samara.elsmoke.ru/service.php?isdek_action=calc&shipment%5Btype%5D=pickup&shipment%5Bgoods%5D%5B0%5D%5Blength%5D=20&shipment%5Bgoods%5D%5B0%5D%5Bwidth%5D=30&shipment%5Bgoods%5D%5B0%5D%5Bheight%5D=40&shipment%5Bgoods%5D%5B0%5D%5Bweight%5D=1&shipment%5BcityFromId%5D=137&shipment%5BcityToId%5D=430&shipment%5Bcurrency%5D=RUB&shipment%5Btimestamp%5D=1703271277873"], "isController": false}, {"data": [0.99, 500, 1500, "http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2C"], "isController": false}, {"data": [0.23, 500, 1500, "http://samara.elsmoke.ru/oplata"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo/brand-ijoy/sort-price"], "isController": false}, {"data": [0.96, 500, 1500, "http://samara.elsmoke.ru/service.php?isdek_action=getLang&lang=rus"], "isController": false}, {"data": [1.0, 500, 1500, "http://samara.elsmoke.ru/ajax/cart.php?variant=1719&amount=1"], "isController": false}, {"data": [0.99, 500, 1500, "http://samara.elsmoke.ru/cart-1"], "isController": false}, {"data": [0.54, 500, 1500, "http://samara.elsmoke.ru/cart-0"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1850, 0, 0.0, 1139.5956756756761, 54, 48462, 148.0, 616.9000000000001, 2087.849999999983, 35075.47, 9.332593452050649, 3379.3894718256574, 4.335241890732987], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["http://samara.elsmoke.ru/all-products?keyword=%D0%BD%D0%B0%D0%B1%D0%BE%D1%80", 50, 0, 0.0, 387.06, 281, 924, 367.5, 536.9, 593.1999999999997, 924.0, 1.5276504735716467, 140.7888047089826, 0.7354801596394746], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/cart_ajax.php?coupon_code=&action=update_citem&variant_id=1719&amount=2", 50, 0, 0.0, 136.93999999999997, 83, 308, 132.5, 189.2, 241.3999999999996, 308.0, 0.7841169275162312, 16.644106969231252, 0.3491770692845717], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/cart_ajax.php?coupon_code=&action=update_citem&variant_id=1719&amount=1", 50, 0, 0.0, 126.38000000000001, 70, 460, 109.0, 165.9, 281.34999999999934, 460.0, 0.7850279469949131, 16.663674769790553, 0.3495827576461722], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=getPVZ&country=%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F&lang=rus&mode=all", 50, 0, 0.0, 31723.499999999996, 16286, 48462, 31966.0, 43352.5, 46808.95, 48462.0, 0.6099271746953413, 7513.0352515987715, 0.28232957109921075], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1%D0%BE", 50, 0, 0.0, 123.89999999999999, 80, 583, 113.0, 153.7, 171.35, 583.0, 3.7199613124023507, 13.49575808161595, 1.413149365746596], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=y", 100, 0, 0.0, 115.39999999999999, 83, 245, 109.5, 147.9, 166.89999999999998, 244.2499999999996, 6.964273278083432, 33.35233999582144, 2.4891836130649767], "isController": false}, {"data": ["http://samara.elsmoke.ru/all-products?keyword=%D0%BD%D0%B0%D0%B1%D0%BE%D1%80&ajax=1&p%5Bmin%5D=0&p%5Bmax%5D=7486", 50, 0, 0.0, 226.8199999999999, 170, 611, 212.5, 266.3, 318.0, 611.0, 1.534542552864991, 83.82201919904551, 0.6653680600313047], "isController": false}, {"data": ["http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo/sort-price", 50, 0, 0.0, 292.86, 143, 479, 292.0, 386.4, 438.74999999999994, 479.0, 3.7427951193951645, 364.0798104274272, 1.7654004322928363], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2Cj", 100, 0, 0.0, 108.87000000000003, 76, 381, 95.0, 134.50000000000003, 166.84999999999997, 380.90999999999997, 7.260582298700356, 2.2972936179481596, 2.630543000798664], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1", 50, 0, 0.0, 113.42, 88, 191, 110.0, 142.89999999999998, 154.79999999999998, 191.0, 3.7274489339496046, 13.501082125018637, 1.3941532633815417], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/cart.php?variant=1632&amount=1", 50, 0, 0.0, 75.08000000000001, 57, 273, 69.5, 83.9, 99.24999999999997, 273.0, 1.244431170511959, 0.7084993871176485, 0.5043348982055302], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0", 50, 0, 0.0, 119.56, 85, 234, 114.0, 159.0, 178.74999999999994, 234.0, 3.7235627047959485, 19.465069490988977, 1.3708819723711647], "isController": false}, {"data": ["Test", 50, 0, 0.0, 41465.66, 23840, 58508, 42049.5, 52201.799999999996, 55983.35, 58508.0, 0.836848095333735, 11116.390075295409, 13.27679116874205], "isController": true}, {"data": ["http://samara.elsmoke.ru/catalog/napitki", 50, 0, 0.0, 245.78000000000003, 166, 608, 234.0, 263.4, 419.09999999999974, 608.0, 0.5696188110916175, 31.058120788380915, 0.26700881769919566], "isController": false}, {"data": ["http://samara.elsmoke.ru/contact", 50, 0, 0.0, 1006.24, 414, 3445, 622.5, 2305.5, 2764.0499999999997, 3445.0, 6.855889208830385, 802.4680397727273, 3.006146733168792], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=getCity&city=%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3", 50, 0, 0.0, 237.33999999999997, 137, 1274, 183.5, 299.2, 545.2999999999994, 1274.0, 0.7843752451172641, 0.38146374225429447, 0.38529369950584363], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD", 50, 0, 0.0, 147.84000000000003, 102, 250, 140.0, 197.89999999999998, 235.49999999999994, 250.0, 3.7205149192648266, 12.720237043306794, 1.3479599951633305], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=yf", 100, 0, 0.0, 101.44999999999999, 76, 171, 96.0, 130.8, 142.95, 170.93999999999997, 7.067137809187279, 2.229185070671378, 2.532851148409894], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=calc&shipment%5Btype%5D=courier&shipment%5Bgoods%5D%5B0%5D%5Blength%5D=20&shipment%5Bgoods%5D%5B0%5D%5Bwidth%5D=30&shipment%5Bgoods%5D%5B0%5D%5Bheight%5D=40&shipment%5Bgoods%5D%5B0%5D%5Bweight%5D=1&shipment%5BcityFromId%5D=137&shipment%5BcityToId%5D=430&shipment%5Bcurrency%5D=RUB&shipment%5Btimestamp%5D=1703271277873", 50, 0, 0.0, 248.88000000000002, 196, 404, 239.5, 299.9, 332.7499999999998, 404.0, 0.7846091077425227, 0.5593404771992594, 0.5539769383768007], "isController": false}, {"data": ["http://samara.elsmoke.ru/cart", 100, 0, 0.0, 579.82, 213, 2672, 614.0, 762.5000000000002, 993.8499999999995, 2659.0299999999934, 0.7501706638260204, 67.28923164004186, 0.6677544532006031], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2Cjh", 50, 0, 0.0, 103.58, 79, 178, 101.0, 129.7, 150.79999999999998, 178.0, 3.7224538415723645, 1.1814428696396664, 1.3522976846337105], "isController": false}, {"data": ["http://samara.elsmoke.ru/products/startovyj-nabor-smoant-vikii-pro-700-mah", 50, 0, 0.0, 296.78, 186, 840, 249.5, 532.6, 695.1499999999997, 840.0, 1.239587465291551, 87.63052952852291, 0.5943725053302261], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/cart_ajax.php?coupon_code=&action=remove_citem&variant_id=1719", 50, 0, 0.0, 120.49999999999999, 62, 335, 116.5, 159.0, 211.14999999999955, 335.0, 0.7879723894474738, 14.731097650463328, 0.3439684160967], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=%D0%BD%D0%B0%D0%B1%D0%BE%D1%80", 50, 0, 0.0, 116.26000000000002, 89, 182, 106.5, 158.0, 172.94999999999996, 182.0, 3.728838839585353, 13.549813791110447, 1.4383704508166157], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=calc&shipment%5Btype%5D=pickup&shipment%5Bgoods%5D%5B0%5D%5Blength%5D=20&shipment%5Bgoods%5D%5B0%5D%5Bwidth%5D=30&shipment%5Bgoods%5D%5B0%5D%5Bheight%5D=40&shipment%5Bgoods%5D%5B0%5D%5Bweight%5D=1&shipment%5BcityFromId%5D=137&shipment%5BcityToId%5D=430&shipment%5Bcurrency%5D=RUB&shipment%5Btimestamp%5D=1703271277873", 50, 0, 0.0, 248.02, 150, 1266, 192.5, 283.59999999999997, 825.6499999999974, 1266.0, 0.7860275738472906, 0.3907109717658896, 0.5542108479665467], "isController": false}, {"data": ["http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo", 50, 0, 0.0, 260.29999999999995, 208, 596, 243.0, 309.29999999999995, 420.4999999999998, 596.0, 4.2426813746287655, 410.34485044548154, 1.9556109461179465], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/search_products.php?query=yf%2C", 100, 0, 0.0, 102.32999999999998, 74, 214, 97.0, 124.50000000000003, 150.19999999999982, 213.76999999999987, 7.170000717000072, 2.2616310855381085, 2.5907229153222917], "isController": false}, {"data": ["http://samara.elsmoke.ru/oplata", 50, 0, 0.0, 2597.8999999999996, 411, 4539, 3120.0, 4139.9, 4237.0, 4539.0, 11.013215859030838, 511.7826352560573, 4.011649917400881], "isController": false}, {"data": ["http://samara.elsmoke.ru/catalog/odnorazovoe-ustrojstvo/brand-ijoy/sort-price", 50, 0, 0.0, 216.42000000000002, 95, 341, 223.5, 260.9, 284.29999999999984, 341.0, 3.6507009345794392, 214.48787796163114, 1.7611779899240654], "isController": false}, {"data": ["http://samara.elsmoke.ru/service.php?isdek_action=getLang&lang=rus", 50, 0, 0.0, 209.74, 56, 1010, 144.5, 463.1999999999997, 904.2999999999997, 1010.0, 0.7834902925552752, 2.157658813482301, 0.32211856754469814], "isController": false}, {"data": ["http://samara.elsmoke.ru/ajax/cart.php?variant=1719&amount=1", 50, 0, 0.0, 68.82000000000001, 54, 99, 67.5, 84.69999999999999, 91.94999999999996, 99.0, 3.6903092479149753, 2.1010256753265923, 1.4126965089674515], "isController": false}, {"data": ["http://samara.elsmoke.ru/cart-1", 50, 0, 0.0, 112.42, 80, 717, 95.0, 138.7, 178.84999999999977, 717.0, 0.5771739255907374, 29.507272932562998, 0.3111328192637569], "isController": false}, {"data": ["http://samara.elsmoke.ru/cart-0", 50, 0, 0.0, 586.96, 469, 1953, 542.0, 624.9, 830.8999999999999, 1953.0, 0.5650036725238714, 35.68693411350924, 0.4425126419571727], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1850, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
