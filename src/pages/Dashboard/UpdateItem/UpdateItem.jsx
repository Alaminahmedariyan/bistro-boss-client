import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaUtensils } from "react-icons/fa";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
      const { register, handleSubmit, reset} = useForm();
    const {name, category, recipe, price, _id} = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
      console.log(data);
      // image upload to imgbb and then get an url
      const imageFile = { image: data.image[0] };
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        // now send the menu item data to the server with the image url
        const menuItem = {
          name: data.name,
          category: data.category,
          price: parseFloat(data.price),
          recipe: data.recipe,
          image: res.data.data.display_url,
        };
        //
        const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
        if (menuRes.data.modifiedCount > 0) {
          // show success popup
          reset()
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${data.name} is updated to the menu.`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    };
    return (
        <div>
            <SectionTitle heading={'Update an Item'} subHeading={'Refresh Info'}></SectionTitle>
            <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <fieldset className="fieldset">
                        <legend className="fieldset-legend">Recipe Name*</legend>
                        <input
                        defaultValue={name}
                          type="text"
                          className="input w-full"
                          placeholder="Recipe Name"
                          {...register("name", { required: true })}
                        />
                      </fieldset>
                      <div className="flex gap-6">
                        <div className="form-control w-full">
                          <legend className="fieldset-legend">Recipe Name*</legend>
                          <select
                            defaultValue={category}
                            {...register("category", { required: true })}
                            className="select select-bordered w-full"
                            placeholder="Category"
                          >
                            <option disabled selected value={"default"}>
                              Category
                            </option>
                            <option value="salad">Salad</option>
                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="dessert">Dessert</option>
                            <option value="drinks">Drinks</option>
                          </select>
                        </div>
                        <div className="form-control w-full">
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend">Price*</legend>
                            <input
                            defaultValue={price}
                              type="text"
                              className="input w-full"
                              placeholder="Number"
                              {...register("Price", { required: true })}
                            />
                          </fieldset>
                        </div>
                      </div>
                      <fieldset className="fieldset">
                        <legend className="fieldset-legend">Recipe Details</legend>
                        <textarea
                        defaultValue={recipe}
                          {...register("recipe", { required: true })}
                          className="textarea h-24 w-full"
                          placeholder="Recipe Details"
                        ></textarea>
                      </fieldset>
                      <div className="form-control w-full">
                        <input
                          {...register("image", { required: true })}
                          type="file"
                          className="file-input"
                        />
                      </div>
                      <button className="btn">
                        Update Menu Item <FaUtensils></FaUtensils>
                      </button>
                    </form>
                  </div>
        </div>
    );
};

export default UpdateItem;