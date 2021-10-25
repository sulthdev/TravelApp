import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [places, setPlaces] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get('https://traveller.talrop.works/api/v1/places/categories/')
      .then(response => {
        setCategories(response.data.data);
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get('https://traveller.talrop.works/api/v1/places/')
      .then(response => {
        setPlaces(response.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const renderCategories = () => {
    return categories.map(item => (
      <TouchableOpacity activeOpacity={0.8} style={styles.categoryCard}>
        <Image style={styles.roundImage} source={{uri: item.image}} />
        <Text style={styles.categoryName}>{item.name}</Text>
      </TouchableOpacity>
    ));
  };

  const renderPlaces = () => {
    return places.map(item => (
      <TouchableOpacity
        onPress={() => navigation.push('Detail', {id: item.id})}
        activeOpacity={0.8}
        style={styles.box}>
        <Image style={styles.place} source={{uri: item.image}} />
        <Text style={styles.placeName}>{item.name}</Text>
        <View style={styles.boxBottom}>
          <Image
            style={styles.locationIcon}
            source={require('../assets/icons/place.png')}
          />
          <Text style={styles.location}>{item.location}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.description}>Explore the world around you</Text>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.categoryView}>
          {renderCategories()}
        </ScrollView>
      </View>
      <View style={styles.bottom}>
        <ScrollView
          contentContainerStyle={styles.bottomContainer}
          showsVerticalScrollIndicator={false}>
          {renderPlaces()}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
  },
  header: {
    paddingHorizontal: 22,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    fontSize: 15,
    marginTop: 1,
  },
  roundImage: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginRight: 10,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#026cf6',
    paddingRight: 20,
    borderRadius: 40 / 2,
    marginRight: 12,
  },
  categoryView: {
    marginTop: 24,
    paddingLeft: 22,
  },
  bottom: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  place: {
    width: '100%',
    height: 120,
    marginBottom: 5,
    borderRadius: 5,
  },
  placeName: {
    fontWeight: '700',
    marginBottom: 3,
  },
  box: {
    width: '48%',
    marginBottom: 20,
  },
  boxBottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 5,
  },
  location: {
    fontSize: 12,
  },
});
