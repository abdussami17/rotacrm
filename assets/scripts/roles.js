
document.addEventListener("DOMContentLoaded", function() {

  // Column select all
  document.querySelectorAll(".select-all-col").forEach(headerCheckbox => {
    headerCheckbox.addEventListener("change", function() {
      const col = this.dataset.col;
      const checked = this.checked;
      document.querySelectorAll(`.perm.${col}`).forEach(cb => cb.checked = checked);
    });
  });

  // Row toggle logic (inside Module column)
  document.querySelectorAll(".row-toggle").forEach(toggle => {
    toggle.addEventListener("change", function() {
      const row = this.closest("tr");
      const checkboxes = row.querySelectorAll(".perm");
      checkboxes.forEach(cb => cb.checked = this.checked);
    });
  });

});

