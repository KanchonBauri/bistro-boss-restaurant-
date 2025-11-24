import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import drinkImg from '../../../assets/menu/banner3.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCaregory/MenuCategory';

const Menu = () => {
    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const drink = menu.filter(item => item.category === 'drinks')
    const offered = menu.filter(item => item.category === 'offered')
    return (
        <div>
            <Helmet>
                <title>Bistro | Menu</title>
            </Helmet>
            {/* <Cover img={drinkImg} title="our menu"></Cover> */}
            {/* main cover  */}
            {/* <SectionTitle subHeading="Don't Miss" heading="Today's Offer" ></SectionTitle> */}
            {/* offered meu items  */}
           <MenuCategory items={offered} title={"offerd"} subTitle={"Grab the best deals before theyre gone!"} img={drinkImg}></MenuCategory>
            {/* dessert menu items  */}
            <MenuCategory items={drink} title={"drink"} subTitle={"Sip the freshness, taste the delight!"} img={drinkImg}></MenuCategory>
            <MenuCategory items={desserts} title="dessert" subTitle={"Every bite of dessert is a little piece of heaven!"} img={dessertImg}></MenuCategory>
            <MenuCategory items={pizza} title={"pizza"} subTitle={"Life is better with a slice of pizza in hand!"} img={pizzaImg}></MenuCategory>
            <MenuCategory items={salad} title={"salad"} subTitle={"Stay fresh, eat salad — your body will thank you!"} img={saladImg}></MenuCategory>
            <MenuCategory items={soup} title={"soup"} subTitle={"Warm your soul with a bowl of hearty soup."} img={soupImg}></MenuCategory>
        </div>
    );
};

export default Menu;