$(function () {
    var ifm= document.getElementById("content_main");
    ifm.height=document.documentElement.clientHeight - 28;
    vm.initPage();	
})
var vm = new Vue({
	el: '#content_main',
	data: {
        total:[],
        //趋势图TOP趋势图数据
        qushi:{
            //国内Top20省份
            China:{
                date: [],
                confirmedNum: [],
                suspectedNum: [],
                deathsNum: [],
                curesNum: []
            },
            //世界其他国Top20
            otherCountry:{
                country: [],
                confirmedNum: [],
                suspectedNum: [],
                deathsNum: [],
                curesNum: []
            },
            //湖北Top地区数据
            hubei:{
                city: [],
                confirmedNum: [],
                suspectedNum: [],
                deathsNum: [],
                curesNum: []
            }
        },
        //地市数据列表
        provinceData:{
            province: [],
            confirmedNum: [],
            suspectedNum: [],
            deathsNum: [],
            curesNum: []
        },
        //中国地图数据
        mapData:{
            confirm: [],
            dead: [],
            cured: []
        },
        //地市下钻控制
        clickProvince:[]
    },
	methods: {
		initPage: function() {
            var this_=this;

            /**
             * 1.全国近10天疫情累计趋势
             *   国外疫情Top
             *   顶部累计数据 
             */
            $.ajax({
                url: "https://myapi.ihogu.com/public/?s=Whfy.count",
                contentType: "application/x-www-form-urlencoded",
                data: {
                    //country: "中国",
                    page: 1,//页码
                    limit: 500//每页n条
                },
                success: function(r){
                    //alert(JSON.stringify(r));
                    var count1=0;
                    var count2=0;
                    var China={
                        date: [],
                        confirmedNum: [],
                        suspectedNum: [],
                        deathsNum: [],
                        curesNum: []
                    };
                    for(var i=0;i<r.data.items.length;i++){
                        //中国近10天
                        if(r.data.items[i].country=='中国'){
                            if(count1<10){
                                ++count1;
                                China.date.push(r.data.items[i].create_time);
                                China.confirmedNum.push(r.data.items[i].confirm);
                                China.suspectedNum.push(r.data.items[i].suspect);
                                China.deathsNum.push(r.data.items[i].dead);
                                China.curesNum.push(r.data.items[i].heal);
                            }
                        }else{
                            //其他国家Top20
                            if(count2<20){
                                ++count2;
                                this_.qushi.otherCountry.country.push(r.data.items[i].country);
                                this_.qushi.otherCountry.confirmedNum.push(r.data.items[i].confirm);
                                this_.qushi.otherCountry.suspectedNum.push(r.data.items[i].suspect);
                                this_.qushi.otherCountry.deathsNum.push(r.data.items[i].dead);
                                this_.qushi.otherCountry.curesNum.push(r.data.items[i].heal);
                            }
                        }
                    }
                    //中国近10天
                    for(var i=count1-1;i>=0;i--){
                        this_.qushi.China.date.push(China.date[i]);
                        this_.qushi.China.confirmedNum.push(China.confirmedNum[i]);
                        this_.qushi.China.suspectedNum.push(China.suspectedNum[i]);
                        this_.qushi.China.deathsNum.push(China.deathsNum[i]);
                        this_.qushi.China.curesNum.push(China.curesNum[i]);
                    }

                    $("#diagnosed").text(r.data.items[0].confirm);
                    $("#suspect").text(r.data.items[0].suspect);
                    $("#death").text(r.data.items[0].dead);
                    $("#cured").text(r.data.items[0].heal); 

                    this_.echarts_2();
                    this_.echarts_4();
                }
            });
            /**
             * 湖北
            */
            $.ajax({
                url: "https://myapi.ihogu.com/public/?s=Whfy.city",
                contentType: "application/x-www-form-urlencoded",
                data: {
                    page: 1,//页码
                    limit: 50,//每页n条
                    country: "中国",
                    area: "湖北"//省
                    //city: "达州"//市
                },
                success: function(r){
                    var count=0;
                    for(var i=0;i<r.data.items.length;i++){
                        if(count<18){
                            ++count;
                            this_.qushi.hubei.city.push(r.data.items[i].city);
                            this_.qushi.hubei.confirmedNum.push(r.data.items[i].confirm);
                            this_.qushi.hubei.suspectedNum.push(r.data.items[i].suspect);
                            this_.qushi.hubei.deathsNum.push(r.data.items[i].dead);
                            this_.qushi.hubei.curesNum.push(r.data.items[i].heal);
                        }
                    }
                    this_.echarts_3();
                }
            });
            //https://tianqiapi.com/api?version=epidemic&appid=23035354&appsecret=o7cxoPn6
			$.ajax({
                url: "https://www.tianqiapi.com/api?version=epidemic&appid=26352188&appsecret=o7cxoPn6",//"https://www.tianqiapi.com/api?version=epidemic&appid=26352188&appsecret=o7cxoPn6",
                contentType: "application/x-www-form-urlencoded",
                data: {
                },
                success: function(r){
                    //alert(JSON.stringify(r.data));
                    this_.total=r.data;
                    var appendTr='';
                    for(var i=0;i<r.data.area.length;i++){
                        
                        var provinceName=r.data.area[i].provinceShortName;
                        /**
                         * 生成省份数据
                        */
                        appendTr+='<tr id="tr_'+provinceName+'">';
                        appendTr+='   <td style="width: 25%;float: left;text-align: center;margin-top: 5px;color: white;font-size: 20px;cursor: pointer;" class="add" id="'+provinceName+'">'+r.data.area[i].provinceShortName+'</td>';
                        appendTr+='   <td style="width: 25%;float: left;text-align: center;margin-top: 5px;color: white;font-size: 20px;">'+r.data.area[i].confirmedCount+'</td>';
                        appendTr+='   <td style="width: 25%;float: left;text-align: center;margin-top: 5px;color: white;font-size: 20px;">'+r.data.area[i].deadCount+'</td>';
                        appendTr+='   <td style="width: 25%;float: left;text-align: center;margin-top: 5px;color: white;font-size: 20px;">'+r.data.area[i].curedCount+'</td>';
                        appendTr+='</tr>';
                         
                        var confirm_md={
                            name: r.data.area[i].provinceShortName,
                            value: r.data.area[i].confirmedCount
                        }
                        var dead_md={
                            name: r.data.area[i].provinceShortName,
                            value: r.data.area[i].deadCount
                        }
                        var cured_md={
                            name: r.data.area[i].provinceShortName,
                            value: r.data.area[i].curedCount
                        }
                        this_.mapData.confirm.push(confirm_md);
                        this_.mapData.dead.push(dead_md);
                        this_.mapData.cured.push(cured_md);
                        if(i<20){
                            vm.provinceData.province.push(r.data.area[i].provinceShortName);
                            vm.provinceData.confirmedNum.push(r.data.area[i].confirmedCount);
                            vm.provinceData.suspectedNum.push(r.data.area[i].suspectedCount);
                            vm.provinceData.deathsNum.push(r.data.area[i].deadCount);
                            vm.provinceData.curesNum.push(r.data.area[i].curedCount);
                        }
                    }
                    //列表动态生成
                    $("#addDataTr").after(appendTr);
                    //下钻点击事件
                    $(".add").click(function(){
                        
                        var date = new Date();
                        var year = date.getFullYear();
                        var month = date.getMonth() + 1;
                        var strDate = date.getDate();
                        if (month >= 1 && month <= 9) {
                            month = '0' + month;
                        }
                        if (strDate >= 0 && strDate <= 9) {
                            strDate = '0' + strDate;
                        }
                        var time = year + '-' + month + '-' + strDate;
                        var provinceName=$(this).attr("id");
                        for(var k=0;k<vm.clickProvince.length;k++){
                            if(vm.clickProvince[k].provinceName==provinceName){
                                if(vm.clickProvince[k].isOn==1){
                                    $(".city_"+provinceName).hide();
                                    this_.clickProvince[k].isOn=0;
                                    return;
                                }else{
                                    $(".city_"+provinceName).show();
                                    this_.clickProvince[k].isOn=1;
                                    return;
                                }
                            }
                        }
                        $.ajax({
                            url: "https://myapi.ihogu.com/public/?s=Whfy.city",
                            contentType: "application/x-www-form-urlencoded",
                            data: {
                                page: 1,//页码
                                limit: 500,//每页n条
                                country: "中国",
                                area: provinceName//省
                                //city: "达州"//市
                            },
                            success: function(Re){
                                var appendTr_tr='';
                                //alert(time);
                                //alert(JSON.stringify(Re.data.items));
                                for(var j=0;j<Re.data.items.length;j++){
                                    if(time==Re.data.items[j].create_time){
                                        appendTr_tr+='<tr class="city_'+provinceName+'">';
                                        appendTr_tr+='   <td style="width: 25%;float: left;text-align: center;margin-top: 5px;color: red;font-size: 15px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+Re.data.items[j].city+'</td>';
                                        appendTr_tr+='   <td style="width: 25%;float: left;text-align: center;margin-top: 5px;color: red;font-size: 15px;">'+Re.data.items[j].confirm+'</td>';
                                        appendTr_tr+='   <td style="width: 25%;float: left;text-align: center;margin-top: 5px;color: red;font-size: 15px;">'+Re.data.items[j].dead+'</td>';
                                        appendTr_tr+='   <td style="width: 25%;float: left;text-align: center;margin-top: 5px;color: red;font-size: 15px;">'+Re.data.items[j].heal+'</td>';
                                        appendTr_tr+='</tr>';
                                    }
                                }
                                
                                $("#tr_"+provinceName).after(appendTr_tr);
                                var param={
                                    "provinceName": provinceName,
                                    "isOn": 1
                                }
                                vm.clickProvince.push(param);
                            }
                        });
                        
                    });
                    //alert(JSON.stringify(r.data.area));

                    $("#diagnosedIncr").html('&#8593;'+r.data.diagnosedIncr);
                    $("#suspectIncr").html('&#8593;'+r.data.suspectIncr);
                    $("#deathIncr").html('&#8593;'+r.data.deathIncr);
                    $("#curedIncr").html('&#8593;'+r.data.curedIncr); 
                    this_.echarts_1();
                    this_.initMap();
                    /**
                     * echart5
                     */
                    var append='<li class="alltitle" style="color: yellow;font-size: 15px;margin-top: 2px;text-align: left;">截止：'+r.data.date+'</li>';
                    for(var i=0;i<r.data.list.length;i++){
                        append+='<li class="alltitle" style="color: red;font-size: 15px;margin-top: 2px;text-align: left;">'+r.data.list[i]+'</li>';
                    }
                    append='<ul>'+append+'</ul>';
                    $("#echart5").html(append);
                    var append1='<li class="alltitle" style="color: yellow;font-size: 15px;margin-top: 2px;text-align: left;">1.尽量不外出,待在家里就是为国家做贡献</li>';
                    append1+='<li class="alltitle" style="color: yellow;font-size: 15px;margin-top: 2px;text-align: left;">2.勤洗手，戴口罩,爱护自己，也是尊重他人</li>';
                    append1+='<li class="alltitle" style="color: yellow;font-size: 15px;margin-top: 2px;text-align: left;">注：本系统数据均从网络接口获取,不保证数据绝对的精确性和及时性（本人学习使用，仅供参考）</li>';
                    append1='<ul>'+append1+'</ul>';
                    $("#echart6").html(append1);
                }
            });
        },
        initMap: function(){
            var mydata = vm.mapData;
            var optionMap = {
                backgroundColor:'rgba(128, 128, 128, 0)',
                //backgroundColor: '#FFFFFF',  
                title: {  
                    //text: '国内疫情地图',  
                    subtext: '', 
                    x:'center',
                    textStyle: {
                        color: 'white'
                    }
                }, 
                
                //左侧小导航图标
                visualMap: {  
                    show : true,
                    calculable: false,
                    calculableColor: 'white',
                    orient: 'vertical',
                    x:'right',      //可设定图例在左、右、居中
                    y:'center',     //可设定图例在上、下、居中
                    //padding:[50,255,0,0],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
                    textStyle: {
                        color: 'white',
                        //fontSize: 25
                    },
                    splitList: [
                        {start:5000},
                        {start: 1000, end:4999},  
                        {start: 500, end: 999},
                        {start: 100, end: 499},  
                        {start: 10, end: 99},
                        {start: 0, end: 9},  
                    ]
                },   
                tooltip : {  
                    trigger: 'item',
                    formatter:function(params){
                        //定义一个res变量来保存最终返回的字符结果,并且先把地区名称放到里面
                        var region=params.name;
                        var res=region+'<br />';
                        //循环遍历series数据系列
                        for(var j=0;j<mydata.confirm.length;j++){
                            if(mydata.confirm[j].name==region){
                                res+='确诊:'+mydata.confirm[j].value+'<br />';
                            }
                            if(mydata.dead[j].name==region){
                                res+='死亡:'+mydata.dead[j].value+'<br />';
                            }
                            if(mydata.cured[j].name==region){
                                res+='治愈:'+mydata.cured[j].value+'<br />';
                            }
                        }
                        //返回res
                        //console.log(res);
                        return res;                
                    },
                },  
                //配置属性
                series: [{  
                    name: '确诊人数',  
                    type: 'map',  
                    mapType: 'china',   
                    roam: true,
                    zoom: 1.2,
                    
                    label: {  
                        normal: {  
                            show: true  //省份名称  
                        },  
                        emphasis: {  
                            show: true  
                        }  
                    },  
                    data:mydata.confirm  //数据
                },{  
                    name: '死亡人数',  
                    type: 'map',  
                    mapType: 'china',   
                    roam: true,
                    zoom: 1.2,
                    
                    label: {  
                        normal: {  
                            show: true  //省份名称  
                        },  
                        emphasis: {  
                            show: true  
                        }  
                    },  
                    data:mydata.dead  //数据
                },{  
                    name: '治愈人数',  
                    type: 'map',  
                    mapType: 'china',   
                    roam: true,
                    zoom: 1.2,
                    
                    label: {  
                        normal: {  
                            show: true  //省份名称  
                        },  
                        emphasis: {  
                            show: true  
                        }  
                    },  
                    data:mydata.cured  //数据
                }]  
            };  
            //初始化echarts实例
            var myChart = echarts.init(document.getElementById('map_1'));
        
            //使用制定的配置项和数据显示图表
            myChart.setOption(optionMap);
        },
        /**
         * 全国疫情重点地区TOP10
         * */
        echarts_1: function() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('echart1'));
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#dddc6b'
                        }
                    }
                },
                legend: {
                    top:'0%',
                    data:['确诊','死亡','治愈'],
                    extStyle: {
                        color: 'rgba(255,255,255,.5)'
                    },
                    textStyle: {
                        color: 'yellow',
                        fontSize: 20
                    },
                },
                grid: {
                    left: '0',
                    top: '60',
                    right: '0',
                    bottom: '0',
                    containLabel: true
                },
                //X轴
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisLabel:  {
                        interval: 0,
                        textStyle: {
                            color: "rgba(255,255,255,.6)"
                        },
                        rotate: 30
                    },
                    axisLine: {
                        lineStyle: { 
                            color: 'rgba(255,255,255,.2)'
                        }
                    },
                    data: vm.provinceData.province//['01', '02', '03', '04', '05', '06', '07', '08', '09', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']

                }, {
                    axisPointer: {show: false},
                    axisLine: {  show: false},
                    position: 'bottom',
                    offset: 20,
                }],

                yAxis: [{
                    type: 'value',
                    axisTick: {show: false},
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,.1)'
                        }
                    },
                    axisLabel:  {
                        textStyle: {
                            color: "rgba(255,255,255,.6)"
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,.1)'
                        }
                    }
                },{
                    type: 'value',
                    axisTick: {show: false},
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,.1)'
                        }
                    },
                    axisLabel:  {
                        textStyle: {
                            color: "rgba(255,255,255,.6)"
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,.1)'
                        }
                    }
                }],
               // data:['确诊','疑似','死亡','治愈'],
                series: [{
                    name: '确诊',
                    type: 'line',
                    smooth: false,//平滑or曲线
                    //symbol: 'cricle',
                    symbolSize: 5,
                    showSymbol: true,
                    lineStyle: {
                        normal: {
                            color: '#0184d5',
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(1, 132, 213, 0.4)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(1, 132, 213, 0.1)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#0184d5',
                            borderColor: 'rgba(221, 220, 107, .1)',
                            borderWidth: 12
                        }
                    },
                    data: vm.provinceData.confirmedNum//[3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4,3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4]
                },
                {
                    name: '死亡',
                    yAxisIndex: 1,
                    type: 'line',
                    //barWidth:'10%', //柱子宽度
                    smooth: false,//平滑or曲线
                    //symbol: 'cricle',
                    symbolSize: 5,
                    showSymbol: true,
                    lineStyle: {
                        normal: {
                            color: 'red',
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 216, 135, 0.4)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(0, 216, 135, 0.1)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                        }
                    },
                        itemStyle: {
                        normal: {
                            color: 'red',
                            borderColor: 'rgba(221, 220, 107, .1)',
                            borderWidth: 12
                        }
                    },
                    data: vm.provinceData.deathsNum//[5, 3, 5, 6, 1, 5, 3, 5, 6, 4, 6, 4, 8, 3, 5, 6, 1, 5, 3, 7, 2, 5, 1, 4]
                }, 
                {
                    name: '治愈',
                    yAxisIndex: 1,
                    //type: 'line',
                    type: 'line',
                    //barWidth:'10%', //柱子宽度
                    smooth: false,//平滑or曲线
                    //symbol: 'cricle',
                    symbolSize: 5,
                    showSymbol: true,
                    lineStyle: {
                        normal: {
                            color: '#00d887',
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 216, 135, 0.4)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(0, 216, 135, 0.1)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                        }
                    },
                        itemStyle: {
                        normal: {
                            color: '#00d887',
                            borderColor: 'rgba(221, 220, 107, .1)',
                            borderWidth: 12
                        }
                    },
                    data: vm.provinceData.curesNum//[5, 3, 5, 6, 1, 5, 3, 5, 6, 4, 6, 4, 8, 3, 5, 6, 1, 5, 3, 7, 2, 5, 1, 4]
                }, 
            ]};   
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize",function(){
                myChart.resize();
            });
        },

         /**
         * 全国疫情重点地区TOP10
         * */
        echarts_2: function() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('echart2'));
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#dddc6b'
                        }
                    }
                },
                legend: {
                    top:'0%',
                    data:['确诊','死亡','治愈'],
                    extStyle: {
                        color: 'rgba(255,255,255,.5)'
                    },
                    textStyle: {
                        color: 'yellow',
                        fontSize: 20
                    }
                },
                grid: {
                    left: '0',
                    top: '60',
                    right: '0',
                    bottom: '0',
                    containLabel: true
                },
                //X轴
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisLabel:  {
                        interval: 0,
                        textStyle: {
                            color: "rgba(255,255,255,.6)"
                        },
                        rotate: 30
                    },
                    axisLine: {
                        lineStyle: { 
                            color: 'rgba(255,255,255,.2)'
                        }
                    },
                    data: vm.qushi.otherCountry.country//['01', '02', '03', '04', '05', '06', '07', '08', '09', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']

                }, {
                    axisPointer: {show: false},
                    axisLine: {  show: false},
                    position: 'bottom',
                    offset: 20,
                }],

                yAxis: [{
                    type: 'value',
                    axisTick: {show: false},
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,.1)'
                        }
                    },
                    axisLabel:  {
                        textStyle: {
                            color: "rgba(255,255,255,.6)"
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,.1)'
                        }
                    }
                },{
                    type: 'value',
                    axisTick: {show: false},
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,.1)'
                        }
                    },
                    axisLabel:  {
                        textStyle: {
                            color: "rgba(255,255,255,.6)"
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,.1)'
                        }
                    }
                }],
               // data:['确诊','疑似','死亡','治愈'],
                series: [{
                    name: '确诊',
                    type: 'line',
                    smooth: false,//平滑or曲线
                    //symbol: 'cricle',
                    symbolSize: 5,
                    showSymbol: true,
                    lineStyle: {
                        normal: {
                            color: '#0184d5',
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(1, 132, 213, 0.4)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(1, 132, 213, 0.1)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#0184d5',
                            borderColor: 'rgba(221, 220, 107, .1)',
                            borderWidth: 12
                        }
                    },
                    data: vm.qushi.otherCountry.confirmedNum//[3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4,3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4]
                },
                {
                    name: '死亡',
                    yAxisIndex: 1,
                    type: 'line',
                    //barWidth:'10%', //柱子宽度
                    smooth: false,//平滑or曲线
                    //symbol: 'cricle',
                    symbolSize: 5,
                    showSymbol: true,
                    lineStyle: {
                        normal: {
                            color: 'red',
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 216, 135, 0.4)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(0, 216, 135, 0.1)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                        }
                    },
                        itemStyle: {
                        normal: {
                            color: 'red',
                            borderColor: 'rgba(221, 220, 107, .1)',
                            borderWidth: 12
                        }
                    },
                    data: vm.qushi.otherCountry.deathsNum//[5, 3, 5, 6, 1, 5, 3, 5, 6, 4, 6, 4, 8, 3, 5, 6, 1, 5, 3, 7, 2, 5, 1, 4]
                }, 
                {
                    name: '治愈',
                    yAxisIndex: 1,
                    //type: 'line',
                    type: 'line',
                    //barWidth:'10%', //柱子宽度
                    smooth: false,//平滑or曲线
                    //symbol: 'cricle',
                    symbolSize: 5,
                    showSymbol: true,
                    lineStyle: {
                        normal: {
                            color: '#00d887',
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 216, 135, 0.4)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(0, 216, 135, 0.1)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                        }
                    },
                        itemStyle: {
                        normal: {
                            color: '#00d887',
                            borderColor: 'rgba(221, 220, 107, .1)',
                            borderWidth: 12
                        }
                    },
                    data: vm.qushi.otherCountry.curesNum//[5, 3, 5, 6, 1, 5, 3, 5, 6, 4, 6, 4, 8, 3, 5, 6, 1, 5, 3, 7, 2, 5, 1, 4]
                }, 
            ]};   
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize",function(){
                myChart.resize();
            });
        },

        /**
         * 全国疫情重点地区TOP10
         * */
        echarts_3: function() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('echart3'));
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#dddc6b'
                        }
                    }
                },
                legend: {
                    top:'0%',
                    data:['确诊','死亡','治愈'],
                    extStyle: {
                        color: 'rgba(255,255,255,.5)'
                    },
                    textStyle: {
                        color: 'yellow',
                        fontSize: 20
                    },
                },
                grid: {
                    left: '0',
                    top: '60',
                    right: '0',
                    bottom: '0',
                    containLabel: true
                },
                //X轴
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisLabel:  {
                        interval: 0,
                        textStyle: {
                            color: "rgba(255,255,255,.6)"
                        },
                        rotate: 30
                    },
                    axisLine: {
                        lineStyle: { 
                            color: 'rgba(255,255,255,.2)'
                        }
                    },
                    data: vm.qushi.hubei.city//['01', '02', '03', '04', '05', '06', '07', '08', '09', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']

                }, {
                    axisPointer: {show: false},
                    axisLine: {  show: false},
                    position: 'bottom',
                    offset: 20,
                }],

                yAxis: [{
                    type: 'value',
                    axisTick: {show: false},
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,.1)'
                        }
                    },
                    axisLabel:  {
                        textStyle: {
                            color: "rgba(255,255,255,.6)"
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,.1)'
                        }
                    }
                },{
                    type: 'value',
                    axisTick: {show: false},
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,.1)'
                        }
                    },
                    axisLabel:  {
                        textStyle: {
                            color: "rgba(255,255,255,.6)"
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,.1)'
                        }
                    }
                }],
               // data:['确诊','疑似','死亡','治愈'],
                series: [{
                    name: '确诊',
                    type: 'line',
                    smooth: false,//平滑or曲线
                    //symbol: 'cricle',
                    symbolSize: 5,
                    showSymbol: true,
                    lineStyle: {
                        normal: {
                            color: '#0184d5',
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(1, 132, 213, 0.4)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(1, 132, 213, 0.1)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#0184d5',
                            borderColor: 'rgba(221, 220, 107, .1)',
                            borderWidth: 12
                        }
                    },
                    data: vm.qushi.hubei.confirmedNum//[3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4,3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4]
                },
                {
                    name: '死亡',
                    yAxisIndex: 1,
                    type: 'line',
                    //barWidth:'10%', //柱子宽度
                    smooth: false,//平滑or曲线
                    //symbol: 'cricle',
                    symbolSize: 5,
                    showSymbol: true,
                    lineStyle: {
                        normal: {
                            color: 'red',
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 216, 135, 0.4)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(0, 216, 135, 0.1)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                        }
                    },
                        itemStyle: {
                        normal: {
                            color: 'red',
                            borderColor: 'rgba(221, 220, 107, .1)',
                            borderWidth: 12
                        }
                    },
                    data: vm.qushi.hubei.deathsNum//[5, 3, 5, 6, 1, 5, 3, 5, 6, 4, 6, 4, 8, 3, 5, 6, 1, 5, 3, 7, 2, 5, 1, 4]
                }, 
                {
                    name: '治愈',
                    yAxisIndex: 1,
                    //type: 'line',
                    type: 'line',
                    //barWidth:'10%', //柱子宽度
                    smooth: false,//平滑or曲线
                    //symbol: 'cricle',
                    symbolSize: 5,
                    showSymbol: true,
                    lineStyle: {
                        normal: {
                            color: '#00d887',
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 216, 135, 0.4)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(0, 216, 135, 0.1)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                        }
                    },
                        itemStyle: {
                        normal: {
                            color: '#00d887',
                            borderColor: 'rgba(221, 220, 107, .1)',
                            borderWidth: 12
                        }
                    },
                    data: vm.qushi.hubei.curesNum//[5, 3, 5, 6, 1, 5, 3, 5, 6, 4, 6, 4, 8, 3, 5, 6, 1, 5, 3, 7, 2, 5, 1, 4]
                }, 
            ]};   
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize",function(){
                myChart.resize();
            });
        },


        /**
         * 近10天全国疫情累计趋势
         * */
        echarts_4: function() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('echart4'));
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#dddc6b'
                        }
                    }
                },
                legend: {
                    top:'0%',
                    data:['确诊','疑似','死亡','治愈'],
                    extStyle: {
                        color: 'rgba(255,255,255,.5)'
                    },
                    textStyle: {
                        color: 'yellow',
                        fontSize: 20
                    },
                },
                grid: {
                    left: '0',
                    top: '60',
                    right: '0',
                    bottom: '0',
                    containLabel: true
                },
                //X轴
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisLabel:  {
                        interval: 0,
                        textStyle: {
                            color: "rgba(255,255,255,.6)",
                        },
                        rotate: 30
                    },
                    axisLine: {
                        lineStyle: { 
                            color: 'rgba(255,255,255,.2)'
                        }
                    },
                    data: vm.qushi.China.date//['01', '02', '03', '04', '05', '06', '07', '08', '09', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']

                }, {
                    axisPointer: {show: false},
                    axisLine: {  show: false},
                    position: 'bottom',
                    offset: 20,
                }],

                yAxis: [{
                    type: 'value',
                    axisTick: {show: false},
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,.1)'
                        }
                    },
                    axisLabel:  {
                        textStyle: {
                            color: "rgba(255,255,255,.6)",
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,.1)'
                        }
                    }
                },{
                    type: 'value',
                    axisTick: {show: false},
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,.1)'
                        }
                    },
                    axisLabel:  {
                        textStyle: {
                            color: "rgba(255,255,255,.6)"
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,.1)'
                        }
                    }
                }
                ],
               // data:['确诊','疑似','死亡','治愈'],
                series: [{
                    name: '确诊',
                    type: 'line',
                    smooth: false,//平滑or曲线
                    //symbol: 'cricle',
                    symbolSize: 5,
                    showSymbol: true,
                    lineStyle: {
                        normal: {
                            color: '#0184d5',
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(1, 132, 213, 0.4)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(1, 132, 213, 0.1)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#0184d5',
                            borderColor: 'rgba(221, 220, 107, .1)',
                            borderWidth: 12
                        }
                    },
                    data: vm.qushi.China.confirmedNum//[3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4,3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4]
                }, 
                {
                    name: '疑似',
                    type: 'line',
                    smooth: false,//平滑or曲线
                    //symbol: 'cricle',
                    symbolSize: 5,
                    showSymbol: true,
                    lineStyle: {
                        normal: {
                            color: 'yellow',
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 216, 135, 0.4)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(0, 216, 135, 0.1)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                        }
                    },
                        itemStyle: {
                        normal: {
                            color: 'yellow',
                            borderColor: 'rgba(221, 220, 107, .1)',
                            borderWidth: 12
                        }
                    },
                    data: vm.qushi.China.suspectedNum//[5, 3, 5, 6, 1, 5, 3, 5, 6, 4, 6, 4, 8, 3, 5, 6, 1, 5, 3, 7, 2, 5, 1, 4]
                },
                {
                    name: '死亡',
                    yAxisIndex: 1,
                    type: 'line',
                    smooth: false,//平滑or曲线
                    //symbol: 'cricle',
                    symbolSize: 5,
                    showSymbol: true,
                    lineStyle: {
                        normal: {
                            color: 'red',
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 216, 135, 0.4)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(0, 216, 135, 0.1)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                        }
                    },
                        itemStyle: {
                        normal: {
                            color: 'red',
                            borderColor: 'rgba(221, 220, 107, .1)',
                            borderWidth: 12
                        }
                    },
                    data: vm.qushi.China.deathsNum//[5, 3, 5, 6, 1, 5, 3, 5, 6, 4, 6, 4, 8, 3, 5, 6, 1, 5, 3, 7, 2, 5, 1, 4]
                }, 
                {
                    name: '治愈',
                    yAxisIndex: 1,
                    type: 'line',
                    smooth: false,//平滑or曲线
                    //symbol: 'cricle',
                    symbolSize: 5,
                    showSymbol: true,
                    lineStyle: {
                        normal: {
                            color: '#00d887',
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 216, 135, 0.4)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(0, 216, 135, 0.1)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                        }
                    },
                        itemStyle: {
                        normal: {
                            color: '#00d887',
                            borderColor: 'rgba(221, 220, 107, .1)',
                            borderWidth: 12
                        }
                    },
                    data: vm.qushi.China.curesNum//[5, 3, 5, 6, 1, 5, 3, 5, 6, 4, 6, 4, 8, 3, 5, 6, 1, 5, 3, 7, 2, 5, 1, 4]
                }, 
            ]};   
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize",function(){
                myChart.resize();
            });
        }        
	}
})
