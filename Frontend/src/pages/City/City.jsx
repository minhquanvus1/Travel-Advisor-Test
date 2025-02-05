import React, { useState, useEffect, useContext } from "react";
import "./City.css";
import { useParams } from "react-router-dom";
import { cities } from "../../assets/assets";
import ExpandableDescription from "../../components/ExpandableDescription/ExpandableDescription";
import { useLocation } from "react-router-dom";
import { CityContext } from "../../context/CityContextProvider";
import { replaceWhiteSpaceWithUnderScore } from "../../functions/replaceWhiteSpaceWithUnderScore";
import TravelAdviceBanner from "../../components/TravelAdviceBanner/TravelAdviceBanner";
import EssentialSection from "../../components/EssentialSection/EssentialSection";

const City = () => {
  const { cityName } = useParams();
  const [city, setCity] = useState(null);
  const location = useLocation();
  const { setCityState, checkAndSetCityState } = useContext(CityContext);
  const [currentSection, setCurrentSection] = useState("");
  console.log("cityName is", cityName);

  const findCityByName = () => {
    const foundCity = cities.find((city) => {
      console.log("city.name is", city.name);
      return replaceWhiteSpaceWithUnderScore(city.name) === cityName;
    });
    if (!foundCity) {
      console.log("No city found");
      return;
    }
    console.log("city in function is", foundCity);
    return foundCity;
  };
  useEffect(() => {
    const foundCity = findCityByName();
    setCity(foundCity);
    setCurrentSection("");
  }, []);
  // useEffect(() => {
  //   if (!cityState) {
  //     switch (location.pathname) {
  //       case `/cities/${replaceWhiteSpaceWithUnderScore(cityName)}`:
  //         checkAndSetCityState(replaceUnderScoreWithWhiteSpace(cityName));
  //         break;
  //       default:
  //         setCityState("");
  //     }
  //   }
  // }, [location.pathname]);

  return (
    <div className="city">
      {!city && "No city found"}
      City {cityName}
      {city && (
        <>
          <div className="city-header">
            <img src={city && city.imageUrl} alt="city header" />
          </div>
          <div className="description-container">
            <h2>{city.name}</h2>
            <ExpandableDescription
              text={city.description}
              lineClamp={3}
            ></ExpandableDescription>
          </div>

          {city.travelAdvice && <TravelAdviceBanner></TravelAdviceBanner>}
          <div className="essential-container">
            <div className="essential-title-container">
              <h2 className="essential-title">Essential {city.name}</h2>
              <div
                style={{ fontSize: "16px", fontWeight: "400", color: "#000" }}
              >
                Pick a category to filter your recs
              </div>
            </div>
            <div className="essential-details-container">
              <EssentialSection
                title={"Things to do"}
                currentSection={"things-to-do"}
              ></EssentialSection>
              <EssentialSection
                title={"Food & drink"}
                currentSection={"restaurants"}
              ></EssentialSection>
            </div>
          </div>
          <div className="city-cuisine-section">
            <h2 className="city-cuisine-section-title">
              Cuisine in {city.name}
            </h2>
            <div className="city-cuisine-list">
              {city.cuisine.map((dish, index) => {
                return (
                  <div key={dish.id} className="cuisine-card">
                    <img src={dish.imageUrl} alt={dish.name} />
                    <div className="dish-details">
                      <h2>{dish.name}</h2>
                      <p>{dish.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {city.travelAdvice && (
            <div className="travel-advice-section">
              <h2>{city.name} Travel Guide</h2>
              <h3 className="travel-advice-title">
                What is the best way to get there?
              </h3>
              {Object.entries(city.travelAdvice.gettingThere).map(
                ([key, value]) => {
                  return (
                    <React.Fragment key={key}>
                      <h4 className="travel-advice-subtitle">{key}</h4>
                      <p className="travel-advice-description">{value}</p>
                    </React.Fragment>
                  );
                }
              )}
              <h3 className="travel-advice-title">Do I need a Visa?</h3>
              <p className="travel-advice-description">
                {city.travelAdvice.visa}
              </p>
              <h3 className="travel-advice-title">
                When is the best time to visit?
              </h3>
              <p className="travel-advice-description">
                {city.travelAdvice.bestTimeToVisit}
              </p>
              <h3 className="travel-advice-title">Get around</h3>
              {Object.entries(city.travelAdvice.gettingAround).map(
                ([key, value]) => {
                  return (
                    <React.Fragment key={key}>
                      <h4 className="travel-advice-subtitle">{key}</h4>
                      <p className="travel-advice-description">{value}</p>
                    </React.Fragment>
                  );
                }
              )}
              <h3 className="travel-advice-title">On the ground</h3>
              {Object.entries(city.travelAdvice.onTheGround).map(
                ([key, value]) => {
                  return (
                    <React.Fragment key={key}>
                      <h4 className="travel-advice-subtitle">{key}</h4>
                      <p className="travel-advice-description">{value}</p>
                    </React.Fragment>
                  );
                }
              )}
              <h3 className="travel-advice-title">How much do I tip?</h3>
              <p className="travel-advice-description">
                {city.travelAdvice.tipping}
              </p>
              <h3 className="travel-advice-title">
                Are there local customs I should know?
              </h3>
              {Object.entries(city.travelAdvice.customs).map(([key, value]) => {
                return (
                  <React.Fragment key={key}>
                    <h4 className="travel-advice-subtitle">{key}</h4>
                    <p className="travel-advice-description">{value}</p>
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default City;
