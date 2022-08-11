var size, speed;
var delay = 2500;

var heading = document.querySelector(".heading");
var algoName = document.getElementById("algo").value;
document.getElementById("sort").addEventListener("click", sort);
document.getElementById("generate").addEventListener("click", generate);

async function sort() {
    if (algoName === "") {
        alert("Please Select Algorithm First !");
    } else {
        console.log(algoName);
        if (algoName == "bubble") {
            bubbleSort();
        }
        if (algoName == "heap") {
            heapSort(20);
        }
        if (algoName == "selection") {
            SelectionSort();
        }
        if (algoName == "quick") {
            QuickSort(0, 19);
        }
    }
}

async function generate() {
  window.location.reload();
}

function sizeChange() {
    size = document.getElementById("array_sz").value;
    //searchKeyValue = document.getElementById("searchKey").value;
    init(size, speed)
    //document.getElementById("searchKey").value = searchKeyValue
}

function speedChange() {
    speed = document.getElementById("speed_input").value;
    //searchKeyValue = document.getElementById("searchKey").value;
    delay = 1500;
    delay = parseInt(delay / speed);
    init(size, delay)
    //document.getElementById("searchKey").value = searchKeyValue
}

function headerDisplay(algoName) {
    if (algoName == "bubble") {
        heading.innerHTML = "Bubble Sort"
    } else if (algoName == "heap") {
        heading.innerHTML = "Heap Sort";
        sortResetArray();
    } else if (algoName == "selection") {
        heading.innerHTML = "Selection Sort";
        sortResetArray();
    } else if (algoName == "quick") {
        heading.innerHTML = "Quick Sort";
        sortResetArray();
    }
}

function algoSelected() {
    algoName = document.getElementById("algo").value;
    headerDisplay(algoName);
}

var container = document.getElementById("array");
  
// Function to generate the array of blocks
function generatearray() {
    for (var i = 0; i < 20; i++) {
  
        // Return a value from 1 to 100 (both inclusive)
        var value = Math.ceil(Math.random() * 100);
  
        // Creating element div
        var array_ele = document.createElement("div");
  
        // Adding class 'block' to div
        array_ele.classList.add("block");
  
        // Adding style to div
        array_ele.style.height = `${value * 3}px`;
        array_ele.style.transform = `translate(${i * 30}px)`;
  
        // Creating label element for displaying 
        // size of particular block
        var array_ele_label = document.createElement("label");
        array_ele_label.classList.add("block_id");
        array_ele_label.innerText = value;
  
        // Appending created elements to index.html 
        array_ele.appendChild(array_ele_label);
        container.appendChild(array_ele);
    }
}
  
// Promise to swap two blocks
function swap(el1, el2) {
    return new Promise((resolve) => {
  
        // For exchanging styles of two blocks
        var temp = el1.style.transform;
        el1.style.transform = el2.style.transform;
        el2.style.transform = temp;
  
        window.requestAnimationFrame(function() {
  
            // For waiting for .25 sec
            setTimeout(() => {
                container.insertBefore(el2, el1);
                resolve();
            }, 250);
        });
    });
}
  
// Asynchronous BubbleSort function
async function bubbleSort(delay = 100) {
    var blocks = document.querySelectorAll(".block");
  
    // BubbleSort Algorithm
    for (var i = 0; i < blocks.length; i += 1) {
        for (var j = 0; j < blocks.length - i - 1; j += 1) {
  
            // To change background-color of the
            // blocks to be compared
            blocks[j].style.backgroundColor = "red";
            blocks[j + 1].style.backgroundColor = "yellow";
  
            // To wait for .1 sec
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );
  
            console.log("run");
            var value1 = Number(blocks[j].childNodes[0].innerHTML);
            var value2 = Number(blocks[j + 1]
                        .childNodes[0].innerHTML);
  
            // To compare value of two blocks
            if (value1 > value2) {
                await swap(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll(".block");
            }
  
            // Changing the color to the previous one
            blocks[j].style.backgroundColor = "#6b5b95";
            blocks[j + 1].style.backgroundColor = "#6b5b95";
        }
  
        //changing the color of greatest element 
        //found in the above traversal
        blocks[blocks.length - i - 1]
                .style.backgroundColor = "#13CE66";
    }
}
  
// Calling generatearray function
//generatearray();
  

// Function to generate indexes
var count_container = document.getElementById("count");
function generate_idx() {
  for (var i = 0; i < 20; i++) {
    // Creating element div
    var array_ele2 = document.createElement("div");
  
    // Adding class 'block2' to div
    array_ele2.classList.add("block2");
  
    // Adding style to div
    array_ele2.style.height = `${20}px`;
    array_ele2.style.transform = `translate(${i * 30}px)`;
  
    // Adding indexes
    var array_ele_label2 = 
    document.createElement("label");
    array_ele_label2.classList.add("block_id3");
    array_ele_label2.innerText = i;
  
    // Appending created elements to index.html
    array_ele2.appendChild(array_ele_label2);
    count_container.appendChild(array_ele2);
  }
}
  
async function lometo_partition(l, r, delay = 700) {
  var blocks = document.querySelectorAll(".block");
  
  // Storing the value of pivot element
  var pivot = Number(blocks[r].childNodes[0].innerHTML);
  var i = l - 1;
  blocks[r].style.backgroundColor = "red";
  document.getElementsByClassName("range")[0].innerText = '[${l},${r}]';
  
  for (var j = l; j <= r - 1; j++) {
    // To change background-color of the
    // blocks to be compared
    blocks[j].style.backgroundColor = "yellow";
    // To wait for 700 milliseconds
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, delay)
    );
    var value = Number(blocks[j].childNodes[0].innerHTML);
  
    // To compare value of two blocks
    if (value < pivot) {
      i++;
      var temp1 = blocks[i].style.height;
      var temp2 = blocks[i].childNodes[0].innerText;
      blocks[i].style.height = blocks[j].style.height;
      blocks[j].style.height = temp1;
      blocks[i].childNodes[0].innerText = blocks[j].childNodes[0].innerText;
      blocks[j].childNodes[0].innerText = temp2;
      blocks[i].style.backgroundColor = "orange";
      if (i != j) blocks[j].style.backgroundColor = "pink";
      //To wait for 700 milliseconds
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, delay)
      );
    } else blocks[j].style.backgroundColor = "pink";
  }
  // Swapping the ith with pivot element
  i++;
  var temp1 = blocks[i].style.height;
  var temp2 = blocks[i].childNodes[0].innerText;
  blocks[i].style.height = blocks[r].style.height;
  blocks[r].style.height = temp1;
  blocks[i].childNodes[0].innerText = blocks[r].childNodes[0].innerText;
  blocks[r].childNodes[0].innerText = temp2;
  blocks[r].style.backgroundColor = "pink";
  blocks[i].style.backgroundColor = "green";
  
  // To wait for 2100 milliseconds
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, delay * 3)
  );
  document.getElementsByClassName("range")[0].innerText = "";
  for (var k = 0; k < 20; k++) 
  blocks[k].style.backgroundColor = "#6b5b95";
  return i;
}
  
// Asynchronous QuickSort function
/*
async function QuickSort(l, r, delay = 100) {
  if (l < r) {
    // Storing the index of pivot element after partition
    var pivot_idx = await lometo_partition(l, r);
    // Recursively calling quicksort for left partition
    await QuickSort(l, pivot_idx - 1);
    // Recursively calling quicksort for right partition
    await QuickSort(pivot_idx + 1, r);
  }
}*/

async function hoare_partition(l, r, delay = 700) {
  var blocks = document.querySelectorAll(".block");
  var pivot = Number(blocks[l].childNodes[0].innerHTML);

  var i = l - 1;
  var j = r + 1;

  while (true) {
      // Find leftmost element greater than
      // or equal to pivot
      do {
          i++;
          if (i - 1 >= l) blocks[i - 1].style.backgroundColor = "red";
          blocks[i].style.backgroundColor = "yellow";
          //To wait for 700 milliseconds
          await new Promise((resolve) =>
              setTimeout(() => {
                  resolve();
              }, delay)
          );
      } while (Number(blocks[i].childNodes[0].innerHTML) < pivot);

      // Find rightmost element smaller than
      // or equal to pivot
      do {
          j--;
          if (j + 1 <= r) blocks[j + 1].style.backgroundColor = "green";
          blocks[j].style.backgroundColor = "yellow";
          //To wait for 700 milliseconds
          await new Promise((resolve) =>
              setTimeout(() => {
                  resolve();
              }, delay)
          );
      } while (Number(blocks[j].childNodes[0].innerHTML) > pivot);

      // If two pointers met.
      if (i >= j) {
          for (var k = 0; k < 20; k++) blocks[k].style.backgroundColor = "#6b5b95";
          return j;
      }

      //swapping ith and jth element
      var temp1 = blocks[i].style.height;
      var temp2 = blocks[i].childNodes[0].innerText;
      blocks[i].style.height = blocks[j].style.height;
      blocks[j].style.height = temp1;
      blocks[i].childNodes[0].innerText = blocks[j].childNodes[0].innerText;
      blocks[j].childNodes[0].innerText = temp2;
      //To wait for 700 milliseconds
      await new Promise((resolve) =>
          setTimeout(() => {
              resolve();
          }, delay)
      );
  }
}

// Asynchronous QuickSort function
async function QuickSort(l, r, delay = 100) {
  // QuickSort Algorithm
  if (l < r) {
      //Storing the index of pivot element after partition
      var pivot_idx = await hoare_partition(l, r);
      //Recursively calling quicksort for left partition
      await QuickSort(l, pivot_idx);
      //Recursively calling quicksort for right partition
      await QuickSort(pivot_idx + 1, r);
  }
}
  

// Asynchronous Heapify function
async function Heapify(n, i) {
    var blocks = document.querySelectorAll(".block");
    var largest = i; // Initialize largest as root
    var l = 2 * i + 1; // left = 2*i + 1
    var r = 2 * i + 2; // right = 2*i + 2
    
    // If left child is larger than root
    if (
      l < n &&
      Number(blocks[l].childNodes[0].innerHTML) >
        Number(blocks[largest].childNodes[0].innerHTML)
    )
      largest = l;
    
    // If right child is larger than largest so far
    if (
      r < n &&
      Number(blocks[r].childNodes[0].innerHTML) >
        Number(blocks[largest].childNodes[0].innerHTML)
    )
      largest = r;
    
    // If largest is not root
    if (largest != i) {
      var temp1 = blocks[i].style.height;
      var temp2 = blocks[i].childNodes[0].innerText;
      blocks[i].style.height = blocks[largest].style.height;
      blocks[largest].style.height = temp1;
      blocks[i].childNodes[0].innerText =
      blocks[largest].childNodes[0].innerText;
      blocks[largest].childNodes[0].innerText = temp2;
    
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 250)
      );
    
      // Recursively Hapify the affected sub-tree
      await Heapify(n, largest);
    }
  }
    
  // Asynchronous HeapSort function
  async function heapSort(n) {
    var blocks = document.querySelectorAll(".block");
    
    // Build heap (rearrange array)
    for (var i = n / 2 - 1; i >= 0; i--) {
      await Heapify(n, i);
    }
    
    // One by one extract an element from heap
    for (var i = n - 1; i > 0; i--) {
    
      // Move current root to end
      var temp1 = blocks[i].style.height;
      var temp2 = blocks[i].childNodes[0].innerText;
      blocks[i].style.height = blocks[0].style.height;
      blocks[0].style.height = temp1;
      blocks[i].childNodes[0].innerText = blocks[0].childNodes[0].innerText;
      blocks[0].childNodes[0].innerText = temp2;
    
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 250)
      );
    
      // Call max Heapify on the reduced heap
      await Heapify(i, 0);
    }
  }


// asynchronous function to perform "Selection Sort"
async function SelectionSort(delay = 300) {
  var blocks = document.querySelectorAll(".block");
  // Assign 0 to min_idx
   var min_idx = 0;
   for (var i = 0; i < blocks.length; i += 1) {
  
    // Assign i to min_idx
    min_idx = i;
  
    // Provide darkblue color to the ith bar
    blocks[i].style.backgroundColor = "red";
    for (var j = i + 1; j < blocks.length; j += 1) {
  
      // Provide red color to the jth bar
      blocks[j].style.backgroundColor = "yellow";
        
      // To pause the execution of code for 300 milliseconds
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 300)
      );
  
      // To store the integer value of jth bar to var1 
      var val1 = parseInt(blocks[j].childNodes[0].innerHTML);
  
      // To store the integer value of (min_idx)th bar to var2 
      var val2 = parseInt(blocks[min_idx].childNodes[0].innerHTML);
        
      // Compare val1 & val2
      if (val1 < val2) {
        if (min_idx !== i) {
  
          // Provide skyblue color to the (min-idx)th bar
          blocks[min_idx].style.backgroundColor = "  rgb(24, 190, 255)";
        }
        min_idx = j;
      } else {
  
        // Provide skyblue color to the jth bar
        blocks[j].style.backgroundColor = "  rgb(24, 190, 255)";
      }
    }
  
    // To swap ith and (min_idx)th bar
    var temp1 = blocks[min_idx].style.height;
    var temp2 = blocks[min_idx].childNodes[0].innerText;
    blocks[min_idx].style.height = blocks[i].style.height;
    blocks[i].style.height = temp1;
    blocks[min_idx].childNodes[0].innerText = blocks[i].childNodes[0].innerText;
    blocks[i].childNodes[0].innerText = temp2;
      
    // To pause the execution of code for 300 milliseconds
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 300)
    );
  
    // Provide skyblue color to the (min-idx)th bar
    blocks[min_idx].style.backgroundColor = "  rgb(24, 190, 255)";
  
    // Provide lightgreen color to the ith bar
    blocks[i].style.backgroundColor = " rgb(49, 226, 13)";
  }
  
  // To enable the button "Generate New Array" after final(sorted)
  document.getElementById("Button1").disabled = false;
  document.getElementById("Button1").style.backgroundColor = "#6f459e";
  
  // To enable the button "Selection Sort" after final(sorted)
  document.getElementById("Button2").disabled = false;
  document.getElementById("Button2").style.backgroundColor = "#6f459e";
}
 

  function sortResetArray() {
    arr = [];
    console.log("Array reset called !");
    blocks = document.querySelectorAll(".card");
    indexs = document.querySelectorAll(".index");
    for (let i = 0; i < blocks.length; i++) {
        let num = randomIntFromInterval(5, 100);
        //    document.getElementById(i).innerText = num;
        arr.push(num);
        blocks[i].style.backgroundColor = "#003b46";
        indexs[i].style.backgroundColor = "#5bc8ac";
        indexs[i].style.color = "#003b46";
    }
    arr = linearSort(arr);
    for (let i = 0; i < blocks.length; i++) {
        document.getElementById(i).innerText = arr[i];
    }
    result.style.display = "none";
    document.getElementById("searchKey").value = "";
  }
  
// Calling generatearray function
generatearray();
  
// Calling generate_idx function
generate_idx();
  
// Calling QuickSort function

// Calling BubbleSort function
//bubbleSort();