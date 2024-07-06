import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular')
    // const [menu, setMenu] = useState([]);
    // useEffect(() => {
    //     fetch('menu.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             const popularItems = data.filter(item => item.category === 'popular')
    //             setMenu(popularItems)
    //         })
    // }, [])
    return (
        <section className="mb-12 justify-center ">
            <SectionTitle
                heading="From Our Menu"
                subHeading="Popular Items">
            </SectionTitle>
            <div className="grid md:grid-cols-2 gap-10 md:mx-20 ">
                {
                    popular.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <div className="text-center mt-8 " >
                <button className="btn btn-outline border-0 border-b-4 ">View full Menu</button>
            </div>

            <div className="bg-black w-10/12 h-32 grid justify-items-center mx-24 my-10  ">
                <p className="text-2xl text-white flex
                items-center ">Call Us : 01789147898</p>
            </div>

        </section>
    );
};

export default PopularMenu;