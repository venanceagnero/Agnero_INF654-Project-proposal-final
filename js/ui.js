document.addEventListener("DOMContentLoaded", function() {
    //Nav Menu
    const menus = document.querySelector(".side-menu");
    M.Sidenav.init(menus, { edge: "right" });
})