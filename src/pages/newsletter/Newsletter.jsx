import React from "react";
import { toast } from "react-toastify";

const Newsletter = () => {
  const handleSubscriber = (e) => {
    e.preventDefault();
    const form = e.target;
    form.reset();

    toast.warn("Stay connected. Exciting features are on the way!");
  };
  return (
    <section className="py-6 px-8  bg-base-200 my-4 rounded-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-5xl font-bold mb-4 text-[#00E1FF]">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Stay updated with the latest freelance projects, platform updates, and
          exclusive offers. Join our community now!
        </p>
      </div>

      <form
        onSubmit={handleSubscriber}
        className="flex flex-col md:flex-row items-center justify-center gap-4"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="input input-bordered w-full max-w-md"
          required
        />
        <button
          type="submit"
          className="btn bg-[#00E1FF]  text-white font-semibold px-6 py-3 transition w-full md:w-auto"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
