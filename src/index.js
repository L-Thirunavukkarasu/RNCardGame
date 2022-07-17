//import liraries
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import * as Data from './data';
import {Colors} from './assets/colors';
import CardView from './components/card';

// create a component
const Home = () => {
  const [cards, setCards] = useState([]);
  const [steps, setSteps] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //shuffle cards
  const shuffleCards = () => {
    //generate random numbers
    const CARD_PAIRS_VALUE = Data.getRandomNumbers();

    const shuffledCards = [...CARD_PAIRS_VALUE, ...CARD_PAIRS_VALUE]
      .sort(() => Math.random() - 0.5)
      .map(card => ({...card, id: Math.random()}));

    setCards(shuffledCards);
    setSteps(0);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  //handle a choice
  const handleChoice = card => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.value === choiceTwo.value) {
        console.log('cards  match');
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.value === choiceOne.value) {
              return {...card, matched: true};
            } else {
              return card;
            }
          });
        });
        resetSteps();
      } else {
        console.log('cards not match',cards);
        setTimeout(() => {
          resetSteps();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  //console.log(cards);

  //reset choice & increase steps
  const resetSteps = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setSteps(prevSteps => prevSteps + 1);
    setDisabled(false);
  };

  //start game automatically
  useEffect(()=>{
    shuffleCards();
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.top_options}>
        <TouchableOpacity onPress={shuffleCards}>
          <Text style={styles.option_restart}>Restart</Text>
        </TouchableOpacity>
        <Text style={styles.option_steps}>{`Steps : ${steps}`}</Text>
      </View>
      <View style={styles.card_view}>
        {cards.map(card => {
          return (
            <CardView 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice} 
            flipped={card?.matched === choiceOne?.matched || card?.matched === choiceTwo?.matched || card?.matched}
            disabled={disabled}
            />
          );
        })}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light_black_bg,
  },
  top_options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  option_restart: {
    color: Colors.card_bg,
    fontSize: 18,
  },
  option_steps: {
    color: Colors.white_bg,
    fontSize: 21,
  },
  card_view: {
    flexWrap: 'wrap',
    marginTop: 12,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
});

//make this component available to the app
export default Home;
