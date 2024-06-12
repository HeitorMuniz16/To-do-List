import { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import Picker from '@react-native-picker/picker';

import NotaEditor from './src/componentes/NotaEditor';
import Nota from './src/componentes/NotaEditor';
import { criarTabela, buscarNota } from './src/services/Notas';

export default function App(){
  const [notas, setNotas ] = useState([]);
  const [notaSel, setNotaSel ] = useState([]);
  const [categoria, setCategoria ] = useState([]);

  useEffect(() => {
    criarTabela();
  }, []);

  useEffect(() => {
    async function iniciarNotas(){
      await mostrarNotas();
    }
    iniciarNotas();
  }, [categoria]);

  async function mostrarNotas(){
    const tarefas = await buscarNotas(categoria);
    setNotas(tarefas);
  }

  return(
    <SafeAreaView style={estilos.container}>
      <View style={estilos.modalPicker}>
        <Picker selectedValue={categoria} 
                onValueChanged={(itemValue) => setCategoria(itemValue)}>
                  <Picker.Item label="Pessoal" value="Pessoal"/>
                  <Picker.Item label="Trabalho" value="Trabalho"/>
                  <Picker.Item label="Outros" value="Outros"/>
         </Picker>
      </View>

      <FlatList data={notas}
                renderItem={(nota) => (
                  <Nota item={nota.item} setNotaSel={setNotaSel}/>
                )}
                keyExtractor={(nota) => nota.id}
                  />
                  <NotaEditor showNotas={mostrarNotas}
                              notaSel={notaSel}
                              setNotaSel={setNotaSel}>
                  </NotaEditor>

    </SafeAreaView>
  );

  const estilos = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
    },
   
    modalPicker: {
      borderWidth: 1,
      borderRadius: 6,
      borderColor: '#eee',
      margin: 10,
    },
  })
}