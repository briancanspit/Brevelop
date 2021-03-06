import React, { Component } from "react"
import { connect } from "react-redux"
import handleTweetValue from "../actions/handleTweetValue"
import fixateProfile from "../actions/fixateProfile"
import unfixateProfile from "../actions/unfixateProfile"
import { Fade } from "react-reveal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import {
  faUsers,
  faUserPlus,
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons"
import MaleAvatar from "../img/male.svg"
import "../styles/profileStructure.css"

class ProfileStructure extends Component {
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop
    if (winScroll >= 75) {
      this.props.fixateProfile()
    } else {
      this.props.unfixateProfile()
    }
  }
  render() {
    let styles = {
        position: "fixed",
        top: 20,
        width: "35.35%"
      },
      rowSize = this.props.profileFixed ? 9 : 5,
      textAreaClassName =
        this.props.tweetValue.length < 141
          ? "profileTextArea"
          : "profileTextAreaError",
      alertText =
        this.props.tweetValue.length < 141 ? (
          <p className="alert profileTweetAlert">What's on your mind?</p>
        ) : (
          <p className="alert profileTweetAlertDanger">
            Whoa! Your tweet is too long!
          </p>
        ),
      tweetCountClassName =
        this.props.tweetValue.length > 140 ? "tweetOverLimit" : "",
      tweetBtn =
        this.props.tweetValue.length > 140
          ? "btn btn-lg btn-info tweetBtnDisable shadow-none"
          : "btn btn-lg btn-info profileTweetBtn"
    return (
      <Fade duration={600} right>
        <div
          className="card profileCard"
          style={this.props.profileFixed && styles}
        >
          <div className="card-header profileHeader">
            <div className="profileHeaderTop">
              <img src={MaleAvatar} className="profileAvatar" alt="Avatar" />
              <div className="profileHeaderNames">
                <h6 className="profileDisplayName">Brian Njogu</h6>
                <p className="profileUserName">@briancanspit</p>
              </div>
            </div>
            <div className="profileIcons">
              <span className="profIconSpan">
                <FontAwesomeIcon icon={faTwitter} className="profileIcon" />
                <h6 className="profileTweetCount">203</h6>
                <h6 className="profileIconInfo">Tweets</h6>
              </span>
              <span className="profIconSpan">
                <FontAwesomeIcon icon={faUsers} className="profileIcon" />
                <h6 className="profileFollowerCount">15.6K</h6>
                <h6 className="profileIconInfo">Followers</h6>
              </span>
              <span className="profIconSpan">
                <FontAwesomeIcon icon={faUserPlus} className="profileIcon" />
                <h6 className="profileFollowingCount">968</h6>
                <h6 className="profileIconInfo">Following</h6>
              </span>
            </div>
          </div>
          <div className="card-body profileBody">
            {alertText}
            <div className="profileForm">
              <form
                onSubmit={event => {
                  event.preventDefault()
                  let tweetText = this.props.tweetValue
                  if (tweetText.length > 0 && tweetText.length < 141) {
                    alert("Tweeting!")
                  }
                }}
              >
                <div className="form-group">
                  <textarea
                    className={textAreaClassName}
                    rows={rowSize}
                    placeholder="Post a new tweet"
                    onChange={event => {
                      this.props.handleTweetValue(event.target.value)
                    }}
                    value={this.props.tweetValue}
                  ></textarea>
                </div>
                <div className="profileBtnContainer">
                  <span className="tweetCharacterCount">
                    <small className={tweetCountClassName}>
                      Used {this.props.tweetValue.length}/140 characters
                    </small>
                  </span>
                  <button className={tweetBtn} type="submit">
                    Tweet{" "}
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      className="profilePaperPlane"
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fade>
    )
  }
}

const mapStateToProps = state => ({
  tweetValue: state.tweetValue,
  profileFixed: state.fixateProfile
})

const mapDispatchToProps = () => {
  return {
    handleTweetValue,
    fixateProfile,
    unfixateProfile
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(ProfileStructure)
