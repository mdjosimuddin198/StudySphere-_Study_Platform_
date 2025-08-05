import { FaCalendarCheck, FaHandshake, FaDesktop } from "react-icons/fa";

const WhyChooseUs = () => {
  const steps = [
    {
      title: "Book Free Consultation",
      description:
        "Standards in leadership skills synergize optimal expertise rather than innovative leadership skills.",
      icon: <FaDesktop className="text-white text-2xl" />,
      image: "https://i.ibb.co.com/v4T4vBJW/image.png",
    },
    {
      title: "Make Easy Payment",
      description:
        "Standards in leadership skills synergize optimal expertise rather than innovative leadership skills.",
      icon: <FaHandshake className="text-white text-2xl" />,
      image: "https://i.ibb.co.com/KcQCqxmC/image.png",
    },
    {
      title: "Schedule First Lesson",
      description:
        "Standards in leadership skills synergize optimal expertise rather than innovative leadership skills.",
      icon: <FaCalendarCheck className=" text-2xl" />,
      image:
        "https://wp.rrdevs.net/edcare/wp-content/uploads/2024/12/promo-img-3.png",
    },
  ];

  return (
    <section className="my-4">
      <div className="flex items-center justify-center mt-6">
        <button className="btn bg-[#00acc1] rounded-2xl ">Why Choose Us</button>
      </div>
      <h2 className="text-[#00acc1] mb-6 py-6 text-3xl text-center font-bold">
        Explore Yourself All Over The World
      </h2>
      <div className="bg-base-200 my-4 py-16 px-4 e">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-600">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 px-6 py-8 text-center space-y-6">
              <div className="relative w-40 h-40 mx-auto">
                <img
                  src={step.image}
                  alt={step.title}
                  className="rounded-full w-full h-full object-cover"
                />
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-[#00acc1] w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl  font-bold text-[#00acc1]">
                {step.title}
              </h3>
              <p className="0 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
