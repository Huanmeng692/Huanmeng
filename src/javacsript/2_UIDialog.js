const dialogMap = {
	"bag": "背包",
	"map": "地图",
	"clothing": "衣物",
	"status": "状态",
	"setting": "设置"
}

function toggleDraggableDiv(id) {
	const existing = document.getElementById(id+"-div");

	// 如果已经存在，直接移除并返回
	if (existing) {
		existing.remove();
		return;
	}

	// 不存在则创建
	const div = document.createElement('div');
	div.id = id+"-div";
	div.classList.add('draggable-box');
	setPageElement(div, dialogMap[id]);
	const huanmeng = document.getElementById("huanmeng");
	huanmeng.appendChild(div);

	// 拖动状态（闭包内变量，每个 div 独立）
	let dragging = false;
	let offsetX = 0;
	let offsetY = 0;

	// 按下：记录偏移并捕获指针
	div.addEventListener('pointerdown', (e) => {
		if (e.button !== 0) return; // 只响应鼠标左键

		const rect = div.getBoundingClientRect();
		offsetX = e.clientX - rect.left;
		offsetY = e.clientY - rect.top;

		dragging = true;
		div.classList.add('dragging');
		div.setPointerCapture(e.pointerId);
	});

	// 移动：更新位置
	div.addEventListener('pointermove', (e) => {
		if (!dragging) return;

		div.style.left = (e.clientX - offsetX + window.scrollX) + 'px';
		div.style.top = (e.clientY - offsetY + window.scrollY) + 'px';
	});

	// 松开 / 取消：结束拖动
	function endDrag(e) {
		if (!dragging) return;
		dragging = false;
		div.classList.remove('dragging');
		if (div.hasPointerCapture(e.pointerId)) {
			div.releasePointerCapture(e.pointerId);
		}
	}
	div.addEventListener('pointerup', endDrag);
	div.addEventListener('pointercancel', endDrag);
}

// 按钮点击事件：传入指定的 id 字符串
for (const key in dialogMap) {
	// if (!Object.hasOwn(dialogMap, key)) continue;
	document.getElementById(key).addEventListener('click', () => {
		toggleDraggableDiv(key);
	});
}

$(document).on(':passagedisplay', function () {
	for (const key in dialogMap) {
		const item = document.getElementById(key+"-div");
		if (item) {
			setPageElement(item, dialogMap[key]);
		}
	}
})