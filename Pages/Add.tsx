
  import { StatusBar } from 'expo-status-bar';
  import { StyleSheet, Text, View, Button,TouchableOpacity, Alert, TextInput, TouchableHighlight, SafeAreaView, FlatList } from 'react-native';
  import { NavigationContainer } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import { NativeStackScreenProps } from '@react-navigation/native-stack';
  import { Picker } from '@react-native-picker/picker';
  import { RootStackParamList, menuDetails } from '../types';
  import { SetStateAction, useState } from 'react';
import Home from './Home';

  
  
export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const [Menu, setMenu] = useState<menuDetails[]>([]); // Lifted state
 
   return (
       <NavigationContainer>
         <Stack.Navigator>
         
<Stack.Screen name='Add'>
         {props => <Add {...props} Menu={Menu} setMenu={setMenu} />}
       </Stack.Screen>
         </Stack.Navigator>
         </NavigationContainer>
    
    );
 };

  
  /** Start Screen 1 definition **/
  type AddProp = NativeStackScreenProps<RootStackParamList, 'Add'>;
  
  const Add: React.FC<AddProp & { Menu: menuDetails[], setMenu: (menu: menuDetails[]) => void }> = (props) => {
    const { Menu, setMenu } = props;
  
    const [DishName, setDishName] = useState<string>('');
    const [Discription, setDiscription] = useState<string>(''); 
    const [courseType, setType] = useState<string>(''); 
    const [Price, setPrice] = useState<string>(''); 
  
    const CourseType = ['Appetizer', 'Main', 'Dessert'];
  
    const handleAdd = () => {
      if (DishName && Discription && courseType && Price) {
        const newDish: menuDetails = { 
          dish_Name: DishName, 
          dish_Discription: Discription,
          course_Type: courseType,
          price: parseInt(Price)
        };
        
        setMenu([...Menu, newDish]); // Update Menu state
        setDishName('');
        setDiscription('');
        setType('');
        setPrice('');
      } else {
        Alert.alert("Insufficient Information", "Please fill in all the fields.", [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
      }
    };
  
    return (

        
      <SafeAreaView style={styles.itemContainer}>
        <View style={styles.userInputView}> 
          <Text style={styles.EnterDish}>Enter New Dish Here</Text>
          <TextInput
            style={styles.input}
            placeholder='Dish name'
            value={DishName}
            onChangeText={setDishName}
          />
          <TextInput
            style={styles.input}
            placeholder='Description...'
            value={Discription}
            onChangeText={setDiscription}
          />
          <Picker
            selectedValue={courseType}
            onValueChange={(itemValue: SetStateAction<string>) => setType(itemValue)}
            style={styles.input}
          >
            {CourseType.map((courseType) => (
              <Picker.Item label={courseType} value={courseType} key={courseType} />
            ))}
          </Picker>
          <TextInput
            style={styles.input}
            placeholder='Dish Price'
            value={Price}
            onChangeText={setPrice}
            keyboardType='numeric'
          />
          <TouchableHighlight onPress={handleAdd} style={styles.button}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={() => props.navigation.navigate('Home', { 
              dish_Name: DishName, 
              dish_Discription: Discription,
              course_Type: courseType,
              price: Price 
            })}
          >
            <Text style={styles.buttonText}>Save Name</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  };
  /** End of Screen 1 definition **/ 
  
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
   
      