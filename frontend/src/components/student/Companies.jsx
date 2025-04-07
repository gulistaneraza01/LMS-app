import { assets } from "../../assets/assets";

function Companies() {
  return (
    <div className="my-20 sm:my-25 text-center">
      <p className="text-gray-500 text-base mb-5 sm:mb-9">
        Trusted by learners from
      </p>
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-16">
        <img
          src={assets.microsoft_logo}
          alt="microsoft_logo"
          className="w-20 md:w-28"
        />
        <img
          src={assets.walmart_logo}
          alt="walmart_logo"
          className="w-20 sm:26 md:w-28"
        />
        <img
          src={assets.accenture_logo}
          alt="accenture_logo"
          className="w-20 md:w-28"
        />
        <img
          src={assets.adobe_logo}
          alt="adobe_logo"
          className="w-20 md:w-28"
        />
        <img
          src={assets.paypal_logo}
          alt="paypal_logo"
          className="w-20 md:w-28"
        />
      </div>
    </div>
  );
}

export default Companies;
