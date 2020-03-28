//审批页面
function sp() {
	var baseData2 = [{
		name: "全选",
		post: "",
		active: false,
		last: false,
		img: "",
		children: [
			// 模拟数据
			{
				name: "行政人事中心",
				post: "",
				active: false,
				last: false,
				img: "",
				children: [{
						value: 1, // 最低一层必须提供 value 键名
						name: "刘娜娜",
						post: "行政人事中心经理",
						active: true, //true 为默认选中
						remove: false,
						last: true, // last = true 代表最低一层
						img: "img/remind.png", // 个性化icon图标，否则采用默认
						children: [] // 每一个对象必须提供children键名，如果没有数据也需要一个空数组[]
					},
					{
						value: 2,
						name: "程盼盼",
						post: "司机",
						active: true,
						last: true,
						img: "img/remind.png",
						children: []
					},
					{
						value: 3,
						name: "刘文娟",
						post: "人事专员",
						active: false,
						last: true,
						img: "img/remind.png",
						children: []
					},
				]
			},
			{
				name: "运营管理中心",
				post: "",
				active: false,
				last: false,
				img: "",
				children: [{
						value: 4,
						name: "王晓梦",
						post: "运营管理中心经理",
						children: [],
						active: false,
						last: true,
						img: "img/remind.png",
					},
					{
						value: 5,
						name: "aaa",
						post: "bbb",
						children: [],
						active: false,
						last: true,
						img: "img/remind.png",
					}
				]
			},
			{
				name: "总经理",
				post: "",
				active: false,
				last: false,
				img: "",
				children: [{
					value: 6,
					name: "邱新明",
					post: "总经理",
					children: [],
					active: false,
					last: true,
					img: "img/remind.png",
				}]
			},
		]
	}];

	var result = new group2(baseData2);
	result.go();

	function done(baseData2, ele) {
		var temp = [];
		for(var index = 0; index < baseData2.length; index++) {
			if(baseData2[index] == ele) {
				temp.push(true);
			}
		}
		return temp.length;
	}
	console.log(done(baseData2, "value"));

};
//抄送页面
function cs() {
	var baseData = [{
		name: "全选",
		post: "",
		active: false,
		last: false,
		img: "",
		children: [
			// 模拟数据
			{
				name: "行政人事中心",
				post: "",
				active: false,
				last: false,
				img: "",
				children: [{
						value: 1, // 最低一层必须提供 value 键名
						name: "刘娜娜",
						post: "行政人事中心经理",
						active: true, //true 为默认选中
						remove: false,
						last: true, // last = true 代表最低一层
						img: "img/remind.png", // 个性化icon图标，否则采用默认
						children: [] // 每一个对象必须提供children键名，如果没有数据也需要一个空数组[]
					},
					{
						value: 2,
						name: "程盼盼",
						post: "司机",
						active: true,
						last: true,
						img: "img/remind.png",
						children: []
					},
					{
						value: 3,
						name: "刘文娟",
						post: "人事专员",
						active: false,
						last: true,
						img: "img/remind.png",
						children: []
					},
				]
			},
			{
				name: "运营管理中心",
				post: "",
				active: false,
				last: false,
				img: "",
				children: [{
						value: 4,
						name: "王晓梦",
						post: "运营管理中心经理",
						children: [],
						active: false,
						last: true,
						img: "img/remind.png",
					},
					{
						value: 5,
						name: "aaa",
						post: "bbb",
						children: [],
						active: false,
						last: true,
						img: "img/remind.png",
					}
				]
			},
			{
				name: "总经理",
				post: "",
				active: false,
				last: false,
				img: "",
				children: [{
					value: 6,
					name: "邱新明",
					post: "总经理",
					children: [],
					active: false,
					last: true,
					img: "img/remind.png",
				}]
			},
		]
	}];

	var result = new group(baseData);
	result.go();

	function done(baseData, ele) {
		var temp = [];
		for(var index = 0; index < baseData.length; index++) {
			if(baseData[index] == ele) {
				temp.push(true);
			}
		}
		return temp.length;
	}
	console.log(done(baseData, "value"));

};

//点击穿透
$(function() {
	FastClick.attach(document.body);
});

//时间选择组件
(function($) {
	$.init();
	var result = $('.btn')[0];
	var btns = $('.btn');
	btns.each(function(i, btn) {
		btn.addEventListener('tap', function() {
			var _self = this;
			if(_self.picker) {
				_self.picker.show(function(rs) {
					result.value = rs.text;
					_self.picker.dispose();
					_self.picker = null;
				});
			} else {
				var optionsJson = this.getAttribute('data-options') || '{}';
				var options = JSON.parse(optionsJson);
				var id = this.getAttribute('id');
				/*
				 * 首次显示时实例化组件
				 * 示例为了简洁，将 options 放在了按钮的 dom 上
				 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
				 */
				_self.picker = new mui.DtPicker({
					type: "date", //设置日历初始视图模式 
					beginDate: new Date(2015, 04, 25), //设置开始日期 
					endDate: new Date(2020, 04, 25), //设置结束日期 
				})
				_self.picker.show(function(rs) {
					/*
					 * rs.value 拼合后的 value
					 * rs.text 拼合后的 text
					 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
					 * rs.m 月，用法同年
					 * rs.d 日，用法同年
					 * rs.h 时，用法同年
					 * rs.i 分（minutes 的第二个字母），用法同年
					 */
					result.value = rs.text;
					/* 
					 * 返回 false 可以阻止选择框的关闭
					 * return false;
					 */
					/*
					 * 释放组件资源，释放后将将不能再操作组件
					 * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
					 * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
					 * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
					 */
					_self.picker.dispose();
					_self.picker = null;
				});
			}

		}, false);
	});
})(mui);

//全屏弹窗组件
var fullBtn = ".full";
var fullBox = ".fullBox";
var closeBtn = ".close-full";
full()
document.querySelector('.mui-table-view.mui-table-view-radio').addEventListener('selected', function(e) {

	closeFull()
	$(".full").text($(e.detail.el).find(".name").text()).css("color", "#333")

});