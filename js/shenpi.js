// 系统默认参数
var endHtml = 0;
var html = '';
var domRight2 = document.getElementById('rightCont2');
var chooseCount2 = 0; // 选中数据（条）
var oldSearch2 = ''; // 搜索值（旧）
var chooseList2 = [];
var chooseState2; // 选中父级计算使用
// 用户配置参数
var baseDom2 = document.createElement('div');
var baseData2 = [];

function group2(data) {
    baseData2 = data;
    this.go = function() {
        dataFormat2(baseData2); // 数据格式化
        document.getElementById('leftCont2').innerHTML = renderLeft2(baseData2, baseDom); // 渲染左侧
        chooseParent2(); // 选中父级
        renderRight2(baseData2); // 渲染右侧
        setInterval(function() {
            realSearch2(); // 实时搜索
        }, 100);
    };
}

// 数据格式化
function dataFormat2(e) {
    var level = 1;
    var basegroup2 = '';

    // 设置标识属性
    function returngroup2(level, item, index) {
        var group2 = '';
        var curLevel = basegroup2.split('-');
        if (level == curLevel.length - 1) {
            basegroup2 = basegroup2.replace(/-\d+$/g, '');
        }
        group2 = basegroup2 + '-' + index;
        return group2;
    }

    function arrFormat(data) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];

            basegroup2 = returngroup2(level, item, i);
            item.group2 = basegroup2;

            if (item.children.length > 0) {
                level++;
                arrFormat(item.children);
            } else {
                if (i == data.length - 1) {
                    level--;
                    basegroup2 = basegroup2.replace(/-\d+$/g, '');
                }
            }
        }
    }

    arrFormat(e);
}

// 统计各部门人数
function getPeoNum2(data){
    var number = 0

    // 循环遍历子数据
    function loopChildren(childrenData){
        for(var i = 0; i < childrenData.length; i++){

            var item = childrenData[i]
            if(item.children.length > 0){
                loopChildren(item.children)
            }
    
            if(item.last == true){
                number++
            }
        }

    }

    loopChildren(data.children)
    return number
}


// 渲染左侧树形结构
function renderLeft2(data, dom) {
    dom.innerHTML = '';
    if (Object.prototype.toString.call(data) === '[object Array]') {
        for (var i = 0; i < data.length; i++) {
            var checked = '';
            var iconClass = 'icon__round--false';
            var parentName = '';
            var number = getPeoNum2(data[i])
            var numberDom = ''

            // 统计部门人数
            if(data[i].last == false){
                numberDom = '<div class="to__number">('+number+'人)</div>'
            }

            if (oldSearch2) {
                if (getParentName2(data[i].group2)) {
                    parentName = '（' + getParentName2(data[i].group2) + '）'; // 父级名称
                }
            }

            // 判断按钮状态
            if (data[i].active == true) {
                iconClass = 'icon__round--true';
                checked = 'checked = true';
            }
            
            var subItemClass = 'to__subItem';
            // 默认展开
            subItemClass = 'to__subItem to__show';

            // 控制箭头样式
            var item = document.createElement('div');
            var arrow = '<span class="to__dropdownList" ><i src="img/right-arrow.png" onclick="dropClick2(this)"></i></span>';
            if (data[i].last == true) {
                arrow = '';
            }

            // 控制文件夹/头像样式
            var defaultImg = '';
            if (data[i].last == true) {
                defaultImg = data[i].img || 'img/header-icon.png';
            } else {
                defaultImg = data[i].img || 'img/icon-folder.svg';
            }
            var prefix = '<span class="to__prefix"><img src="' + defaultImg + '"></img></span>';

            // 渲染dom
            item.innerHTML = '<div class="weui-cell to__item " id="group2_' + data[i].group2 + '">' + arrow + '<span class="member" onclick="nodeClick2(this)"><input id="input'+ data[i].group2 +'" type="checkbox"  ' + checked + '" name="cName"  value="' + data[i].name + '" onclick="checkboxClick2(this)" />' + prefix + '<div class="text"><div class="to__name">' + data[i].name + '</div><div class="to__post">' +data[i].post + '</div></div>' + numberDom + '<div class="to__parentName">' + parentName + '</div><span class="icon__round ' + iconClass + '"></span></span></div>';
            dom.appendChild(item);

            // 添加子元素
            var subItem = document.createElement('div');
            subItem.className = subItemClass;

            item.appendChild(subItem);
            if (data[i].children.length > 0 && data[i].last != true) {
                checked = false;
                subItemClass = 'to__subItem';
                renderLeft2(data[i].children, subItem);
            } else {
                checked = false;
                subItemClass = 'to__subItem';
            }
        }
    }

    return baseDom.innerHTML;
}

function chooseParent2() {
    var domList = document.getElementById('leftCont2').querySelectorAll('.icon__round--true');
    for (var i = 0; i < domList.length; i++) {
        var item = domList[i];
        var input = item.parentNode.firstChild;
        input.checked = true;
        var group2 = (input.id).replace('input','')
        chooseState2(baseData2, group2, true);
    }
}

// 渲染右侧树形结构
function renderRight2(data) {
    chooseCount2 = 0;
    domRight2.innerHTML = '';
    chooseList2 = [];
    loopRight2(data);
    document.getElementById('selectNum2').innerHTML = chooseCount2;
}

function loopRight2(data) {
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (item.children.length > 0 && item.last != true) {
            loopRight2(item.children);
        } else {
            if ((item.last == true || oldSearch2) && item.active == true) {
                var parentName = '';
                if (getParentName2(item.group2)) {
                    parentName = '（' + getParentName2(item.group2) + '）'; // 父级名称
                }
                chooseCount2++;
                var div = document.createElement('div');
                div.className = 'to__item';
                div.innerHTML = '<span class="unread" style="display:block">未读</span><span class="to__prefix"><img src="img/header-icon.png"></img></span><span class="to__name render" id="render' + item.group2 + '" >' + item.name + '</span><div class="to__parentName" style="display:none"></div><span id="to__close" class="to__close" onclick="nodeCencel2(this)"><i></i></span>';
                domRight2.appendChild(div);
                if (item.value) {
                    chooseList2.push(item.value);
                }
            }
        }
    }
}

// 循环遍历父级节点选中状态
function loopParentState2(group2) {
    // 父级节点对象
    group2 = group2.replace(/-\d+$/g, '');

    // 循环遍历符合条件为止
    function getChildrenActive(data) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];

            // 匹配对象group2
            if (item.group2 == group2) {
                var childActiveList = 0;
                for (var b = 0; b < item.children.length; b++) {
                    var childItem = item.children[b];
                    if (childItem.active == true) {
                        childActiveList++;
                    }
                }
                // 符合全选
                if (childActiveList == item.children.length) {
                    item.active = true;
                }
                // 符合取消全选
                else if (childActiveList == 0) {
                    item.active = false;
                }
                // 遍历结束
                else {
                    item.active = false;
                }

                if (document.getElementById('group2_' + item.group2)) {
                    var dom = document.getElementById('group2_' + item.group2);
                    dom.querySelector('input').checked = item.active;
                    dom.querySelector('.icon__round').className = 'icon__round icon__round--' + item.active;
                }
                loopParentState2(group2);
            } else {
                getChildrenActive(item.children);
            }
        }
    }

    getChildrenActive(baseData2);
}

// 获取父级节点名称
function getParentName2(group2) {
    group2 = group2.replace(/-\d+$/g, '');
    var name = '';

    function getName(data) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];

            // 匹配对象group2
            if (item.group2 == group2) {
                name = item.name;
            }

            if (item.children.length > 0) {
                getName(item.children);
            }
        }
    }

    getName(baseData2);

    return name;
}

// 改变data选中状态
function chooseState2(data, group2, cancelChoose) {
    // 改变当前状态
    for (var i = 0; i < data.length; i++) {
        var item = data[i];

        if (item.group2 == group2) {
            // 修改当前
            if (cancelChoose != true) {
                item.active = !item.active;
            }
 
			
            // 子集状态选中
            function updateChild(childData, state) {
                for (var a = 0; a < childData.length; a++) {
                    childData[a].active = state;
                    if (childData[a].children.length > 0) {
                        updateChild(childData[a].children, state);
                    }
                }
            }

            if (item.children.length > 0) {
                updateChild(item.children, item.active);
            }

            // 遍历父级选中状态
            loopParentState2(item.group2);
        }

        // 循环判断是否符合条件
        if (item.children.length > 0) {
            chooseState2(item.children, group2, cancelChoose);
        } else {
        }
    }
}

// 冒泡事件
function checkboxClick2(e) {
    e.checked = !e.checked;
}

// 树形节点单击事件
function nodeClick2(e) {
    // 选中当前元素input框
    var input = e.querySelector('input');
    input.checked = !input.checked;

    var name = input.value;
    e.lastElementChild.className = 'icon__round icon__round--' + input.checked;

    // 选中子元素所有input框
    var subItem = e.parentNode.nextElementSibling;

    if (subItem) {
        var inputList = subItem.querySelectorAll('.to__item');

        for (var i = 0; i < inputList.length; i++) {
            var item = inputList[i];

            item.querySelector('input').checked = input.checked;
            var iconDom = item.querySelector('input').parentNode.querySelector(".icon__round");
            iconDom.className = 'icon__round icon__round--' + input.checked;
        }
    }

    var group2 = (input.id).replace('input', '')
    chooseState2(baseData2, group2);
    renderRight2(baseData2);

    console.log('添加后的数组: ');
    console.log(chooseList2);
}

// 移除选中的节点
function nodeCencel2(e) {
    // 当前dom节点在父级节点内排第几项就删除数组第几项
    var perentDom = e.parentNode;
    var index = Array.prototype.indexOf.call(perentDom.parentNode.children, perentDom);
    if (index == 0) {
        chooseList2.shift();
    } else if (index == chooseList2.length - 1) {
        chooseList2.pop();
    } else {
        chooseList2.splice(index, 1);
    }
    console.log('删除后的数组: ');
    console.log(chooseList2);

    // 修改baseData2数据
    var group2 = e.parentNode.querySelector(".to__name").id.replace('render', '');
    chooseState2(baseData2, group2);
    renderRight2(baseData2);
    
    // 修改dom多选框状态
    var cList = document.getElementsByName('cName');
    for (var i = 0; i < cList.length; i++) {
        var item = cList[i];
        var itemgroup2 = (item.id).replace('input', '')

        if (itemgroup2 == group2) {
            item.checked = false;
            var iconDom = item.parentNode.querySelector(".icon__round");
            iconDom.className = 'icon__round icon__round--' + item.checked;
            break;
        }
    }
}

// 改变data结构
function updateNode2(name) {
    var data = [];

    // 遍历数据
    function getData(childData) {
        for (var i = 0; i < childData.length; i++) {
            var item = childData[i];
            if (item.name.indexOf(name) > -1) {
                if (item.last == true) {
                    data.push(item);
                }
            }

            if (item.children.length > 0 && item.last != true) {
                getData(item.children);
            }
        }
    }
    //默认选中不可删除
//	for (var i = 0; i < data.length; i++) {
//      var item = data[i];
//
//      if (item.group2 == group2) {
//          // 修改当前
//          if (cancelChoose != true) {
//              item.active = !item.active;
//               var ui = document.getElementById("to__close");
//   			ui.style.pointerEvents="none";
//   			console.log("ddd")
//          }
//      }
//  }
	
//	for(i=0;i<data.length;i++){
//	    if(data[i].type == "checkbox"){
//	        if(!(data[i].checked)){
//	            data[i].checked = true;//这里设置的吧
//	            data[i].value = "0,";
//	            console(data[i].value)
//	        }else{
//	            data[i].value = "1,";
//	        }
//	    }
//	}
    getData(baseData2); // 匹配数据
    document.getElementById('leftCont2').innerHTML = renderLeft2(data, baseDom); // 渲染左侧
}

// 实时搜索
function realSearch2() {
    var dom = document.getElementById('searchInput');
    if (oldSearch2 != dom.value) {
        oldSearch2 = dom.value;
        updateNode2(dom.value);

        if (oldSearch2 == '') {
            document.getElementById('leftCont').innerHTML = renderLeft2(baseData2, baseDom); // 渲染左侧
            chooseParent2(); // 选中父级
        }
    }
}

// 下拉框点击事件
function dropClick2(dom) {
    // 切换样式状态
    if (dom.className.indexOf('to__roate') > -1) {
        dom.className = '';
    } else {
        dom.className = 'to__roate';
    }

    // 显示隐藏内容
    var domShow = dom.parentNode.parentNode.nextElementSibling;
    if (domShow.className.indexOf('to__show') > -1) {
        domShow.className = 'to__subItem';
    } else {
        domShow.className = 'to__subItem to__show';
    }
}

