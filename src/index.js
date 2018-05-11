$('.btn').click(function() {
  $.ajax({
        url: "check.php",
        data: {
            old_password: $("#password").val()
        },
        type: "POST",
        dataType: "json",
        success: function(data,textStatus,jqXHR) {
          console.log("success");
        },
        error: function() {
          console.log("success");
        },
        complete: function() {
          console.log("success");
        }
    });
});