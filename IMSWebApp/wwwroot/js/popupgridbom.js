
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
                            var invType = e.row.data.Id;
                            openPopupInvTypeEdit(invType);
                        }
                    },
                ],
                width: 50
            },
            { dataField: "ItemCode", caption: "Code", width: 150 },
            { dataField: "ItemName", caption: "Type Description" },
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
                            openPopupInvTypeAdd();
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
            { dataField: "ItemCode", caption: "Code", width: 150 },
            { dataField: "ItemName", caption: "Type Description" },
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
            { dataField: "ItemCode", caption: "Code", width: 150 },
            { dataField: "ItemName", caption: "Type Description" },
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










    //var currentItemCode = null;
    //var selectedNode = null;

    //function getCsrfToken() {
    //    return $('input[name="__RequestVerificationToken"]').val();
    //}

    //treeView = $("#treeViewContainer").dxTreeView({
    //    dataSource: DevExpress.data.AspNet.createStore({
    //        key: 'ItemCode',
    //        loadUrl: 'BillOfMaterial/GetData',
    //        onBeforeSend(method, ajaxOptions) {
    //            ajaxOptions.headers = {
    //                "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val(),
    //                "Options": "BMU3|"
    //            };
    //            ajaxOptions.xhrFields = { withCredentials: true };
    //        },
    //    }),
    //    dataStructure: "plain",
    //    keyExpr: "Id",
    //    parentIdExpr: "ParentId",
    //    displayExpr: "ItemName",
    //    selectionMode: "single",
    //    //showCheckBoxesMode: "normal",
    //    expandNodesRecursive: false,
    //    searchEnabled: false,
    //    height: 500,
    //    width: "100%",

    //    onItemClick: function (e) {
    //        selectedNode = e.node;
    //    },
    //    onContentReady: function () {
    //        if (treeView && !treeView._expandedOnce) {
    //            treeView.expandAll();
    //            treeView._expandedOnce = true;
    //        }
    //    },
    //    onSelectionChanged: function (e) {
    //        selectedNode = e.node || null;
    //    }
    //}).dxTreeView("instance");

    //function reloadAndTryReselect(targetKey) {
    //    var ds = treeView.getDataSource();
    //    ds.reload().done(function () {
    //        if (targetKey) {
    //            treeView.expandItem(targetKey);
    //            treeView.selectItem(targetKey);
    //            treeView.scrollToItem(targetKey);
    //        }
    //    });
    //}

    //function ajaxJson(opts) {
    //    return $.ajax($.extend(true, {
    //        contentType: 'application/json',
    //        headers: { "RequestVerificationToken": getCsrfToken() },
    //        xhrFields: { withCredentials: true }
    //    }, opts));
    //}





    {/*    */ } {/*// =======================*/ }
    {/*    */ } {/*//       ADD ITEM*/ }
    {/*    */ } {/*// =======================*/ }
    {/*    $('#addItemBtn').on('click', function () {*/ }
    {/*        if (!selectedNode) {*/ }
    {/*        alert("Pilih parent node terlebih dahulu.");*/ }
    {/*        return;*/ }
    {/*    }*/ }

    {/*    var newCode = selectedNode; //prompt("ItemCode baru:", "NEW-" + Date.now());*/ }
    {/*    if (!newCode) return;*/ }

    {/*    var newName = prompt("ItemName:", "New Item");*/ }
    {/*    if (newName === null) return;*/ }

    {/*    var newQty  = parseFloat(prompt("QtyUsage:", "1")) || 1;*/ }
    {/*    var newSat  = prompt("Satuan:", "PCS") || "PCS";*/ }
    {/*    var level   = (selectedNode.itemData?.LevelSeqn || selectedNode.level || 0) + 1;*/ }

    {/*    var newItem = {*/ }
    {/*        ItemCode: newCode,*/ }
    {/*        ItemName: newName,*/ }
    {/*        ParentId: selectedNode.key,   // key = ItemCode parent (karena keyExpr = "id" -> alias server)*/ }
    {/*        QtyUsage: newQty,*/ }
    {/*        Satuan: newSat,*/ }
    {/*        LevelSeqn: level,*/ }
    {/*        VendorCode: currentVendorCode // opsional*/ }
    {/*    };*/ }

    {/*    ajaxJson({*/ }
    {/*        url: '/api/items/Add',*/ }
    {/*        type: 'POST',*/ }
    {/*        data: JSON.stringify(newItem)*/ }
    {/*        }).done(function (res) {*/ }
    {/*            DevExpress.ui.notify(res.message || "Berhasil tambah", "success", 2000);*/ }
    {/*            reloadAndTryReselect(newItem.ItemCode);*/ }
    {/*        }).fail(function (xhr) {*/ }
    {/*            var msg = (xhr.responseJSON && xhr.responseJSON.message) || "Gagal menambah item";*/ }
    {/*                DevExpress.ui.notify(msg, "error", 3000);*/ }
    {/*            });*/ }
    {/*        });*/ }

    {/*    */ } {/*// =======================*/ }
    {/*    */ } {/*//       EDIT ITEM*/ }
    {/*    */ } {/*// =======================*/ }
    {/*    $('#editItemBtn').on('click', function () {*/ }
    {/*    if (!selectedNode) {*/ }
    {/*        alert("Pilih item yang akan diedit.");*/ }
    {/*    return;*/ }
    {/*    }*/ }

    {/*    var data = selectedNode.itemData || { };*/ }
    {/*    var updated = {*/ }
    {/*        ItemCode: data.ItemCode || selectedNode.key,*/ }
    {/*        ItemName: prompt("ItemName:", data.ItemName || "") ?? data.ItemName,*/ }
    {/*        ParentId: data.parentId || data.ParentId || selectedNode.parent?.key || null,*/ }
    {/*        QtyUsage: parseFloat(prompt("QtyUsage:", data.QtyUsage || "1")) || (data.QtyUsage || 1),*/ }
    {/*        Satuan: prompt("Satuan:", data.Satuan || "PCS") || (data.Satuan || "PCS"),*/ }
    {/*        LevelSeqn: data.LevelSeqn ?? selectedNode.level ?? 0,*/ }
    {/*        VendorCode: data.VendorCode || currentVendorCode*/ }
    {/*    };*/ }

    {/*    ajaxJson({*/ }
    {/*        url: '/api/items/Edit/' + encodeURIComponent(selectedNode.key),*/ }
    {/*        type: 'PUT',*/ }
    {/*        data: JSON.stringify(updated)*/ }
    {/*    }).done(function (res) {*/ }
    {/*        DevExpress.ui.notify(res.message || "Berhasil edit", "success", 2000);*/ }
    {/*        reloadAndTryReselect(updated.ItemCode);*/ }
    {/*    }).fail(function (xhr) {*/ }
    {/*        var msg = (xhr.responseJSON && xhr.responseJSON.message) || "Gagal mengedit item";*/ }
    {/*        DevExpress.ui.notify(msg, "error", 3000);*/ }
    {/*    });*/ }
    {/*  });*/ }

    {/*    */ } {/*// =======================*/ }
    {/*    */ } {/*//      DELETE ITEM*/ }
    {/*    */ } {/*// =======================*/ }
    {/*  $('#deleteItemBtn').on('click', function () {*/ }
    {/*    if (!selectedNode) {*/ }
    {/*        alert("Pilih item yang akan dihapus.");*/ }
    {/*     return;*/ }
    {/*  }*/ }

    {/*    var key = selectedNode.key;*/ }
    {/*    if (!confirm("Hapus item '" + key + "'?")) return;*/ }

    {/*    ajaxJson({*/ }
    {/*        url: '/api/items/Delete/' + encodeURIComponent(key),*/ }
    {/*        type: 'DELETE'*/ }
    {/*    }).done(function (res) {*/ }
    {/*            DevExpress.ui.notify(res.message || "Berhasil hapus", "success", 2000);*/ }
    {/*            var parentKey = selectedNode.parent ? selectedNode.parent.key : null;*/ }
    {/*            reloadAndTryReselect(parentKey);*/ }
    {/*            selectedNode = null;*/ }
    {/*        }).fail(function (xhr) {*/ }
    {/*            var msg = (xhr.responseJSON && xhr.responseJSON.message) || "Gagal menghapus item";*/ }
    {/*            DevExpress.ui.notify(msg, "error", 3000);*/ }
    {/*        });*/ }
    {/*    });*/ }

    {/*        */ } {/*// =======================*/ }
    {/*        */ } {/*//    FILTER / RELOAD*/ }
    {/*        */ } {/*// =======================*/ }
    {/*        // contoh: jika ada dropdown vendor, panggil ini setelah berubah*/ }
    {/*        function applyVendorFilter(vendor) {*/ }
    {/*            currentVendorCode = vendor || null;*/ }
    {/*        reloadAndTryReselect(null);*/ }
    {/*    }*/ }

    {/*    // expose helper kalau perlu di tempat lain*/ }
    {/*    window.applyVendorFilter = applyVendorFilter;*/ }



});





















//$(document).ready(function () {

//    var treeView = $("#treeViewContainer").dxTreeView({
//        dataSource: DevExpress.data.AspNet.createStore({
//            key: 'VendorCode',
//            loadUrl: 'BillOfMaterial/GetData',
//            onBeforeSend(method, ajaxOptions) {
//                ajaxOptions.headers = {
//                    "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val(),
//                    "Options": "BMU|"
//                };
//                ajaxOptions.xhrFields = { withCredentials: true };
//            },
//        }), 
//        idField: "id",             
//        parentIdField: "parentId", 
//        displayExpr: "ItemName",       
//        valueExpr: "ItemCode",           
//        width: '100%',             
//        height: 500,               
//        showCheckBoxesMode: "normal", 
//        onItemClick: function (e) {
//            selectedNode = e.node;
//        }
//    }).dxTreeView("instance");

//    var selectedNode;

//    // Handle Add Item button
//    $('#addItemBtn').on('click', function () {
//        if (!selectedNode) {
//            alert("Please select a parent node first.");
//            return;
//        }

//        var newItem = {
//            ItemCode: "NewCode",
//            ItemName: "NewItem",
//            ParentId: selectedNode.value, 
//            QtyUsage: 1,
//            Satuan: "PCS",
//            LevelSeqn: selectedNode.level + 1 
//        };

//        $.ajax({
//            url: '/api/items/Add',
//            type: 'POST',
//            contentType: 'application/json',
//            data: JSON.stringify(newItem),
//            success: function (response) {
//                alert(response.message);
//                treeView.refresh(); 
//            },
//            error: function (error) {
//                alert("Error adding item");
//            }
//        });
//    });

//    // Handle Edit Item button
//    $('#editItemBtn').on('click', function () {
//        if (!selectedNode) {
//            alert("Please select an item to edit");
//            return;
//        }

//        var updatedItem = {
//            ItemCode: "UpdatedCode",
//            ItemName: "UpdatedItem",
//            ParentId: selectedNode.parentId,
//            QtyUsage: 2,
//            Satuan: "PCS",
//            LevelSeqn: selectedNode.level // Use the selected node's level
//        };

//        $.ajax({
//            url: '/api/items/Edit/' + selectedNode.value,
//            type: 'PUT',
//            contentType: 'application/json',
//            data: JSON.stringify(updatedItem),
//            success: function (response) {
//                alert(response.message);
//                treeView.refresh(); // Refresh TreeView after editing item
//            },
//            error: function (error) {
//                alert("Error editing item");
//            }
//        });
//    });

//    // Handle Delete Item button
//    $('#deleteItemBtn').on('click', function () {
//        if (!selectedNode) {
//            alert("Please select an item to delete");
//            return;
//        }

//        $.ajax({
//            url: '/api/items/Delete/' + selectedNode.value,
//            type: 'DELETE',
//            success: function (response) {
//                alert(response.message);
//                treeView.refresh(); // Refresh TreeView after deleting item
//            },
//            error: function (error) {
//                alert("Error deleting item");
//            }
//        });
//    });




//    /*
//    dataGridBOM = $("#dataGridBOM").dxDataGrid({
//        dataSource: DevExpress.data.AspNet.createStore({
//            key: 'BOMCode',
//            loadUrl: 'BillOfMaterial/GetData',
//            onBeforeSend(method, ajaxOptions) {
//                ajaxOptions.headers = {
//                    "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val(),
//                    "Options": "BMU3|"
//                };
//                ajaxOptions.xhrFields = { withCredentials: true };
//            },
//        }),
//        columns: [
//            {
//                type: "buttons",
//                caption: "Actions",
//                buttons: [
//                    {
//                        hint: "View",
//                        icon: "fa fa-eye",
//                        onClick: function (e) {
//                            var bomId = e.row.data.Id;
//                            //openPopupDetailBOM(inventoryId);
//                        }
//                    },
//                    {
//                        hint: "Edit",
//                        icon: "fa fa-edit",
//                        onClick: function (e) {
//                            var bomId = e.row.data.Id;
//                            //window.open("/Inventory/Edit/" + inventoryId, "_blank");
//                            openPopupEditBOM(bomId);
//                        }
//                    },
//                ]
//            },
//            //Id	BussCode	PlantCode	BOMCode	FGCode	FGName	BOMDescription
//            { dataField: "Id", caption: "Id", visible: false },
//            { dataField: "BussCode", caption: "BussCode", visible: false },
//            { dataField: "PlantCode", caption: "PlantCode" },
//            { dataField: "BOMCode", caption: "BOM Code" },
//            { dataField: "FGCode", caption: "FG Code" },
//            { dataField: "FGName", caption: "Material Code" },
//            { dataField: "BOMDescription", caption: "Material Name" },
//        ],
//        columnAutoWidth: false,
//        showRowLines: true,
//        paging: {
//            pageSize: 12
//        },
//        editing: {
//            allowUpdating: true,
//            allowDeleting: true,
//            allowAdding: true,
//            mode: "popup"
//        },
//        pager: {
//            visible: true,
//            allowedPageSizes: [12, 20, 50, 'all'],
//            showPageSizeSelector: true,
//            showInfo: true,
//            showNavigationButtons: true
//        },
//        toolbar: {
//            items: [
//                {
//                    widget: "dxButton",
//                    options: {
//                        icon: "fa fa-file",
//                        hint: "Add New BOM",
//                        onClick: function () {
//                            openPopupAddBOM();
//                        }
//                    },
//                    location: "before"
//                }
//            ]
//        }
//    }).dxDataGrid("instance");
//    */





//});