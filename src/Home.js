import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    FlatList, 
    ActivityIndicator,
    Image 
} from 'react-native';

const URL = 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Frss.detik.com%2F'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            loading: false
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        // fecth  data from detik.com rss
        this.setState({ loading: true })
        return fetch(URL, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => this.setState({
                data: data.items,
                loading: false
            }))
            .catch(err => console.log(err))
    }

    renderAll() {
        if(this.state.loading) {
            return (
                <View>
                    <ActivityIndicator size="large" color="#000" />
                </View>
            )            
        }
        return(
            <View>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(x,i) => i.toString()}
                    refreshing={this.state.loading}
                    onRefresh={() => this.fetchData()}         
                    renderItem={this.renderItem}                       
                />
            </View>
        )
    }

    render() {
        console.log(this.state.data)
        return (
            <View style={styles.container}>
                {this.renderAll()}
            </View>            
        )
    }

    showDetail(index) {
        this.props.navigation.navigate('Detail', {detail: index})
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.news} onPress={() => this.showDetail([
                item.link
            ])}>
                <View style={styles.wrapImage}>
                    <Image source={{ uri: item.enclosure.link }} style={styles.image} />
                </View>                
                <View style={styles.viewText}>
                    <Text>{item.title}</Text>
                    <Text>{item.pubDate}</Text>
                </View>                
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    news: {
        flexDirection: 'row',
        flex: 1,
        height: 80,                
        padding: 8,
        borderBottomColor: '#f1f1f1',
        borderBottomWidth: 1
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 5,        
    },
    wrapImage: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewText: {        
        marginLeft: 8,
        marginRight: 8,    
        width: '75%'    
    },
    text: {
        color: '#000',
        marginRight: 8
    }
})

export default Home
