import React from "react";
import s from "./imageGalleryItem.module.css";

const ImageGalleryItem = ({ id, src, bigImg }) => {
  return (
      <li className={s.ImageGalleryItem} key={id} id={id}>
        <img
          className={s.ImageGalleryItemImage}
          src={src}
          alt="something goes here"
          data-img={bigImg}
        />
      </li>
  );
};

export default ImageGalleryItem;