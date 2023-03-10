export interface PaginatePokemonResponse {
	count: number;
	next: string;
	previous: null;
	results: Results[];
}

export interface Results {
	name: string;
	url: string;
}

export interface SimplePokemon {
	id: string;
	name: string;
	picture: string;
	color?: string;
	detail?: PokemonFull;
	teamPoints?: number;
}

// Generated by https://quicktype.io
export interface PokemonFull {
	abilities: Ability[];
	base_experience: number;
	forms: Species[];
	game_indices: GameIndex[];
	height: number;
	held_items: any[];
	id: number;
	is_default: boolean;
	location_area_encounters: string;
	moves: Move[];
	name: string;
	order: number;
	past_types: any[];
	species: Species;
	sprites: Sprites;
	stats: Stat[];
	types: Type[];
	weight: number;
	generation: any[];
	characteristics: Characteristics;
	regions: Region[];
}

export interface Ability {
	ability: Species;
	is_hidden: boolean;
	slot: number;
}

export interface Species {
	name: string;
	url: string;
}

export interface GameIndex {
	game_index: number;
	version: Species;
}

export interface Move {
	move: Species;
	version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
	level_learned_at: number;
	move_learn_method: Species;
	version_group: Species;
}

export interface GenerationV {
	'black-white': Sprites;
}

export interface GenerationIv {
	'diamond-pearl': Sprites;
	'heartgold-soulsilver': Sprites;
	platinum: Sprites;
}

export interface Versions {
	'generation-i': GenerationI;
	'generation-ii': GenerationIi;
	'generation-iii': GenerationIii;
	'generation-iv': GenerationIv;
	'generation-v': GenerationV;
	'generation-vi': { [key: string]: GenerationVi };
	'generation-vii': GenerationVii;
	'generation-viii': GenerationViii;
}

export interface Sprites {
	back_default: string;
	back_female: null;
	back_shiny: string;
	back_shiny_female: null;
	front_default: string;
	front_female: null;
	front_shiny: string;
	front_shiny_female: null;
	other?: Other;
	versions?: Versions;
	animated?: Sprites;
}

export interface GenerationI {
	'red-blue': RedBlue;
	yellow: RedBlue;
}

export interface RedBlue {
	back_default: string;
	back_gray: string;
	front_default: string;
	front_gray: string;
}

export interface GenerationIi {
	crystal: Crystal;
	gold: Crystal;
	silver: Crystal;
}

export interface Crystal {
	back_default: string;
	back_shiny: string;
	front_default: string;
	front_shiny: string;
}

export interface GenerationIii {
	emerald: Emerald;
	'firered-leafgreen': Crystal;
	'ruby-sapphire': Crystal;
}

export interface Emerald {
	front_default: string;
	front_shiny: string;
}

export interface GenerationVi {
	front_default: string;
	front_female: null;
	front_shiny: string;
	front_shiny_female: null;
}

export interface GenerationVii {
	icons: DreamWorld;
	'ultra-sun-ultra-moon': GenerationVi;
}

export interface DreamWorld {
	front_default: string;
	front_female: null;
}

export interface GenerationViii {
	icons: DreamWorld;
}

export interface Other {
	dream_world: DreamWorld;
	'official-artwork': OfficialArtwork;
}

export interface OfficialArtwork {
	front_default: string;
}

export interface Stat {
	base_stat: number;
	effort: number;
	stat: Species;
}

export interface Type {
	slot: number;
	type: Species;
}

// Generated by https://quicktype.io

export interface Characteristics {
	id: number;
	name: string;
	order: number;
	gender_rate: number;
	capture_rate: number;
	base_happiness: number;
	is_baby: boolean;
	is_legendary: boolean;
	is_mythical: boolean;
	hatch_counter: number;
	has_gender_differences: boolean;
	forms_switchable: boolean;
	growth_rate: Color;
	pokedex_numbers: PokedexNumber[];
	egg_groups: Color[];
	color: Color;
	shape: Color;
	evolves_from_species: Color;
	evolution_chain: EvolutionChain;
	habitat: null;
	generation: Color;
	names: Name[];
	flavor_text_entries: FlavorTextEntry[];
	form_descriptions: FormDescription[];
	genera: Genus[];
	varieties: Variety[];
}

export interface Color {
	name: string;
	url: string;
}

export interface EvolutionChain {
	url: string;
}

export interface FlavorTextEntry {
	flavor_text: string;
	language: Color;
	version: Color;
}

export interface FormDescription {
	description: string;
	language: Color;
}

export interface Genus {
	genus: string;
	language: Color;
}

export interface Name {
	name: string;
	language: Color;
}

export interface PokedexNumber {
	entry_number: number;
	pokedex: Color;
}

export interface Variety {
	is_default: boolean;
	pokemon: Color;
}

// Generated by https://quicktype.io

export interface LocationEncounters {
	location_area: LocationAreaElement;
	version_details: VersionDetail[];
}

export interface LocationAreaElement {
	name: string;
	url: string;
}

export interface VersionDetail {
	encounter_details: EncounterDetail[];
	max_chance: number;
	version: LocationAreaElement;
}

export interface EncounterDetail {
	chance: number;
	condition_values: LocationAreaElement[];
	max_level: number;
	method: LocationAreaElement;
	min_level: number;
}

// Generated by https://quicktype.io

export interface LocationArea {
	encounter_method_rates: any[];
	game_index: number;
	id: number;
	location: LocationClass;
	name: string;
	names: Name[];
	pokemon_encounters: PokemonEncounter[];
}

export interface LocationClass {
	name: string;
	url: string;
}

export interface Name {
	language: LocationClass;
	name: string;
}

export interface PokemonEncounter {
	pokemon: LocationClass;
	version_details: VersionDetail[];
}

export interface VersionDetail {
	encounter_details: EncounterDetail[];
	max_chance: number;
	version: LocationClass;
}

export interface EncounterDetail {
	chance: number;
	condition_values: LocationAreaElement[];
	max_level: number;
	method: LocationClass;
	min_level: number;
}

// Generated by https://quicktype.io

export interface Location {
	id: number;
	name: string;
	region: Region;
	names: Name[];
	game_indices: GameIndex[];
	areas: Region[];
}

export interface Region {
	name: string;
	url: string;
}

export interface GameIndex {
	game_index: number;
	generation: Region;
}

export interface Name {
	name: string;
	language: Region;
}
