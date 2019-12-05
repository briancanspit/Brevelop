import React from "react"
import { useSelector, useDispatch } from "react-redux"
import addTweetToState from "../actions/addTweetToState"
const { remote } = window.require("electron")

const TweetStream = (props) => {
  let dispatch = useDispatch(),
    keyword = useSelector((state) => state.submitText),
    tweetSize = useSelector((state) => state.tweetCollection),
    twitStream = remote.getGlobal("GetTweets")(keyword)

  if (props.opts.streamCancelled) {
    twitStream.stop()
    dispatch(addTweetToState(false))
  } else {
    twitStream.on("tweet", (tweet) => {
      dispatch(addTweetToState(tweet))
      if (tweetSize.length > 30) {
        twitStream.stop()
        dispatch(addTweetToState(false))
      }
    })
    twitStream.on("error", (error) => {
      twitStream.stop()
      dispatch(addTweetToState(false))
    })
  }

  return <span></span>
}

export default TweetStream
