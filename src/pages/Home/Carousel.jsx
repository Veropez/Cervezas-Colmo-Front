import { useEffect, useState } from "react";
import Container from "../../components/shared/Container";
import CarouselItem from "./CarouselItem";
import { getCervezas } from "../../components/axios/api";

function handlerMOuseDown(e) {
  e.preventDefault();
  const carousel = document.querySelector(".h-carousel_products");
  let isDown = false;
  let startX;
  let scrollLeft;
  carousel.addEventListener("mousedown", (e) => {
    isDown = true;
    carousel.classList.add("active");
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });
  carousel.addEventListener("mouseleave", () => {
    isDown = false;
    carousel.classList.remove("active");
  });
  carousel.addEventListener("mouseup", () => {
    isDown = false;
    carousel.classList.remove("active");
  });
  carousel.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 3;
    carousel.scrollLeft = scrollLeft - walk;
  });
}

function handleLeft() {
  const carousel = document.querySelector(".h-carousel_products");
  const firstChild = carousel.firstElementChild;
  carousel.scrollLeft -= firstChild.offsetWidth;
}

function handleRight() {
  const carousel = document.querySelector(".h-carousel_products");
  const firstChild = carousel.firstElementChild;
  carousel.scrollLeft += firstChild.offsetWidth;
}

function Carousel() {
  const [cervezas, setCervezas] = useState([]);

  useEffect(() => {
    getCervezas()
      .then((res) => res.data)
      .then((data) => setCervezas(data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => console.log(cervezas), [cervezas]);
  return (
    <Container>
      <div className="hs-caro">
        <div className="hs-carousel-1">
          <div className="hs-car-icons">
            <img src="/images/icon-detalle_6.png" alt="" />
            <img src="/images/icon-detalle_5.png" alt="" />
          </div>
          <h1>Descubre Nuestra Cervezas</h1>
          <p>
            Explora un mundo de sabor con nuestras cervezas artesanales únicas. Descubre la pasión y la calidad en cada sorbo, disponible ahora para tu disfrute.
          </p>
        </div>
        <div className={"h-carousel_container"} onMouseDown={handlerMOuseDown}>
          <div className={"hs-caro-controller"}>
            <button onClick={handleLeft}>
              <img src="/images/arrow-cervezas_4.png" alt="" />
            </button>
          </div>
          <div className={"h-carousel_products"}>
            {cervezas.map((item) => (
              <CarouselItem key={item._id} cerveza={item} />
            ))}
          </div>
          <div className={"hs-caro-controller"}>
            <button onClick={handleRight}>
              <img src="/images/arrow-cervezas_3.png" alt="" />
            </button>
          </div>
        </div>
        <div className="hs-carousel-2">
          <button>Ver más cervezas</button>
        </div>
      </div>
    </Container>
  );
}

export default Carousel;