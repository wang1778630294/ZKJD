	var path = window.location.href ;
	var openId = path.split("?")[1];	
	
	function shareBtn() {
		$(".share").show();
	}
	
	function share(){
		$(".share").hide();
	}
	
	var isWorkeError = true;
	
(function(exports) {
	
	
	/*var path = window.location.href ;
	var spath = path.split("?")[1];
	var spath0 = spath.split("&")[0];
	var openId = spath0.split("=")[1];

	var spath1 = spath.split("&")[1];

	var friendId = spath1.split("=")[1];	*/
	
	
	setInterval(function(){
		$.ajax({
			type:"get",
			url:"https://xzdqnavi.powerlbs.com/wechat/locate_result?openId="+openId,
			async:true,
			timeout: 1000,
			success:function(res){
				if (res.data&&globalData.is_mapload) {
					var odata = JSON.parse(res.data);
					sendBleLocateRes(odata);
					isWorkeError = true;
				}
				
			},
			error: function(res){
				if (isWorkeError) {
					commonAlert("您当前的网络好像出问题了...");
				}
				isWorkeError = false;
			}
		});
	},1000)
	
	
	var angle = 0;
	//
	// 判断IOS
	// 
	var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

	if (!iOS) {
		if (window.DeviceOrientationEvent) {
			window.addEventListener('deviceorientationabsolute', function(event) {
				angle = event.webkitCompassHeading ? event.webkitCompassHeading : event.alpha;

				if (exports.orientationCallback) {
					exports.orientationCallback(angle);
				}
			})
		}
	} else {

		// 通过设备传感器更改定位标注物的方向
		if (window.DeviceOrientationEvent) {

			// window.addEventListener('deviceorientation', function(event) {
			window.addEventListener('deviceorientation', function(event) {

				// iOS设备直接使用webkitCompassHeading
				if (event.webkitCompassHeading) {
					// 由于实际是指北的，需要反转角度，下同
					angle = 360 - event.webkitCompassHeading;
				}

				if (exports.orientationCallback) {
					exports.orientationCallback(angle);
				}

			}, false);
		}
	}
})((this.fengmap = this.fengmap || {}));
// 定位需要的全局变量
var globalData = {
	fmapID: 'jd-xz-10001',
	mainGroupID: 1,
	curfloornum: 0,
	out_door_lon: 116.31896148337734, // 默认北京西站lon
	out_door_lat: 39.98038623378987, // 默认北京西站lat
	counttest: 0,
	routePlanJson: [],
	startPoint: null,
	endPoint: null,
	isFirstLoction: 0, // 有用
	isInDoorLocated: false,
	noAlertInOutTip: false,
	navigateEnable: false,
	cur_x: 0,
	cur_y: 0,
	cur_Point: null, // 当前坐标点
	pre_Point: null, // 上次我的位置坐标点
	poiTypes: [],
	// cur_Point: {
	// x: 12948177.611857535,
	// y: 4850452.372396881,
	// groupID: 1
	// },
	cur_direction: 0, // 当前方向
	last_located_floor_id: 1,
	gpsLoaction_lon: undefined,
	gpsLocation_lat: undefined,
	appArr: [],
	preTouchedTime: 0, // 有用
	NaviConstraintTime: 0,
	noOpTime: 5000,
	finishDistance: 15, // 距离终点多少米提示路径结束
	minReRouteDis: 10, // 路径规划窗口我的位置更新最小距离
	constraintDis: 15, // 导航中，路径偏离多少米重新规划
	walkingSpeed: 80, // 注：人的每分钟走80米
	initLevel: 18, // 初始级别
	allMapLevel: 16,
	naviLevel: 21, // 导航需要跳转的级别
	currentLevel: 18, // 记录当前级别
	originMapRotate: 0, // 初始地图旋转角度
	currentMapRotate: 0, // 记录当前地图旋转
	preMapRotate: 0,
	routeDirection: 0, // 记录当前导航中的当前路径的方向
	isTouched: false, // 记录当前是否被点击
	isRecalcRoute: false, // 是否已经重新规划
	is_mapload: false,
};

// 定位楼层和fengmap楼层的对应关系
var groupType = {
	"B2": 1,
	"B1": 2,
	"F1": 3
}

var reGroupType = {
	"1": "B2",
	"2": "B1",
	"3": "F1"
}

var carMarker = null;
var isNavCar = false;  
var carPoint = {};
var isClearCar = false;
var carFloor;

/**
 * [errorMsg 错误信息提示]
 * 
 * @type {Object}
 */
var errorMsg = {
	NO_LOCATION: '未找到我的位置',
	START_NAVI: '开始导航',
	FINISH_NAVI: '到达终点附近',
	AWAY_NAVI: '已偏离路线，是否重新规划？',
	LEAVE_NAVI: '是否确定退出导航？',
	CHANGE_FLOOR: '搜索结果在不同楼层，是否切换楼层？',
	START_END_SAME: '相同的起点和终点',
	TOO_CLOSE: '距离目标位置太近，请重新选择终点',
	NO_ROUTE: '不可访问区域',
	TO_CAR:'是否导航到车子的位置'
}
/**
 * 处理地图区域的点击事件
 */
var fmEvents = {
	create: function() {

		var _id = null;

		// var preTouchedTime = 0;
		var mousedownfun = function(event) {
			if (isNaving) {
				globalData.preTouchedTime = new Date().getTime();
				globalData.isTouched = true;
			} else {
				globalData.isTouched = false;
			}

			// clearTimeout(_id);
			// globalData.isTouched = true;
		};
		var mouseupfun = function(event) {
			if (isNaving) {
				globalData.isTouched = false;
				// alert('mouseup:' + globalData.isTouched);
			} else {
				globalData.isTouched = true;
			}
			globalData.preTouchedTime = new Date().getTime();
			void 0;
			// _id = setTimeout(function() {
			// console.log('mouse up timeout');
			// globalData.isTouched = false;
			// }, globalData.noOpTime);

		};
		var mousemovefun = function(event) {
			if (isNaving) {
				globalData.preTouchedTime = new Date().getTime();
				globalData.isTouched = true;
			} else {
				globalData.isTouched = false;
			}

		};

		// 绑定click事件
		var bindMapClickEvent_ = function() {
			document.getElementById('fengMap').addEventListener('mousedown', mousedownfun);
			document.getElementById('fengMap').addEventListener('mousemove', mousemovefun);
			document.getElementById('fengMap').addEventListener('mouseup', mouseupfun);
			document.getElementById('fengMap').addEventListener('touchstart', mousedownfun);
			document.getElementById('fengMap').addEventListener('touchmove', mousemovefun);
			document.getElementById('fengMap').addEventListener('touchend', mouseupfun);
		}

		return {
			bindMapClickEvent: bindMapClickEvent_
		}
	},
};
var outDoorMapUtil_ = {
    create: function(opts) {
        // var wgs84LonLat = wgs84togcj02(116.362375, 39.988017);
        var outDoorMap, westStationMarker, myLocationMarker;
        var initOutDoorMap = function(lon, lat) {
            var map = new AMap.Map('outDoorMapContainer', {
                resizeEnable: true,
                zoom: 14,
                center: wgs84togcj02(lon, lat)
            });

            var icon = new AMap.Icon({
                image: 'images/mark_r.png', // 24px*24px
                // icon可缺省，缺省时为默认的蓝色水滴图标，
                // size : new AMap.Size(150,150),
                // imageSize:new AMap.Size(150,150)
            });

            // westStationMarker = new AMap.Marker({
            // icon:icon,
            // position: wgs84togcj02(lon,lat)//marker所在的位置
            // //map:map//创建时直接赋予map属性
            // });
            // westStationMarker.setMap(map);
            // westStationMarker.on('click', function() {
            // document.getElementById("outDoorMapContainer").style.display="none";
            // document.getElementById("root").style.display="block";
            // });
            // 也可以在创建完成后通过setMap方法执行地图对象
            // marker.setMap(outDoorMap);
            return map;
        };

        // 跳转至中心点
        var zoomOutDoorMap = function(lon, lat) {
            outDoorMap = typeof(outDoorMap) != "undefined" ? outDoorMap : initOutDoorMap(lon, lat);
            outDoorMap.panTo(wgs84togcj02(lon, lat));
            outDoorMap.setZoom(14);
        };

        var markerOutDoorLocate = function(lon, lat) {
            if (typeof outDoorMap == "undefined") return;
            if (typeof myLocationMarker == 'undefined') {
                // // 自定义点标记内容
                // var markerContent = document.createElement("div");
                //
                // // 点标记中的图标
                // var markerImg = document.createElement("img");
                // //markerImg.className = "markerlnglat";
                // markerImg.src =
				// "images/mark_r.png";//nav_cur_location_down.png
                // markerContent.appendChild(markerImg);
                //
                // // 点标记中的文本
                // var markerSpan = document.createElement("span");
                // markerSpan.className = 'i-markerSpan';
                // markerSpan.innerHTML = "当前位置";
                // markerContent.appendChild(markerSpan);



                myLocationMarker = new AMap.Marker({
                    position: wgs84togcj02(lon, lat), // marker所在的位置
                    map: outDoorMap // 创建时直接赋予map属性
                });
                // marker.setMap(outDoorMap);
            } else {
                myLocationMarker.setPosition(wgs84togcj02(lon, lat));
            }

            // outDoorMap.panTo(wgs84togcj02(lon, lat));
        };

        var trans_PI = Math.PI;
        var x_PI = Math.PI * 3000.0 / 180.0;
        // var PI = 3.1415926535897932384626;
        var trans_a = 6378245.0;
        var trans_ee = 0.00669342162296594323;
        /**
		 * WGS84转GCj02
		 * 
		 * @param lng
		 * @param lat
		 * @returns {*[]}
		 */
        var wgs84togcj02 = function(lng, lat) {
            var lat = +lat;
            var lng = +lng;
            if (out_of_china(lng, lat)) {
                return [lng, lat]
            } else {
                var dlat = transformlat(lng - 105.0, lat - 35.0);
                var dlng = transformlng(lng - 105.0, lat - 35.0);
                var radlat = lat / 180.0 * trans_PI;
                var magic = Math.sin(radlat);
                magic = 1 - trans_ee * magic * magic;
                var sqrtmagic = Math.sqrt(magic);
                dlat = (dlat * 180.0) / ((trans_a * (1 - trans_ee)) / (magic * sqrtmagic) * trans_PI);
                dlng = (dlng * 180.0) / (trans_a / sqrtmagic * Math.cos(radlat) * trans_PI);
                var mglat = lat + dlat;
                var mglng = lng + dlng;
                return [mglng, mglat]
            }
        };

        /**
		 * GCJ02 转换为 WGS84
		 * 
		 * @param lng
		 * @param lat
		 * @returns {*[]}
		 */
        var gcj02towgs84 = function(lng, lat) {
            var lat = +lat;
            var lng = +lng;
            if (out_of_china(lng, lat)) {
                return [lng, lat]
            } else {
                var dlat = transformlat(lng - 105.0, lat - 35.0);
                var dlng = transformlng(lng - 105.0, lat - 35.0);
                var radlat = lat / 180.0 * trans_PI;
                var magic = Math.sin(radlat);
                magic = 1 - trans_ee * magic * magic;
                var sqrtmagic = Math.sqrt(magic);
                dlat = (dlat * 180.0) / ((trans_a * (1 - trans_ee)) / (magic * sqrtmagic) * trans_PI);
                dlng = (dlng * 180.0) / (trans_a / sqrtmagic * Math.cos(radlat) * trans_PI);
                var mglat = lat + dlat;
                var mglng = lng + dlng;
                return [lng * 2 - mglng, lat * 2 - mglat]
            }
        };

        var transformlat = function(lng, lat) {
            var lat = +lat;
            var lng = +lng;
            var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
            ret += (20.0 * Math.sin(6.0 * lng * trans_PI) + 20.0 * Math.sin(2.0 * lng * trans_PI)) * 2.0 / 3.0;
            ret += (20.0 * Math.sin(lat * trans_PI) + 40.0 * Math.sin(lat / 3.0 * trans_PI)) * 2.0 / 3.0;
            ret += (160.0 * Math.sin(lat / 12.0 * trans_PI) + 320 * Math.sin(lat * trans_PI / 30.0)) * 2.0 / 3.0;
            return ret
        };

        var transformlng = function(lng, lat) {
            var lat = +lat;
            var lng = +lng;
            var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
            ret += (20.0 * Math.sin(6.0 * lng * trans_PI) + 20.0 * Math.sin(2.0 * lng * trans_PI)) * 2.0 / 3.0;
            ret += (20.0 * Math.sin(lng * trans_PI) + 40.0 * Math.sin(lng / 3.0 * trans_PI)) * 2.0 / 3.0;
            ret += (150.0 * Math.sin(lng / 12.0 * trans_PI) + 300.0 * Math.sin(lng / 30.0 * trans_PI)) * 2.0 / 3.0;
            return ret
        };

        /**
		 * 判断是否在国内，不在国内则不做偏移
		 * 
		 * @param lng
		 * @param lat
		 * @returns {boolean}
		 */
        var out_of_china = function(lng, lat) {
            var lat = +lat;
            var lng = +lng;
            // 纬度3.86~53.55,经度73.66~135.05
            return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55);
        }

        return {
            zoomOutDoorMap: zoomOutDoorMap,
            markerOutDoorLocate: markerOutDoorLocate
        };
    }
}
// 初始位置
// var myLoc = {
// x: 12948177.611857535,
// y: 4850452.372396881,
// groupID: 1
// }

var locationMarker = null; // 当前定位标注
var navi = null; // FMNavigation 类

// 初始化导航类
function initFMNavigation(map) {
	// 初始化导航对象
	navi = new fengmap.FMNavigation({
		map: map,
		// 设置导航线的样式
		lineStyle: {
			// 设置线为导航线样式
			lineType: fengmap.FMLineType.FMARROW,
			lineWidth: 3,
			// 设置线的颜色
			// godColor: '#FF0000',
			// 设置边线的颜色
			// godEdgeColor: '#920000',
		},
		// locationMarkerUrl: 'images/pointer.png',
		showLocMarker: false
	});

	handleNaviEvent();
}

// 显示我的定位标注
function showMyLocation() {
	if (!locationMarker) {
		locationMarker = new fengmap.FMLocationMarker({
			// 设置图片的路径
			url: 'images/pointer.png',
			// 设置图片显示尺寸
			size: 46,
			// 设置图片高度
			height: 1
		});

		map.addLocationMarker(locationMarker);
	}

	locationMarker.visible = true;

	// 如果当前没有操作地图
	updateLocMarkerPos(globalData.cur_Point);

	// 如果是第一次更新
	// if (globalData.isFirstLoction == 0) {
	// moveToCenter(globalData.cur_Point);
	// // if (globalData.cur_Point.groupID != map.focusGroupID) {
	// // switchFloor(globalData.cur_Point.groupID);
	// // }
	// }
}

// 隐藏我的位置的marker
function hideMyLocMarker() {
	if (locationMarker) {
		locationMarker.visible = false;
	}
	// locationMarker = null;
}

// 更新定位坐标
function updateLocMarkerPos(coord) {
	locationMarker.setPosition({
		// 设置定位点的x坐标
		x: coord.x,
		// 设置定位点的y坐标
		y: coord.y,
		// 设置定位点所在楼层
		groupID: coord.groupID,
		// 设置定位点的高于楼层多少
		zOffset: 1,
	});
	// if (coord.groupID != map.focusGroupID && (globalData.isFirstLoction == 0
	// || isNaving)) {
	// switchFloor(coord.groupID);
	// }
}

// 只更新方向
function updateLocMarkerDirect(angle) {
	if (locationMarker)
		locationMarker.direction = angle;
}

// 添加路径线
function addRouteLine(startPoint, startGroupID, needSMarker, endPoint, endGroupID, needEMarker) {
	removeAllMarkers(); // 清除所有marker

	void 0;
	clearAllRoutes();
	// 起点和终点相同
	if (startPoint.x == endPoint.x && startPoint.y == endPoint.y && startGroupID == endGroupID) {
		// commonAlertPop("", "相同的起点和终点");
		return;
	};
	navi.setStartPoint({
		x: startPoint.x,
		y: startPoint.y,
		height: 0,
		groupID: startGroupID,
		url: 'images/start.png',
		size: 32
	});

	navi.setEndPoint({
		x: endPoint.x,
		y: endPoint.y,
		height: 0,
		groupID: endGroupID,
		url: 'images/end.png',
		size: 32
	});

	// 画导航线
	navi.drawNaviLine();
	showStartAndEndIcon(startGroupID, endGroupID); // 在楼层控件旁边添加起点、终点图标
}

// 是否是相同的起点和终点
function isSameStartAndEnd(startPoint, endPoint) {
	if (startPoint.x == endPoint.x && startPoint.y == endPoint.y && startPoint.groupID == endPoint.groupID) {
		return true;
	}
	return false;
}

// 获得路径信息
function showRouteTip(startPoint, endPoint) {
	var res = -1;
	if (isSameStartAndEnd(startPoint, endPoint)) {
		commonAlert(errorMsg.START_END_SAME);
		res = 0;
	};
	if (getRouteDistance() <= 0) {
		// 提示当前无路径信息
		commonAlert(errorMsg.NO_ROUTE);
		res = 1;
	}

	if (res >= 0) navi.clearNaviLines();

	return res;
}
var isNaving = false; // 是否处在导航页面
// var walkingSpeed = 80; //注：人的每分钟走0.8米
// var constraintDis = 5;
var routeIndex = 0; // 路径段
var isArrived = false; // 到达终点


/* 音频播放对象 */
window.iaudio = null;

/* 音频播放状态 0:未播放且等待音频数据状态，1:正播放且等待音频数据状态，2：未播放且不等待音频数据 */
// var audio_state = 0;

// 获取剩余时间,单位：分钟
function getRemainTime(dis) {
	return Math.ceil(dis / globalData.walkingSpeed);
}

// 获取路径线距离
function getRouteDistance() {
	return Math.ceil(navi.naviDistance);
}

// 得到路径描述
function getNaviDescription(index) {
	return navi.naviDescriptions[index];
}

// 重新设置坐标点
// function resetMyLoc(coord) {
// var angle = globalData.cur_direction;
// //globalData.cur_Point = coord;

// navi.locate(coord, angle); //更新当前位置
// }

// 更新当前导航信息
function updateNaviDataInfo(data) {
	var angle = globalData.cur_direction;
	if (data.angle != NaN) {
		globalData.routeDirection = data.angle;
	}

	$(".navi-info .navi-angle").text('地图角度：' + data.angle);

	var groupName = getGroupNameByGid(data.point.groupID).toUpperCase();
	var lineDistanceRemain = Math.ceil(data.distanceToNext) || 0;

	var prompt = getNaviDescription(data.index);
	// console.log('prompt', prompt);

	// lineDistanceRemain = 0;prompt = '右转undefined ';
	if (lineDistanceRemain == 0) {
		prompt = prompt.trim();
		var ss = prompt.split(' ');
		// console.log('prompt-lastindex', ss);
		if (ss.length > 0)
			prompt = ss[ss.length - 1];
		// console.log('prompt', prompt);
	} else {
		prompt = prompt.replace(/\d+/, lineDistanceRemain);
	}

	// console.log('prompt', prompt);
	prompt = prompt.replace(/undefined/g, ''); // 去掉undiefined的字
	// console.log('prompt', prompt);

	var distance = Math.ceil(data.remain);
	// if (distance == NaN) alert('remain:' + data.remain);
	if (data.remain < globalData.finishDistance) {
		distance = 0;
		prompt = errorMsg.FINISH_NAVI;
		routeIndex = -1;
		isArrived = true;
	}
	var remainTime = getRemainTime(distance);

	// 更新界面显示
	updateNaviInfo(groupName, remainTime, prompt, distance);
	// 如果当前没有操作地图
	updateLocMarkerPos(data.point, angle);
	moveToCenter(data.point);

	// 当前路段不等或
	if (routeIndex != data.index || routeIndex == -1) {
		var voiceEnable = getVoiceStatus();
		// alert('声音' + voiceEnable);
		if (voiceEnable)
			startNaviVoice(prompt);
		else resetAudio();
		if (routeIndex == -1) routeIndex = -2;
		else
			routeIndex = data.index;
	}

	// 到达终点，自动结束
	if (distance == 0) {
		// 弹出框提示到达终点附近
		hideNaviPage();
		switchVoiceIcon(false);
		layer.msg('您已到达终点附近！', {
			time: 3000
		});		
		return;
	}
}

// 重新规划路径
function updateNavi(mapCoord_) {
	// alert('isNaving:'+isNaving);
	if (!isNaving) return;
	// alert('aaa'+mapCoord_.x);
	var realRoutePnt = navi.naviConstraint(mapCoord_);
	// alert('aaa'+mapCoord_.y);
	var dis = realRoutePnt.distance;
	// 后续可删除
	var info = 'x:' + mapCoord_.x + 'y:' + mapCoord_.y + '<br/>groupID:' + mapCoord_.groupID + 'dis:' + dis;
	$(".navi-info .navi-dis").empty().append(info);

	// var isConstrint = false;
	// 如果偏离路径
	if ((dis == null || dis >= globalData.constraintDis) && !globalData.isRecalcRoute) {
		globalData.isRecalcRoute = true;
		var time_ = new Date().getTime() - globalData.NaviConstraintTime;
		if (!hasPopWin() && time_ > globalData.noOpTime) {
			// alert(!hasPopWin());
			var promp = errorMsg.AWAY_NAVI;
			startNaviVoice(promp);
			globalData.NaviConstraintTime = new Date().getTime();
			setTimeout(function() {
				showResetNavi();
			}, 1500);
		} else {
			resetAudio();
		}
	} else if(dis !=null&&dis<= 5){
		resetMyLocWithConstraint(mapCoord_, realRoutePnt);
	} else{
		updateLocMarkerPos(mapCoord_, globalData.cur_direction);
		moveToCenter(mapCoord_);		
	}
}

// 重新设置坐标点
function resetMyLocWithConstraint(coord, cc) {
	var angle = globalData.cur_direction;
	// globalData.cur_Point = coord;

	navi.locateNoConstraint(coord, cc, angle); // 更新当前位置
}
// function getPath(){
// var pathName = document.location.pathname;
// var index = pathName.substr(1).indexOf("/");
// var result = pathName.substr(0,index+1);
// return result;
//
// }
function getRootPath() {
    // 获取当前网址，如： http://localhost:9527/zdss-web/login/login.do
    var curWwwPath = window.document.location.href;
 // console.log("当前网址：" + curWwwPath);

    // 获取主机地址之后的目录，如：zdss-web/login/login.do
    var pathName = window.document.location.pathname;
  // console.log("当前路径：" + pathName);

    var pos = curWwwPath.indexOf(pathName);
 // console.log("路径位置：" + pos);

    // 获取主机地址，如： http://localhost:9527
    var localhostPath = curWwwPath.substring(0, pos);
 // console.log("当前主机地址：" + localhostPath);

    // 获取带"/"的项目名，如：/zdss-web
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
 // console.log("当前项目名称：" + projectName);

    return localhostPath+projectName;
}


/**
 * 文本合成与音频播放
 * 
 * @content 待合成的文本内容
 * @vcn 选择的合成发音人
 */
function play(content, vcn) {
	resetAudio();
	var audio_url = "http://location.powerlbs.com/gptts/tts?text="+content;
	start(audio_url);
};

/**
 * 重置音频缓存队列和播放对象 若音频正在播放，则暂停当前播放对象，创建并使用新的播放对象.
 */
function resetAudio() {
	if (window.iaudio != null) {
		stop();
		window.iaudio.src = '';
		// window.iaudio = null;
	} else {
		window.iaudio = new Audio();
		window.iaudio.src = '';
	}
	// if (session) {
	// session.stop();
	// session.cancel();
	// }

	// window.iaudio.play();
};

/** ****开始播放音频******** */
function start(url) {
	// audio_state = 1;
	if (window.iaudio && window.iaudio.src && window.iaudio.src != '') {
		if (window.iaudio.readyState == 0 || window.iaudio.ended) {
			try {
				stop();
				window.iaudio.currentTime = 0;
				window.iaudio.src = url;
				window.iaudio.play().catch(function(e) {
					void 0;
				});
			} catch (e) {
				void 0;
			}
		}
	}
}

/**
 * 停止播放音频
 */
function stop() {
	if (window.iaudio && window.iaudio.src && window.iaudio.src != '') {
		window.iaudio.pause();
	}
}

// 开始语音导航
function startNaviVoice(prompt) {
	var message = prompt.replace(/\s/g, ""); // 替换直接的数字
	message = message.replace(/undefined/g, ''); // 去掉undiefined的字
	play(message, 'aisxping');
}

// 结束导航
function stopNavi() {
	routeIndex = 0; // 还原路径段索引值
	resetAudio();
}

// 监听walking事件
function handleNaviEvent() {
	// 监听waling事件
	navi.on('walking', function(data) {
		void 0;
		updateNaviDataInfo(data);
	});
}

// 手机传感器回调
fengmap.orientationCallback = function(angle) {
	globalData.cur_direction = angle;
	updateLocMarkerDirect(angle);
	// div 显示
	// $(".navi-info .navi-angle").text('角度：' + angle);
}
/**
 * 定位设备类
 */
// native与js交互的接口，Android端会将接口封装在control对象内,ios端会直接绑定在页面的window下;
var control = typeof control == 'undefined' ? window : control;
var location_type = 1; // 1室内，0室外


var jsonStr = '{"major":"2740","url":"http://location.powerlbs.com/lbs/ble/B_0000_1610DA5F46E/modelbt.par","version":20,"uuid":"ab8190d5-d11e-4941-acc4-42f30510b408","buildingCode":"B_0000_1610DA5F46E"}';
var outDoorMapUtil = new outDoorMapUtil_.create({}); // 室外地图类

var last_ble_response_date; // 上一次室内定位返回时间

var testTime = 0;

// 若5秒内无定位结果，则定位状态变更为‘未定位’
function inDoorLocationListener() {
	setTimeout(function() {
		if (globalData.isInDoorLocated && new Date().getTime() > last_ble_response_date + 5000) {
			// 不要提示，需屏蔽
			// layer.msg('室内定位已中止', {
			// time: 1000
			// });

			globalData.isInDoorLocated = false;
			globalData.last_located_floor_name = undefined;
			// 图标变灰
			// 失去蓝牙,清空各种状态
			globalData.cur_Point = null;
			setLocIconToGray();
			globalData.isFirstLoction = 0;
			hideMyLocMarker();
		}
	}, 5000);
}

// 系统信息回调
window.sendSystemInfo = function(msg) {
	layer.msg(msg, {
		time: 1000
	});
}

// 蓝牙状态回调
window.sendBleLocateInitState = function(msg) {
	// console.log(msg);
	var msgJson = JSON.parse(msg);
	$(".navi-info .navi-info-lanya").text('蓝牙状态：' + msgJson.status);
	msgJson.status == '-2' && layer.msg('请在手机设置中开启蓝牙', {
		time: 1000
	}); // 测试用，带status，待改

	msgJson.status == '-6' && layer.msg('定位位置服务未开启', {
		time: 1000
	}); // 测试用，带status，待改

	msgJson.status == '-7' && layer.msg('gps 不可用', {
		time: 1000
	}); // 测试用，带status，待改
}

// 定位结果回调
function sendBleLocateRes(msg) {
	// "{"floor":"F1","x":p.Xcor,"y":p.Ycor,"buildingCode":\""+p.building+"\",\"type\":"+p.type+
	// "}"
	// "{\"status\":\""+error.getErrorCode()+"\",\"msg\":\""+error.getErrorMsg()+"}";
	globalData.counttest++;
	if (globalData.counttest == 1000) globalData.counttest = 0;
	var msgJson = msg;
	$(".navi-info .navi-info-status").text('定位状态：' + msgJson.status + ',isIndoor:' + msgJson.type + ',inOut:' + msgJson.InOut + ',次数' + globalData.counttest);
	$(".navi-info .navi-info-floor").text(msgJson.floor);
	$(".navi-info .navi-info-loc").text(msgJson.x + ',' + msgJson.y);
	// if (msgJson.status == 100) commonAlert(JSON.stringify(msgJson));
	globalData.isInDoorLocated = false; // 初始给false

	if (msgJson.status == 100) { // sdk判断当前位置在需室内外切换
		if (msgJson.InOut == 'undefined') return;
		// 如果没有点不在提醒
		if (!globalData.noAlertInOutTip)
			_showJumpConfirm(parseInt(msgJson.InOut), false); // 弹窗,跳转确认，1：室内->室外；0：室外->室内
		return;
	}

	// 只处理status = 1和status = 100的情况

	if (true) { // type 1室内，0室外
		globalData.isInDoorLocated = true;
		// 第一次定位时缩放
		last_ble_response_date = new Date().getTime();
		inDoorLocationListener();

		var floorID = groupType[msgJson.floor];

		globalData.cur_Point = {
			x: parseFloat(msgJson.x),
			y: parseFloat(msgJson.y),
			groupID: floorID
		};
		// 记录上次的楼层ID
		// globalData.last_located_floor_name = floorID;


		// if (!floorID) alert('no groupID');
		// if (map.focusGroupID != floorID) alert(floorID);

		// 如果不是导航状态
		if (!isNaving) {
			showMyLocation(); // 更新我的位置
			// 是否首次定位
			if (globalData.isFirstLoction == 0) {
				setLocIconToBlue();
				moveToCenter(globalData.cur_Point); // 聚焦
				globalData.last_located_floor_id = floorID;
			} else {
				// 如果楼层切换
				if (floorID != globalData.last_located_floor_id) {
					moveToCenter(globalData.cur_Point);
					// 记录上次的楼层ID
					globalData.last_located_floor_id = floorID;
				}
				updateMyLocInfo(); // 如果有起点和终点的时候
			}
			globalData.isFirstLoction++;
		} else updateNavi(globalData.cur_Point);
	} else if (msgJson.type == 0) {
		globalData.isInDoorLocated = false;
		globalData.gpsLoaction_lon = parseFloat(msgJson.x);
		globalData.gpsLocation_lat = parseFloat(msgJson.y);
		outDoorMapUtil.markerOutDoorLocate(globalData.gpsLoaction_lon, globalData.gpsLocation_lat);
	}
}

// 启动室外定位
function startOutDoorLocation() {
	// 室内定位停止,启动室外定位
	location_type = 0;
	globalData.isFirstLoction = 0;
	control.stopLocate();

	// ios端需先start后监听，android端先监听后start
	control == window || control.onUpdateLocation();
	control.startLocate(location_type, 1000, jsonStr, true, true, true);
	control == window && control.onUpdateLocation();
}

// 启动室内定位
function startInDoorLocation() {
	location_type = 1;
	globalData.isFirstLoction = 0;
	control.stopLocate();
	control.startLocate(location_type, 1000, jsonStr, true, true, true);
	control.onUpdateLocation();
}

// 重新启动室内定位
function resetInDoorLocation() {
	location_type = 1;
	globalData.isFirstLoction = 0;
}

// 设置当前坐标
function setCurrentLocation() {
	if (typeof globalData.gpsLoaction_lon != "undefined" && typeof globalData.gpsLocation_lat != "undefined")
		outDoorMapUtil.zoomOutDoorMap(globalData.gpsLoaction_lon, globalData.gpsLocation_lat);
}


// 初始化手机控件信息，定位及蓝牙设备
// 定义全局map变量
var map;
var isAllLoaded = false;
// var fmapID = 'jd-xz-10001';
var clickType = 0; // 0 默认点击事件
var clickMarker = null; // 点击模型定位点
var searchMarkers = []; // 查询出的markers
var needMapClick = false; // 在地图选点中有用
var isPoiClick = false;

//
// 用来记录已经加载进来的楼层id
//
var loadedGroups = [];

window.onload = function() {
    createFMap();
}

// 创建地图
function createFMap() {
    map = new fengmap.FMMap({
        // 渲染dom
        container: document.getElementById('fengMap'),
        // 地图数据位置
        mapServerURL: 'data/' + globalData.fmapID,
        // 初始二维还是三维状态,默认是3D状态
        defaultViewMode: fengmap.FMViewMode.MODE_2D,
        // 主题数据位置
        mapThemeURL: 'data/theme',
        // 设置主题
        defaultThemeName: '2001',
        // 初始指北针的偏移量
        compassOffset: [10, 140],
        // 指北针大小默认配置
        compassSize: 48,
        // mapScaleLevelRange: [15, 24],
        // defaultVisibleGroups: [1, 2, 3, 4, 5],
        // 默认比例尺级别设置为20级
        defaultMapScaleLevel: globalData.initLevel,
        // 开发者申请应用下web服务的key
        key: '6d38c18fe69bf1c38b0dfd71c92caf44',
        // isSeparate: true, //开启分层
        // 开发者申请应用名称
        appName: '蓝牙工具',
        useStoreApply: true, // 自定义样式起作用的配置
        groupLoadedCallback: function(gid) {

        }
    });

    map.showCompass = true;

    // 打开Fengmap服务器的地图数据和主题
    map.openMapById(globalData.fmapID, function(error) {
        // 打印错误信息
        void 0;
    });

    // 地图加载完成回掉方法
    map.on('loadComplete', function() {
        // 在这里去设置需要先显示的楼层与聚焦楼层
        // 比如这里我们只显示第三层,
        //
        // 在分层加载时, 就是使用 map.visibleGroupIDs , 来确定
        // SDK 去加载哪一楼层的数据

        // setTimeout(function() {
        // sendBleLocateRes('{\"status\":1,\"floor\":\"B2\",\"x\":\"12948100.620948466\",\"y\":\"4850687.723823964\",\"buildingCode\":\"B_0000_1610733D20D\",\"type\":1}');
        // }, 1000);

        // map.pickExclude = [11, 12];
        map.pickExclude = {
            nodeType: [11, 12],
            typeID: [
                300001
            ]
        }

        map.visibleGroupIDs = [globalData.mainGroupID];
        map.focusGroupID = globalData.mainGroupID;

        map.getGroupData(3); // 先获取下F1的数据
        initMap();
		
		globalData.is_mapload = true;		
		
    });

    // 点击指南针事件, 使角度归0
    map.on('mapClickCompass', function() {
        if (!isNaving) {
            updateMapRoate(globalData.originMapRotate);
        }
    });

    function initMap() {


        // 隐藏加载图标
        $(".map-loading").hide();

        initFMNavigation(map);

        // 楼层控制控件配置参数
        var ctlOpt = new fengmap.controlOptions({
            // 默认在右上角
            position: fengmap.controlPositon.LEFT_BOTTOM,
            // 默认显示楼层的个数
            showBtnCount: 3,
            // 初始是否是多层显示，默认单层显示
            allLayer: false,
            needAllLayerBtn: false, // 不显示单层、多层切换按钮
            // 位置x,y的偏移量
            offset: {
                x: 0,
                y: 100
            }
        });
        // 创建楼层(按钮型)，创建时请在地图加载后(loadComplete回调)创建。
        groupControl = new fengmap.scrollGroupsControl(map, ctlOpt);

        // 通过楼层切换控件切换聚焦楼层时的回调函数
        // groupContro 即为楼层控件对象
        groupControl.onChange(function(groups, allLayer) {
            // groups 表示当前要切换的楼层ID数组,
            // allLayer表示当前楼层是单层状态还是多层状态。
        });

        // 输出版本号
        var v_ = map.mapService.staticScene_.scene.date_ver;
        $(".navi-info .navi-info-lanya").text('数据版本号：' + v_.high + '.' + v_.low);
    }

    //
    // 在分层加载时,
    // 使用 groupLoaded 事件回调, 来得到当前加载完成的 楼层 id
    //
    map.on('groupLoaded', function(gid) {
        loadedGroups.push(gid);
        return;

        //
        // 在需要导航或路径规划的项目中
        // 在加载完 "首层" 后, 需要将其它各层
        // 全部加载进来后再去创建 导航类, 才可以
        // 正常的计算路径
        //
        // 此时已经将 "首层" 加载了进来,
        // 我们等待500ms,等待 focus 的动画完成,
        // 再将所有的楼层数据加载进来
        //
        // if (loadedGroups.length !== map.listGroups.length) {


        // setTimeout(function() {
        // var extGid = getNoLoadedGroupGID();
        // if (extGid.length > 0) {
        // map.visibleGroupIDs = [extGid[0]];
        // map.visibleGroupIDs = [globalData.mainGroupID];
        // }
        // }, 500);
        // }

        //
        // 判断是否所有的层都已经加载完成
        //
        // if (loadedGroups.length === map.listGroups.length) {

        // //楼层控制控件配置参数
        // var ctlOpt = new fengmap.controlOptions({
        // //默认在右上角
        // position: fengmap.controlPositon.LEFT_BOTTOM,
        // //默认显示楼层的个数
        // showBtnCount: 3,
        // //初始是否是多层显示，默认单层显示
        // allLayer: false,
        // needAllLayerBtn: false, //不显示单层、多层切换按钮
        // //位置x,y的偏移量
        // offset: {
        // x: 0,
        // y: 100
        // }
        // });

        // //创建楼层(按钮型)，创建时请在地图加载后(loadComplete回调)创建。
        // groupControl = new fengmap.scrollGroupsControl(map, ctlOpt);

        // //通过楼层切换控件切换聚焦楼层时的回调函数
        // //groupContro 即为楼层控件对象
        // groupControl.onChange(function(groups, allLayer) {
        // //groups 表示当前要切换的楼层ID数组,
        // //allLayer表示当前楼层是单层状态还是多层状态。
        // });

        // //输出版本号
        // var v_ = map.mapService.staticScene_.scene.date_ver;
        // $(".navi-info .navi-info-lanya").text('数据版本号：' + v_.high + '.' +
		// v_.low);

        // map.focusGroupID = [globalData.mainGroupID];

        // // 已经完部加载完成
        // isAllLoaded = true;

        // initFMNavigation(map);

        // }
    });

    // 点击地图事件
    map.on('mapClickNode', function(event) {
        if (event.nodeType == fengmap.FMNodeType.FACILITY || event.nodeType == fengmap.FMNodeType.LABEL || event.nodeType == fengmap.FMNodeType.IMAGE_MARKER) {
            isPoiClick = true;
            return;
        }
        isPoiClick = false;
        void 0;
		console.log(isNaving);
        if (!isNaving) {
            switch (clickType) {
                case 0:
                    // if (event.nodeType == fengmap.FMNodeType.IMAGE_MARKER) {
                    // isPoiClick = true;
                    // var clickData_ = getClickData(event);
                    // removeAllMarkers(); //先移除之前的
                    // clickMarker = addClickMarker(clickData_.groupID,
					// event.mapCoord);
                    // showClickModelInfo(clickData_);
                    // }
                    if (event.nodeType == fengmap.FMNodeType.MODEL) {
                        // if (isPoiClick == true) {
                        // isPoiClick = false;
                        // return;
                        // }
                        var clickData_ = getClickData(event);
                        removeAllMarkers(); // 先移除之前的
                        clickMarker = addClickMarker(event.groupID, event.mapCoord);
						console.log(clickData_);
                        showClickModelInfo(clickData_);
                    }
                    break;
                case 1:
                    if (event.nodeType == fengmap.FMNodeType.NONE) break;
                    if (!event.groupID) break;

                    // 获取鼠标点击的坐标
                    // var domEvent = event.eventInfo.domEvent;
                    // var _x, _y;

                    // if (domEvent instanceof MouseEvent) {
                    // _x = domEvent.clientX;
                    // _y = domEvent.clientY;
                    // } else {
                    // _x = domEvent.changedTouches[0].clientX;
                    // _y = domEvent.changedTouches[0].clientY;
                    // }
                    // var mapCoord_ = map.coordScreenToMap(_x, _y,
					// map.getGroupHeight(event.groupID) +
					// map.layerLocalHeight);
                    var mapCoord_ = event.eventInfo.coord;
                    var data = event;
                    data.mapCoord = mapCoord_;
                    // console.log('add rout line - set start end');
                    setStartOrEndPoint(data.groupID, data);
                    break;
                case 2:
                    break;
            }

            if (clickType == 0 && (event.nodeType == fengmap.FMNodeType.FLOOR || event.nodeType == fengmap.FMNodeType.NONE)) { // 其他类型时移除点击的标注
                removeClickMarker();
                hideClickModelInfo();
            }
        }

        // 模拟导航中人走的方法，以后删除掉
        // if (isNaving == true) {
        // var mapCoord_ = event.eventInfo.coord;
        // mapCoord_.groupID = event.groupID;
        // updateNavi(mapCoord_);
        // }
    });
}

function getNoLoadedGroupGID() {
    var gids = [];
    map.listGroups.forEach(function(itm) {
        if (loadedGroups.indexOf(itm.gid) < 0)
            gids.push(itm.gid);
    });
    return gids;
}

// 添加点击定位标注
function addClickMarker(gid, coord, cb) {
    var group = map.getFMGroup(gid);

    // 返回当前层中第一个imageMarkerLayer,如果没有，则自动创建
    var layer = group.getOrCreateLayer('imageMarker');

    var im = new fengmap.FMImageMarker({
        x: coord.x,
        y: coord.y,
        url: 'images/loc.png',
        size: 32,
        height: 0,
        callback: function() {
            im.alwaysShow();
            if (cb) {
                cb();
            }
        }
    });
    layer.addMarker(im);
    return im;
}

// 删除点击定位标注
function removeClickMarker() {
    if (clickMarker) clickMarker.dispose();
    clickMarker = null;
}

// 删除查询标注Marker
function removeSearchedMarkers() {
    searchMarkers.forEach(function(item, index) {
        item.dispose();
    });
    searchMarkers = [];
};

// 清除所有的marker
function removeAllMarkers() {
    removeClickMarker();
    hideClickModelInfo();
    removeSearchedMarkers();
}

// 根据typeID查询,查询标注
function findTypeId(typeId) {
    var request = {
        nodeType: fengmap.FMNodeType.MODEL, // 设置查询地图元素类型
        typeID: typeId
    };

    // 查询出所有楼层的地图元素的"typeID= typeId"的对象集合。
    map.search('all', request, function(results) {
        // result 为查询到的结果集。
        var models = results;
        if (models != null && models.length > 0) {
            addSearchedMarkers(models);
        } else {
            removeAllMarkers();
            // 提示没找到结果
            commonAlert('未找到结果！');
        }
    });
};

// 异步添加多个markers
function addMarkers(arr, index) {
    index = index || 0;

    if (index < arr.length) {
        setTimeout(function() {
            var a = arr[index];

            var marker_ = addClickMarker(a.groupID, a.mapCoord, function() {
                index++;
                addMarkers(arr, index);
                searchMarkers.push(marker_);
            });
        }, 0);
    }
}

// 添加搜索后的标注
function addSearchedMarkers(models) {
    removeAllMarkers(); // 先移除之前的分类搜索的图标
    var groupType = null,
        groupIDs = {}; // 记录查询结果的不同楼层id
    // 循环添加markers

    var data = models.map(function(itm) {
        if (!groupIDs[itm.groupID]) groupIDs[itm.groupID] = itm.groupID;
        return {
            groupID: itm.groupID,
            mapCoord: itm.mapCoord
        };
    });

    addMarkers(data);

    // for (var i = 0, ilen = models.length; i < ilen; i++) {
    // var model = models[i];
    // var groupID = model.groupID;
    // if (!groupIDs[groupID]) groupIDs[groupID] = groupID;
    // var marker = addClickMarker(groupID, model.mapCoord);
    // searchMarkers.push(marker);
    // }

    groupType = getResGroupType(parseInt(map.focusGroupID), groupIDs);
    if (!groupType) return;

    // 处理楼层状态
    switch (groupType.type) {
        // 当状态为2时直接切换
        case 2:
        case 4:
            switchFloor(groupType.focusid);
            break;

            // 给提示是否切换，是切换，否不切换
            // case 4:
            // confirmFloorChange(groupType.focusid);
            // break;
    }

    switchMapScaleLevel(globalData.allMapLevel);
    void 0;

}

// 获取当前聚焦层和查询到的各楼层的关系
function getResGroupType(focusId, groups) {
    var groups_ = [],
        isContain = false;
    for (var gid in groups) {
        if (gid == focusId) isContain = true;
        groups_.push(parseInt(gid));
    }

    if (groups_.length == 1 && isContain) return {
        type: 1,
        focusid: focusId
    }; // 如果只在当前层;
    if (groups_.length == 1 && !isContain) return {
        type: 2,
        focusid: groups_[0]
    }; // 如果都在同一层，不在当前层；
    if (groups_.length > 1 && isContain) return {
        type: 3,
        focusid: focusId
    }; // 如果在包含当前层的多层；
    if (groups_.length > 1 && !isContain) return {
        type: 4,
        focusid: groups_[0]
    }; // 如果都不在同一层，也不在当前层；

    return null;
}

// 根据关键字查询
function searchModelByKeyword(keyword) {
    var request = {
        nodeType: fengmap.FMNodeType.MODEL, // 设置查询地图元素类型
        keyword: keyword.trim()
    };

    var res = [];

    // 查询出所有楼层的地图元素的"typeID= typeId"的对象集合。
    map.search('all', request, function(results) {
        // result 为查询到的结果集。
        var models = results;
        res = results;
    });

    return res;
}

// 根据groupID获取名称
function getGroupNameByGid(gid) {
    var group_ = map.getFMGroup(gid);
    return group_.groupName;
}

// 根据FID查询，有且只有一个
function searchModelByFID(fid, gid) {
    var res = null;
    var request = {
        nodeType: fengmap.FMNodeType.MODEL, // 设置查询地图元素类型
        FID: fid
    };

    // 查询出所有楼层的地图元素的"typeID= typeId"的对象集合。
    map.search(gid, request, function(results) {
        // result 为查询到的结果集。
        var models = results;
        if (models.length >= 1) {
            res = models[0];
        }
    });

    return res;
}

// 点击模型
function clickModel(gid, model) {
    if (!model) return;
    var clickData_ = getClickData(model);
    // clickData_ = updateDataXYByModelLabel(model, clickData_);
    removeAllMarkers(); // 先移除之前的

    clickMarker = addClickMarker(gid, clickData_);
    showClickModelInfo(clickData_);
    moveToCenter(clickData_);
}

// 通过模型对象获取前端显示所需字段
function getClickData(model) {
    var data_ = {
        // fid: model.fid,
        x: model.mapCoord.x,
        y: model.mapCoord.y,
        groupID: model.groupID,
        name: model.name,
        groupName: getGroupNameByGid(model.groupID).toUpperCase(),
        type: model.typeID
    };
    data_.name = (!data_.name || data_.name == '' ? '地图选点' : data_.name);
    return data_;
}

// 移动到中心点位置显示,如果导航页面5S内无操作，则跳转地图至定位点
function moveToCenter(coord) {
    if (!isNaving) {
        // 如果不在当前层，切换楼层
        if (coord.groupID != map.foucusGroupID)
            switchFloor(coord.groupID);
        map.moveTo(coord);
        updateMapRoate(globalData.originMapRotate); // 还原地图旋转角度
    } else {
        // if (globalData.isTouched == true) {} else {
        if (!globalData.isTouched) {
            var now_ = new Date().getTime(),
                time_ = now_ - globalData.preTouchedTime;
            if (globalData.preTouchedTime == 0 || time_ > globalData.noOpTime) {
                // 如果不在当前层，切换楼层
                if (coord.groupID != map.focusGroupID) {
                    switchFloor(coord.groupID);
                    // globalData.last_located_floor_id = coord.groupID;
                }
                map.moveTo(coord);
                switchMapScaleLevel(globalData.naviLevel);
                updateMapRoate(globalData.routeDirection);
                globalData.preTouchedTime = new Date().getTime();
            }
        }
    }
}

// 切换地图级别展示
function switchMapScaleLevel(mapLevel) {
    map.mapScaleLevel = mapLevel;
}

// 地图恢复至初始状态
function clearAll() {
    void 0;
    removeAllMarkers();
    clearAllRoutes();
    stopNavi();
    clickType = 0; // 切换至点击状态
    isNaving = false;
    map.selectNull();
}

// 更新地图视角
function updateMapRoate(angle) {
    if (angle != NaN && angle != undefined) {
        map.rotateTo({
            // 设置角度
            to: angle,
            // 动画持续时间，默认为。3秒
            duration: .3,
            callback: function() { // 回调函数
                // console.log('rotateTo complete!');
            }
        });
    }
}

// 获取地图当前视角
function getMapRotateAngle() {
    return map.rotateAngle;
}

// 清空路径线
function clearAllRoutes() {
    void 0;
    navi.clearAll();
    clearFloorIcons();
}

// 切换楼层
function switchFloor(gid) {
    map.visibleGroupIDs = [gid];
    map.focusGroupID = gid;
}

function switchMapMode(type) {
    if (type == 0) {
        // 设置地图为3维模式
        map.viewMode = fengmap.FMViewMode.MODE_2D;
    } else {
        // 设置地图为2维模式
        map.viewMode = fengmap.FMViewMode.MODE_3D;
    }
}

function getMapScaleLevel() {
    return map.mapScaleLevel;
}

// 计算两点距离
function getTwoPntDistance(prePnt, curPnt) {
    if (prePnt.groupID != curPnt.groupID) return Infinity;
    return DistanceofTwoPts(prePnt, curPnt);
}

function updateDataXYByModelLabel(model, data) {
    var label = map.getModelLabelObject(model);
    if (label) {
        data.x = label.fm_.mapCoord.x;
        data.y = label.fm_.mapCoord.y;
    }

    return data;
}
var pageindex = 0; // 地图选地图页面索引
var isStartInput = 2; // 是否是地图起点输入框，2表示默认点击地图选择终点，1表示点击地图选择起点
var fmEvents_ = fmEvents.create();

$(function() {
  form.onsubmit = function() {
    // your code
    return false;
  };

  // 解决ios系统下 页面上下滑动引起的兼容性问题
  $(".header-wrap,.category-wrap,.category-cont").on('touchmove', function(event) {
    event.preventDefault();
  });

  resolveScroll();


  // 绑定地图的点击事件
  fmEvents_.bindMapClickEvent();

  // 搜索框返回事件绑定
  $('#backBtn').on('click', function() {
    $(".category-pop").hide();
    $(".clearBtn").hide();
    $(this).find("i").removeClass("icon-fanhui").addClass("icon-search");
    $("#searchTxt").val('');
    pageindex = 0;
  });

  getPoiType();

  // 给搜索框绑定keyup事件提示
  $("#searchTxt").on('input', function() {
    var keyword = this.value;
    var data = searchModelByKeyword(keyword);
    showSearchList(data);
  });

  // 绑定清除按钮
  $("#clearBtn").on('click', function() {
    var inputVal = $(this).prev().val();
    if (inputVal == null || inputVal == "") {
      $(".category-pop").hide();
      $(".clearBtn").hide();
      $(this).siblings("#backBtn").find("i").removeClass("icon-fanhui").addClass("icon-search");
      $("#searchTxt").val('');
      pageindex = 0;
      return;
    }
    $(this).prev().val("");
    hideSearchList();
  });

  // 去这里
  $("#goToRoute").click(function() {
    hideClickModelInfo();
    clickType = 1; // 点击地图选起始点
    showRoute();
  });

  // 开始导航
  $("#startNavi").click(function() {
    if (getRouteDistance() <= 0) {
      // 提示当前无路径信息
      commonAlert(errorMsg.NO_ROUTE);
      return;
    }

    // 终点不能设置为定位点
    var tmpe = $("#route-panel input[name='endTxt']").val();
    if (isMyLocation(tmpe)) {
      // 提示当前无路径信息
      commonAlert(errorMsg.TOO_CLOSE);
      return;
    }

    if (!globalData.cur_Point) {
      commonAlert(errorMsg.NO_LOCATION);
      return;
    }

    setMyLocToStartPnt();
    if (getRouteDistance() <= 0) {
      // 提示当前无路径信息
      commonAlert(errorMsg.NO_ROUTE);
      return;
    }
    hideRoute();
    // 切换导航页面和地图页面语音播放图标
    switchVoiceIcon(true);

    // 记录导航前的初始状态
    globalData.preTouchedTime = 0;
    globalData.isTouched = false;
    if (!isNaving) {
      globalData.currentLevel = getMapScaleLevel();
      globalData.currentMapRotate = getMapRotateAngle();
    }
    globalData.isRecalcRoute = false;
    globalData.NaviConstraintTime = new Date().getTime();

    showNaviPage();
  });

  // 显示当前定位信息
  $("#locationBtn").click(function() {
    if (!globalData.cur_Point) {
      // 如果当前定位信息不存在则重新发送定位信号
      if (globalData.isInDoorLocated == false) {
        resetInDoorLocation();
      }
    } else {
      setLocIconToBlue();
      globalData.preTouchedTime = 0;
      showMyLocation();
      // if (!isNaving)
      moveToCenter(globalData.cur_Point); // 重新聚焦
    }
  });
  
  
  // 停车功能
  $("#parking").click(function(){
	  addCarIcon(globalData.cur_Point);
  })
  
  function getCar(){
	  $.ajax({
			type:"POST",
			url:"https://xzdqnavi.powerlbs.com/wechat/park/park_point",
			async:true,
			data: {
				openId: openId
			},
			success:function(res){
				addCarIcon(res.data);
			}
		});
  }

  getCar();
  
$("#clearCar").click(function(){
	
	layer.open({
    type: 1,
    title: false,
    content: '是否清除停车记录',
    btn: ['是', '否'], // 按钮
    closeBtn: 0,
    yes: function(index, layero) {
	   layer.close(index);
       clearCar();
    },
    btn2: function(index, layero) {
      
    }
  });
	
})
  

  // 添加停车图标   以及导航到车子的位置
  function addCarIcon(coord){
	if (coord&&isNavCar ===false) {
		isNavCar = true;
		/*
		carMarker = new fengmap.FMLocationMarker({
			url: 'images/tcw.png',
			//设置图片显示尺寸
			size: 30,
			//设置图片高度，默认是5
			height: 10,
			callback: function() {
				// 设置LocationMarker的，初始方向
				carMarker.direction = -90;
			}
		});
		
		map.addLocationMarker(carMarker);
	
		carPoint = {
			x: coord.x,
			y: coord.y,
			groupID: coord.groupID
		}
		
		carMarker.setPosition({
			//设置定位点的x坐标
			x: coord.x,
			//设置定位点的y坐标
			y: coord.y,
			//设置定位点所在楼层
			groupID: coord.groupID,
			//设置定位点的高于楼层多少
			zOffset: 1,
		});
		*/
		var group = map.getFMGroup(coord.groupID);
		
		carPoint = {
			x: coord.x,
			y: coord.y,
			groupID: coord.groupID
		}

		//返回当前层中第一个imageMarkerLayer,如果没有，则自动创建
		var layercar = group.getOrCreateLayer('imageMarker');

		carMarker = new fengmap.FMImageMarker({
			x: coord.x,
			y: coord.y,
			height: 0,
			url: 'images/tcw.png',
			size: 35,
			callback: function() {
				carMarker.alwaysShow();
			}
		});
		layercar.addMarker(carMarker);
		$("#clearCar").show();
		
		$.ajax({
			type:"POST",
			url:"https://xzdqnavi.powerlbs.com/wechat/park/add",
			async:true,
			data: {
				openId: openId,
				x: carPoint.x,
				y: carPoint.y
			},
			success:function(){
				
			}
		});
		
		
	}else if(coord&&isNavCar==true){
		 layer.open({
			type: 1,
			title: false,
			content: errorMsg.TO_CAR,
			btn: ['是', '否'], // 按钮
			closeBtn: 0,
			yes: function(index, layero) {
			    layer.close(index); 
				
				navi.setStartPoint({
					x: coord.x,
					y: coord.y,
					height: 0,
					groupID: coord.groupID,
					url: 'images/start.png',
					size: 32
				});
				
				console.log(carPoint);
				
				navi.setEndPoint({
					x: carPoint.x,
					y: carPoint.y,
					height: 0,
					groupID: carPoint.groupID,
					url: 'images/end.png',
					size: 32
				});

				// 画导航线
				navi.drawNaviLine();
				showStartAndEndIcon(coord.groupID, carPoint.groupID); // 在楼层控件旁边添加起点、终点图标
				
				var carData = {
					groupID: carPoint.groupID,
					groupName: reGroupType[carPoint.groupID],
					name: '我的车子',
					type: 'car',
					x: carPoint.x,
					y: carPoint.y
				}
				
				showClickModelInfo(carData);
				
			},
			btn2: function(index, layero) {
			  layer.close(index);
			}
		  });
		

	}
  }
  
  // 删除停车图标
  function clearCar(){
		map.removeLocationMarker(carMarker);
		isNavCar = false;
		$("#clearCar").hide();
		
		
		$.ajax({
			type:"POST",
			url:"https://xzdqnavi.powerlbs.com/wechat/park/del",
			async:true,
			data: {
				openId: openId
			},
			success:function(){
				
			}
		});
		
		
  }
  
  

  // 互换起点、终点
  $(".loc-btn-wrap").click(function() {
    var tmps = $("#route-panel input[name='startTxt']").val(),
      tmpsPoint = getPointByName("#route-panel input[name='startTxt']"),
      tmpe = $("#route-panel input[name='endTxt']").val(),
      tmpePoint = getPointByName("#route-panel input[name='endTxt']");

    $("#route-panel input[name='startTxt']").val(tmpe);
    setInputDataAttr("#route-panel input[name='startTxt']", tmpePoint);
    $("#route-panel input[name='endTxt']").val(tmps);
    setInputDataAttr("#route-panel input[name='endTxt']", tmpsPoint);

    if (isStartInput == 1) isStartInput = 2;
    else if (isStartInput == 2) isStartInput = 1;

    addRouteLine(tmpePoint, tmpePoint.groupID, true, tmpsPoint, tmpsPoint.groupID, false);
    showRouteTip(tmpePoint, tmpsPoint);
  });

  // 2D\3D效果切换
  $("#mapSwitchBtn").on("click", function(event) {
    var childNode = $(this).children();
    if (!childNode.hasClass("change-active")) {
      childNode.addClass("change-active");
      switchMapMode(1);
    } else {
      childNode.removeClass("change-active");
      switchMapMode(0);
    }
  });

  // 切换室外地图
  showOutDoorMap();

  // 语音导航图标切换
  $("#voiceStatus").click(function() {
    var childNode = $(this).children();
    if (!childNode.hasClass("voice-active")) {
      childNode.addClass("voice-active");
      stop(); // 停止声音
    } else {
      childNode.removeClass("voice-active");
      start(); // 播放声音
    }
  });

  // 清除所有状态
  $("#clearAllStatus").click(function() {
    isStartInput = 2; // 初始起终点的聚焦框索引。2表示默认点击地图选择终点
    clearAll();
    hideRoute();
    hideClickModelInfo();
  });

  // 我的位置
  $(".category-cont.btns .btn-myloc").click(function() {
    if (!globalData.cur_Point) {
      commonAlert(errorMsg.NO_LOCATION);
      return;
    }

    var mylocType = isHasMyLocation();
    // 不能选择同样的起点和终点
    if (mylocType == 1 && isStartInput == 2) {
      commonAlert(errorMsg.START_END_SAME);
      return;
    }

    if (isStartInput == 1 && mylocType == 2) {
      commonAlert(errorMsg.START_END_SAME);
      return;
    }

    setMyLoc();
  });

  // 地图选点
  $(".category-cont.btns .btn-maploc").click(function() {
    setMapClickLoc();
  });

  // 结束导航
  $(".navi-stop-img").click(function() {
    showConfirmStopNavi(); // 未结束时提示
  });
});

// 解决andriod 和 ios 在键盘弹出时，滚动界面不一致的问题。
function resolveScroll() {
  // 防止内容区域滚到底后引起页面整体的滚动
  var content = $('.category-pop');
  var startY;

  content.on('touchstart', function(e) {
    startY = e.touches[0].clientY;
  });

  content.on('touchmove', function(e) {
    // 高位表示向上滚动
    // 底位表示向下滚动
    // 1容许 0禁止
    var status = '11';
    var ele = this;

    var currentY = e.touches[0].clientY;

    if (ele.scrollTop === 0) {
      // 如果内容小于容器则同时禁止上下滚动
      status = ele.offsetHeight >= ele.scrollHeight ? '00' : '01';
    } else if (ele.scrollTop + ele.offsetHeight >= ele.scrollHeight) {
      // 已经滚到底部了只能向上滚动
      status = '10';
    }

    if (status != '11') {
      // 判断当前的滚动方向
      var direction = currentY - startY > 0 ? '10' : '01';
      // 操作方向和当前允许状态求与运算，运算结果为0，就说明不允许该方向滚动，则禁止默认事件，阻止滚动
      if (!(parseInt(status, 2) & parseInt(direction, 2))) {
        stopEvent(e);
      }
    }
  });
}

// 切换导航页面和地图页面语音播放图标
function switchVoiceIcon(flag) {
  if (flag) {
    // 开始导航
    $("#clearAllStatus").hide();
    $("#voiceStatus").show();

    showNaviGroupShade();
  } else {
    // 结束导航
    $("#clearAllStatus").show();
    $("#voiceStatus").hide();
    hideNaviGroupShade();
  }
}

// 通过json文件获取分类列表并渲染dom
function getPoiType() {
  // 获取json数据
  $.getJSON("data/poitype.json?1313", function(data) {
    var jsonData = data.poiTypes;
    globalData.poiTypes = jsonData;
    // 快捷筛选
    var shortcutData = $(".shortcut-wrap ul");
    var shortcutHtml = "";

    // 分类筛选
    var categoryData = $(".category-cont ul");
    var categoryHtml = "";

    $.each(jsonData, function(index, obj) {
      if (obj.level == 1) { // 分类筛选
        categoryHtml += '<li onClick="getCategoryMapData(this);" data-id="' + obj.type + '"><i class="icon iconfont ' + obj.icon + '"></i><span class="categoryTitle">' + obj.name + '</span></li>';
      } else { // 快捷筛选
        shortcutHtml += '<li onClick="getCategoryMapData(this);" data-id="' + obj.type + '"><span class="iconStyle"><i class="icon iconfont ' + obj.icon + '"></i></span><span class="categoryTitle">' + obj.name + '</span></li>';
      }

    })
    shortcutData.html(shortcutHtml);
    categoryData.html(categoryHtml);
  });
}

// 展示地图楼层图标
function showStartAndEndIcon(startGroupID, endGroupID) {
  var startObj = $(".fm-layer-list label[data-gid=" + startGroupID + "]"); // 开始楼层
  var endObj = $(".fm-layer-list label[data-gid=" + endGroupID + "]"); // 结束楼层
  // 同一楼层展示
  var mapBottom = $("#fengMap").height();
  if (startGroupID == endGroupID) {
    // 获取楼层距离顶部的距离
    var startTop = startObj.offset().top;
    $("#sameIcon").empty().append("<img src='images/sametip.png' />");
    $("#sameIcon").css("bottom", mapBottom - startTop - 48);
  } else {
    // 不同楼层展示
    var startTop = startObj.offset().top;
    var endTop = endObj.offset().top;
    $("#startIcon").empty().append("<img src='images/stip.png' />");
    $("#endIcon").empty().append("<img src='images/etip.png' />");
    $("#startIcon").css("bottom", mapBottom - startTop - 40);
    $("#endIcon").css("bottom", mapBottom - endTop - 40);
  }
}

// 获取分类筛选信息
function getCategoryMapData(obj) {
  // console.time("getCategoryMapData");
  // 获取分类的typeId
  var dataId = $(obj).attr("data-id");
  // 获取分类名称
  var dataName = $(obj).children(".categoryTitle").text();
  $("#searchTxt").val(dataName);
  // 根据typeID查询mapData数据
  findTypeId(dataId);
  hideCategoryPop();
  // console.timeEnd("getCategoryMapData");
}

// 主页搜索框获取焦点事件
function showCategoryPop(obj) {
  $(".category-pop").show();
  $(".clearBtn").show();
  $("#backBtn>i").removeClass("icon-search").addClass("icon-fanhui");
  hideSearchList();

  if (pageindex == 0) {
    $(".category-cont.types").show();
    $(".category-cont.btns,.category-cont.blank").hide();
  }
  if (pageindex == 1) {
    $(".category-cont.types").hide();
    $(".category-cont.btns,.category-cont.blank").show();
    // //起点
    // if (isStartInput == 1) {
    // var startTxt = $("#route-panel input[name='startTxt']").val();
    // $("#searchTxt").val(startTxt);
    // }

    // // //终点
    // if (isStartInput == 2) {
    // var endTxt = $("#route-panel input[name='endTxt']").val();
    // $("#searchTxt").val(endTxt);
    // }
  }
}

// 隐藏分类页面
function hideCategoryPop() {
  $(".category-pop").hide();
  pageindex = 0;
}

// 点击弹出信息框，并填充信息
function showClickModelInfo(data) {
  setInputDataAttr(".info-wrap .text-area .modelname", data);
  $(".info-wrap .text-area .modelname").text(data.name);
  $(".info-wrap .text-area .groupname").text(data.groupName + '层');
  var categoryName = "无";
  $.each(globalData.poiTypes, function(index, obj) {
    if (data.type == obj.type) {
      categoryName = obj.name;
      return true;
    }
  });
  $(".info-wrap .text-area .typename").text(categoryName);
  $(".info-wrap").css("display", "block");
}

// 隐藏弹出的信息框
function hideClickModelInfo() {
  $(".info-wrap").css("display", "none");
}

// 创建搜索提示下拉列表
function showSearchList(data) {
  $("#hotwords").css('display', 'block')
  $("#hotwords").empty();
  var li = '';
  for (var i in data) {
    var model = data[i];
    var gname = getGroupNameByGid(model.groupID).toUpperCase();
    if (model.name && model.name != '')
      li += '<li data-gid="' + model.groupID + '" data-name="' + model.name + '" data-fid="' + model.FID + '"><i class="icon iconfont icon-sousuodingwei"></i>' + model.name + '<span>' + gname + '</span></li>';
  }

  if (li == '') return;

  $("#hotwords").append(li);

  $("#hotwords li").click(function() {
    var index = $("#hotwords ul li").index($(this));
    var fid = $(this).data("fid"),
      gid = $(this).data('gid');
    var model = searchModelByFID(fid, gid);
    if (pageindex == 0) {
      $("#searchTxt").val($(this).data('name'));
      clickModel(gid, model);
      hideSearchList();
      hideCategoryPop();
    }
    if (pageindex == 1) {
      $("#searchTxt").val('');
      setMapClickLoc();
      var res = setStartOrEndPoint(gid, model);
    }
  });
}

// 隐藏搜索下拉列表
function hideSearchList() {
  $("#hotwords").css("display", "none");
}

// 显示路径线面板
function showRoute() {
  var sname = '';
  if (globalData.cur_Point) {
    sname = '我的位置';
    isStartInput = 2;
  }
  // alert(sname);
  var name = $(".info-wrap .text-area .modelname").text();
  var endPoint = getPointByName(".info-wrap .text-area .modelname");
  $("#route-panel input[name='startTxt']").val(sname);
  setInputDataAttr("#route-panel input[name='startTxt']", globalData.cur_Point);
  $("#route-panel input[name='endTxt']").val(name);
  setInputDataAttr("#route-panel input[name='endTxt']", endPoint);
  $("#route-panel").show();

  if (!globalData.cur_Point) {
    commonAlert(errorMsg.NO_LOCATION);
  } else {
    var needSMarker = true,
      needEMarker = isMyLocation(name);
    addRouteLine(globalData.cur_Point, globalData.cur_Point.groupID, needSMarker, endPoint, endPoint.groupID, needEMarker); // 绘制路径线
    showRouteTip(globalData.cur_Point, endPoint);
  }
}

// 隐藏路径线面板
function hideRoute() {
  clickType = 0;
  $("#route-panel").css('display', 'none');
}

function getPointByName(classname) {
  return {
    x: $(classname).data("x"),
    y: $(classname).data("y"),
    groupID: $(classname).data("gid")
  }
}

function setInputDataAttr(classname, point) {
  if (!point) return;
  $(classname).data("x", point.x);
  $(classname).data("y", point.y);
  $(classname).data("gid", point.groupID);
}

// 判断当前输入框是否是我的位置
function isMyLocation(val) {
  if (val == '我的位置') return true;
  else return false;
}

// 聚焦起点、终点输入框弹出选点页面
function showPickPage(type) {
  pageindex = 1;
  hideSearchList();
  isStartInput = type;
  $("#searchTxt").val('');
  $("#searchTxt").focus();
}

function isHasMyLocation() {
  var ename = $("#route-panel input[name='endTxt']").val();
  var sname = $("#route-panel input[name='startTxt']").val();
  if (isMyLocation(sname)) return 1;
  else if (isMyLocation(ename)) return 2;
  else return 0;
}

// 为终点或起点设置路径
function setStartOrEndPoint(gid, model) {
  void 0;
  if (!model) return;
  var data = getClickData(model);
  // data = updateDataXYByModelLabel(model, data);
  var myLocationType = isHasMyLocation();
  if (myLocationType == isStartInput) {
    if (isStartInput == 1) {
      $("#route-panel input[name='endTxt']").val(data.name);
      setInputDataAttr("#route-panel input[name='endTxt']", data);
    } else {
      $("#route-panel input[name='startTxt']").val(data.name);
      setInputDataAttr("#route-panel input[name='startTxt']", data);
    }
  } else {
    if (isStartInput == 2) {
      $("#route-panel input[name='endTxt']").val(data.name);
      setInputDataAttr("#route-panel input[name='endTxt']", data);
    } else {
      $("#route-panel input[name='startTxt']").val(data.name);
      setInputDataAttr("#route-panel input[name='startTxt']", data);
    }
  }

  var tmps = $("#route-panel input[name='startTxt']").val(),
    tmpsPoint = getPointByName("#route-panel input[name='startTxt']"),
    tmpe = $("#route-panel input[name='endTxt']").val(),
    tmpePoint = getPointByName("#route-panel input[name='endTxt']");
  // 如果输入框中没有坐标，不路径规划
  if ((!tmpsPoint.x || !tmpePoint.x) && !globalData.cur_Point) {
    commonAlert(errorMsg.NO_LOCATION);
    return;
  }
  var routeRes = isSameStartAndEnd(tmpsPoint, tmpePoint);
  // 如果起点和终点不一致
  if (!routeRes) {
    addRouteLine(tmpsPoint, tmpsPoint.groupID, true, tmpePoint, tmpePoint.groupID, true);
    showRouteTip(tmpsPoint, tmpePoint);
    hideSearchList();
    hideCategoryPop();
  } else {
    showRouteTip(tmpsPoint, tmpePoint);
  }
}

// 选取我的位置
function setMyLoc() {
  var mylocName = '我的位置';
  if (isStartInput == 1) {
    $("#route-panel input[name='startTxt']").val(mylocName);
    setInputDataAttr("#route-panel input[name='startTxt']", globalData.cur_Point);
    isStartInput = 2;
  } else if (isStartInput == 2) {
    $("#route-panel input[name='endTxt']").val(mylocName);
    setInputDataAttr("#route-panel input[name='endTxt']", globalData.cur_Point);
    isStartInput = 1;
  }

  hideCategoryPop();

  // 显示路径线
  var tmps = $("#route-panel input[name='startTxt']").val(),
    tmpsPoint = getPointByName("#route-panel input[name='startTxt']"),
    tmpe = $("#route-panel input[name='endTxt']").val(),
    tmpePoint = getPointByName("#route-panel input[name='endTxt']");
  var needSMarker = isMyLocation(tmps),
    needEMarker = isMyLocation(tmpe);
  addRouteLine(tmpsPoint, tmpsPoint.groupID, needSMarker, tmpePoint, tmpePoint.groupID, needEMarker);
}

// 开启地图选点
function setMapClickLoc() {
  void 0;
  var maplocClickTxt = '地图选点';
  if (isStartInput == 1) {
    $("#route-panel input[name='startTxt']").val(maplocClickTxt);
  } else if (isStartInput == 2) {
    $("#route-panel input[name='endTxt']").val(maplocClickTxt);
  }

  hideCategoryPop();
}

// 首页界面隐藏
function hideHomePage() {
  $(".shortcut-wrap").hide();
  hideRoute();
}

// 首页界面显示
function showHomePage() {
  $(".shortcut-wrap").show();
  $("#route-panel").show();
}

// 开启导航
function showNaviPage() {
  isNaving = true;
  clickType = 2;
  hideHomePage();
  isArrived = false;
  $('.navi-bottom-tip').show();
  $('.navi-header').show();
  var endName = $("#route-panel input[name='endTxt']").val();
  var endPoint = getPointByName("#route-panel input[name='endTxt']");
  var groupName = getGroupNameByGid(endPoint.groupID).toUpperCase();
  var distance = getRouteDistance();
  var remainTime = getRemainTime(distance);

  $('.navi-bottom-tip .mname').text(endName);

  // 路线提示信息
  var prompt = getNaviDescription(0);
  updateNaviInfo(groupName, remainTime, prompt, distance);
  var initVoice = errorMsg.START_NAVI;
  startNaviVoice(initVoice);
  setTimeout(function() {
    startNaviVoice(prompt); // 开始导航语音
  }, 3000);


  // test---
  // for (var i = 0; i < 2000; i++) {
  // var x_ = 12948100.620948466 + i * 0.1;
  // var y_ = 4850687.723823964 + i * 0.1;
  // var gid_ = 'B2';
  // if (i == 500) {
  // gid_ = 'B1';
  // } else if (i == 1000) {
  // gid_ = 'B2';
  // }
  // setTimeout(function() {
  // sendBleLocateRes('{\"status\":1,\"floor\":\"' + gid_ + '\",\"x\":\"' + x_
	// + '\",\"y\":\"' + y_ +
	// '\",\"buildingCode\":\"B_0000_1610733D20D\",\"type\":1}');
  // }, 2000);
  // }
}

// 设置起点为我的位置
function setMyLocToStartPnt() {
  isStartInput = 1; // 设置起点为我的位置
  setMyLoc();
}

// 设置当前导航页信息
function updateNaviInfo(groupName, remainTime, prompt, remain) {
  $('.navi-bottom-tip .gname').text(groupName);
  $('.navi-bottom-tip .remain').text(remainTime);
  $('.navi-header .navi-directiion').text(prompt);
  $('.navi-header .navi-distance').text(remain);
}

// 隐藏导航
function hideNaviPage() {
  isNaving = false;
  clickType = 1;
  $('.navi-bottom-tip').hide();
  $('.navi-header').hide();
  showHomePage();

  // 还原级别
  switchMapScaleLevel(globalData.currentLevel);
  $('#clearAllStatus').trigger('click');
  // clearAllRoutes();
  // globalData.currentLevel = getMapScaleLevel();
  updateMapRoate(globalData.currentMapRotate);
  // globalData.currentMapRotate = getMapRotateAngle();
  resetAudio(); // 关闭语音
}

// 显示室外数据
function showOutDoorMap() {
  // 点击室外定位
  $("#outdoorBtn").click(function() {
    _showJumpConfirm(0, true);
  });

  // 返回室内地图
  $("#inDoor-btn").click(function() {
    _showJumpConfirm(1, true);
  });

  // 室外定位
  $("#gpsLocation-btn").click(function() {
    var childNode = $(this).children();
    if (!childNode.hasClass("gpsLocation-active")) {
      childNode.addClass("gpsLocation-active");
    }
    setCurrentLocation();
  });
}

// 清除楼层图标
function clearFloorIcons() {
  $(".floorIcon").empty();
}

// 弹出是否跳转室外提示
function _showJumpConfirm(inOut, isClick) { // 1切室内，0切室外
  if (inOut && !($("#outDoorMapContainer").css('display') != 'none')) return; // 切室内并且目前在室内地图，或切室外并且目前在室外地图，不弹窗
  if (!inOut && ($("#outDoorMapContainer").css('display') != 'none')) return; // 切室内并且目前在室内地图，或切室外并且目前在室外地图，不弹窗
  var hasPopWin_ = hasPopWin();
  // alert('hasPopWin_' + hasPopWin_);
  if (hasPopWin_) return; // 如果当前有提示框

  // alert('isClick'+isClick);

  var confirmdialog = {};
  confirmdialog.title = '';
  confirmdialog.body_html = inOut ? "您已到达室内，是否切换地图？" : "您已到达室外，是否切换地图？";
  confirmdialog.confirmText = "确认";
  confirmdialog.cancelText = "取消";

  // 先提示在切换
  if (!isClick) {
    // alert('isClick'+isClick);
    var chkInput = "<div class='noAlert'><input type='checkbox' id='noAlertChk' value='不再提醒' onclick='noAlertFunc()'></input><label>不再提醒</label></div>";
    layer.open({
      title: false,
      type: 1,
      content: confirmdialog.body_html + chkInput,
      btn: [confirmdialog.confirmText, confirmdialog.cancelText],
      closeBtn: 0,
      yes: function(index, layero) {
        switchOutOrIn(inOut);
        // do something
        layer.close(index); // 如果设定了yes回调，需进行手工关闭
      },
      btn2: function(index, layero) {
        // 按钮【按钮二】的回调
        layer.close(index);
      }
    });
  } else {
    switchOutOrIn(inOut);

    // layer.open({
    // title: false,
    // content: confirmdialog.body_html,
    // btn: [confirmdialog.confirmText, confirmdialog.cancelText],
    // closeBtn: 0,
    // yes: function(index, layero) {
    // switchOutOrIn(inOut);
    // //do something
    // layer.close(index); //如果设定了yes回调，需进行手工关闭
    // },
    // btn2: function(index, layero) {
    // //按钮【按钮二】的回调
    // layer.close(index);
    // }
    // });
  }
}

function hasPopWin() {
  if ($(".layui-layer-shade").css('display') && $(".layui-layer-shade").css('display') != 'none') return true;
  if ($('.layui-layer.layui-layer-dialog').css('display') != 'none' && $('.layui-layer.layui-layer-dialog').find('.layui-layer-btn').children().length == 2) return true;
  return false;
}

// 下次是否提醒
function noAlertFunc() {
  var checked = $('#noAlertChk').prop("checked");
  // commonAlert('isChecked:'+globalData.noAlertInOutTip);
  globalData.noAlertInOutTip = checked;
}

// 根据inout切换室内外地图
function switchOutOrIn(inout) {
  if (inout) {
    // 按下确定按钮执行的操作
    $("#outDoorMapContainer").hide();
    startInDoorLocation();
  } else {
    if (globalData.appArr.length > 0) {
      var appListHtml = "";
      $("#mapApps ul").empty();
      globalData.appArr.forEach(function(item) {
        appListHtml += '<li>' + item + '</li>';
      });
      appListHtml += '<li class="cancelLi">取消</li>';
      $("#mapApps ul").prepend(appListHtml);
      $("#mapApps").show();

      // 取消选择其他地图app
      $("#mapApps ul li").not(':last').on("click", function() {
        var index = $("#mapApps ul li").index($(this));
        var item = globalData.appArr[index];
        doJumpApp(item);
        $(this).parents("#mapApps").hide();
      });

      // 取消
      $("#mapApps ul li:last").on("click", function() {
        $(this).parents("#mapApps").hide();
      });
    } else {
      // 按下确定按钮执行的操作，当前没有安装其他地图APP时
      $("#outDoorMapContainer").show();
      $("#outDoorMapContainer").height(document.documentElement.clientHeight);
      outDoorMapUtil.zoomOutDoorMap(globalData.out_door_lon, globalData.out_door_lat);
      startOutDoorLocation();
    }

    // 导航时自动关闭导航
    if (isNaving) {
      hideNaviPage();
      switchVoiceIcon(false);
    }
  }
}

// 把定位图标变灰
function setLocIconToGray() {
  var eleObj = $("#locationBtn").children(".position-icon");
  if (eleObj.hasClass("position-active")) {
    eleObj.removeClass("position-active");
  }
}

// 把定位图标变蓝
function setLocIconToBlue() {
  var eleObj = $("#locationBtn").children(".position-icon");
  if (!eleObj.hasClass("position-active")) {
    eleObj.addClass("position-active");
  }
}

// 提示是否退出当前导航
function showConfirmStopNavi() {
  stop(); // 先暂停语音

  // alert('1');
  layer.open({
    type: 1,
    title: false,
    content: errorMsg.LEAVE_NAVI,
    btn: ['是', '否'], // 按钮
    closeBtn: 0,
    yes: function(index, layero) {
      switchVoiceIcon(false);
      hideNaviPage();
      // do something
      layer.close(index); // 如果设定了yes回调，需进行手工关闭
    },
    btn2: function(index, layero) {
      start();
      // 按钮【按钮二】的回调
      layer.close(index); // 如果设定了yes回调，需进行手工关闭
    }
  });

  // popTipShow.confirm('test', errorMsg.LEAVE_NAVI, ['是', '否'],
  // function(e) {
  // var button = $(e.target).attr('class');
  // if (button == 'ok') {
  // hideNaviPage();
  // switchVoiceIcon(false);
  // this.hide();
  // } else {
  // start();
  // this.hide();
  // }
  // });
}

// 提示是否重新规划
function showResetNavi() {
  layer.open({
    type: 1,
    title: false,
    content: errorMsg.AWAY_NAVI,
    btn: ['是', '否'], // 按钮
    closeBtn: 0,
    yes: function(index, layero) {
      // do something
      layer.close(index); // 如果设定了yes回调，需进行手工关闭
      $("#startNavi").trigger('click');
    },
    btn2: function(index, layero) {
      globalData.isRecalcRoute = true;
      // 按钮【按钮二】的回调
      layer.close(index); // 如果设定了yes回调，需进行手工关闭
    }
  });

  // popTipShow.confirm('', errorMsg.AWAY_NAVI, ['是', '否'],
  // function(e) {
  // var button = $(e.target).attr('class');
  // if (button == 'ok') {
  // $("#startNavi").trigger('click');
  // this.hide();
  // } else {
  // this.hide();
  // }
  // });
}

// 提示是否切换楼层
function confirmFloorChange(gid) {
  layer.open({
    type: 1,
    title: false,
    content: errorMsg.CHANGE_FLOOR,
    btn: ['是', '否'], // 按钮
    closeBtn: 0,
    yes: function(index, layero) {
      switchFloor(gid);
      // do something
      layer.close(index); // 如果设定了yes回调，需进行手工关闭
    },
    btn2: function(index, layero) {
      // 按钮【按钮二】的回调
      layer.close(index); // 如果设定了yes回调，需进行手工关闭
    }
  });

  // popTipShow.confirm('', errorMsg.CHANGE_FLOOR, ['是', '否'],
  // function(e) {
  // var button = $(e.target).attr('class');
  // if (button == 'ok') {
  // switchFloor(gid);
  // this.hide();
  // } else {
  // this.hide();
  // }
  // });
}

// 更新输入框中是我的位置的图标
function updateMyLocInfo() {
  // 当前页面出在路径规划页面
  if (pageindex == 1) {
    void 0;
    var tmps = $("#route-panel input[name='startTxt']").val(),
      tmpe = $("#route-panel input[name='endTxt']").val();
    var needSMarker = isMyLocation(tmps),
      needEMarker = isMyLocation(tmpe);
    var preStartPnt = getPointByName("#route-panel input[name='startTxt']");
    var preEndPnt = getPointByName("#route-panel input[name='endTxt']");

    void 0;

    // 如果起点是我的位置
    if (needSMarker) {
      var dis = getTwoPntDistance(preStartPnt, globalData.cur_Point);
      if (dis >= globalData.minReRouteDis) {
        void 0;
        setInputDataAttr("#route-panel input[name='startTxt']", globalData.cur_Point);
        addRouteLine(globalData.cur_Point, globalData.cur_Point.groupID, needSMarker, preEndPnt, preEndPnt.groupID, needEMarker);
      }
    }

    // 如果终点是我的位置
    if (needEMarker) {
      var dis = getTwoPntDistance(preEndPnt, globalData.cur_Point);
      if (dis >= globalData.minReRouteDis) {
        setInputDataAttr("#route-panel input[name='endTxt']", globalData.cur_Point);
        addRouteLine(preStartPnt, preStartPnt.groupID, needSMarker, globalData.cur_Point, globalData.cur_Point.groupID, needEMarker);
      }
    }
  }
}

// 获取声音状态
function getVoiceStatus() {
  if ($("#voiceStatus").children().hasClass("voice-active")) return false;
  else return true;
}

// 通用提示弹层
function commonAlert(content) {
  layer.msg(content, {
    time: 1000
  }, function() {
    // 只关闭提示层
    layer.closeAll('dialog'); // 关闭信息框
  });
};

function showNaviGroupShade() {
  var fh = $("#fengMap").height(),
    gh = $(".fm-control-groups").height(),
    gt = $(".fm-control-groups").offset().top;
  $("#groupLayer_Shade").height(gh);
  $("#groupLayer_Shade").css('bottom', (fh - gh - gt) + 'px');
  $("#groupLayer_Shade").css('z-index', 1000);
  $("#groupLayer_Shade").show();
}

function hideNaviGroupShade() {
  $("#groupLayer_Shade").css('z-index', 0);
  $("#groupLayer_Shade").hide();
}