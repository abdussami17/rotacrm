
document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll(".toggle-status-btn").forEach(button => {
        button.addEventListener("click", function () {
            const row = this.closest("tr");
            const statusBadge = row.querySelector(".status-badge");

            if (statusBadge.textContent.trim() === "Active") {
                statusBadge.textContent = "Inactive";
                statusBadge.classList.remove("bg-success");
                statusBadge.classList.add("bg-danger");
                this.textContent = "Enable";
            } else {
                statusBadge.textContent = "Active";
                statusBadge.classList.remove("bg-danger");
                statusBadge.classList.add("bg-success");
                this.textContent = "Disable";
            }
        });
    });

});

