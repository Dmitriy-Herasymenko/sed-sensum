<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $text = $_POST['text'];

    $to = "sedsensum@gmail.com"; 
    $date = date ("d.m.Y"); 
    $time = date ("h:i");
    $from = $email;
    $subject = "Zgłoszenie ze strony";

    $msg="
    Imię: $name
    Telefon: $phone\n
    Poczta: $email\n
    Treść: $text"; 

    if (mail($to, $subject, $msg, "From: $from ")) {
        echo "<script>";
        echo "alert('Formularz przesłany pomyślnie');";
        echo "window.location.href = 'http://sed-sensum.pl/';";
        echo "</script>";
        exit; 
    } else {
        echo "<script>alert('Wystąpił błąd podczas przesyłania formularza');</script>";
    }
} else {

    echo "<script>alert('Wystąpił błąd serwera');</script>";
}
?>
