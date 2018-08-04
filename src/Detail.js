import React, { Component } from 'react';
import { View, ActivityIndicator, WebView } from 'react-native';

class Detail extends Component {     

    renderLoading() {        
        return (
            <View style={{ flex: 1 }}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        )        
    }
    
    render() {
        console.log(this.props.navigation.state.params.detail)
        return (            
                <WebView 
                    source={{ uri: `${this.props.navigation.state.params.detail}` }} style={{ flex: 1 }} 
                    onLoadStart={() => this.renderLoading()}                
                    startInLoadingState={true}
                />            
        )
    }
}

export default Detail