import { Col, Row, Stack, Button } from "react-bootstrap";
import HomeRecipeCategories from "./home.recipeCategories";
import HomeDiets from "./home.diets";
import MealCategories from "../mealCategories.page";
import TrendingRecipeVideos from "./home.videos";
import SplitImages from "../../components/splitImages/SplitImages";
import { Link } from "react-router-dom";
import { WebRoutes } from "../../constants/WebRoutes";
import { FrontEndUtils } from "../../utils/FrontEndUtils";

export default function Home() {
    const leftImageUrl = "https://static.wixstatic.com/media/11062b_86180aef421e4fcf8bbba0558845383d~mv2.jpg/v1/fill/w_1665,h_1520,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/11062b_86180aef421e4fcf8bbba0558845383d~mv2.jpg";
    const rightImageUrl = "https://static.wixstatic.com/media/11062b_363ed5450c73433caa37171e6b9a30a8~mv2.jpeg/v1/fill/w_1699,h_1377,al_c,q_90,enc_avif,quality_auto/11062b_363ed5450c73433caa37171e6b9a30a8~mv2.jpeg";

    // Sample overlay components
    const leftOverlay = (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '80px 60px',
            color: 'white',
            height: '100%'
        }}>
            <div>
                <h1 style={{
                    fontSize: 'clamp(3rem, 5vw, 5rem)',
                    fontWeight: '300',
                    lineHeight: '1.1',
                    marginBottom: '0',
                    textShadow: '1px 1px 3px rgba(0,0,0,0.3)'
                }}>Discover</h1>
                <h1 style={{
                    fontSize: 'clamp(3rem, 5vw, 5rem)',
                    fontWeight: '300',
                    lineHeight: '1.1',
                    marginBottom: '0',
                    textShadow: '1px 1px 3px rgba(0,0,0,0.3)'
                }}>Delicious</h1>
                <h1 style={{
                    fontSize: 'clamp(3rem, 5vw, 5rem)',
                    fontWeight: '300',
                    lineHeight: '1.1',
                    textShadow: '1px 1px 3px rgba(0,0,0,0.3)'
                }}>ness</h1>
            </div>
            <div style={{
                marginTop: '30px'
            }}>
                <span style={{
                    display: 'inline-block',
                    padding: 'clamp(8px, 1vw, 10px) clamp(15px, 2vw, 20px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    color: '#333',
                    fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
                    fontWeight: '500',
                    letterSpacing: '0.5px',
                    borderRadius: '2px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                    Join The Food Conversation
                </span>
            </div>
        </div>
    );

    const rightOverlay = (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            height: '100%'
        }}>
            <div style={{
                color: 'white',
                maxWidth: 'clamp(300px, 80%, 500px)',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                padding: 'clamp(15px, 3vw, 25px)',
                borderRadius: '5px',
                margin: '0 50px 20px'
            }}>
                <p style={{
                    fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                    lineHeight: '1.6',
                    marginBottom: 'clamp(15px, 3vw, 20px)',
                    fontWeight: '400',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                }}>
                    Get inspired by our collection of cooking videos featuring the latest trends,
                    innovative techniques, and mouth-watering recipes. From quick and easy meals
                    to elaborate dishes, our videos have something for everyone.
                </p>
                <Link to={WebRoutes.Recipe.Videos.Base}>
                    <Button
                        variant="danger"
                        onClick={(event) => FrontEndUtils.handleLinkClick(event, WebRoutes.Recipe.Videos.Base)}
                        size="lg"
                        style={{
                            backgroundColor: '#b85a4d',
                            border: 'none',
                            padding: 'clamp(8px, 1.5vw, 10px) clamp(20px, 3vw, 30px)',
                            fontWeight: '600',
                            fontSize: 'clamp(0.9rem, 1.2vw, 1rem)'
                        }}
                    >
                        Watch Now
                    </Button>
                </Link>
            </div>
        </div>
    );

    return (
        <Stack gap={5}>
            <SplitImages
                leftImage={leftImageUrl}
                rightImage={rightImageUrl}
                leftOverlay={leftOverlay}
                rightOverlay={rightOverlay}
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