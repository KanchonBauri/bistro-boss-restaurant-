import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import slider1 from '../../../assets/home/slide1.jpg'
import slider2 from '../../../assets/home/slide2.jpg'
import slider3 from '../../../assets/home/slide3.jpg'
import slider4 from '../../../assets/home/slide4.jpg'
import slider5 from '../../../assets/home/slide5.jpg'
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const Category = () => {
    return (
        <div>
            <section className=''>
                <SectionTitle
                    subHeading={"From 11.00am to 10.00pm"}
                    heading={"Order Online"}>
                </SectionTitle>
                {/* <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper mb-20"
            > */}

                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    // breakpoints={{
                    //     640: {
                    //         slidesPerView: 2,
                    //         spaceBetween: 20,
                    //     },
                    //     768: {
                    //         slidesPerView: 4,
                    //         spaceBetween: 40,
                    //     },
                    //     1024: {
                    //         slidesPerView: 5,
                    //         spaceBetween: 50,
                    //     },
                    // }}
                    modules={[Pagination]}
                    className="mySwiper w-3/4 m-20"
                >

                    <SwiperSlide>
                        <img src={slider1} />
                        <h3 className="text-4xl uppercase text-center -mt-20 text-white ">salads</h3>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slider2} />
                        <h3 className="text-4xl uppercase text-center -mt-20 text-white ">Pizza</h3>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slider3} />
                        <h3 className="text-4xl uppercase text-center -mt-20 text-white ">Soups</h3>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slider4} />
                        <h3 className="text-4xl uppercase text-center -mt-20 text-white ">Desserts</h3>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slider5} />
                        <h3 className="text-4xl uppercase text-center  text-white ">salads</h3>
                    </SwiperSlide>
                </Swiper>
            </section>
        </div>
    );
};

export default Category;