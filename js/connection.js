var box1 = document.querySelector('.box1');
var box2 = document.querySelector('.box2');
var connection = document.querySelector('.connection');


box1.addEventListener('click', () => {
    box1.classList.toggle('click');
    if(box1.classList.contains('click') && box2.classList.contains('click')) {
        connection.classList.add('show');
    }
    else
    {
        connection.classList.remove('show');
    }
});

box2.addEventListener('click', () => {
    box2.classList.toggle('click');
    if(box1.classList.contains('click') && box2.classList.contains('click')) {
        connection.classList.add('show');
    }
    else
    {
        connection.classList.remove('show');
    }
});

