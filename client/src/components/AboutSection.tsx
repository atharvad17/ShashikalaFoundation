import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const AboutSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-light">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
            <p className="text-lg text-gray-700 mb-6">
              Shashikala Foundation is a non-profit organization dedicated to
              spreading joy through visual arts. We aim to empower individuals
              by providing them with artistic skills and a creative outlet for
              self-expression.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Our mission is to make art accessible to everyone, regardless of
              their background or experience level. We believe in the
              transformative power of creativity and its ability to heal,
              connect, and inspire.
            </p>
            <div className="mt-8">
              <Link href="/about">
                <Button className="bg-[#9DD3DD] hover:bg-opacity-90 text-white px-6 py-3 rounded-md font-medium transition-all duration-300">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://i.etsystatic.com/5701942/r/il/d70dfd/397782517/il_fullxfull.397782517_dw8m.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
              alt="Art workshop"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
