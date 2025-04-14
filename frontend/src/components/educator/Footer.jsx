import { assets } from "../../assets/assets";

function Footer() {
  return (
    <footer className="border-t border-gray-500 px-10 py-6 ">
      <div className="flex flex-col-reverse items-center gap-3 sm:flex-row sm:justify-between ">
        <div className="flex items-center gap-2 sm:gap-4 text-gray-500 ">
          <img src={assets.logo} alt="logo" className="max-sm:w-20" />
          <span>|</span>
          <p className="text-xs sm:text-base">
            All right reserved. Copyright @Raza
          </p>
        </div>
        <div className="flex items-center gap-3 ">
          <a href="#">
            <img
              src={assets.facebook_icon}
              alt="facebook"
              className="max-sm:w-6 max-sm:h-6"
            />
          </a>
          <a href="#">
            <img
              src={assets.twitter_icon}
              alt="twitter"
              className="max-sm:w-6 max-sm:h-6"
            />
          </a>
          <a href="#">
            <img
              src={assets.instagram_icon}
              alt="instagram"
              className="max-sm:w-6 max-sm:h-6"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
