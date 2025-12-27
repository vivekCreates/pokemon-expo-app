import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { PokemonShape } from '.';



const detail = () => {
    const params = useLocalSearchParams();
    const name = params?.name

    const [pokemon,setPokemon] = useState<PokemonShape>()

    useEffect(()=>{
        async function fetchPokemon(){
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
                const data = await response.json();
                setPokemon({
                    name:data.forms[0].name,
                    imageFront: data.sprites.front_default,
                    imageBack: data.sprites.back_default,
                })
            } catch (error:any) {
                console.log("Error: ",error?.message)
            }
        }
        fetchPokemon()
    },[])
    
  return (
     <View
                style={{
                  width: "100%",        
                  backgroundColor: "lightblue",
                  marginBottom: 10,
                  alignItems: "center",
                  padding: 14,
                  borderRadius: 8,
                  height:250
                }}
              >
                <View style={{width:"100%",alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
                <Image
                  source={{ uri: pokemon?.imageFront }}
                  style={{ width: 150, height: 120 }}
                />
                <Image
                  source={{ uri: pokemon?.imageBack }}
                  style={{ width: 150, height: 120 }}
                />
                </View>
                <Text style={{ marginTop: 25 ,fontSize:22,fontWeight:"600"}}>{pokemon?.name}</Text>
              </View>
  )
}

export default detail

