$(document).ready(function() {
  // When moon icon is clicked, switch to dark mode and show the sun icon
  $('#fa-sun').click(function() {
    $('html').attr('data-bs-theme', 'dark'); // Set theme to dark
    $('#fa-sun').hide(); // Hide moon icon
    $('#fa-moon').show();  // Show sun icon
  });

  // When sun icon is clicked, switch to light mode and show the moon icon
  $('#fa-moon').click(function() {
    $('html').attr('data-bs-theme', 'light'); // Set theme to light
    $('#fa-moon').hide(); // Hide sun icon
    $('#fa-sun').show(); // Show moon icon
  });
});

$(document).ready(function() {
  // When eye icon is clicked, show the eye-slash and change input type to text
  $('#fa-eye').click(function() {
    $('#fa-eye').hide(); // Hide eye icon
    $('#fa-eye-slash').show();  // Show eye-slash icon
    $('#password').attr('type', 'text'); // Change password input to text
  });

  // When eye-slash icon is clicked, show the eye and change input type back to password
  $('#fa-eye-slash').click(function() {
    $('#fa-eye-slash').hide(); // Hide eye-slash icon
    $('#fa-eye').show(); // Show eye icon
    $('#password').attr('type', 'password'); // Change input type back to password
  });
});




document.getElementById('toggle-button').addEventListener('click', function () {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('open');
});

document.getElementById('close-button').addEventListener('click', function () {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.remove('open'); // Remove the 'open' class to close the sidebar
});

// sidebar-dropdown
document.querySelectorAll('.dropdown-toggle').forEach(function(toggle) {
  toggle.addEventListener('click', function() {
    const dropdown = this.parentElement;
    
    // Close all other open dropdowns
    document.querySelectorAll('.dropdown.open').forEach(function(openDropdown) {
      if (openDropdown !== dropdown) {
        openDropdown.classList.remove('open');
      }
    });
    
    // Toggle the clicked dropdown
    dropdown.classList.toggle('open');
  });
});

// sidebar-dropdown
// Table data
const attemptsData = {
  1: {
    paragraph: "This is the paragraph for Level 1 Assessment Attempt 1.",
    questions: [
      { question: "What is 2 + 2?", answer: "3", correct: false },
      { question: "What is the capital of France?", answer: "Paris", correct: true }
    ]
  },
  2: {
    paragraph: "This is the paragraph for Level 1 Assessment Attempt 2.",
    questions: [
      { question: "What is 2 + 2?", answer: "4", correct: true },
      { question: "What is the capital of France?", answer: "London", correct: false }
    ]
  },
  3: {
    paragraph: "This is the paragraph for Level 1 Assessment Attempt 3.",
    questions: [
      { question: "What is 2 + 2?", answer: "4", correct: true },
      { question: "What is the capital of France?", answer: "Paris", correct: true }
    ]
  }
};

function viewDetails(attempt) {
  const data = attemptsData[attempt];
  const container = document.getElementById('detailsContainer');
  let html = `
    <div class="details position-relative p-4 border rounded-3 bg-white shadow-sm">
      <button type="button" onclick="closeDetails()" class="btn-close position-absolute top-0 end-0 m-2" aria-label="Close"></button>
      <h6 class="fw-bold mb-3">Attempt ${attempt} Details</h6>
      <p class="small"><b>Paragraph:</b><br> ${data.paragraph}</p>
      <div>
  `;

  data.questions.forEach((q, index) => {
    html += `
      <div class="question mb-2 border border-1 bg-light p-3 rounded-3">
        <p class="small mb-1"><b>Q${index + 1}:</b> ${q.question}</p>
        <p class="small mb-0"><b>Answer:</b> ${q.answer}
        ${q.correct ? '<i class="fa-solid fa-thumbs-up text-success ms-2"></i>' : '<i class="fa-solid fa-thumbs-down text-danger ms-2"></i>'}
      </p>
      </div>
    `;
  });

  html += `</div></div>`;

  container.innerHTML = html;
  container.classList.remove('d-none');
  container.scrollIntoView({ behavior: 'smooth' });
}

function closeDetails() {
  const container = document.getElementById('detailsContainer');
  container.classList.add('d-none');
  container.innerHTML = '';
}

// Event listeners on view-details buttons
document.querySelectorAll('.view-details').forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const attemptId = this.dataset.id;
    viewDetails(attemptId);
  });
});

// table data
