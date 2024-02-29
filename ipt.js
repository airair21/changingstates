$(document).ready(function() {


let red = 0;
let green = 0;
let blue = 0;

function updateNColor() {
    console.log('Updating color:', red, green, blue);

    let circle = document.getElementById('newCircle');
    circle.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

function changeNColor(color, amount) {
    switch (color) {
        case 'r':
            red = Math.max(0, Math.min(255, red + amount));
            break;
        case 'g':
            green = Math.max(0, Math.min(255, green + amount));
            break;
        case 'b':
            blue = Math.max(0, Math.min(255, blue + amount));
            break;
    }
    updateNColor();
    updateNColorInputs(); // Update RGB inputs
}

function updateNColorInputs() {
    $("#rText").val(red);
    $("#gText").val(green);
    $("#bText").val(blue);
}

$("#rText, #gText, #bText").on('input', function() {
    red = parseInt($("#rText").val()) || 0;
    green = parseInt($("#gText").val()) || 0;
    blue = parseInt($("#bText").val()) || 0;
    updateNColor(); // Call updateNColor when the RGB values change
    // updateNColorInputs(); // Update the RGB inputs
});

// Add event listeners for mouseenter and mouseleave for the RGB color buttons
let addRedInterval;
$('#addRed').mouseenter(function() {
    addRedInterval = setInterval(function() {
        changeNColor('r', 1); // Use changeNColor to update RGB values
        updateNColor(); // Call updateNColor after changing the RGB values
    }, 12); // Add 1 to red every 12 milliseconds
}).mouseleave(function() {
    clearInterval(addRedInterval);
});

let subtractRedInterval;
$('#subtractRed').mouseenter(function() {
    subtractRedInterval = setInterval(function() {
        changeNColor('r', -1);
        updateNColor(); // Call updateNColor after changing the RGB values
    }, 12); // Subtract 1 from red every 12 milliseconds
}).mouseleave(function() {
    clearInterval(subtractRedInterval);
});

let addGreenInterval;
$('#addGreen').mouseenter(function() {
    addGreenInterval = setInterval(function() {
        changeNColor('g', 1); // Use changeNColor to update green value
        updateNColor(); // Call updateNColor after changing the RGB values
    }, 12); // Add 1 to green every 12 milliseconds
}).mouseleave(function() {
    clearInterval(addGreenInterval);
});

let subtractGreenInterval;
$('#subtractGreen').mouseenter(function() {
    subtractGreenInterval = setInterval(function() {
        changeNColor('g', -1); // Use changeNColor to update green value
        updateNColor(); // Call updateNColor after changing the RGB values
    }, 12); // Subtract 1 from green every 12 milliseconds
}).mouseleave(function() {
    clearInterval(subtractGreenInterval);
});

let addBlueInterval;
$('#addBlue').mouseenter(function() {
    addBlueInterval = setInterval(function() {
        changeNColor('b', 1); // Use changeNColor to update blue value
        updateNColor(); // Call updateNColor after changing the RGB values
    }, 12); // Add 1 to blue every 12 milliseconds
}).mouseleave(function() {
    clearInterval(addBlueInterval);
});

let subtractBlueInterval;
$('#subtractBlue').mouseenter(function() {
    subtractBlueInterval = setInterval(function() {
        changeNColor('b', -1); // Use changeNColor to update blue value
        updateNColor(); // Call updateNColor after changing the RGB values
    }, 12); // Subtract 1 from blue every 12 milliseconds
}).mouseleave(function() {
    clearInterval(subtractBlueInterval);
});


// Repeat the above pattern for green and blue buttons



updateNColor(); // Update color initially

  

const ball = document.querySelector('.ball');
const cmykLink = document.querySelector('a[href="cmyk.html"]');

cmykLink.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link behavior

    // Animate the scaleX transform of .ballBox to 0 over 0.5 seconds
    // $('.ballBox').css('transform-origin', 'right'); 
        // Set the transform origin to the right side
    $('.ballBox').animate({ transform: 'scaleX(0)' }, 300, function() {
        // Change the justify-content to flex-end
        // $(this).css('justify-content', 'flex-end');

        // Animate the scaleX transform of .ballBox back to 1 over 0.5 seconds
        $(this).animate({ transform: 'scaleX(1)' }, 250, function() {
            // Change the border radius to 0%
            $('.ball').css('border-radius', '50%');

            // Redirect to the linked page after a delay
            setTimeout(function() {
                window.location.href = 'cmyk.html';
            }, 1000); // Delay of 1 second (1000 milliseconds)
        });
    });
});
  
});