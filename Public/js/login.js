$(function(){
    let user=$('#user');
    let pass=$('#pass');
    let sub=$(':submit');
/*    let form=$('form');*/
    sub.on('click',function(){
        let data={user:user.val(),pass:pass.val()};
/*        let data=form.serializeArray();//格式化表单数据
        let obj={};
        $.each(data,function(i,v){
            obj[v.name]=v.value;
        })*/
        // console.log(data);
        // console.log(form.serialize());//格式化表单数据
        $.ajax({
            url:'/php/ktv/index.php/login/check',
            data:data,
            success:function(data){
                if(data=='ok'){
                    location.href='/php/ktv/index.php/gamemanage';
                }else if(data=='error'){
                    alert('fail');
                }
            }
        })
        return false;
    })
})