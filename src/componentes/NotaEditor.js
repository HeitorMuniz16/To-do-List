import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Picker, { picker } from 'react-native-picker';
import { atualizarNota, removerNota, adicionarNota } from '../services/Notas';
 

export default function NotaEditor({ showNotas, notaSel, setNotaSel }) {
    const [ categoria, setCategoria ] = useState('Pessoal');
    const [ titulo, setTitulo ] = useState('');
    const [ texto, setTexto ] = useState('');
    const [ modalVisivel, setModalVisivel ] = useState(false);
    const [ atualizar ] = useState(false);

    async function salvarNota(){
        const nota = {
            titulo : titulo,
            categoria: categoria,
            texto: texto
        }
        await adicionarNota(nota);
        showNotas();
        limparModal();
    }

    async function alterarNota(){
        const nota = {
            id: notaSel.id,
            titulo : titulo,
            categoria: categoria,
            texto: texto
        }
        await atualizarNota(nota);
        showNotas();
        limparModal();
    }

    async function excluirNota(){
        await excluirNota(notaSel.id);
        showNotas();
        limparModal();
    }

    function preencherModal(){
        setTitulo(notaSel.titulo);
        setCategoria(notaSel.categoria);
        setTexto(notaSel.texto);
    }

    function limparModal(){
        setTitulo('');
        setCategoria('Pessoal');
        setTexto('');
        setNotaSel({});
        setModalVisible(false);
    }

    useInsertionEffect(() => {
        if(notaSel.id) {
            preencherModal();
            setAtualizar(true);
            setModalVisible(true);
            return
        }
        setAtualizar(false);

    }, [notaSel]);

    return(
        <>
        <Modal animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => {setModalVisivel(false)}}>

            <View style={estilos.centralizarModal}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={estilos.modal}>
                        <Text style={estilos.modalTitulo}>Criar nota</Text>
                        <Text style={estilos.modalSubTitulo}>Títulos da nota</Text>
                        <TextInput style={estilos.modalInput}
                                    onChangeText={value => setTitulo(value)}
                                    placeholder="Digite o título"
                                    value={titulo}>        
                        </TextInput>

                        <Text style={estilos.modalSubTitulo}>categoria</Text>
                        <View style={estilos.modalPicker}>
                            <Picker selectedValue={categoria}
                                    onValueChange={(itemValue => setCategoria(itemValue))}>

                                    <Picker.Item label="Pessoal" value="Pessoal"/>
                                    <Picker.Item label="Trabalho" value="Trabalho"/>
                                    <Picker.Item label="Outros" value="Outros"/>
                            </Picker>
                        </View>
                        <Text style={estilos.modalSubTitulo}>
                            Conteúdo da nota
                        </Text>

                        <TextInput style={estilos.modalInput}
                                   multiline={true}
                                   numberOfLines={3}
                                   onChangeText={novoTexto => setTexto(novoTexto)}
                                   placeholder="Digite aqui a sua nota"
                                   value={texto}
                        />     

                        <View style={modalBotoes}>
                            <TouchableOpacity style={estilos.modalBotaoSalvar}
                                onPress={() => atualizarNota ? alterarNota() : salvarNota}>
                            <Text style={estilos.modalBotaoTexto}>Salvar</Text>        
                            </TouchableOpacity>    

                            {
                                atualizar && (
                                    <TouchableOpacity style={estilos.modalBotaoDeletar}>
                                        onPress={() => {excluirNota()}}
                                        <Text style={estilos.modalBotaoTexto}>Excluir</Text>
                                    </TouchableOpacity>
                                )
                            }


                
                            <TouchableOpacity style={estilos.modalBotaoCancelar}
                                              onPress={() => {limparModal()}}>
                            <Text style={estilos.modalBotaoTexto}>Cancelar</Text>  
                            </TouchableOpacity>

                        </View>      
                    </View>
                </ScrollView>
            </View>
        </Modal>

    
        <TouchableOpacity style={estilos.exibirModal}
                          onPress={() => {setModalVisivel(true)}}>
            <Text style={estilos.exibirModalTexto}>+</Text>
        </TouchableOpacity>
        
        </>
    );

}

const estilos = StyleSheet.create({
    centralizarModal: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end'
    },
    modal:{
      backgroundColor: '#fff',
      paddingHorizontal: 15,
      paddingTop: 15,
      marginTop: 8,
      marginHorizontal: 15,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.4,
      shadowRadius: 6,
      elevation: 10,
    },
    modalTitulo: {
      fontSize: 26,
      fontWeight: '700',
      marginBottom: 20,
    },
    modalSubTitulo: {
      fontSize: 14,
      marginBottom: 8,
      fontWeight: '600',
    },
   
    modalInput: {
      fontSize: 18,
      marginBottom: 12,
      paddingHorizontal: 4,
      borderBottomWidth: 1,
      borderBottomColor: '#ff9a94',
    },
   
    modalPicker: {
      borderWidth: 1,
      borderColor: '#eee',
      marginBottom: 12,
    },
   
    modalBotoes: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
   
    modalBotaoTexto: {
      color: '#fff',
    },
   
    modalBotaoSalvar: {
      backgroundColor: '#2ea805',
      borderRadius: 5,
      padding: 8,
      width: 80,
      alignItems: 'center',
    },
   
    modalBotaoDeletar: {
      backgroundColor: '#d62a18',
      borderRadius: 5,
      padding: 8,
      width: 80,
      alignItems: 'center',
    },
   
    modalBotaoCancelar: {
      backgroundColor: '#057fa8',
      borderRadius: 5,
      padding: 8,
      width: 80,
      alignItems: 'center',
    },
   
    exibirModal:{
      backgroundColor: "#54ba32",
      justifyContent: "center",
      height: 64,
      width: 64,
      margin: 16,
      alignItems: "center",
      borderRadius: 9999,
      position: "absolute",
      bottom: 0,
      right: 0,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
   
    exibirModalTexto: {
      fontSize: 32,
      lineHeight: 40,
      color: "#FFFFFF",
    }
   
  });


