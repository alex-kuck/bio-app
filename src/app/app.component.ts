import { Component, NgZone } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';

import { ElectronService } from 'ngx-electron';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  message: string;
  testMessage: string;

  constructor(private _electronService: ElectronService, private _ngZone: NgZone) {
    const tmp = JSON.stringify({text: 'Hello Electron World'});
    this._electronService.clipboard.writeText(tmp, 'json');
    this._electronService.ipcRenderer.on('asynchronous-reply', (event, arg) => {
      this._ngZone.run(() => {
        const reply = `Asynchronous message reply: ${arg}`;
        this.message = reply;
      });
    });
    this._electronService.ipcRenderer.on('async-test', (event, arg) => {
      this.testMessage = `${arg}`;
    });
  }

  public playPingPong() {
    const pong = this._electronService
      .ipcRenderer.sendSync('ping');
    console.log(pong);
  }

  public playPingPongAsync() {
    const pong = this._electronService
      .ipcRenderer.send('async-message', 'ping-async');

  }

  public beep() {
    this._electronService.shell.beep();
  }
}
