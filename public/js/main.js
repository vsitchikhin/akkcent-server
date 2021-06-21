"use strict";

// Slider

/*
* Массив изображений
* Массив содержит объекты, в которых хранятся id и src соответствующих изображений
*/
const sliderImages = [
    {id: 0, src: 'img/sliderImages/1.jpg'},
    {id: 1, src: 'img/sliderImages/2.jpg'},
    {id: 2, src: 'img/sliderImages/3.jpg'},
    {id: 3, src: 'img/sliderImages/4.jpg'},
    {id: 4, src: 'img/sliderImages/5.jpg'},
];

const sliderImagesLength = sliderImages.length;

// activeElement - ссылка на активное изображение слайдера
let activeElement = document.querySelector('.logopedMainPage__slider_activeElement');
let activeElementId = 0;


// переход к следующему изображению
document.getElementById('next').addEventListener('click', function(event) {
    if (activeElementId === sliderImagesLength - 1)
    {
        activeElementId = 0;
        activeElement.src = sliderImages[activeElementId].src;
    }
    else
    {
        activeElementId += 1;
        activeElement.src = sliderImages[activeElementId].src;
    }
})

// переход к предыдущему изображению
document.getElementById('previous').addEventListener('click', function(event) {
    if (activeElementId === 0)
    {
        activeElementId = sliderImagesLength - 1;
        activeElement.src = sliderImages[activeElementId].src;
    }
    else
    {
        activeElementId -= 1;
        activeElement.src = sliderImages[activeElementId].src;
    }
})



// Form

const send = document.getElementById('send');

send.onclick = async function () {
    const form = document.getElementById('betaTestForm');
    const email = form.email.value;
    const name = form.name.value;
    const dataProcessing = form.dataProcessing.checked;
    const mailing = form.mailing.checked;
    const betaTestInfo = {
        email,
        name,
        dataProcessing,
        mailing,
    }

    const betaTestInfoJSON = JSON.stringify(betaTestInfo);
    console.log(betaTestInfoJSON);
    const response = await fetch('/api/taste', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: betaTestInfoJSON,
    })
    if(response.ok) {
        console.log(await response.json());
    }


    // const request = new XMLHttpRequest();
    //
    // request.open("POST", "/api/taste", true);
    // request.setRequestHeader("Content-type", "application/json");
    //
    // request.send(betaTestInfoJSON);
}