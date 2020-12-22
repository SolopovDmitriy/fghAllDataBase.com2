<?php

namespace MyAdmApp {

    use MyApp\MethodExecuter as Mexec;
    use MyApp\NavigateModel;

    class AjaxAdminController extends Mexec
    {

        function index()
        {
            // TODO: Implement index() method.
        }

        public function getnavigatealldata()
        {
            $navM = new NavigateModel();
            $result = $navM->getManyRows([], 'id', 'ASC', 100);
            echo json_encode($result, JSON_UNESCAPED_UNICODE);
        }


        public function saveNav()
        {
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                $title = htmlspecialchars(trim($_POST['title']));
                $href = htmlspecialchars(trim($_POST['href']));
                $order_col = htmlspecialchars(trim($_POST['order_col']));
                $parent_id = htmlspecialchars(trim($_POST['parent_id']));


                // Мы вызвали принт_р чтобы посмотреть как выглядит массив _ПОСТ
//                print_r($_POST);
//                $_POST = Array
//                (
//                    'title' => 'a3',
//                    'href' => 'b3',
//                    'order_col' => 3,
//                    'parent_id' => 1
//                );
//                echo $myPOST['title']; // a3




                $data = [
                    'title' => $title,
                    'href'  => $href,
                    'order_col' => $order_col,
                    'parent_id' => $parent_id
                ];
                $navM = new NavigateModel();
                $result = $navM->addNewRow($data);
                echo "ok";
                print_r($data);
            }else{
                echo "error";
            }





            // echo json_encode($result, JSON_UNESCAPED_UNICODE);
        }
    }
}