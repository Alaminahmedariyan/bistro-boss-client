import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";



const FoodCard = ({item}) => {
    const {name, image, price, recipe,_id} = item;
    const {user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();


    const handleAddToCart = () =>{
      if(user && user.email){
        // send cart item to the database
        const cartItem = {
          menuId:_id,
          email: user.email,
          name,
          image,
          price
        }
        axiosSecure.post('/carts', cartItem)
        .then(res => {
          if(res.data.insertedId){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${name} added to the cart`,
              showConfirmButton: false,
              timer: 1500
            });
            // refetch cart to update cart items count
            refetch();
          }
        })
      }else{
        Swal.fire({
          title: "You are not logged In",
          text: "please login to add to the cart?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "login"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login', {state: {from:location}});
          }
        });
      }
    }
  return (
    <div className="card bg-base-100 w-full shadow-sm">
      <figure> <img src={image} /> </figure>
      <p className="bg-slate-900  absolute right-0 mr-16 mt-4 px-4 text-white">${price}</p>
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions justify-end">
          <button onClick={handleAddToCart} className="btn btn-outline border-0 border-orange-400 border-b-4 mt-4">Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
