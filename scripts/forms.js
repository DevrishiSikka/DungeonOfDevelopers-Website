  document.addEventListener('DOMContentLoaded', function () {
    // Get all the tier buttons
    const tierButtons = document.querySelectorAll('.tier-btn');

    // Add click event listeners to each tier button
    tierButtons.forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.preventDefault();

        // Scroll to the contact-us section
        const contactSection = document.querySelector('.contact-us');
        contactSection.scrollIntoView({ behavior: 'smooth' });

        // Prefill the form based on the pressed button
        const form = document.forms.contact;
        const sponsorshipAmount = event.target.dataset.amount; // Use data-amount attribute to store the sponsorship amount

        // Assuming you have corresponding IDs for your form elements
        form.elements['purpose'].value = 'SPONSOR'; // Set the main objective to SPONSOR
        form.elements['budget'].value = sponsorshipAmount; // Set the budget based on the pressed button
      });
    });
  });


document.addEventListener('DOMContentLoaded', function () {
  const goBackButton = document.querySelector('.goback-btn');

  if (goBackButton) {
    goBackButton.addEventListener('click', function () {
      // Navigate to a specific website when the button is clicked
      window.location.href = 'https://dungeonofdevelopers.netlify.com'; // Replace with the desired URL
    });
  }
});

  // Include the ScrollReveal library before this script

const sr = ScrollReveal({
  duration: 1000,
  delay: 200,
  easing: 'cubic-bezier(0.5, 0, 0, 1)', // Add easing for smoother animations
});

function resetAnimation(element) {
  sr.get().reveal(element);
}

function initScrollReveal() {
  // Hero Section
  sr.reveal('.hero h1', {
    origin: 'top',
    distance: '50px'
  });

  sr.reveal('.hero h3', {
    origin: 'top',
    distance: '50px',
    delay: 400
  });

  sr.reveal('.hero h4', {
    origin: 'top',
    distance: '50px',
    delay: 800
  });

  // Why Sponsor Section
  sr.reveal('.why_sponsor h1', {
    origin: 'right',
    distance: '20px',
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
  });

  sr.reveal('.why_sponsor h3', {
    origin: 'right',
    distance: '20px',
    delay: 200,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
  });

  sr.reveal('.sponsorship_levels .container', {
    origin: 'right',
    distance: '20px',
    delay: 400,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
  });

  // Individual Engagement Tiers
  sr.reveal('.explore_tier', {
    origin: 'right',
    distance: '20px',
    delay: 600,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
  });

  sr.reveal('.innovator_tier', {
    origin: 'right',
    distance: '20px',
    delay: 800,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
  });

  sr.reveal('.visionary_tier', {
    origin: 'right',
    distance: '20px',
    delay: 1000,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
  });

  sr.reveal('.pioneer_tier', {
    origin: 'right',
    distance: '20px',
    delay: 1200,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
  });

  // Contact Us Section
  sr.reveal('.contact-us h1', {
    origin: 'top',
    distance: '50px',
  });

  sr.reveal('.contact-us form', {
    origin: 'top',
    distance: '50px',
    delay: 200,
  });

  // Footer Section
  sr.reveal('footer h1', {
    origin: 'bottom',
    distance: '50px',
  });

  sr.reveal('footer ul', {
    origin: 'bottom',
    distance: '50px',
    interval: 200,
  });

  sr.reveal('.fyi_logo', {
    origin: 'bottom',
    distance: '50px',
    interval: 100,
  });
}

initScrollReveal();

document.addEventListener('scrollreveal:after_reveal', function(event) {
  const element = event.detail.target;
  resetAnimation(element);
});
