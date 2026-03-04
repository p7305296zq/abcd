// 动态冻结列功能
function showFreezeColumnsDialog() {
    const table = document.getElementById('kpi-data-table');
    const headerRow = table.querySelector('thead tr');
    const columns = headerRow.querySelectorAll('th');
    const columnsList = document.getElementById('columns-list');
    
    // 清空列列表
    columnsList.innerHTML = '';
    
    // 为每列创建复选框
    columns.forEach((th, index) => {
        const columnName = th.textContent;
        const checkbox = document.createElement('div');
        checkbox.style.marginBottom = '8px';
        checkbox.innerHTML = `
            <input type="checkbox" id="column-${index}" value="${index}">
            <label for="column-${index}">${columnName}</label>
        `;
        columnsList.appendChild(checkbox);
    });
    
    // 显示对话框
    document.getElementById('freeze-columns-dialog').style.display = 'block';
}

function closeFreezeColumnsDialog() {
    document.getElementById('freeze-columns-dialog').style.display = 'none';
}

function freezeSelectedColumns() {
    // 先取消所有列的冻结
    unfreezeAllColumns();
    
    // 获取选中的列
    const checkboxes = document.querySelectorAll('#columns-list input[type="checkbox"]:checked');
    const selectedColumns = Array.from(checkboxes).map(cb => parseInt(cb.value));
    
    if (selectedColumns.length === 0) {
        alert('请选择要冻结的列');
        return;
    }
    
    // 对选中的列进行排序
    selectedColumns.sort((a, b) => a - b);
    
    const table = document.getElementById('kpi-data-table');
    const rows = table.querySelectorAll('tr');
    
    // 为每一行的对应列添加冻结样式
    rows.forEach(row => {
        selectedColumns.forEach((columnIndex, i) => {
            const cell = row.querySelector(`td:nth-child(${columnIndex + 1}), th:nth-child(${columnIndex + 1})`);
            if (cell) {
                cell.classList.add('frozen-column');
                // 设置固定宽度
                if (i === 0) {
                    cell.style.width = '120px';
                } else {
                    cell.style.width = '100px';
                }
            }
        });
    });
    
    // 关闭对话框
    closeFreezeColumnsDialog();
}

function unfreezeAllColumns() {
    const table = document.getElementById('kpi-data-table');
    const cells = table.querySelectorAll('.frozen-column');
    cells.forEach(cell => {
        cell.classList.remove('frozen-column');
        cell.style.width = '';
    });
}

console.log('JavaScript code loaded successfully');