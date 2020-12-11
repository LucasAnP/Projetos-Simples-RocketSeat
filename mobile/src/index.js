import React, {useEffect, useState} from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

//importando api do services/api
import api from './services/api';

export default function App(){
  // Estado para armazenar os projetos da aplicação
  const[projects, setProjects] = useState([]);

  // () => {} ser disparada quando, []essas variaveis mudarem (Como não tem nada
  //no array, será disparado uma única vez)
  useEffect(() => {
    api.get('projects').then(response =>{
      console.log(response.data);
      setProjects(response.data);
    })
  }, []) ;

  async function handleAddProject(){
    const response = await api.post ('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Lucas Antonio'
    });
    const project = response.data;
    setProjects([...projects,project]);
  }

  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>
 
    <SafeAreaView style = {styles.container}>
      <FlatList 
        data = {projects}
        // Pegar cada item do array e vai retornar qual valor único de cda
        keyExtractor = {project => project.id}
        renderItem ={ ({item}) => (
        <Text style = {styles.project} >{item.title}</Text>
        )}
      />

      <TouchableOpacity 
      activeOpacity={0.7} 
      style = {styles.button} 
      onPress ={handleAddProject}
      >
        <Text style = {styles.buttonText}>Adicionar Projeto</Text>
      
      </TouchableOpacity>   

    </SafeAreaView>
 
 
  {/* <View style={styles.container}>
    {projects.map(project => (
      <Text style = {styles.project} key = {project.id} >{project.title}</Text>)
    )}
  </View> */}
  </>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#7159c1',
  },
  project:{
    color: '#fff',
    fontSize:30

  },
  button:{
    alignSelf: "stretch",
    backgroundColor:'#fff',
    margin:20,
    height: 50,
    borderRadius:4,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonText:{
    fontWeight:'bold',
    fontSize:16,
  }
})