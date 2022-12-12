document.addEventListener("DOMContentLoaded", function() {
    //Nav Menu
    const sidemenu = document.querySelector(".side-menu");
    M.Sidenav.init(sidemenu, { edge: "right" });

    //User account
    const useraccount = document.querySelector(".user-account");
    M.Sidenav.init(useraccount, { edge: "left" });

})