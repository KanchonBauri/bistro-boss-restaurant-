import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg'
import './Featured.css'
import { Link } from "react-router-dom";

const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-8 my-20 bg-slate-500 bg-opacity-40">
            <SectionTitle subHeading="check it out" heading="Feature Item"></SectionTitle>
            <div className="md:flex justify-center  items-center py-20 px-36">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>jun 2, 2014</p>
                    <p className="uppercase">Where can i get some</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                    {/* <button to="/order/salad" className="btn btn-outline text-white border-0 border-b-4">Next Items</button> */}
                    <Link to="/order/salad"> <button className="btn btn-outline text-white border-0 border-b-4 mt-4">Order Now</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Featured;