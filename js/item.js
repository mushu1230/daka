var pages = 3;
var sizes = 3;
var total = 5;
var loading = false;
$(function () {
    loadlist();
    loading = false;  //状态标记
})
//============================滚动加载
$("#container").infinite().on("infinite", function () {
    if (loading) return;
    loading = true;
    pages++; //页数
    $('.weui-loadmore').show();
    setTimeout(function () {
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
        data: { 'page': pages, 'limit': sizes,},
        dataType: "json",
        error: function (request) {
            $(".weui-loadmore").hide();
            html += '<div class=" weui-loadmore_line" style="width:65%;margin:1.5em auto;line-height:1.6em;font-size:14px;text-align:center">\n' +
                '<span class="weui-loadmore__tips">无更多数据</span>\n' +
                '</div>';
            $("#content").append(html);
        },
        success: function (data) {
        	console.log(data)
            var data_length = data.length;
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                	var name = data[i].name;
                    var num = data[i].num;
                    var state = data[i].state;
                    var cost = data[i].cost;
                    //暂时的数据
					console.log(state)
					html +=  '<div class="weui-cells">';
					html +=    '<div class="weui-cell">';
					html +=      '<div class="item">';
					html +=        '<div class="itemName">';
					html +=        data[i].name;
					html +=        '</div>';
					//审批、通过、拒绝、施工中四个状态对应itemState1、itemState2、itemState3、itemState4css
                    html +=        '<div class="itemState itemState1">';
                    html +=        '<span>';
                    html +=        data[i].state;
                    html +=        '</span>';       
                    html +=        '</div>';
                    html +=      '</div>';
                    html +=      '<div class="item">';
                    html +=        '<div class="contractInfo">';
                    html +=          '<div class="contractNum">合同编号:';
                    html +=          	'<span>';
                    html +=          		data[i].num;
                    html +=          	'</span>';
                    html +=        	 '</div>';
                    html +=        '</div>';
                    html +=      '</div>';
                    html +=      '<div class="item contractCost">实施费用:';
                    html +=          '<span>';
                    html +=          data[i].cost;
                    html +=          '</span>';
                    html +=        '</div>';
                    html +=    '</div>';
                    html +=  '</div>';
                }
                $("#content").append(html);
//              progress()
            }
            else {
                html += '<div class="weui-loadmore_line" style="width:65%;margin:1.5em auto;line-height:1.6em;font-size:14px;text-align:center">\n' +
                    '<span class="weui-loadmore__tips">无更多数据</span>\n' +
                    '</div>';
                $("#content").append(html);
                loading =true;
            }
            $(".weui-loadmore").hide();
        }
    });
}