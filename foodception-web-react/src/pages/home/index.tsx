import { Col, Row, Stack } from "react-bootstrap";
import HomeRecipeCategories from "./home.recipeCategories";
import HomeDiets from "./home.diets";
import MealCategories from "../mealCategories.page";
import TrendingRecipeVideos from "./home.videos";
import SplitImages from "../../components/splitImages/SplitImages";
import { WebRoutes } from "../../constants/WebRoutes";
import LeftOverlay from "../../components/splitImages/LeftOverlay";
import RightOverlay from "../../components/splitImages/RightOverlay";

export default function Home() {
    const leftImageUrl = "https://static.wixstatic.com/media/11062b_86180aef421e4fcf8bbba0558845383d~mv2.jpg/v1/fill/w_1665,h_1520,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/11062b_86180aef421e4fcf8bbba0558845383d~mv2.jpg";
    const rightImageUrl = "https://static.wixstatic.com/media/11062b_363ed5450c73433caa37171e6b9a30a8~mv2.jpeg/v1/fill/w_1699,h_1377,al_c,q_90,enc_avif,quality_auto/11062b_363ed5450c73433caa37171e6b9a30a8~mv2.jpeg";

    return (
        <Stack gap={5}>
            <SplitImages
                leftImage={leftImageUrl}
                rightImage={rightImageUrl}
                leftOverlay={<LeftOverlay />}
                rightOverlay={<RightOverlay buttonLink={WebRoutes.Recipe.Videos.Base} />}
            />
            <Row>
                <Col>
                    <Stack gap={5}>
                        <HomeRecipeCategories />
                        <HomeDiets />
                        <MealCategories />
                        <TrendingRecipeVideos />
                    </Stack>
                </Col>
            </Row>
        </Stack>
    );
}