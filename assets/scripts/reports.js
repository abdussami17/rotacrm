
document.addEventListener('DOMContentLoaded', function () {

    // GLOBAL FILTER BUTTON HANDLER (ALL REPORT PAGES)
    document.querySelectorAll('.reportFilterBtn').forEach(function (btn) {

        btn.addEventListener('click', function () {

            // Scope inside same page_content (safe for multiple cards/pages)
            const container = btn.closest('.page_content') || document;

            const tables = container.querySelectorAll('.reportTableWrapper');

            tables.forEach(function (tbl) {

                // TOGGLE TABLE VISIBILITY
                if (tbl.style.display === 'none' || tbl.style.display === '') {
                    tbl.style.display = 'block';
                } else {
                    tbl.style.display = 'none';
                }

            });

        });

    });

});

