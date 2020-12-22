(function () {
    window.addEventListener('load', function () {
        var $table = null;

        var $sendNavForm = $('.createNewPanelElementForm');     //   $('.НазваниеКласса')  -- поиск html єлемента по классу
        var $sendNavButton = $('.createNewPanelElementButton');// поиск кнопки по классу

        // второй способ привязать к кнопке анонимную функцию :
        // $sendNavButton.addEventListener('click', function () {
        //         // do something
        // });

        $sendNavButton.on('click', function () {// привязываем анонимную функцию к событию click кнопки
            var message = { //Тип PlainObject - это объект JavaScript, содержащий ноль или более пар ключ-значение.
                title: '',
                href: '',
                order_col: '',
                parent_id: ''
            }
            message.title = $sendNavForm.find('#title').val();// на форме ищем input по id = title, val() - значение
            message.href = $sendNavForm.find('#href').val();
            message.order_col = $sendNavForm.find('#order_col').val();
            message.parent_id = $sendNavForm.find('#parent_id').val();

            // console.dir(message);
            $.ajax({
                url: '/controlpanel/ajaxadmin/saveNav',//  куда передаем
                data: message,// передаем  4 - ре пары ключ значение
                method: "POST"
            }).done(function (response) {
                console.log(response);
                // $header = $('.comment-reply-title');
                // var contentMessage = '';
                // if (response.includes("ADDED")) {
                //     contentMessage = "Все пучком, братан";
                //     $header.append(showReportDialog(contentMessage, 'alert-success'));
                //
                // } else if (response.includes("NOTADDED")) {
                //     contentMessage = "Извините, произошла ошибка";
                //     $header.append(showReportDialog(contentMessage));
                // }
                // $sendMessageForm.trigger("reset");
            });
        });









        var createOneRow = function (rowData, index, $select, deleteRowHundler) {
            var $row = $('<tr data-id="' + rowData.id + '">');
            $row.append($('<td>').css('width', '70px').text(index + 1).addClass('text-center'));
            $row.append($('<td>').text(rowData.title));
            $row.append($('<td>').text(rowData.href));
            $row.append($('<td>').text(rowData.order_col));
            $row.append($('<td>').append($select));
            $buttonDel = $('<button type="button" class="btn btn-info btn-outline m-r-5"><i class="icon-trash"></i></button>');
            $buttonDel.on('click', deleteRowHundler);
            $row.append($('<td>').append($buttonDel));
            return $row;
        }
        var showReportDialog = function (message, classMode = 'alert-danger') {
            //alert-danger
            //alert-success
            return '<div class="alert ' + classMode + ' alert-dismissible show" role="alert">\n' +
                '  <strong>' + message + '!</strong>' +
                '  <button type="button" class="close" data-dismiss="alert" aria-label="Close">\n' +
                '    <span aria-hidden="true">&times;</span>\n' +
                '  </button>\n' +
                '</div>';
        }
        var deleteRowHundler = function (e) {
            var $deleteRow = $(e.target).closest('tr');
            var deleteRowId = $deleteRow.attr('data-id');
            $.ajax({
                url: '/controlpanel/ajaxadmin/deleteNavElement',
                data: {delete_id: deleteRowId},
                method: "POST"
            }).done(function (response) {
                if (response.includes('ELEMENT_NOT_DELETED')) {
                    $(showReportDialog('Ошибка. Удаление не удалось')).insertBefore($table);
                } else if (response.includes('ELEMENT_DELETED')) {
                    $deleteRow.remove();
                }
            });
        }
        var changeParentHundler = function (e) {
            var $editedRow = $(e.target).closest('tr');
            var editedRowId = $editedRow.attr('data-id');
            var newParentId = this.value;
            $.ajax({
                url: '/controlpanel/ajaxadmin/changeParentElement',
                data: {
                    editedRowId: editedRowId,
                    newParentId: newParentId
                },
                method: "POST"
            }).done(function (response) {
                if (response.includes("ELEMENT_UPDATED")) {
                    $(showReportDialog('Изменение Успешно.', 'alert-success')).insertBefore($table);
                } else if (response.includes("ELEMENT_NOT_UPDATED")) {
                    $(showReportDialog('Ошибка. Изменение не удалось')).insertBefore($table);
                }
            });
        }
        var createParentSelect = function (navData, currentRow) {
            var $select = $('<select>').addClass('form-control');
            $select.change(changeParentHundler);
            var isNull = false;
            if (currentRow.parent_id == null) {//проверяем, что нет родителя
                $select.append($('<option value="null" selected>').text(" "));// нет родителя -  создается пункт selected с пустым полем
            } else {
                $select.append($('<option value="null" >').text(" "));// есть родитель - создается пункт с пустым полем
            }
            navData.forEach(function (item, index) {
                    if (item.title.includes(currentRow.title)) {//например если main в названии совпадает с main в родительском элементе, то мы его пропускаем и не показываем
                        return;// выход из функции
                    }
                    if (currentRow.parent_id == item.id) {//например сравниваем  родителя contacts , т.е. about в названии  c элементом из выпадающего списка в родительском элементе
                        $select.append($('<option value="' + item.id + '" selected>').text(item.title));//совпадает - значит делаем selected
                    } else {
                        $select.append($('<option value="' + item.id + '">').text(item.title));// не совпадает - обычный  элемент списка не selected
                    }
                }
            );
            return $select;
        }
        var createSelectAddNewElementForm = function(navData) {
            var $select = $('<select>').addClass('form-control').attr('id', 'parent_id');
            $select.append($('<option value="null" selected>').text(" "));
            navData.forEach(function (item, index) {
                $select.append($('<option value="' + item.id + '">').text(item.title));
            });
            return $select;
        }


        $.ajax({
            url: '/controlpanel/ajaxadmin/getnavigatealldata',
            data: null,
            method: "POST"
        }).done(function (response) {
            var navData = JSON.parse(response);
            console.dir(navData);
            $('.selectParentElements').append(createSelectAddNewElementForm(navData));
            $table = $('.manage-u-table');
            navData.forEach(function (item, index) {
                $table.append(createOneRow(item, index, createParentSelect(navData, item), deleteRowHundler));
            });
        });
    });
})()





/*

-----------------------------------------------------------------------------------
Чтобы найти по классу такой div в джаваскрипте нужно  $('.hello')
<div class="hello">
    <input type="text" id = "ok" name="ok2">
</div>

-----------------------------------------------------------------------------------
Чтобы найти по id такой div в джаваскрипте нужно  $('#opel')
<div id = "opel" class="hello">
    <input type="text" id = "ok" name="ok2">
</div>
-----------------------------------------------------------------------------------


-----------------------------------------------------------------------------------


 */





























