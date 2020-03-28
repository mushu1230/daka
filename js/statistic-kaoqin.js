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
                    var date = data[i].date;
                    var recent = data[i].recent;
                    var time = data[i].time;
                    var address = data[i].address;
                    //暂时的数据
                    html +='<a class="weui-cell report-cell" href="#">';
                    html +='<div class="customer-group">';
                    html +='<div class="img">刘</div>';
                    html +='<div class="content">';
                    html +='<div class="info-myAtt">';
                    html +='<span class="name">刘娜娜</span>';
                    html +='<div class="date">2019-06-06</div>';
                    html +='</div>';
                    html +='</div>';
                    html +='<div class="unread">未读</div>';
                    html +='<div class="read">已读</div>';	
                    html +='</div>';
                    html +='<div class="report">';
                    html +='<div class="describe">工作内容:<p>销售云平台系统销售云平台系统销售云平台系统销售</p></div>';
                    html +='</div>';
                    html +='</a >';
					
                }
                $("#content").append(html);
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