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
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 1904.0, "minX": 0.0, "maxY": 7091.0, "series": [{"data": [[0.0, 1904.0], [0.1, 1904.0], [0.2, 1904.0], [0.3, 1904.0], [0.4, 1904.0], [0.5, 1904.0], [0.6, 1904.0], [0.7, 1904.0], [0.8, 1904.0], [0.9, 1904.0], [1.0, 1946.0], [1.1, 1946.0], [1.2, 1946.0], [1.3, 1946.0], [1.4, 1946.0], [1.5, 1946.0], [1.6, 1946.0], [1.7, 1946.0], [1.8, 1946.0], [1.9, 1946.0], [2.0, 2089.0], [2.1, 2089.0], [2.2, 2089.0], [2.3, 2089.0], [2.4, 2089.0], [2.5, 2089.0], [2.6, 2089.0], [2.7, 2089.0], [2.8, 2089.0], [2.9, 2089.0], [3.0, 2100.0], [3.1, 2100.0], [3.2, 2100.0], [3.3, 2100.0], [3.4, 2100.0], [3.5, 2100.0], [3.6, 2100.0], [3.7, 2100.0], [3.8, 2100.0], [3.9, 2100.0], [4.0, 2104.0], [4.1, 2104.0], [4.2, 2104.0], [4.3, 2104.0], [4.4, 2104.0], [4.5, 2104.0], [4.6, 2104.0], [4.7, 2104.0], [4.8, 2104.0], [4.9, 2104.0], [5.0, 2157.0], [5.1, 2157.0], [5.2, 2157.0], [5.3, 2157.0], [5.4, 2157.0], [5.5, 2157.0], [5.6, 2157.0], [5.7, 2157.0], [5.8, 2157.0], [5.9, 2157.0], [6.0, 2278.0], [6.1, 2278.0], [6.2, 2278.0], [6.3, 2278.0], [6.4, 2278.0], [6.5, 2278.0], [6.6, 2278.0], [6.7, 2278.0], [6.8, 2278.0], [6.9, 2278.0], [7.0, 2339.0], [7.1, 2339.0], [7.2, 2339.0], [7.3, 2339.0], [7.4, 2339.0], [7.5, 2339.0], [7.6, 2339.0], [7.7, 2339.0], [7.8, 2339.0], [7.9, 2339.0], [8.0, 2345.0], [8.1, 2345.0], [8.2, 2345.0], [8.3, 2345.0], [8.4, 2345.0], [8.5, 2345.0], [8.6, 2345.0], [8.7, 2345.0], [8.8, 2345.0], [8.9, 2345.0], [9.0, 2364.0], [9.1, 2364.0], [9.2, 2364.0], [9.3, 2364.0], [9.4, 2364.0], [9.5, 2364.0], [9.6, 2364.0], [9.7, 2364.0], [9.8, 2364.0], [9.9, 2364.0], [10.0, 2409.0], [10.1, 2409.0], [10.2, 2409.0], [10.3, 2409.0], [10.4, 2409.0], [10.5, 2409.0], [10.6, 2409.0], [10.7, 2409.0], [10.8, 2409.0], [10.9, 2409.0], [11.0, 2574.0], [11.1, 2574.0], [11.2, 2574.0], [11.3, 2574.0], [11.4, 2574.0], [11.5, 2574.0], [11.6, 2574.0], [11.7, 2574.0], [11.8, 2574.0], [11.9, 2574.0], [12.0, 2628.0], [12.1, 2628.0], [12.2, 2628.0], [12.3, 2628.0], [12.4, 2628.0], [12.5, 2628.0], [12.6, 2628.0], [12.7, 2628.0], [12.8, 2628.0], [12.9, 2628.0], [13.0, 2647.0], [13.1, 2647.0], [13.2, 2647.0], [13.3, 2647.0], [13.4, 2647.0], [13.5, 2647.0], [13.6, 2647.0], [13.7, 2647.0], [13.8, 2647.0], [13.9, 2647.0], [14.0, 2650.0], [14.1, 2650.0], [14.2, 2650.0], [14.3, 2650.0], [14.4, 2650.0], [14.5, 2650.0], [14.6, 2650.0], [14.7, 2650.0], [14.8, 2650.0], [14.9, 2650.0], [15.0, 2685.0], [15.1, 2685.0], [15.2, 2685.0], [15.3, 2685.0], [15.4, 2685.0], [15.5, 2685.0], [15.6, 2685.0], [15.7, 2685.0], [15.8, 2685.0], [15.9, 2685.0], [16.0, 2704.0], [16.1, 2704.0], [16.2, 2704.0], [16.3, 2704.0], [16.4, 2704.0], [16.5, 2704.0], [16.6, 2704.0], [16.7, 2704.0], [16.8, 2704.0], [16.9, 2704.0], [17.0, 2819.0], [17.1, 2819.0], [17.2, 2819.0], [17.3, 2819.0], [17.4, 2819.0], [17.5, 2819.0], [17.6, 2819.0], [17.7, 2819.0], [17.8, 2819.0], [17.9, 2819.0], [18.0, 2884.0], [18.1, 2884.0], [18.2, 2884.0], [18.3, 2884.0], [18.4, 2884.0], [18.5, 2884.0], [18.6, 2884.0], [18.7, 2884.0], [18.8, 2884.0], [18.9, 2884.0], [19.0, 2899.0], [19.1, 2899.0], [19.2, 2899.0], [19.3, 2899.0], [19.4, 2899.0], [19.5, 2899.0], [19.6, 2899.0], [19.7, 2899.0], [19.8, 2899.0], [19.9, 2899.0], [20.0, 2933.0], [20.1, 2933.0], [20.2, 2933.0], [20.3, 2933.0], [20.4, 2933.0], [20.5, 2933.0], [20.6, 2933.0], [20.7, 2933.0], [20.8, 2933.0], [20.9, 2933.0], [21.0, 2940.0], [21.1, 2940.0], [21.2, 2940.0], [21.3, 2940.0], [21.4, 2940.0], [21.5, 2940.0], [21.6, 2940.0], [21.7, 2940.0], [21.8, 2940.0], [21.9, 2940.0], [22.0, 2940.0], [22.1, 2940.0], [22.2, 2940.0], [22.3, 2940.0], [22.4, 2940.0], [22.5, 2940.0], [22.6, 2940.0], [22.7, 2940.0], [22.8, 2940.0], [22.9, 2940.0], [23.0, 2950.0], [23.1, 2950.0], [23.2, 2950.0], [23.3, 2950.0], [23.4, 2950.0], [23.5, 2950.0], [23.6, 2950.0], [23.7, 2950.0], [23.8, 2950.0], [23.9, 2950.0], [24.0, 3026.0], [24.1, 3026.0], [24.2, 3026.0], [24.3, 3026.0], [24.4, 3026.0], [24.5, 3026.0], [24.6, 3026.0], [24.7, 3026.0], [24.8, 3026.0], [24.9, 3026.0], [25.0, 3110.0], [25.1, 3110.0], [25.2, 3110.0], [25.3, 3110.0], [25.4, 3110.0], [25.5, 3110.0], [25.6, 3110.0], [25.7, 3110.0], [25.8, 3110.0], [25.9, 3110.0], [26.0, 3193.0], [26.1, 3193.0], [26.2, 3193.0], [26.3, 3193.0], [26.4, 3193.0], [26.5, 3193.0], [26.6, 3193.0], [26.7, 3193.0], [26.8, 3193.0], [26.9, 3193.0], [27.0, 3202.0], [27.1, 3202.0], [27.2, 3202.0], [27.3, 3202.0], [27.4, 3202.0], [27.5, 3202.0], [27.6, 3202.0], [27.7, 3202.0], [27.8, 3202.0], [27.9, 3202.0], [28.0, 3226.0], [28.1, 3226.0], [28.2, 3226.0], [28.3, 3226.0], [28.4, 3226.0], [28.5, 3226.0], [28.6, 3226.0], [28.7, 3226.0], [28.8, 3226.0], [28.9, 3226.0], [29.0, 3290.0], [29.1, 3290.0], [29.2, 3290.0], [29.3, 3290.0], [29.4, 3290.0], [29.5, 3290.0], [29.6, 3290.0], [29.7, 3290.0], [29.8, 3290.0], [29.9, 3290.0], [30.0, 3379.0], [30.1, 3379.0], [30.2, 3379.0], [30.3, 3379.0], [30.4, 3379.0], [30.5, 3379.0], [30.6, 3379.0], [30.7, 3379.0], [30.8, 3379.0], [30.9, 3379.0], [31.0, 3394.0], [31.1, 3394.0], [31.2, 3394.0], [31.3, 3394.0], [31.4, 3394.0], [31.5, 3394.0], [31.6, 3394.0], [31.7, 3394.0], [31.8, 3394.0], [31.9, 3394.0], [32.0, 3518.0], [32.1, 3518.0], [32.2, 3518.0], [32.3, 3518.0], [32.4, 3518.0], [32.5, 3518.0], [32.6, 3518.0], [32.7, 3518.0], [32.8, 3518.0], [32.9, 3518.0], [33.0, 3595.0], [33.1, 3595.0], [33.2, 3595.0], [33.3, 3595.0], [33.4, 3595.0], [33.5, 3595.0], [33.6, 3595.0], [33.7, 3595.0], [33.8, 3595.0], [33.9, 3595.0], [34.0, 3747.0], [34.1, 3747.0], [34.2, 3747.0], [34.3, 3747.0], [34.4, 3747.0], [34.5, 3747.0], [34.6, 3747.0], [34.7, 3747.0], [34.8, 3747.0], [34.9, 3747.0], [35.0, 3775.0], [35.1, 3775.0], [35.2, 3775.0], [35.3, 3775.0], [35.4, 3775.0], [35.5, 3775.0], [35.6, 3775.0], [35.7, 3775.0], [35.8, 3775.0], [35.9, 3775.0], [36.0, 3810.0], [36.1, 3810.0], [36.2, 3810.0], [36.3, 3810.0], [36.4, 3810.0], [36.5, 3810.0], [36.6, 3810.0], [36.7, 3810.0], [36.8, 3810.0], [36.9, 3810.0], [37.0, 3827.0], [37.1, 3827.0], [37.2, 3827.0], [37.3, 3827.0], [37.4, 3827.0], [37.5, 3827.0], [37.6, 3827.0], [37.7, 3827.0], [37.8, 3827.0], [37.9, 3827.0], [38.0, 3838.0], [38.1, 3838.0], [38.2, 3838.0], [38.3, 3838.0], [38.4, 3838.0], [38.5, 3838.0], [38.6, 3838.0], [38.7, 3838.0], [38.8, 3838.0], [38.9, 3838.0], [39.0, 3924.0], [39.1, 3924.0], [39.2, 3924.0], [39.3, 3924.0], [39.4, 3924.0], [39.5, 3924.0], [39.6, 3924.0], [39.7, 3924.0], [39.8, 3924.0], [39.9, 3924.0], [40.0, 3937.0], [40.1, 3937.0], [40.2, 3937.0], [40.3, 3937.0], [40.4, 3937.0], [40.5, 3937.0], [40.6, 3937.0], [40.7, 3937.0], [40.8, 3937.0], [40.9, 3937.0], [41.0, 3950.0], [41.1, 3950.0], [41.2, 3950.0], [41.3, 3950.0], [41.4, 3950.0], [41.5, 3950.0], [41.6, 3950.0], [41.7, 3950.0], [41.8, 3950.0], [41.9, 3950.0], [42.0, 3998.0], [42.1, 3998.0], [42.2, 3998.0], [42.3, 3998.0], [42.4, 3998.0], [42.5, 3998.0], [42.6, 3998.0], [42.7, 3998.0], [42.8, 3998.0], [42.9, 3998.0], [43.0, 4011.0], [43.1, 4011.0], [43.2, 4011.0], [43.3, 4011.0], [43.4, 4011.0], [43.5, 4011.0], [43.6, 4011.0], [43.7, 4011.0], [43.8, 4011.0], [43.9, 4011.0], [44.0, 4020.0], [44.1, 4020.0], [44.2, 4020.0], [44.3, 4020.0], [44.4, 4020.0], [44.5, 4020.0], [44.6, 4020.0], [44.7, 4020.0], [44.8, 4020.0], [44.9, 4020.0], [45.0, 4106.0], [45.1, 4106.0], [45.2, 4106.0], [45.3, 4106.0], [45.4, 4106.0], [45.5, 4106.0], [45.6, 4106.0], [45.7, 4106.0], [45.8, 4106.0], [45.9, 4106.0], [46.0, 4129.0], [46.1, 4129.0], [46.2, 4129.0], [46.3, 4129.0], [46.4, 4129.0], [46.5, 4129.0], [46.6, 4129.0], [46.7, 4129.0], [46.8, 4129.0], [46.9, 4129.0], [47.0, 4211.0], [47.1, 4211.0], [47.2, 4211.0], [47.3, 4211.0], [47.4, 4211.0], [47.5, 4211.0], [47.6, 4211.0], [47.7, 4211.0], [47.8, 4211.0], [47.9, 4211.0], [48.0, 4289.0], [48.1, 4289.0], [48.2, 4289.0], [48.3, 4289.0], [48.4, 4289.0], [48.5, 4289.0], [48.6, 4289.0], [48.7, 4289.0], [48.8, 4289.0], [48.9, 4289.0], [49.0, 4301.0], [49.1, 4301.0], [49.2, 4301.0], [49.3, 4301.0], [49.4, 4301.0], [49.5, 4301.0], [49.6, 4301.0], [49.7, 4301.0], [49.8, 4301.0], [49.9, 4301.0], [50.0, 4335.0], [50.1, 4335.0], [50.2, 4335.0], [50.3, 4335.0], [50.4, 4335.0], [50.5, 4335.0], [50.6, 4335.0], [50.7, 4335.0], [50.8, 4335.0], [50.9, 4335.0], [51.0, 4339.0], [51.1, 4339.0], [51.2, 4339.0], [51.3, 4339.0], [51.4, 4339.0], [51.5, 4339.0], [51.6, 4339.0], [51.7, 4339.0], [51.8, 4339.0], [51.9, 4339.0], [52.0, 4353.0], [52.1, 4353.0], [52.2, 4353.0], [52.3, 4353.0], [52.4, 4353.0], [52.5, 4353.0], [52.6, 4353.0], [52.7, 4353.0], [52.8, 4353.0], [52.9, 4353.0], [53.0, 4470.0], [53.1, 4470.0], [53.2, 4470.0], [53.3, 4470.0], [53.4, 4470.0], [53.5, 4470.0], [53.6, 4470.0], [53.7, 4470.0], [53.8, 4470.0], [53.9, 4470.0], [54.0, 4476.0], [54.1, 4476.0], [54.2, 4476.0], [54.3, 4476.0], [54.4, 4476.0], [54.5, 4476.0], [54.6, 4476.0], [54.7, 4476.0], [54.8, 4476.0], [54.9, 4476.0], [55.0, 4509.0], [55.1, 4509.0], [55.2, 4509.0], [55.3, 4509.0], [55.4, 4509.0], [55.5, 4509.0], [55.6, 4509.0], [55.7, 4509.0], [55.8, 4509.0], [55.9, 4509.0], [56.0, 4532.0], [56.1, 4532.0], [56.2, 4532.0], [56.3, 4532.0], [56.4, 4532.0], [56.5, 4532.0], [56.6, 4532.0], [56.7, 4532.0], [56.8, 4532.0], [56.9, 4532.0], [57.0, 4556.0], [57.1, 4556.0], [57.2, 4556.0], [57.3, 4556.0], [57.4, 4556.0], [57.5, 4556.0], [57.6, 4556.0], [57.7, 4556.0], [57.8, 4556.0], [57.9, 4556.0], [58.0, 4556.0], [58.1, 4556.0], [58.2, 4556.0], [58.3, 4556.0], [58.4, 4556.0], [58.5, 4556.0], [58.6, 4556.0], [58.7, 4556.0], [58.8, 4556.0], [58.9, 4556.0], [59.0, 4561.0], [59.1, 4561.0], [59.2, 4561.0], [59.3, 4561.0], [59.4, 4561.0], [59.5, 4561.0], [59.6, 4561.0], [59.7, 4561.0], [59.8, 4561.0], [59.9, 4561.0], [60.0, 4634.0], [60.1, 4634.0], [60.2, 4634.0], [60.3, 4634.0], [60.4, 4634.0], [60.5, 4634.0], [60.6, 4634.0], [60.7, 4634.0], [60.8, 4634.0], [60.9, 4634.0], [61.0, 4735.0], [61.1, 4735.0], [61.2, 4735.0], [61.3, 4735.0], [61.4, 4735.0], [61.5, 4735.0], [61.6, 4735.0], [61.7, 4735.0], [61.8, 4735.0], [61.9, 4735.0], [62.0, 5033.0], [62.1, 5033.0], [62.2, 5033.0], [62.3, 5033.0], [62.4, 5033.0], [62.5, 5033.0], [62.6, 5033.0], [62.7, 5033.0], [62.8, 5033.0], [62.9, 5033.0], [63.0, 5061.0], [63.1, 5061.0], [63.2, 5061.0], [63.3, 5061.0], [63.4, 5061.0], [63.5, 5061.0], [63.6, 5061.0], [63.7, 5061.0], [63.8, 5061.0], [63.9, 5061.0], [64.0, 5063.0], [64.1, 5063.0], [64.2, 5063.0], [64.3, 5063.0], [64.4, 5063.0], [64.5, 5063.0], [64.6, 5063.0], [64.7, 5063.0], [64.8, 5063.0], [64.9, 5063.0], [65.0, 5099.0], [65.1, 5099.0], [65.2, 5099.0], [65.3, 5099.0], [65.4, 5099.0], [65.5, 5099.0], [65.6, 5099.0], [65.7, 5099.0], [65.8, 5099.0], [65.9, 5099.0], [66.0, 5105.0], [66.1, 5105.0], [66.2, 5105.0], [66.3, 5105.0], [66.4, 5105.0], [66.5, 5105.0], [66.6, 5105.0], [66.7, 5105.0], [66.8, 5105.0], [66.9, 5105.0], [67.0, 5207.0], [67.1, 5207.0], [67.2, 5207.0], [67.3, 5207.0], [67.4, 5207.0], [67.5, 5207.0], [67.6, 5207.0], [67.7, 5207.0], [67.8, 5207.0], [67.9, 5207.0], [68.0, 5270.0], [68.1, 5270.0], [68.2, 5270.0], [68.3, 5270.0], [68.4, 5270.0], [68.5, 5270.0], [68.6, 5270.0], [68.7, 5270.0], [68.8, 5270.0], [68.9, 5270.0], [69.0, 5282.0], [69.1, 5282.0], [69.2, 5282.0], [69.3, 5282.0], [69.4, 5282.0], [69.5, 5282.0], [69.6, 5282.0], [69.7, 5282.0], [69.8, 5282.0], [69.9, 5282.0], [70.0, 5287.0], [70.1, 5287.0], [70.2, 5287.0], [70.3, 5287.0], [70.4, 5287.0], [70.5, 5287.0], [70.6, 5287.0], [70.7, 5287.0], [70.8, 5287.0], [70.9, 5287.0], [71.0, 5312.0], [71.1, 5312.0], [71.2, 5312.0], [71.3, 5312.0], [71.4, 5312.0], [71.5, 5312.0], [71.6, 5312.0], [71.7, 5312.0], [71.8, 5312.0], [71.9, 5312.0], [72.0, 5440.0], [72.1, 5440.0], [72.2, 5440.0], [72.3, 5440.0], [72.4, 5440.0], [72.5, 5440.0], [72.6, 5440.0], [72.7, 5440.0], [72.8, 5440.0], [72.9, 5440.0], [73.0, 5459.0], [73.1, 5459.0], [73.2, 5459.0], [73.3, 5459.0], [73.4, 5459.0], [73.5, 5459.0], [73.6, 5459.0], [73.7, 5459.0], [73.8, 5459.0], [73.9, 5459.0], [74.0, 5476.0], [74.1, 5476.0], [74.2, 5476.0], [74.3, 5476.0], [74.4, 5476.0], [74.5, 5476.0], [74.6, 5476.0], [74.7, 5476.0], [74.8, 5476.0], [74.9, 5476.0], [75.0, 5556.0], [75.1, 5556.0], [75.2, 5556.0], [75.3, 5556.0], [75.4, 5556.0], [75.5, 5556.0], [75.6, 5556.0], [75.7, 5556.0], [75.8, 5556.0], [75.9, 5556.0], [76.0, 5684.0], [76.1, 5684.0], [76.2, 5684.0], [76.3, 5684.0], [76.4, 5684.0], [76.5, 5684.0], [76.6, 5684.0], [76.7, 5684.0], [76.8, 5684.0], [76.9, 5684.0], [77.0, 5713.0], [77.1, 5713.0], [77.2, 5713.0], [77.3, 5713.0], [77.4, 5713.0], [77.5, 5713.0], [77.6, 5713.0], [77.7, 5713.0], [77.8, 5713.0], [77.9, 5713.0], [78.0, 5767.0], [78.1, 5767.0], [78.2, 5767.0], [78.3, 5767.0], [78.4, 5767.0], [78.5, 5767.0], [78.6, 5767.0], [78.7, 5767.0], [78.8, 5767.0], [78.9, 5767.0], [79.0, 5788.0], [79.1, 5788.0], [79.2, 5788.0], [79.3, 5788.0], [79.4, 5788.0], [79.5, 5788.0], [79.6, 5788.0], [79.7, 5788.0], [79.8, 5788.0], [79.9, 5788.0], [80.0, 5801.0], [80.1, 5801.0], [80.2, 5801.0], [80.3, 5801.0], [80.4, 5801.0], [80.5, 5801.0], [80.6, 5801.0], [80.7, 5801.0], [80.8, 5801.0], [80.9, 5801.0], [81.0, 5847.0], [81.1, 5847.0], [81.2, 5847.0], [81.3, 5847.0], [81.4, 5847.0], [81.5, 5847.0], [81.6, 5847.0], [81.7, 5847.0], [81.8, 5847.0], [81.9, 5847.0], [82.0, 6018.0], [82.1, 6018.0], [82.2, 6018.0], [82.3, 6018.0], [82.4, 6018.0], [82.5, 6018.0], [82.6, 6018.0], [82.7, 6018.0], [82.8, 6018.0], [82.9, 6018.0], [83.0, 6063.0], [83.1, 6063.0], [83.2, 6063.0], [83.3, 6063.0], [83.4, 6063.0], [83.5, 6063.0], [83.6, 6063.0], [83.7, 6063.0], [83.8, 6063.0], [83.9, 6063.0], [84.0, 6065.0], [84.1, 6065.0], [84.2, 6065.0], [84.3, 6065.0], [84.4, 6065.0], [84.5, 6065.0], [84.6, 6065.0], [84.7, 6065.0], [84.8, 6065.0], [84.9, 6065.0], [85.0, 6097.0], [85.1, 6097.0], [85.2, 6097.0], [85.3, 6097.0], [85.4, 6097.0], [85.5, 6097.0], [85.6, 6097.0], [85.7, 6097.0], [85.8, 6097.0], [85.9, 6097.0], [86.0, 6167.0], [86.1, 6167.0], [86.2, 6167.0], [86.3, 6167.0], [86.4, 6167.0], [86.5, 6167.0], [86.6, 6167.0], [86.7, 6167.0], [86.8, 6167.0], [86.9, 6167.0], [87.0, 6300.0], [87.1, 6300.0], [87.2, 6300.0], [87.3, 6300.0], [87.4, 6300.0], [87.5, 6300.0], [87.6, 6300.0], [87.7, 6300.0], [87.8, 6300.0], [87.9, 6300.0], [88.0, 6316.0], [88.1, 6316.0], [88.2, 6316.0], [88.3, 6316.0], [88.4, 6316.0], [88.5, 6316.0], [88.6, 6316.0], [88.7, 6316.0], [88.8, 6316.0], [88.9, 6316.0], [89.0, 6340.0], [89.1, 6340.0], [89.2, 6340.0], [89.3, 6340.0], [89.4, 6340.0], [89.5, 6340.0], [89.6, 6340.0], [89.7, 6340.0], [89.8, 6340.0], [89.9, 6340.0], [90.0, 6425.0], [90.1, 6425.0], [90.2, 6425.0], [90.3, 6425.0], [90.4, 6425.0], [90.5, 6425.0], [90.6, 6425.0], [90.7, 6425.0], [90.8, 6425.0], [90.9, 6425.0], [91.0, 6479.0], [91.1, 6479.0], [91.2, 6479.0], [91.3, 6479.0], [91.4, 6479.0], [91.5, 6479.0], [91.6, 6479.0], [91.7, 6479.0], [91.8, 6479.0], [91.9, 6479.0], [92.0, 6547.0], [92.1, 6547.0], [92.2, 6547.0], [92.3, 6547.0], [92.4, 6547.0], [92.5, 6547.0], [92.6, 6547.0], [92.7, 6547.0], [92.8, 6547.0], [92.9, 6547.0], [93.0, 6641.0], [93.1, 6641.0], [93.2, 6641.0], [93.3, 6641.0], [93.4, 6641.0], [93.5, 6641.0], [93.6, 6641.0], [93.7, 6641.0], [93.8, 6641.0], [93.9, 6641.0], [94.0, 6700.0], [94.1, 6700.0], [94.2, 6700.0], [94.3, 6700.0], [94.4, 6700.0], [94.5, 6700.0], [94.6, 6700.0], [94.7, 6700.0], [94.8, 6700.0], [94.9, 6700.0], [95.0, 6737.0], [95.1, 6737.0], [95.2, 6737.0], [95.3, 6737.0], [95.4, 6737.0], [95.5, 6737.0], [95.6, 6737.0], [95.7, 6737.0], [95.8, 6737.0], [95.9, 6737.0], [96.0, 6816.0], [96.1, 6816.0], [96.2, 6816.0], [96.3, 6816.0], [96.4, 6816.0], [96.5, 6816.0], [96.6, 6816.0], [96.7, 6816.0], [96.8, 6816.0], [96.9, 6816.0], [97.0, 6862.0], [97.1, 6862.0], [97.2, 6862.0], [97.3, 6862.0], [97.4, 6862.0], [97.5, 6862.0], [97.6, 6862.0], [97.7, 6862.0], [97.8, 6862.0], [97.9, 6862.0], [98.0, 6954.0], [98.1, 6954.0], [98.2, 6954.0], [98.3, 6954.0], [98.4, 6954.0], [98.5, 6954.0], [98.6, 6954.0], [98.7, 6954.0], [98.8, 6954.0], [98.9, 6954.0], [99.0, 7091.0], [99.1, 7091.0], [99.2, 7091.0], [99.3, 7091.0], [99.4, 7091.0], [99.5, 7091.0], [99.6, 7091.0], [99.7, 7091.0], [99.8, 7091.0], [99.9, 7091.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 1900.0, "maxY": 5.0, "series": [{"data": [[1900.0, 2.0], [2000.0, 1.0], [2100.0, 3.0], [2300.0, 3.0], [2200.0, 1.0], [2400.0, 1.0], [2500.0, 1.0], [2600.0, 4.0], [2700.0, 1.0], [2800.0, 3.0], [2900.0, 4.0], [3000.0, 1.0], [3100.0, 2.0], [3300.0, 2.0], [3200.0, 3.0], [3500.0, 2.0], [3700.0, 2.0], [3800.0, 3.0], [3900.0, 4.0], [4000.0, 2.0], [4100.0, 2.0], [4300.0, 4.0], [4200.0, 2.0], [4400.0, 2.0], [4500.0, 5.0], [4600.0, 1.0], [4700.0, 1.0], [5000.0, 4.0], [5100.0, 1.0], [5200.0, 4.0], [5300.0, 1.0], [5400.0, 3.0], [5500.0, 1.0], [5600.0, 1.0], [5700.0, 3.0], [5800.0, 2.0], [6000.0, 4.0], [6100.0, 1.0], [6300.0, 3.0], [6500.0, 1.0], [6600.0, 1.0], [6400.0, 2.0], [6700.0, 2.0], [6800.0, 2.0], [6900.0, 1.0], [7000.0, 1.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 7000.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 100.0, "minX": 2.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 100.0, "series": [{"data": [], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 100.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 50.800000000000026, "minX": 1.70326476E12, "maxY": 50.800000000000026, "series": [{"data": [[1.70326476E12, 50.800000000000026]], "isOverall": false, "label": "Users", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.70326476E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 18000000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 1904.0, "minX": 1.0, "maxY": 7091.0, "series": [{"data": [[2.0, 6862.0], [3.0, 6954.0], [5.0, 6389.5], [7.0, 6620.5], [8.0, 6641.0], [9.0, 6737.0], [10.0, 6340.0], [11.0, 6700.0], [12.0, 6097.0], [13.0, 6547.0], [14.0, 6316.0], [15.0, 5684.0], [16.0, 5767.0], [18.0, 6092.5], [20.0, 6064.0], [21.0, 5556.0], [22.0, 5476.0], [23.0, 5847.0], [24.0, 5801.0], [25.0, 5788.0], [26.0, 5713.0], [27.0, 5207.0], [28.0, 5105.0], [29.0, 5270.0], [30.0, 5459.0], [31.0, 5440.0], [33.0, 5312.0], [32.0, 5287.0], [35.0, 5033.0], [34.0, 5282.0], [36.0, 5099.0], [39.0, 5061.0], [38.0, 4786.0], [41.0, 4532.0], [40.0, 4556.0], [42.0, 4735.0], [45.0, 4556.0], [44.0, 4461.5], [47.0, 4561.0], [46.0, 4335.0], [48.0, 4476.0], [51.0, 4339.0], [50.0, 4240.5], [53.0, 4282.0], [55.0, 4106.0], [54.0, 4301.0], [57.0, 3747.0], [56.0, 3838.0], [59.0, 4063.5], [61.0, 4020.0], [60.0, 3810.0], [62.0, 3950.0], [67.0, 3226.0], [66.0, 3595.0], [65.0, 3924.0], [64.0, 3882.0], [71.0, 3202.0], [70.0, 3290.0], [69.0, 3379.0], [68.0, 3775.0], [75.0, 2940.0], [74.0, 3518.0], [73.0, 3394.0], [72.0, 3110.0], [79.0, 3193.0], [78.0, 2574.0], [77.0, 2647.0], [76.0, 2899.0], [82.0, 2784.0], [80.0, 2933.0], [87.0, 2884.0], [85.0, 2950.0], [84.0, 2685.5], [91.0, 2100.0], [90.0, 2752.0], [88.0, 2339.0], [95.0, 2409.0], [94.0, 2364.0], [93.0, 2650.0], [92.0, 2704.0], [99.0, 1904.0], [97.0, 2096.5], [100.0, 2127.0], [1.0, 7091.0]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[50.800000000000026, 4360.18]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 195.0, "minX": 1.70326476E12, "maxY": 361959.13333333336, "series": [{"data": [[1.70326476E12, 361959.13333333336]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.70326476E12, 195.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.70326476E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 18000000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 4360.18, "minX": 1.70326476E12, "maxY": 4360.18, "series": [{"data": [[1.70326476E12, 4360.18]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.70326476E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 18000000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 4176.45, "minX": 1.70326476E12, "maxY": 4176.45, "series": [{"data": [[1.70326476E12, 4176.45]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.70326476E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 18000000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 2154.12, "minX": 1.70326476E12, "maxY": 2154.12, "series": [{"data": [[1.70326476E12, 2154.12]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.70326476E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 18000000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 1904.0, "minX": 1.70326476E12, "maxY": 7091.0, "series": [{"data": [[1.70326476E12, 7091.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.70326476E12, 1904.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.70326476E12, 6416.500000000001]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.70326476E12, 7089.629999999999]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.70326476E12, 4318.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.70326476E12, 6735.15]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.70326476E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 18000000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 3068.0, "minX": 7.0, "maxY": 6816.0, "series": [{"data": [[18.0, 5276.0], [20.0, 3068.0], [25.0, 4211.0], [7.0, 6816.0], [15.0, 4180.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 25.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 2883.0, "minX": 7.0, "maxY": 6358.0, "series": [{"data": [[18.0, 5152.5], [20.0, 2883.0], [25.0, 4007.0], [7.0, 6358.0], [15.0, 3977.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 25.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 1.6666666666666667, "minX": 1.70326476E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.70326476E12, 1.6666666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.70326476E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 18000000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 1.6666666666666667, "minX": 1.70326476E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.70326476E12, 1.6666666666666667]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.70326476E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 18000000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 1.6666666666666667, "minX": 1.70326476E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.70326476E12, 1.6666666666666667]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.70326476E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 18000000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 1.6666666666666667, "minX": 1.70326476E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.70326476E12, 1.6666666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.70326476E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 18000000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

