<?php
/**
 * Created by PhpStorm.
 * User: 宏达
 * Date: 2017/11/8
 * Time: 14:53
 */
class gamemanage{
    function index(){
        $title='游戏管理';
        include 'App/views/gamemanage.html';
    }
    function insert(){
        $gname=$_GET['gname'];
        $type=$_GET['type'];
        $mysql=new mysqli('localhost','root','','ktv',3306);
        $mysql->query('set names utf8');
        $data=$mysql->query("insert into game (gname,type) VALUES ('{$gname}','{$type}')");
        if($mysql->affected_rows){
            echo 'ok';
            exit();
        }else {
            echo 'error';
        }
    }
    function show(){
        $mysql=new mysqli('localhost','root','','ktv',3306);
        $mysql->query('set names utf8');
        $data=$mysql->query("select * from game")->fetch_all(MYSQLI_ASSOC);
        echo json_encode($data);
    }
    function delete(){
        $ids=$_GET['id'];
        $mysql=new mysqli('localhost','root','','ktv',3306);
        $mysql->query('set names utf8');
        $data=$mysql->query("delete from game where gid=$ids");
        if($mysql->affected_rows){
            echo 'ok';
            exit;
        }
        echo 'error';
    }
    function update(){
        $value=$_GET['value'];
        $type=$_GET['type'];
        $id=$_GET['id'];
        $mysql=new mysqli('localhost','root','','ktv',3306);
        $mysql->query('set names utf8');
        $data=$mysql->query("update game set $type='{$value}' where gid=$id")->fetch_all(MYSQLI_ASSOC);
        if($mysql->affected_rows){
            echo 'ok';
            exit;
        }
        echo 'error';
    }
}