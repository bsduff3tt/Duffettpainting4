import React from "react";
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import ImagesearchRollerIcon from '@mui/icons-material/ImagesearchRoller';

function Header() {
  return (
    <header>
      <h1 class="text-center col-lg-8 mx-auto"><FormatPaintIcon /> Duffett Brother's Painting <ImagesearchRollerIcon /></h1>
      <a style={{color: "black", paddingRight: "4%"}} href="./gallery.html">Our Gallery</a>
      <a style={{color: "black"}} href="./reviews.html">Testimonials</a>
      <a style={{color: "black", paddingLeft: "57%"}} href="./services.html">Services</a>
      <a style={{color: "black", paddingLeft: "4%"}} href="./aboutus.html">About us</a>
    </header>
  );
}

export default Header;
