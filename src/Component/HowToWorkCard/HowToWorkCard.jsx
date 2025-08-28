const HowToWorkCard = ({ image, title, description }) => {
  return (
    <div className="md:w-[45%]  flex items-center gap-4 p-4 backdrop-blur-md border-[1px] rounded-lg howWork z-10 mx-auto md:mx-0">
      <div className="left">
        <img src={image} alt="" className=" object-cover rounded-l-md" />
      </div>
      <div className="right text-left text-black ">
        <h1 className=" font-bold text-xl text-[#0675C1] mb-2">{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default HowToWorkCard;
