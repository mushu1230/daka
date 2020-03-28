//下拉框颜色
$("select").on('change', function() {
	if($(this).val() !== "") {
		$(this).addClass("sec2");
	}
})

//list暂无更多数据
function nolist() {
	var tagLength = $(partentBox).find(childTag).length
	if(tagLength == 0) {
		$(partentBox).append("<div class='noMore'>" + listText + "</div>");
	}
}

var slidenum = 1;
//全屏弹窗
function full() {
	$(fullBtn).click(function() {
		var dataBtn = $(this).attr("data-full")
		$('body').find(".fullBox[data-full=" + dataBtn + "]").addClass("active");
		$("body").addClass("overflow-for-page")
		$("body>.content").append("<div class='mark'></div>");
		$(".mark").addClass("active")
	})
	$(closeBtn).click(function() {
		$(fullBox).removeClass("active");
		$("body").removeClass("overflow-for-page");
		$(".mark").remove()
		$("body ").removeClass("active")
		slidenum = 1
	})
	$(fullBox).click(function(e) {
		e.stopPropagation(); //阻止点击事件向上冒泡
	})
}
//筛选弹窗
function screenFull() {
	fullScreen()
	$(fullBtn).click(function() {
		$(fullBox).addClass("active");
		$("body").addClass("overflow-for-page")
		$("body>.content").append("<div class='mark'></div>");
		$(".mark").addClass("active full")
	})
	$(closeBtn).click(function() {
		$(fullBox).removeClass("active");
		$("body").removeClass("overflow-for-page");
		$(".mark").remove()
		$("body ").removeClass("active")
		slidenum = 1
	})

	$(fullBox).click(function(e) {
		e.stopPropagation(); //阻止点击事件向上冒泡
	})
	$(".item-content").click(function(e) {
		e.stopPropagation(); //阻止点击事件向上冒泡
	})
	$(".screen-date").click(function(e) {
		e.stopPropagation(); //阻止点击事件向上冒泡
	})
	$(".content").click(function() {
		$(fullBox).removeClass("active");
		$("body").removeClass("overflow-for-page");
		$(fullBox).find(".item").removeClass("active").removeClass("selected-hide")
	})
	
}
var closeFull = function() {
	$(fullBox).removeClass("active");
	$("body").removeClass("overflow-for-page");
}

//筛选弹窗内容
function fullScreen() {
	//item-content高度隐藏/显示
	$(".item-content").each(function() {
		var contentHeight = $(this).height()
		if(contentHeight > 88) {
			$(this).parents(".item-box").siblings(".item-title").append("<i class='iconfont icon-xiala'></i>")
			$(this).parents(".item-box").siblings(".item-title").click(function() {

				var boxHeight = $(this).siblings(".item-box").height()
				var contentHeight = $(this).siblings().find(".item-content").height()
				if(contentHeight == boxHeight) {
					$(this).siblings(".item-box").css("max-height", "88px")
					$(this).find("i").toggleClass("active")
				} else {
					$(this).siblings(".item-box").css("max-height", contentHeight)
					$(this).find("i").toggleClass("active")
				}

			})
		}
	})
	//item点击
	$(".item").click(function() {
		$(this).removeClass("selected-hide").siblings().addClass("selected-hide")
		if($(this).siblings().hasClass("active")) {
			$(this).addClass("active")
			$(this).siblings().removeClass("active")
		} else {
			$(this).toggleClass("active")
		}
	})
}
//列表筛选
function slide() {

	//点击按钮-[hd-slide]显示、隐藏
	$(".slide-btn").click(function() {
		if(slidenum == 1) {
			var btnIndex = $(this).index()
			$(".hd-slide").eq(btnIndex).toggleClass("active")
			if($(this).hasClass("full")) {} else {
				$("body>.content").append("<div class='mark'></div>");
				$(".mark ").toggleClass("active")
			}

			$("body ").toggleClass("active")
			slidenum = 0
		} else {
			$(".hd-slide").removeClass("active")
			$(".mark").remove();
			$("body ").removeClass("active")
			slidenum = 1
		}
	})
	//点击slide-page
	$(".slide-page").click(function() {
		$(this).addClass("selected").siblings(".slide-page").removeClass("selected")
		var dataSlide = $(this).attr("data-slide")
		$(".fullBox").find(".item[data-slide=" + dataSlide + "]").addClass("active").siblings().removeClass("active")
	})
	//点击其他地方-隐藏
	$(".content").click(function() {
		$(".hd-slide").removeClass("active")
		$(".mark").remove();
		$("body ").removeClass("active")
		slidenum = 1
	})
	//点击[hd-slide]选项-按钮高亮
	$(".hd-slide li").click(function() {
		var slideIndex = $(this).parents(".hd-slide").index(".hd-slide");
		$(this).children("a").addClass("selected ")
			.parent().siblings().children("a").removeClass("selected");
		$(".slide-btn").eq(slideIndex).addClass("selected")
			//.siblings().removeClass("selected");
		//$(".hd-slide").eq(slideIndex).siblings().find("a").removeClass("selected");

		
		if($(this).index()==0){
			$(this).children("a").removeClass("selected")
			
			$(this).parents(".hd-slide").attr("id","uio")
			.siblings().removeAttr("id")
		    $(".slide-btn").eq($(".hd-slide").index($('#uio'))).removeClass("selected")
		}
	})
	$(".slide-btn").on("click", function(e) {
		e.stopPropagation();
	})
	
}

//进度条
function progress() {
	var progressWidth = $(".progressBar").attr("data-progress")
	$(".progressBar").css("width", progressWidth + "%")
}

//点击水波纹
function tap() {
	$(".weui-cell ").click(function() {
		$(".tap").remove()
		$(this).append("<div class='tap'></div>")
		var e = event || window.event;
		var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
		var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
		var x = e.pageX || e.clientX + scrollX;
		var y = e.pageY || e.clientY + scrollY;
		var w = $('.tap').width()
		var h = $('.tap').height()
		var cellx = $(this).offset().left
		var celly = $(this).offset().top

		$('.tap').css("top", y - h / 2 - celly).css("left", x - w / 2 - cellx)
		$('.tap').addClass('active')
	})
}

//记录内容
function record() {
	var int
	$("body").append("<div class='recordTips'></div>")
	$("textarea").focus(function() {
		var tareaId = $(this).attr("id") //获取ID
		var time = new Date()
		int = window.setInterval(function() {
			var tarea = $("#" + tareaId).val() //获取val
			localStorage.setItem("tarea" + tareaId, tarea)
			$(".recordTips").text("上次保存时间： "+time.toLocaleString())
		}, 600)

	})
	//失焦停止记录
	$("textarea").blur(function() {
		window.clearInterval(int)
	})
	//清除内容
	$(".rbtn").click(function() {
		localStorage.clear()
	})

	$("textarea").each(function() {
		var tareaId = $(this).attr("id")
		var tareaVar = localStorage.getItem("tarea" + tareaId)
		$("#" + tareaId).val(tareaVar)
	})
	
}

//textarea自适应高度
$(document).ready(function () {
    $('textarea').each(function () {
    	this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
    }).on('input', function () {
    	this.style.height = 'auto'; this.style.height = (this.scrollHeight) + 'px';
    });
});
//第几周选择
$("#picker").picker({
	title: "请选择第几周",
	cols: [
	    {
	      textAlign: 'center',
	      values: ['第一周', '第二周', '第三周', '第四周','第五周']
	    }
	  ]
});

