<?php
/**
 * Created by PhpStorm.
 * User: 宏达
 * Date: 2017/11/10
 * Time: 9:18
 */
class game{
    function _construct(){
        $obj=new db();
        $this->mysql=$obj->mysql;
    }
    function index(){
        include 'App/views/game.html';
    }
    function select(){
        $type=$_GET['type'];
        $this->mysql=new mysqli('localhost','root','','ktv',3306);
        $this->mysql->query('set names utf8');
        $data=$this->mysql->query("select * from game where type=$type limit 0,9")->fetch_all(MYSQLI_ASSOC);
        include 'App/views/gamelist.html';
    }
    function change(){
        $pages=$_REQUEST['pages'];
        $type=$_REQUEST['type'];
        $offset=($pages-1)*9;
        $this->mysql=new mysqli('localhost','root','','ktv',3306);
        $this->mysql->query('set names utf8');
        $sql="select * from game where type=$type limit $offset,9";
        $data=$this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
}