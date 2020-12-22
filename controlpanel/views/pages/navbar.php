<?php
//    varSuperDump($data['navigate']);
?>
<div id="page-wrapper">
    <div class="container-fluid">
        <div class="row bg-title">
            <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                <h4 class="page-title">Навигационная панель</h4></div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->
        <!-- .row -->
        <div class="row">
            <div class="col-lg-12 col-sm-12">
                <div class="panel">
                    <div class="panel-heading">Управление навигацией
                        <button type="button" class="btn btn-info btn-outline btn-circle btn-lg m-r-5"
                                data-toggle="modal" data-target="#exampleModalCenter">
                            <i class="ti-file"></i>
                        </button>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover manage-u-table">
                            <thead>
                            <tr>
                                <th style="width: 70px;" class="text-center">#</th>
                                <th>Название</th>
                                <th>Гиперссылка</th>
                                <th>Последовательность(сортировка)</th>
                                <th>Родительский элемент</th>
                                <th>Управление</th>
                            </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <script src="/controlpanel/static/js/navmanage.js"></script>
        </div>
        <!-- /.row -->
        <!-- Modal -->
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
             aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Добавление нового пункта панели
                            навигации</h5>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal p-r-20 createNewPanelElementForm">
                            <div class="form-group">
                                <label class="col-md-12">Название</label>
                                <div class="col-md-12">
                                    <input type="text" class="form-control" value="" id = "title" name="title123" placeholder="title">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-12" for="example-email">Href</label>
                                <div class="col-md-12">
                                    <input type="text" id = "href" name="href" class="form-control" placeholder="href">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-12" for="example-email">Order</label>
                                <div class="col-md-12">
                                    <input type="number" id = "order_col" name="order_col" class="form-control" placeholder="order_col" min="1" max="30">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-12">Input Select</label>
                                <div class="col-sm-12 selectParentElements">

                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary createNewPanelElementButton">Создать</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
    </div>
</div>
