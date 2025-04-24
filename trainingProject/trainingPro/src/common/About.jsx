// AboutUs.jsx
import { useEffect, useState } from "react";

const About = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Fetch team members
  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=4")
      .then(res => res.json())
      .then(data => {
        const mapped = data.users.map(user => ({
          name: `${user.firstName} ${user.lastName}`,
          role: user.company?.title || "Team Member",
          bio: user.company?.department || "Dedicated professional",
          image: user.image || "https://via.placeholder.com/300"
        }));
        setTeamMembers(mapped);
      });
  }, []);

  // Fetch testimonials
  useEffect(() => {
    fetch("https://dummyjson.com/quotes?limit=3")
      .then(res => res.json())
      .then(data => {
        const mapped = data.quotes.map(quote => ({
          quote: quote.quote,
          author: quote.author,
          location: "Nepal" // dummyjson doesn’t provide location, so this is static
        }));
        setTestimonials(mapped);
      });
  }, []);

  const timelineEvents = [
    { year: "2018", description: "Founded in Kathmandu with a focus on smartphones and accessories" },
    { year: "2020", description: "Expanded product range to include laptops and computer peripherals" },
    { year: "2022", description: "Opened our flagship experience center in Durbar Marg" },
    { year: "2024", description: "Serving 50,000+ customers with nationwide delivery" }
  ];

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About ElectroMart</h1>
            <p className="text-xl max-w-2xl">
              Bringing premium electronics to Nepal since 2018. We're passionate about technology 
              and committed to providing an exceptional shopping experience.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        {/* Our Story */}
        <section className="mb-20 pt-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Story</h2>
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <p className="mb-4">
                In 2018, our founder noticed a gap in Nepal's electronics market. While demand for quality electronics was growing, the shopping experience was often frustrating.
              </p>
              <p className="mb-4">
                ElectroMart was born from a simple idea: create an online electronics store that treats customers the way we'd want to be treated — with transparency, quality products, and exceptional service.
              </p>
              <p>
                Starting with just 50 products and a small warehouse in Kathmandu, we've since grown to offer thousands of premium electronics while maintaining our commitment to customer satisfaction.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="border-l-4 border-blue-600 pl-6 space-y-8">
                {timelineEvents.map((event, index) => (
                  <div key={index}>
                    <div className="flex items-center">
                      <div className="bg-blue-600 rounded-full w-4 h-4 -ml-8"></div>
                      <span className="text-xl font-bold ml-4">{event.year}</span>
                    </div>
                    <p className="mt-2">{event.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Team */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/300";
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-blue-600 mb-2">{member.role}</p>
                  <p className="text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
            <div className="bg-white p-8 rounded-lg shadow">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                  <div className="text-5xl text-blue-600 mb-4">"</div>
                  <p className="text-xl italic mb-6">{testimonials[activeTestimonial].quote}</p>
                  <p className="font-bold text-lg">{testimonials[activeTestimonial].author}</p>
                  <p className="text-gray-600">{testimonials[activeTestimonial].location}</p>
                </div>
                <div className="flex justify-center space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === activeTestimonial ? "bg-blue-600" : "bg-gray-300"
                      }`}
                      aria-label={`View testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience ElectroMart?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Browse our selection of premium electronics with confidence, knowing you're shopping with Nepal's most trusted online electronics retailer.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/products" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100">
              Shop Now
            </a>
            <a href="/contact" className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700">
              Contact Us
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
