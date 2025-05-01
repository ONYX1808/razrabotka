import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import { places, categories } from '../data/places';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Place from '@/entities/place';

class State {
    places: Place[];
    categories: string[];
    selectedCategory: string | null;
    selectedPlace: Place | null;

    constructor(
        places: Place[],
        categories: string[],
        selectedCategory: string | null,
        selectedPlace: Place | null,
    ) {
        this.places = places;
        this.categories = categories;
        this.selectedCategory = selectedCategory;
        this.selectedPlace = selectedPlace;
    }
}

const initialState: State = new State(places, categories, null, null);

type Action =
    | { type: 'SELECT_CATEGORY'; payload: string | null }
    | { type: 'SELECT_PLACE'; payload: Place | null }
    | { type: 'SAVE_PLACES'; payload: Place | null };

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'SELECT_CATEGORY':
            return new State(state.places, state.categories, action.payload, state.selectedPlace);
        case 'SELECT_PLACE':
            return new State(state.places, state.categories, state.selectedCategory, action.payload);
        case 'SAVE_PLACES':
            AsyncStorage.setItem('@places', JSON.stringify(state.places));
            return state;
        default:
            return state;
    }
};

const loadData = async () => {
    try {
        const savedPlaces = await AsyncStorage.getItem('@places');
        return savedPlaces ? JSON.parse(savedPlaces) : places;
    } catch (e) {
        return places;
    }
};


const PlacesContext = createContext({ state: initialState, dispatch: {} });

export const PlacesProvider = (props: { children: React.ReactNode | undefined }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <PlacesContext.Provider value={{ state: state, dispatch: dispatch }}>
            {props.children}
        </PlacesContext.Provider >
    );
};

export const usePlaces = () => useContext(PlacesContext);