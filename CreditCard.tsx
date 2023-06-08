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
import FlipCard from 'react-native-flip-card';

const App = () => {
  const [number, setnumber] = useState('');
  const [Name, setName] = useState('');
  const [Month, setMonth] = useState('');
  const [Year, setYear] = useState('');
  const [Cvv, setCvv] = useState('');
  const [flip, setflip] = useState(false);

  const flipcard = () => {
    setflip(!flip);
  };

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
      setnumber('');
      setName(''), setMonth(''), setYear(''), setCvv(''), flipcard();
    }
  };

  return (
    <View style={styles.container}>
      <FlipCard
        friction={6}
        perspective={1000}
        flipHorizontal={true}
        flipVertical={false}
        flip={flip}
        clickable={false}
        onFlipEnd={(isFlipEnd: any) => {
          console.log('isFlipEnd', isFlipEnd);
        }}>
        <ImageBackground
          style={styles.card}
          source={require('./assets/cardfront.jpeg')}
          imageStyle={styles.cardimg}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Image source={require('./assets/chip.png')} style={styles.chip} />
            <Image source={require('./assets/visa.png')} style={styles.visa} />
          </View>
          {number ? (
            <Text style={styles.cardnumber}>
              {number.slice(0, 4) +
                '  ' +
                number.slice(4, 8) +
                '  ' +
                number.slice(8, 12) +
                '  ' +
                number.slice(12, 16)}
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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
            <Text style={styles.Cvv}>{Cvv}</Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Image
              source={require('./assets/visa.png')}
              style={styles.visaBack}
            />
          </View>
        </ImageBackground>
      </FlipCard>

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
          onChangeText={text => setnumber(text)}
          placeholder="Enter Card Number"
          placeholderTextColor={'grey'}
        />

        <TextInput
          style={styles.numInput}
          value={Name}
          onChangeText={text => setName(text)}
          placeholder="Enter Card Number"
          placeholderTextColor={'grey'}
        />

        <View style={{flexDirection: 'row', marginStart: 10, width: 340}}>
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
            onFocus={flipcard}
            keyboardType="numeric"
            secureTextEntry={true}
            maxLength={3}
            value={Cvv}
            onChangeText={text => setCvv(text)}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    height: 220,
    width: '90%',
    marginTop: 20,
    marginHorizontal: 20,
  },
  cardimg: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
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
     marginTop: 15},
  visa: {
    height: 29,
    width: 60,
    padding: 15,
    borderRadius: 2,
    marginRight: 15,
    marginTop: 15,
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
