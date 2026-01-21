
document.addEventListener('DOMContentLoaded', function() {

    
    // Set current date for demo purposes
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB');
    
    // Update date elements
    document.querySelectorAll('.current-date').forEach(el => {
        el.textContent = formattedDate;
    });
    
    // Print functionality
    window.printInvoice = function() {
        window.print();
    };
});
