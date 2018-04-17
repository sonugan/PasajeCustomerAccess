$(function () {
    //

    //
    $("#tblBeneficiarios").footable();
    //
    $('#collapseBenef').on("shown.bs.collapse", function (e) {
        $('.footable').trigger('footable_initialize');
        $('#iconBenef').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
    }).on("hidden.bs.collapse", function (e) {
        $('#iconBenef').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
    })
    //
    var $ftable2 = $('#tblBeneficiarios');
    $('#change-page-size2').change(function (e) {
        e.preventDefault();
        var pageSize2 = $(this).val();
        $ftable2.data('page-size', pageSize2);
        $ftable2.trigger('footable_initialized');
    });
    $('#change-nav-size2').change(function (e) {
        e.preventDefault();
        var navSize2 = $(this).val();
        $ftable2.data('limit-navigation', navSize2);
        $ftable2.trigger('footable_initialized');
    });
    //
    $("#BtnExportBenefits").click(function () {
        $('#tblBeneficiariosHidden').table2excel({
            exclude: ".noExl",
            name: "Listado de Beneficiarios",
            filename: "Listado_Beneficiarios",
            fileext: ".xls",
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true,
            columns: []
        });
    });
    //
});