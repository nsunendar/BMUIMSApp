
$(document).ready(function () {

    dataGridFG = $("#dataGridFG").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: 'ItemCode',
            loadUrl: 'BillOfMaterial/GetDataLevelFG',
            onBeforeSend(method, ajaxOptions) {
                ajaxOptions.headers = {
                    "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val(),
                };
                ajaxOptions.xhrFields = { withCredentials: true };
            },
        }),
        columns: [
            {
                type: "buttons",
                caption: " ",
                buttons: [
                    {
                        hint: "Edit",
                        icon: "fa fa-edit",
                        onClick: function (e) {
                            var bomId = e.row.data.Id;
                            openPopupBOMFGEdit(bomId);
                        }
                    },
                ],
                width: 50
            },
            { dataField: "ItemCode", caption: "Code", width: 120 },
            { dataField: "ItemName", caption: "Type Description" },
            { dataField: "QtyUsage", caption: "Qty", width: 50 },
            { dataField: "Satuan", caption: "EA", width: 50 },
            { dataField: "Id", caption: "ID", visible: false, width: 30 },
        ],
        selection: {
            mode: "single"
        },
        columnAutoWidth: false,
        showRowLines: true,
        paging: {
            pageSize: 12
        },
        editing: {
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true,
            mode: "popup"
        },
        pager: {
            visible: true,
            allowedPageSizes: [10, 50, 100, 'all'],
            showPageSizeSelector: true,
            showInfo: true,
            showNavigationButtons: true
        },
        toolbar: {
            items: [
                {
                    widget: "dxButton",
                    options: {
                        icon: "fa fa-file",
                        hint: "Add New FG",
                        onClick: function () {
                            openPopupBOMFGAdd();
                        }
                    },
                    location: "before"
                },
                {
                    template: '<div>Finish Good &nbsp;&nbsp;&nbsp;</div>',
                    location: "after"
                }
            ]
        },
        onSelectionChanged: function (e) {
            dataGridRM.getDataSource().reload();
            dataGridCP.getDataSource().reload();
        }
    }).dxDataGrid("instance");

    var LevelRMStore = new DevExpress.data.CustomStore({
        key: "ItemCode",
        load: function (loadOptions) {
            var selectedData = dataGridFG.getSelectedRowKeys()[0];
            if (!selectedData) return [];
            return $.getJSON('BillOfMaterial/GetDataLevelRM', { parentItem: selectedData });
        }
    });

    var dataGridRM = $("#dataGridRM").dxDataGrid({
        dataSource: LevelRMStore,
        columns: [
            {
                type: "buttons",
                caption: " ",
                buttons: [
                    {
                        hint: "Edit",
                        icon: "fa fa-edit",
                        onClick: function (e) {
                            var invType = e.row.data.Id;
                            openPopupInvTypeEdit(invType);
                        }
                    },
                ],
                width: 50
            },
            { dataField: "ItemCode", caption: "Code", width: 120 },
            { dataField: "ItemName", caption: "Type Description" },
            { dataField: "QtyUsage", caption: "Qty", width: 50 },
            { dataField: "Satuan", caption: "EA", width: 50 },
            { dataField: "Id", caption: "ID", visible: false, width: 30 },
        ],
        selection: {
            mode: "single"
        },
        columnAutoWidth: false,
        showRowLines: true,
        paging: {
            pageSize: 5
        },
        editing: {
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true,
            mode: "popup"
        },
        pager: {
            visible: true,
            allowedPageSizes: [5, 10, 'all'],
            showPageSizeSelector: true,
            showInfo: true,
            showNavigationButtons: true
        },
        toolbar: {
            items: [
                {
                    widget: "dxButton",
                    options: {
                        icon: "fa fa-file",
                        hint: "Add New RM",
                        onClick: function () {
                            openPopupInvTypeAdd();
                        }
                    },
                    location: "before"
                },
                {
                    template: '<div>Raw Material &nbsp;&nbsp;&nbsp;</div>',
                    location: "after"
                }
            ]
        },
        onSelectionChanged: function (e) {
            dataGridCP.getDataSource().reload();
        }
    }).dxDataGrid("instance");

    var LevelCPStore = new DevExpress.data.CustomStore({
        key: "ItemCode",
        load: function (loadOptions) {
            var selectedData = dataGridRM.getSelectedRowKeys()[0];
            if (!selectedData) return [];
            return $.getJSON('BillOfMaterial/GetDataLevelCP', { parentItem: selectedData });
        }
    });

    var dataGridCP = $("#dataGridCP").dxDataGrid({
        dataSource: LevelCPStore,
        columns: [
            {
                type: "buttons",
                caption: " ",
                buttons: [
                    {
                        hint: "Edit",
                        icon: "fa fa-edit",
                        onClick: function (e) {
                            var invType = e.row.data.Id;
                            openPopupInvTypeEdit(invType);
                        }
                    },
                ],
                width: 50
            },
            { dataField: "ItemCode", caption: "Code", width: 120 },
            { dataField: "ItemName", caption: "Type Description" },
            { dataField: "QtyUsage", caption: "Qty", width: 50 },
            { dataField: "Satuan", caption: "EA", width: 50 },
            { dataField: "Id", caption: "ID", visible: false, width: 30 },
        ],
        columnAutoWidth: false,
        showRowLines: true,
        paging: {
            pageSize: 5
        },
        editing: {
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true,
            mode: "popup"
        },
        pager: {
            visible: true,
            allowedPageSizes: [5, 10, 'all'],
            showPageSizeSelector: true,
            showInfo: true,
            showNavigationButtons: true
        },
        toolbar: {
            items: [
                {
                    widget: "dxButton",
                    options: {
                        icon: "fa fa-file",
                        hint: "Add New CP",
                        onClick: function () {
                            openPopupInvTypeAdd();
                        }
                    },
                    location: "before"
                },
                {
                    template: '<div>Child Parts &nbsp;&nbsp;&nbsp;</div>',
                    location: "after"
                }
            ]
        },
    }).dxDataGrid("instance");



    /*******************/
    //FORM Edit FG

    $("#myPopupFGEdit").dxPopup({
        title: "BOM FG Edit",
        visible: false,
        width: 550,
        height: 460,
        showCloseButton: true,
        dragEnabled: false,
        hideOnOutsideClick: false
    });

    function openPopupBOMFGEdit(bomId) {
        $("#myPopupFGEdit").dxPopup("option", {
            contentTemplate: function (contentElement) {
                $.ajax({
                    url: 'BillOfMaterial/Edit',
                    type: 'GET',
                    data: { id: bomId },
                    success: function (data) {
                        contentElement.html(data);
                    },
                    error: function (error) {
                        contentElement.html("<p style='color:red'>Gagal memuat data.</p>" + error);
                    }
                });
            }
        });
        $("#myPopupFGEdit").dxPopup("show");
    };

    //End: FORM Edit FG
    /*******************/


});