import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

interface Pokemon {
  name: string;
  url: string; // image url
}

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

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
              url: details.sprites.front_default,
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
          flexWrap: "wrap",        // ✅ allows wrapping
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        {pokemons.map((pokemon, id) => (
          <View
            key={id}
            style={{
              width: "48%",        // ✅ 2 columns
              backgroundColor: "lightblue",
              marginBottom: 10,
              alignItems: "center",
              padding: 10,
              borderRadius: 8,
            }}
          >
            <Image
              source={{ uri: pokemon.url }}
              style={{ width: 120, height: 120 }}
            />
            <Text style={{ marginTop: 5 }}>{pokemon.name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
