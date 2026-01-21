class TableEnhancer {
    constructor(tableContainer) {
        this.table = tableContainer.querySelector('table');
        this.tbody = this.table.querySelector('tbody');
        this.searchInput = document.querySelector('.table-search');
        this.selectAllCheckbox = tableContainer.querySelector('.select-all');
        this.init();
    }

    init() {
        lucide.createIcons();
        this.initSelectAll();
        this.initSearch();
        this.initSorting();
    }

    initSelectAll() {
        if (!this.selectAllCheckbox) return;
        const rowCheckboxes = this.tbody.querySelectorAll('.row-checkbox');
        this.selectAllCheckbox.addEventListener('change', () => {
            rowCheckboxes.forEach(cb => cb.checked = this.selectAllCheckbox.checked);
        });
    }

    initSearch() {
        if (!this.searchInput) return;
        this.searchInput.addEventListener('input', () => {
            const filter = this.searchInput.value.toLowerCase();
            Array.from(this.tbody.rows).forEach(row => {
                row.style.display = row.innerText.toLowerCase().includes(filter) ? '' : 'none';
            });
        });
    }

    initSorting() {
        const headers = this.table.querySelectorAll('th[data-sort]');
        headers.forEach((header, index) => {
            let asc = true;
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => {
                const type = header.getAttribute('data-sort');
                const rows = Array.from(this.tbody.rows);
                rows.sort((a,b)=>{
                    let valA = a.cells[index].innerText;
                    let valB = b.cells[index].innerText;
                    if(type==='number'){ valA=parseFloat(valA); valB=parseFloat(valB); }
                    else if(type==='date'){ valA=new Date(valA); valB=new Date(valB); }
                    else { valA=valA.toLowerCase(); valB=valB.toLowerCase(); }
                    return valA<valB? (asc?-1:1) : valA>valB? (asc?1:-1) : 0;
                });
                asc = !asc;
                rows.forEach(row=>this.tbody.appendChild(row));
                headers.forEach(h=>h.classList.remove('sorted-asc'));
                if(!asc) header.classList.add('sorted-asc');
            });
        });
    }
}

document.querySelectorAll('.table-responsive').forEach(container => new TableEnhancer(container));
