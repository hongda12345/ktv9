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
                url:'/php/ktv/index.php/singermanage/show',
                dataType:'json',
                success:function(data){
                    render(data);
                }
            })
        }
    })
    $(window).triggerHandler('hashchange');
    let upload=document.querySelector('#image');
    let thumb=document.querySelector('#thumb');
    let hidden=document.querySelector('input[type=hidden]');
    let imgType=['png','gif','jpeg','jpg'];
    let size=5*1024*1024;
    upload.onchange=function(){
        [...this.files].forEach((element,index)=>{
            let reader=new FileReader();
            reader.readAsDataURL(element);
            reader.onload=function(e){
                let eType=element.type.split('/')[1];
                if(!(element.size<=size&&imgType.includes(eType))){
                    alert('请检查您的文件类型和文件大小');
                    return;
                }
                let imgs=new Image();
                imgs.width=200;
                imgs.height=200;
                imgs.src=e.target.result;
                let imgBox=document.querySelector('.imgBox');
                imgBox.appendChild(imgs);
            }
            let data=new FormData();
            data.append('file',element);
            let xml=new XMLHttpRequest();
            xml.upload.onprogress=function(e){
                document.querySelectorAll('.progress-bar')[index].style.width=`${e.loaded/e.total*100}%`;
            }
            xml.onload=function(){
                hidden.value+=xml.response;
            }
            xml.open('post','/php/ktv/index.php/fenleimanage/upload',true);
            xml.send(data);
        })
        /*let data=this.files[0];
        let reader=new FileReader();
        let image=new Image();
        reader.readAsDataURL(data);
        reader.onload=function(e){
            thumb.src=e.target.result;
           /!* image.src=e.target.result;
            $('#image').parent().after(image);*!/
            // console.log(e.target.result);
            let xml=new XMLHttpRequest();
            xml.open('post','/php/ktv/index.php/shopmanage/upload',true);
            let formdata=new FormData();
            formdata.append('file',data);
            xml.send(formdata);
            xml.onload=function(){
                $(':hidden').val(xml.response);
            }
        }*/
    }
    let submit=$(':submit');
    submit.on('click',function(){
        // let data =$('form').serialize();
        let data=new FormData($('form')[0]);  /*可以发送二进制文件*/
        //data.append('user','zhangsan');
        console.log(data);
        $.ajax({
            url:'/php/ktv/index.php/singermanage/insert',
            data:data,
            method:'post',
            processData:false,
            contentType:false,
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
        let tr=$(this).closest('tr');
        let ids=tr.attr('id');
        $.ajax({
            url:'/php/ktv/index.php/singermanage/delete',
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
        /*let type=$(this).closest('td').attr('type');
        let price=$(this).closest('td').attr('price');
        let thumb=$(this).closest('td').attr('thumb');
        let description=$(this).closest('td').attr('description');
        let hot=$(this).closest('td').attr('hot');
        let capticy=$(this).closest('td').attr('capticy');*/
        let type=$(this).closest('td').attr('type');
        let ids=$(this).closest('tr').attr('id');
        $.ajax({
            url:'/php/ktv/index.php/singermanage/update',
            data:{id:ids,type:type,value:value},
            success:function(data){
                if(data=='ok'){
                    location.href=location.pathname+'#list';
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
            <tr id="${v['rid']}">
                <td>
                    ${v['rid']}
                </td>
                <td type="rname">
                    <input type="text" value="${v['rname']}" name="rname">
                </td>
                <td type="rnum">
                    <input type="text" value="${v['rnum']}" name="rnum">
                </td>
                <td type="rimg" style="width:70px;">
                    <img src="${v['rimg']}" alt=""style="width:70px;">
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