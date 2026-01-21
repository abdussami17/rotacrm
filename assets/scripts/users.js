document.addEventListener('DOMContentLoaded',function () {
    const profileUpload = document.getElementById('profileUpload');
    const profilePreview = document.getElementById('profilePreview');
    
    profileUpload.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    const editProfileUpload = document.getElementById('editProfileUpload');
  const editProfilePreview = document.getElementById('editProfilePreview');
  
  editProfileUpload.addEventListener('change', function(event) {
      const file = event.target.files[0];
      if(file){
          const reader = new FileReader();
          reader.onload = function(e){
              editProfilePreview.src = e.target.result;
          }
          reader.readAsDataURL(file);
      }
  });
})