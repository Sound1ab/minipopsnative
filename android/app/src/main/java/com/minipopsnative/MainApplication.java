package com.minipopsnative;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.cmcewen.blurview.BlurViewPackage;
import com.amazonaws.amplify.pushnotification.RNPushNotificationPackage;
import com.horcrux.svg.SvgPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.amazonaws.RNAWSCognitoPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new BlurViewPackage(),
            new RNPushNotificationPackage(),
            new SvgPackage(),
            new RNSpinkitPackage(),
            new RNAWSCognitoPackage(),
            new LinearGradientPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
