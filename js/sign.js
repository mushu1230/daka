var pages = 1;
var sizes = 7;
var total = 0;
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
//      data: { 'page': pages, 'limit': sizes,},
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
                    html +='<div class="timeline clear">';
                    html +='<div class="date">';
                    html +='<p>' + data[i].date + '</p>';
                    html +='</div>';
                    html +='<ul>';
                    html +='<li class="timeline-item">';
                    html +='<div class="timeline-item-color timeline-item-head"></div>';
                    html +='<div class="timeline-item-tail hide"></div>';
                    html +='<div class="timeline-item-content">';
                    html +='<h4 class="recent">' + data[i].recent + '</h4>';
                    html +='<span class="time">' + data[i].time + '</span>';
                    html +='<p class="record-address">' + data[i].address + '</p>';
                    html +='</div>';
                    html +='</li>';
                    html +='</ul>'; 
                    html +='</div>';
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
};


function a(){
Calendar.prototype.addEvent();
//alert("1")
}