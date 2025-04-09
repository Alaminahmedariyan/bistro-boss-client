

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="md:w-5/12 mx-auto my-8">
            <p className="text-yellow-600 text-center mb-2">---{subHeading}---</p>
            <h3 className="text-4xl uppercase text-center border-y-4 py-4 ">{heading}</h3>
            
        </div>
    );
};

export default SectionTitle;