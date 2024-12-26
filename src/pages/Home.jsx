import Banner from "../components/Banner"
import FeaturedFoods from "../components/FeaturedFoods"
import FoodDonationProcess from "../components/FoodDonationProcess"
import PopularCategories from "../components/PopularCategories"
import SeeAllButton from "../components/SeeAllButton"
import Testimonials from "../components/Testimonials"

function Home() {
    return (
        <div>
            <Banner/>
            <FeaturedFoods/>
            <SeeAllButton/>
            <PopularCategories/>
            <Testimonials/>
            <FoodDonationProcess/>
        </div>
    )
}

export default Home
