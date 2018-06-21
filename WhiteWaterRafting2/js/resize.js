$(function () {
    onResize();
    window.onresize = function(){
        onResize();
    }
})
function onResize(){
	var _w = document.documentElement.clientWidth;
    var _h = document.documentElement.clientHeight;
    var _x = _w/1920;
    var _y = _h/974;
    
    $(".main").css({
    	"width": 1920*_x,
    	"height": 974*_y,
    	"paddingLeft": 20*_x,
		"paddingTop": 20*_y,
    	"paddingRight": 20*_x,
		"paddingBottom": 20*_y,
    });
    
    $(".main_title").css({
    	"height": 55*_y,
    	"lineHeight": 55*_y+'px'
    });

    $(".o_title").css({
		width: 1852*_x,
		height: 55*_y
	})

    $(".main_container").css({
        "width": 1920*_x,
        "height": 974*_y,
        "paddingLeft": 20*_x,
        "paddingTop": 20*_y,
        "paddingRight": 20*_x,
        "paddingBottom": 20*_y,
	});
    
    $(".module1").css({
    	"width": 525*_x,
    	"height": 415*_y,
    	"marginTop": 20*_y
    })
    
    $("#location_echarts").css({
    	"width": 505*_x,
    	"height": 455*_y
    })
    
    $(".module2").css({
    	"width": 355*_x,
    	"height": 85*_y,
    	"marginTop": 20*_y,
    	"marginLeft": 40*_x
    });
    
    $("#myTargetElement").css({
    	"width": 300*_x,
    	"height": 40*_y,
    	"fontSize": 40,
    	"lineHeight": 40*_y+'px'
    });

    $(".module3").css({
        "width": 355*_x,
        "height": 85*_y,
        "marginTop": 20*_y,
        "marginLeft": 40*_x
    });

    $("#user_num").css({
        "width": 300*_x,
        "height": 40*_y,
        "fontSize": 40,
        "lineHeight": 40*_y+'px'
    })
    
    $(".module4").css({
    	"width": 550*_x,
    	"height": 860*_y,
    	"marginTop": 15*_y,
    	"marginBottom": 15*_y,
		"marginRight": 20*_x,
    })
    
    $(".loc_user_container").css({
    	"height": 300*_y,
		"width": 500*_x
    })
    
    $(".loc_map").css({
    	"height": 465*_y,
    	"marginTop": 50*_y
    })
    
    $("#cut_map").css({
    	"width": 200*_x,
    	"height": 50*_y
    })
    
    $("#loc_emap").css({
    	"width": 550*_x,
    	"height": 440*_y
    })
    
    $("#loc_user").css({
        "width": 520*_x,
        "height": 440*_y
    })
    
    $(".module5").css({
    	"width": 825*_x,
    	"height": 410*_y
    })

	$("#density").css({
        "width": 550*_x,
        "height": 440*_y
	})
    
    $(".module6").css({
    	"width": 235*_x,
    	"height": 205*_y,
    	"marginTop": 10*_y,
    	"marginLeft": 15*_x
    })

	$(".mo_list").css({
		"width": 235*_x,
		"height": 205*_y,
		"marginLeft": 15*_x
	})

	$(".mo_list li").css({
		"width": 195*_x,
		"height": 41*_y

	})

	$(".mo_list li .mo_title").css({
        "height": 41*_y
	})

	$(".spinner_content2").css({
		"left": -130*_x,
		"top": 10*_y
	})

    //
	$(".mo_number").css({
		"height": 41*_y
	})

    $("#statistics").css({
    	"width": 235*_x,
    	"height": 205*_y
    })
    
    $(".module7").css({
    	"width": 525*_x,
    	"height": 415*_y,
		"marginTop": -60*_y
    })
    
    $("#theday_echarts").css({
    	"width": 520*_x,
    	"height": 440*_y
    })

    $(".module8").css({
    	"width": 790*_x,
    	"height": 170*_y,
    	"marginLeft": 20*_x
    })
    
    $("#thedayloc_echarts").css({
    	"width": 790*_x,
    	"height": 225*_y,
		"marginTop": -32*_y
    })
    
    $(".module9").css({
    	"width": 500*_x,
    	"height": 255*_y,
    	"marginTop": 10*_y
    })
    
     $("#user_source").css({
    	"width": 205*_x,
    	"height": 175*_y,
		 "marginTop": -20*_y
    })
    
    $(".module10").css({
    	"width": 790*_x,
    	"height": 170*_y,
    	"marginLeft": 20*_x,
    	"marginTop": 15*_y
    })
    
    $("#thedayrice_echarts").css({
    	"width": 790*_x,
    	"height": 225*_y,
		"marginTop": -30*_y
    })
       
}