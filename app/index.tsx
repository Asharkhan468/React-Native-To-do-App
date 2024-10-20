import {
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  StatusBar,
  Pressable,
  Modal,
  Alert,
} from "react-native";
import React, { Component, useState } from "react";
import { ThemedText } from "@/components/ThemedText";



export default function index() {
  const [input, setInput] = useState(""); //get the value of input
  const [todo, setTodo] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [updatedValue , setUpdatedValue] = useState('');
  const [index , setIndex] = useState(0);

  //add todo fuct

  const addTodo = () => {
    todo.push(input);
    setTodo([...todo]);
    setInput("");
    Alert.alert('Todo Added Sucessfully!')
    console.log(todo);
  };

  const deleteTodo = (index:number) => {
    todo.splice(index , 1);
    setTodo([...todo]);
    Alert.alert('Todo Deleted Sucessfully!')

  }

  const editTodo = (index:number) => {
    setModalVisible(true)
    todo.splice(index , 1 , updatedValue);
    setTodo([...todo])
    setUpdatedValue("")
    setModalVisible(false)
    Alert.alert('Todo Updated Sucessfully!')
    
  }

  return (

    <>
    <View>
      <SafeAreaView>
        <ThemedText style={styles.text}>To-do App</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Enter the Todo..."
          value={input}
          onChangeText={setInput}
        />

      
        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Text style={styles.textBtn}>Add Todo</Text>
        </TouchableOpacity>



      
      {todo.length!=0 ? <FlatList
          data={todo}
          renderItem={({ item , index }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item}</Text>
             
              <TouchableOpacity onPress={() => deleteTodo(index)} style={styles.deleteBtn}>
        <Text style={{color:'white' , fontWeight:'bold'}}>Delete</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
        setIndex(index)
        setUpdatedValue(todo[index])
        setModalVisible(true)
      }} style={styles.editBtn} activeOpacity={0.5}>
        <Text style={{color:'black' , fontWeight:'bold'}}>Edit</Text>
        
      </TouchableOpacity>
     
            </View>
            
            
          )}
          keyExtractor={(item, index) => index.toLocaleString()}
        /> :<Text style={{textAlign:'center' , marginTop:50, fontSize:20, fontWeight:'bold' , alignItems:'center'}}>No Todo Found...</Text> }
      
      </SafeAreaView>
      
    </View>


<View style={styles.centeredView}>
<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    Alert.alert('Modal has been closed.');
    setModalVisible(!modalVisible);
  }}>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
    <TextInput
          style={styles.editInput}
          placeholder="Enter updated Todo..."
          value={updatedValue}
          onChangeText={setUpdatedValue}
        />
      
     <View style={{flexDirection:'row' , gap:14}}>
     <Pressable
        style={[styles.buttonModal, styles.buttonClose]}
        onPress={() => editTodo(index)}>
        <Text style={styles.textStyle}>Update</Text>
      </Pressable>
      <Pressable
        style={[styles.buttonModal, styles.buttonClose , styles.buttonCancel]}
        onPress={() => setModalVisible(!modalVisible)}>
        <Text style={styles.textStyle}>Cancel</Text>
      </Pressable>
     </View>
      
    </View>
  </View>
</Modal>
</View>
</>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 30,
    marginVertical: 25,
    borderRadius: 12,
  },
  text: {
    fontSize: 25,
    color: "black",
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#fca311",
    padding: 10,
    marginHorizontal: 130,
    borderRadius: 12,
  },
  textBtn: {
    color: "white",
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#dee2e6',
    padding: 20,
    marginVertical:25,
    marginHorizontal: 20,
    borderRadius:10,
    textShadowColor:'grey'
   
    
  },
  title: {
    fontSize: 28,
    textAlign: "center",
  },
  deleteBtn:{
    alignItems: 'center',
    backgroundColor: '#ef233c',
    padding: 10,
    marginTop:10,
    borderRadius:12,

  },
  editBtn:{
    alignItems: 'center',
    backgroundColor: '#4cc9f0',
    padding: 10,
    marginTop:10,
    borderRadius:12,

  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  editInput:{
    margin: 20,
    width: 220,
    borderWidth:1,
    padding: 8,
    marginHorizontal: 30,
    marginVertical: 25,
    borderRadius: 12,


  },
  buttonCancel:{
    backgroundColor:'#b5179e',
  }
  
});
