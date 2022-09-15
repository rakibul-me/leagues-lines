/*!
    * Start Bootstrap - SB Admin v7.0.2 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2021 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 



function toggleAdminPanel(load){
    if(load === true){
        if (localStorage.getItem('sb|sidebar') === 'yes') {
            document.body.classList.remove('sb-sidenav-toggled');
        }else{
            document.body.classList.add('sb-sidenav-toggled');
        }
    }else{
        if (localStorage.getItem('sb|sidebar') === 'yes') {
            localStorage.setItem('sb|sidebar','no');
            document.body.classList.add('sb-sidenav-toggled');
        }else{
            localStorage.setItem('sb|sidebar','yes');
            document.body.classList.remove('sb-sidenav-toggled');
        }
    }
}



// !!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!
//  MESSAGE BAR 
// !!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!

function toggleMessages(load){
    if(load === true){
        if (localStorage.getItem('ms|sidebar') === 'yes') {
            document.body.classList.remove('ms-sidenav-toggled');
            toggleBetsOff()
        }else{
            document.body.classList.add('ms-sidenav-toggled');
        }
    }else{
        if (localStorage.getItem('ms|sidebar') === 'yes') {
            localStorage.setItem('ms|sidebar','no');
            document.body.classList.add('ms-sidenav-toggled');
        }else{
            localStorage.setItem('ms|sidebar','yes');
            document.body.classList.remove('ms-sidenav-toggled');
            toggleBetsOff()
        }
    }
}
function toggleMessagesOn(){
    localStorage.setItem('ms|sidebar','yes');
    document.body.classList.remove('ms-sidenav-toggled');
}
function toggleMessagesOff(){
    localStorage.setItem('ms|sidebar','no');
    document.body.classList.add('ms-sidenav-toggled');
}



// !!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!
//  BET BAR 
// !!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!

function toggleBets(load){
    if(load === true){
        if (localStorage.getItem('bt|sidebar') === 'yes') {
            document.body.classList.remove('bt-sidenav-toggled');
        }else{
            document.body.classList.add('bt-sidenav-toggled');
        }
    }else{
        if (localStorage.getItem('bt|sidebar') === 'yes') {
            localStorage.setItem('bt|sidebar','no');
            document.body.classList.add('bt-sidenav-toggled');
        }else{
            localStorage.setItem('bt|sidebar','yes');
            document.body.classList.remove('bt-sidenav-toggled');
        }
    }
}
function toggleBetsOn(){
    localStorage.setItem('bt|sidebar','yes');
    document.body.classList.remove('bt-sidenav-toggled');
}
function toggleBetsOff(){
    localStorage.setItem('bt|sidebar','no');
    document.body.classList.add('bt-sidenav-toggled');
}