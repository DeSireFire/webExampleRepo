<?php
    require('config.php');
    mysqli_query($con,"set names utf8");
    $atext=$_POST['atext'];
    $ptext=$_POST['ptext'];
    $ltext=$_POST['ltext'];
    $id=$_POST['id'];
    $q="update nav set nav='$atext',navimg='$ptext',navlinks='$ltext' where id=$id";
    mysqli_query($con,$q);
?>
