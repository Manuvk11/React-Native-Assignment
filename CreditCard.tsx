import {
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const App = () => {
  const [number, setnumber] = useState('');
  const [Name, setName] = useState('');
  const [Month, setMonth] = useState('');
  const [Year, setYear] = useState('');
  const [Cvv, setCvv] = useState('');
  const [maskedText, setMaskedText] = useState('');
  const [maskedcvv, setMaskedcvv] = useState('');
  const [cardType, setCardType] = useState('');

  const rotate = useSharedValue(0);
  const frontAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotate.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, {duration: 1000}),
        },
      ],
    };
  });
  const backAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotate.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, {duration: 1000}),
        },
      ],
    };
  });

  const Submit = () => {
    if (
      number == '' &&
      number.length !== 16 &&
      Name == '' &&
      Month == '' &&
      Year == '' &&
      Cvv == ''
    ) {
      console.log('Enter all the details');
    } else {
      setMaskedText('');
      setnumber('');
      setName(''),
        setMonth(''),
        setYear(''),
        setCvv(''),
        (rotate.value = rotate.value ? 0 : 1);
    }
  };

  const handleCvv = (text: any) => {
    setCvv(text);
    const maskcvv = text.replace(/./g, '*');
    setMaskedcvv(maskcvv);
  };

  const TextChange = (text: any) => {
    setnumber(text);

    const firstFour = text.slice(0, 4);
    const lastFour = text.slice(12, 16);

    const masked = firstFour + text.slice(4, 12).replace(/./g, '*') + lastFour;

    setMaskedText(masked);
  };

  const CardChange = (text: any) => {
    setnumber(text);
    detectCard(text);
  };

  const detectCard = (number: any) => {
    let cardType = '';

    const visaPattern = /^4/;
    const mastercardPattern = /^5[1-5]/;
    const amexPattern = /^3[47]/;

    if (visaPattern.test(number)) {
      cardType = 'Visa';
    } else if (mastercardPattern.test(number)) {
      cardType = 'Mastercard';
    } else if (amexPattern.test(number)) {
      cardType = 'American Express';
    } else {
      cardType = 'default';
    }

    setCardType(cardType);
  };

  const CardIcon = () => {
    let iconSource;

    switch (cardType) {
      case 'Visa':
        iconSource = require('./assets/visa.png');
        break;
      case 'Mastercard':
        iconSource = require('./assets/mastercard.png');
        break;
      case 'American Express':
        iconSource = require('./assets/amex.png');
        break;
      case 'default':
        iconSource = require('./assets/visa.png');
    }

    if (iconSource) {
      return (
        <Image source={iconSource} resizeMode="contain" style={[styles.visa]} />
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={{marginTop: '15%'}}>
        <View>
          <Animated.View style={[frontAnimatedStyles, styles.frontcard]}>
            <ImageBackground
              style={styles.card}
              source={require('./assets/cardfront.jpeg')}
              imageStyle={styles.cardimg}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Image
                  source={require('./assets/chip.png')}
                  style={styles.chip}
                />
                <View>{CardIcon()}</View>
              </View>
              {maskedText ? (
                <Text style={styles.cardnumber}>
                  {maskedText.slice(0, 4) +
                    ' ' +
                    maskedText.slice(4, 8) +
                    ' ' +
                    maskedText.slice(8, 12) +
                    ' ' +
                    maskedText.slice(12, 16)}
                </Text>
              ) : (
                <Text style={styles.numDefault}>#### ##### ##### ###</Text>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: '5%',
                }}>
                <Text style={{fontSize: 15, paddingLeft: 18, color: 'white'}}>
                  Card Holder
                </Text>
                <Text style={{fontSize: 15, paddingRight: 20, color: 'white'}}>
                  Expires
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.name}>{Name.toUpperCase()}</Text>

                {Month || Year ? (
                  <Text style={styles.expiry}>
                    {Month}/{Year}
                  </Text>
                ) : (
                  <Text style={styles.expiryDef}>MM/YY</Text>
                )}
              </View>
            </ImageBackground>
          </Animated.View>
          {/* back */}
          <Animated.View style={[backAnimatedStyles, styles.backCard]}>
            <ImageBackground
              style={styles.card}
              source={require('./assets/cardfront.jpeg')}
              imageStyle={styles.cardimg}>
              <View
                style={{
                  height: 30,
                  marginTop: '8%',
                  backgroundColor: 'black',
                }}></View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  marginTop: '8%',
                }}>
                <Text style={styles.cvvDef}>CVV</Text>
              </View>
              <View style={styles.cvvView}>
                <Text style={styles.Cvv}>{maskedcvv}</Text>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <View>{CardIcon()}</View>
              </View>
            </ImageBackground>
          </Animated.View>
        </View>

        <View
          style={{
            flex: 1,
            position: 'absolute',
            marginTop: 280,
            paddingHorizontal: 10,
          }}>
          <TextInput
            style={styles.numInput}
            keyboardType="numeric"
            maxLength={16}
            value={number}
            onChangeText={text => {
              TextChange(text);
              CardChange(text);
            }}
            placeholder="Enter Card Number"
            placeholderTextColor={'grey'}
          />

          <TextInput
            style={styles.numInput}
            value={Name}
            onChangeText={text => setName(text)}
            placeholder="Card Holder Name"
            placeholderTextColor={'grey'}
          />

          <View
            style={{
              flexDirection: 'row',
              marginStart: 10,
              width: 340,
              marginTop: 10,
            }}>
            <TextInput
              style={[styles.num, {width: 100}]}
              keyboardType="numeric"
              maxLength={2}
              value={Month}
              onChangeText={text => setMonth(text)}
              placeholder="Expiry Month"
              placeholderTextColor={'grey'}
            />

            <TextInput
              style={[styles.num, {marginStart: 5, width: 100}]}
              keyboardType="numeric"
              maxLength={2}
              value={Year}
              onChangeText={text => setYear(text)}
              placeholder="Expiry year"
              placeholderTextColor={'grey'}
            />

            <TextInput
              style={[styles.num, {width: 120, marginStart: 25}]}
              onFocus={() => {
                console.log(rotate.value);
                console.log('rotate');
                rotate.value = rotate.value ? 0 : 1;
              }}
              keyboardType="numeric"
              secureTextEntry={true}
              maxLength={3}
              value={Cvv}
              onChangeText={handleCvv}
              placeholder=" CVV"
              placeholderTextColor={'grey'}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              Submit();
            }}
            style={{
              backgroundColor: 'dodgerblue',
              marginVertical: 25,
              marginHorizontal: '3%',
              height: 35,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
            }}>
            <Text style={{fontSize: 20, color: 'white'}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    height: 220,
    width: 350,
    marginTop: 20,
    marginHorizontal: 20,
  },
  cardimg: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  frontcard: {
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
  backCard: {
    backfaceVisibility: 'hidden',
  },
  numInput: {
    color: 'black',
    height: 40,
    width: '100%',
    borderColor: 'silver',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  num: {
    height: 40,
    borderWidth: 1,
    borderColor: 'silver',
    borderRadius: 5,
    color: 'black',
  },
  inputHover: {
    borderWidth: 2,
    borderColor: 'red',
  },
  chip: {
    height: 40,
    width: 50,
    borderRadius: 2,
    marginLeft: 15,
    marginTop: 15,
  },
  visa: {
    height: 35,
    width: 70,
    // padding: 15,
    borderRadius: 2,
    marginRight: 25,
    marginTop: 25,
  },
  cardnumber: {
    height: 35,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: '7%',
    marginBottom: 10,
    paddingLeft: 15,
    paddingVertical: 5,
  },
  numDefault: {
    height: 35,
    fontSize: 15,
    color: 'white',
    marginTop: '7%',
    marginBottom: 10,
    paddingLeft: 15,
    paddingVertical: 5,
  },
  name: {
    height: 30,
    width: '50%',
    fontSize: 20,
    color: 'white',
    padding: 15,
    paddingVertical: 3,
  },
  expiry: {
    height: 30,
    fontSize: 20,
    color: 'white',
    padding: 15,
    paddingVertical: 3,
  },
  expiryDef: {
    height: 30,
    fontSize: 20,
    color: 'white',
    padding: 15,
    paddingVertical: 3,
  },
  cvvDef: {
    fontSize: 15,
    paddingHorizontal: 20,
    paddingVertical: 3,
    color: 'white',
  },
  cvvView: {
    height: 38,
    backgroundColor: 'white',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginHorizontal: 15,
    borderRadius: 5,
  },
  Cvv: {color: 'black', fontSize: 20, paddingRight: 15},
  visaBack: {
    height: 29,
    width: 60,
    padding: 15,
    borderRadius: 2,
    marginRight: 15,
    marginTop: 15,
  },
});

export default App;
