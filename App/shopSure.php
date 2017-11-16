<?php
/**
 * Created by PhpStorm.
 * User: 宏达
 * Date: 2017/11/15
 * Time: 10:55
 */
class shopSure{
    public $db;
    function __construct(){
        $obj=new db();
        $this->db=$obj->mysql;//获取数据
    }
    function index(){
        include 'App/views/shopSure.html';
    }
}