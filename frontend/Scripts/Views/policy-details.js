$(function () {
    $("#details").hide();
    $("#loadingDetails").append(loadingModal);
    $(".dropdown-menu li a").click(function () {
        var selText = $(this).text();
        $(this).parents('.btn-group').find('.dropdown-toggle').html(selText + ' <span class="caret"></span>');
    });
    //
    $("table").footable();
    //
    $('#collapsePol').on("shown.bs.collapse", function (e) {
        $('.footable').trigger('footable_initialize');
        $('#iconPol').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
    }).on("hidden.bs.collapse", function (e) {
        $('#iconPol').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
    })
    //
    $('#collapseVal').on("shown.bs.collapse", function (e) {
        $('.footable').trigger('footable_initialize');
        $('#iconVal').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
    }).on("hidden.bs.collapse", function (e) {
        $('#iconVal').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
    })
    //
    $('#collapse1').on("shown.bs.collapse", function (e) {
        $('.footable').trigger('footable_initialize');
        $('#icon1').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
    }).on("hidden.bs.collapse", function (e) {
        $('#icon1').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
    })
    //
    $('#collapse2').on("shown.bs.collapse", function (e) {
        $('.footable').trigger('footable_initialize');
        $('#icon2').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
    }).on("hidden.bs.collapse", function (e) {
        $('#icon2').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
    })
    //
    $('#collapse3').on("shown.bs.collapse", function (e) {
        $('.footable').trigger('footable_initialize');
        $('#icon3').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
    }).on("hidden.bs.collapse", function (e) {
        $('#icon3').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
    })
    //
    var loadedProducts = false;
    var loadedBeneficiaries = false;
    var loadedPaymentDetails = false;
  
    var id = $('#ApplicationId').val();
    var currency = $('#Currency').val();
    //Carga de productos
    $.ajax({
        url: BaseAddress + 'Product/Products?id=' + id +'&currency=' + currency,
        contentType: 'application/html; charset-utf-8',
        type: 'GET',
        dataType: 'html',
        cache: false,
        complete: function () {
              
        },
        success: (function (result) {
            $('#products').html(result);
            loadedProducts = true;
            if (loadedProducts && loadedBeneficiaries && loadedPaymentDetails) {
                $("#loadingDetails").hide();
                $("#details").show();
            }
        }),
    });
    //Carga de beneficiarios
    $.ajax({
        url: BaseAddress + 'Beneficiaries/Beneficiaries?id=' + id,
        contentType: 'application/html; charset-utf-8',
        type: 'GET',
        dataType: 'html',
        cache: false,
        complete: function () {
              
        }
    })
    .success(function (result) {
        $('#beneficiaries').html(result);
        loadedBeneficiaries = true;
        if (loadedProducts && loadedBeneficiaries && loadedPaymentDetails) {
            $("#loadingDetails").hide();
            $("#details").show();
        }
    })

    //Carga de detalle de pagos
    $.ajax({
        url: BaseAddress + 'Payments/PaymentsDetail?id=' + id + '&currency=' + currency,
        contentType: 'application/html; charset-utf-8',
        type: 'GET',
        dataType: 'html',
        cache: false,
        complete: function () {
              
        }
    })
    .success(function (result) {
        $('#paymentsDetail').html(result);
        loadedPaymentDetails = true;
        if (loadedProducts && loadedPaymentDetails && loadedBeneficiaries) {
            $("#loadingDetails").hide();
            $("#details").show();
        }

    })

    getSelectedPolicies = function () {
        var policies = [];
        policies.push($('#ApplicationId').val());
        return policies;
    }

    hasSelectedPolicies = function () {
        return true;
    }


});