const init = () => {
    
    const openHeader = () => {
        const container = document.querySelectorAll(".o-container");
        const headerList = document.querySelectorAll(".g-header__list");
        
        for (let header of headerList) header.classList.add("active");
        
        for (let cont of container) cont.classList.add("active");

        offer();
        balearia();
        route();
        destiny();
        language();
    }
    
    const closeHeader = () => {
        const container = document.querySelectorAll(".o-container");
        const headerList = document.querySelectorAll(".g-header__list");
        for (let header of headerList) header.classList.remove("active");
        for (let cont of container) cont.classList.remove("active");

        const offer = document.querySelector("#offer").querySelector(".g-header__submenu");
        offer.classList.remove("active");
        const offerMenu = offer.querySelector(".o-container").querySelector(".g-header__sub-content");
        offerMenu.classList.remove("active");
    
        const balearia = document.querySelector("#balearia").querySelector(".g-header__submenu");
        balearia.classList.remove("active");
        const baleariaMenu = balearia.querySelector(".o-container").querySelector(".g-header__sub-content");
        baleariaMenu.classList.remove("active");
    
        const route = document.querySelector("#route").querySelector(".g-header__submenu");
        route.classList.remove("active");
        const routeMenu = route.querySelector(".o-container").querySelector(".g-header__sub-content");
        routeMenu.classList.remove("active");
    
        const destiny = document.querySelector("#destiny").querySelector(".g-header__submenu");
        destiny.classList.remove("active");
    
        const language = document.querySelector("#language").querySelector(".g-header__submenu");
        language.classList.remove("active");    
    
    }
    
    const offer = (active = false) => {
        const offer = document.querySelector("#offer");
        const offerSubMenu = offer.querySelector(".g-header__submenu");
                
        offer.querySelector(".g-header__item-link").addEventListener('click', function (event) {
            offerSubMenu.classList.add("active");
        });
        
        const back = offerSubMenu.querySelector(".o-container").querySelector(".back");
        back.addEventListener('click', function (event) {
            offerSubMenu.classList.remove("active");
        });
    
        const menusub = offerSubMenu.querySelector(".o-container").querySelector(".g-header__sublist").querySelectorAll(".g-header__subitem");
        const headerSubMenuContent = offerSubMenu.querySelector(".o-container").querySelector(".g-header__sub-content");
            
        for (let subitem of menusub) {
            subitem.addEventListener('click', function (event) {
                if(subitem.classList.contains("active")){
                    headerSubMenuContent.classList.remove("active");
                } else {
                    headerSubMenuContent.classList.add("active");
                }
            });
                
        }
    
        const back_offer = headerSubMenuContent.querySelector(".g-header__sub-header").querySelector(".back-two");
        back_offer.addEventListener('click', function (event) {
            headerSubMenuContent.classList.remove("active");
        });
    
        
    }
    
    
    const balearia = () => {
        const offer = document.querySelector("#balearia");
        const offerSubMenu = offer.querySelector(".g-header__submenu");
                
        offer.querySelector(".g-header__item-link").addEventListener('click', function (event) {
            offerSubMenu.classList.add("active");
        });
    
        const back = offerSubMenu.querySelector(".o-container").querySelector(".back");
        back.addEventListener('click', function (event) {
            offerSubMenu.classList.remove("active");
        });
    
        const menusub = offerSubMenu.querySelector(".o-container").querySelector(".g-header__sublist").querySelectorAll(".g-header__subitem");
        const headerSubMenuContent = offerSubMenu.querySelector(".o-container").querySelector(".g-header__sub-content");
            
        for (let subitem of menusub) {
            subitem.addEventListener('click', function (event) {
                if(subitem.classList.contains("active")) {
                    headerSubMenuContent.classList.remove("active");
                } else {
                    
                    const experience = headerSubMenuContent.querySelector(".no-padding-mobile").querySelector(".o-row").querySelector("#experience");
                    const info = headerSubMenuContent.querySelector(".no-padding-mobile").querySelector(".o-row").querySelector("#info");
                    const travel = headerSubMenuContent.querySelector(".no-padding-mobile").querySelector(".o-row").querySelector("#travel");
                    if(subitem.classList.contains("experience")){
                        headerSubMenuContent.classList.add("active");
                        experience.style.display = "block";
                        info.style.display = "none";
                        travel.style.display = "none";
                    } else if(subitem.classList.contains("info")){
                        headerSubMenuContent.classList.add("active");
                        experience.style.display = "none";
                        info.style.display = "block";
                        travel.style.display = "none";
                    } else if(subitem.classList.contains("travel")){
                        headerSubMenuContent.classList.add("active");
                        experience.style.display = "none";
                        info.style.display = "none";
                        travel.style.display = "block";
                    } else {
                        experience.style.display = "none";
                        info.style.display = "none";
                        travel.style.display = "none";
                    }
                }
                
            });
            
            
        }
        const back_offer = headerSubMenuContent.querySelector(".o-container").querySelector(".o-row").querySelectorAll(".back-two");
        for (let subitem of back_offer) {
            subitem.addEventListener('click', function (event) {
                headerSubMenuContent.classList.remove("active");
            });
        }
        
        
    }
    
    
    const route = () => {
        const offer = document.querySelector("#route");
        const offerSubMenu = offer.querySelector(".g-header__submenu");
                
        offer.querySelector(".g-header__item-link").addEventListener('click', function (event) {
            offerSubMenu.classList.add("active");
        });
    
        const back = offerSubMenu.querySelector(".o-container").querySelector(".back");
        back.addEventListener('click', function (event) {
            offerSubMenu.classList.remove("active");
        });
    
        const menusub = offerSubMenu.querySelector(".o-container").querySelector(".g-header__sublist").querySelectorAll(".g-header__subitem");
        const headerSubMenuContent = offerSubMenu.querySelector(".o-container").querySelector(".g-header__sub-content");
        
        for (let subitem of menusub) {
            subitem.addEventListener('click', function (event) {
                if(subitem.classList.contains("active")){
                    headerSubMenuContent.classList.remove("active");
                } else {
                    headerSubMenuContent.classList.add("active");
                }
                
            });
        }
    
        const dropdown__box = headerSubMenuContent.querySelector(".o-container").querySelector("#list-route").querySelectorAll(".dropdown__box")
        for (let subitem of dropdown__box) {
            subitem.querySelector(".g-header__title-small").addEventListener('click', function (event) {
                const dropdown__content = subitem.querySelector(".dropdown__content");
                if(dropdown__content.classList.contains("active")){
                    dropdown__content.classList.remove("active");
                } else {
                    dropdown__content.classList.add("active");
                }
                
            });
        }
    
        const dropdown__box_two = headerSubMenuContent.querySelector(".o-container").querySelector("#list-route-two").querySelectorAll(".dropdown__box")
        for (let subitem of dropdown__box_two) {
            subitem.querySelector(".g-header__title-small").addEventListener('click', function (event) {
                const dropdown__content = subitem.querySelector(".dropdown__content");
                if(dropdown__content.classList.contains("active")){
                    dropdown__content.classList.remove("active");
                } else {
                    dropdown__content.classList.add("active");
                }
                
            });
        }
    
        const back_offer = headerSubMenuContent.querySelector(".back-two");
        back_offer.addEventListener('click', function (event) {
            headerSubMenuContent.classList.remove("active");
        });
    }
    
    const destiny = () => {
        const offer = document.querySelector("#destiny");
        const offerSubMenu = offer.querySelector(".g-header__submenu");
                
        offer.querySelector(".g-header__item-link").addEventListener('click', function (event) {
            offerSubMenu.classList.add("active");
        });
    
        const back = offerSubMenu.querySelector(".back");
        back.addEventListener('click', function (event) {
            offerSubMenu.classList.remove("active");
        });
    
        const menusub = offerSubMenu.querySelector(".g-header__sublist").querySelectorAll(".g-header__subitem");
        const headerSubMenuContent = offerSubMenu.querySelector(".g-header__sub-content");
            
        for (let subitem of menusub) {
            subitem.addEventListener('click', function (event) {
                if(subitem.classList.contains("active")){
                    headerSubMenuContent.classList.remove("active");
                } else {
                    const islas = headerSubMenuContent.querySelector(".no-padding-mobile").querySelector(".o-row").querySelector("#islas");
                    const peninsula = headerSubMenuContent.querySelector(".no-padding-mobile").querySelector(".o-row").querySelector("#peninsula");
                    const canarias = headerSubMenuContent.querySelector(".no-padding-mobile").querySelector(".o-row").querySelector("#canarias");
                    const africa = headerSubMenuContent.querySelector(".no-padding-mobile").querySelector(".o-row").querySelector("#africa");
                    if(subitem.classList.contains("islas")){
                        headerSubMenuContent.classList.add("active");
                        peninsula.style.display = "none";
                        islas.style.display = "block";
                        canarias.style.display = "none";
                        africa.style.display = "none";
                    } else if(subitem.classList.contains("peninsula")){
                        headerSubMenuContent.classList.add("active");
                        peninsula.style.display = "block";
                        islas.style.display = "none";
                        canarias.style.display = "none";
                        africa.style.display = "none";
                    } else if(subitem.classList.contains("canarias")){
                        headerSubMenuContent.classList.add("active");
                        peninsula.style.display = "none";
                        islas.style.display = "none";
                        canarias.style.display = "block";
                        africa.style.display = "none";
                    } else if(subitem.classList.contains("africa")){
                        headerSubMenuContent.classList.add("active");
                        peninsula.style.display = "none";
                        islas.style.display = "none";
                        canarias.style.display = "none";
                        africa.style.display = "block";
                    } else {
                        peninsula.style.display = "none";
                        islas.style.display = "none";
                        canarias.style.display = "none";
                        africa.style.display = "none";
                    }
                }
            });
                
        }
    
        const back_offer = headerSubMenuContent.querySelectorAll(".back-two");
        for (let subitem of back_offer) {
            subitem.addEventListener('click', function (event) {
                headerSubMenuContent.classList.remove("active");
            });
        }
    
    }
    
    
    const language = () => {
        
        const offer = document.querySelector("#language");
        const offerSubMenu = offer.querySelector(".g-header__submenu");
                
        offer.querySelector(".g-header__item-link").addEventListener('click', function (event) {
            offerSubMenu.classList.add("active");
        });
    
        const back = offerSubMenu.querySelector(".back");
        back.addEventListener('click', function (event) {
            offerSubMenu.classList.remove("active");
        });

        
    
    }


    const open = document.querySelectorAll('#open_header');
    open.forEach( e => e.addEventListener('click', openHeader, false));


    const close = document.querySelectorAll('#close_header');
    close.forEach( e => e.addEventListener('click', closeHeader, false));

}
  
export default init
