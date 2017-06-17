<?php
function post_captcha($user_response) {
  $fields_string = '';
  $fields = array(
      'secret' => '6LcU4R4UAAAAAKn3OaTlNAvpjj-RT6dwQiMh_Hvy',
      'response' => $user_response
  );
  foreach($fields as $key=>$value)
  $fields_string .= $key . '=' . $value . '&';
  $fields_string = rtrim($fields_string, '&');

  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
  curl_setopt($ch, CURLOPT_POST, count($fields));
  curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, True);

  $result = curl_exec($ch);
  curl_close($ch);

  return json_decode($result, true);
}

// Call the function post_captcha
$res = post_captcha($_POST['g-recaptcha-response']);

if (!$res['success']) {
  // What happens when the CAPTCHA wasn't checked
  echo '<p>Please go back and make sure you check the security CAPTCHA box.</p><br>';
} else {
  if($_SERVER['REQUEST_METHOD'] == 'POST') {
    // configure
    $from = 'Luis <agaytan@techiedodo.com>';
    $sendTo = 'Luis <agaytan@techiedodo.com>';
    $subject = 'New message from contact form';
    $fields = array('name' => 'Name', 'email' => 'Email', 'message' => 'Message'); // array variable name => Text to appear in email
    $okMessage = 'Thank you for contacting me. I will get back to you soon!';
    $errorMessage = 'There was an error while submitting the form. Please try again later';

    // let's do the sending

    try
    {
        $emailText = "You have new message from contact form\n=============================\n";

        foreach ($_POST as $key => $value) {

            if (isset($fields[$key])) {
                $emailText .= "$fields[$key]: $value\n";
            }
        }

        mail($sendTo, $subject, $emailText, "From: " . $from);

        $responseArray = array('type' => 'success', 'message' => $okMessage);
    }
    catch (\Exception $e)
    {
        $responseArray = array('type' => 'danger', 'message' => $errorMessage);
    }

    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
        $encoded = json_encode($responseArray);

        header('Content-Type: application/json');

        echo $encoded;
    }
    else {
        echo $responseArray['message'];
    }
  }
}
