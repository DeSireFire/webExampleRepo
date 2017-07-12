<?php
    require('config.php');
    mysqli_query($con,"set names utf8");
    $atext=$_POST['atext'];
    $ltext=$_POST['ltext'];
    $id=$_POST['id'];
    $q="update nav1 set nav='$atext',navlinks='$ltext' where id=$id";
    mysqli_query($con,$q);
?>
