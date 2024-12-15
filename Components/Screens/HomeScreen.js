import { StyleSheet, Text, View, Platform, Image, TouchableOpacity, FlatList, SafeAreaView, Dimensions } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/dist/Feather';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-virtualized-view';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const data = Array.from({ length: 8 });
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.topView}>
          <Feather name="menu" size={28} color={"#fff"} />
          <Text style={styles.userName}>Hii User Ji!</Text>
        </View>
        <View style={styles.topView}>
          <FontAwesome5 name="wallet" size={25} color={"#f58802"} />
          <FontAwesome name="bell-o" size={25} color={"#fff"} />
        </View>
      </View>

      {/* Product Grid Section */}
      <View style={styles.productMainView}>
        <TouchableOpacity style={styles.productView} onPress={() => navigation.navigate('Kundli')}>
          <Image source={{ uri: "https://wpcontent.anytimeastro.com/blog_anytimeastro/blogimages/innerimages/3094-Kundli-4.png" }} style={styles.productsImage} />
          <Text style={styles.text}>Kundli</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.productView}>
          <Image source={{ uri: "https://static.vecteezy.com/system/resources/thumbnails/025/313/546/small_2x/3d-heart-valentine-s-day-greeting-card-wedding-or-anniversary-png.png" }} style={styles.productsImage} />
          <Text style={styles.text}>Matching</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.productView}>
          <Image source={{ uri: "https://static.joonsite.com/storage/26/media/2304192306270195.webp" }} style={styles.productsImage} />
          <Text style={styles.text}>Horoscope</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.productView}>
          <Image source={{ uri: "https://files.softicons.com/download/toolbar-icons/mono-general-icons-2-by-custom-icon-design/png/512x512/document.png" }} style={styles.productsImage} />
          <Text style={styles.text}>Predictions</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Profile Scroll */}
      <Text style={styles.profileText1}>Talk To Guru Ji!</Text>
      <View style={styles.ProfileScrollView}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row" }}>
            {Array(6).fill('').map((_, index) => (
              <TouchableOpacity key={index} style={styles.profileView}>
                <Image source={{ uri: "https://play-lh.googleusercontent.com/jfoflyhBOe4CQ1-T0C8Ef2BQzJeHcGRMWrXB8R-zqnHR40VzFpW9XSw1XFtFX_ynGhU" }} style={styles.profileImage} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Banner Section */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Other content */}
        <View>
          <Image source={{ uri: "https://www.shutterstock.com/image-vector/your-personal-horoscope-chart-glow-260nw-2040389357.jpg" }} style={styles.homeBanner} />
        </View>

        {/* FlatList for Grid */}
        <View>
          <FlatList
            style={{ backgroundColor: "#CAE5E0", padding: 8 }}
            data={data}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.productView2}>
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/5922/5922704.png',
                    }}
                    style={styles.productImage2}
                  />
                  <Text style={styles.productText3}>Product Name</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3f51b5',
    paddingVertical: hp(1), // Reduced padding
    paddingHorizontal: wp(3),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
  },
  userName: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: '#fff',
  },
  productMainView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: wp(2),
  },
  productView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  productsImage: {
    width: wp("12%"),
    height: hp('10%'),
    resizeMode: 'contain',
  },
  text: {
    marginTop: hp(0.5),
    fontSize: wp('3.5%'),
    fontWeight: '600',
    textAlign: 'center',
  },
  profileView: {
    borderRadius: wp('15%'),
    marginLeft: wp(3),
    width: wp('18%'), // Slightly reduced size
    height: wp('18%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 5,
  },
  profileImage: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('10%'),
  },
  profileText1: {
    fontSize: wp('4%'),
    fontWeight: '700',
    marginBottom: 2,
    marginLeft: 10,
  },
  homeBanner: {
    height: hp('15%'),
    width: wp('100%'),
    resizeMode: 'cover',
  },
  itemContainer: {
    flex: 1,
    margin: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productView2: {
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    elevation: 3,
  },
  scrollViewContent: {
    paddingTop: hp('2%'),
    paddingBottom: hp('2%'),
  },
  productImage2: {
    width: wp('15%'),
    height: wp('15%'),
    resizeMode: 'contain',
  },
  productText3: {
    marginTop: hp(0.5),
    fontSize: wp('3.5%'),
    fontWeight: '600',
    textAlign: 'center',
  },
  flatListContent: {
    justifyContent: 'center',
  },
});
