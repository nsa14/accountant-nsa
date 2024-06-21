<?php
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
} else {
    $dbName = 'naserzar_accountant2024';
    $username = "naserzar_accountant123";
    $password = "F2b(u(Z$)AoE";
}

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbName", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//        echo "Connected successfully";
} catch (PDOException $e) {
    echo 'error connected';
    return false;
//    echo "Connection failed: " . $e->getMessage();
}

//print_r($_POST);
//return false;
switch ($_REQUEST['switch_form']) {
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
        $finalResult['status'] = false;
        $finalResult['message'] = ' این شماره از قبل ثبت نام نموده است.';
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
    $data = [
        'current_user_phone' => $formData->current_user_phone,
        'txt_account_name' => $formData->txt_account_name,
        'created_at' => date("Y-m-d H:i:s"),
    ];
//    check exist phone
    $sthandler = $conn->prepare("SELECT phone FROM users WHERE phone = :phone");
    $sthandler->bindParam(':phone', $formData->current_user_phone);
    $sthandler->execute();

    if ($sthandler->rowCount() <= 0) {
        $finalResult['status'] = false;
        $finalResult['message'] = ' ابتدا در برنامه ثبت نام نمایید.';
        return $finalResult;
    }
    $userId = $sthandler->fetch();
    $finalResult['status'] = true;
    $finalResult['message'] = ' userId is : '.$userId;
    return $finalResult;
//    insert new user
        $sql = "INSERT INTO account (user_id,account_name,account_value,created_at) 
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
