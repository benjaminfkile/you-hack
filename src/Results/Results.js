
import React, { Component } from 'react'
import MediaPlayer from '../Controls/MediaPlayer/MediaPlayer'
import "../Results/Results.css"


class Results extends Component {

    constructor(props) {
        super(props);
        this.state = {
            interval: 100,
            waiting4DB: true,
            nowPlaying: '',
            idx: 0
        }
    }

    componentDidMount() {
        this.setState({ interval: setInterval(this.listen4DB, this.state.interval) })
    }

    listen4DB = () => {
        if (this.props.response) {
            this.setState({ waiting4DB: false })
            //come up with something better
            this.stopListening4DB()
        }
    }

    stopListening4DB = () => {
        clearInterval(this.state.interval);
    }



    render() {

        let queu = []
        let idx = -1;
        if (this.props.response) {
            for (let i = 0; i < this.props.response.items.length; i++) {
                if (this.props.response.items[i].id.videoId) {
                    idx++
                    let date = this.props.response.items[i].snippet.publishedAt
                    date = date.split('T')
                    queu.push(
                        {
                            title: this.props.response.items[i].snippet.title,
                            description: this.props.response.items[i].snippet.description,
                            thumbnail: this.props.response.items[i].snippet.thumbnails.default.url,
                            id: this.props.response.items[i].id.videoId,
                            published: date[0],
                            idx: idx
                        })
                }
            }
        }

        return (
            <div className="Results">
                {queu && !this.state.waiting4DB && <MediaPlayer
                    response={queu}
                    nowPlaying={this.state.nowPlaying}
                    idx={this.state.idx}
                />}
                {queu && !this.state.waiting4DB && <div className="List">
                    <ul>
                        {queu.map(videos =>
                            <div className="Item" tabIndex={videos.idx} key={Math.random() * Math.random()} onClick={() => this.playTrack(videos)} >
                                <div className="Image">
                                    <img src={videos.thumbnail} alt="Smiley face" height="90" width="120"></img>
                                </div>
                                <div className="Info">
                                    <li>{videos.title}</li>
                                    <p>{videos.published}</p>
                                </div>
                            </div>)}
                    </ul>
                </div>}
            </div>
        )
    }
}

export default Results