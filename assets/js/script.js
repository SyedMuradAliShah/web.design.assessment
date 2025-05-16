 var swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
        },
        640: {
          slidesPerView: 4,
        },
        768: {
          slidesPerView: 7,
        },
        1024: {
          slidesPerView: 8,
        },
        1200: {
          slidesPerView: 10,
        },
        1367: {
          slidesPerView: 12,
        },
      },
    });



const toggleQuizBtn = document.getElementById('toggleQuizBtn');
  const quizBox = document.getElementById('quizBox');
  const questions = document.querySelectorAll('.question');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const toggleIcon = toggleQuizBtn.querySelector('.toggle-icon i');
  const questionCounter = document.getElementById('questionCounter');

  let currentQuestion = 0;
  let isSubmitted = false;

  toggleQuizBtn.addEventListener('click', () => {
    const currentDisplay = window.getComputedStyle(quizBox).display;
    const isHidden = currentDisplay === 'none';
    quizBox.style.display = isHidden ? 'block' : 'none';
    toggleQuizBtn.classList.toggle('open', isHidden);
    toggleIcon.classList.toggle('fa-angle-up', !isHidden);
    toggleIcon.classList.toggle('fa-angle-down', isHidden);
  });

  function showQuestion(index) {
    if (isSubmitted) return;

    questions.forEach((q, i) => {
      q.classList.toggle('active', i === index);
    });

    // Show/hide prev button
    prevBtn.style.display = index === 0 ? 'none' : 'inline-block';

    // Change Next button to Submit if last question
    nextBtn.textContent = index === questions.length - 1 ? 'Submit' : 'Next';

    // Update counter text
    questionCounter.textContent = ` ${index + 1} / ${questions.length}`;
  }

  nextBtn.addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      showQuestion(currentQuestion);
    } else if (currentQuestion === questions.length - 1) {
      submitQuiz();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
      currentQuestion--;
      showQuestion(currentQuestion);
    }
  });

  function submitQuiz() {
    isSubmitted = true;
    quizBox.innerHTML = `
      <div class="text-center p-5">
        <h4 class="text-success">Thank you!</h4>
        <p>Your answers are submitted for evaluation.</p>
      </div>
    `;
  }

  // Initialize on page load
  showQuestion(currentQuestion);

// table data
// ==========================draggable-options
$(document).ready(function () {
  var draggedItem = null;
  var longPressTimer;
  var isScrolling = false;

  $('.draggable').on('dragstart', function (event) {
    draggedItem = $(this);
    event.originalEvent.dataTransfer.setData('text/plain', 'dragged');
  });


  $('.match-word-box').on('dragover', function (event) {
    event.preventDefault();
  });

  $('.match-word-box').on('drop', function (event) {
    event.preventDefault();
    var data = event.originalEvent.dataTransfer.getData('text/plain');

    if (data === 'dragged' && draggedItem !== null) {
      var draggedElement = draggedItem;
      var tooltipText = draggedElement.text();
      var tooltip = $('<span class="tooltip">' + tooltipText + '<span class="close-btn">×</span></span>');

      if (!$(this).children('.tooltip').length) {
        tooltip.find('.close-btn').on('click', function () {
          $(this).parent('.tooltip').remove();
          draggedElement.show();
        });

        $(this).append(tooltip);
        draggedElement.hide();
      } else {
        $(this).addClass('not-allowed-drop');
        setTimeout(function () {
          $(this).removeClass('not-allowed-drop');
        }.bind(this), 1000);
      }
    }
  });

});

// ==========================draggable-options
// =====================================timer
function startTimer() {
  var timerDisplay = document.getElementById('timer');
  
  if (!timerDisplay) {
    // If 'timer' element doesn't exist, do nothing or handle accordingly
    return;
  }

  var time = '00:39:60'.split(':'); // Initial time in HH:MM:SS format (39 minutes and 60 seconds)

  var interval = setInterval(function() {
    var hours = parseInt(time[0], 10);
    var minutes = parseInt(time[1], 10);
    var seconds = parseInt(time[2], 10);

    if (hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(interval); // Stop the timer when it reaches zero
      return;
    }

    // Decrease the timer
    if (seconds > 0) {
      seconds--;
    } else {
      if (minutes > 0) {
        minutes--;
        seconds = 59;
      } else {
        hours--;
        minutes = 59;
        seconds = 59;
      }
    }

    // Update the timer display if the element exists
    if (timerDisplay) {
      timerDisplay.textContent = (hours < 10 ? '0' + hours : hours) + ':' +
                                 (minutes < 10 ? '0' + minutes : minutes) + ':' +
                                 (seconds < 10 ? '0' + seconds : seconds);
    }

    time = [hours, minutes, seconds];
  }, 1000); // Update every second
}

document.addEventListener("DOMContentLoaded", function() {
  startTimer(); // Start the countdown timer
});



document.addEventListener('DOMContentLoaded', () => {
  const setupRecording = (buttonId, audioId, duration) => {
    const toggleButton = document.getElementById(buttonId);
    const audioElement = document.getElementById(audioId);

    let mediaRecorder;
    let isRecording = false;
    let recordedChunks = [];

    if (toggleButton && audioElement) {
      toggleButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default action
        toggleRecording();
      });

      function toggleRecording() {
        if (!isRecording) {
          startRecording();
          toggleButton.innerHTML = '<i class="fas fa-stop"></i> Stop Recording';
          audioElement.style.display = 'none'; // Hide the audio element while recording
        } else {
          stopRecording();
          toggleButton.innerHTML = '<i class="fas fa-play"></i> Start Recording';
        }
        isRecording = !isRecording;
      }

      function startRecording() {
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(function(stream) {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = handleDataAvailable;
            mediaRecorder.onstop = handleRecordingStop;
            mediaRecorder.start();
            setTimeout(stopRecording, duration); // Stop recording after the specified duration
          })
          .catch(function(err) {
            console.error('Error accessing the microphone:', err);
          });
      }

      function stopRecording() {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
        }
      }

      function handleDataAvailable(event) {
        recordedChunks.push(event.data);
      }

      function handleRecordingStop() {
        const recordedBlob = new Blob(recordedChunks, { 'type': 'audio/ogg; codecs=opus' });
        recordedChunks = [];
        const audioURL = URL.createObjectURL(recordedBlob);
        audioElement.src = audioURL;
        audioElement.style.display = 'block'; // Show the audio element after recording stops
      }
    } else {
      console.error('One or more required elements are missing.');
    }
  };

  setupRecording('toggleButton', 'audioElement', 60000); // 1 minute duration
});






// ==========================word-dragging
document.addEventListener("DOMContentLoaded", function() {
  const container = document.getElementById("wordContainer");
  if (!container) {
    // console.error("Container element not found.");
    return;
  }
  let draggedItem = null;
  
  let longPressTimer = null;
  let touchStartEvent = null;
  
  // Function to handle long press
  const handleLongPress = (event) => {
    draggedItem = event.target;
    draggedItem.classList.add("selected");
  };
  
  // Function to handle clearing selection
  const clearSelection = () => {
    const selected = container.querySelectorAll(".selected");
    selected.forEach((item) => {
      item.classList.remove("selected");
    });
  };
  
  container.addEventListener("dragstart", function(event) {
    draggedItem = event.target;
  });
  
  container.addEventListener("dragover", function(event) {
    event.preventDefault();
  });
  
  container.addEventListener("drop", function(event) {
    event.preventDefault();
    if (event.target.tagName === "SPAN") {
      const targetText = event.target.textContent;
      event.target.textContent = draggedItem.textContent;
      draggedItem.textContent = targetText;
      clearSelection();
    }
  });
  
  // Adding touch event listeners for long press on spans
  const spans = container.getElementsByTagName("span");
  
  for (let i = 0; i < spans.length; i++) {
    spans[i].addEventListener("touchstart", function(event) {
      touchStartEvent = event.changedTouches[0];
      let longPressDuration = 1000; // Set long press duration to 1 second
  
      longPressTimer = setTimeout(() => {
        handleLongPress(event);
      }, longPressDuration);
    });
  
    spans[i].addEventListener("touchend", function(event) {
      clearTimeout(longPressTimer);
    });
  
    spans[i].addEventListener("touchmove", function(event) {
      const touch = event.changedTouches[0];
      if (
        Math.abs(touch.clientX - touchStartEvent.clientX) > 10 ||
        Math.abs(touch.clientY - touchStartEvent.clientY) > 10
      ) {
        clearTimeout(longPressTimer);
      }
    });
  
    // Adding click event for clearing selection on regular click
    spans[i].addEventListener("click", function(event) {
      clearSelection();
    });
  }
  
  // Rest of your code that interacts with the container element
});





// ==========================word-dragging
// =============================img-uplaod
document.addEventListener('DOMContentLoaded', () => {
  const uploadImgContainer = document.querySelector('.upload-img');
  
  if (uploadImgContainer) {
    const fileInput = uploadImgContainer.querySelector('#fileInput');
    const imagePreview = uploadImgContainer.querySelector('#imagePreview');
    const previewImage = imagePreview.querySelector('.preview');

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = function(event) {
          previewImage.src = event.target.result;
        };

        reader.readAsDataURL(file);
      }
    });
  }
});

// =============================img-uplaod
// =============================keybaord
var VKeyboard = function (clientOptions) {
  if (clientOptions && typeof clientOptions !== 'object') {
      console.error('Keybaord accept an object of supprted keybaord options.');
  }
  

  var keys = {
          'chr': [
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "x8"],
              ["@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+"],
              ["[", "]", "{", "}", ";", ":", "|", "/", "<", ">", "'", "x13"],
              ["","","", "?", ".", "`", "~", "!", ",","","","",],
              ["xlang", "x32"]
          ],
          'ar': [
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "x8"],
              ["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "?"],
              ["ش", "س", "ي", "ب", "ل", "ا", "ت", "ن", "م", "ک", "ط", "."],
              ["ئ", "ء", "ؤ", "ر", "لا", "ى", "ة", "و", "ز", "ظ", "د", ","],
              ["xlang", "x32", "x13"]
          ]
      },
      supportedLanguages = Object.keys(keys), // TODO Object.keys es5
      rtlLanguages = ['ar'],
      options = {
          lang: 'fr',
          charsOnly: false,
          caps: false
      },
      elements = {
          container: null,
          keysContainer: null,
          keyboardInput: null,
          clientInput: null,
      },
      BACKSPACE = 'x8',
      CAPS_LOCK = 'x20',
      RETURN = 'x13',
      SPACE = 'x32',
      LANG = 'xlang',
      DONE = 'xdone';

  if (clientOptions.lang && supportedLanguages.indexOf(clientOptions.lang) === -1) {
      console.error(lang + ' language is not supported!');
  }

  // TODO assign es5
  Object.assign(options, clientOptions);

  // Simple helper for DOM manipulation
  var Helper = (function (selector) {

      if (!(this instanceof Helper)) {
          return new Helper(selector);
      }

      this.length = 0;

      if (typeof selector === 'string') {
          var self = this;
          var eles = document.querySelectorAll(selector);
          this.length = eles.length;
          eles.forEach(function (ele, i) {
              self[i] = ele;
          });
      }

      if (selector instanceof Node || selector === window) {
          this[0] = selector;
      }

      if (selector.constructor && selector.constructor.name === 'Array') {
          var arr = selector,
              i = arr.length - 1;
          while (i >= 0) {
              this[i] = arr[i];
              this.length++;
              i--;
          }
      }

      Helper.prototype.length = 0;

      Helper.prototype.addClass = function (classes) {
          var self = this;
          classes.split(' ').forEach(function (cls) {
              self[0].classList.add(cls);
          });
          return this;
      };

      Helper.prototype.removeClass = function (classes) {
          var self = this;
          classes.split(' ').forEach(function (cls) {
              self[0].classList.remove(cls);
          });
          return this;
      };

      Helper.prototype.toggle = function (cls) {
          return this[0].classList.toggle(cls);
      };

      Helper.prototype.contains = function (cls) {
          return this[0].classList.contains(cls);
      };

      Helper.prototype.appendTo = function (appendTo) {
          document.querySelector(appendTo).appendChild(this[0]);
          return this;
      };

      Helper.prototype.get = function (index) {
          return this[0];
      };

      Helper.prototype.setAttribute = function (name, val) {
          this[0].setAttribute(name, val);
          return this;
      };

      Helper.prototype.text = function (text) {
          this[0].textContent = text;
          return this;
      };

      Helper.prototype.on = function (event, handler) {
          this[0].addEventListener(event, handler);
          return this;
      };

      Helper.prototype.splice = Array.prototype.splice;
      Helper.prototype.each = Array.prototype.forEach;
  });

  Helper.create = function (tag) {
      var ele = document.createElement(tag);
      return Helper(ele);
  };

  function renderUI(renderOptions) {
      var charsOnly = renderOptions.charsOnly,
          capsLock = renderOptions.caps,
          container = elements.container = Helper
          .create('div')
          .addClass('keyboard keyboard--hidden')
          .appendTo('body')
          .get(0),
          keysContainer = elements.keysContainer = Helper
          .create('div')
          .addClass('keyboard__keys')
          .appendTo('.keyboard')
          .get(0),
          input = elements.keyboardInput = Helper
          .create('textarea')
          .addClass('keyboard__input')
          .get(0);

      keysContainer.insertBefore(input, keysContainer.firstElementChild);
      Helper.create('br').appendTo('.keyboard__keys');

      operateOnKeys(options.lang, function (key) {

          if (isSpecialKey(key)) { // Handle special keys
              switch (key) {
                  case BACKSPACE:
                      var btn = Helper.create('button')
                          .addClass('keyboard__key keyboard__key--wide')
                          .setAttribute('type', 'button')
                          .get(0),
                          icon = Helper.create('i')
                          .addClass('icon material-icons')
                          .text('backspace')
                          .get(0);

                      btn.appendChild(icon);
                      keysContainer.appendChild(btn);

                      Helper(btn).on('click', function () {
                          elements.keyboardInput.value = elements.keyboardInput.value.slice(0, -1);
                          elements.clientInput.value = elements.clientInput.value.slice(0, -1);
                      });

                      break;
                  case CAPS_LOCK:
                      var btn = Helper.create('button')
                          .addClass('keyboard__key keyboard__key--wide keyboard__key--activatable')
                          .setAttribute('type', 'button')
                          .get(0),
                          icon = Helper.create('i')
                          .addClass('icon material-icons')
                          .text('keyboard_capslock')
                          .get(0);

                      btn.appendChild(icon);
                      keysContainer.appendChild(btn);

                      if (capsLock) {
                          Helper(btn).addClass('keyboard__key--active');
                          toggleCapsLock();
                      }

                      Helper(btn).on('click', function () {
                          options.caps = !options.caps;
                          this.classList.toggle('keyboard__key--active');
                          toggleCapsLock();
                      });

                      break;
                  case RETURN:
                      var btn = Helper.create('button')
                          .addClass('keyboard__key keyboard__key--wide keyboard__key--close')
                          .setAttribute('type', 'button')
                          .get(0),
                          icon = Helper.create('i')
                          .addClass('icon material-icons')
                          .text('close')
                          .get(0);

                      btn.appendChild(icon);
                      keysContainer.appendChild(btn);
                  //     break;
                  // case DONE:
                  //     var btn = Helper.create('button')
                  //         .addClass('keyboard__key keyboard__key--wide keyboard__key--dark')
                  //         .setAttribute('type', 'button')
                  //         .get(0),
                  //         icon = Helper.create('i')
                  //         .addClass('icon material-icons')
                  //         .text('check_circle')
                  //         .get(0);

                      btn.appendChild(icon);
                      keysContainer.appendChild(btn);

                      Helper(btn).on('click', done);
                      break;
                  case LANG:
                      var btn = Helper.create('button')
                          .addClass('keyboard__key keyboard__key--wide keyboard__key--dark keyboard__langauge__dropdown')
                          .setAttribute('type', 'button')
                          .get(0),
                          icon = Helper.create('i')
                          .addClass('icon material-icons')
                          .text('language')
                          .get(0);

                      btn.appendChild(icon);
                      keysContainer.appendChild(btn);

                      var list = Helper.create('ul')
                          .addClass('languages__list')
                          .get(0);

                      var items = [];
                      for (var i = 0; i < supportedLanguages.length; i++) {
                          var lang = supportedLanguages[i];
                          var li = Helper.create('li')
                              .addClass('language__item')
                              .setAttribute('data-lang', lang)
                              .text(lang)
                              .get(0);
                          list.appendChild(li);
                          items.push(li);
                      }

                      btn.appendChild(list);

                      // Toggle the language list 
                      Helper(btn).on('click', function () {
                          Helper(list).toggle('show');
                      });

                      // Binding click event on each langauge list item
                      Helper(items).each(function (item) {
                          Helper(item).on('click', function (e) {
                              e.stopPropagation(); // Stop event bubbling to the dropdown button
                              changeLangauge(this.dataset.lang);
                              Helper(list).removeClass('show');
                          });
                      });
                      break;
                  case SPACE:
                      var btn = Helper.create('button')
                          .addClass('keyboard__key keyboard__key--extra-wide')
                          .setAttribute('type', 'button')
                          .get(0),
                          icon = Helper.create('i')
                          .addClass('icon material-icons')
                          .text('space_bar')
                          .get(0);

                      btn.appendChild(icon);
                      keysContainer.appendChild(btn);

                      Helper(btn).on('click', function () {
                          elements.keyboardInput.value += ' ';
                          elements.clientInput.value += ' ';
                      });
                      break;
              }
          } else { // Regular keys
              // Handle charsOnly option
              if (charsOnly === true && typeof key === 'number') {
                  return;
              }

              var btn = Helper.create('button')
                  .addClass('keyboard__key')
                  .setAttribute('type', 'button')
                  .text(key)
                  .get(0);

              keysContainer.appendChild(btn);

              Helper(btn).on('click', function () {
                  Helper(elements.keyboardInput)
                      .setAttribute('dir', rtlLanguages.indexOf(options.lang) !== -1 ? 'rtl' : 'ltr');
                  elements.keyboardInput.value += btn.textContent;
                  elements.clientInput.value += btn.textContent;
              });
          }

          // Add new row of keys
          var isBreakLine = arguments[arguments.length - 1];
          if (isBreakLine) {
              keysContainer.appendChild(document.createElement('br'));
          }
      });
  }

  function initKeyboardInput(properties) {
      elements.keyboardInput.placeholder = properties.placeholder;
      elements.keyboardInput.value = properties.value;
  }

  function operateOnKeys(lang, clb) {
      Helper(keys[lang]).each(function (rowKeys, rowIndex) {
          Helper(rowKeys).each(function (key, keyIndex) {
              var isBreakLine = keyIndex === rowKeys.length - 1;
              clb.apply(this, [key, rowIndex, keyIndex, isBreakLine]);
          });
      });
  }

  function toggleCapsLock() {
      Helper('button.keyboard__key').each(function (key) {
          if (key.childElementCount === 0) {
              if (options.caps === true) {
                  key.textContent = key.textContent.toUpperCase();
              } else {
                  key.textContent = key.textContent.toLowerCase();
              }
          }
      });
  }

  function done() {
    // Close the keyboard regardless of the elements' availability
    Helper(elements.container).addClass('keyboard--hidden');
    Helper('.languages__list').removeClass('show');
    // Perform any other necessary actions when closing the keyboard

    // Update client input if elements are available
    if (elements.clientInput && elements.keyboardInput) {
        elements.clientInput.value = elements.keyboardInput.value;
    } 
    // else {
    //     console.error('Elements are not available or null.');
    // }
}

  function changeLangauge(lang) {
      if (supportedLanguages.indexOf(lang) === -1) return;

      var k = Helper('.keyboard__key:not(.keyboard__key--wide):not(.keyboard__key--extra-wide)'),
          i = 0;

      operateOnKeys(lang, function (key) {
          if (!isSpecialKey(key) && k[i]) {
              Helper(k[i]).text(key + "");
              i++;
          }
      });

      options.lang = lang;
  }

  function isSpecialKey(key) {
      return typeof key !== 'number' && key.match(/x\w+/) !== null;
  }

  function initEvents() {
      // Binding the focus event on inputs, textareas (exclude the keyboard input)
      Helper('input, textarea').each(function (input) {
          Helper(input).on('focus', function (e) {
              var input = e.target;
              // exclude the readonly fileds
              if (input.readOnly) return;
              // Shows the kayboard
              Helper(elements.container).removeClass('keyboard--hidden');
              elements.clientInput = input;
              // Init the keyboard input
              initKeyboardInput({
                  placeholder: input.placeholder,
                  value: input.value
              });
              // Update the keyboard when typing in an input 
              Helper(input).on('input', function () {
                  elements.keyboardInput.value = this.value;
              });
          });
      });

      // Hide the keyboard when clicking out of the keyboard view
      Helper(window).on('click', function (e) {
          if (!Helper(elements.container).contains('keyboard--hidden')) {
              if (e.target !== elements.keyboardInput &&
                  ['button', 'button'].indexOf(e.target.tagName.toLowerCase()) === -1 &&
                  e.target.closest('.keyboard') !== elements.container) {
                  Helper(elements.container).addClass('keyboard--hidden');
                  Helper('.languages__list').removeClass('show');
                  done();
              }
          }
      });

      // Update the client input when typing in the keyboard input
      Helper(elements.keyboardInput).on('input', function () {
          elements.clientInput.value = this.value;
      });
  }

  return {
      init: function () {
          // rendering keyboard HTML markup
          renderUI({
              charsOnly: options.charsOnly,
              caps: options.caps
          });
          // Apply caps lock if enabled
          if (options.caps) {
              toggleCapsLock();
          }
          // Binding events
          initEvents();
      }
  };
};

document.addEventListener("DOMContentLoaded", function() {
  // Initialize the virtual keyboard
  var keyboard = VKeyboard({
      lang: 'ar',
      charsOnly: false,
      caps: false
  });

  keyboard.init(); // Initialize the keyboard

  var showKeyboardBtns = document.querySelectorAll('.showKeyboardBtn');
  var keyboardContainer = document.querySelector('.keyboard');
  
  showKeyboardBtns.forEach(function(btn) {
      btn.addEventListener("click", function(event) {
          event.preventDefault(); // Prevent the default action
          if (keyboardContainer.classList.contains('keyboard--hidden')) {
              keyboardContainer.classList.remove('keyboard--hidden');
              var textarea = this.parentNode.querySelector('input, textarea'); // Find the textarea within the same parent
              if (textarea) {
                  textarea.focus(); // Focus on the textarea
              }
          } else {
              keyboardContainer.classList.add('keyboard--hidden');
              // Optionally, you might want to call the 'done' function here as well
              // to handle any necessary actions when hiding the keyboard
          }
      });
  });

  // Disable right-click on all input and textarea elements
  document.querySelectorAll('input, textarea').forEach(function(input) {
      input.addEventListener('contextmenu', function(event) {
          event.preventDefault();
      });
  });
});

// =============================keybaord

