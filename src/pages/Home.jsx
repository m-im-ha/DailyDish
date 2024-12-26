import Banner from "../components/Banner"
import FeaturedFoods from "../components/FeaturedFoods"
import PopularCategories from "../components/PopularCategories"
import Testimonials from "../components/Testimonials"

function Home() {
    return (
        <div>
            <Banner/>
            <FeaturedFoods/>
            <PopularCategories/>
            <Testimonials/>
        </div>
    )
}

export default Home
