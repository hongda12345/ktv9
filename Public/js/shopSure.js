$(function(){
    let myScroll=new IScroll('.wrapper',{
        click:true
    });
    let wineList=$('.winelist>.scroll');
    let chooseList=JSON.parse(localStorage.shop);
    let totalNum=$('.totalNum');
    let totalPrice=$('.totalPrice');
    let itemTotal=$('.itemTotal');
    let shopSure=$('.shopSure');
    render(wineList,chooseList);
    myScroll=new IScroll('.winelist');
    ////////////////////////////////页面显示////////////////////////////////////////////
    function render(obj,data){
        obj.empty();
        let str='';
        for(let i=0;i<data.length;i++){
            str+=`
            <li data='${JSON.stringify(data[i])}' class="list">
                <div class="thumb">
                    <img src="${data[i]['thumb']}" alt="">
                </div>
            <ul class="data">
                <li class="title">
                    <span class="sname">${data[i]['sname']}</span>
                </li>
                <li class="description">
                    <span>${data[i]['description']}</span>
                    <span>${data[i]['capticy']}</span>
                </li>
                <li>
                    <div class="option">
                        <span class="reduce"></span>
                        <span class="count">${data[i]['num']}</span>
                        <span class="plus"></span>
                    </div>
                    <div class="price">
                        <span class="itemTotal">${(data[i]['num']*data[i]['price']).toFixed(2)}</span>
                        <div>
                            <div class="sty">
                                <span></span>
                                <span></span>
                            </div>
                            <span>RMB</span>
                        </div>
                    </div>
                </li>
            </ul>
            </li>
            `;
        }
        obj.html(str);
        totalNum.html(countTotalNum());
        totalPrice.html(countTotalPrice());
    }
    ///////////////////////////////计算总数/////////////////////////////////////////////
    function countTotalNum(){
        let num=0;
        chooseList.forEach(element=>{
            num+=element.num;
        })
        return num;
    }
    ///////////////////////////////计算总价格////////////////////////////////////////////
    function countTotalPrice(){
        let num=0;
        chooseList.forEach(element=>{
            num+=element.price*element.num;
        })
        return num.toFixed(2);
    }
    /////////////////////////////shopSure点击事件///////////////////////////////////////
    shopSure.on('click',function(){
        let newarr=[];
        chooseList.forEach(element=>{
            let obj={sid:element.sid,count:element.num,total:element.price*element.num};//简写
            newarr.push(obj);
            /*let {sid,num,price}=element;///////解构赋值
            newarr.push({sid,num,price});*/
        })
        $.ajax('/php/ktv/index.php/shop/submit',{
            data:{name:JSON.stringify(newarr)},
            method:'get',
            success:function(data){
                /*console.log(data);
                console.log(data.length);*/
                if(data.trim()=='ok'){
                    location.href='/php/ktv/App/views/index.html';
                }else{
                    alert('fail');
                }
            }
        })
        return false;
    })
    //////////////////////////////////购物车数量加////////////////////////////////////////
    $('.scroll').on('click','.plus',function(){
        let goods=JSON.parse($(this).closest('.list').attr('data'));
        let v=chooseList.filter(element=>element.sid==goods.sid);
        if(v.length){
            v[0].num++;
            $(this).prev().html(v[0].num);
        }
        console.log($(this).parent().nextAll().children().first());
        $(this).parent().nextAll().children().first('.itemTotal').html((v[0].num*v[0].price).toFixed(2));
        // $(this).siblings('.itemTotal').html((v[0].num*v[0].price).toFixed(2));
        totalNum.text(countTotalNum());
        totalPrice.text(countTotalPrice());
        localStorage.shop=JSON.stringify(chooseList);
    })
    /////////////////////////////////购物车数量减////////////////////////////////////////
    $('.scroll').on('click','.reduce',function(){
        let goods=JSON.parse($(this).closest('.list').attr('data'));
        //判断有无商品
        let v=chooseList.filter(element=>element.sid == goods.sid);
        if (v.length) {
            //有
            v[0].num--;
            console.log(!v[0].num)
            if (!v[0].num) {
                //没有,就移除
                chooseList=chooseList.filter(ele => ele.sid != goods.sid);
                console.log(chooseList)
                $(this).closest('.list').animate({marginLeft:'-100%'}).queue(function () {
                    $(this).closest('.list').remove();
                    myScroll.refresh();
                })
            }
            $(this).next().html(v[0].num);
            localStorage.shop=JSON.stringify(chooseList);
        }
        $(this).parent().nextAll().children().first('.itemTotal').html((v[0].num*v[0].price).toFixed(2));
        // $(this).siblings('.itemTotal').html((v[0].num*v[0].price).toFixed(2));
        totalNum.text(countTotalNum());
        totalPrice.text(countTotalPrice());
        myScroll.refresh();
    })
})


/*order
  oid  user  time  status(状态)

orderextra
  eid  sid  count  price  oid
   1    1     2      5     1
   2    1     3      6     2

前台
  chooseList
  sid  count  price
*/
