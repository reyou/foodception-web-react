import { Col, Row, Stack } from "react-bootstrap";
import HomeRecipeCategories from "./home.recipeCategories";
import HomeDiets from "./home.diets";
import MealCategories from "../mealCategories.page";
import TrendingRecipeVideos from "./home.videos";

export default function Home() {
    return (
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
    );
}