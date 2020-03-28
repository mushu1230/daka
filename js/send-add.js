// 系统默认参数
var endHtml = 0;
var html = '';
var domRight = document.getElementById('rightCont');
var chooseCount = 0; // 选中数据（条）
var oldSearch = ''; // 搜索值（旧）
var chooseList = [];
var chooseState; // 选中父级计算使用
// 用户配置参数
var baseDom = document.createElement('div');
var baseData = [];

function group(data) {
	baseData = data;
	this.go = function() {
		dataFormat(baseData); // 数据格式化
		document.getElementById('leftCont').innerHTML = renderLeft(baseData, baseDom); // 渲染左侧
		chooseParent(); // 选中父级
		renderRight(baseData); // 渲染右侧
		setInterval(function() {
			realSearch(); // 实时搜索
		}, 100);
	};
}

// 数据格式化
function dataFormat(e) {
	var level = 1;
	var baseGroup = '';

	// 设置标识属性
	function returnGroup(level, item, index) {
		var group = '';
		var curLevel = baseGroup.split('-');
		if(level == curLevel.length - 1) {
			baseGroup = baseGroup.replace(/-\d+$/g, '');
		}
		group = baseGroup + '-' + index;
		return group;
	}

	function arrFormat(data) {
		for(var i = 0; i < data.length; i++) {
			var item = data[i];

			baseGroup = returnGroup(level, item, i);
			item.group = baseGroup;

			if(item.children.length > 0) {
				level++;
				arrFormat(item.children);
			} else {
				if(i == data.length - 1) {
					level--;
					baseGroup = baseGroup.replace(/-\d+$/g, '');
				}
			}
		}
	}

	arrFormat(e);
}

// 统计各部门人数
function getPeoNum(data) {
	var number = 0

	// 循环遍历子数据
	function loopChildren(childrenData) {
		for(var i = 0; i < childrenData.length; i++) {

			var item = childrenData[i]
			if(item.children.length > 0) {
				loopChildren(item.children)
			}

			if(item.last == true) {
				number++
			}
		}

	}

	loopChildren(data.children)
	return number
}

// 渲染左侧树形结构
function renderLeft(data, dom) {
	dom.innerHTML = '';
	if(Object.prototype.toString.call(data) === '[object Array]') {
		for(var i = 0; i < data.length; i++) {
			var checked = '';
			var disabled = '';
			var iconClass = 'icon__round--false';
			var parentName = '';
			var number = getPeoNum(data[i])
			var numberDom = '';
			var memberDisabled = ''

			// 统计部门人数
			if(data[i].last == false) {
				numberDom = '<div class="to__number">(' + number + '人)</div>'
			}

			if(oldSearch) {
				if(getParentName(data[i].group)) {
					parentName = '（' + getParentName(data[i].group) + '）'; // 父级名称
				}
			}

			// 判断按钮状态
			if(data[i].active == true) {
				checked = 'checked = true';
				disabled = 'disabled = true';
				memberDisabled = 'memberDisabled';
				iconClass = 'icon__round--disabled';
			}

			var subItemClass = 'to__subItem';
			// 默认展开
			subItemClass = 'to__subItem to__show';

			// 控制箭头样式
			var item = document.createElement('div');
			var arrow = '<span class="to__dropdownList" ><i src="img/right-arrow.png" onclick="dropClick(this)"></i></span>';
			if(data[i].last == true) {
				arrow = '';
			}

			// 控制文件夹/头像样式
			var defaultImg = '';
			if(data[i].last == true) {
				defaultImg = data[i].img || 'img/header-icon.png';
			} else {
				defaultImg = data[i].img || 'img/icon-folder.svg';
			}
			var prefix = '<span class="to__prefix"><img src="' + defaultImg + '"></img></span>';

			// 渲染dom
			//          item.innerHTML = '<div class="weui-cell to__item " id="group_' + data[i].group + '">' + arrow + '<span class="member ' + memberDisabled + '" onclick="nodeClick(this)"><input id="input'+ data[i].group +'" ' + disabled + ' type="checkbox"  ' + checked + '" name="cName"  value="' + data[i].name + '" onclick="checkboxClick(this)" />' + prefix + '<div class="text"><div class="to__name">' + data[i].name + '</div><div class="to__post">' +data[i].post + '</div></div>' + numberDom + '<div class="to__parentName">' + parentName + '</div><span class="icon__round ' + iconClass + '"></span></span></div>';
			item.innerHTML = '<div class="weui-cell to__item " id="group_' + data[i].group + '">' + arrow + '<span class="member ' + memberDisabled + '" onclick="nodeClick(this)"><input :disabled = "data[i].disabled === true" id="input' + data[i].group + '" type="checkbox"  ' + checked + '" name="cName"  value="' + data[i].name + '" onclick="checkboxClick(this)" />' + prefix + '<div class="text"><div class="to__name">' + data[i].name + '</div><div class="to__post">' + data[i].post + '</div></div>' + numberDom + '<div class="to__parentName">' + parentName + '</div><span class="icon__round ' + iconClass + '"></span></span></div>';

			dom.appendChild(item);

			// 添加子元素
			var subItem = document.createElement('div');
			subItem.className = subItemClass;

			item.appendChild(subItem);
			if(data[i].children.length > 0 && data[i].last != true) {
				checked = false;
				subItemClass = 'to__subItem';
				renderLeft(data[i].children, subItem);
			} else {
				checked = false;
				subItemClass = 'to__subItem';
			}
		}
	}

	return baseDom.innerHTML;
}

function chooseParent() {
	var domList = document.getElementById('leftCont').querySelectorAll('.icon__round--true');
	//父级input按钮隐藏
	$(".to__dropdownList").siblings().find(".icon__round").hide();
	$(".to__dropdownList").siblings().css("margin-left", "0px");
	$(".to__dropdownList").siblings().css("pointer-events", "none");

	for(var i = 0; i < domList.length; i++) {
		console.log()
		var item = domList[i];
		var input = item.parentNode.firstChild;
		input.checked = true;
		var group = (input.id).replace('input', '')
		chooseState(baseData, group, true);
	}
}

// 渲染右侧树形结构
function renderRight(data) {
	chooseCount = 0;
	domRight.innerHTML = '';
	chooseList = [];
	loopRight(data);
	document.getElementById('selectNum').innerHTML = chooseCount;
}

function loopRight(data) {
	for(var i = 0; i < data.length; i++) {
		var item = data[i];
		if(item.children.length > 0 && item.last != true) {
			loopRight(item.children);
		} else {
			if((item.last == true || oldSearch) && item.active == true) {
				var parentName = '';
				if(getParentName(item.group)) {
					parentName = '（' + getParentName(item.group) + '）'; // 父级名称
				}
				chooseCount++;
				var div = document.createElement('div');
				div.className = 'to__item';
				div.innerHTML = '<span class="unread">未读</span><span class="wait">待审批</span><span class="pass">通过</span><span class="refuse" >拒绝</span><span class="to__prefix"><img src="img/header-icon.png"></img></span><span class="to__name render" id="render' + item.group + '" >' + item.name + '</span><div class="to__parentName" style="display:none"></div><span id="to__close" class="to__close" onclick="nodeCencel(this)"><i></i></span>';
				domRight.appendChild(div);
				if(item.value) {
					chooseList.push(item.value);
				}
			}
		}
	}
}

// 循环遍历父级节点选中状态
function loopParentState(group) {
	// 父级节点对象
	group = group.replace(/-\d+$/g, '');

	// 循环遍历符合条件为止
	function getChildrenActive(data) {
		for(var i = 0; i < data.length; i++) {
			var item = data[i];
			// 匹配对象group
			if(item.group == group) {
				var childActiveList = 0;
				for(var b = 0; b < item.children.length; b++) {
					var childItem = item.children[b];
					if(childItem.active == true) {
						childActiveList++;
					}
				}
				// 符合全选
				if(childActiveList == item.children.length) {
					item.active = true;
				}
				// 符合取消全选
				else if(childActiveList == 0) {
					item.active = false;
				}
				// 遍历结束
				else {
					item.active = false;
				}

				if(document.getElementById('group_' + item.group)) {
					var dom = document.getElementById('group_' + item.group);
					dom.querySelector('input').checked = item.active;
					dom.querySelector('.icon__round').className = 'icon__round icon__round--' + item.active;
				}
				loopParentState(group);
			} else {
				getChildrenActive(item.children);
			}
		}
	}

	getChildrenActive(baseData);
}

// 获取父级节点名称
function getParentName(group) {
	group = group.replace(/-\d+$/g, '');
	var name = '';

	function getName(data) {
		for(var i = 0; i < data.length; i++) {
			var item = data[i];

			// 匹配对象group
			if(item.group == group) {
				name = item.name;
			}

			if(item.children.length > 0) {
				getName(item.children);
			}
		}
	}

	getName(baseData);

	return name;
}

// 改变data选中状态
function chooseState(data, group, cancelChoose) {
	// 改变当前状态
	for(var i = 0; i < data.length; i++) {
		var item = data[i];

		if(item.group == group) {
			// 修改当前
			if(cancelChoose != true) {
				item.active = !item.active;
			}

			// 子集状态选中
			function updateChild(childData, state) {
				for(var a = 0; a < childData.length; a++) {
					childData[a].active = state;
					if(childData[a].children.length > 0) {
						updateChild(childData[a].children, state);
					}
				}
			}

			if(item.children.length > 0) {
				updateChild(item.children, item.active);
			}

			// 遍历父级选中状态
			loopParentState(item.group);
		}

		// 循环判断是否符合条件
		if(item.children.length > 0) {
			chooseState(item.children, group, cancelChoose);
		} else {}
	}
}

// 冒泡事件
function checkboxClick(e) {
	e.checked = !e.checked;
}

// 树形节点单击事件
function nodeClick(e) {
	// 选中当前元素input框
	var input = e.querySelector('input');
	input.checked = !input.checked;

	var name = input.value;
	console.log(name)
	e.lastElementChild.className = 'icon__round icon__round--' + input.checked;
	if(input.disabled = true) {}

	// 选中子元素所有input框
	var subItem = e.parentNode.nextElementSibling;

	if(subItem) {
		var inputList = subItem.querySelectorAll('.to__item');
		for(var i = 0; i < inputList.length; i++) {
			var item = inputList[i];
			item.querySelector('input').checked = input.checked;
			var iconDom = item.querySelector('input').parentNode.querySelector(".icon__round");
			iconDom.className = 'icon__round icon__round--' + input.checked;
		}
	}

	var group = (input.id).replace('input', '')
	chooseState(baseData, group);
	renderRight(baseData);

	console.log('添加后的数组: ');
	console.log(chooseList);
}

// 移除选中的节点
function nodeCencel(e) {
	// 当前dom节点在父级节点内排第几项就删除数组第几项
	var perentDom = e.parentNode;
	var index = Array.prototype.indexOf.call(perentDom.parentNode.children, perentDom);
	if(index == 0) {
		chooseList.shift();
	} else if(index == chooseList.length - 1) {
		chooseList.pop();
	} else {
		chooseList.splice(index, 1);
	}
	console.log('删除后的数组: ');
	console.log(chooseList);

	// 修改baseData数据
	var group = e.parentNode.querySelector(".to__name").id.replace('render', '');
	chooseState(baseData, group);
	renderRight(baseData);

	// 修改dom多选框状态
	var cList = document.getElementsByName('cName');
	for(var i = 0; i < cList.length; i++) {
		var item = cList[i];
		var itemGroup = (item.id).replace('input', '')

		if(itemGroup == group) {
			item.checked = false;
			var iconDom = item.parentNode.querySelector(".icon__round");
			iconDom.className = 'icon__round icon__round--' + item.checked;
			break;
		}
	}
}

// 改变data结构
function updateNode(name) {
	var data = [];

	// 遍历数据
	function getData(childData) {
		for(var i = 0; i < childData.length; i++) {
			var item = childData[i];
			if(item.name.indexOf(name) > -1) {
				if(item.last == true) {
					data.push(item);
				}
			}

			if(item.children.length > 0 && item.last != true) {
				getData(item.children);
			}
		}
	}
	getData(baseData); // 匹配数据
	document.getElementById('leftCont').innerHTML = renderLeft(data, baseDom); // 渲染左侧
}

// 实时搜索
function realSearch() {
	var dom = document.getElementById('searchInput');
	if(oldSearch != dom.value) {
		oldSearch = dom.value;
		updateNode(dom.value);

		if(oldSearch == '') {
			document.getElementById('leftCont').innerHTML = renderLeft(baseData, baseDom); // 渲染左侧
			chooseParent(); // 选中父级
		}
	}

}

// 下拉框点击事件
function dropClick(dom) {
	// 切换样式状态
	if(dom.className.indexOf('to__roate') > -1) {
		dom.className = '';
	} else {
		dom.className = 'to__roate';
	}

	// 显示隐藏内容
	var domShow = dom.parentNode.parentNode.nextElementSibling;
	if(domShow.className.indexOf('to__show') > -1) {
		domShow.className = 'to__subItem';
	} else {
		domShow.className = 'to__subItem to__show';
	}
}
//解决搜索框无效问题
$(function() {
	var $searchBar = $('#searchBar'),
		$searchResult = $('#searchResult'),
		$searchText = $('#searchText'),
		$searchInput = $('#searchInput'),
		$searchClear = $('#searchClear'),
		$searchCancel = $('#searchCancel');

	function hideSearchResult() {
		$searchResult.hide();
		$searchInput.val('');
	}

	function cancelSearch() {
		hideSearchResult();
		$searchBar.removeClass('weui-search-bar_focusing');
		$searchText.show();
	}

	$searchText.on('click', function() {
		$searchBar.addClass('weui-search-bar_focusing');
		$searchInput.focus();
	});
	$searchInput
		.on('blur', function() {
			if(!this.value.length) cancelSearch();
		})
		.on('input', function() {
			if(this.value.length) {
				$searchResult.show();
			} else {
				$searchResult.hide();
			}
		});
	$searchClear.on('click', function() {
		hideSearchResult();
		$searchInput.focus();
	});
	$searchCancel.on('click', function() {
		cancelSearch();
		$searchInput.blur();
	});
});