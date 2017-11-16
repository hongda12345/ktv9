<?php
/**
 * Created by PhpStorm.
 * User: 宏达
 * Date: 2017/11/10
 * Time: 11:38
 */
class db{
    public $mysql;
    function __construct(){
        $this->config();
    }
    function config(){
        $this->mysql=new mysqli('localhost','root','','ktv',3306);
        $this->mysql->query('set names utf8');
    }
}