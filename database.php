<?php

$sum = array();
$data = '[{"id":1,"money":"11111","title":"GGG","date":"۱۴۰۳/۰۴/۰۳","type":"minus"},{"id":3,"money":"147","title":"AAA","date":"۱۴۰۳/۰۴/۰۳","type":"minus"},{"id":2,"money":"3243243","title":"fffff","date":"۱۴۰۳/۰۴/۰۳","type":"add"}]';
$data = json_decode($data);
foreach ($data as $item) {
//    echo($item->money).'<br>';
    if ($item->type == 'add') {
        $sum['add'][] = $item->money;
//        $sum[]['add'] = $item->money;
    } else if ($item->type == 'minus') {
//        $sum[]['minus'] = $item->money;
        $sum['minus'][] = '-' . $item->money;
    }
}

$data = array_map(function ($element) {
    return $element;
}, $sum);

//print_r($data);
//echo '<br>';
//$sumAdd = (array_sum(array_values($sum['add'])));
//$sumMinus = (array_sum(array_values($sum['minus'])));
//echo $sumAdd + $sumMinus;


// database named “naserzar_accountant2024”.
//User: naserzar_accountant123
//pass db : F2b(u(Z$)AoE

ob_start();
ini_set("max_execution_time", 1000);
set_time_limit(1000);


global $var, $conn, $servername, $username, $password;

$servername = "localhost";
if ($_SERVER['HTTP_HOST'] == '127.0.0.1:8000' || $_SERVER['HTTP_HOST'] == 'localhost:8888') {
    $dbName = 'naserzar_accountant2024';
    $username = "root";
    $password = "root";
} elseif ($_SERVER['HTTP_HOST'] == 'localhost') {
    $dbName = 'naserzar_accountant2024';
    $username = "root";
    $password = "";
} else {
    $dbName = 'naserzar_accountant2024';
    $username = "naserzar_accountant123";
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


//$dataServer = ['current_user_phone' => '444444444444'];
//$result = show_all_account(json_encode($dataServer));
//echo json_encode($result);


//print_r($_POST);
//echo $_REQUEST['switch_form'];
//return false;
switch ($_REQUEST['switch_form']) {
    case 'show_account':
        $result = show_all_account(json_encode($_POST));
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

    default:
}


function show_all_account($dataServer)
{
    global $conn, $sumMoney, $sumAdd, $sumMinus;;
    $sumMoney = array();
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
    $user = $sthandler->fetch(PDO::FETCH_ASSOC);
//    return $user['id'];
//    insert new user
    $sql = "SELECT * FROM account WHERE user_id=" . $user['id'] . " AND status=0";
    $res = $conn->query($sql);


    if ($res) {
        $userAccount = $res->fetchAll(PDO::FETCH_OBJ);

        foreach ($userAccount as $itemSub) {
            $obj = $itemSub;
//            $finalResult['status'] = true;
//            if ($obj->account_value)
            $arraySubAccountValue = json_decode($obj->account_value);
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

//            if(count($arraySubAccountValue) >0) {
////            if ($obj->account_value !== '[]'){
//                foreach ($obj as $key => $value) {
////                echo 'Your key is: '.$key.' and the value of the key is:'.$value;
//                    $subItemValueCount++;
////                    $finalResult['message'] = $subItemValueCount;
//                }
//            }else{
//                $subItemValueCount = 0;
////                $finalResult['message'] = '0';
//            }
        }
//        return $finalResult;


//        return ($subItemValueCount);
        $finalResult['status'] = true;
        $finalResult['message'] = ['account_item' => $userAccount,
            'account_item_value_count' => count($arraySubAccountValue),
            'account_sum_money' => $sumMoneyFinal];
//        $finalResult['messageCount'] = $userAccount;
    } else {
        $finalResult['status'] = false;
        $finalResult['message'] = 'خطایی رخ داده است';
    }
    return $finalResult;
}

function insert_user($dataServer)
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
