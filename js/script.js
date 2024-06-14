jQuery(document).ready(function () {
    jQuery('.send-form').on('submit', function(event) {
        event.preventDefault(); 
        
        var form = jQuery(this);
        
        if (form.valid()) {
            form.css('opacity', '.5');
            var actUrl = form.attr('action');

            jQuery.ajax({
                url: actUrl,
                type: 'post',
                dataType: 'json', // Изменили тип данных на json
                data: form.serialize(),
                success: function(data) {
                    form.css('opacity', '1');
                    if (data.success) {
                        Swal.fire({
                            title: 'Форма успешно отправлена',
                            text: 'Форма успешно отправлена',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = 'http://sed-sensum.pl/';
                            }
                        });
                    } else {
                        Swal.fire({
                            title: 'Произошла ошибка при отправке формы',
                            text: 'Произошла ошибка при отправке формы',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                },
                error: function() {
                    form.css('opacity', '1');
                    Swal.fire({
                        title: 'Произошла серверная ошибка',
                        text: 'Произошла серверная ошибка',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            });
        }
    });
});
