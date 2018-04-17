GetBaseAddress();
CreateAppAngular();
ClientId = $("#ClientId").text();

$(function () {

    var showPopover = false;

    var popoverTemplate = ['<div class="popover">',
     '<div class="arrow"></div>',
     '<div class="popover-content">',
     '</div>',
     '</div>'].join('');

    //<h3 class="popover-title">User Info <a href="#" class="close" data-dismiss="alert">×</a></h3>

    var content = ['<a href="#" class="close" data-dismiss="alert">&times;</a>',
        '<div class="">Atención tenés nueva documentación que requiere de tu aceptación.</div>',
        '<div class=""><a href="' + BaseAddress + 'Documentations/Communications">< Visualizar documentación ></a></div>', ].join('');

    // Solo cuando esta logeado.
    if (ClientId != null && ClientId != '') {

        $.ajax({
            url: BaseAddress + "Documentations/GetCommunicationNotif?clientid=" + ClientId,
            cache: false,
            success: function (data) {
                if (data > 0)
                    $("#CommunicatiosNotif").text(data);
                else
                    $("#CommunicatiosNotif").text("");

            }
        });

        $.ajax({
            url: BaseAddress + "SigningOfDocuments/GetPendingDocumentation",
            dataType: 'json',
            type: 'GET',
            success: function (data) {

                if (data.Success) {

                    if (data.Data > 0) {

                        $("#pendingDocumentationNotif").text(data.Data);

                        $('[data-toggle="popover"]').popover({
                            //title: '<a href="#" class="close" data-dismiss="alert">&times;</a>',
                            trigger: 'manual',
                            content: content,
                            template: popoverTemplate,
                            placement: 'bottom',
                            container: 'body',
                            html: true
                        });

                        showPopover = true;
                        showPopoverMessage();

                    }
                    else {

                        $("#pendingDocumentationNotif").text("");
                    }

                }
            },
            error: function (xhr, ajaxOptions, thrownError) {

                bootbox.alert("Error al intentar obtener la documentación pendiente de firma.");
            }

        });

        // Se captura el evento de redimención de la pagina ya que la popover esta en modo 'manual'
        // y se necesita refrescar para que no quede dibujada en cualquier lugar de la pagina.
        $(window).bind('resize', showPopoverMessage);

        // Muestra el Popover dependiendo si es mobile o desktop.
        function showPopoverMessage() {
            if (showPopover) {

                // El navbar se vuelve boton cuando el ancho de la pagina es menor a 767px.
                if ($(window).width() < 768) {

                    $('#menuItemUser').popover('hide');
                    $('#navbarHeader').popover('show');
                }
                else {

                    $('#navbarHeader').popover('hide');
                    $('#menuItemUser').popover('show');
                }

            }
        };

        // Función para cerrar las popover.
        $(document).on("click", ".popover .close", function () {
            //$(this).parents(".popover").popover('hide');

            $('#menuItemUser').popover('destroy');
            $('#navbarHeader').popover('destroy');
        });

    }
})