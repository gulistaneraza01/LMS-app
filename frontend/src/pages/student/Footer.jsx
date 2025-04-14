import { assets } from "../../assets/assets";

function Footer() {
  return (
    <footer className="container text-gray-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between  gap-20 text-sm py-10">
        <div>
          <img src={assets.logo_dark} alt="logo image" />
          <p className="mt-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-semibold mb-6">Company</h3>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact us</a>
          <a href="#">Privacy policy</a>
        </div>
        <div>
          <h3 className="text-base font-semibold mb-6">
            Subscribe to our newsletter
          </h3>
          <p className="my-4">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              className="shadow border border-gray-600 outline-none text-gray-200 w-50   px-2 py-2 rounded bg-gray-700 placeholder-gray-500"
              required
              placeholder="Enter you email"
              autoComplete="off"
            />
            <input
              type="submit"
              value="Subscribe"
              className="bg-blue-600 px-6 py-2  text-white rounded  cursor-pointer"
            />
          </form>
        </div>
      </div>
      <div className="text-center">
        <hr />
        <p className="py-6 text-gray-500 text-xs sm:text-base">
          Copyright 2025 © Raza. All Right Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
