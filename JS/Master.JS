let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let Submit = document.getElementById('Submit');
let mood = 'create';
let tem ;


//get total 
function gettotal() 
{
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - (+discount.value) ; 
        total.innerHTML = result ; 
        total.style.background =  '#610269' ;
    }else{
        total.innerHTML = ' ' ;
        total.style.background = ' rgb(194, 244, 14)'
    }
}

//creat product
let dataProduct ;
if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product);
}else{
    dataProduct = [] ;
}

Submit.onclick = function () {
    let newProduct = {
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
}
if (title.value != '' && category.value != '' && newProduct.count < 100) {
    if (mood === 'create') 
{
    if (newProduct.count>0) {
        for (let i = 0; i < newProduct.count; i++) {
            dataProduct.push(newProduct);
        }
    }else{
        dataProduct.push(newProduct);
    }
}else{
    dataProduct[  tem   ] = newProduct;
    mood = 'create';
    Submit.innerHTML = 'create';
    count.style.display = 'block';
}
    clearData()
}




//save local storage
localStorage.setItem('product',          JSON.stringify(dataProduct)         )
clearData()
readData()
}

//clear inputs
function clearData(){
    title.value = ''; 
    price.value = ''; 
    taxes.value = ''; 
    ads.value = ''; 
    discount.value = ''; 
    total.innerHTML = ''; 
    count.value = '';
    category.value = '';
}

//read
function readData() {
    gettotal()
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        table += 
        `<tr>
            <td>${i+1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updataData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`
        
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDeleteAll = document.getElementById('deleteAll');
    if (dataProduct.length > 0) {
        btnDeleteAll.innerHTML = `
        <button onclick="deleteAll()">delete All(${dataProduct.length})</button>
        `
    }else{
        btnDeleteAll.innerHTML = '';
    }
}
readData()

//delete
function deleteData(i) 
{
    dataProduct.splice(i,1);
    localStorage.product = JSON.stringify(dataProduct);
    readData()
}
function deleteAll() {
    localStorage.clear()
    dataProduct.splice(0)
    readData()
}
//count
//updata

function updataData(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount; 
    gettotal()
    count.style.display = 'none';
    category.value = dataProduct[i].category; 
    Submit.innerHTML = 'Update'
    mood = 'update';
    tem = i ; 
    scroll ({
        top : 0 , 
        behavior : "smooth", 
    })
}

//search
let searchMood = 'title';
function getsearchMood(id) 
{
    let search = document.getElementById('search');
   if (id == 'searchtitle') 
   {
    searchMood = 'title'
   }else{
    searchMood = 'ctegory'
   }
   search.placeholder = 'Search By ' + searchMood ;
   search.focus()
   search.value = '' ;
   readData()
}

function searchData(value) 
{
    if (searchMood == 'title') 
    {
        let table = '';
for (let i = 0; i < dataProduct.length; i++) {
    if (dataProduct[i].title.includes(value)) {
        table += 
        `<tr>
            <td>${i}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updataData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`;
        readData()
    }
    document.getElementById('tbody').innerHTML = table;
}
    }else{
        let table = '';
        for (let i = 0; i < dataProduct.length; i++) {
            if(dataProduct[i].category.includes(value)) {
                table += 
                `<tr>
                    <td>${i}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick="updataData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`;
                readData()
            }
            document.getElementById('tbody').innerHTML = table;
        } 
    } 
    
}

//clean data 