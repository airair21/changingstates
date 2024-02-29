$(document).ready(function() {
    let cyan = 0;
    let magenta = 0;
    let yellow = 0;
    let black = 0;
  
   
      

// new ?

    // Function to update the halftone dots based on the current CMYK values
    function updateHalftone() {
        const container = document.getElementById('circle');
        container.innerHTML = ''; // Clear existing dots

        for (let i = 0; i < 300; i += 10) {
            for (let j = 0; j < 300; j += 10) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.style.top = i + 'px';
                dot.style.left = j + 'px';
                container.appendChild(dot);
            }
        }
    }


   
function changeColor(color, amount) {
    switch (color) {
      case 'c':
        cyan = Math.max(0, Math.min(100, cyan + amount));
        break;
      case 'm':
        magenta = Math.max(0, Math.min(100, magenta + amount));
        break;
      case 'y':
        yellow = Math.max(0, Math.min(100, yellow + amount));
        break;
      case 'k':
        black = Math.max(0, Math.min(100, black + amount));
        break;
    }
    updateColor();
    updateColorInputs(); // Update individual color inputs
    // updateHalftone(); // Update the halftone dots    
  }
  
  function updateColor() {
    let circle = document.getElementById('circle');
    let rgb = cmykToRgb(cyan, magenta, yellow, black);
    circle.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  
    let cmykText = `CMYK: ${cyan}, ${magenta}, ${yellow}, ${black}`;
    $("#cmykValues").val(cmykText);
  }
  
  function updateColorInputs() {
    $("#cText").val(cyan);
    $("#mText").val(magenta);
    $("#yText").val(yellow);
    $("#kText").val(black);
  }
  
  
  
  
    function cmykToRgb(c, m, y, k) {
        c = c / 100;
        m = m / 100;
        y = y / 100;
        k = k / 100;
  
        let r = 1 - Math.min(1, c * (1 - k) + k);
        let g = 1 - Math.min(1, m * (1 - k) + k);
        let b = 1 - Math.min(1, y * (1 - k) + k);
  
        r = Math.round(r * 255);
        g = Math.round(g * 255);
        b = Math.round(b * 255);
  
        return { r, g, b };
    }


    $("#cText, #mText, #yText, #kText").on('input', function() {
        cyan = parseInt($("#cText").val()) || 0;
        magenta = parseInt($("#mText").val()) || 0;
        yellow = parseInt($("#yText").val()) || 0;
        black = parseInt($("#kText").val()) || 0;
        updateColor();
    });

  
  
    let addCyanInterval;
        $('#addCyan').mouseenter(function() {
            addCyanInterval = setInterval(function() {
                changeColor('c', 1);
            }, 33); // Add 1 to cyan every 33 milliseconds
        }).mouseleave(function() {
            clearInterval(addCyanInterval);
        });
  
    let subtractCyanInterval;
        $('#subtractCyan').mouseenter(function() {
            subtractCyanInterval = setInterval(function() {
                changeColor('c', -1);
            }, 33); // Subtract 1 from cyan every 33 milliseconds
        }).mouseleave(function() {
            clearInterval(subtractCyanInterval);
        });
  
    let addMagentaInterval;
        $('#addMagenta').mouseenter(function() {
            addMagentaInterval = setInterval(function() {
                changeColor('m', 1);
            }, 33); // Add 1 to magenta every 33 milliseconds
        }).mouseleave(function() {
            clearInterval(addMagentaInterval);
        });
  
    let subtractMagentaInterval;
        $('#subtractMagenta').mouseenter(function() {
            subtractMagentaInterval = setInterval(function() {
                changeColor('m', -1);
            }, 33); // Subtract 1 from magenta every 33 milliseconds
        }).mouseleave(function() {
            clearInterval(subtractMagentaInterval);
        });
  
    let addYellowInterval;
        $('#addYellow').mouseenter(function() {
            addYellowInterval = setInterval(function() {
                changeColor('y', 1);
            }, 33); // Add 1 to yellow every 33 milliseconds
        }).mouseleave(function() {
            clearInterval(addYellowInterval);
        });
  
    let subtractYellowInterval;
        $('#subtractYellow').mouseenter(function() {
            subtractYellowInterval = setInterval(function() {
                changeColor('y', -1);
            }, 33); // Subtract 1 from yellow every 33 milliseconds
        }).mouseleave(function() {
            clearInterval(subtractYellowInterval);
        });
  
    let addBlackInterval;
        $('#addBlack').mouseenter(function() {
            addBlackInterval = setInterval(function() {
                changeColor('k', 1);
            }, 33); // Add 1 to black every 33 milliseconds
        }).mouseleave(function() {
            clearInterval(addBlackInterval);
        });
  
    let subtractBlackInterval;
        $('#subtractBlack').mouseenter(function() {
            subtractBlackInterval = setInterval(function() {
                changeColor('k', -1);
            }, 33); // Subtract 1 from black every 33 milliseconds
        }).mouseleave(function() {
            clearInterval(subtractBlackInterval);
        });
  
    updateColor(); // Update color initially
  
  
  // Event listener for changes in the #rgbValues input
  $('#rgbValues').on('input', function() {
    // Get the RGB values from the input
    let rgbValues = $(this).val().split(',').map(value => parseInt(value.trim()));
  
    // Convert RGB to CMYK
    let cmyk = rgbToCmyk(rgbValues[0], rgbValues[1], rgbValues[2]);
    cyan = cmyk.c;
    magenta = cmyk.m;
    yellow = cmyk.y;
    black = cmyk.k;
  
    // Update the color of the circle based on the new CMYK values
    let circle = document.getElementById('circle');
    circle.style.backgroundColor = `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`;
  
    // Update the CMYK values text input
    let cmykText = `CMYK: ${cyan}, ${magenta}, ${yellow}, ${black}`;
    let cText = `${cyan}`;
    let mText = `${magenta}`;
    let yText = `${yellow}`;
    let kText = `${black}`; 
    // let cmykText = ``
    $("#cmykValues").val(cmykText);
    $("#cText").val(cText);
    $("#mText").val(mText);
    $("#yText").val(yText);
    $("#kText").val(kText);
  
  //  cmykText.addEventListener('input', ()=>{
  //   cyanvalue = cText.value
  //  })
  
  
  });
  
  function rgbToCmyk(r, g, b) {
    // Normalize RGB values
    r = r / 255;
    g = g / 255;
    b = b / 255;
  
    // Calculate CMYK values
    let k = 1 - Math.max(r, g, b);
    let c = (1 - r - k) / (1 - k);
    let m = (1 - g - k) / (1 - k);
    let y = (1 - b - k) / (1 - k);
  
    // Convert to percentages
    c = Math.round(c * 100);
    m = Math.round(m * 100);
    y = Math.round(y * 100);
    k = Math.round(k * 100);
  
    return { c, m, y, k };
  }
  
  
const ball = document.querySelector('.ball');
const rgbLink = document.querySelector('a[href="rgb.html"]');

rgbLink.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link behavior

    // Animate the scaleX transform of .ballBox to 0 over 0.5 seconds
    // $('.ballBox').css('transform-origin', 'right'); 
        // Set the transform origin to the right side
    $('.ballBox').animate({ transform: 'scaleX(0)' }, 300, function() {
        // Change the justify-content to flex-end
        // $(this).css('justify-content', 'flex-end');

        // Animate the scaleX transform of .ballBox back to 1 over 0.5 seconds
        $(this).animate({ transform: 'scaleX(1)' }, 50, function() {
            // Change the border radius to 0%
            $('.ball').css('border-radius', '0%');

            // Redirect to the linked page after a delay
            setTimeout(function() {
                window.location.href = 'rgb.html';
            }, 500); // Delay of 1 second (1000 milliseconds)
        });
    });
});



  
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
    }, 33); // Add 1 to red every 33 milliseconds
}).mouseleave(function() {
    clearInterval(addRedInterval);
});

let subtractRedInterval;
$('#subtractRed').mouseenter(function() {
    subtractRedInterval = setInterval(function() {
        changeNColor('r', -1);
        updateNColor(); // Call updateNColor after changing the RGB values
    }, 33); // Subtract 1 from red every 33 milliseconds
}).mouseleave(function() {
    clearInterval(subtractRedInterval);
});

// Repeat the above pattern for green and blue buttons



updateNColor(); // Update color initially

  
ball.addEventListener('click', function(event) {
    window.location.href = 'index.html';
})
  
  

  
  });
  
  
  
  