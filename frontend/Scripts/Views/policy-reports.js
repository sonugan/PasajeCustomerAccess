$(
    function () {
        $('#btnDetalle').bind('generateReportEvent', function () {
            $('#detalleDePagoModal').modal('show');
        })

        $("#btnPoliza").bind('generateReportEvent', function () {
            window.location = BaseAddress + 'Policies/GetPolicyReport?jsonPolicyIds=' + JSON.stringify(getSelectedPolicies());
        })

        $("#btnAnual").bind('generateReportEvent', function () {
            window.location = BaseAddress + 'Policies/GetAnnualSummaryReport?jsonPolicyIds=' + JSON.stringify(getSelectedPolicies());
        })

        $("#btnCobertura").bind('generateReportEvent', function () {
            window.location = BaseAddress + 'Policies/GetCoveragesCertificateReport?jsonPolicyIds=' + JSON.stringify(getSelectedPolicies());
        })

        var bussiness = {};
        $("#btnClausula").bind('generateReportEvent', function () {
            var elem = $("#businessElemen").clone();
            $("#businessList").empty();
            elem.appendTo("#businessList");
            bussiness = {};

            $("#txtBusinessName").val('');
            $("#txtCuit").val('');

            $("#nonRepetitionClauseModal").modal('show');
        })

        $("#btnCertificado").bind('generateReportEvent', function () {
        })

        $('#btnDetalle, #btnPoliza, #btnAnual, #btnCobertura, #btnClausula, #btnCertificado').click(function (e) {
            var sendbutton = $(e.target);
            if (hasSelectedPolicies()) {
                sendbutton.trigger("generateReportEvent")
            }
        });

        $("#detalleDePagoModal").find("#exportDetallePago").click(function () {
            var startDate = $('#txtFechaDesde').datepicker("getDate");
            var endDate = $('#txtFechaHasta').datepicker("getDate");
            if (startDate && endDate) {
                if (compareDates(startDate, endDate)) {
                    startDate = startDate.toJSON();
                    endDate = endDate.toJSON();

                    window.location = BaseAddress + 'Policies/GetPaymentsReport?jsonPolicyIds=' + JSON.stringify(getSelectedPolicies())
                                           + "&startDate=" + startDate
                                           + "&endDate=" + endDate;
                } else {
                    showAlertMessage("#errorMessage", "La fecha desde debe ser anterior a la fecha hasta");
                }
            } else {
                showAlertMessage("#errorMessage", "Debe seleccionar fechas desde y hasta");
            }
        })

        showAlertMessage = function (container, message) {
            $(container)
                .find("#errorMessage")
                .html('<div class="alert alert-danger" role="alert">'
                            + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>'
                            + '<span class="sr-only">Error:</span>'
                            + message
                     + '</div>');
        }

        hideAlertMessage = function (container) {
            $(container)
                .find("#errorMessage")
                .empty();
        }

        compareDates = function (startDate, endDate) {
            return startDate.getFullYear() < endDate.getFullYear()
                || (startDate.getMonth() < endDate.getMonth())
        }

        //modal reporte detalle de pagos
        $('#txtFechaDesde').datepicker({
            format: "mm/yyyy"
        });
        $('#txtFechaHasta').datepicker({
            format: "mm/yyyy"
        });

        //modal clausula no repeticion
        $("#addBusiness").click(function () {
            var businessName = $("#txtBusinessName").val();
            var cuit = $("#txtCuit").val();
            //console.log(cuit.length);

            if (!businessName || !cuit) {
                showAlertMessage("#nonRepetitionClauseModal", "Debe agregar una razón social y un número de cuit");
                return;
            } else if (cuit.length < 13) {
                showAlertMessage("#nonRepetitionClauseModal", "El número de cuit es inválido");
                return;
            }
            else {
                hideAlertMessage("#nonRepetitionClauseModal");
            }
            $("#businessList").append(' <div class="row" id="businessElemen' + cuit + '">'
                + '<div class="col-sm-1">'
                                         + '   <a style="padding: 15px" onclick="removeBusinessElem(\'' + cuit + '\')">'
                                          + '<span class="glyphicon glyphicon-remove-circle"></span>'
                                           + '</a>'
                                        + '</div>'
                                       + '<div class="col-sm-10" id="elementLabel">' + businessName + "  CUIT: " + cuit + '</div>'
                                    + '</div>')

            bussiness[cuit] = businessName;

            $("#txtBusinessName").val('');
            $("#txtCuit").val('');
        })

        $("#nonRepetitionClauseModal").find("#exportDetallePago").click(function () {
            var businessCount = Object.keys(bussiness).length;
            if (businessCount == 0) {
                showAlertMessage("#nonRepetitionClauseModal", "Debe agregar al menos una empresa");
                return;
            }
            if (businessCount > 5) {
                showAlertMessage("#nonRepetitionClauseModal", "Puede agregar hasta 5 empresas");
                return;
            }
            window.location = BaseAddress + 'Policies/GetNonRepetitionClauseReport?jsonPolicyIds=' + JSON.stringify(getSelectedPolicies())
                                   + "&jsonBussiness=" + JSON.stringify(bussiness);

        })

        removeBusinessElem = function (id) {
            $("#businessList").find("#businessElemen" + id).remove()
            delete bussiness[id];
            return false;
        }
    }
)