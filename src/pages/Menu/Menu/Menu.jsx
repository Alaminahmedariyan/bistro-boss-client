import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from "../../../assets/menu/banner3.jpg";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import soupImg from "../../../assets/menu/soup-bg.jpg";
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const offered = menu.filter(item => item.category === 'offered');
  return (
    <div className="p-5">
      <Helmet>
        <title>Bistro Boss | Menu</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <Cover img={menuImg} title={"our menu"}></Cover>
      {/*main cover*/}
      <SectionTitle subHeading={"Don't Miss"} heading={"Today's Offer"}></SectionTitle>
      {/*offered menu items*/}
      <MenuCategory items={offered}></MenuCategory>
      {/* dessert menu items */}
      <MenuCategory items={dessert} title={"dessert"} img={dessertImg}></MenuCategory>
      {/* dessert menu items */}
      <MenuCategory items={pizza} title={"pizza"} img={pizzaImg}></MenuCategory>
      {/* salad menu items */}
      <MenuCategory items={salad} title={"salad"} img={saladImg}></MenuCategory>
      {/* salad menu items */}
      <MenuCategory items={soup} title={"soup"} img={soupImg}></MenuCategory>
    </div>
  );
};

export default Menu;
