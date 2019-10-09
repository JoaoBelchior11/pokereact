import React, { Component } from 'react'
import axios from 'axios'

const TYPES = {

    grass: 'green',
    fire: 'red',
    water: 'blue',
    electric: 'yellow',
    fairy: 'pink',
    dark: 'black',
    fighting: 'brown',
    rock: 'light-brown',
    poison: 'purple',
    psychic : 'violet'


}

export default class Pokemon extends Component {

    state={
        name: '',
        pokemonIndex: '',
        imageUrl: '',
        types: [],
        description: '',
        stats: {
            hp:'',
            attack:'',
            defense: '',
            speed: '',
            specialAttack:'',
            specialDeffense: ''
        },
        height:'',
        weigth:'',
        eggGroup:'',
        abilities: '',
        genderRatioMale: '',
        genderRatioFemale:'',
        evs: '',
        hatchSteps:''

    }

    async componentDidMount(){

        const {pokemonIndex} = this.props.match.params;

        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`
        const pokemonSpecieUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}`

        const pokemonResponse = await axios.get(pokemonUrl)

        const name = pokemonResponse.data.name;
        const imageUrl = pokemonResponse.data.sprites.front_default;

        let {hp, attack, deffense, speed, specialAttack, specialDefense} = '';

        pokemonResponse.data.stats.map(stat => {
            // eslint-disable-next-line default-case
            switch(stat.stat.name){
                case 'hp':
                    hp = stat['base_stat']
                    break;
                case 'attack':
                    attack = stat['base_stat']
                    break;
                case 'speed':
                    speed = stat['base_stat']
                    break;
               case 'special-attack':
                    specialAttack = stat['base_stat']
                    break;
                case 'deffense':
                    deffense = stat['base_stat']
                    break;
                case 'special-deffense':
                    specialDefense = stat['base_stat']
                    break;
            }
        })

        const height= pokemonResponse.data.height;
        const weigth = pokemonResponse.data.weigth;
        
        const types = pokemonResponse.data.types.map(type => type.type.name);

        const abilities = pokemonResponse.data.abilities.map(ability => {
            return ability.ability.name.toLowerCase().split('-').
            map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
        })

        const evs = pokemonResponse.data.stats.filter(stat => {
            if(stat.effort > 0){
                return true
            }
            return false
        }).map(stat => {
            return `${stat.effort} ${stat.name}`
            .toLowerCase()
            .split('-')
            .map(s => s.charAt(0).toUpperCase + s.substring(1))
            .join(' ')
        }).join(', ')

        await axios.get(pokemonSpecieUrl).then(resp => {
            let description = '';
            resp.data.flavor_text_entries.some(flavor => {
                if(flavor.language.name==='en'){
                    description = flavor.flavor_text;
                    return;
                }
            })

            const femaleRate = resp.data['gender_rate'];
            const genderRatioFemale = 12.5 * femaleRate;
            const genderRatioMale = 12.5 * (8 - femaleRate)

            const catchRate = Math.round(100/255) * resp.data['capture_rate']
            
            const eggGroups = resp.data['egg_groups'].map(group => {
                return group.name.toLowerCase()
                .split('-')
                .map(s => s.charAt(0).toUpperCase + s.substring(1))
                .join(' ')
            }).join(', ')
            
            const hatchSteps = 255 * (resp.data['hatch_counter'] + 1)
        
            this.setState({
                description,
                genderRatioMale,
                genderRatioFemale,
                catchRate,
                eggGroups,
                hatchSteps
            })

            this.setState({
                imageUrl,
                pokemonIndex,
                types,
                stats: {
                    hp,
                    attack,
                    deffense,
                    speed,
                    specialAttack,
                    specialDefense
                }

            })
        })
    }
    render() {
        return (
            <div className="col">
                <div className="card">
                <div className="card-header">
                <div className="row">
                    <h5>
                        {this.state.pokemonIndex}
                    </h5>
                </div>
                <div className="col-7">
                    <div className="float-right">
                        {this.state.types.map(type => (
                            <span key={type}
                            className="badge badge-primary badge-pill mr-1"
                            style={{backgroundColor: TYPES[type],
                            color: 'white'}}> {type}</span>
                        ))}
                    </div>
                </div>
                </div>
                </div>

            </div>
        )
    }
}
