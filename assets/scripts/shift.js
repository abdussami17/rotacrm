
    document.addEventListener("DOMContentLoaded", function () {
    
        // Flatpickr
        flatpickr(".fp-time", {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            time_24hr: true,
            minuteIncrement: 5
        });
    
        // Day selector
        document.addEventListener("click", function (e) {
            if (e.target.classList.contains("day-box")) {
                e.target.classList.toggle("active");
                const group = e.target.closest(".shift-group");
                const selected = [...group.querySelectorAll(".day-box.active")]
                    .map(d => d.dataset.day);
                group.querySelector(".selected-days").value = selected.join(",");
            }
        });
    
        // Add Check Call
        document.addEventListener("click", function (e) {
            if (e.target.classList.contains("add-checkcall")) {
                const rows = e.target.previousElementSibling;
                rows.insertAdjacentHTML("beforeend", `
                    <div class="row g-2 mb-2">
                        <div class="col-md-4">
                            <input type="text" class="form-control fp-time">
                        </div>
                        <div class="col-md-6">
                            <input type="text" class="form-control" placeholder="Note">
                        </div>
                        <div class="col-md-2">
                            <button type="button" class="btn btn-outline-danger btn-sm remove-checkcall">×</button>
                        </div>
                    </div>
                `);
                flatpickr(rows.querySelectorAll(".fp-time"));
            }
    
            if (e.target.classList.contains("remove-checkcall")) {
                e.target.closest(".row").remove();
            }
        });
    
        // Add More Shifts (clone clean)
        document.querySelector(".add-shift-group").addEventListener("click", function () {
            const wrapper = document.querySelector(".shift-wrapper");
            const clone = wrapper.querySelector(".shift-group").cloneNode(true);
    
            clone.querySelectorAll("input").forEach(i => i.value = "");
            clone.querySelectorAll(".day-box").forEach(d => d.classList.remove("active"));
            clone.querySelector(".checkcall-rows").innerHTML = "";
    
            wrapper.appendChild(clone);
    
            flatpickr(clone.querySelectorAll(".fp-time"));
        });

        document.addEventListener("click", function (e) {
            if (e.target.classList.contains("remove-shift")) {
                const wrapper = document.querySelector(".shift-wrapper");
                const groups = wrapper.querySelectorAll(".shift-group");
        
                if (groups.length > 1) {
                    e.target.closest(".shift-group").remove();
                }
            }
        });
    
    });
