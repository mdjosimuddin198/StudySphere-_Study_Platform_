import React from "react";

const FAQ_Section = () => {
  return (
    <section className="py-12 bg-base-100">
      <div className=" mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 text-cyan-600">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 text-left">
          {/* FAQ 1 */}
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="faq-accordion" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              How can I book a study session?
            </div>
            <div className="collapse-content">
              <p>
                After logging in, you can easily browse available tutors and
                schedule your preferred session through the booking dashboard.
              </p>
            </div>
          </div>

          {/* FAQ 2 */}
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-xl font-medium">
              Is the platform free to use?
            </div>
            <div className="collapse-content">
              <p>
                Yes, StudySphere is free for students. Some premium sessions
                offered by top tutors may require a small fee.
              </p>
            </div>
          </div>

          {/* FAQ 3 */}
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-xl font-medium">
              How can I share study materials?
            </div>
            <div className="collapse-content">
              <p>
                You can upload files directly to your dashboard and share them
                with your selected study group or tutor.
              </p>
            </div>
          </div>

          {/* FAQ 4 */}
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-xl font-medium">
              Can I contact tutors directly?
            </div>
            <div className="collapse-content">
              <p>
                Yes, you can chat with tutors in real-time using our in-built
                messaging system after booking a session.
              </p>
            </div>
          </div>

          {/* FAQ 5 */}
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-xl font-medium">
              How do administrators manage the platform?
            </div>
            <div className="collapse-content">
              <p>
                Administrators can approve sessions, manage user roles, and
                monitor platform activities from the admin dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ_Section;
