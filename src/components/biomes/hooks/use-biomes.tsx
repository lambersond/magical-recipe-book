import { useContext } from 'react'
import { BiomesApiContext, BiomesContext } from '../biomes-provider'

export function useBiomes() {
  return useContext(BiomesContext).biomes
}

export function useBiomesApi() {
  const biomesApi = useContext(BiomesApiContext)
  return biomesApi
}

export function useBiomesFilters() {
  const updateBiomes = useBiomesApi()
  const biomes = useContext(BiomesContext).defaultBiomes

  const searchOnChange = (value: string) => {
    const searchString = value.toLowerCase()
    const filteredBiomes = biomes.filter(biome =>
      biome.name.toLowerCase().includes(searchString),
    )
    updateBiomes(filteredBiomes)
  }

  return {
    searchOnChange,
  }
}
