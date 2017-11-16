$(function(){
    if(!location.hash){
        location.href=location.pathname+'#list';
    }
    $(window).on('hashchange',function(){
        $('#myTab>li,.tab-pane').removeClass('active');
        $(location.hash).closest('li').addClass('active');
        $(location.hash+'-tab').addClass('active');
        if(location.hash=='#list'){
            $.ajax({
                url:'/php/ktv/index.php/gamemanage/show',
                dataType:'json',
                success:function(data){
                    render(data);
                }
            })
        }
    })
    $(window).triggerHandler('hashchange');
    let submit=$(':submit');
    submit.on('click',function(){
        let data =$('form').serialize();
        $.ajax({
            url:'/php/ktv/index.php/gamemanage/insert',
            data:data,
            success:function(data){
                if(data=='ok'){
                    location.href=location.pathname+'#list';
                }else if(data=='error'){
                    alert('fail');
                }
            }
        })
    })
    let tbody=$('tbody');
    tbody.on('click','#btn',function(){
        // console.log(this);
        let tr=$(this).closest('tr');
        let ids=tr.attr('id');
        $.ajax({
            url:'/php/ktv/index.php/gamemanage/delete',
            data:{id:ids},
            success:function(data){
                console.log(data);
                if(data=='ok'){
                    tr.remove();
                }else if(data=='error'){
                    alert('fail');
                }
            }
        })
    })
    tbody.on('blur','input',function(){
        let value=$(this).val();
        let type=$(this).closest('td').attr('type');
        let ids=$(this).closest('tr').attr('id');
        $.ajax({
            url:'/php/ktv/index.php/gamemanage/update',
            data:{id:ids,type,value},
            success:function(data){
                if(data=='ok'){
                    tr.remove();
                }else if(data=='error'){
                    alert('fail');
                }
            }
        })
    })
    function render(data){
        tbody.empty();
        let str=``;
        data.forEach(v=>{
            str+=`
            <tr id="${v['gid']}">
                <td>
                    ${v['gid']}
                </td>
                <td type="gname">
                    <input type="text" value="${v['gname']}">
                </td>
                <td type="type">
                    <input type="text" value="${v['type']}">
                </td>
                <td>
                    <button type="submit" class="btn btn-danger" id="btn">删除</button>
                </td>
           </tr>
            `;
        })
        tbody.html(str);
    }
})