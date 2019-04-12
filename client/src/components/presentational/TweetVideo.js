import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import VisibilitySensor from 'react-visibility-sensor';

import {
  TweetVideoWrapper,
  TweetVideoFrame,
  TweetVideoOverlay,
  VideoControls,
  VideoControlsWrapper,
  VideoProgress,
  VideoProgressBar,
  VideoProgressSlider,
  VideoControlsLeft,
  VideoControlsRight,
  VideoControlsButton,
  VideoControlsButtonSlider,
  VideoControlsText,
} from '../styled-components';

class TweetVideo extends Component {
  state = {
    supportsVideo: false,
    supportsFullScreen: false,
    isFullScreen: false,
    volume: 0,
    progress: 0,
    duration: 0,
    isPaused: false,
    isMuted: true,
    isControls: false,
  };

  componentDidMount() {
    this.setState({
      supportsVideo: !!document.createElement('video').canPlayType,
      supportsFullScreen: !!(
        document.fullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.msFullscreenEnabled ||
        document.webkitSupportsFullscreen ||
        document.webkitFullscreenEnabled ||
        document.createElement('video').webkitRequestFullScreen
      ),
    });

    document.addEventListener('fullscreenchange', () => {
      this.setState({
        isFullScreen: !!(document.fullScreen || document.fullscreenElement),
      });
    });
    document.addEventListener('webkitfullscreenchange', () => {
      this.setState({ isFullScreen: !!document.webkitIsFullScreen });
    });
    document.addEventListener('mozfullscreenchange', () => {
      this.setState({ isFullScreen: !!document.mozFullScreen });
    });
    document.addEventListener('msfullscreenchange', () => {
      this.setState({ isFullScreen: !!document.msFullscreenElement });
    });
  }

  componentWillUnmount() {
    document.removeEventListener('fullscreenchange', () => {
      this.setState({
        isFullScreen: !!(document.fullScreen || document.fullscreenElement),
      });
    });
    document.removeEventListener('webkitfullscreenchange', () => {
      this.setState({ isFullScreen: !!document.webkitIsFullScreen });
    });
    document.removeEventListener('mozfullscreenchange', () => {
      this.setState({ isFullScreen: !!document.mozFullScreen });
    });
    document.removeEventListener('msfullscreenchange', () => {
      this.setState({ isFullScreen: !!document.msFullscreenElement });
    });
  }

  setDuration = () => {
    const v = this.video;

    v.volume = 0;
    v.muted = true;

    this.setState({
      duration: v.duration ? v.duration : 0,
    });
  };

  handleVisibility = async isVisible => {
    const v = this.video;

    if (isVisible) {
      try {
        await v.play();

        this.setState({
          isPaused: false,
          isControls: false,
        });
      } catch (err) {
        v.pause();
      }
    } else {
      v.pause();
      v.muted = true;

      this.setState({
        isPaused: true,
        isMuted: true,
      });
    }
  };

  formatTime = (time, reverse = false) => {
    const { duration } = this.state;

    time = reverse ? duration - time : time;

    let seconds = Math.floor(time);
    let minutes = Math.floor(seconds / 60);

    let formattedTime = '';

    if (minutes > 0) {
      formattedTime += `${minutes}:`;

      seconds -= minutes * 60;
    } else {
      formattedTime += '0:';
    }

    if (seconds > 9) {
      formattedTime += seconds;
    } else if (seconds > 0) {
      formattedTime += `0${seconds}`;
    } else {
      formattedTime += '00';
    }

    return formattedTime;
  };

  handleProgress = () => {
    const v = this.video;

    if (this.state.duration === 0) this.setState({ duration: v.duration });

    this.setState({
      progress: v.currentTime,
    });
  };

  handleMouseOver = () => {
    this.setState({
      isControls: true,
    });
  };

  handleMouseOut = () => {
    this.setState((state, props) => ({
      isControls: state.isPaused,
    }));
  };

  handleSeek = e => {
    const v = this.video;
    const val = e.target.value;

    this.setState(
      {
        progress: val,
      },
      () => {
        v.currentTime = val;
      },
    );
  };

  handlePlayOrPause = () => {
    const v = this.video;

    if (v.paused || v.ended) {
      this.setState(
        {
          isPaused: false,
        },
        () => {
          v.play();
        },
      );
    } else {
      this.setState(
        {
          isPaused: true,
        },
        () => {
          v.pause();
        },
      );
    }
  };

  handleMute = () => {
    const v = this.video;

    v.muted = !v.muted;
    v.volume = v.volume > 0 ? v.volume : 1;

    this.setState({
      volume: v.muted ? 0 : v.volume > 0 ? v.volume * 100 : 100,
      isMuted: v.muted,
    });
  };

  handleVolume = e => {
    const v = this.video;
    const val = e.target.value;

    v.muted = val === '0' ? true : false;

    this.setState(
      {
        volume: val,
        isMuted: val === '0' ? true : false,
      },
      () => {
        v.volume = val / 100;
      },
    );
  };

  handleFullScreen = () => {
    const vc = this.videoContainer;
    if (
      !!(
        document.fullScreen ||
        document.webkitIsFullScreen ||
        document.mozFullScreen ||
        document.msFullscreenElement ||
        document.fullscreenElement
      )
    ) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }

      this.setState({
        isFullScreen: false,
      });
    } else {
      if (vc.requestFullscreen) {
        vc.requestFullscreen();
      } else if (vc.mozRequestFullScreen) {
        vc.mozRequestFullScreen();
      } else if (vc.webkitRequestFullScreen) {
        vc.webkitRequestFullScreen();
      } else if (vc.msRequestFullscreen) {
        vc.msRequestFullscreen();
      }

      this.setState({
        isFullScreen: true,
      });
    }
  };

  render() {
    const {
      supportsVideo,
      volume,
      progress,
      duration,
      supportsFullScreen,
      isPaused,
      isMuted,
      isControls,
    } = this.state;
    const { media_url, media_type, content_url, content_type } = this.props;

    return (
      <VisibilitySensor
        partialVisibility
        offset={{ top: 106, bottom: 50 }}
        onChange={this.handleVisibility}
      >
        <TweetVideoWrapper
          ref={node => (this.videoContainer = node)}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        >
          <TweetVideoFrame
            ref={node => (this.video = node)}
            onClick={this.handlePlayOrPause}
            controls={!supportsVideo}
            preload="none"
            poster={media_url}
            onLoadedMetadata={this.setDuration}
            onTimeUpdate={this.handleProgress}
            playsInline
            loop
          >
            <source src={content_url} type={content_type} />
          </TweetVideoFrame>
          <TweetVideoOverlay
            gif={media_type === 'animated_gif'}
            isControls={isControls && media_type !== 'animated_gif'}
          >
            {media_type === 'animated_gif'
              ? 'GIF'
              : this.formatTime(progress, true)}
          </TweetVideoOverlay>
          <VideoControlsWrapper
            supportsVideo={supportsVideo}
            isControls={isControls && media_type !== 'animated_gif'}
          >
            <VideoProgress>
              <VideoProgressBar value={progress} min="0" max={duration || 0}>
                <span
                  style={{
                    width: `${Math.floor((progress / duration) * 100)}%`,
                  }}
                />
              </VideoProgressBar>
              <VideoProgressSlider
                type="range"
                min="0"
                max={duration || 0}
                step={duration ? duration / 100 : 0}
                value={progress}
                onInput={this.handleSeek}
                onChange={this.handleSeek}
              />
            </VideoProgress>
            <VideoControls>
              <VideoControlsLeft>
                <VideoControlsButton
                  type="button"
                  onClick={this.handlePlayOrPause}
                >
                  {isPaused ? (
                    <FontAwesomeIcon icon={['fas', 'play']} />
                  ) : (
                    <FontAwesomeIcon icon={['fas', 'pause']} />
                  )}
                </VideoControlsButton>
              </VideoControlsLeft>
              <VideoControlsRight>
                <VideoControlsText>
                  {this.formatTime(progress)} / {this.formatTime(duration)}
                </VideoControlsText>
                <VideoControlsButton type="button">
                  {isMuted ? (
                    <FontAwesomeIcon
                      icon={['fas', 'volume-mute']}
                      onClick={this.handleMute}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={['fas', 'volume-up']}
                      onClick={this.handleMute}
                    />
                  )}
                  <VideoControlsButtonSlider
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={volume}
                    onInput={this.handleVolume}
                    onChange={this.handleVolume}
                  />
                </VideoControlsButton>
                <VideoControlsButton
                  type="button"
                  onClick={this.handleFullScreen}
                  supportsFullScreen={!supportsFullScreen}
                >
                  <FontAwesomeIcon icon={['fas', 'expand']} />
                </VideoControlsButton>
              </VideoControlsRight>
            </VideoControls>
          </VideoControlsWrapper>
        </TweetVideoWrapper>
      </VisibilitySensor>
    );
  }
}

export default TweetVideo;
