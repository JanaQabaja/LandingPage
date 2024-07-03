document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.section');
  const navList = document.getElementById('nav-list');
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  // Build the navigation menu
  sections.forEach(section => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.textContent = section.getAttribute('data-nav');
      link.href = `#${section.id}`;
      link.classList.add('nav-link');
      listItem.appendChild(link);
      navList.appendChild(listItem);
  });

  // Set initial active state for the first section and link
  const firstLink = document.querySelector(`a[href="#${sections[0].id}"]`);
  sections[0].classList.add('active');
  firstLink.classList.add('active');

  // Function to check if an element is in the viewport
  const isInViewport = (element) => {
      const rect = element.getBoundingClientRect();
      return (rect.top >= 0 && rect.top < window.innerHeight * 0.5);
  };

  // Function to set the active class to the section in the viewport
  const makeActive = () => {
      sections.forEach(section => {
          const link = document.querySelector(`a[href="#${section.id}"]`);
          if (isInViewport(section)) {
              section.classList.add('active');
              link.classList.add('active');
          } else {
              section.classList.remove('active');
              link.classList.remove('active');
          }
      });
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
      resetFirstLinkStyles();
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

  // Initial call to set the active section and toggle button visibility
  makeActive();
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollTopBtn.style.display = 'block';
  } else {
      scrollTopBtn.style.display = 'none';
  }
});
