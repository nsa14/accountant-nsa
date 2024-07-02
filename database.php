<?php

//$sum = array();
//$data = '[{"id":1,"money":"11111","title":"GGG","date":"۱۴۰۳/۰۴/۰۳","type":"minus"},{"id":3,"money":"147","title":"AAA","date":"۱۴۰۳/۰۴/۰۳","type":"minus"},{"id":2,"money":"3243243","title":"fffff","date":"۱۴۰۳/۰۴/۰۳","type":"add"}]';
//$data = json_decode($data);
//foreach ($data as $item) {
////    echo($item->money).'<br>';
//    if ($item->type == 'add') {
//        $sum['add'][] = $item->money;
////        $sum[]['add'] = $item->money;
//    } else if ($item->type == 'minus') {
////        $sum[]['minus'] = $item->money;
//        $sum['minus'][] = '-' . $item->money;
//    }
//}
//
//$data = array_map(function ($element) {
//    return $element;
//}, $sum);

//print_r($data);
//echo '<br>';
//$sumAdd = (array_sum(array_values($sum['add'])));
//$sumMinus = (array_sum(array_values($sum['minus'])));
//echo $sumAdd + $sumMinus;


// database named “naserzar_accountant2024”.
//User: naserzar_accountant123
//pass db : F2b(u(Z$)AoE

//ob_start();
ini_set("max_execution_time", 10000);
set_time_limit(10000);
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);


global $var, $conn, $servername, $username, $password;

$servername = "localhost";
$dbName = 'naserza1_accountant2024';
if ($_SERVER['HTTP_HOST'] == '127.0.0.1:8000' || $_SERVER['HTTP_HOST'] == 'localhost:8888') {
    $dbName = 'naserzar_accountant2024';
    $username = "root";
    $password = "root";
} elseif ($_SERVER['HTTP_HOST'] == 'localhost') {
    $username = "root";
    $password = "";
} else {
    $username = "naserza1_accountant123";
    $password = "F2b(u(Z$)AoE";
}

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbName", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//    echo "Connected successfully";
} catch (PDOException $e) {
//    echo 'error connected';
    return false;
//    echo "Connection failed: " . $e->getMessage();
}


//$result = show_all_account(json_encode($_POST));
//echo json_encode($result);


//$dataServer = ['current_user_phone' => '444444444444'];
//$result = show_all_account(json_encode($dataServer));
//echo json_encode($result);


//print_r($_POST);
//echo $_REQUEST['switch_form'];
//return false;


//if (!isset($_REQUEST['switch_form'])){
//    echo 'error established!';
//    return false;
//}
switch (@$_REQUEST['switch_form']) {
    case 'show_account':
        $result = show_all_account(json_encode($_POST));
        echo json_encode($result);
        break;

    case 'show_account_sub_items':
        $result = show_all_account_sub_items(json_encode($_POST));
        echo json_encode($result);
        break;

    case 'delete_subAccount_item':
        $result = deleteSubAccountItem(json_encode($_POST));
        echo json_encode($result);
        break;

    case 'delete_account_with_subs':
        $result = deleteAccountWithSubs(json_encode($_POST));
        echo json_encode($result);
        break;

    case 'register':
        $result = insert_user(json_encode($_POST));
        echo json_encode($result);
        break;

    case 'add_account':
        $result = insert_account(json_encode($_POST));
        echo json_encode($result);
        break;

    case 'add_sub_account':
        $result = insertSubAccount(json_encode($_POST));
        echo json_encode($result);
        break;

    case 'check_login':
        $result = checkedLogin(json_encode($_POST));
        echo json_encode($result);
        break;

    case 'insert_notification':
        $result = insertNotification(json_encode($_POST));
        echo json_encode($result);
        break;

    case 'setPushNotificationToRead':
        $result = setPushNotificationToRead(json_encode($_POST));
        echo json_encode($result);
        break;

    case 'checkPushNotification':
        $result = checkPushNotification(json_encode($_POST));
        echo json_encode($result);
        break;

    default:
}


function show_all_account($dataServer)
{
    global $conn, $sumMoney, $sumAdd, $sumMinus;;
    $sumMoney = array();
    $formData = json_decode($dataServer);

    $sthandler = $conn->prepare("SELECT * FROM account WHERE user_id = :user_id AND status=1");
    $sthandler->bindParam(':user_id', $formData->current_user_id);

    if ($sthandler->execute()) {
//        $userAccount = $sthandler->fetchAll(PDO::FETCH_OBJ);
        $userAccount = $sthandler->fetchAll(PDO::FETCH_ASSOC);
        $arraySubAccountValue = null;
        $sumMoneyFinal = 0;
        $countArraySubAccountValue = 0;

        if (count($userAccount) <= 0) {
            $finalResult['status'] = true;
            $finalResult['message'] = ['account_item' => '',
                'account_item_value_count' => '',
                'account_sum_add' => 0,
                'account_sum_minus' => 0,
                'account_sum_money' => 0];
            return $finalResult;
        }
//        $finalResult['status'] = true;
//        $finalResult['message'] = $userAccount;
//        return $finalResult;

        $index = 1;
        foreach ($userAccount as $key => $itemSub) {
            $obj = $itemSub;
//            $finalResult['status'] = true;
//            if ($obj->account_value)
            $arraySubAccountValue = json_decode($obj['account_value']);


//            $finalResult['status'] = true;
//            $finalResult['message'] = 'NN:' . count($arraySubAccountValue);
//            return $finalResult;


            if (is_countable($arraySubAccountValue)) {
                $countArraySubAccountValue = count($arraySubAccountValue);
                foreach ($arraySubAccountValue as $item) {
                    if ($item->type == 'add') {
                        $sumMoney['add'][] = $item->money;
                    } else if ($item->type == 'minus') {
                        $sumMoney['minus'][] = '-' . $item->money;
                    }
                }
                $sumAdd = (array_sum(array_values(@$sumMoney['add'])));
                if (!empty($sumMoney['minus'])) {
                    $sumMinus = (array_sum(array_values(@$sumMoney['minus'])));
                }
                $sumMoneyFinal = $sumAdd + $sumMinus;
            } else {
                $countArraySubAccountValue = 0;
                $sumAdd = 0;
                $sumMinus = 0;
                $sumMoneyFinal = 0;
            }


//            $finalResult['account_item_value_count'] = $countArraySubAccountValue;
//            $finalResult['message'][$obj['account_name']] = [
//                'account_item' => $userAccount,
////                'account_item_value_count' => $countArraySubAccountValue,
////                'account_sum_add' => $sumAdd,
////                'account_sum_minus' => $sumMinus,
////                'account_sum_money' => $sumMoneyFinal
//            ];
            $finalResult['existCount'] = $index;
            $finalResult['message'][] = [
//                'account_item' => $userAccount,
                'account_item_value_count' => $countArraySubAccountValue,
                'account_sum_add' => $sumAdd,
                'account_sum_minus' => $sumMinus,
                'account_sum_money' => $sumMoneyFinal
            ];
            $finalResult['message'][] = ['account_item' => $itemSub];

            $index++;
        }
        $finalResult['status'] = true;
//        return $finalResult;
//        $finalResult['messageCount'] = $userAccount;
    } else {
        $finalResult['status'] = false;
        $finalResult['message'] = 'خطایی رخ داده است';
    }
    return $finalResult;

}

function checkPushNotification($dataServer)
{
    global $conn, $sumMoney, $finalResult;
    $formData = json_decode($dataServer);
    $sthandler = $conn->prepare("SELECT * FROM push_notification WHERE send_status=0");
    if ($sthandler->execute()) {
//        $finalResult['status'] = false;
//        $finalResult['message'] = $sthandler->rowCount();
//        return $finalResult;
        if ($sthandler->rowCount() > 0) {
            $dataRow = $sthandler->fetch(PDO::FETCH_ASSOC);
            $finalResult['status'] = true;
            $finalResult['title'] = $dataRow['title'];
            $finalResult['message'] = $dataRow['message'];
        } else {
            $finalResult['status'] = false;
            $finalResult['message'] = 'پیغام جدیدی وجود ندارد!';
        }
        return $finalResult;
    }
}

function show_all_account_sub_items($dataServer)
{
    global $conn, $sumMoney, $sumAdd, $sumMinus;;
    $sumMoney = array();
    $formData = json_decode($dataServer);

//    $finalResult['status'] = true;
//    $finalResult['message'] = $formData->current_account_id;
//    return $finalResult;

//    $sql = "SELECT * FROM account WHERE id=" . $formData->current_account_id . " AND status=1";
    $sthandler = $conn->prepare("SELECT * FROM account WHERE id = :id AND status=1");
    $sthandler->bindParam(':id', $formData->current_account_id);

    if ($sthandler->execute()) {
//        $subAccountDataValue = $conn->fetchAll(PDO::FETCH_OBJ);
        $subAccountDataValue = $sthandler->fetch(PDO::FETCH_ASSOC);

        $arraySubAccountValue = null;
        $sumMoneyFinal = 0;
        $countArraySubAccountValue = 0;

        $finalResult['status'] = true;
        $finalResult['account_name'] = $subAccountDataValue['account_name'];
        $finalResult['account_id'] = $subAccountDataValue['id'];
        $finalResult['message'] = json_decode($subAccountDataValue['account_value']);

//        $finalResult['status'] = true;
//        $finalResult['message'] = ['account_item' => $userAccount,
//            'account_item_value_count' => $countArraySubAccountValue,
//            'account_sum_money' => $sumMoneyFinal];
    } else {
        $finalResult['status'] = false;
        $finalResult['message'] = 'خطایی رخ داده است';
    }
    return $finalResult;
}

function deleteSubAccountItem($dataServer)
{
    global $conn, $sumMoney, $sumAdd, $sumMinus;;
    $sumMoney = array();
    $formData = json_decode($dataServer);

    $sthandler = $conn->prepare("SELECT * FROM account WHERE id = :id");
    $sthandler->bindParam(':id', $formData->current_account_id);
    $sthandler->execute();

    $AccountData = $sthandler->fetch(PDO::FETCH_ASSOC);
    $MainData = json_decode($AccountData['account_value']);
//    unset($MainData[1]);
////    find item by key array is OKKKK
//    $obj = array_column($MainData, null, 'id')[$formData->current_sub_account_id] ?? false;

    $key = array_search($formData->current_sub_account_id, array_column($MainData, 'id'));
    array_splice($MainData, $key, 1);
    if (count($MainData) >= 1) {
        $newSubAccountArray = json_encode($MainData);
    } else {
        $newSubAccountArray = '';
    }


    $sql = "UPDATE account SET account_value=? WHERE id=?";

    if ($conn->prepare($sql)->execute([$newSubAccountArray, $formData->current_account_id])) {
        $finalResult['status'] = true;
        $finalResult['message'] = ' عملیات به درستی انجام شد ';
    } else {
        $finalResult['status'] = false;
        $finalResult['message'] = 'خطایی رخ داده است در حذف !';
    }
    return $finalResult;
}

function deleteAccountWithSubs($dataServer)
{
    global $conn, $sumMoney, $sumAdd, $sumMinus;;
    $sumMoney = array();
    $formData = json_decode($dataServer);

    $sql = "UPDATE account SET status=? WHERE id=?";

    if ($conn->prepare($sql)->execute([0, $formData->current_account_id])) {
        $finalResult['status'] = true;
        $finalResult['message'] = ' عملیات به درستی انجام شد ';
    } else {
        $finalResult['status'] = false;
        $finalResult['message'] = 'خطایی رخ داده است در حذف حساب !';
    }
    return $finalResult;
}

function insert_user($dataServer): array
{
    global $conn;
    $formData = json_decode($dataServer);
    $data = [
        'username' => $formData->txt_username,
        'phone' => $formData->txt_phone,
        'password' => $formData->txt_password,
        'created_at' => date("Y-m-d H:i:s"),
    ];
//    check exist phone
    $sthandler = $conn->prepare("SELECT phone FROM users WHERE phone = :phone");
    $sthandler->bindParam(':phone', $formData->txt_phone);
    $sthandler->execute();

    if ($sthandler->rowCount() > 0) {
        $finalResult['status'] = true;
        $finalResult['data'] = 'duplicated';
        $finalResult['message'] = ' این شماره از قبل ثبت نام نموده است. روی گزینه "ورود" کلیک نمایید';
        return $finalResult;
    }
//    insert new user
    $sql = "INSERT INTO users (username,phone,password,created_at) 
                        VALUES (:username,:phone,:password,:created_at)";

    if ($conn->prepare($sql)->execute($data)) {
        $finalResult['status'] = true;
        $finalResult['userId'] = $conn->lastInsertId();;
        $finalResult['message'] = ' اطلاعات کاربر ورودی به درستی در سایت ثبت شد';
    } else {
        $finalResult['status'] = false;
        $finalResult['message'] = 'خطایی رخ داده است';
    }
    return $finalResult;
}

function insert_account($dataServer)
{
    global $conn;
    $formData = json_decode($dataServer);
//    check exist phone
    $sthandler = $conn->prepare("SELECT * FROM users WHERE phone = :phone");
    $sthandler->bindParam(':phone', $formData->current_user_phone);
    $sthandler->execute();

    if ($sthandler->rowCount() <= 0) {
        $finalResult['status'] = false;
        $finalResult['message'] = ' ابتدا در برنامه ثبت نام نمایید.';
        return $finalResult;
    }
    $userId = $sthandler->fetch(PDO::FETCH_ASSOC);
//    $finalResult['status'] = true;
//    $finalResult['message'] = ' userId is : '.$userId['id'];
//    return $finalResult;
    $data = [
        'user_id' => $userId['id'],
        'account_name' => $formData->txt_account_name,
        'account_value' => '',
        'created_at' => date("Y-m-d H:i:s"),
    ];
//    insert new user
    $sql = "INSERT INTO account (user_id,account_name,account_value,created_at) 
                        VALUES (:user_id,:account_name,:account_value,:created_at)";

    if ($conn->prepare($sql)->execute($data)) {
        $finalResult['status'] = true;
        $finalResult['message'] = ' حساب جدید ساخته شد ';
    } else {
        $finalResult['status'] = false;
        $finalResult['message'] = 'خطایی رخ داده است';
    }
    return $finalResult;
}

function insertNotification($dataServer)
{
    global $conn;
    $formData = json_decode($dataServer);
    $data = [
        'title' => $formData->txt_notification_title,
        'message' => $formData->txt_notification_message,
    ];
//    insert new user
    $sql = "INSERT INTO push_notification (title,message) 
                        VALUES (:title,:message)";

    if ($conn->prepare($sql)->execute($data)) {
        $finalResult['status'] = true;
        $finalResult['message'] = ' نوتیف جدید ثبت شد ';
    } else {
        $finalResult['status'] = false;
        $finalResult['message'] = 'خطایی در ثبت نوتیف رخ داده است';
    }
    return $finalResult;
}

function insertSubAccount($dataServer)
{
    global $conn;
    $formData = json_decode($dataServer);
    if ($formData->txt_type === 'add_account_type') {
        $typeSubAccount = 'add';
    } else {
        $typeSubAccount = 'minus';
    }

    //get account_value from table account
    $sthandler = $conn->prepare("SELECT * FROM account WHERE id =" . $formData->txt_account_id);
    $sthandler->execute();

    if ($sthandler->rowCount() <= 0) {
        $finalResult['status'] = false;
        $finalResult['message'] = ' رکوردی یافت نشد! ';
        return $finalResult;
    }
    $subAccountDataValue = $sthandler->fetch(PDO::FETCH_ASSOC);

    $ids = array();
    $dataArraySub = array();
    $valueIdMax = 1;
    if (!empty($subAccountDataValue['account_value'])) {
        $dataArraySub = json_decode($subAccountDataValue['account_value']);
        foreach ($dataArraySub as $item) {
            $ids[] = $item->id;
        }
        $valueIdMax = max($ids);
    }


//    append new item to array
//merge new array to db
    $txt_money2 = str_replace(',', '', $formData->txt_money);

    $data = [
        'id' => $valueIdMax + 1,
        'money' => $txt_money2,
        'title' => $formData->txt_title,
        'fa_date' => $formData->txt_date,
        'type' => $typeSubAccount,
        'created_at' => date("Y-m-d H:i:s")
    ];

    $dataArraySub[] = $data;

//    $finalResult['status'] = true;
//    $finalResult['message'] = $formData->txt_account_id;
//    return $finalResult;
    $id = $formData->txt_account_id;
    $FinalNewArrayData = json_encode($dataArraySub);

//    add new sub account
//    $sql = 'UPDATE account SET account_value='.$FinalNewArrayData.' WHERE id='.$id;
    $sql = "UPDATE account SET account_value=? WHERE id=?";

//    $finalResult['status'] = true;
//    $finalResult['message'] = ($dataArraySub);
//    return $finalResult;

    if ($conn->prepare($sql)->execute([$FinalNewArrayData, $id])) {
        $finalResult['status'] = true;
        $finalResult['message'] = ' عملیات به درستی انجام شد ';
    } else {
        $finalResult['status'] = false;
        $finalResult['message'] = 'خطایی رخ داده است';
    }
    return $finalResult;
}

function setPushNotificationToRead($dataServer): array
{
    global $conn;
//    $sql = "UPDATE push_notification SET send_status=1";
    $sql = "UPDATE push_notification SET send_status=?";

    if ($conn->prepare($sql)->execute([1])) {
        $finalResult['status'] = true;
        $finalResult['message'] = ' نوتیف صفر شد ';
    } else {
        $finalResult['status'] = false;
        $finalResult['message'] = 'خطایی رخ داده است';
    }
    return $finalResult;
}

function checkedLogin($dataServer): array
{
    global $conn;
    $formData = json_decode($dataServer);
//    check exist phone
    $sthandler = $conn->prepare("SELECT * FROM users WHERE phone = :phone AND password = :password");
    $sthandler->bindParam(':phone', $formData->current_user_phone);
    $sthandler->bindParam(':password', $formData->current_user_password);
    $sthandler->execute();

    if ($sthandler->rowCount() <= 0) {
        $finalResult['status'] = false;
        $finalResult['message'] = 'اطلاعات وارد شده صحیح نمی باشد';
        return $finalResult;
    }
    $userData = $sthandler->fetch(PDO::FETCH_ASSOC);
//    $finalResult['status'] = true;
//    $finalResult['message'] = ' userId is : '.$userId['id'];
//    return $finalResult;
    $data = [
        'userid' => $userData['id'],
        'username' => $userData['username'],
        'phone' => $userData['phone']
    ];
    $finalResult['status'] = true;
    $finalResult['data'] = $data;
    $finalResult['message'] = 'ورود انجام شد';
    return $finalResult;
}


