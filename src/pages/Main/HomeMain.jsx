import React, { useState, useRef, useEffect } from "react";
import MySwiper from "./MySwiper";
import ReviewSwiper from "./ReviewSwiper";
import PublicModal from "../../components/PublicModal";
import axios from "axios";
import Badoo from "./components/Badoo";

export default function HomeMain() {
 
  return (
    <div className="two__section pt-10">
      <section className="first">
        <div className="container">
          <div className="first__items">
            <MySwiper />
          </div>
        </div>
      </section>
      <Badoo />
      <section className="second pt-20">
        <div className="container">
          <div className="second__items">
            <div className="second__items-title">
              <h2 className="font-mont  text-2xl text-white   max-w-20 w-full mx-auto">
                ОТЗЫВЫ
              </h2>
            </div>

            <div className="review-items">
              <ReviewSwiper />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
