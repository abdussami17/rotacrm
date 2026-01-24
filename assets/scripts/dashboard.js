document.addEventListener('DOMContentLoaded', function () {

    const canvas = document.getElementById('dashContainer_kpiChart');
    if (!canvas) return;

    const kpiCtx = canvas.getContext('2d');

    /* THEME COLOR */
    const themeColor = '#f76f00';

    /* GRADIENT */
    const gradient = kpiCtx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(247, 111, 0, 0.35)');
    gradient.addColorStop(1, 'rgba(247, 111, 0, 0.02)');

    const chartConfig = {
        type: 'line',
        data: {
            labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                data: [50, 55, 42, 48, 30, 45],
                borderColor: themeColor,
                backgroundColor: gradient,
                borderWidth: 3,
                tension: 0.45,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: themeColor,
                pointHoverBorderColor: '#ffffff',
                pointHoverBorderWidth: 3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,

            layout: {
                padding: 0
            },

            plugins: {
                legend: { display: false },

                tooltip: {
                    enabled: true,
                    backgroundColor: '#111827',
                    padding: 12,
                    cornerRadius: 10,
                    displayColors: false,
                    titleFont: { family: 'Poppins', size: 12 },
                    bodyFont: { family: 'Poppins', size: 13, weight: '600' }
                }
            },

            scales: {
                x: {
                    grid: { display: false, drawBorder: false },
                    ticks: {
                        color: '#9CA3AF',
                        font: { family: 'Poppins', size: 11 },
                        padding: 4
                    }
                },
                y: {
                    display: false,
                    beginAtZero: true
                }
            },

            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    };

    new Chart(kpiCtx, chartConfig);

    /* Tabs */
    const tabs = document.querySelectorAll('.dashContainer_tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            tabs.forEach(t => t.classList.remove('dashContainer_tabActive'));
            this.classList.add('dashContainer_tabActive');
        });
    });

});
