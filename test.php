<?php 
function sanitize_my_email($field) {
    $field = filter_var($field, FILTER_SANITIZE_EMAIL);
    if (filter_var($field, FILTER_VALIDATE_EMAIL)) {
        return true;
    } else {
        return false;
    }
}
$to_email = 'noreply@deniskibe.dx.am';
$subject = htmlentities($_POST['name']);
$subject.="-";
$subject .= htmlentities($_POST['number']);
$message = htmlentities($_POST['message']);
//$headers = 'From:noreply@deniskibe.dx.am';
//check if the email address is invalid $secure_check
$secure_check = sanitize_my_email($to_email);
if ($secure_check == false) {
    echo "Invalid input";
} else { //send email 
    mail($to_email, $subject, $message, $headers);
    echo "This email is sent using PHP Mail";
}
?>