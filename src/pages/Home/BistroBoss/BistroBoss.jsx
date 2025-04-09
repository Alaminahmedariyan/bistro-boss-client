import img1 from "../../../assets/home/chef-service.jpg";

const BistroBoss = () => {
  return (
    <>
      <div
        className="hero size-[height:572px] m-5 w-full"
        style={{
            backgroundImage: `url(${img1})`,
          }}

      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-1/2 bg-white text-black">
            <h1 className="mb-5 text-5xl font-bold ">Bistro Boss</h1>
            <p className="mb-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus, libero accusamus laborum deserunt ratione dolor
              officiis praesentium! Deserunt magni aperiam dolor eius dolore at,
              nihil iusto ducimus incidunt quibusdam nemo.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BistroBoss;
