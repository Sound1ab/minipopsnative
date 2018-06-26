export const ADD_TO_FAVOURITES = 'ADD_TO_FAVOURITES'
export const FETCH_DATA = 'FETCH_DATA'

export function addToFavourites(id) {
  return {
    type: ADD_TO_FAVOURITES,
    id,
  }
}

export function fetchData() {
  return {
    type: FETCH_DATA,
  }
}

export async function fetchDataAsync(api) {
  try {
    const response = await fetch(api)
    return response.json()
  } catch (error) {
    return error
  }
}
