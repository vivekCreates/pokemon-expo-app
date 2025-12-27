import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

interface Pokemon {
  name: string;
  url:string;
}

export default function Index() {
  const [pokemons, setPokemons] = useState<{name:string,imageFront:string,imageBack:string}[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon/?limit=20"
        );
        const data = await response.json();

        const detailedPokemons = await Promise.all(
          data.results.map(async (pokemon: Pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();

            return {
              name: pokemon.name,
              imageFront: details.sprites.front_default,
              imageBack: details.sprites.back_default,
            };
          })
        );

        setPokemons(detailedPokemons);
      } catch (error: any) {
        console.log("Error:", error?.message);
        setPokemons([]);
      }
    }

    fetchData();
  }, []);

  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",       
          justifyContent: "space-between",
          padding: 16,
        }}
      >
        {pokemons.map((pokemon, id) => (
          <Link href={{pathname:"/detail",params:{name:pokemon.name}}} key={id} style={{marginBottom:10}}>
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
            <Text style={{ marginBottom: 25 ,fontSize:22,fontWeight:"600"}}>{pokemon.name}</Text>
            <View style={{width:"100%",alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
            <Image
              source={{ uri: pokemon.imageFront }}
              style={{ width: 150, height: 120 }}
            />
            <Image
              source={{ uri: pokemon.imageBack }}
              style={{ width: 150, height: 120 }}
            />
            </View>
          </View>
           </Link>
        ))}
      </View>
    </ScrollView>
  );
}
