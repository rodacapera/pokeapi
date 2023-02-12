import { PokemonFull, SimplePokemon } from '../interfaces/pokemonInterfaces';
import SearchView from '../views/SearchView';

export type RootStackParams = {
	TabsNavigator: undefined;
	HomeView: undefined;
	SettingsView: undefined;
	SearchView: undefined;
	PokemonView: { simplePokemon: SimplePokemon; color: string };
	PokemonTeamView: { simplePokemon: SimplePokemon; color: string; pokemonInformation: PokemonFull };
};
