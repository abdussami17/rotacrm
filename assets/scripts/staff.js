
    document.addEventListener('DOMContentLoaded', function() {
    
        
        // Toggle additional license section
        const toggleAdditionalLicense = document.getElementById('toggleAdditionalLicense');
        const additionalLicenseSection = document.getElementById('additionalLicenseSection');
        
        if (toggleAdditionalLicense && additionalLicenseSection) {
            toggleAdditionalLicense.addEventListener('change', function() {
                additionalLicenseSection.style.display = this.checked ? 'block' : 'none';
            });
        }
        
        // Add holiday functionality
        const addHolidayBtn = document.getElementById('addHolidayBtn');
        const holidayRows = document.getElementById('holidayRows');
        
        if (addHolidayBtn && holidayRows) {
            addHolidayBtn.addEventListener('click', function() {
                addHolidayRow();
            });
        }
        
        // Function to add a holiday row
        function addHolidayRow() {
            const rowId = Date.now();
            const row = document.createElement('div');
            row.className = 'row g-3 holiday-row mb-3';
            row.id = 'holiday-row-' + rowId;
            row.innerHTML = `
                <div class="col-md-3">
                    <label class="form-label">Holiday Entitlement</label>
                    <input type="text" name="holiday_entitlement[]" class="form-control" placeholder="Enter entitlement">
                </div>
                <div class="col-md-3">
                    <label class="form-label">From Date</label>
                    <input type="text" name="holiday_from_date[]" class="form-control flatpickr" placeholder="Select date">
                </div>
                <div class="col-md-3">
                    <label class="form-label">To Date</label>
                    <input type="text" name="holiday_to_date[]" class="form-control flatpickr" placeholder="Select date">
                </div>
                <div class="col-md-2">
                    <label class="form-label">&nbsp;</label>
                   
                        <button type="button" class="button d-flex justify-content-center danger delete-holiday-btn" data-row-id="${rowId}">
                            <i data-lucide="trash-2"></i>
                        </button>
                   
                </div>
            `;
            
            // Insert the new row above the add button
            holidayRows.appendChild(row);
            row.querySelectorAll('.flatpickr').forEach(el => {
        flatpickr(el, {});
    });

    // Initialize Lucide icons for new buttons
    lucide.createIcons({ parent: row });
    
            // Add delete event listener
            const deleteBtn = row.querySelector('.delete-holiday-btn');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', function() {
                    const rowId = this.getAttribute('data-row-id');
                    const rowToRemove = document.getElementById('holiday-row-' + rowId);
                    if (rowToRemove) {
                        rowToRemove.remove();
                    }
                });
            }
        }


         // Toggle additional license section for edit modal
    const editToggleAdditionalLicense = document.getElementById('edit_toggleAdditionalLicense');
    const editAdditionalLicenseSection = document.getElementById('edit_additionalLicenseSection');
    
    if (editToggleAdditionalLicense && editAdditionalLicenseSection) {
        editToggleAdditionalLicense.addEventListener('change', function() {
            editAdditionalLicenseSection.style.display = this.checked ? 'block' : 'none';
        });
    }
    
    // Add holiday functionality for edit modal
    const editAddHolidayBtn = document.getElementById('edit_addHolidayBtn');
    const editHolidayRows = document.getElementById('edit_holidayRows');
    
    if (editAddHolidayBtn && editHolidayRows) {
        editAddHolidayBtn.addEventListener('click', function() {
            const rowId = Date.now();
            const row = document.createElement('div');
            row.className = 'row g-3 holiday-row mb-3';
            row.id = 'edit-holiday-row-' + rowId;
            row.innerHTML = `
                <div class="col-md-3">
                    <label class="form-label">Holiday Entitlement</label>
                    <input type="text" name="holiday_entitlement[]" class="form-control" placeholder="Enter entitlement">
                </div>
                <div class="col-md-3">
                    <label class="form-label">From Date</label>
                    <input type="text" name="holiday_from_date[]" class="form-control flatpickr" placeholder="Select date">
                </div>
                <div class="col-md-3">
                    <label class="form-label">Start Date</label>
                    <input type="text" name="holiday_start_date[]" class="form-control flatpickr" placeholder="Select date">
                </div>
                <div class="col-md-2">
                    <label class="form-label">&nbsp;</label>
                    <div class="d-flex align-items-end h-100">
                        <button type="button" class="button danger delete-holiday-btn" data-row-id="${rowId}">
                            <i data-lucide="trash-2" class="w-4 h-4"></i> Delete
                        </button>
                    </div>
                </div>
            `;
            
            editHolidayRows.appendChild(row);
            

            
      
            // Add delete event listener
            const deleteBtn = row.querySelector('.delete-holiday-btn');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', function() {
                    const rowId = this.getAttribute('data-row-id');
                    const rowToRemove = document.getElementById('edit-holiday-row-' + rowId);
                    if (rowToRemove) {
                        rowToRemove.remove();
                    }
                });
            }
        });
    }
    
    // Add delete functionality to existing holiday rows
    document.querySelectorAll('.delete-holiday-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            const rowId = this.getAttribute('data-row-id');
            const rowToRemove = document.getElementById('edit-holiday-row-' + rowId);
            if (rowToRemove) {
                rowToRemove.remove();
            }
        });
    });
    
    // Update staff button
    const updateStaffBtn = document.getElementById('updateStaffBtn');
    
    if (updateStaffBtn) {
        updateStaffBtn.addEventListener('click', function() {
            alert('Staff details would be updated in backend system');
            // In real application, this would submit the form to backend
        });
    }

    });

    

    