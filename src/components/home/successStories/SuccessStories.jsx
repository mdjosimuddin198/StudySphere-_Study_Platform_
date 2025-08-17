import React from "react";
import { BsStars } from "react-icons/bs";

const successStories = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Frontend Developer",
    story:
      "After completing our bootcamp, Sarah landed her dream job at a leading tech company. She credits the hands-on projects and mentorship for her success.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 2,
    name: "Michael Lee",
    role: "Full-Stack Engineer",
    story:
      "Michael transitioned from a non-tech background to becoming a full-stack engineer. His journey inspires many career changers to pursue coding.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 3,
    name: "Aisha Khan",
    role: "UI/UX Designer",
    story:
      "Aisha enhanced her design and coding skills, which helped her secure a position as a UI/UX Designer at a fast-growing startup.",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
  },
];

export default function SuccessStories() {
  return (
    <section className="py-16 px-6 bg-base-200 rounded-2xl">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Title */}
        <h2 className="mb-6 flex items-center justify-center gap-2 text-center text-3xl font font-bold text-[#00E1FF]">
          <BsStars className="text-4xl animate-pulse" /> Success Stories
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Hear from our amazing students who transformed their careers with us.
        </p>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories.map((story) => (
            <div
              key={story.id}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Avatar */}
              <img
                src={story.image}
                alt={story.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#00E1FF] shadow-md mb-4"
              />

              {/* Name + Role */}
              <h3 className="text-lg font-semibold text-gray-800">
                {story.name}
              </h3>
              <p className="text-[#00E1FF] text-sm">{story.role}</p>

              {/* Story */}
              <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                “{story.story}”
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
