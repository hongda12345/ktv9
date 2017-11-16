<?php
/**
 * Created by PhpStorm.
 * User: 宏达
 * Date: 2017/11/8
 * Time: 14:56
 */
class router{
    static  function run(){
        if(!isset($_SERVER['PATH_INFO'])||$_SERVER['PATH_INFO']=='/'){
            $model='login';
            $fn='index';
        }else{
            $pathinfo=explode('/',substr($_SERVER['PATH_INFO'],1));
            $model=$pathinfo[0];//对应的模块
            $fn=isset($pathinfo[1])?$pathinfo[1]:'index';//对应的方法
        }
        //$model  $fn
        if(file_exists("App/{$model}.php")){
            include 'App/'.$model.'.php';
            if(class_exists($model)){
                $page=new $model();
                if(method_exists($page,$fn)){
                    $page->$fn();
                }else{
                    include 'App/views/404.html';
                }
            }else{
                include 'App/views/404.html';
            }
        }else{
            include 'App/views/404.html';
        }
    }
}

