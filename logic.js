let canvas = document.getElementById('canvas');
//Переменные настройки фигуры
let shapes = [],
    strokeWidth = 1,
    strokeColor = [0, 0, 0],
    strokeDasharray = '',
    figure = 'Rectangle';

//Определение координат мыши
var mouseX, mouseY;
canvas.addEventListener('mousemove', (e) => {
    mouseX = e.pageX - canvas.getBoundingClientRect().left;
    mouseY = e.pageY - canvas.getBoundingClientRect().top;
});

for (let link of document.getElementsByClassName('shapeLink')){
    link.onclick = shapeChange;
}

function shapeChange(e){
    figure = e.target.innerHTML;
    console.log(figure);
}

//Конструктор фигуры
function Shape(figure, outlineThick, outlineColor, outlineLine, x, y) {
    this.clickCoords = [x, y]
    this.figure = figure;
    
    this.tag = document.createElement('svg');
    this.position = 'absolute';
    this.left = mouseX;
    this.top = mouseY;

    this.width = 1;
    this.height = 1;
    this.updateStyle = () => {
        this.tag.style = 'top:' + this.top + 'px;' + 'left:' + this.left + 'px;' + 'position: ' + this.position + ';' + 'width:' + this.width + 'px;' + 'height:' + this.height + 'px;';
        this.tag.id = shapes.length - 1
    };
}
//Объект подписи размеров фигуры
var shapeParams = {
    tag: document.createElement('p'),
    position: 'absolute',
    color: '#ccc',
    fSize: 12,
    updateStyle: function () {
        this.tag.style = 'top:' + (mouseY - 5) + 'px;' + 'left:' + (mouseX + 5) + 'px;' + 'position: ' + this.position + ';' + 'font-size:' + this.fSize + 'px;' + 'color:' + this.color + ';';
        this.tag.id = 'elementParams';
    }
}

//canvas.addEventListener('mousedown', ()=>console.log(mouseX + ' ' + mouseY));
//Определение нажата ли кнопка мыши
let mousePressed = false;


function mousedown() {
    if (!mousePressed) { //Prevent multimple loops!
        buttonPressed = true;
        let element = new Shape(mouseX, mouseY);
        element.updateStyle();
        shapes.push(element);

        shapeParams.updateStyle();
        shapeParams.tag.innerText = element.width + 'x' + element.height;

        canvas.appendChild(shapeParams.tag);
        canvas.appendChild(element.tag);

        mousePressed = setInterval(whilemousedown, 50);
        shapes.pop();

        function whilemousedown() {
            shapeParams.tag.parentNode.removeChild(shapeParams.tag);
            element.tag.parentNode.removeChild(element.tag);

            if (mouseX >= element.clickCoords[0]) {
                element.width = mouseX - element.left;
            } else {
                element.left = mouseX;
                element.width = element.clickCoords[0] - mouseX;
            }
            if (mouseY > element.clickCoords[1]) {
                element.height = mouseY - element.top;
            } else {
                element.top = mouseY;
                element.height = element.clickCoords[1] - mouseY;

            }

            shapeParams.updateStyle();
            shapeParams.tag.innerText = element.width + 'x' + element.height;

            element.updateStyle();
            shapes.push(element);

            canvas.appendChild(shapeParams.tag);
            canvas.appendChild(element.tag);

        }

    }

}



function mouseup(event) {
    if (mousePressed) { //Only stop if exists
        clearInterval(mousePressed);
        mousePressed = false;        document.getElementById('elementParams').parentNode.removeChild(document.getElementById('elementParams'));
    }
}


function save() {
    var htmlContent = pageTagStart + canvas.innerHTML + pageTagEnd;
    var bl = new Blob([htmlContent], {
        type: "text/html"
    });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(bl);
    a.download = "scheme.html";
    a.hidden = true;
    document.body.appendChild(a);
    a.innerHTML = "something random - nobody will see this, it doesn't matter what you put here";
    a.click();
}

canvas.addEventListener("mousedown", mousedown);
canvas.addEventListener("mouseup", mouseup);
canvas.addEventListener("mousewheel", save);

//Also clear the interval when user leaves the window with mouse
//canvas.addEventListener("mouseout", mouseup);

// TODO:
// 1. Перемещение в отрицательную сторону   +
// 1.1 Сделать фигуру объектом              +
// 1.2 Сделать подпись о размере фигуры     +
// 1.3 Заменить основной тег на svg
// 2. Кнопка параметров границ фигуры
// 3. Кнопка формы
// 4. Текст
// 5. Выделение фигур
// 6. Загрузить файл
