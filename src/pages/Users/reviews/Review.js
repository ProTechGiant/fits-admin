import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SplashScreen from "../../../modules/Partials/SplashScreen";
import "./Review.css";
const Review = () => {
  const { loading, reviews } = useSelector((state) => state.userData);

  const [usersReviews, setUsersReviews] = useState();
  const [fiveRating, setFiveRating] = useState(0);
  const [fourRating, setFourRating] = useState(0);
  const [threeRating, setThreeRating] = useState(0);
  const [twoRating, setTwoRating] = useState(0);
  const [oneRating, setOneRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  let trainerLength;
  useEffect(() => {
    setUsersReviews(0);
    setFiveRating(0);
    setFourRating(0);
    setThreeRating(0);
    setFourRating(0);
    setFiveRating(0);

    trainerLength = reviews?.length - 1;
    const trainerRating = reviews[trainerLength];
    if (trainerRating?.trainer) {
      setUsersReviews(trainerRating?.trainer?.averageRating);
    }
    if (trainerLength > 0) {
      setIsLoading(true);
      handleRatings();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews]);

  const handleRatings = () => {
    let fiveStar, fourStar, threeStar, twoStar, oneStar;

    fiveStar = fourStar = threeStar = twoStar = oneStar = 0;
    reviews.forEach((item, index) => {
      if (item.rating === 5) {
        fiveStar++;
      }
      if (item.rating === 4) {
        fourStar++;
      }
      if (item.rating === 3) {
        threeStar++;
      }
      if (item.rating === 2) {
        twoStar++;
      }

      if (item.rating === 1) {
        oneStar++;
      }
    });

    setFiveRating(Math.round((fiveStar * 100) / trainerLength));

    setFourRating(Math.round((fourStar * 100) / trainerLength));
    setThreeRating(Math.round((threeStar * 100) / trainerLength));
    setTwoRating(Math.round((twoStar * 100) / trainerLength));
    setOneRating(Math.round((oneStar * 100) / trainerLength));
    setIsLoading(false);
  };
  return (
    <>
      {!isLoading && !loading ? (
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-4 col-4">
                  <h3>Reviews</h3>
                  <button className="rating_circle">
                    {usersReviews?.toFixed(1)}
                  </button>
                  <div>
                    <div className="stars-outer mt-4">
                      <div
                        className="stars-inner"
                        style={{
                          width: `${(usersReviews?.toFixed(1) * 100) / 5}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="col-md-7 col-6">
                  <div className="progress mt-5" style={{ height: "10px" }}>
                    <div
                      className="progress-bar dark"
                      style={{ width: `${fiveRating}%`, height: "10px" }}
                    ></div>
                  </div>
                  <div className="progress mt-3" style={{ height: "10px" }}>
                    <div
                      className="progress-bar dark"
                      style={{ width: `${fourRating}%`, height: "10px" }}
                    ></div>
                  </div>
                  <div className="progress mt-3" style={{ height: "10px" }}>
                    <div
                      className="progress-bar dark"
                      style={{ width: `${threeRating}%`, height: "10px" }}
                    ></div>
                  </div>
                  <div className="progress mt-3" style={{ height: "10px" }}>
                    <div
                      className="progress-bar dark"
                      style={{ width: `${twoRating}%`, height: "10px" }}
                    ></div>
                  </div>
                  <div className="progress mt-3" style={{ height: "10px" }}>
                    <div
                      className="progress-bar dark"
                      style={{ width: `${oneRating}%`, height: "10px" }}
                    ></div>
                  </div>
                </div>
                <div className="col-md-1 col-2">
                  <div className="row">
                    <h6 className="rating_text">5</h6>
                  </div>
                  <div className="row">
                    <h6 className="">4</h6>
                  </div>
                  <div className="row">
                    <h6 className="">3</h6>
                  </div>
                  <div className="row">
                    <h6 className="">2</h6>
                  </div>
                  <div className="row">
                    <h6 className="">1</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6"></div>
          </div>
        </div>
      ) : (
        <SplashScreen />
      )}
    </>
  );
};

export default Review;
