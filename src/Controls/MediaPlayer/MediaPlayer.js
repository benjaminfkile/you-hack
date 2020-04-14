import React, { Component } from 'react'
import Decoder from '../Decoder/Decoder'
import "../MediaPlayer/MediaPlayer.css"

class MediaPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nowPlaying: null,
            idx: 0,
            pause: false,
        }
    }

  
    playTrack = (args) => {
        if (audio) {
            this.setState({ pause: false })
            audio.pause()
        }
        if (args) {
            this.setState(
                {
                    nowPlaying: args.id,
                    idx: args.idx,
                    pause: true
                })
        } else {

            if (this.state.nowPlaying) {
                var audio = document.getElementById("audio");
                this.setState({ pause: true })
                audio.play()
            }
            else {
                this.setState(
                    {
                        idx: 0,
                        nowPlaying: this.props.response[0].id,
                        pause: true
                    })
            }
        }
    }

    pause = () => {
        var audio = document.getElementById("audio");
        if (audio) {
            this.setState({ pause: false })
            audio.pause()
        }

    }

    next = (args) => {
        if (args.idx < this.props.response.length - 1) {
            this.setState(
                {
                    idx: this.state.idx + 1,
                    nowPlaying: this.props.response[this.state.idx + 1].id,
                    pause: true
                })
        } else {
            this.setState(
                {
                    idx: 0,
                    nowPlaying: this.props.response[0].id,
                    pause: true

                })
        }
    }

    previous = (args) => {
        if (args.idx > 0) {
            this.setState(
                {
                    idx: this.state.idx - 1,
                    nowPlaying: this.props.response[this.state.idx - 1].id,
                    pause: true
                })
        } else {
            this.setState(
                {
                    idx: this.props.response.length - 1,
                    nowPlaying: this.props.response[this.props.response.length - 1].id,
                    pause: true
                })
        }
    }

    render() {

        console.log(this.props)

        return (
            <div className="Media_Player">

               {this.props.response && <div className="Controls">
                    <section>
                            <h1>
                                {this.props.response[this.state.idx].title}
                            </h1>
                            <p>
                                {this.props.response[this.state.idx].description}
                            </p>
                        </section>
                    <br>
                    </br>
                    <ul>
                        <li onClick={() => this.previous(this.props.response[this.state.idx])}>
                            &lt;
                            </li>
                        {!this.state.pause && <li onClick={() => this.playTrack()}>
                            play
                            </li>}
                        {this.state.pause && <li onClick={() => this.pause()}>
                            pause
                            </li>}
                        <li onClick={() => this.next(this.props.response[this.state.idx])}>
                            &gt;
                            </li>
                    </ul>
                </div>}
                <Decoder
                    videoId={this.state.nowPlaying}
                />
            </div>
        )
    }
}

export default MediaPlayer