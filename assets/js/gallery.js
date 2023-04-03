// first of all, we need to keep count of the no: of images we are having and store 
// all of them into an array..
let galleryImages = document.querySelectorAll(".gallery-img");// It means we want to select 
// all the items which has a class 'gallery-img' assigned to it!!!!

let getLatestOpenedImg;
let windowWidth = window.innerWidth;

// check if there exists an image on the website..
if(galleryImages){

   galleryImages.forEach(function(image, index){
        image.onclick = function( ){
            // we want to get the enlarged image once the user clicks on the thumbnail..
            // This will require the identity of the image such as it's name, type so, how can 
            // we get it????

            let getElementCss = window.getComputedStyle(image);
            let getFullImgUrl = getElementCss.getPropertyValue("background-image");
            // I don't need the exact URL, I just need the later part of it so, I need 
            // to trim it!!!

            let getImgUrlPos = getFullImgUrl.split("/img/thumbs/");
            // still , we get something like img1.jpg")
            // we don't need ") so, just replace it with ' ' , to get img1.jpg
            
            let setNewImgUrl = getImgUrlPos[1].replace('")', ' ');
            
            // We also want to store the last image that we just clicked, as we will be 
            // using it later on!

            getLatestOpenedImg = index + 1;// As the indices in javascript are 0-based , we want to 
            // interpret them 1-based..

            let container = document.body;// when u click , u get a pop-up window, I want to 
            // create it on the body of the page..
            let newImgWindow = document.createElement("div");

            // we need to attach this container with the body of the page
            container.appendChild(newImgWindow);

            // Since , we want an enlarged image on clicking , we will have to set some 
            // attributes to the "div" created.

            newImgWindow.setAttribute("class", "img-window");
            // Also, clicking on the enlarged image should come to normal , when clicked again..
            newImgWindow.setAttribute("onclick", "closeImg( )");

            let newImg = document.createElement("img");
            newImgWindow.appendChild(newImg);
            newImg.setAttribute("src", "img/" + setNewImgUrl);
            newImg.setAttribute("id", "current-img");// Let's provide some id to the newImg
            // thus obtained!!!


            // We can play with the image only after it has got loaded so, let's put all 
            // the possible events inside the function below...

            newImg.onload = function( ){
                // 'this' holds the reference to the current object..
                // we want to place the buttons as per the size of the image so that , 
                // a button doesn't lie on the image...

                let imgWidth = this.width;
                let calcImgToEdge = ((windowWidth - imgWidth)/2) - 80;// doing some 
                // calculation to set the position of the image..


            // Let's now create next button..

            let newNextBtn = document.createElement("a");// create anchor tag..
            let btnNextText = document.createTextNode("Next");// put some plain text on the button
            newNextBtn.appendChild(btnNextText);// We want "Next" to take us back to next image.
            container.appendChild(newNextBtn);
            newNextBtn.setAttribute("class" , "img-btn-next");
            // passing 1 means going forward...
            newNextBtn.setAttribute("onclick" , "changeImg(1)");
            newNextBtn.style.cssText = "right: " + calcImgToEdge + "px;";

            // Let's now create previous button...

            let newPrevBtn = document.createElement("a");// create anchor tag..
            let btnPrevText = document.createTextNode("Prev");// put some plain text on the button
            newPrevBtn.appendChild(btnPrevText);// We want "Prev" to take us back to previous image.
            container.appendChild(newPrevBtn);
            newPrevBtn.setAttribute("class" , "img-btn-prev");
            // passing 0 means going backward...
            newPrevBtn.setAttribute("onclick" , "changeImg(0)");
            newPrevBtn.style.cssText = "left: " + calcImgToEdge + "px;";

            }


        }

   });

}

// function to close the enlarged window by clicking over it again..

function closeImg( ){

    // grab the element by its class and remove it!!
    document.querySelector(".img-window").remove( );

    // We also need to remove the "next" and "prev" pop buttons..
    document.querySelector(".img-btn-next").remove( );
    document.querySelector(".img-btn-prev").remove( );

}

// function to change the image depending on "prev" or "next"...

function changeImg(changeDir){
    // first remove the current image...
    document.querySelector("#current-img").remove( );

    let getImgWindow = document.querySelector(".img-window");
    // Now , we have to insert the new image inside this!!!
    let newImg = document.createElement("img");
    getImgWindow.appendChild(newImg);

    let calcNewImg;
    if(changeDir===1){// we want the next image
        calcNewImg = getLatestOpenedImg + 1;

        if(calcNewImg > galleryImages.length){// we have reached the final image , it's time
            // to loop back to the first image...
            calcNewImg = 1;
        }

    }

    else if(changeDir===0){// we want the previous image

        calcNewImg = getLatestOpenedImg - 1;

        if(calcNewImg < 1){// we have reached the first image , it's time to loop back to 
            // the last image...
            calcNewImg = galleryImages.length;
        }

    }

    newImg.setAttribute("src", "img/img" + calcNewImg + ".jpg");

    newImg.setAttribute("id", "current-img");// set the id of the newImg as the current-img 

    getLatestOpenedImg = calcNewImg;

    newImg.onload = function( ){
       let imgWidth = this.width;
       let calcImgToEdge = ((windowWidth - imgWidth)/2) - 80;

       let nextBtn = document.querySelector(".img-btn-next");
       nextBtn.style.cssText = "right: " + calcImgToEdge + "px;";

       let prevBtn = document.querySelector(".img-btn-prev");
       prevBtn.style.cssText = "left: " + calcImgToEdge + "px;";




    }

}

