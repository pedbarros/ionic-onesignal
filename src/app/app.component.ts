import {Component} from '@angular/core';
import {AlertController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {OneSignal} from "@ionic-native/onesignal";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = HomePage;

    constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
                public oneSignal: OneSignal, public alertCtrl: AlertController) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            console.log(this.platform.platforms());
            //if (this.platform.is('ios') || this.platform.is('android')) {

                this.oneSignal.startInit("d5034ab1-becd-4ce9-89dd-550b0c4ee48e", "527580057372");

                this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

                this.oneSignal.handleNotificationReceived().subscribe(data => {

                    // console.log("Dados do Push", data);
                    this.presentAlert(JSON.stringify(data.payload))

                });

                this.oneSignal.handleNotificationOpened().subscribe(data => {

                    // console.log("Dados do Push", data);
                    this.presentAlert(JSON.stringify(data.notification.payload))

                });

                this.oneSignal.endInit();
            //}
        });
    }

    presentAlert(msg: any) {
        let alert = this.alertCtrl.create({
            title: 'Low battery',
            subTitle: msg,
            buttons: ['Dismiss']
        });
        alert.present();
    }
}

