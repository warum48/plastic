import React from "react";
import Item from "./Item.js";
import "./styles.css";

export default class PlCalc extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      langs: ["ru", "en"],
      lang: "en", //"ru", //en
      yearWeight: 0,
      period: 365.25,
      lifetime: 75 / 1000, //1000 / 75,
      timeselect: [
        { name_en: "day", name_ru: "день", value: 1 },
        { name_en: "week", name_ru: "неделя", value: 7 },
        { name_en: "month", name_ru: "месяц", value: 30.5 },
        { name_en: "year", name_ru: "год", value: 365.25 }
      ],
      weightData: {
        pet: {
          name_en: "	PET bottles	",
          name_ru: "обертка",
          weight: 5.142778919,
          num: 0,
          pertime: 1
        },
        bags: {
          name_en: "	Plastic bags	",
          name_ru: "обертка",
          weight: 1.142778919,
          num: 0,
          pertime: 1
        },
        wrap: {
          name_en: "	Food wrappers	",
          name_ru: "обертка",
          weight: 2.142915811,
          num: 0,
          pertime: 1
        },
        yougurt: {
          name_en: "	Yogurt containers	",
          name_ru: "обертка",
          weight: 2.142915811,
          num: 0,
          pertime: 1
        },
        swabs: {
          name_en: "	Cotton swabs	",
          name_ru: "обертка",
          weight: 0.1429158111,
          num: 0,
          pertime: 1
        },
        detergent: {
          name_en: "	Detergent, cleaning products bottles	",
          name_ru: "обертка",
          weight: 17.14277892,
          num: 0,
          pertime: 1
        },
        shampoo: {
          name_en: "	Shampoo / shower gel / cosmetics bottles	",
          name_ru: "обертка",
          weight: 11.42861054,
          num: 0,
          pertime: 1
        },
        refill: {
          name_en: "	Refill packets	",
          name_ru: "обертка",
          weight: 2.428473648,
          num: 0,
          pertime: 1
        },
        toothbrushes: {
          name_en: "	Toothbrushes	",
          name_ru: "обертка",
          weight: 2.857221081,
          num: 0,
          pertime: 1
        },
        toothpastes: {
          name_en: "	Toothpastes	",
          name_ru: "обертка",
          weight: 2.142915811,
          num: 0,
          pertime: 1
        },
        takeawaybox: {
          name_en: "	Take-away plastic box	",
          name_ru: "обертка",
          weight: 4.571389459,
          num: 0,
          pertime: 1
        },
        takeawaycup: {
          name_en: "	Take-away plastic cup	",
          name_ru: "обертка",
          weight: 2.857221081,
          num: 0,
          pertime: 1
        },
        straws: {
          name_en: "	Straws	",
          name_ru: "обертка",
          weight: 0.07145790554,
          num: 0,
          pertime: 1
        },
        cutlery: {
          name_en: "	Disponsable cutlery	",
          name_ru: "обертка",
          weight: 0.5713894593,
          num: 0,
          pertime: 1
        },
        plates: {
          name_en: "	Plastic plates	",
          name_ru: "обертка",
          weight: 3.428610541,
          num: 0,
          pertime: 1
        }
      }

      /*{ name: "one", weight: 120 },
        { name: "two", weight: 220 }*/
    };

    this.handleChangeNum = this.handleChangeNum.bind(this);
    this.handleChangeSel = this.handleChangeSel.bind(this);
    this.handleChangeLang = this.handleChangeLang.bind(this);
  }

  componentDidMount() {
    // Calculates the total after component is mounted
    this.setState({ yearWeight: this.calculateTotal(this.state.weightData) });
  }

  calculateTotal = (numbers) => {
    return Object.entries(numbers).reduce((finalValue, [key, value]) => {
      if (value === "") {
        // if entered value is empty string "", omits it
        return finalValue;
      }
      return Math.round(
        finalValue +
          (value.num / value.pertime) * value.weight * this.state.period
      );
    }, 0);
  };

  handleChangeLang(value) {
    this.setState({ lang: value });
  }

  handleChangeNum(value, name) {
    const parsedValue = value === "" ? "" : parseFloat(value); // parses the value as a number or if empty treats it as empty string ""
    this.setState((prevState) => {
      const updatedNumbers = {
        ...prevState.weightData,
        [name]: { ...prevState.weightData[name], num: parsedValue }
      };
      const newTotal = this.calculateTotal(updatedNumbers);
      return {
        weightData: updatedNumbers,
        yearWeight: newTotal
      };
    });
  }

  handleChangeSel(value, name) {
    const parsedValue = value === "" ? "" : parseFloat(value); // parses the value as a number or if empty treats it as empty string ""
    this.setState((prevState) => {
      const dif = prevState.weightData[name].pertime / value;
      //console.log("dif", dif);
      const updatedNumbers = {
        ...prevState.weightData,
        [name]: {
          ...prevState.weightData[name],
          num:
            Math.round(
              (prevState.weightData[name].num / dif + Number.EPSILON) * 100
            ) / 100,
          pertime: parsedValue
        }
      };
      //console.log("parsedValue", parsedValue);
      //console.log("difcon", parsedValue * dif);
      const newTotal = this.calculateTotal(updatedNumbers);
      return {
        weightData: updatedNumbers,
        yearWeight: newTotal
      };
    });
  }

  render() {
    return (
      <>
        {/*<div className="bgimg"></div>*/}
        <div className="head">
          How much plastic do you use per one year? <br />
          <span className="post_head">Check yourself</span>
        </div>
        <div className="PlCalc container">
          {/*<Item
          name="one"
          runame={this.state.weightData.one.name}
          onChangeNum={this.handleChangeNum}
          onChangeSel={this.handleChangeSel}
          val={this.state.weightData.one.num}
          sel={this.state.timeselect}
        />
        <Item
          name="two"
          runame={this.state.weightData.two.name}
          onChangeNum={this.handleChangeNum}
          onChangeSel={this.handleChangeSel}
          val={this.state.weightData.two.num}
          sel={this.state.timeselect}
        />*/}
          {Object.keys(this.state.weightData).map((item) => (
            <Item
              key={item}
              name={item}
              //name_ru={this.state.weightData[item].name_ru}
              //name_en={this.state.weightData[item].name_en}
              itemdata={this.state.weightData[item]}
              onChangeNum={this.handleChangeNum}
              onChangeSel={this.handleChangeSel}
              val={this.state.weightData[item].num}
              sel={this.state.timeselect}
              lang={this.state.lang}
            />
          ))}
          <div className="result_container">
            <h3 className="result">{this.state.yearWeight} g / year</h3>
            {/*<h3 className="result">
              {Math.round(this.state.yearWeight / this.state.lifetime)} g /
              lifetime
          </h3>*/}

            {this.state.yearWeight !== 0 &&
              this.state.yearWeight < 380 / this.state.lifetime && (
                <>
                  <h4>Wow, great result!</h4>
                  <h5>We need more ecological ninjas like you!</h5>
                </>
              )}
            {this.state.yearWeight >= 380 / this.state.lifetime &&
              this.state.yearWeight < 1200 / this.state.lifetime && (
                <>
                  <h4>
                    Awesome, congrats!{" "}
                    <span role="img" aria-label="good">
                      😀
                    </span>
                  </h4>
                  <h5>
                    There are only a couple of countries that produce less
                    plastic waste per capita than you!
                  </h5>
                </>
              )}
            {this.state.yearWeight >= 1200 / this.state.lifetime &&
              this.state.yearWeight < 1500 / this.state.lifetime && (
                <>
                  <h4>
                    Not bad!{" "}
                    <span role="img" aria-label="good">
                      😊
                    </span>
                  </h4>
                  <h5>
                    Carry on, try to reduce more every-day plastic to become a
                    Low-Plastic Hero!
                  </h5>
                </>
              )}
            {this.state.yearWeight >= 1500 / this.state.lifetime &&
              this.state.yearWeight < 2200 / this.state.lifetime && (
                <>
                  <h4>
                    Could be better...{" "}
                    <span role="img" aria-label="good">
                      😐
                    </span>
                  </h4>
                  <h5>
                    But still, you are producing less than average European Keep
                    up!
                  </h5>
                </>
              )}
            {this.state.yearWeight >= 2200 / this.state.lifetime &&
              this.state.yearWeight < 3700 / this.state.lifetime && (
                <>
                  <h4>
                    That's a heck of a lot of plastic!
                    <span role="img" aria-label="good">
                      ☹️
                    </span>
                  </h4>
                  <h5>Try harder to reduce your plastic footprint!</h5>
                </>
              )}
            {this.state.yearWeight >= 3700 / this.state.lifetime &&
              this.state.yearWeight < 6370 / this.state.lifetime && (
                <>
                  <h4>
                    OMG!
                    <span role="img" aria-label="good">
                      😢
                    </span>
                  </h4>
                  <h5>
                    You produce more than global average! Change your habits
                    now!
                  </h5>
                </>
              )}

            {this.state.yearWeight >= 6370 / this.state.lifetime && (
              <>
                <h4>
                  That's insane!
                  <span role="img" aria-label="good">
                    😭
                  </span>
                  We should start moving to Mars if everybody's like you!
                </h4>
                <h5>You beat the US average!</h5>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

//https://stackoverflow.com/questions/60530892/react-loop-inputs-and-get-sum-value
//https://jkettmann.com/how-to-accidentally-mutate-state-and-why-not-to
//https://stackoverflow.com/questions/43040721/how-to-update-nested-state-properties-in-react
//https://github.com/kolodny/immutability-helper
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names
