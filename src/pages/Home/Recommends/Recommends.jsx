import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import recommendImg from '../../../assets/home/slide1.jpg'
const Recommends = () => {
    return (
        <div className="  ">
            <SectionTitle
                subHeading="-----Should Try-----" heading="CHEF RECOMMENDS"
            ></SectionTitle>
            <div className="flex  w-10/12 gap-8 justify-center mx-auto">
                <div className="card h-96 w-80 bg-gray-300 grid grid-cols-1">
                    <figure className=" ">
                        <img className="max-h-96 w-80  " src={recommendImg} alt="Shoes" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Caeser Salad</h2>
                        <p>Lettuce, Eggs, Parmesan Cheese, Chicken</p>
                        <div className="card-actions">
                            <button className="btn btn-outline bg-slate-100 text-yellow-500 border-0 border-b-4">ADD TO CART</button>
                        </div>
                    </div>
                </div>
                <div className="card h-96 w-80 bg-gray-300 grid grid-cols-1">
                    <figure className=" ">
                        <img className="max-h-96 w-80  " src={recommendImg} alt="Shoes" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Caeser Salad</h2>
                        <p>Lettuce, Eggs, Parmesan Cheese, Chicken</p>
                        <div className="card-actions">
                            <button className="btn btn-outline bg-slate-100 text-yellow-500 border-0 border-b-4">ADD TO CART</button>
                        </div>
                    </div>
                </div>
                <div className="card h-96 w-80 bg-gray-300 grid grid-cols-1">
                    <figure className=" ">
                        <img className="max-h-96 w-80  " src={recommendImg} alt="Shoes" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Caeser Salad</h2>
                        <p>Lettuce, Eggs, Parmesan Cheese, Chicken</p>
                        <div className="card-actions">
                            <button className="btn btn-outline bg-slate-100 text-yellow-500 border-0 border-b-4">ADD TO CART</button>
                        </div>
                    </div>
                </div>
               </div>
        </div>
    );
};

export default Recommends;