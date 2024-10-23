import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,TouchableOpacity, Alert, TextInput, TouchableHighlight, SafeAreaView, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import { RootStackParamList, menuDetails } from '../types';
import { SetStateAction, useState } from 'react';



 export default function App() {
     const Stack = createNativeStackNavigator<RootStackParamList>();
     const [Menu, setMenu] = useState<menuDetails[]>([]); // Lifted state
    
      return (
          <NavigationContainer>
            <Stack.Navigator>
             <Stack.Screen name='Home'>
                {props => <Home {...props} Menu={Menu} setMenu={setMenu} />}
              </Stack.Screen>
            

            </Stack.Navigator>
            </NavigationContainer>
       
       );
    };


/* Start of Screen 2 definition */
type HomeProp = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<HomeProp & { Menu: menuDetails[], setMenu: (menu: menuDetails []) => void }> = (props) => {
  const { Menu, setMenu } = props;
  const { dish_Name, course_Type, dish_Discription, price } = props.route.params; 
  const [DishToDelete, setDishToDelete] = useState<string>('');

  const Stack = createNativeStackNavigator<RootStackParamList>();


  const handleDeleteItem = () => {
    const updatedItems = Menu.filter(item => item.dish_Name !== DishToDelete);
    setMenu(updatedItems); // Update Menu state
    setDishToDelete(''); // Clear the input after deletion
  };



  return (
    
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Home</Text>
        <Text style={styles.trackerName}>Menu Items</Text>
      </View>
      <View style={styles.listView}>
        <FlatList
          style={styles.ListStyle}
          data={Menu}
          keyExtractor={(_item: any, index: { toString: () => any; }) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <Text style={styles.dishName}>Dish Name: {item.dish_Name}</Text>
              <Text style={styles.OtherDetails}>Description: {item.dish_Discription}</Text>
              <Text style={styles.OtherDetails}>Course: {item.course_Type}</Text>
              <Text style={styles.OtherDetails}>R{item.price}</Text>
            </View>
          )}
        />
        <View style={styles.userInputView}>
          <Text style={styles.EnterDish}>Enter New Dish Here</Text>
          {/* Existing TextInputs for adding a new dish */}

          {/* Input for deleting a dish */}
          <TextInput
            style={styles.input}
            placeholder='Dish name to delete'
            value={DishToDelete}
            onChangeText={setDishToDelete}
          />
          <TouchableHighlight onPress={handleDeleteItem} style={styles.button}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
  
    headingContainer: {
      backgroundColor: 'lightgreen',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30,
      width: '100%'
    },
  
    trackerName: {
      fontSize: 34,
      fontWeight: 'bold',
      color: '#5B3E96'
    },
    EnterDish:{
      fontSize: 23,
      fontWeight: 'bold',
    },
  
    summaryContent: {
     flexDirection: 'row',
     justifyContent: 'space-between',
    },
  
    listView: {
      marginTop: -20,
      width: '100%',
      height: 500,
      borderRadius: 10,
      backgroundColor: '#ECECEC'
    },
  
    summaryHeading: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
    },
  
    summaryText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#583E96',
    },
      //npm install @reactnavigation/buttontabs
    summaryContainer: {
      backgroundColor: '#ECECEC',
      padding: 15,
      borderRadius: 10,
      marginTop: -50,
      alignItems: 'flex-start',
      justifyContent: 'center'
    },
    
    dishImage: {
      width: 60,
      height: 60,
      marginLeft: 250,
      marginTop: -90,
      marginStart: 250
    },
  
    
    ListStyle: {
      maxHeight: 800
    },
  
    itemContainer: {
      flex: 1,
      padding: 20,
      marginVertical: 5,
      marginBottom: -40,
      backgroundColor: 'white',
    },
    
    dishName:{
      fontSize: 23,
      fontWeight: "bold",
      color: '#5B3E96'
    },
  
    heading: {
      fontSize: 30,
      fontWeight: "bold",
      color: "purple"
    },
  
    OtherDetails: {
      color: '#5B3E96',
      fontSize: 20,
      fontWeight: "bold",
    },
  
    separator: {
      height: 20,
    },
  
    userInputView: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      marginVertical: 5,
      backgroundColor: 'green',
      padding: 15,
      marginTop: 19,
      marginBottom: 75,
      borderRadius: 10,
    },
    
    input: {
      width: '100%',
      height: 40,
      backgroundColor: 'white',
      paddingHorizontal: 10,
      marginVertical: -15,
      borderRadius: 5,
      color: 'black',
      marginTop: 30,
      fontSize: 20,
    },
  
    button: {
      backgroundColor: '#fff',
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 40, //for rounded corner
      marginVertical: 10,
      alignItems: 'center',
      marginTop: 25,
    },
  
    buttonText: {
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
    },
  
  });

  

