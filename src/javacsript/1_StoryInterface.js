// 工具函数：给元素增加点击事件
function addEvent(id, event) {
	const item = document.getElementById(id);
	item.addEventListener("click", event);
};

addEvent("display-mode", function () {
	const huanmeng = document.getElementById("huanmeng");
	huanmeng.classList.toggle("dark");
});

addEvent("save", function () { UI.saves() });
addEvent("restart", function () { UI.restart() });