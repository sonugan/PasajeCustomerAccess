$(function () {
    //
    $("#tblProductos").footable();
    //
    $('#collapseOne').on("shown.bs.collapse", function (e) {
        $('.footable').trigger('footable_initialize');
        $('#iconProd').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
    }).on("hidden.bs.collapse", function (e) {
        $('#iconProd').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
    })
    //
    var $ftable1 = $('#tblProductos');
    $('#change-page-size1').change(function (e) {
        e.preventDefault();
        var pageSize1 = $(this).val();
        $ftable1.data('page-size', pageSize1);
        $ftable1.trigger('footable_initialized');
    });
    $('#change-nav-size1').change(function (e) {
        e.preventDefault();
        var navSize1 = $(this).val();
        $ftable1.data('limit-navigation', navSize1);
        $ftable1.trigger('footable_initialized');
    });
    //
    $("#BtnExportProducts").click(function () {
        $('#tblProductosHidden').table2excel({
            exclude: ".noExl",
            name: "Listado de Productos",
            filename: "Listado_Productos",
            fileext: ".xls",
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true,
            columns: []
        });

    });
    //
});