import Carousel from "react-bootstrap/Carousel";

const CustomCarousel = () => {
  return (
    <div className="mt-28 mb-8 self-center w-[70%] h-[60vh]">
      <Carousel>
        <Carousel.Item>
          <img
            className="w-full h-96 object-cover rounded-xl"
            src="https://images.pexels.com/photos/6068960/pexels-photo-6068960.jpeg?_gl=1*6es6zl*_ga*MjUzMjUzNTY0LjE3NjEyODk0MTk.*_ga_8JE65Q40S6*czE3NjQ1MTkzOTAkbzIkZzEkdDE3NjQ1MjA0MTgkajM2JGwwJGgw"
            alt="Slide 1"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="w-full h-96 object-cover rounded-xl"
            src="https://images.pexels.com/photos/1884579/pexels-photo-1884579.jpeg?_gl=1*18xn2ng*_ga*MjUzMjUzNTY0LjE3NjEyODk0MTk.*_ga_8JE65Q40S6*czE3NjQ1MTkzOTAkbzIkZzEkdDE3NjQ1MjA0MTgkajM2JGwwJGgw"
            alt="Slide 2"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="w-full h-96 object-cover rounded-xl"
            src="https://firebasestorage.googleapis.com/v0/b/lokesh-vishnu-consignment.appspot.com/o/Carousel%20Images%2F2.jpeg?alt=media&token=ca95742b-98c5-4681-9be8-1672dcd4540c"
            alt="Slide 3"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
