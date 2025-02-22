import React from "react";

const About = () => {
  return (
    <div>
      <div className="flex flex-col items-center gap-5 max-w-7xl mx-auto my-10 px-4">
        <h1 className="text-4xl font-bold my-5 text-center">
          About <span className="text-[#3886c2]">Us</span>
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-5">
          <img
            src="/images/blue.jpg"
            alt="Dream Job"
            className="w-full md:w-1/2 max-w-md rounded-lg shadow-lg"
          />
          <p className="text-center md:text-left text-lg leading-relaxed">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            <br />
            Consectetur illo in, ex quae molestias non.
          </p>
        </div>
      </div>

      <section className="w-[85%] mx-auto px-4">
        <div className="relative w-full h-0 pb-[56.25%]">
          {" "}
          {/* Aspect ratio 16:9 */}
          <iframe
            className="absolute top-0 left-0 w-full h-3/4 p-10"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59038.35288551073!2d91.74500724863283!3d22.357515599999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd8906edac245%3A0x5be1258bce3f55b!2sYunusco%20City%20Centre!5e0!3m2!1sen!2sbd!4v1731519739662!5m2!1sen!2sbd"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default About;
