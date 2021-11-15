const displayNavbar = () => {
  const navbar = document.createElement('nav');

  const navBrand = document.createElement('div');
  navBrand.classList.add('nav-brand');

  const navLink = document.createElement('a');
  navLink.classList.add('f3');
  navLink.href = '#';
  navLink.textContent = 'Go Buy Milk';

  navbar.appendChild(navBrand);
  navBrand.appendChild(navLink);

  return navbar;
}

export { displayNavbar };