//import liraries
import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {Colors} from '../../assets/colors';

const {width, height} = Dimensions.get('window');
const cardPadding = width / 25;
const cardWidth = width / 3 - 20;
const cardHeight = height / 5;

// create a component
const CardView = ({card, handleChoice, flipped, disabled}) => {
  const flipAnimation = useRef(new Animated.Value(0)).current;
  let flipRotation = 0;
  flipAnimation.addListener(({value}) => (flipRotation = value));

  const flipToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };
  const flipToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };

  const flipToFront = () => {
    Animated.timing(flipAnimation, {
      toValue: 180,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const flipToBack = () => {
    Animated.timing(flipAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
      flipToFront();
    }
  };

  useEffect(() => {
    if (flipped) {
      flipToFront();
    } else {
      flipToBack();
    }
  }, [card?.matched, flipped]);

  return (
    <TouchableOpacity onPress={handleClick} style={styles.card_item}>
      <Animated.View
        style={{...styles.card_front(flipped), ...flipToBackStyle}}>
        <Text style={styles.card_value}>{card.value}</Text>
      </Animated.View>
      <Animated.View style={{...styles.card_back, ...flipToFrontStyle}}>
        <Text style={styles.card_question}>{'?'}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  card_item: {
    width: cardWidth,
    height: cardHeight,
    marginTop: 10,
    marginLeft: 10,
  },
  card_front: flipped => ({
    borderRadius: 10,
    backgroundColor: Colors.white_bg,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
  }),
  card_back: {
    borderRadius: 10,
    borderWidth: 5,
    borderColor: Colors.white_bg,
    backgroundColor: Colors.card_bg,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
  },
  card_value: {
    fontSize: 25,
    color: Colors.black_bg,
    fontWeight: '700',
  },
  card_question: {
    fontSize: 25,
    color: Colors.white_bg,
    fontWeight: '700',
  },
});

//make this component available to the app
export default CardView;
