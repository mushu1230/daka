var pages = 3;
var sizes = 3;
var total = 5;
var loading = false;
$(function() {
	loadlist();
	loading = false; //状态标记
})
//============================滚动加载
$("#container").infinite().on("infinite", function() {
	if(loading) return;
	loading = true;
	pages++; //页数
	$('.weui-loadmore').show();
	setTimeout(function() {
		loadlist();
		loading = false;
	}, 1000);
});
// =======加载数据loadlist();
function loadlist() {
	var html = "";
	$.ajax({
		type: "get",
		url: "shuju.json",
		data: { 'page': pages, 'limit': sizes, },
		dataType: "json",
		error: function(request) {
			$(".weui-loadmore").hide();
			html += '<div class=" weui-loadmore_line" style="width:65%;margin:1.5em auto;line-height:1.6em;font-size:14px;text-align:center">\n' +
				'<span class="weui-loadmore__tips">无更多数据</span>\n' +
				'</div>';
			$("#content").append(html);
		},
		success: function(data) {
			console.log(data)
			var data_length = data.length;
			if(data.length > 0) {
				for(var i = 0; i < data.length; i++) {
					var name = data[i].name;
					var num = data[i].num;
					var state = data[i].state;
					var cost = data[i].cost;
					//暂时的数据
					console.log(state)
					html += '<div class="weui-cells">';
					html += '<div class="weui-cell">';
					html += '<div class="contractL">';
					html += '<div class="item">';
					html += '<div class="itemName">商丘智慧银行项目</div>';
					html += '<div class="item-content">';
					html += '<div class="item-list">合同编号:<span>123451597845</span></div>';
					html += '<div class="item-list">签约时间:<span>2019:10:25</span></div>';
					html += '<div class="item-list">提交人:<span>张三</span></div>';
					html += '</div>';
					html += '</div>';
					html += '</div>';
					html += '<a href="" class="contractR">下载预览</a>';
					html += '</div>';
					html += '<div class="review-btn">';
					html += '<div class="normal">';
					html += '<a href="" class="reviewL">通过审核</a>';
					html += '<a href="" class="reviewR">驳回申请</a>';
					html += '</div>';
					html += '<div class="pass" style="display:none">已通过</div>';
					html += '<div class="fail" style="display:none">已驳回</div>';
					html += '</div>';
					html += '</div>';
				}
				$("#content").append(html);
//				progress()
			} else {
				html += '<div class="weui-loadmore_line" style="width:65%;margin:1.5em auto;line-height:1.6em;font-size:14px;text-align:center">\n' +
					'<span class="weui-loadmore__tips">无更多数据</span>\n' +
					'</div>';
				$("#content").append(html);
				loading = true;
			}
			$(".weui-loadmore").hide();
		}
	});
}