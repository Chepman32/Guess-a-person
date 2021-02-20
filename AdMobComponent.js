import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
export class AdMobComponent extends Component {
  bannerError = () => {
    console.log('banner ad not loading')
  }
  bannerAdReceived = () => {
    console.log('banner ad received')
  }
  showInterstitial = async () => {
    AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/6300978111'); // Test ID, Replace with your-admob-unit-id
    
    try{
      await AdMobInterstitial.requestAdAsync();
      await AdMobInterstitial.showAdAsync();
    }
    catch(e){
      console.log(e);
    }
  }
  showRewarded = async () => {
    AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/6300978111'); // Test ID, Replace with your-admob-unit-id
    
    try{
      await AdMobRewarded.requestAdAsync();
      await AdMobRewarded.showAdAsync();
    }
    catch(e){
      console.log(e);
    }
  }
  render() {
    return (
      <>
  <AdMobBanner
  style={styles.bottomBanner}
    bannerSize="fullBanner"
    adUnitID="ca-app-pub-3940256099942544/6300978111"
    servePersonalizedAds // true or false
    onDidFailToReceiveAdWithError={this.bannerError} />
  
  {/* Display a DFP Publisher banner */}
      </>
    )
  }
}
const styles = StyleSheet.create({
  bottomBanner: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#ccc"
  },
})