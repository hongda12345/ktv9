
<?php
/**
 * Created by PhpStorm.
 * User: 宏达
 * Date: 2017/11/8
 * Time: 14:53
 */
class shop{
    public $db;
    function __construct(){
        $obj=new db();
        $this->db=$obj->mysql;//获取数据
    }
    function index(){
        include 'App/views/shop.html';
    }
    function query(){
        $sql="select * from shop";
        $result=$this->db->query($sql);
        $data=[];
        while($row=$result->fetch_assoc()){
            array_push($data,$row);
        }
        echo json_encode($data);
    }
    function shopSure(){
        include'App/views/shopSure.html';
    }
    function submit(){
        $order=$_GET['name'];
        $orderObj=json_decode($order);
        $sql="insert into orders (user,status) values ('hongda',0)";
        $this->db->autocommit(false);
        $this->db->query($sql);
        $oid=$this->db->insert_id;
        $str='';
        for($i=0;$i<count($orderObj);$i++){
            $str.='(';
            foreach ($orderObj[$i] as $v){
                $str.=$v.',';
            }
//            $str=substr($str,0,-1);
            $str.=$oid.'),';
        }
        $str=substr($str,0,-1);
        $sql="insert into orderextra (`sid`,`count`,`total`,`oid`) values" .$str;
        $this->db->query($sql);
        if($this->db->affected_rows){
            $this->db->commit();
            echo 'ok';
            exit();
        }else{
            $this->db->rollback();
            echo 'error';
        }
        $this->db->autocommit(true);
    }
}