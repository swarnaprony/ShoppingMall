import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p class="text-center fixed-bottom">Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;