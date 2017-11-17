

var React = require('react');
var SocketIOClient = require('socket.io-client');

// Semantic UI
var Container = require('semantic-ui-react').Container;
var Grid = require('semantic-ui-react').Grid;
var Header = require('semantic-ui-react').Header;

var TwentyOne = require('./TwentyOne');

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sessionCode: null,
            cards: null
        }

        if (window.location.hostname === 'localhost') {
            this.socket = SocketIOClient('http://localhost:8080');
        } else {
            this.socket = SocketIOClient(window.location.hostname);
        }
        
        console.log(window.location);

    }

    componentDidMount() {
        this.socket.on('connect', function(){
            console.log('Web browser connected');
            this.socket.emit('startSession', 'startSession');
        }.bind(this));
        this.socket.on('sessionCode', function(code){
            console.log("Session code is " + code);
            this.setState(function() {
                return {
                    sessionCode: code
                }
            })
        }.bind(this))
        this.socket.on('updateCards', function(cards) {
            console.log(cards);
            this.setState(function() {
                return {
                    cards: cards
                }
            })
        }.bind(this))
        
    }

    render() {
        return (
            <div>
                <Container style={{marginTop:'7em'}}>
                    {this.state.sessionCode && <span>Session code<Header as='h3' color='red'>{this.state.sessionCode}</Header></span>}
                </Container>
                <Container style={{marginTop:'2em'}}>
                    <Grid columns={2}>
                        <Grid.Column>
                        {!this.state.sessionCode
                            ? <p>Loading...</p>
                            : <TwentyOne 
                                sessionCode={this.state.sessionCode} 
                                cards = {this.state.cards}
                                Component={TwentyOne}
                            />
                        }
                        </Grid.Column>
                        <Grid.Column>
                            <Header as='h3' color='grey'>App placeholder</Header>
                        </Grid.Column>   
                    </Grid>
                </Container>
            </div>
        )
    }

}

module.exports = Dashboard;