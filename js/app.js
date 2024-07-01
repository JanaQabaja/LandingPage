document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('section');
  const navList = document.getElementById('navbar__list');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  // Build the navigation menu
  sections.forEach(section => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.textContent = section.getAttribute('data-nav');
    link.href = `#${section.id}`;
    link.classList.add('menu__link');
    listItem.appendChild(link);
    navList.appendChild(listItem);
  });

  // Set initial background color for first section link
  const firstLink = document.querySelector(`a[href="#${sections[0].id}"]`);
  sections[0].classList.add('your-active-class');
  firstLink.classList.add('active');

  // Function to check if an element is in the viewport
  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (rect.top >= 0 && rect.top < window.innerHeight * 0.5);
  };

  // Function to set the active class to the section in the viewport
  const makeActive = () => {
    let activeSection;
    sections.forEach(section => {
      const link = document.querySelector(`a[href="#${section.id}"]`);
      if (isInViewport(section)) {
        section.classList.add('your-active-class');
        link.classList.add('active');
        // Change text color and background of active link
        activeSection = section;
      } else {
        section.classList.remove('your-active-class');
        link.classList.remove('active');
      }
    });
    return activeSection;
  };

  // Scroll to section when clicking on nav link
  const scrollToSection = (event) => {
    event.preventDefault();
    const targetId = event.target.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to top button functionality
  scrollTopBtn.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    resetFirstLinkStyles(); // Reset first link styles after scrolling to top
  });

  // Function to reset styles of the first link in the navigation
  const resetFirstLinkStyles = () => {
    if (!isInViewport(sections[0])) {
      firstLink.classList.remove('active');
    }
  };

  // Event listeners
  document.addEventListener('scroll', makeActive);
  navList.addEventListener('click', scrollToSection);

  // Show or hide the scroll to top button
  window.onscroll = () => {
    scrollTopBtn.style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? 'block' : 'none';
  };
});
