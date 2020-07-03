const reqOptions = {
    method: `POST`,
    redirect: `follow`,
    headers: {'Content-Type': 'application/json'}
};

function setUpPage(){
    document.querySelector(`footer span#year`).textContent = new Date().getFullYear();

    const burgerIcon = document.querySelector(`header #burger`),
        closeMenu = document.querySelector(`#overlay .close img`),
        overlayMenu = document.querySelector(`#overlay`);
    toggleModal([overlayMenu], [burgerIcon, closeMenu]);


    setupImageLazyLoading();
}


function setupImageLazyLoading(){
    const lazyloadImages = document.querySelectorAll("img.lazy");
    if ("IntersectionObserver" in window){
        let imageObserver = new IntersectionObserver(function(entries, observer){
            entries.forEach(function(entry){
                if(entry.isIntersecting){
                    let image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove("lazy");
                    imageObserver.unobserve(image);
                }
            });
        });
  
        lazyloadImages.forEach(function(image){
            imageObserver.observe(image);
        });
    }
    else{
        let lazyloadThrottleTimeout;
      
        function lazyload(){
            if(lazyloadThrottleTimeout){
                clearTimeout(lazyloadThrottleTimeout);
            }    
  
            lazyloadThrottleTimeout = setTimeout(function(){
                let scrollTop = window.pageYOffset;
                lazyloadImages.forEach(function(img){
                    if(img.offsetTop < (window.innerHeight + scrollTop)){
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                    }
                });
                if(lazyloadImages.length == 0){ 
                    document.removeEventListener("scroll", lazyload);
                    window.removeEventListener("resize", lazyload);
                    window.removeEventListener("orientationChange", lazyload);
                }
            }, 20);
        }
  
        document.addEventListener("scroll", lazyload);
        window.addEventListener("resize", lazyload);
        window.addEventListener("orientationChange", lazyload);
    }
}

function toggleModal(modalsArr, elemsArr, callback = null){
    elemsArr.forEach((elem) => {
        if(elem){
            elem.addEventListener(`click`, (e) => {
                modalsArr.forEach((modal) => {
                    modal.classList.toggle(`open`);
                });
                
                if(callback){
                    callback();
                }
            });
        }
    });
}

function getFormData(elements){
    const elements = Array.from(elements),
        formData = {};
    elements.map(el => (formData[el.name] = el.value));
    return formData;
}


export { setUpPage, toggleModal, reqOptions, getFormData }