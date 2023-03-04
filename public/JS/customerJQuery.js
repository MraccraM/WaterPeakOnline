$(document).ready(function () {
    $("#t1").on('click', '.edit', function() {
        var currRow = $(this).closest("tr");

        var phone = {
          PhoneNumber: currRow.find("td:eq(1)").text()
        };

        $.get('/update_customer_page', phone, function(data, status){
            if (data){
                $.get('/update_customer', data);
            }
        })
    });
})