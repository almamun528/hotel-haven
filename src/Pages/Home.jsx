import Carousel from "../Components/Carousel";
import TeamMember from "../Components/TeamMember";
import Hotels from "./Hotels";

const Home = () => {
  return (
    <>
      <Carousel />

      <section className="my-5">
        <h2 className="text-xl font-semibold text-center my-4 underline">
          Rooms We Are Providing $200 In This week!
        </h2>

        <Hotels />
      </section>

      <TeamMember />
    </>
  );
};

export default Home;
