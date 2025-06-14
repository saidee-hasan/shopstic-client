import review_image from "../../../assets/Main/Review/ribbon_star_award.png";
const ReviewHeroSection = () => {
  return (
    <div className="mt-[60px] my_container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-5 items-center justify-center grid-flow-dense">
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold">Customer reviews</h1>
          <p className="text-justify leading-loose text-lg hidden lg:block">
            {` Welcome to our customer review page, where you can discover genuine
            feedback from people who have experienced our products and services.
            We take pride in offering high-quality products and exceptional
            service, and our customers’ reviews reflect the commitment we make
            to their satisfaction. Whether it's product performance, delivery
            speed, or customer support, these reviews highlight why so many
            choose us. Take a moment to read through and see how we’ve helped
            others make informed decisions, and why they continue to shop with
            us.`}
          </p>
          <p className="block lg:hidden text-justify leading-loose text-lg">
            Read genuine reviews from our satisfied customers. Discover why
            people love our products, fast delivery, and excellent customer
            service. These honest insights will help you make informed decisions
            and show why so many choose us for their shopping needs. Your
            satisfaction is our priority!
          </p>
        </div>
        <div className="order-first md:order-last lg:order-none flex items-center justify-center p-10">
          <img className="w-9/12 lg:w-full" src={review_image} alt="review_image" />
        </div>
      </div>
    </div>
  );
};

export default ReviewHeroSection;
