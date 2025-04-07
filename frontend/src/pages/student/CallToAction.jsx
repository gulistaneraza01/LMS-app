import { assets } from "../../assets/assets";

function CallToAction() {
  return (
    <div className="text-center my-24 sm:my-30 ">
      <h3 className="text-2xl md:text-3xl text-gray-800 font-medium">
        Learn anything, anytime, anywhere
      </h3>
      <p className="text-sm md:text-base text-gray-500 m-4">
        Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id
        veniam aliqua proident excepteur commodo do ea.
      </p>
      <div className="flex mt-9 justify-center items-center gap-8">
        <button className="bg-blue-600 px-6 py-2 sm:px-10 sm:py-3 text-white rounded  cursor-pointer">
          Get started
        </button>
        <div className="flex items-center gap-2 cursor-pointer">
          <button className="font-semibold cursor-pointer">Learn more</button>
          <img src={assets.arrow_icon} alt="arrow right" />
        </div>
      </div>
    </div>
  );
}

export default CallToAction;
