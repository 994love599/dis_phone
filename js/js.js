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
        WordMap:{
            confirm: [],
            dead: [],
            cured: []
        },
        nameMap:{
            "Canada": "加拿大",
            "Turkmenistan": "土库曼斯坦",
            "Saint Helena": "圣赫勒拿",
            "Lao PDR": "老挝",
            "Lithuania": "立陶宛",
            "Cambodia": "柬埔寨",
            "Ethiopia": "埃塞俄比亚",
            "Faeroe Is.": "法罗群岛",
            "Swaziland": "斯威士兰",
            "Palestine": "巴勒斯坦",
            "Belize": "伯利兹",
            "Argentina": "阿根廷",
            "Bolivia": "玻利维亚",
            "Cameroon": "喀麦隆",
            "Burkina Faso": "布基纳法索",
            "Aland": "奥兰群岛",
            "Bahrain": "巴林",
            "Saudi Arabia": "沙特阿拉伯",
            "Fr. Polynesia": "法属波利尼西亚",
            "Cape Verde": "佛得角",
            "W. Sahara": "西撒哈拉",
            "Slovenia": "斯洛文尼亚",
            "Guatemala": "危地马拉",
            "Guinea": "几内亚",
            "Dem. Rep. Congo": "刚果（金）",
            "Germany": "德国",
            "Spain": "西班牙",
            "Liberia": "利比里亚",
            "Netherlands": "荷兰",
            "Jamaica": "牙买加",
            "Solomon Is.": "所罗门群岛",
            "Oman": "阿曼",
            "Tanzania": "坦桑尼亚",
            "Costa Rica": "哥斯达黎加",
            "Isle of Man": "曼岛",
            "Gabon": "加蓬",
            "Niue": "纽埃",
            "Bahamas": "巴哈马",
            "New Zealand": "新西兰",
            "Yemen": "也门",
            "Jersey": "泽西岛",
            "Pakistan": "巴基斯坦",
            "Albania": "阿尔巴尼亚",
            "Samoa": "萨摩亚",
            "Czech Rep.": "捷克",
            "United Arab Emirates": "阿拉伯联合酋长国",
            "Guam": "关岛",
            "India": "印度",
            "Azerbaijan": "阿塞拜疆",
            "N. Mariana Is.": "北马里亚纳群岛",
            "Lesotho": "莱索托",
            "Kenya": "肯尼亚",
            "Belarus": "白俄罗斯",
            "Tajikistan": "塔吉克斯坦",
            "Turkey": "土耳其",
            "Afghanistan": "阿富汗",
            "Bangladesh": "孟加拉国",
            "Mauritania": "毛里塔尼亚",
            "Dem. Rep. Korea": "朝鲜",
            "Saint Lucia": "圣卢西亚",
            "Br. Indian Ocean Ter.": "英属印度洋领地",
            "Mongolia": "蒙古",
            "France": "法国",
            "Cura?ao": "库拉索岛",
            "S. Sudan": "南苏丹",
            "Rwanda": "卢旺达",
            "Slovakia": "斯洛伐克",
            "Somalia": "索马里",
            "Peru": "秘鲁",
            "Vanuatu": "瓦努阿图",
            "Norway": "挪威",
            "Malawi": "马拉维",
            "Benin": "贝宁",
            "St. Vin. and Gren.": "圣文森特和格林纳丁斯",
            "Korea": "韩国",
            "Singapore": "新加坡",
            "Montenegro": "黑山共和国",
            "Cayman Is.": "开曼群岛",
            "Togo": "多哥",
            "China": "中国",
            "Heard I. and McDonald Is.": "赫德岛和麦克唐纳群岛",
            "Armenia": "亚美尼亚",
            "Falkland Is.": "马尔维纳斯群岛（福克兰）",
            "Ukraine": "乌克兰",
            "Ghana": "加纳",
            "Tonga": "汤加",
            "Finland": "芬兰",
            "Libya": "利比亚",
            "Dominican Rep.": "多米尼加",
            "Indonesia": "印度尼西亚",
            "Mauritius": "毛里求斯",
            "Eq. Guinea": "赤道几内亚",
            "Sweden": "瑞典",
            "Vietnam": "越南",
            "Mali": "马里",
            "Russia": "俄罗斯",
            "Bulgaria": "保加利亚",
            "United States": "美国",
            "Romania": "罗马尼亚",
            "Angola": "安哥拉",
            "Chad": "乍得",
            "South Africa": "南非",
            "Fiji": "斐济",
            "Liechtenstein": "列支敦士登",
            "Malaysia": "马来西亚",
            "Austria": "奥地利",
            "Mozambique": "莫桑比克",
            "Uganda": "乌干达",
            "Japan": "日本",
            "Niger": "尼日尔",
            "Brazil": "巴西",
            "Kuwait": "科威特",
            "Panama": "巴拿马",
            "Guyana": "圭亚那",
            "Madagascar": "马达加斯加",
            "Luxembourg": "卢森堡",
            "American Samoa": "美属萨摩亚",
            "Andorra": "安道尔",
            "Ireland": "爱尔兰",
            "Italy": "意大利",
            "Nigeria": "尼日利亚",
            "Turks and Caicos Is.": "特克斯和凯科斯群岛",
            "Ecuador": "厄瓜多尔",
            "U.S. Virgin Is.": "美属维尔京群岛",
            "Brunei": "文莱",
            "Australia": "澳大利亚",
            "Iran": "伊朗",
            "Algeria": "阿尔及利亚",
            "El Salvador": "萨尔瓦多",
            "C?te d'Ivoire": "科特迪瓦",
            "Chile": "智利",
            "Puerto Rico": "波多黎各",
            "Belgium": "比利时",
            "Thailand": "泰国",
            "Haiti": "海地",
            "Iraq": "伊拉克",
            "S?o Tomé and Principe": "圣多美和普林西比",
            "Sierra Leone": "塞拉利昂",
            "Georgia": "格鲁吉亚",
            "Denmark": "丹麦",
            "Philippines": "菲律宾",
            "S. Geo. and S. Sandw. Is.": "南乔治亚岛和南桑威奇群岛",
            "Moldova": "摩尔多瓦",
            "Morocco": "摩洛哥",
            "Namibia": "纳米比亚",
            "Malta": "马耳他",
            "Guinea-Bissau": "几内亚比绍",
            "Kiribati": "基里巴斯",
            "Switzerland": "瑞士",
            "Grenada": "格林纳达",
            "Seychelles": "塞舌尔",
            "Portugal": "葡萄牙",
            "Estonia": "爱沙尼亚",
            "Uruguay": "乌拉圭",
            "Antigua and Barb.": "安提瓜和巴布达",
            "Lebanon": "黎巴嫩",
            "Uzbekistan": "乌兹别克斯坦",
            "Tunisia": "突尼斯",
            "Djibouti": "吉布提",
            "Greenland": "格陵兰",
            "Timor-Leste": "东帝汶",
            "Dominica": "多米尼克",
            "Colombia": "哥伦比亚",
            "Burundi": "布隆迪",
            "Bosnia and Herz.": "波斯尼亚和黑塞哥维那",
            "Cyprus": "塞浦路斯",
            "Barbados": "巴巴多斯",
            "Qatar": "卡塔尔",
            "Palau": "帕劳",
            "Bhutan": "不丹",
            "Sudan": "苏丹",
            "Nepal": "尼泊尔",
            "Micronesia": "密克罗尼西亚",
            "Bermuda": "百慕大",
            "Suriname": "苏里南",
            "Venezuela": "委内瑞拉",
            "Israel": "以色列",
            "St. Pierre and Miquelon": "圣皮埃尔和密克隆群岛",
            "Central African Rep.": "中非",
            "Iceland": "冰岛",
            "Zambia": "赞比亚",
            "Senegal": "塞内加尔",
            "Papua New Guinea": "巴布亚新几内亚",
            "Trinidad and Tobago": "特立尼达和多巴哥",
            "Zimbabwe": "津巴布韦",
            "Jordan": "约旦",
            "Gambia": "冈比亚",
            "Kazakhstan": "哈萨克斯坦",
            "Poland": "波兰",
            "Eritrea": "厄立特里亚",
            "Kyrgyzstan": "吉尔吉斯斯坦",
            "Montserrat": "蒙特塞拉特",
            "New Caledonia": "新喀里多尼亚",
            "Macedonia": "马其顿",
            "Paraguay": "巴拉圭",
            "Latvia": "拉脱维亚",
            "Hungary": "匈牙利",
            "Syria": "叙利亚",
            "Honduras": "洪都拉斯",
            "Myanmar": "缅甸",
            "Mexico": "墨西哥",
            "Egypt": "埃及",
            "Nicaragua": "尼加拉瓜",
            "Cuba": "古巴",
            "Serbia": "塞尔维亚",
            "Comoros": "科摩罗",
            "United Kingdom": "英国",
            "Fr. S. Antarctic Lands": "南极洲",
            "Congo": "刚果（布）",
            "Greece": "希腊",
            "Sri Lanka": "斯里兰卡",
            "Croatia": "克罗地亚",
            "Botswana": "博茨瓦纳",
            "Siachen Glacier": "锡亚琴冰川地区"
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
                    var time=this_.getNowDate();
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
                        }
                        if(time==r.data.items[i].create_time){
                            //其他国家Top20
                            if(r.data.items[i].country!="中国"&&count2<20){
                                ++count2;
                                this_.qushi.otherCountry.country.push(r.data.items[i].country);
                                this_.qushi.otherCountry.confirmedNum.push(r.data.items[i].confirm);
                                this_.qushi.otherCountry.suspectedNum.push(r.data.items[i].suspect);
                                this_.qushi.otherCountry.deathsNum.push(r.data.items[i].dead);
                                this_.qushi.otherCountry.curesNum.push(r.data.items[i].heal);
                            }
                            /**
                             * 世界地图数据获取
                             */
                            this_.WordMap.confirm.push({
                                name: r.data.items[i].country,
                                value: r.data.items[i].confirm
                            });
                            this_.WordMap.dead.push({
                                name: r.data.items[i].country,
                                value: r.data.items[i].dead
                            });
                            this_.WordMap.cured.push({
                                name: r.data.items[i].country,
                                value: r.data.items[i].heal
                            });
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

                    /**
                     * 顶部累计信息
                     */
                    $("#diagnosed").text(r.data.items[0].confirm);
                    $("#suspect").text(r.data.items[0].suspect);
                    $("#death").text(r.data.items[0].dead);
                    $("#cured").text(r.data.items[0].heal); 

                    this_.echarts_2();
                    this_.echarts_4();
                    this_.initWorldMap();
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
                        appendTr+='<tr style="cursor: pointer;" class="add" id="'+provinceName+'">';
                        appendTr+='   <td style="width: 25%;float: left;text-align: center;margin-top: 5px;color: white;font-size: 20px;cursor: pointer;" class="add" id="_'+provinceName+'">'+r.data.area[i].provinceShortName+'</td>';
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
                        var time = this_.getNowDate()
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
                                        appendTr_tr+='   <td style="width: 25%;float: left;text-align: center;margin-top: 5px;color: yellow;font-size: 15px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+Re.data.items[j].city+'</td>';
                                        appendTr_tr+='   <td style="width: 25%;float: left;text-align: center;margin-top: 5px;color: white;font-size: 15px;">'+Re.data.items[j].confirm+'</td>';
                                        appendTr_tr+='   <td style="width: 25%;float: left;text-align: center;margin-top: 5px;color: white;font-size: 15px;">'+Re.data.items[j].dead+'</td>';
                                        appendTr_tr+='   <td style="width: 25%;float: left;text-align: center;margin-top: 5px;color: white;font-size: 15px;">'+Re.data.items[j].heal+'</td>';
                                        appendTr_tr+='</tr>';
                                    }
                                }
                                
                                $("#"+provinceName).after(appendTr_tr);
                                var param={
                                    "provinceName": provinceName,
                                    "isOn": 1
                                }
                                vm.clickProvince.push(param);
                            }
                        }); 
                    });
                    /**
                     * 顶部新增
                     */
                    $("#diagnosedIncr").html('&#8593;'+r.data.diagnosedIncr);
                    $("#suspectIncr").html('&#8593;'+r.data.suspectIncr);
                    $("#deathIncr").html('&#8593;'+r.data.deathIncr);
                    $("#curedIncr").html('&#8593;'+r.data.curedIncr); 
                    this_.echarts_1();
                    this_.initMap();
                    /**
                     * echart5
                     */
                    var append='<li class="alltitle" style="color: yellow;font-size: 15px;margin-top: 10px;text-align: left;"><h3 style="color: white;">友情链接</h3></li>';
                    append+='<li class="alltitle" style="color: yellow;font-size: 15px;margin-top: 20px;text-align: left;"><h4 style="color: green;">1、周边疫情实时查询：<a href="http://t.cn/A6P1xu21" target="_blank">点我点我点我</a></h4></li>';
                    append+='<li class="alltitle" style="color: yellow;font-size: 15px;margin-top: 20px;text-align: left;"><h4 style="color: green;">2、小区疫情实时查询：<a href="http://t.cn/A6P8r8al" target="_blank">点我</a></h4></li>';
                    append+='<li class="alltitle" style="color: yellow;font-size: 15px;margin-top: 20px;text-align: left;"><h4 style="color: green;">3、日常防护手册：<a href="https://expert.baidu.com/med/template/#/pages/speTopic/activity/index?pd=med&openapi=1&from_sf=1&resource_id=5216&vn=med&atn=sarihome&sf_ref=search_fybook&lid=8599021233" target="_blank">点我</a></h4></li>';
                    append+='<li class="alltitle" style="color: yellow;font-size: 15px;margin-top: 20px;text-align: left;"><h4 style="color: green;">4、最新辟谣：<a href="https://mbd.baidu.com/newspage/data/mdpage?tag=29&id=5807" target="_blank">点我</a></h4></li>';    
                    append+='<li class="alltitle" style="color: yellow;font-size: 15px;margin-top: 30px;text-align: left;"><h3 style="color: white;">数据统计</h3></li>';
                    append+='<li class="alltitle" style="color: yellow;font-size: 15px;margin-top: 20px;text-align: left;">截止最新一次数据统计时间：'+r.data.date+'</li>';
                    for(var i=0;i<r.data.list.length;i++){
                        append+='<li class="alltitle" style="color: red;font-size: 15px;margin-top: 20px;text-align: left;">'+r.data.list[i]+'</li>';
                    }
                    append='<ul>'+append+'</ul>';
                    $("#echart5").html(append);
                    var append1='<li class="alltitle" style="color: yellow;font-size: 15px;margin-top: 20px;text-align: left;">1.尽量不外出,待在家里就是为国家做贡献</li>';
                    append1+='<li class="alltitle" style="color: yellow;font-size: 15px;margin-top: 20px;text-align: left;">2.勤洗手，戴口罩,爱护自己，也是尊重他人</li>';
                    append1+='<li class="alltitle" style="color: yellow;font-size: 15px;margin-top: 20px;text-align: left;">注：本系统数据均从网络接口获取,不保证数据绝对的精确性和及时性（本人学习使用，仅供参考）</li>';
                    append1='<ul>'+append1+'</ul>';
                    $("#echart6").html(append1);
                }
            });
        },
        getNowDate: function(){
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
            return year + '-' + month + '-' + strDate;
        },
        /**
         * 中国地图
         */
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
        initWorldMap: function(){
            var mydata = vm.WordMap;
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
                    mapType: 'world',   
                    roam: true,
                    zoom: 2.1,
                    
                    label: {  
                        normal: {  
                            show: true  //省份名称  
                        },  
                        emphasis: {  
                            show: true  
                        }  
                    },  
                    data:mydata.confirm,  //数据
                    nameMap : vm.nameMap
                },{  
                    name: '死亡人数',  
                    type: 'map',  
                    mapType: 'world',   
                    roam: true,
                    zoom: 2.1,
                    
                    label: {  
                        normal: {  
                            show: true  //省份名称  
                        },  
                        emphasis: {  
                            show: true  
                        }  
                    },  
                    data:mydata.dead,  //数据
                    nameMap : vm.nameMap
                },{  
                    name: '治愈人数',  
                    type: 'map',  
                    mapType: 'world',   
                    roam: true,
                    zoom: 2.1,
                    
                    label: {  
                        normal: {  
                            show: true  //省份名称  
                        },  
                        emphasis: {  
                            show: true  
                        }  
                    },  
                    data:mydata.cured,  //数据
                    nameMap : vm.nameMap
                }]  
            };  
            //初始化echarts实例
            var myChart = echarts.init(document.getElementById('map_'));
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
