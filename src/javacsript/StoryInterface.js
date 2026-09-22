function addEvent(id, event) {
	const item = document.getElementById(id);
	item.addEventListener("click", event);
};

addEvent("display-mode", function () {
	const huanmeng = document.getElementById("huanmeng");
	huanmeng.classList.toggle("dark");
});