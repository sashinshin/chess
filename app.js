//

const squares = [...document.querySelectorAll('.square')];
console.log(squares);
squares.forEach(square => {
    const id = document.createElement('span');
    id.textContent = square.id;
    console.log(square.id);
    square.appendChild(id);
})