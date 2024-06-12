import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

//setNotaSel = nota selecionada
function Nota({item, setNotaSel}){
    const categorias  = { Peessoal: '#FF924f',
                          Outros: '# 00911f',
                          Trabalho: '#2f71eb'
    }

    const estilos = styleFunction(categorias[item.categoria])

    return(
        <TouchableOpacity style={estilos.cartao} onPress={() => setNotasSel(item)}>
            <Text style={estilos.titulo}>{item.titulo}</Text>
            <Text style={estilos.categoria}>{item.categoria}</Text>
            <Text style={estilos.texto}>{item.texto}</Text>
        </TouchableOpacity>
    )
}

const styleFunction = (cor) => StyleSheet.create({
    cartao: {
        borderRadius: 8,
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginHorizontal: 16,
        marginBottom: 8,
        borderTopWidth: 5,
        borderColor: cor,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.20,
        shadowRadius: 3,
        elevation: 4,
    },

    titulo: {
        fontSize: 24, 
        fontWeight: '700',
        marginBottom: 4,

    },

    categoria: {
       borderRadius: 5,
       backgroundColor: cor,
       padding: 5,
       color: '#fafafa',
       alignSelf: 'flex-start', 
    },

    texto: {
        lineHeight: 24,
    },


})

export default Nota;