document.getElementById('addNumber').addEventListener('click', addNumber);
document.getElementById('startSort').addEventListener('click', startSort);

const arrayContainer = document.getElementById('arrayContainer');
let numbers = [];

function addNumber() {
    const input = document.getElementById('numberInput');
    const value = parseInt(input.value);
    if (!isNaN(value)) {
        numbers.push(value);
        input.value = '';
        displayArray();
    }
}

function displayArray() {
    arrayContainer.innerHTML = '';
    numbers.forEach(number => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${number * 3}px`;
        bar.style.width = '30px';
        arrayContainer.appendChild(bar);
    });
}

function startSort() {
    const algorithm = document.getElementById('algorithmSelect').value;
    switch (algorithm) {
        case 'bubble':
            bubbleSort(numbers);
            break;
        case 'selection':
            selectionSort(numbers);
            break;
        case 'insertion':
            insertionSort(numbers);
            break;
        case 'merge':
            mergeSort(numbers);
            break;
        case 'quick':
            quickSort(numbers);
            break;
        default:
            break;
    }
}

async function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                await new Promise(resolve => setTimeout(resolve, 100));
                displayArray();
            }
        }
    }
}

function selectionSort(arr) {
    // Implement selection sort visualization here.
}

function insertionSort(arr) {
    // Implement insertion sort visualization here.
}

function mergeSort(arr) {
    // Implement merge sort visualization here.
}

function quickSort(arr) {
    // Implement quick sort visualization here.
}
