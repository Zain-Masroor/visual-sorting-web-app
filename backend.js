// DOM Elements
const inputField = document.getElementById('inputValue');
const addButton = document.getElementById('addBtn');
const sortButton = document.getElementById('sortBtn');
const resetButton = document.getElementById('resetBtn');
const algorithmSelect = document.getElementById('algorithmSelect');
const arrayContainer = document.getElementById('arrayContainer');

// Array to store the numbers for sorting
let numbersArray = [];

// Function to add number to array
function addNumber() {
    const value = inputField.value.trim();

    // Validate that the input is a valid number
    if (isNaN(value) || value === '') {
        alert('Please enter a valid number');
        return;
    }

    // Clear the input field
    inputField.value = '';

    // Add number to the array
    numbersArray.push(parseInt(value));

    // Create a new bar element
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${value * 4}px`; // Multiply to scale the height

    // Add the number inside the bar
    const span = document.createElement('span');
    span.textContent = value;
    bar.appendChild(span);

    // Append the bar to the array container
    arrayContainer.appendChild(bar);
}

// Swap function for animations
function swapBars(bar1, bar2) {
    const tempHeight = bar1.style.height;
    const tempText = bar1.querySelector('span').textContent;

    bar1.style.height = bar2.style.height;
    bar1.querySelector('span').textContent = bar2.querySelector('span').textContent;

    bar2.style.height = tempHeight;
    bar2.querySelector('span').textContent = tempText;
}

// Bubble Sort Algorithm
async function bubbleSort() {
    let bars = document.querySelectorAll('.bar');
    for (let i = 0; i < numbersArray.length; i++) {
        for (let j = 0; j < numbersArray.length - i - 1; j++) {
            if (numbersArray[j] > numbersArray[j + 1]) {
                swapBars(bars[j], bars[j + 1]);
                [numbersArray[j], numbersArray[j + 1]] = [numbersArray[j + 1], numbersArray[j]];
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }
    }
}

// Selection Sort Algorithm
async function selectionSort() {
    let bars = document.querySelectorAll('.bar');
    for (let i = 0; i < numbersArray.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < numbersArray.length; j++) {
            if (numbersArray[j] < numbersArray[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            swapBars(bars[i], bars[minIndex]);
            [numbersArray[i], numbersArray[minIndex]] = [numbersArray[minIndex], numbersArray[i]];
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
}

// Insertion Sort Algorithm
async function insertionSort() {
    let bars = document.querySelectorAll('.bar');
    for (let i = 1; i < numbersArray.length; i++) {
        let key = numbersArray[i];
        let j = i - 1;
        while (j >= 0 && numbersArray[j] > key) {
            numbersArray[j + 1] = numbersArray[j];
            bars[j + 1].style.height = `${numbersArray[j + 1] * 4}px`;
            bars[j + 1].querySelector('span').textContent = numbersArray[j + 1];
            j = j - 1;
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        numbersArray[j + 1] = key;
        bars[j + 1].style.height = `${key * 4}px`;
        bars[j + 1].querySelector('span').textContent = key;
    }
}

// Quick Sort Algorithm (with animation)
async function quickSort(arr, low, high) {
    if (low < high) {
        let pi = await partition(arr, low, high);
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
    }
}

// Partition for Quick Sort
async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = (low - 1);
    let bars = document.querySelectorAll('.bar');

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swapBars(bars[i], bars[j]);
            [arr[i], arr[j]] = [arr[j], arr[i]];
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
    swapBars(bars[i + 1], bars[high]);
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    await new Promise(resolve => setTimeout(resolve, 100));
    return i + 1;
}

// Function to start sorting based on selected algorithm
async function sortArray() {
    if (numbersArray.length === 0) return;

    sortButton.disabled = true;
    let selectedAlgorithm = algorithmSelect.value;

    switch (selectedAlgorithm) {
        case 'bubble':
            await bubbleSort();
            break;
        case 'selection':
            await selectionSort();
            break;
        case 'insertion':
            await insertionSort();
            break;
        case 'quick':
            await quickSort(numbersArray, 0, numbersArray.length - 1);
            break;
    }

    sortButton.disabled = false;
}

// Function to reset the graph and array
function resetGraph() {
    arrayContainer.innerHTML = '';  // Clear the bars from the graph
    numbersArray = [];             // Reset the array of numbers
}

// Event listener to add number when the button is clicked
addButton.addEventListener('click', addNumber);

// Event listener to prevent non-numeric input
inputField.addEventListener('input', function (e) {
    // Only allow numeric characters, and stop input if non-numeric
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

// Event listener to sort the array when the button is clicked
sortButton.addEventListener('click', sortArray);

// Event listener to reset the graph when the button is clicked
resetButton.addEventListener('click', resetGraph);
